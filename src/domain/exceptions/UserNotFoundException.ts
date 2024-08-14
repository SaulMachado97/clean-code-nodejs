import { Exception } from './Exception'

export class UserNotFoundException extends Exception {
  constructor () {
    super('User not found :C ... Check your UserID!')
    this.spanishMessage = 'Usuario no encontrado :c ... Verifica el UserID'
  }
}
