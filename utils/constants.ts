import prod from "../cdk-outputs.json";

export const S3_BUCKET_NAME = prod["GP-prod"].bucketName;
export const S3_BUCKET_URL = `https://${S3_BUCKET_NAME}.s3.amazonaws.com`;
export const REGION = prod["GP-prod"].region;
export const PRESIGN_API_BASEURL = prod["GP-prod"].apiUrl.slice(
  0,
  prod["GP-prod"].apiUrl.length - 1
);
