import { AccountModel } from '../../../../domain/models/authentication/account'
import {
  AddAccount,
  AddAccountModel,
} from '../../../../domain/usecases/authentication/add-account'
import { AddAccountRepository } from '../../../protocols/db/account/add-account-repository'
import { LoadAccountByEmailRepository } from '../../../protocols/db/account/load-account-by-email-repository'

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
  ) {}

  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const emailInUse = await this.loadAccountByEmailRepository.loadByEmail(
      accountData.email,
    )
    if (!emailInUse) {
      const account = await this.addAccountRepository.add(accountData)
      return account
    }
    return null
  }
}
