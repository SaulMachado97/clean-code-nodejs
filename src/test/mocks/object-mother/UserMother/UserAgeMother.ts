import { UserAge } from '@domain/entities/user/valueObjects'

export class UserAgeMother {
  static create (value: number): UserAge {
    return new UserAge(value)
  }
}
