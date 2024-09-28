import { NextFunction, Request, Response } from 'express'
import { UserCreatorUseCase } from '@application/usecases/UserCreator/UserCreatorUseCase'
import { DynamoDBUserRepository } from '@infrastructure/implementations/aws/dynamo-db-v3/DynamoDBUserRepository'
import { UUIDGeneratorV4 } from '@infrastructure/UUIDGeneratorV4'
import { PassGenerator } from '@infrastructure/PassGenerator'

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const {
    name,
    email,
    username,
    age,
    phone,
    status
  } = req.body

  const dynamoDBUserRepo = new DynamoDBUserRepository()
  const uuidGeneratorV4 = new UUIDGeneratorV4()
  const passwordGenerator = new PassGenerator()
  const userCreateUseCase = new UserCreatorUseCase(dynamoDBUserRepo, uuidGeneratorV4)

  const password = passwordGenerator.passwordEncrypt(String(phone))

  const userToCreate = {
    name,
    email,
    username,
    password,
    age,
    phone,
    status
  }

  try {
    const userCreated = await userCreateUseCase.run(userToCreate)
    res.json(userCreated)
  } catch (e) {
    next(e)
  }
}
