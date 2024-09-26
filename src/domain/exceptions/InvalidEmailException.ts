import { Exception } from './Exception'

export class InvalidEmailException extends Exception {
  constructor () {
    super('invalid email, the provided email does not have the correct format "user@domain"')
    this.spanishMessage = 'email invalido, el email proporcionado no tiene el formato correcto "usuario@dominio"'
  }
}
