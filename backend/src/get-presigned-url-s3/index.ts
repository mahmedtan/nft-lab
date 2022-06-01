import type {APIGatewayProxyEventV2, APIGatewayProxyResultV2} from 'aws-lambda';
import {S3} from 'aws-sdk';

if (!process.env.BUCKET_NAME)
  throw new Error('Environment variable Bucket name is required.');

type GetPresignedPostUrlParams = {
  fileType: string;
  filePath: string;
};

type Event = APIGatewayProxyEventV2 & {
  queryStringParameters: GetPresignedPostUrlParams;
};

export async function main(event: Event): Promise<APIGatewayProxyResultV2> {
  console.log('Event is', JSON.stringify(event, null, 2));
  try {
    if (
      !event.queryStringParameters?.fileType ||
      !event.queryStringParameters?.filePath
    )
      throw new Error('QueryStrings must be provided');

    const {fileType, filePath} = event.queryStringParameters;
    const presignedPost = await createPresignedPost({fileType, filePath});

    return {
      statusCode: 200,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        ...presignedPost,
        filePath,
      }),
    };
  } catch (error: unknown) {
    console.log('ERROR is:', error);
    if (error instanceof Error) {
      return {statusCode: 400, body: JSON.stringify({error: error.message})};
    }
    return {
      statusCode: 400,
      body: JSON.stringify({error: JSON.stringify(error)}),
    };
  }
}

export function createPresignedPost({
  fileType,
  filePath,
}: GetPresignedPostUrlParams): Promise<S3.PresignedPost> {
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Fields: {key: filePath, acl: 'public-read'},
    Conditions: [
      ['content-length-range', 0, 10000000],
      ['eq', '$Content-Type', fileType],
    ],
    Expires: 15,
  };

  const s3 = new S3();
  return s3.createPresignedPost(params) as unknown as Promise<S3.PresignedPost>;
}
