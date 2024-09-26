import { Exception } from './Exception'

export class UuidNotValidException extends Exception {
  constructor () {
    super('Fail validate UUID')
    this.spanishMessage = 'ID invalidado!'
  }
}
