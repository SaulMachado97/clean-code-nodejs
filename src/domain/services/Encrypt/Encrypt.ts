import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

export class Encrypt {
  static async passwordEncrypt (pass: string): Promise<string> {
    return bcrypt.hashSync(pass, 10)
  }

  static async comparePass (pass: string, hash: string): Promise<boolean> {
    return bcrypt.compareSync(pass, hash)
  }

  static async generateToken (payload: object, secret: string): Promise<any> {
    return jwt.sign(payload, secret, {
      expiresIn: '1h' // El token expira en 1 hora
    })
  }
}
