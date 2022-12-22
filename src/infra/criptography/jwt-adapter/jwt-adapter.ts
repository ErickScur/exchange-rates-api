import jwt from 'jsonwebtoken'
import { Decrypter } from '../../../data/protocols/criptography/decrypter'
import { Encrypter } from '../../../data/protocols/criptography/encrypter'

type TokenPayload = {
  id: string
  iat: number
  exp: number
}

export class JwtAdapter implements Encrypter, Decrypter {
  private readonly secret: string

  constructor(secret: string) {
    this.secret = secret
  }

  async encrypt(value: string): Promise<string> {
    return await jwt.sign({ id: value }, this.secret)
  }

  async decrypt(value: string): Promise<string> {
    const payload = (await jwt.verify(value, this.secret)) as TokenPayload
    return payload.id
  }
}
