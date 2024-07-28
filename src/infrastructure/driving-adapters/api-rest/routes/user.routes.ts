import { Router } from 'express'

import {
  getAllUserController,
  createUserController
  // updateUserController,
  // deleteUserController
} from '../controllers'

const route = Router()

route.get('/user', getAllUserController)
route.post('/user', createUserController)
// route.put('/user/:id', updateUserController)
// route.delete('/user/:id', deleteUserController)

export default route
