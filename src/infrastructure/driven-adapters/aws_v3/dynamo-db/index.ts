import { DynamoDBClient, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'
import dotenv from 'dotenv'

dotenv.config()

export class DynamoDB {
  private static readonly configClient: DynamoDBClientConfig = {
    region: process.env.AWS_REGION ?? 'us-east-2'
  }

  private static readonly client: DynamoDBClient = new DynamoDBClient(this.configClient)
  private static readonly docClient: DynamoDBDocumentClient = DynamoDBDocumentClient.from(this.client)

  public static getDocClient (): DynamoDBDocumentClient {
    return this.docClient
  }
}
