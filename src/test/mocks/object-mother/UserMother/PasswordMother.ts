import { Password } from '@domain/entities/user/valueObjects'

export class PasswordMother {
  static create (value: string): Password {
    return new Password(value)
  }
}
