import { VerifyToken } from '../../../../domain/usecases/authentication/verify-token'
import { Decrypter } from '../../../protocols/criptography/decrypter'
import { LoadAccountByIdRepository } from '../../../protocols/db/account/load-account-by-id-repository'
import { AccountModel } from '../add-account/db-add-account-protocols'

export class DbVerifyToken implements VerifyToken {
  constructor(
    private readonly decrypter: Decrypter,
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository,
  ) {}

  async verify(token: string): Promise<AccountModel> {
    const id = await this.decrypter.decrypt(token)
    if (!id) return null

    const account = await this.loadAccountByIdRepository.loadById(id)
    if (!account) return null

    return account
  }
}
