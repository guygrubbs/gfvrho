import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';

interface FrontendStackProps extends cdk.StackProps {
  // Additional props can be added if needed
}

export class FrontendStack extends cdk.Stack {
  // Expose the CloudFront distribution URL for use in other stacks or environments
  public readonly distributionDomainName: string;

  // Expose the bucket as a public property
  public readonly frontendBucket: s3.Bucket;

  constructor(scope: Construct, id: string, props?: FrontendStackProps) {
    super(scope, id, props);

    // Create an S3 bucket to host the SPA build artifacts.
    // By default, block public access at the bucket level. We rely on CloudFront for public access.
    this.frontendBucket = new s3.Bucket(this, 'gfvrhoFrontendBucket', {
      websiteIndexDocument: 'index.html', 
      // Although we define index doc here, public access won't be directly allowed, 
      // CloudFront will be our access point.
      publicReadAccess: false,
      removalPolicy: cdk.RemovalPolicy.RETAIN, // Adjust this depending on lifecycle needs
      autoDeleteObjects: false, // Set to true in non-production for easy cleanup
    });

    // Create a CloudFront distribution that points to the S3 bucket as its origin.
    // For a single-page application (SPA), we often need to handle all routes by returning index.html.
    // We can configure a custom error response to serve index.html for 404 or other errors.
    const distribution = new cloudfront.Distribution(this, 'gfvrhoFrontendDistribution', {
      defaultBehavior: {
        origin: new origins.S3Origin(this.frontendBucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        // Caching can be tuned as needed. Default cache behaviors are often sufficient initially.
      },
      defaultRootObject: 'index.html',
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: '/index.html', 
          ttl: cdk.Duration.minutes(5),
        },
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
          ttl: cdk.Duration.minutes(5),
        },
      ],
      // Additional configuration like custom domain names, certificates, etc. can be added later.
    });

    // Output the distribution domain name so that other stacks or deployment scripts can use it.
    this.distributionDomainName = distribution.distributionDomainName;

    new cdk.CfnOutput(this, 'CloudFrontDistributionDomainName', {
      value: this.distributionDomainName,
      description: 'The domain name of the CloudFront distribution serving the gfvrho frontend',
    });
  }
}
