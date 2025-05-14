#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { WebsiteStack } from "../lib/website-stack";
import { CdkConfig, DEFAULT_REGION } from "cdk-common";
import { EdgeFunctionStack } from "../lib/edge-function-stack";

const app = new cdk.App();
const config = new CdkConfig(app);

const account = config.getEnv().account;

const edgeFunctionStack = new EdgeFunctionStack(app, "EdgeFunctionStack", {
  config: config.getConfig(),
  env: { account: account, region: 'us-east-1' }
});

// Step 2: If you're running cdk deploy separately, you'll need to get the output manually
// For programmatic deployments, you can use the functionVersionArn directly
const edgeFunctionVersionArn = edgeFunctionStack.edgeFunction.functionArn
const edgeFunctionCurrentVersion = edgeFunctionStack.edgeFunction.currentVersion.version


const websiteStack = new WebsiteStack(
  app,
  "WebsiteStack",
  {
    config: config.getConfig(),
    env: { account: account, region: DEFAULT_REGION },
    crossRegionReferences: true,
  },
  edgeFunctionVersionArn,
  edgeFunctionCurrentVersion
);

// Make sure CloudFront stack depends on the Edge Function stack
websiteStack.addDependency(edgeFunctionStack);
