import { UserStatus } from '@domain/entities/user/valueObjects'

export class UserStatuslMother {
  static create (value: boolean): UserStatus {
    return new UserStatus(value)
  }
}
