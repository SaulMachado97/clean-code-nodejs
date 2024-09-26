import { Exception } from './Exception'

export class UsernameException extends Exception {
  constructor () {
    super('Invalid username cannot empty or undefined')
    this.spanishMessage = 'Username invalido, no puede ser vacio o indefinido'
  }
}
