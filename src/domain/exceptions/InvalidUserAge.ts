import { Exception } from './Exception'

export class InvalidUserAge extends Exception {
  constructor () {
    super('Invalid age, cannot < 0 or age > 120')
    this.spanishMessage = 'Edad invalida, no puede ser < 0 o > 120'
  }
}
