import { DynamoDBClient, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb'
import dotenv from 'dotenv'

// Cargar variables de entorno desde el archivo .env
dotenv.config()

const configClient: DynamoDBClientConfig = {
  region: process.env.AWS_REGION ?? 'us-east-2'
}

const client: DynamoDBClient = new DynamoDBClient(configClient)
const docClient: DynamoDBDocumentClient = DynamoDBDocumentClient.from(client)

const params = {
  TableName: 'saulo-data-faker',
  Key: {
    // Sustituye 'YourPrimaryKey' y 'YourPrimaryKeyValue' por los nombres y valores reales
    'SAULO-DATA-PK': 'USER_SPK_2',
    'SAULO-DATA-SK': 'USER_SPK_2'
  }
}

const command = new GetCommand(params)

const run = async () => {
  try {
    const data = await docClient.send(command)
    console.log('Success', data.Item)
  } catch (error: unknown) {
    console.error('Error al obtener el usuario:', error)

    // Asegúrate de que error sea un objeto y tenga la propiedad $response
    if (error instanceof Error) {
      console.error('Error message:', error.message)
    }

    if (typeof error === 'object' && error !== null && '$response' in error) {
      console.error('Raw response:', (error as any).$response)
    }

    throw error // Vuelve a lanzar el error si es necesario
  }
}

run()
