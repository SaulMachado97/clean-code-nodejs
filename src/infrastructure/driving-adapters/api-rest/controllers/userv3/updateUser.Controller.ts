import { NextFunction, Request, Response } from 'express'
// import { User } from '@domain/entities/user/User'
import { DynamoDBUserRepository } from '@infrastructure/implementations/aws/dynamo-db-v3/DynamoDBUserRepository'
import { UserUpdaterUseCase } from '@application/usecases/UserUpdater/UserUpdaterUseCase'

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

  const userToUpdate = {
    id,
    name,
    email,
    username,
    age,
    phone,
    status
  }

  try {
    const userUpdated = await userUpdaterUseCase.run(userToUpdate)
    res.json(userUpdated)
  } catch (e) {
    next(e)
  }
}
