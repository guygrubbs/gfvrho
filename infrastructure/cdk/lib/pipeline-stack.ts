import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {
  Artifact,
  Pipeline,
  IStage,
} from 'aws-cdk-lib/aws-codepipeline';
import * as actions from 'aws-cdk-lib/aws-codepipeline-actions';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

interface PipelineStackProps extends cdk.StackProps {
  // Optionally accept references for ECS, CloudFront, or other resources if needed
  frontendBucketName?: string;       // S3 bucket name for frontend
  frontendDistributionId?: string;   // CloudFront distribution ID for invalidation
  ecsClusterName?: string;           // ECS cluster name
  ecsServiceName?: string;           // ECS service name
  ecrRepositoryName?: string;        // ECR repository name for backend images
  vpc?: ec2.IVpc;
  backendService: ecs.IBaseService;
}

export class PipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: PipelineStackProps) {
    super(scope, id, props);

    //--------------------------------------------------------------------------
    // Common Setup / Source Artifact
    //--------------------------------------------------------------------------
    // This example assumes a GitHub source. Replace with CodeCommit or another source if needed.
    // Make sure you have a GitHub connection set up in your AWS account (via Developer Tools > Connections).
    const sourceArtifact = new Artifact('SourceArtifact');

    // Source action for GitHub main branch
    const gitHubSourceAction = new actions.CodeStarConnectionsSourceAction({
      actionName: 'GitHubSource',
      connectionArn: 'arn:aws:codestar-connections:us-east-1:123456789012:connection/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
      owner: 'your-github-owner',
      repo: 'your-github-repo',
      branch: 'main',
      output: sourceArtifact,
      triggerOnPush: true,
    });

    //--------------------------------------------------------------------------
    // INFRASTRUCTURE PIPELINE
    //--------------------------------------------------------------------------

    // Artifact for storing build output (CDK Synth, etc.)
    const infraBuildOutput = new Artifact('InfraBuildOutput');

    // CodeBuild project for synthesizing the CDK (infrastructure) templates
    const infraBuildProject = new codebuild.PipelineProject(this, 'InfraBuildProject', {
      projectName: 'gfvrho-infra-build',
      buildSpec: codebuild.BuildSpec.fromObject({
        version: '0.2',
        phases: {
          install: {
            commands: [
              'npm install -g aws-cdk', // Ensure CDK is installed
              'npm install',            // Install any local dependencies if your infra is in a package.json
            ],
          },
          build: {
            commands: [
              'cdk synth --output dist',  // Synthesize the CDK templates
            ],
          },
        },
        artifacts: {
          'base-directory': 'dist',
          files: ['*.template.json'],
        },
      }),
      environment: {
        buildImage: codebuild.LinuxBuildImage.STANDARD_6_0, // Node 16.x
      },
    });

    // CodePipeline for infrastructure
    const infraPipeline = new Pipeline(this, 'InfrastructurePipeline', {
      pipelineName: 'gfvrho-infra-pipeline',
    });

    // Source stage (shared GitHub source action)
    infraPipeline.addStage({
      stageName: 'Source',
      actions: [gitHubSourceAction],
    });

    // Build stage (CDK synth)
    infraPipeline.addStage({
      stageName: 'Build',
      actions: [
        new actions.CodeBuildAction({
          actionName: 'InfraBuild',
          project: infraBuildProject,
          input: sourceArtifact,
          outputs: [infraBuildOutput],
        }),
      ],
    });

    // Deploy stage (CDK deploy)
    // This example uses a simple CodeBuild job to run `cdk deploy`.
    // Alternatively, you could consider the CDK Pipelines module, but here's a manual approach:
    const infraDeployProject = new codebuild.PipelineProject(this, 'InfraDeployProject', {
      projectName: 'gfvrho-infra-deploy',
      buildSpec: codebuild.BuildSpec.fromObject({
        version: '0.2',
        phases: {
          install: {
            commands: [
              'npm install -g aws-cdk',
              'npm install',
            ],
          },
          build: {
            commands: [
              // Deploy all stacks or specific stacks as needed
              'cdk deploy --require-approval never --all',
            ],
          },
        },
      }),
      environment: {
        buildImage: codebuild.LinuxBuildImage.STANDARD_6_0,
        // Grant permissions to allow CloudFormation changes
      },
    });

    // Give the deploy project permission to deploy CDK resources (CloudFormation changes)
    infraDeployProject.addToRolePolicy(new iam.PolicyStatement({
      actions: [
        'cloudformation:*',
        's3:*',
        'ec2:*',
        'rds:*',
        'ecs:*',
        'ecr:*',
        'iam:*',
        'lambda:*',
        'logs:*',
        'ssm:*',
        'secretsmanager:*',
        // Add more as needed for your stacks
      ],
      resources: ['*'],
    }));

    infraPipeline.addStage({
      stageName: 'Deploy',
      actions: [
        new actions.CodeBuildAction({
          actionName: 'InfraDeploy',
          project: infraDeployProject,
          input: sourceArtifact,
        }),
      ],
    });

    //--------------------------------------------------------------------------
    // FRONTEND PIPELINE
    //--------------------------------------------------------------------------

    // Build project for frontend
    const frontendBuildProject = new codebuild.PipelineProject(this, 'FrontendBuildProject', {
      projectName: 'gfvrho-frontend-build',
      buildSpec: codebuild.BuildSpec.fromObject({
        version: '0.2',
        phases: {
          install: {
            commands: [
              'cd frontend',    // Adjust if your frontend folder is nested differently
              'npm install',
            ],
          },
          build: {
            commands: [
              'npm run build',
            ],
          },
        },
        artifacts: {
          'base-directory': 'frontend/build', // Adjust if your build output folder is different
          files: ['**/*'],
        },
      }),
      environment: {
        buildImage: codebuild.LinuxBuildImage.STANDARD_6_0,
      },
    });

    // Bucket deployment action: We'll define an S3Deployment in a separate CodeBuild or in the same pipeline action
    // For a simpler approach, after building artifacts, you could do a direct S3 deploy step in the pipeline.

    const frontendPipeline = new Pipeline(this, 'FrontendPipeline', {
      pipelineName: 'gfvrho-frontend-pipeline',
    });

    // Source stage (reusing the GitHub source)
    frontendPipeline.addStage({
      stageName: 'Source',
      actions: [gitHubSourceAction],
    });

    // Build stage
    const frontendBuildOutput = new Artifact('FrontendBuildOutput');
    frontendPipeline.addStage({
      stageName: 'Build',
      actions: [
        new actions.CodeBuildAction({
          actionName: 'FrontendBuild',
          project: frontendBuildProject,
          input: sourceArtifact,
          outputs: [frontendBuildOutput],
        }),
      ],
    });

    // Deploy stage
    // We'll assume the S3 bucket and CloudFront distribution were created in the FrontendStack
    // and the names/IDs are provided via props or SSM. If you prefer, you can retrieve them from
    // CloudFormation outputs. For demonstration, we assume they're passed via `props`.
    const frontendBucketName = props?.frontendBucketName || 'CHANGEME-frontend-bucket-name';
    const distributionId = props?.frontendDistributionId || 'CHANGEME-cloudfront-distribution-id';

    // We can do a simple S3 deploy using aws-s3-deployment or a CodePipeline S3 deploy action.
    // The snippet below uses aws-s3-deployment in a CodeBuild environment for invalidation.
    // Alternatively, you can directly use the S3DeployAction and CloudFrontInvalidationAction.

    const frontendDeployProject = new codebuild.PipelineProject(this, 'FrontendDeployProject', {
      projectName: 'gfvrho-frontend-deploy',
      buildSpec: codebuild.BuildSpec.fromObject({
        version: '0.2',
        phases: {
          install: {
            commands: [
              'npm install -g aws-cli',
            ],
          },
          build: {
            commands: [
              // Sync build artifacts to S3
              `aws s3 sync . s3://${frontendBucketName} --delete`,
              // Invalidate CloudFront
              `aws cloudfront create-invalidation --distribution-id ${distributionId} --paths "/*"`,
            ],
          },
        },
      }),
      environment: {
        buildImage: codebuild.LinuxBuildImage.STANDARD_6_0,
      },
    });

    // Grant deploy project permissions for S3 and CloudFront
    frontendDeployProject.addToRolePolicy(new iam.PolicyStatement({
      actions: ['s3:*', 'cloudfront:CreateInvalidation'],
      resources: ['*'],
    }));

    frontendPipeline.addStage({
      stageName: 'Deploy',
      actions: [
        new actions.CodeBuildAction({
          actionName: 'FrontendDeploy',
          project: frontendDeployProject,
          input: frontendBuildOutput,
        }),
      ],
    });

    //--------------------------------------------------------------------------
    // BACKEND PIPELINE
    //--------------------------------------------------------------------------

    // We assume there's an ECR repository for the backend image, ECS cluster, and service to update.
    // If you created an ECR repository in another stack, pass its name as props.ecrRepositoryName.
    // We'll use placeholders for demonstration.

    const backendPipeline = new Pipeline(this, 'BackendPipeline', {
      pipelineName: 'gfvrho-backend-pipeline',
    });

    // Source stage (shared)
    backendPipeline.addStage({
      stageName: 'Source',
      actions: [gitHubSourceAction],
    });

    // Build + Docker push stage
    const backendBuildOutput = new Artifact('BackendBuildOutput');
    const ecrRepositoryName = props?.ecrRepositoryName || 'CHANGEME-backend-ecr-repo';
    const dockerBuildProject = new codebuild.PipelineProject(this, 'BackendDockerBuildProject', {
      projectName: 'gfvrho-backend-docker-build',
      buildSpec: codebuild.BuildSpec.fromObject({
        version: '0.2',
        phases: {
          pre_build: {
            commands: [
              'echo Logging in to Amazon ECR...',
              'aws ecr get-login-password --region $AWS_DEFAULT_REGION | docker login --username AWS --password-stdin $ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com',
            ],
          },
          build: {
            commands: [
              'echo Building the Docker image...',
              'docker build -t backend-image .', // Adjust Dockerfile location
              'docker tag backend-image:latest $ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/' + ecrRepositoryName + ':latest',
            ],
          },
          post_build: {
            commands: [
              'echo Pushing the Docker image...',
              'docker push $ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/' + ecrRepositoryName + ':latest',
            ],
          },
        },
      }),
      environment: {
        // Replace with correct region/account references or pass them in via environment variables
        privileged: true, // Required for Docker in CodeBuild
        buildImage: codebuild.LinuxBuildImage.STANDARD_6_0,
        environmentVariables: {
          ACCOUNT_ID: { value: cdk.Aws.ACCOUNT_ID },
          AWS_DEFAULT_REGION: { value: cdk.Aws.REGION },
        },
      },
    });

    // Grant the Docker build project permission to interact with ECR
    dockerBuildProject.addToRolePolicy(new iam.PolicyStatement({
      actions: [
        'ecr:GetAuthorizationToken',
        'ecr:BatchCheckLayerAvailability',
        'ecr:BatchGetImage',
        'ecr:CompleteLayerUpload',
        'ecr:UploadLayerPart',
        'ecr:PutImage',
      ],
      resources: ['*'],
    }));

    // Add the build stage to the backend pipeline
    backendPipeline.addStage({
      stageName: 'BuildAndPush',
      actions: [
        new actions.CodeBuildAction({
          actionName: 'DockerBuildPush',
          project: dockerBuildProject,
          input: sourceArtifact,
          outputs: [backendBuildOutput],
        }),
      ],
    });

    // ECS Deploy stage: We'll assume we have a cluster name and service name to update.
    // AWS CodePipeline has an ECS deploy action that updates the specified service.
    // The service must be configured to pull the "latest" tag from ECR.
    const ecsDeployAction = new actions.EcsDeployAction({
      actionName: 'EcsDeploy',
      service: ecs.FargateService.fromFargateServiceAttributes(this, 'gfvrhoFargateServiceRef', {
        serviceName: props?.ecsServiceName || 'CHANGEME-ecs-service',
        cluster: ecs.Cluster.fromClusterAttributes(this, 'gfvrhoClusterRef', {
          clusterName: props?.ecsClusterName || 'CHANGEME-ecs-cluster',
          vpc: props?.vpc ?? ec2.Vpc.fromLookup(this, 'dummyVpcLookup', { vpcId: 'vpc-123456' }),
        }),
      }),
      input: backendBuildOutput, // Not strictly required for ECS Deploy, but we include it for pipeline completeness
    });

    backendPipeline.addStage({
      stageName: 'Deploy',
      actions: [ecsDeployAction],
    });
  }
}
