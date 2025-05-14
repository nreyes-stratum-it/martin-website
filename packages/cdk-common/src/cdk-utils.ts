import {ISecurityGroup, IVpc, SecurityGroup, Vpc} from "aws-cdk-lib/aws-ec2";
import {Construct} from "constructs";
import {CfnOutput, Fn, RemovalPolicy} from "aws-cdk-lib";
import {
    STRATUM_VPC_NAME,
    RDS_CREDENTIALS_ARN,
    SECURITY_GROUPS,
    SSL_CERT_ARNS,
    SUBNET_NAMES,
    WEBSITE_BUCKET_ARN
} from "./cdk-constants";
import {SecurityGroupKeys, SecurityGroupValues, SSLCertKeys, SubnetTypeKeys, SubnetTypeValues} from "./cdk-types";
import * as cdk from "aws-cdk-lib";
import {LogGroup, RetentionDays} from "aws-cdk-lib/aws-logs";
import {DatabaseInstance, IDatabaseInstance} from "aws-cdk-lib/aws-rds";
import {ISecret, Secret} from "aws-cdk-lib/aws-secretsmanager";
import {Certificate, ICertificate} from "aws-cdk-lib/aws-certificatemanager";
import {PolicyStatement} from "aws-cdk-lib/aws-iam";

export class CdkUtils {

    // ###################################
    // ### Networking
    // ###################################

    public static getVPC(scope: Construct): IVpc{
        return Vpc.fromLookup(scope, `${scope.node.id}StratumVPC`, {
            vpcName: STRATUM_VPC_NAME,
        });
    }

    public static getSubnetNameByKey(key: SubnetTypeKeys): SubnetTypeValues {
        if(!SUBNET_NAMES.hasOwnProperty(key)){
            throw new Error(`Subnet ${key} not found`);
        }

        return SUBNET_NAMES[key]
    }

    // ###################################
    // ### Security Groups
    // ###################################

    public static getSecurityGroup(scope: Construct, key: SecurityGroupKeys, extension: string = ''): ISecurityGroup {
        const exportName = CdkUtils.getSecurityGroupByExportKey(key)
        const securityGroupId = cdk.Fn.importValue(exportName);

        return SecurityGroup.fromSecurityGroupId(scope, `${scope.node.id}${exportName}${extension}`, securityGroupId)
    }

    public static getSecurityGroupByExportKey(key: SecurityGroupKeys): SecurityGroupValues {
        if(!SECURITY_GROUPS.hasOwnProperty(key)){
            throw new Error(`Security Group ${key} not found`);
        }

        return SECURITY_GROUPS[key]
    }

    // ###################################
    // ### Database
    // ###################################

    public static getRDSInstance(scope: Construct): IDatabaseInstance {
        return DatabaseInstance.fromDatabaseInstanceAttributes(scope, `${scope.node.id}RDSDatabaseImport`, {
            instanceIdentifier: 'hashlabs-db',
            instanceEndpointAddress: 'hashlabs-db.chisyseu6a4r.eu-central-1.rds.amazonaws.com',
            instanceResourceId: CdkUtils.importValue(RDS_CREDENTIALS_ARN),
            port: 5432,
            securityGroups: [
                CdkUtils.getSecurityGroup(scope, 'database', 'FromInstance')
            ]
        });
    }

    // ###################################
    // ### Secrets
    // ###################################

    public static getRDSCredentials(scope: Construct): ISecret {
        return Secret.fromSecretCompleteArn(scope, `${scope.node.id}${RDS_CREDENTIALS_ARN}`, CdkUtils.getRDSCredentialsArn())
    }

    /* public static getNpmToken(scope: Construct): ISecret {
        return Secret.fromSecretCompleteArn(scope, `${scope.node.id}${NPM_TOKEN_ARN}`, CdkUtils.getNPMTokenArn())
    }

    public static getDbEncryptionKey(scope: Construct): ISecret {
        return Secret.fromSecretCompleteArn(scope, `${scope.node.id}${DB_ENCRYPTION_KEY_ARN}`, CdkUtils.getDBEncryptionArn())
    }

    public static getAPIGatewayToken(scope: Construct): ISecret {
        return Secret.fromSecretCompleteArn(scope, `${scope.node.id}${API_GATEWAY_SECRET_ARN}`, CdkUtils.getAPIGatewaySecretArn())
    }

    public static getWebsocketJwtSecret(scope: Construct): ISecret {
        return Secret.fromSecretCompleteArn(scope, `${scope.node.id}${WEBSOCKET_JWT_SECRET_ARN}`, CdkUtils.getWebsocketJetSecretArn())
    } */

    // ###################################
    // ### ARN's
    // ###################################

    public static getSharedDashboardBucket(): string {
        return Fn.importValue(WEBSITE_BUCKET_ARN)
    }

    public static getRDSCredentialsArn(): string {
        return Fn.importValue(RDS_CREDENTIALS_ARN);
    }

    /* public static getDBEncryptionArn(): string {
        return Fn.importValue(DB_ENCRYPTION_KEY_ARN);
    }

    public static getNPMTokenArn(): string {
        return Fn.importValue(NPM_TOKEN_ARN);
    }

    public static getBitclusterArn(): string {
        return Fn.importValue(BITCLUSTER_SECRET_ARN);
    }

    public static getForemanNo1Arn(): string {
        return Fn.importValue(FOREMAN_NO1_SECRET_ARN);
    }

    public static getForemanFi1Arn(): string {
        return Fn.importValue(FOREMAN_FI1_SECRET_ARN);
    }

    public static getAPIGatewaySecretArn(): string {
        return Fn.importValue(API_GATEWAY_SECRET_ARN);
    }

    public static getWebsocketJetSecretArn(): string {
        return Fn.importValue(WEBSOCKET_JWT_SECRET_ARN);
    } */

    // ###################################
    // ### Queue URL's
    // ###################################

    /* public static getMachineUpdateQueueArn(): string {
        return Fn.importValue(MACHINE_UPDATE_QUEUE_ARN);
    }

    public static getMachineUpdateQueueUrl(): string {
        return Fn.importValue(MACHINE_UPDATE_QUEUE_URL);
    }

    public static getEmailQueueArn(): string {
        return Fn.importValue(EMAIL_QUEUE_ARN);
    }

    public static getEmailQueueUrl(): string {
        return Fn.importValue(EMAIL_QUEUE_URL);
    }

    public static getNotificationsQueueArn(): string {
        return Fn.importValue(NOTIFICATIONS_QUEUE_ARN);
    }

    public static getNotificationsQueueUrl(): string {
        return Fn.importValue(NOTIFICATIONS_QUEUE_URL);
    }

    public static getEnergyQueueArn(): string {
        return Fn.importValue(ENERGY_QUEUE_ARN);
    }

    public static getEnergyQueueUrl(): string {
        return Fn.importValue(ENERGY_QUEUE_URL);
    }

    public static getEnergyFileImportQueueArn(): string {
        return Fn.importValue(ENERGY_FILE_IMPORT_QUEUE_ARN);
    }

    public static getEnergyFileImportQueueUrl(): string {
        return Fn.importValue(ENERGY_FILE_IMPORT_QUEUE_URL);
    }

    public static getBillingQueueArn(): string {
        return Fn.importValue(BILLING_QUEUE_ARN);
    }

    public static getBillingQueueUrl(): string {
        return Fn.importValue(BILLING_QUEUE_URL);
    }

    public static getPdfCreatorQueueArn(): string {
        return Fn.importValue(PDF_CREATOR_QUEUE_ARN);
    }

    public static getPdfCreatorQueueUrl(): string {
        return Fn.importValue(PDF_CREATOR_QUEUE_URL);
    }

    public static getXeroQueueArn(): string {
        return Fn.importValue(XERO_QUEUE_ARN);
    }

    public static getXeroQueueUrl(): string {
        return Fn.importValue(XERO_QUEUE_URL);
    }

    public static getLoggingServiceQueueArn(): string {
        return Fn.importValue(LOGGING_SERVICE_QUEUE_ARN);
    }

    public static getLoggingServiceQueueUrl(): string {
        return Fn.importValue(LOGGING_SERVICE_QUEUE_URL);
    } */

    // ###################################
    // ### Buckets
    // ###################################


    /* public static getPdfBucketName(): string {
        return Fn.importValue(PDF_CREATOR_BUCKET_NAME);
    }

    public static getPdfBucketArn(): string {
        return Fn.importValue(PDF_CREATOR_BUCKET_ARN);
    } */

    // ###################################
    // ### Params
    // ###################################

    /* public static getAllowPoolUpdateArn(): string {
        return Fn.importValue(ALLOW_POOL_UPDATE_ARN);
    }

    public static getAllowPoolUpdateParam(): string {
        return Fn.importValue(ALLOW_POOL_UPDATE_PARAM);
    } */


    // ###################################
    // ### Misc
    // ###################################

    public static importValue(key: string): string {
        return Fn.importValue(key);
    }

    public static exportValue(scope: Construct, key: string, value: string): void {
        new CfnOutput(scope, `${scope.node.id}${key}Export`, {
            value,
            exportName: key,
        });
    }

    public static createLogGroup(scope: Construct, name: string): LogGroup {
        const logGroup: LogGroup = new LogGroup(scope, `${scope.node.id}${name}`, {
            logGroupName: name,
            removalPolicy: RemovalPolicy.DESTROY,
            retention: RetentionDays.ONE_MONTH,
        });

        new PolicyStatement({
            actions: ['logs:CreateLogStream', 'logs:PutLogEvents'],
            resources: [logGroup.logGroupArn],
        });

        return logGroup
    }

    public static getSSLCert(scope: Construct, key: SSLCertKeys): ICertificate {
        const arn = CdkUtils.getSSLCertArnByKey(key);

        let id = key.charAt(0).toUpperCase() + key.slice(1);
        id = id.replace(/\./g, '_');
        console.log('SSL Cert ID:', id);

        return Certificate.fromCertificateArn(scope, `${id}Certificate`, arn);
    }

    public static getSSLCertArnByKey(key: SSLCertKeys): string {
        if(!SSL_CERT_ARNS.hasOwnProperty(key)){
            throw new Error(`SSL Cert ${key} not found`);
        }

        return SSL_CERT_ARNS[key]
    }

    /* public static getWebsocketURL(): string {
       return CdkUtils.importValue(WEBSOCKET_URL);
    } */
}

