import { VerifyToken } from '../../../../domain/usecases/authentication/verify-token'
import { Decrypter } from '../../../protocols/criptography/decrypter'
import { AccountModel } from '../add-account/db-add-account-protocols'

export class DbVerifyToken implements VerifyToken {
  constructor(private readonly decrypter: Decrypter) {}

  async verify(token: string): Promise<AccountModel> {
    await this.decrypter.decrypt(token)
    return null
  }
}
