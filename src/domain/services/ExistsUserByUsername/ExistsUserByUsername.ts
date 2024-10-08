import { type UserRepository } from '../../../domain/repositories/UserRepository'

export class ExistUserByUsername {
  private readonly _userRepository: UserRepository

  constructor (userRepository: UserRepository) {
    this._userRepository = userRepository
  }

  async run (username: string): Promise<boolean> {
    const user = await this._userRepository.getByUsername(username)

    if (user !== null) return true

    return false
  }
}
