import { NextFunction, Request, Response } from 'express'
import { DynamoDBUserRepository } from '../../../../implementations/aws/dynamo-db-v3/DynamoDBUserRepository'
import { UserGetterByUsername } from '@domain/services/UserGetterByUsername/UserGetterByUsername'

export const getUserByUsername = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const dynamoDBUserRepo = new DynamoDBUserRepository()
  const userGetterByUsername = new UserGetterByUsername(dynamoDBUserRepo)

  try {
    const userFound = await userGetterByUsername.run(req.params.username)
    res.json(userFound)
  } catch (e) {
    next(e)
  }
}
