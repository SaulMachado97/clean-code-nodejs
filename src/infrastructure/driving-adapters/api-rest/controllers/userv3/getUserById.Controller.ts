import { NextFunction, Request, Response } from 'express'
import { DynamoDBUserRepository } from '../../../../implementations/aws/dynamo-db-v3/DynamoDBUserRepository'
import { UserGetterById } from '../../../../../domain/services/UserGetterById/UserGetterById'

export const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const dynamoDBUserRepo = new DynamoDBUserRepository()
  const userGetterByIdUseCase = new UserGetterById(dynamoDBUserRepo)

  try {
    const userFound = await userGetterByIdUseCase.run(req.params.id)
    res.json(userFound)
  } catch (e) {
    next(e)
  }
}
