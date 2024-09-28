import { Exception } from './Exception'

export class UsernameNotFoundException extends Exception {
  constructor () {
    super('User not found :C ... Check your Username!')
    this.spanishMessage = 'Usuario no encontrado :c ... Verifica el Username'
  }
}
