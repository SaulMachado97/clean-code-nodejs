import { User } from '../entities/user/User'

export interface UserRepository {
  getById: (id: string) => Promise<User | null>
  getAll: () => Promise<User[]>
  save: (user: User) => Promise<User>
  getByUsername: (username: string) => Promise<User | null>
  update: (user: User) => Promise<User>
  delete: (user: User) => Promise<void>
  login: (username: string, password: string) => Promise<any>
}
