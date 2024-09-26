import { UuidNotValidException } from '@domain/exceptions/UuidNotValidException'
import { validate as uuidValidate } from 'uuid'

export class UuidValueObbject {
  readonly _value

  constructor (value: string) {
    if (!uuidValidate(value)) throw new UuidNotValidException()

    this._value = value
  }
}
