import { Username } from '@domain/entities/user/valueObjects'

export class UsernameMother {
  static create (value: string): Username {
    return new Username(value)
  }
}
