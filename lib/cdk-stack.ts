import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';


interface MyBucketProps {
  bucketName: string;
  versioned: boolean;
  encryption: s3.BucketEncryption;
}

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucketProps: MyBucketProps = {
      bucketName: 'My-S3-Bucket-CC-CDK-' + this.account,
      versioned: true,
      encryption: s3.BucketEncryption.S3_MANAGED,
    }
    
    new s3.Bucket(this, 'MyFirstBucket', bucketProps)
  }
}
