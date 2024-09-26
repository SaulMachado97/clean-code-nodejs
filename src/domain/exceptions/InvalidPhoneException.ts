import { Exception } from './Exception'

export class InvalidPhoneException extends Exception {
  constructor () {
    super('invalid phone, the provided phone does not have the correct format (+57-300-555-1234)')
    this.spanishMessage = 'email invalido, el email proporcionado no tiene el formato correcto (+57-300-555-1234)'
  }
}
