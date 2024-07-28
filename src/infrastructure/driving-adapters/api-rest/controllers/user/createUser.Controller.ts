import { NextFunction, Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { UserCreatorUseCase } from '../../../../../application/usecases/UserCreator/UserCreatorUseCase'
import { User } from '../../../../../domain/entities/User'
import { DynamoDBUserRepository } from '../../../../../infrastructure/implementations/aws/dynamo-db/DynamoDBUserRepository'

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
  const userCreateUseCase = new UserCreatorUseCase(dynamoDBUserRepo)

  const userToCreate: User = {
    id: uuidv4(),
    name,
    email,
    username,
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
