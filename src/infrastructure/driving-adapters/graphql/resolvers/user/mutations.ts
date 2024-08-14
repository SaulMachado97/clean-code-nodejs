import { UserCreatorUseCase } from '@application/usecases/UserCreator/UserCreatorUseCase'
import { DynamoDBUserRepository } from '@infrastructure/implementations/aws/dynamo-db-v3/DynamoDBUserRepository'
import { UUIDGeneratorV4 } from '@infrastructure/UUIDGeneratorV4'
import { HandleError } from '../../utils/HandleError'

const userMutations = {
  createUser: async (_: any, args: any) => {
    console.log(args)

    // if (args.user === undefined) {
    //   throw new Error("El objeto 'user' es requerido.")
    // }

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
  }
}

export default userMutations
