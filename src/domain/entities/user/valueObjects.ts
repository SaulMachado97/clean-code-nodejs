import { InvalidEmailException } from '@domain/exceptions/InvalidEmailException'
import { InvalidUserAge } from '@domain/exceptions/InvalidUserAge'
import { UsernameException } from '@domain/exceptions/UsernameException'
import { UuidValueObbject } from '@domain/valueObjects/UuidValueObject'

export class UserId extends UuidValueObbject {
  constructor (value: string) {
    super(value)
  }
}

export class Username {
  readonly _value: string

  constructor (value: string) {
    if (value === '' || value === undefined) {
      throw new UsernameException()
    }
    this._value = value
  }
}

export class PersonName {
  readonly _value: string

  constructor (value: string) {
    if (value === '' || value === undefined) {
      throw new UsernameException()
    }
    this._value = value
  }
}

export class UserAge {
  readonly _value: number

  constructor (value: number) {
    if (value === undefined || value < 0 || value > 120) {
      throw new InvalidUserAge()
    }

    this._value = value
  }
}

export class Email {
  readonly _value: string

  constructor (value: string) {
    if (!this.validateEmail(value)) {
      // throw new InvalidEmailException()
    }

    this._value = value
  }

  private validateEmail (value: string): boolean {
    // Expresión regular simple para validar el formato del email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value)
  }
}

export class NumberPhone {
  readonly _value: string

  constructor (value: string) {
    if (!this.validatePhone(value)) {
      throw new InvalidEmailException()
    }

    this._value = value
  }

  private validatePhone (value: string): boolean {
    // Expresión regular simple para validar el formato del email
    const phoneRegex = /^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}\)?)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/
    return phoneRegex.test(value)
  }
}

export class UserStatus {
  readonly _value: boolean

  constructor (value: boolean) {
    if (value === undefined) {
      this._value = false
    }
    this._value = value
  }
}
