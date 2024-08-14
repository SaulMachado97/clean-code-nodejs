import { Exception } from '@domain/exceptions/Exception'

export class HandleError {
  static run (error: any): Error {
    if (error instanceof Exception) {
      return new Error(error.spanishMessage)
    }
    return error
  }
}
