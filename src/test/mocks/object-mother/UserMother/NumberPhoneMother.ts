import { NumberPhone } from '@domain/entities/user/valueObjects'

export class NumberPhoneMother {
  static create (value: string): NumberPhone {
    return new NumberPhone(value)
  }
}
