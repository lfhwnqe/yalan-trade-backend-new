import { Stack, StackProps, Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as path from 'path';

export class NestLambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const lambdaFunc = new lambda.Function(this, 'NestHandler', {
      runtime: lambda.Runtime.NODEJS_LATEST,
      handler: 'lambda.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../../dist')),
      timeout: Duration.seconds(30),
      architecture: lambda.Architecture.ARM_64,
    });

    new apigateway.LambdaRestApi(this, 'Api', {
      handler: lambdaFunc,
    });
  }
}
