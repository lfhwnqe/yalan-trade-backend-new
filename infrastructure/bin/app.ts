#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { NestLambdaStack } from '../lib/nest-lambda-stack';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const app = new cdk.App();
const stackName = process.env.STACK_NAME || 'NestLambdaStack';
new NestLambdaStack(app, stackName, {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION || process.env.REGION || 'ap-southeast-1',
  },
});
