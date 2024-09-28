import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import { IEncrypt } from '@domain/utils/IEncrypt'

dotenv.config()

export class PassGenerator implements IEncrypt {
  readonly jwt_secret: string = process.env.JWT_SECRET ?? ''

  passwordEncrypt (pass: string): string {
    return bcrypt.hashSync(pass, 10)
  }

  comparePass (pass: string, hash: string): boolean {
    return bcrypt.compareSync(pass, hash)
  }

  generateToken (payload: string): any {
    return jwt.sign(payload, this.jwt_secret, { expiresIn: '1d' })
  }
}
