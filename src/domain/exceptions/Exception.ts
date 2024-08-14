export class Exception extends Error {
  spanishMessage: string | undefined

  constructor (message?: string) {
    super(message)
  }
}
