import { Stack, StackProps, Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as path from 'path';

interface NestLambdaStackProps extends StackProps {
  environment?: string;
}

export class NestLambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: NestLambdaStackProps) {
    super(scope, id, props);

    const environment = props?.environment || 'dev';

    const lambdaFunc = new lambda.Function(this, `NestHandler-${environment}`, {
      runtime: lambda.Runtime.NODEJS_LATEST,
      handler: 'lambda.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../../packages/app/dist')),
      timeout: Duration.seconds(30),
      architecture: lambda.Architecture.ARM_64,
    });

    new apigateway.LambdaRestApi(this, `Api-${environment}`, {
      handler: lambdaFunc,
    });
  }
}
