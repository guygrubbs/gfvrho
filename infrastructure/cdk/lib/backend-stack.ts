import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecsPatterns from 'aws-cdk-lib/aws-ecs-patterns';
import * as elb from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import * as certificatemanager from 'aws-cdk-lib/aws-certificatemanager';
import * as rds from 'aws-cdk-lib/aws-rds';

interface BackendStackProps extends cdk.StackProps {
  // The VPC created by the networking stack
  vpc: ec2.IVpc;
  // The database endpoint and secret from the database stack
  dbEndpoint: string;
  dbSecretArn: string;
  // ACM certificate ARN for the domain to serve HTTPS traffic
  certificateArn: string;
  database: rds.IDatabaseInstance;
}

export class BackendStack extends cdk.Stack {
  public readonly backendService: ecs.FargateService;

  constructor(scope: Construct, id: string, props: BackendStackProps) {
    super(scope, id, props);

    // Retrieve the database secret from Secrets Manager using the ARN provided by the database stack.
    // This secret will contain credentials (username/password) for the database.
    const dbSecret = secretsmanager.Secret.fromSecretCompleteArn(this, 'gfvrhoDbSecret', props.dbSecretArn);

    // Retrieve other secrets or configuration from SSM Parameter Store as needed.
    // For example, if we need an OAuth token or API keys:
    // const oauthClientId = ssm.StringParameter.valueForStringParameter(this, '/gfvrho/oauth/client_id');
    // const oauthClientSecret = ssm.StringParameter.valueForStringParameter(this, '/gfvrho/oauth/client_secret');

    // Create an ECS cluster in the given VPC.
    const cluster = new ecs.Cluster(this, 'gfvrhoEcsCluster', {
      vpc: props.vpc,
    });

    // Create a Fargate ECS Service running the Flask backend.
    // We use an ApplicationLoadBalancedFargateService pattern for simplicity,
    // which sets up the ALB, target groups, listeners, and ECS service.
    const fargateService = new ecsPatterns.ApplicationLoadBalancedFargateService(this, 'gfvrhoBackendService', {
      cluster: cluster,
      // Place tasks in private subnets for security
      taskSubnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_NAT },
      desiredCount: 2, // For redundancy. Adjust as needed.
      listenerPort: 443, // We'll terminate SSL at the load balancer
      certificate: certificatemanager.Certificate.fromCertificateArn(this, 'gfvrhoCert', props.certificateArn),
      redirectHTTP: true, // Redirect HTTP (80) to HTTPS (443)
      publicLoadBalancer: true, // ALB in public subnets
      taskImageOptions: {
        // Replace with the actual image for the Flask backend (e.g., from ECR)
        image: ecs.ContainerImage.fromRegistry('public.ecr.aws/nginx/nginx:latest'), 
        containerPort: 5000, // Flask often runs on 5000, adjust as needed
        environment: {
          // Provide environment variables for DB connection and any other configs.
          DB_HOST: props.dbEndpoint,
          // If using a managed secret, omit username/password from environment:
        },
        secrets: {
          // Map secretsmanager secret fields to environment variables securely.
          DB_SECRET: ecs.Secret.fromSecretsManager(dbSecret), // DB credentials as JSON secret
        },
      },
    });

    this.backendService = fargateService.service;

    // By default, ApplicationLoadBalancedFargateService creates a listener on port 80 and 443 (if certificate is provided).
    // We have SSL termination at the ALB with the provided certificate.

    // Additional security considerations:
    // Allow inbound from ALB SG to ECS tasks.
    fargateService.service.connections.allowFrom(fargateService.loadBalancer, ec2.Port.tcp(5000), 'Allow ALB to communicate with ECS service on port 5000');

    // If we need to allow the ECS tasks to connect to the DB, we can set inbound rules here,
    // but ideally, this is handled by the DB's security group allowing inbound from ECS tasks.
    // For now, we assume the DB Security Group from the database stack is configured to allow VPC internal traffic.
    
    // Output the load balancer DNS name so we can access the backend service.
    new cdk.CfnOutput(this, 'BackendLoadBalancerDNS', {
      value: fargateService.loadBalancer.loadBalancerDnsName,
      description: 'DNS name of the load balancer for the gfvrho backend service',
    });
  }
}
