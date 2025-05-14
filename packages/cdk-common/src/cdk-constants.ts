import { Domain, SecurityGroups, SSLCerts, SubnetTypes } from "./cdk-types";

export const DEFAULT_REGION = "eu-central-1";
export const DEV_ACCOUNT = "864899865599";
export const PROD_ACCOUNT = "585768167930";

export const ACCOUNTS: Record<string, string> = {
  root: PROD_ACCOUNT,
  develop: DEV_ACCOUNT,
  production: PROD_ACCOUNT,
};

export const DOMAINS: Domain[] = [
  { id: "StratumItCom", name: "stratum-it.com" },
];

export const DEV_DOMAINS: Domain[] = [
  { id: "StratumItCom", name: "develop.stratum-it.com" },
];

export const STRATUM_VPC_NAME = "StratumVPC";

export const SUBNET_NAMES: SubnetTypes = {
  database: "RDSSubnet",
  bastionHost: "BastionHostSubnet",
};

export const SECURITY_GROUPS: SecurityGroups = {
  database: "RDSSecurityGroupId",
  bastionHost: "BastionHostSecurityGroupId",
};

export const SSL_CERT_ARNS: SSLCerts = {
  website: "arn:aws:acm:us-east-1:585768167930:certificate/33bb1adf-dd9c-4c51-a8bd-c88a954bf6f1",
  tale: "",
};

type ExportKeys = {
  albSecurityGroupId: string;
  bastionHostSecurityGroupId: string;
  dashboardSecurityGroupId: string;
  rdsInstanceArn: string;
  rdsSecurityGroupId: string;
};

export const exportKeys: ExportKeys = {
  albSecurityGroupId: "AlbSecurityGroupId",
  bastionHostSecurityGroupId: "BastionHostSecurityGroupId",
  dashboardSecurityGroupId: "DashboardSecurityGroupId",
  rdsInstanceArn: "RDSInstanceArn",
  rdsSecurityGroupId: "RDSSecurityGroupId",
};

export const NPM_TOKEN_ARN = "NPMTokenArn";

export const RDS_CREDENTIALS_ARN = "RDSCredentialsArn";

export const WEBSITE_BUCKET_ARN = "SharedDashboardBucket";
