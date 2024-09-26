import { EntityRoot } from '../EntityRoot'
import { Email, NumberPhone, PersonName, UserAge, UserId, Username, UserStatus } from './valueObjects'

interface PrimitiveData {
  id: string
  name: string
  email: string
  username: string
  age?: number
  phone?: string
  status?: boolean
}

export class User extends EntityRoot<User, PrimitiveData> {
  readonly id: UserId
  readonly name: PersonName
  readonly email: Email
  readonly username: Username
  readonly age?: UserAge
  readonly phone?: NumberPhone
  readonly status?: UserStatus

  constructor ({
    id,
    name,
    email,
    username,
    age,
    phone,
    status
  }: { id: UserId, name: PersonName, email: Email, username: Username, age?: UserAge, phone?: NumberPhone, status?: UserStatus }) {
    super()
    this.id = id
    this.name = name
    this.email = email // Asignar el email correctamente
    this.username = username
    this.age = age
    this.phone = phone
    this.status = status
  }

  toPrimitives (): PrimitiveData {
    return {
      id: this.id._value,
      name: this.name._value,
      email: this.email._value,
      username: this.username._value,
      age: this.age?._value,
      phone: this.phone?._value,
      status: this.status?._value
    }
  }

  static fromPrimitives (plainData: { id: string, name: string, email: string, username: string, age: number, phone: string, status: boolean }): User {
    return new User({
      id: new UserId(plainData.id),
      name: new PersonName(plainData.name),
      email: new Email(plainData.email),
      username: new Username(plainData.username),
      age: new UserAge(plainData.age),
      phone: new NumberPhone(plainData.phone),
      status: new UserStatus(plainData.status)
    })
  }

  static create (id: UserId, name: PersonName, email: Email, username: Username, age: UserAge, phone: NumberPhone, status: UserStatus): User {
    const user = new User({
      id, name, email, username, age, phone, status
    })

    return user
  }
}
