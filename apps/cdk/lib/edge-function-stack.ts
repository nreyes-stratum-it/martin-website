import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as iam from "aws-cdk-lib/aws-iam";
import { CdkConfig, Env } from "cdk-common";

import { Duration } from "aws-cdk-lib";

interface EdgeFunctionStackProps extends cdk.StackProps {
  config: CdkConfig;
  env: Env;
}

export class EdgeFunctionStack extends cdk.Stack {
  public readonly edgeFunction: cdk.aws_lambda.Function;
  public readonly functionArn: string;
  public readonly functionVersion: string;

  constructor(scope: Construct, id: string, props?: EdgeFunctionStackProps) {
    // Lambda@Edge functions MUST be deployed to us-east-1
    super(scope, id, {
      ...props,
      //env: { region: "us-east-1" },
    });

    // Create the Lambda@Edge function for redirection
    this.edgeFunction = new lambda.Function(this, "RedirectEdgeLambda", {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: "index.handler",
      code: lambda.Code.fromAsset("./lambda"),
      memorySize: 128,
      timeout: Duration.seconds(5),
      role: new iam.Role(this, "EdgeLambdaRole", {
        assumedBy: new iam.CompositePrincipal(
          new iam.ServicePrincipal("lambda.amazonaws.com"),
          new iam.ServicePrincipal("edgelambda.amazonaws.com")
        ),
      }),
    });
  }
}
