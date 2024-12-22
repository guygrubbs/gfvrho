import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';

interface DatabaseStackProps extends cdk.StackProps {
  // The VPC created by the networking stack should be passed into this stack.
  vpc: ec2.IVpc;
}

export class DatabaseStack extends cdk.Stack {
  // Expose the database endpoint and secret for other stacks (e.g. backend stack).
  public readonly dbEndpoint: string;
  public readonly dbSecretArn: string;
  public readonly database: rds.DatabaseInstance;

  constructor(scope: Construct, id: string, props: DatabaseStackProps) {
    super(scope, id, props);

    // Create a dedicated security group for the database.
    // This will allow tight control over which entities can connect.
    const dbSecurityGroup = new ec2.SecurityGroup(this, 'gfvrhoDbSecurityGroup', {
      vpc: props.vpc,
      description: 'Security group for the gfvrho PostgreSQL database',
      allowAllOutbound: true,
    });

    // Allow inbound traffic to PostgreSQL port from private subnets only (further restrictions can be applied).
    // Typically, we would allow the backend ECS tasks to connect by referencing their security group.
    // For now, just define the SG and other stacks can add inbound rules later.
    dbSecurityGroup.addIngressRule(ec2.Peer.ipv4(props.vpc.vpcCidrBlock), ec2.Port.tcp(5432), 'Allow inbound Postgres from within VPC');

    // Create a PostgreSQL database instance in the private subnets.
    // - We use `PRIVATE_WITH_NAT` or `PRIVATE_ISOLATED` subnets for security (selected by vpcSubnets).
    // - Credentials are stored in AWS Secrets Manager.
    const dbInstance = new rds.DatabaseInstance(this, 'gfvrhoPostgresDB', {
      engine: rds.DatabaseInstanceEngine.postgres({
        version: rds.PostgresEngineVersion.VER_13_4,
      }),
      // Generate a new secret for database credentials.
      credentials: rds.Credentials.fromGeneratedSecret('postgres'), 

      // Place the DB in the private subnets of the VPC.
      vpc: props.vpc,
      vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_NAT },

      // Define instance type and storage as needed (can be tuned for performance/cost).
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.BURSTABLE3, ec2.InstanceSize.MICRO),
      allocatedStorage: 20,
      maxAllocatedStorage: 100,
      storageType: rds.StorageType.GP2,

      // Attach the security group created above.
      securityGroups: [dbSecurityGroup],

      // Multi-AZ, backups, etc. can be configured as needed for production:
      multiAz: false,
      autoMinorVersionUpgrade: true,
      backupRetention: cdk.Duration.days(7),
      deletionProtection: false,
      publiclyAccessible: false, // DB should not be publicly accessible.
    });

    // Expose the database endpoint and secret ARN as stack outputs.
    // Other stacks (like the backend stack) can reference these outputs or 
    // use cross-stack references in CDK to retrieve them.
    this.dbEndpoint = dbInstance.instanceEndpoint.hostname;
    this.dbSecretArn = dbInstance.secret!.secretArn;
    this.database = dbInstance;

    new cdk.CfnOutput(this, 'DatabaseEndpoint', {
      value: this.dbEndpoint,
      description: 'The endpoint of the gfvrho PostgreSQL database',
    });

    new cdk.CfnOutput(this, 'DatabaseSecretArn', {
      value: this.dbSecretArn,
      description: 'The ARN of the secret containing credentials for the gfvrho PostgreSQL database',
    });
  }
}
