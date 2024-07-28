import { NextFunction, Request, Response } from 'express'
import { DynamoDBUserRepository } from '../../../../implementations/aws/dynamo-db/DynamoDBUserRepository'
import { UserGetterUseCase } from '../../../../../application/usecases/UserGetter/UserGetterUseCase'

export const getAllUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const dynamoDBUserRepo = new DynamoDBUserRepository()
  const userGetterUseCase = new UserGetterUseCase(dynamoDBUserRepo)

  try {
    const allUsers = await userGetterUseCase.run()
    res.json(allUsers)
  } catch (e) {
    next(e)
  }
}
