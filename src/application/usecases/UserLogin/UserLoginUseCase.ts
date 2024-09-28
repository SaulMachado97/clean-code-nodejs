import { UserRepository } from '../../../domain/repositories/UserRepository'
import { ExistUserByUsername } from '../../../domain/services/ExistsUserByUsername/ExistsUserByUsername'
import { UsernameNotFoundException } from '@domain/exceptions/UsernameNotFoundException'

interface LoginInput {
  username: string
  password: string
}

export class UserLoginUseCase {
  private readonly _userRepository: UserRepository
  private readonly _existUserByUsername: ExistUserByUsername

  constructor (userRepository: UserRepository) {
    this._userRepository = userRepository
    this._existUserByUsername = new ExistUserByUsername(userRepository)
  }

  async run (body: LoginInput): Promise<any> {
    const flagExistUser = await this._existUserByUsername.run(body.username)
    if (!flagExistUser) {
      throw new UsernameNotFoundException()
    } else {
      return await this._userRepository.login(body.username, body.password)
    }
  }
}
