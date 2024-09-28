import { ScanCommand } from '@aws-sdk/client-dynamodb'
import { User } from '../../../../domain/entities/user/User'
import { UserRepository } from '../../../../domain/repositories/UserRepository'
import { DynamoDB } from '../../../driven-adapters/aws_v3/dynamo-db'
import { DeleteCommand, ExecuteStatementCommand, GetCommand, PutCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb'
import { Encrypt } from '@domain/services/Encrypt/Encrypt'
import { Exception } from '@domain/exceptions/Exception'
import * as dotenv from 'dotenv'

dotenv.config()

export class DynamoDBUserRepository implements UserRepository {
  private readonly docClient = DynamoDB.getDocClient()
  private readonly tableName = 'saulo-data-faker'

  async getById (id: string): Promise<User | null> {
    try {
      const params = {
        TableName: this.tableName,
        Key: {
          // Sustituye 'YourPrimaryKey' y 'YourPrimaryKeyValue' por los nombres y valores reales
          'SAULO-DATA-PK': `USER_${id}`,
          'SAULO-DATA-SK': `USER_${id}`
        }
      }
      const command = new GetCommand(params)

      const getResponse = await this.docClient.send(command)

      if (getResponse.Item === undefined) return null

      if (getResponse.Item != null) {
        const id: string = getResponse.Item.id ?? ''
        const name: string = getResponse.Item.name ?? ''
        const email: string = getResponse.Item.email ?? ''
        const username: string = getResponse.Item.username ?? ''
        const password: string = getResponse.Item.password ?? ''
        const age: string = getResponse.Item.age ?? '0'
        const phone: string = getResponse.Item.phone ?? ''
        const status: boolean = getResponse.Item.status ?? false

        const userFound: User = User.fromPrimitives({
          id,
          name,
          email,
          username,
          password,
          age: Number(age),
          phone,
          status
        })
        return userFound
      } else {
        console.log('No se encontró el usuario.')
        return null // O manejar el caso de no encontrar el usuario
      }
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

  async getAll (): Promise<User[]> {
    // console.log('Obteniendo un usuario desde la tabla.')

    try {
      const params = {
        TableName: this.tableName
      }
      const command = new ScanCommand(params)

      const getResponse = await this.docClient.send(command)

      if (getResponse.Items === undefined) return []

      if (getResponse.Items != null) {
        const users: User[] = getResponse.Items.map(item => {
          // console.log(item)
          const id: string = item['SAULO-DATA-PK'].S ?? ''
          const name: string = item.name.S ?? ''
          const email: string = item.email.S ?? ''
          const username: string = item.username.S ?? ''
          const password: string = item.password.S ?? ''
          const age: string = item.age.N ?? '0'
          const phone: string = item.phone.S ?? ''
          const status: boolean = item.status.BOOL ?? false

          return User.fromPrimitives({
            id: id.split('_')[1] ?? id,
            name,
            email,
            username,
            password,
            age: Number(age),
            phone,
            status
          })
        })

        return users
      } else {
        console.log('No se encontró el usuario.')
        return [] // O manejar el caso de no encontrar el usuario
      }
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

  async save (user: User): Promise<User> {
    const params = {
      TableName: 'saulo-data-faker',
      Item: {
        'SAULO-DATA-PK': `USER_${user.id._value}`,
        'SAULO-DATA-SK': `USER_${user.id._value}`,
        ENTITY_TYPE: 'USER',
        id: user.id._value,
        name: user.name._value,
        email: user.email._value,
        username: user.username._value,
        password: user.password._value,
        age: user.age?._value,
        phone: user.phone?._value,
        status: user.status?._value
      }
    }

    const command = new PutCommand(params)

    await this.docClient.send(command)
    return user
  }

  async getByUsername (bodyUsername: string): Promise<User | null> {
    try {
      const command = new ExecuteStatementCommand({
        Statement: `SELECT * FROM "${this.tableName}" WHERE "username"=?`,
        Parameters: [bodyUsername],
        ConsistentRead: true
      })

      // const command = new GetCommand(params)

      const getResponse = await this.docClient.send(command)

      if (getResponse.Items === undefined) return null

      if (getResponse.Items[0] != null) {
        const id: string = getResponse.Items[0].id ?? ''
        const name: string = getResponse.Items[0].name ?? ''
        const email: string = getResponse.Items[0].email ?? ''
        const username: string = getResponse.Items[0].username ?? ''
        const password: string = getResponse.Items[0].password ?? ''
        const age: string = getResponse.Items[0].age ?? '0'
        const phone: string = getResponse.Items[0].phone ?? ''
        const status: boolean = getResponse.Items[0].status ?? false

        const userFound: User = User.fromPrimitives({
          id,
          name,
          email,
          username,
          password,
          age: Number(age),
          phone,
          status
        })
        return userFound
      } else {
        console.log('No se encontró el usuario.')
        return null // O manejar el caso de no encontrar el usuario
      }
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

  async update (user: User): Promise<User> {
    const command = new UpdateCommand({
      TableName: this.tableName,
      Key: {
        'SAULO-DATA-PK': `USER_${user.id._value}`,
        'SAULO-DATA-SK': `USER_${user.id._value}`
      },
      UpdateExpression: 'set #username = :username, #name = :name, #email = :email, #age = :age, #phone = :phone, #status = :status',
      ExpressionAttributeNames: {
        '#username': 'username',
        '#name': 'name',
        '#email': 'email',
        '#age': 'age',
        '#phone': 'phone',
        '#status': 'status'
      },
      ExpressionAttributeValues: {
        ':username': user.username,
        ':name': user.name,
        ':email': user.email,
        ':age': user.age,
        ':phone': user.phone,
        ':status': user.status
      },
      ReturnValues: 'ALL_NEW'
    })

    const response = await this.docClient.send(command)
    // console.log(response)

    if (response.Attributes !== undefined) {
      const {
        'SAULO-DATA-PK': id,
        status,
        username,
        password,
        email,
        name,
        phone,
        age
      } = response.Attributes

      return User.fromPrimitives({
        id,
        status,
        username,
        password,
        email,
        name,
        phone,
        age
      })
    }

    return user
  }

  async delete (user: User): Promise<void> {
    const command = new DeleteCommand({
      TableName: this.tableName,
      Key: {
        'SAULO-DATA-PK': `USER_${user.id._value}`,
        'SAULO-DATA-SK': `USER_${user.id._value}`
      }
    })

    await this.docClient.send(command)
  }

  async login (username: string, password: string): Promise<any> {
    try {
      const user = await this.getByUsername(username)

      if (user != null) {
        const isPasswordValid = await Encrypt.comparePass(password, user.password._value)

        if (!isPasswordValid) {
          throw new Exception('Invalid password... please check your password')
        }

        // Generar el token JWT con el ID del usuario
        const secret = (process.env.JWT_SECRET != null) ? process.env.JWT_SECRET : ''
        const token = await Encrypt.generateToken({ user }, secret)

        return { token }
      } else {
        console.log('No se encontró el usuario.')
        return null // O manejar el caso de no encontrar el usuario
      }
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
}
