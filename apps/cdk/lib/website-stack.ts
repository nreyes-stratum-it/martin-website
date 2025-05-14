import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as iam from "aws-cdk-lib/aws-iam";

import { CdkConfig, Env, SSL_CERT_ARNS } from "cdk-common";
import { Certificate } from "aws-cdk-lib/aws-certificatemanager";
import {
  CertificateValidation,
  ICertificate,
} from "aws-cdk-lib/aws-certificatemanager";
import { Duration } from "aws-cdk-lib";

interface WebsiteStackProps extends cdk.StackProps {
  config: CdkConfig;
  env: Env;
}

interface CreateCloudfrontDistributionProps {
  siteBucket: cdk.aws_s3.Bucket;
  // originAccessIdentity: cdk.aws_cloudfront.OriginAccessIdentity;
  certificate: ICertificate;
  //edgeLambda: cloudfront.Function;
  edgeFunctionVersionArn: string;
  edgeFunctionCurrentVersion: string;
}

export class WebsiteStack extends cdk.Stack {
  config: CdkConfig;
  certificateArn: string = SSL_CERT_ARNS.website;

  constructor(
    scope: Construct,
    id: string,
    props: WebsiteStackProps,
    edgeFunctionVersionArn: string,
    edgeFunctionCurrentVersion: string
  ) {
    super(scope, id, props);
    this.config = props.config;

    const siteBucket = this.createS3Bucket();
    const certificate = acm.Certificate.fromCertificateArn(
      this,
      "WebsiteCertificate",
      this.certificateArn
    );
    const originAccessIdentity = this.allowCloudfrontAccessingS3(siteBucket);

    //edge lambda
    //const edgeLambda = this.createEdgeLambda();

    this.createCloudfrontDistribution({
      siteBucket,
      // originAccessIdentity,
      //edgeLambda,

      certificate,
      edgeFunctionVersionArn,
      edgeFunctionCurrentVersion
    });

    new cdk.CfnOutput(this, "S3BucketName", {
      value: siteBucket.bucketName,
      exportName: "WebsiteBucketName",
    });
  }

  /* private createEdgeLambda() {
    const cfFunction = new cloudfront.Function(this, "RedirectFunction", {
      code: cloudfront.FunctionCode.fromFile({
        filePath: "./lambda/index.js",
      }),
      comment: "Redirect root to /en/",
    });

    return cfFunction;
  } */

  private createEdgeLambda() {
    const edgeLambda = new lambda.Function(this, "RedirectEdgeLambda", {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: "index.handler",
      code: lambda.Code.fromAsset("./lambda"),
      memorySize: 128,
      timeout: Duration.seconds(5),
    });

    const edgeLambdaVersion = edgeLambda.currentVersion;

    return edgeLambdaVersion;
  }

  private createS3Bucket() {
    const originAccessIdentity = new cloudfront.OriginAccessIdentity(
      this,
      "OriginAccessIdentity"
    );

    const bucket = new s3.Bucket(this, "WebsiteBucket", {
      bucketName: `website-bucket-${this.config.getRegion()}-${this.config.getAccountNumber()}`,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      encryption: s3.BucketEncryption.S3_MANAGED,
      versioned: true,
    });

    bucket.grantRead(originAccessIdentity);

    return bucket;
  }

  private allowCloudfrontAccessingS3(
    siteBucket: s3.Bucket
  ): cloudfront.OriginAccessIdentity {
    const originAccessIdentity = new cloudfront.OriginAccessIdentity(
      this,
      "CloudFrontOAIOrigin",
      {
        comment: "OAI to allow cloudfront access",
      }
    );

    siteBucket.addToResourcePolicy(
      new iam.PolicyStatement({
        actions: ["s3:GetObject"],
        resources: [siteBucket.arnForObjects("*")],
        principals: [
          new iam.CanonicalUserPrincipal(
            originAccessIdentity.cloudFrontOriginAccessIdentityS3CanonicalUserId
          ),
        ],
      })
    );

    return originAccessIdentity;
  }

  private createCloudfrontDistribution({
    siteBucket,
    //edgeLambda,
    certificate,
    edgeFunctionVersionArn,
    edgeFunctionCurrentVersion,
  }: CreateCloudfrontDistributionProps): cloudfront.Distribution {
    const originAccessIdentity = new cloudfront.OriginAccessIdentity(
      this,
      "CloudFrontOAI"
    );

    const cloudFront = new cloudfront.Distribution(
      this,
      "WebsiteDistribution",
      {
        defaultBehavior: {
          origin: new origins.S3Origin(siteBucket, {
            originAccessIdentity,
          }),
          viewerProtocolPolicy:
            cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
          cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
          responseHeadersPolicy:
            cloudfront.ResponseHeadersPolicy
              .CORS_ALLOW_ALL_ORIGINS_WITH_PREFLIGHT,
          edgeLambdas: [{
            functionVersion: lambda.Version.fromVersionArn(this, 'ImportedEdgeVersion', `${edgeFunctionVersionArn}:${edgeFunctionCurrentVersion}`),
            eventType: cloudfront.LambdaEdgeEventType.VIEWER_REQUEST,
            includeBody: false
          }]
          /* functionAssociations: [
          {
            //function: edgeLambda,
            //eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,

          },
        ], */
        },
        certificate: certificate,
        defaultRootObject: "index.html",
        errorResponses: [
          {
            httpStatus: 404,
            responseHttpStatus: 200,
            responsePagePath: "/en/index.html",
          },
          {
            httpStatus: 403,
            responseHttpStatus: 200,
            responsePagePath: "/en/index.html",
          },
        ],
        priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
        enabled: true,
      }
    );

    // cloudFront.addBehavior(
    //   "/*",
    //   new origins.S3Origin(siteBucket, {
    //     originAccessIdentity,
    //   }),
    //   {
    //     edgeLambdas: [
    //       {
    //         functionVersion: this.createEdgeLambda(),
    //         eventType: cloudfront.LambdaEdgeEventType.VIEWER_REQUEST,
    //       },
    //     ],
    //   }
    // );

    // Output the CloudFront domain name
    new cdk.CfnOutput(this, "DistributionDomainName", {
      value: cloudFront.distributionDomainName,
      description: "The domain name of the CloudFront distribution",
    });

    return cloudFront;
  }
}
