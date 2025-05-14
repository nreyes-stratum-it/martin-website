import { App } from "aws-cdk-lib";
import {
  ACCOUNTS,
  DEFAULT_REGION,
  DEV_DOMAINS,
  DOMAINS,
} from "./cdk-constants";
import { Domain, Env } from "./cdk-types";

export class CdkConfig {
  private readonly region: string = DEFAULT_REGION;
  private readonly stage: string | undefined;
  private readonly accountNumber: string | undefined;
  private readonly bucketName: string | undefined;
  private readonly domainName: string | undefined;
  private readonly domains: Domain[];

  constructor(app: App) {
    this.stage = app.node.tryGetContext("stage");
    this.domainName = app.node.tryGetContext("domainName");

    this.validate();

    this.accountNumber = ACCOUNTS[this.stage!];
    this.domains = this.stage === "production" ? DOMAINS : DEV_DOMAINS;
  }

  private validate() {
    if (!this.stage) throw new Error("stage is not set");
    if (!this.region) throw new Error("region is not set");
    if (!this.domainName) throw new Error("domainName is not set");
  }

  public getConfig(): CdkConfig {
    return this;
  }

  public getRegion(): string | undefined {
    return this.region;
  }

  public getStage(): string | undefined {
    return this.stage;
  }

  public getAccountNumber(): string | undefined {
    return this.accountNumber || "";
  }

  public getDomainName(): string {
    const subdomain = this.stage === 'production' ? "" : `${this.stage}.`;
    return this.domainName ? `${subdomain}${this.domainName}` : '';
  }

  public isProduction(): boolean {
    return this.stage === "production";
  }

  public getDomains(): Domain[] {
    return this.domains;
  }

  public getEnv(): Env {
    return {
      account: this.getAccountNumber(),
      region: this.getRegion(),
    };
  }
}
