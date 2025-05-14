export type Env = {
  account: string | undefined;
  region: string | undefined;
}

export type Domain = {
  id: string;
  name: string;
}

export type SubnetTypeKeys = 'database' | 'bastionHost' /* | 'dashboard' */;
export type SubnetTypeValues = 'RDSSubnet' | 'BastionHostSubnet' /* | 'DashboardSubnet' */;
export type SubnetTypes = Record<SubnetTypeKeys, SubnetTypeValues>

export type SecurityGroupKeys = 'database' | 'bastionHost' /* | 'dashboard' | 'loadbalancer' */;
export type SecurityGroupValues = 'RDSSecurityGroupId' | 'BastionHostSecurityGroupId' | 'DashboardSecurityGroupId' | 'AlbSecurityGroupId';
export type SecurityGroups = Record<SecurityGroupKeys, SecurityGroupValues>

export type SSLCertKeys = /* 'dashboard' | 'customer-dashboard' | 'develop-customer-dashboard' | 'admin-dashboard' | 'develop-admin-dashboard' | 'hashlabs.io' | 'btcpay.hashlabs.io' | */ 'website' | 'tale';
export type SSLCerts = Record<SSLCertKeys, string>

export type DBCredentials = {
  dbInstanceIdentifier: string;
  username: string;
  password: string;
  host: string;
  port: number;
  dbname: string;
}

export type SSLCertArns = {
  dashboard: string;
}