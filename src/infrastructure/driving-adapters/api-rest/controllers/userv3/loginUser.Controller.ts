import { NextFunction, Request, Response } from 'express'
import { DynamoDBUserRepository } from '@infrastructure/implementations/aws/dynamo-db-v3/DynamoDBUserRepository'
import { UserLoginUseCase } from '@application/usecases/UserLogin/UserLoginUseCase'

export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const {
    username,
    password
  } = req.body

  const dynamoDBUserRepo = new DynamoDBUserRepository()
  const userLoginUseCase = new UserLoginUseCase(dynamoDBUserRepo)

  const reqLogin = {
    username,
    password
  }

  try {
    const userLogin = await userLoginUseCase.run(reqLogin)
    res.json(userLogin)
  } catch (e) {
    next(e)
  }
}
