import { Exception } from './Exception'

export class CompanyAlreadyExistException extends Exception {
  constructor () {
    super('Company already exists!')
    this.spanishMessage = 'La empresa ya existe'
  }
}
