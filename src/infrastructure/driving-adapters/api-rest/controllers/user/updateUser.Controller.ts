/*
import { NextFunction, Request, Response } from 'express'
import { User } from '../../../../../domain/entities/User'
import { DynamoDBUserRepository } from '../../../../../infrastructure/implementations/aws/dynamo-db/DynamoDBUserRepository'
import { UserUpdaterUseCase } from '../../../../../application/usecases/UserUpdater/UserUpdaterUseCase'

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const {
    name,
    email,
    username,
    age,
    phone,
    status
  } = req.body

  const id = req.params.id

  const dynamoDBUserRepo = new DynamoDBUserRepository()
  const userUpdaterUseCase = new UserUpdaterUseCase(dynamoDBUserRepo)

  const userToUpdate: User = {
    id,
    name,
    email,
    username,
    age,
    phone,
    status
  }

  try {
    const userCreated = await userUpdaterUseCase.run(userToUpdate)
    res.json(userCreated)
  } catch (e) {
    next(e)
  }
}
*/
