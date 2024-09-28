import { EntityRoot } from '../EntityRoot'
import { Email, NumberPhone, Password, PersonName, UserAge, UserId, Username, UserStatus } from './valueObjects'

interface PrimitiveData {
  id: string
  name: string
  email: string
  username: string
  password: string
  age?: number
  phone?: string
  status?: boolean
}

export class User extends EntityRoot<User, PrimitiveData> {
  readonly id: UserId
  readonly name: PersonName
  readonly email: Email
  readonly username: Username
  readonly password: Password
  readonly age?: UserAge
  readonly phone?: NumberPhone
  readonly status?: UserStatus

  constructor ({
    id,
    name,
    email,
    username,
    password,
    age,
    phone,
    status
  }: { id: UserId, name: PersonName, email: Email, username: Username, password: Password, age?: UserAge, phone?: NumberPhone, status?: UserStatus }) {
    super()
    this.id = id
    this.name = name
    this.email = email // Asignar el email correctamente
    this.username = username
    this.password = password
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
      password: this.password._value,
      age: this.age?._value,
      phone: this.phone?._value,
      status: this.status?._value
    }
  }

  static fromPrimitives (plainData: { id: string, name: string, email: string, username: string, password: string, age: number, phone: string, status: boolean }): User {
    return new User({
      id: new UserId(plainData.id),
      name: new PersonName(plainData.name),
      email: new Email(plainData.email),
      username: new Username(plainData.username),
      password: new Password(plainData.password),
      age: new UserAge(plainData.age),
      phone: new NumberPhone(plainData.phone),
      status: new UserStatus(plainData.status)
    })
  }

  static create (id: UserId, name: PersonName, email: Email, username: Username, password: Password, age: UserAge, phone: NumberPhone, status: UserStatus): User {
    const user = new User({
      id, name, email, username, password, age, phone, status
    })

    return user
  }
}
