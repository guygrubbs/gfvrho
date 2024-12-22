import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

interface NetworkingStackProps extends cdk.StackProps {
  // Additional props can be added here if needed in the future.
}

export class NetworkingStack extends cdk.Stack {
  // Expose the VPC so that other stacks can reference it
  public readonly vpc: ec2.Vpc;

  constructor(scope: Construct, id: string, props?: NetworkingStackProps) {
    super(scope, id, props);

    // Create a VPC with both public and private subnets across multiple AZs.
    // This approach follows best practices by including:
    // - Multiple Availability Zones for high availability.
    // - Dedicated public subnets for load balancers or bastion hosts.
    // - Dedicated private subnets for backend services and databases.
    // The CIDR range is chosen to fit the project's scale, while reserving space for expansion.
    this.vpc = new ec2.Vpc(this, 'gfvrhoVpc', {
      cidr: '10.0.0.0/16',
      maxAzs: 3, // Distribute subnets across three Availability Zones for resilience
      natGateways: 1, // A single NAT Gateway for cost optimization, adjust if more throughput is needed
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: 'Public',
          subnetType: ec2.SubnetType.PUBLIC, // Public subnets for ingress (e.g. load balancers)
        },
        {
          cidrMask: 24,
          name: 'Private',
          subnetType: ec2.SubnetType.PRIVATE_WITH_NAT, // Private subnets for application services
        },
      ],
    });

    // No additional logic is implemented here. This stack focuses purely on networking.
    // Other stacks (database, backend) will consume this VPC.
  }
}
