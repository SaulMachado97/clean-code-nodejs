import { PersonName } from '@domain/entities/user/valueObjects'

export class PersonNameMother {
  static create (value: string): PersonName {
    return new PersonName(value)
  }
}
