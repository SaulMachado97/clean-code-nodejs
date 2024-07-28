import { User } from '../../../domain/entities/User'
import { UserRepository } from '../../../domain/repositories/UserRepository'

export class InMemoryUserRepository implements UserRepository {
  private userData: User[] = [
    /* {
      id: '1',
      name: 'Juan Perez',
      email: 'juan.perez@example.com',
      username: 'juan.perez',
      age: 30,
      phone: '+1-555-1234',
      status: true
    },
    {
      id: '2',
      name: 'Ana Gomez',
      email: 'ana.gomez@example.com',
      username: 'ana.gomez',
      age: 25,
      phone: '+1-555-5678',
      status: false
    } */
  ]

  async getById (id: string): Promise<User | null> {
    const userFound = this.userData.find(x => x.id === id)

    if (userFound === undefined) return null

    return userFound
  }

  async getAll (): Promise<User[]> {
    return this.userData
  }

  async save (user: User): Promise<User> {
    this.userData.push(user)
    return user
  }

  async getByUsername (username: string): Promise<User | null> {
    const userFound = this.userData.find(x => x.username === username)

    if (userFound === undefined) return null

    return userFound
  }

  async update (user: User): Promise<User> {
    const users = this.userData.filter(x => x.id !== user.id)
    users.push(user)
    this.userData = users

    return user
  }

  async delete (user: User): Promise<void> {
    const users = this.userData.filter(x => x.id !== user.id)
    this.userData = users
  }
}
