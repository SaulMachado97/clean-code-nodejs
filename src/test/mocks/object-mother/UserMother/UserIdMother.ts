import { UserId } from '@domain/entities/user/valueObjects'

export class UserIdMother {
  static create (value: string): UserId {
    return new UserId(value)
  }
}
