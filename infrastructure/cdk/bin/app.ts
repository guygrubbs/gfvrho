// infrastructure/cdk/bin/app.ts

import * as cdk from 'aws-cdk-lib';
import { NetworkingStack } from '../lib/networking-stack';
import { DatabaseStack } from '../lib/database-stack';
import { BackendStack } from '../lib/backend-stack';
import { FrontendStack } from '../lib/frontend-stack';
import { PipelineStack } from '../lib/pipeline-stack';

// Define the application environment
const app = new cdk.App();

const env = {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION || 'us-east-1'
};

// Networking Stack
const networkingStack = new NetworkingStack(app, 'NetworkingStack', {
    env,
    description: 'Creates the VPC and networking resources for gfvrho project.'
});

// Database Stack
const databaseStack = new DatabaseStack(app, 'DatabaseStack', {
    vpc: networkingStack.vpc,
    env,
    description: 'Provision the RDS PostgreSQL database for gfvrho backend.'
});

// Backend Stack
const backendStack = new BackendStack(app, 'BackendStack', {
    vpc: networkingStack.vpc,
    database: databaseStack.database,
    dbEndpoint: databaseStack.database.instanceEndpoint.hostname,
    dbSecretArn: databaseStack.database.secret?.secretArn ?? '',
    certificateArn: process.env.CERTIFICATE_ARN || '',
    env,
    description: 'Deploy the Flask backend service on AWS ECS with ALB integration.'
});

// Frontend Stack
const frontendStack = new FrontendStack(app, 'FrontendStack', {
    env,
    description: 'Deploy the React frontend application with S3 and CloudFront.'
});

// Pipeline Stack
const pipelineStack = new PipelineStack(app, 'PipelineStack', {
    frontendBucketName: frontendStack.frontendBucket.bucketName,
    backendService: backendStack.backendService,
    env,
    description: 'Set up CI/CD pipelines for frontend, backend, and infrastructure deployments.'
});

// Stack dependencies
databaseStack.addDependency(networkingStack);
backendStack.addDependency(databaseStack);
frontendStack.addDependency(backendStack);
pipelineStack.addDependency(frontendStack);

// Tagging resources for better identification
cdk.Tags.of(app).add('Project', 'gfvrho');
cdk.Tags.of(app).add('Environment', 'Production');

// Synthesize the app
app.synth();
