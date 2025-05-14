"use strict";

import {
  CloudFrontRequestEvent,
  CloudFrontRequestResult,
  Context,
} from "aws-lambda";

export async function handler(
  event: CloudFrontRequestEvent,
  context: Context
): Promise<CloudFrontRequestResult> {
  console.log("Event:", JSON.stringify(event, null, 2));
  const request = event.Records[0].cf.request;
  const uri = request.uri;
  const SUPPORTED_LOCALES = ["es", "de"];
  const uriParts = uri.split('/').filter(Boolean);
  const firstPart = uriParts[0];
  if (SUPPORTED_LOCALES.includes(firstPart)) {

    return request;
  }
  return request;
}
