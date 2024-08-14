import { Exception } from './Exception'

export class UserAlreadyExistException extends Exception {
  constructor () {
    super('User already exists!')
    this.spanishMessage = 'El usuario ya existe'
  }
}
