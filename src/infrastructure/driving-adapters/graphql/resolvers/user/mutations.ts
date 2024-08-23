import { UserCreatorUseCase } from '@application/usecases/UserCreator/UserCreatorUseCase'
import { DynamoDBUserRepository } from '@infrastructure/implementations/aws/dynamo-db-v3/DynamoDBUserRepository'
import { UUIDGeneratorV4 } from '@infrastructure/UUIDGeneratorV4'
import { HandleError } from '../../utils/HandleError'
import { UserUpdaterUseCase } from '@application/usecases/UserUpdater/UserUpdaterUseCase'
import { UserDeleterUseCase } from '@application/usecases/UserDeleter/UserDeleterUseCase'

const userMutations = {
  createUser: async (_: any, args: any) => {
    const {
      name,
      email,
      username,
      age,
      phone,
      status
    } = args.user

    const dynamoDBUserRepo = new DynamoDBUserRepository()
    const uuidGeneratorV4 = new UUIDGeneratorV4()
    const userCreateUseCase = new UserCreatorUseCase(dynamoDBUserRepo, uuidGeneratorV4)

    const userToCreate = {
      name,
      email,
      username,
      age,
      phone,
      status
    }

    try {
      const userCreated = await userCreateUseCase.run(userToCreate)
      return userCreated
    } catch (e) {
      return HandleError.run(e)
    }
  },

  updateUser: async (_: any, args: any) => {
    const userToUpdate = {
      id: args.user.id,
      name: args.user.name,
      email: args.user.email,
      username: args.user.email,
      age: args.user.age,
      phone: args.user.phone,
      status: args.user.status
    }
    const dynamoDBUserRepo = new DynamoDBUserRepository()
    const userUpdaterUseCase = new UserUpdaterUseCase(dynamoDBUserRepo)

    try {
      const userUpdated = await userUpdaterUseCase.run(userToUpdate)
      return userUpdated
    } catch (e) {
      return HandleError.run(e)
    }
  },

  deleteUser: async (_: any, args: { id: string }) => {
    const dynamoDBUserRepo = new DynamoDBUserRepository()
    const userDeleterUseCase = new UserDeleterUseCase(dynamoDBUserRepo)

    try {
      const userDeleted = await userDeleterUseCase.run(args.id)
      return userDeleted
    } catch (e) {
      return HandleError.run(e)
    }
  }
}

export default userMutations
