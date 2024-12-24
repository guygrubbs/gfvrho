import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Pipeline, Artifact } from 'aws-cdk-lib/aws-codepipeline';
import { PipelineProject } from 'aws-cdk-lib/aws-codebuild';
import { Bucket } from 'aws-cdk-lib/aws-s3';

export class PipelineStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // Define pipeline artifacts
        const sourceArtifact = new Artifact('SourceArtifact');
        const buildArtifact = new Artifact('BuildArtifact');

        // Define the source stage
        const pipeline = new Pipeline(this, 'CI-CD-Pipeline', {
            pipelineName: 'GFVRHO-CI-CD-Pipeline',
            crossAccountKeys: false,
            restartExecutionOnUpdate: true,
        });

        // Source Stage
        pipeline.addStage({
            stageName: 'Source',
            actions: [
                new cdk.aws_codepipeline_actions.GitHubSourceAction({
                    actionName: 'GitHub_Source',
                    owner: 'guygrubbs',
                    repo: 'gfvrho',
                    branch: 'main',
                    oauthToken: cdk.SecretValue.secretsManager('github-token'),
                    output: sourceArtifact,
                }),
            ],
        });

        // Build Stage for Backend
        const backendBuildProject = new PipelineProject(this, 'BackendBuildProject', {
            projectName: 'BackendBuildProject',
            environment: {
                buildImage: cdk.aws_codebuild.LinuxBuildImage.STANDARD_5_0,
            },
        });

        pipeline.addStage({
            stageName: 'BackendBuild',
            actions: [
                new cdk.aws_codepipeline_actions.CodeBuildAction({
                    actionName: 'Build_Backend',
                    project: backendBuildProject,
                    input: sourceArtifact,
                    outputs: [buildArtifact],
                }),
            ],
        });

        // Build Stage for Frontend
        const frontendBuildProject = new PipelineProject(this, 'FrontendBuildProject', {
            projectName: 'FrontendBuildProject',
            environment: {
                buildImage: cdk.aws_codebuild.LinuxBuildImage.STANDARD_5_0,
            },
        });

        pipeline.addStage({
            stageName: 'FrontendBuild',
            actions: [
                new cdk.aws_codepipeline_actions.CodeBuildAction({
                    actionName: 'Build_Frontend',
                    project: frontendBuildProject,
                    input: sourceArtifact,
                    outputs: [buildArtifact],
                }),
            ],
        });

        // Deployment Stage
        pipeline.addStage({
            stageName: 'Deploy',
            actions: [
                new cdk.aws_codepipeline_actions.CloudFormationCreateUpdateStackAction({
                    actionName: 'Deploy_Backend',
                    stackName: 'BackendStack',
                    templatePath: buildArtifact.atPath('backend/template.yml'),
                    adminPermissions: true,
                }),
                new cdk.aws_codepipeline_actions.CloudFormationCreateUpdateStackAction({
                    actionName: 'Deploy_Frontend',
                    stackName: 'FrontendStack',
                    templatePath: buildArtifact.atPath('frontend/template.yml'),
                    adminPermissions: true,
                }),
            ],
        });

        // Approval Stage (Manual Gate before Production Deployment)
        pipeline.addStage({
            stageName: 'Approval',
            actions: [
                new cdk.aws_codepipeline_actions.ManualApprovalAction({
                    actionName: 'ManualApproval',
                }),
            ],
        });

        // Production Stage
        pipeline.addStage({
            stageName: 'Production',
            actions: [
                new cdk.aws_codepipeline_actions.CloudFormationCreateUpdateStackAction({
                    actionName: 'Deploy_Production',
                    stackName: 'ProductionStack',
                    templatePath: buildArtifact.atPath('production/template.yml'),
                    adminPermissions: true,
                }),
            ],
        });
    }
}
