import { UserGetterUseCase } from '@application/usecases/UserGetter/UserGetterUseCase'
import { DynamoDBUserRepository } from '@infrastructure/implementations/aws/dynamo-db-v3/DynamoDBUserRepository'
import { HandleError } from '../../utils/HandleError'
import { UserGetterById } from '@domain/services/UserGetterById/UserGetterById'

const userQueries = {
  user: async (_: any, args: { id: string }) => {
    const dynamoDbUserRepo = new DynamoDBUserRepository()
    const userGetterById = new UserGetterById(dynamoDbUserRepo)

    const user = await userGetterById.run(args.id)

    return user
  },

  users: async (_: any, args: any) => {
    const dynamoDBUserRepo = new DynamoDBUserRepository()
    const userGetterCaseUse = new UserGetterUseCase(dynamoDBUserRepo)

    try {
      const allUsers = await userGetterCaseUse.run()
      return allUsers
    } catch (e) {
      return HandleError.run(e)
    }
  }
}

export default userQueries
