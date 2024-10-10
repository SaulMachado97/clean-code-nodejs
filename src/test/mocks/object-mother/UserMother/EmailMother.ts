import { Email } from '@domain/entities/user/valueObjects'

export class EmailMother {
  static create (value: string): Email {
    return new Email(value)
  }
}
