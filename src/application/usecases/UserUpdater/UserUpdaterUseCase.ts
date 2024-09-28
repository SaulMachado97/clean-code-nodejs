import { Email, NumberPhone, Password, PersonName, UserAge, UserId, Username, UserStatus } from '@domain/entities/user/valueObjects'
import { User } from '../../../domain/entities/user/User'
import { UserRepository } from '../../../domain/repositories/UserRepository'
import { UserGetterById } from '../../../domain/services/UserGetterById/UserGetterById'

interface UserInput {
  id: string
  name: string
  email: string
  username: string
  age: number
  phone: string
  status: boolean
}

export class UserUpdaterUseCase {
  private readonly _userRepository: UserRepository
  private readonly _userGetterById: UserGetterById

  constructor (userRepository: UserRepository) {
    this._userRepository = userRepository
    this._userGetterById = new UserGetterById(userRepository)
  }

  async run (data: UserInput): Promise<User> {
    const user = await this._userGetterById.run(data.id)

    const dataToUpdate: User = new User({
      id: new UserId(data.id),
      name: new PersonName(data.name ?? user.name),
      email: new Email(data.email ?? user.email),
      username: new Username(data.username ?? user.username),
      password: new Password(data.phone ?? user.password),
      age: new UserAge(data.age ?? user.age),
      phone: new NumberPhone(data.phone ?? user.phone),
      status: new UserStatus(data.status ?? user.status)
    })
    const userUpdated = await this._userRepository.update(dataToUpdate)
    return userUpdated
  }
}
