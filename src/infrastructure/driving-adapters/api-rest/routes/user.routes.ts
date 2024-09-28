import { Router } from 'express'

import {
  getAllUserController,
  getUserByIdController,
  getUserByUsernameController,
  createUserController,
  updateUserController,
  deleteUserController,
  loginUserController
} from '../controllers/'
import authenticateToken from '../middleware/Middleware'

const route = Router()

route.use('/user/:id', authenticateToken)

route.get('/user', getAllUserController)
route.get('/user/:id', getUserByIdController)
route.get('/username/:username', getUserByUsernameController)
route.post('/user', createUserController)
route.post('/login', loginUserController)
route.put('/user/:id', updateUserController)
route.delete('/user/:id', deleteUserController)

export default route
