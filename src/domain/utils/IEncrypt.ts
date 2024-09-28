export interface IEncrypt {
  readonly jwt_secret: string

  passwordEncrypt: (pass: string) => string

  comparePass: (pass: string, hash: string) => boolean

  generateToken: (payload: string) => any
}
