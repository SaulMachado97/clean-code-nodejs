import { createUser } from './userv3/createUser.Controller'
import { getAllUser } from './userv3/getAllUser.Controller'
import { getUserById } from './userv3/getUserById.Controller'
import { getUserByUsername } from './userv3/getUserByUsername.Controller'
import { updateUser } from './userv3/updateUser.Controller'
import { deleteUser } from './userv3/deleteUser.Controller'
import { loginUser } from './userv3/loginUser.Controller'

export {
  createUser as createUserController,
  getAllUser as getAllUserController,
  getUserById as getUserByIdController,
  getUserByUsername as getUserByUsernameController,
  updateUser as updateUserController,
  deleteUser as deleteUserController,
  loginUser as loginUserController
}
