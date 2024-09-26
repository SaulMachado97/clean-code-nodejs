import { User } from '../../../domain/entities/user/User'
import { UserRepository } from '../../../domain/repositories/UserRepository'
import { ExistUserByUsername } from '../../../domain/services/ExistsUserByUsername/ExistsUserByUsername'
import { UserAlreadyExistException } from '../../../domain/exceptions/UserAlreadyExistException'
import { UUIDGeneratorV4 } from '@infrastructure/UUIDGeneratorV4'
import { UUIDGenerator } from '@domain/utils/uuidGenerator'
import { Email, NumberPhone, PersonName, UserAge, UserId, Username, UserStatus } from '@domain/entities/user/valueObjects'

interface UserInput {
  name: string
  email: string
  username: string
  age: number
  phone: string
  status: boolean
}

export class UserCreatorUseCase {
  private readonly _userRepository: UserRepository
  private readonly _existUserByUsername: ExistUserByUsername
  private readonly _uuidGenerator: UUIDGenerator

  constructor (userRepository: UserRepository, uuidGenerator: UUIDGenerator) {
    this._userRepository = userRepository
    this._existUserByUsername = new ExistUserByUsername(userRepository)
    this._uuidGenerator = new UUIDGeneratorV4()
  }

  async run (body: UserInput): Promise<User> {
    // const user: User = {
    //   id: this._uuidGenerator.generate(),
    //   name: body.name,
    //   email: body.email,
    //   username: body.username,
    //   age: body.age,
    //   phone: body.phone,
    //   status: body.status
    // }

    const user: User = User.create(
      new UserId(this._uuidGenerator.generate()),
      new PersonName(body.name),
      new Email(body.email),
      new Username(body.username),
      new UserAge(body.age),
      new NumberPhone(body.phone),
      new UserStatus(body.status)
    )

    const flagExistUser = await this._existUserByUsername.run(body.username)
    if (!flagExistUser) {
      const userCreated: User = await this._userRepository.save(user)
      return userCreated
    } else {
      throw new UserAlreadyExistException()
    }
  }
}
