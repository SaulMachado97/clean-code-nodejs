import { User } from '../../entities/user/User'
import { UserRepository } from '../../../domain/repositories/UserRepository'
import { UserNotFoundException } from '../../exceptions/UserNotFoundException'

export class UserGetterByUsername {
  private readonly _userRepository: UserRepository

  constructor (userRepository: UserRepository) {
    this._userRepository = userRepository
  }

  async run (username: string): Promise<User> {
    const user = await this._userRepository.getByUsername(username)
    if (user === null) {
      throw new UserNotFoundException()
    }

    return user
  }
}
