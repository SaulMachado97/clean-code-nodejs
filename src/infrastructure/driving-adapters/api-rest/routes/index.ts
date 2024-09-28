import { UserNotFoundException } from '../../../../domain/exceptions/UserNotFoundException'
import { UserAlreadyExistException } from '../../../../domain/exceptions/UserAlreadyExistException'
import { Router, Request, Response, NextFunction } from 'express'
import userRoutes from './user.routes'

const route = Router()

route.use('/user', userRoutes)

// Este es el middleware
route.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof UserAlreadyExistException) {
    res.status(400).json({
      message: 'El usuario ya ha sido registrado'
    })
  } else if (err instanceof UserNotFoundException) {
    res.status(400).json({
      message: 'El usuario no existe'
    })
  } else {
    next(err)
  }
})

route.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err)
  res.status(500)
  res.json({
    errors: err
  })
})
