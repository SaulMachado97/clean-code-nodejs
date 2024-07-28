import { User } from '../../../domain/entities/User'
import { UserRepository } from '../../../domain/repositories/UserRepository'
import { ExistUserByUsername } from '../../../domain/services/ExistsUserByUsername/ExistsUserByUsername'
import { UserAlreadyExistException } from '../../../domain/exceptions/UserAlreadyExistException'

export class UserCreatorUseCase {
  private readonly _userRepository: UserRepository
  private readonly _existUserByUsername: ExistUserByUsername

  constructor (userRepository: UserRepository) {
    this._userRepository = userRepository
    this._existUserByUsername = new ExistUserByUsername(userRepository)
  }

  async run (body: User): Promise<User> {
    const flagExistUser = await this._existUserByUsername.run(body.username)
    if (!flagExistUser) {
      const userCreated: User = await this._userRepository.save(body)
      return userCreated
    } else {
      throw new UserAlreadyExistException()
    }
  }
}
