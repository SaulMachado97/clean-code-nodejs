/*
import { User } from '../../../../domain/entities/User'
import { UserRepository } from '../../../../domain/repositories/UserRepository'
import { DynamoDB } from '../../../../infrastructure/driven-adapters/aws/dynamo-db'

export class DynamoDBUserRepository implements UserRepository {
  private readonly db = DynamoDB.getInstance()

  async getById (bodyId: string): Promise<User | null> {
    const response = await this.db.scan({
      TableName: DynamoDB.TABLE_NAME,
      FilterExpression: '#id = :id',
      ExpressionAttributeNames: {
        '#id': 'SAULO-DATA-PK'
      },
      ExpressionAttributeValues: {
        ':id': {
          S: `USER_${bodyId}`
        }
      }
    }).promise()

    const items = response.Items ?? []

    if (items[0] === undefined) return null

    const id: string = items[0].id?.S ?? ''
    const name: string = items[0].name.S ?? ''
    const email: string = items[0].email.S ?? ''
    const username: string = items[0].username.S ?? ''
    const age: string = items[0].age.N ?? '0'
    const phone: string = items[0].phone.S ?? ''
    const status: boolean = items[0].status.BOOL ?? false

    const userFound: User = {
      id,
      name,
      email,
      username,
      age: Number(age),
      phone,
      status
    }
    return userFound
  }

  async getAll (): Promise<User[]> {
    const response = await this.db.scan({
      TableName: DynamoDB.TABLE_NAME,
      FilterExpression: 'ENTITY_TYPE = :entity',
      ExpressionAttributeValues: {
        ':entity': {
          S: 'USER'
        }
      }
    }).promise()

    // // const items = (response.Items !== null) ? response.Items : []
    const items = response.Items ?? []

    if (items === undefined) return []

    const users: User[] = items.map(item => {
      const id: string = item.id?.S ?? ''
      const name: string = item.name.S ?? ''
      const email: string = item.email.S ?? ''
      const username: string = item.username.S ?? ''
      const age: string = item.age.N ?? '0'
      const phone: string = item.phone.S ?? ''
      const status: boolean = item.status.BOOL ?? false

      return {
        id: id.split('_')[1],
        name,
        email,
        username,
        age: Number(age),
        phone,
        status
      }
    })

    return users
  }

  async save (user: User): Promise<User> {
    const params = {
      TableName: DynamoDB.TABLE_NAME,
      Item: {
        'SAULO-DATA-PK': { S: `USER_${user.id}` },
        'SAULO-DATA-SK': { S: `USER_${user.id}` },
        ENTITY_TYPE: { S: 'USER' },
        id: { S: user.id },
        name: { S: user.name },
        email: { S: user.email },
        username: { S: user.username },
        age: { N: `${user.age}` },
        phone: { S: user.phone },
        status: { BOOL: user.status }
      }
    }
    await this.db.putItem(params).promise()
    return user
  }

  async getByUsername (bodyUsername: string): Promise<User | null> {
    const response = await this.db.scan({
      TableName: DynamoDB.TABLE_NAME,
      FilterExpression: 'username = :username',
      ExpressionAttributeValues: {
        ':username': {
          S: bodyUsername
        }
      }
    }).promise()

    const items = response.Items ?? []

    if (items[0] === undefined) return null

    const id: string = items[0].id?.S ?? ''
    const name: string = items[0].name.S ?? ''
    const email: string = items[0].email.S ?? ''
    const username: string = items[0].username.S ?? ''
    const age: string = items[0].age.N ?? '0'
    const phone: string = items[0].phone.S ?? ''
    const status: boolean = items[0].status.BOOL ?? false

    const userFound: User = {
      id,
      name,
      email,
      username,
      age: Number(age),
      phone,
      status
    }
    return userFound
  }

  async update (user: User): Promise<User> {
    const params = {
      TableName: DynamoDB.TABLE_NAME,
      Key: {
        'SAULO-DATA-PK': {
          S: `USER_${user.id}`
        },
        'SAULO-DATA-SK': {
          S: `USER_${user.id}`
        }
      },
      UpdateExpression: 'set #username = :username, #name = :name, #age = :age, #phone = :phone, #status = :status',
      ExpressionAttributeNames: {
        '#username': 'username',
        '#name': 'name',
        '#age': 'age',
        '#phone': 'phone',
        '#status': 'status'
      },
      ExpressionAttributeValues: {
        ':username': { S: user.username },
        ':name': { S: user.name },
        ':age': { N: `${user.age}` },
        ':phone': { S: user.phone },
        ':status': { BOOL: user.status }
      }
    }
    await this.db.updateItem(params).promise()
    return user
  }

  async delete (user: User): Promise<void> {
    const params = {
      TableName: DynamoDB.TABLE_NAME,
      Key: {
        'SAULO-DATA-PK': {
          S: `USER_${user.id}`
        },
        'SAULO-DATA-SK': {
          S: `USER_${user.id}`
        }
      }
    }

    await this.db.deleteItem(params).promise()
  }
}
*/
