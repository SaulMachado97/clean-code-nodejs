import { NextFunction, Request, Response } from 'express'
import { DynamoDBUserRepository } from '../../../../../infrastructure/implementations/aws/dynamo-db/DynamoDBUserRepository'
import { UserDeleterUseCase } from '../../../../../application/usecases/UserDeleter/UserDeleterUseCase'

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const id = req.params.id

  const dynamoDBUserRepo = new DynamoDBUserRepository()
  const userDeleterUseCase = new UserDeleterUseCase(dynamoDBUserRepo)

  try {
    const userCreated = await userDeleterUseCase.run(id)
    res.json(userCreated)
  } catch (e) {
    next(e)
  }
}
