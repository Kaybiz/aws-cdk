import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2'


// ---- Props Interface ----
interface EC2StackProps extends cdk.StackProps {
    vpc: ec2.Vpc;

    // This create a custom interface that extends the basic CDK stack properties

    // as a required VPC properties of type ec2.vpc

    // This let us pass Our VPC from the VPC stack to this EC2 stack
}

export class EC2Stack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: EC2StackProps) {
        super(scope, id, props);

        // EC2 Instance 1 in AZ 1
        const instance1 = new ec2.Instance(this, 'MyPrivateEC2-AZ1', {
            vpc: props.vpc,
            vpcSubnets: {
                subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
                availabilityZones: [props.vpc.availabilityZones[0]]
            },
            machineImage: new ec2.AmazonLinuxImage({
                generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2
            }),
            instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO)
        });
        
        cdk.Tags.of(instance1).add('Name', 'MyPrivateEC2-AZ1');

        // EC2 Instance in AZ 2
        const instance2 = new ec2.Instance(this, 'MyPrivateEC2-AZ2', {
            vpc: props.vpc,
            vpcSubnets: {
                subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
                availabilityZones: [props.vpc.availabilityZones[1]]
            },
            machineImage: new ec2.AmazonLinuxImage({
                generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2
            }),
            instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO)
        });

        cdk.Tags.of(instance2).add('Name', 'MyPrivateEC2-AZ2');
    }
}
