import {
  AddAccount,
  AddAccountRepository,
  LoadAccountByEmailRepository,
  Hasher,
  AddAccountModel,
  AccountModel,
} from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hasher: Hasher,
  ) {}

  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const emailInUse = await this.loadAccountByEmailRepository.loadByEmail(
      accountData.email,
    )

    await this.hasher.hash(accountData.password)
    if (!emailInUse) {
      const account = await this.addAccountRepository.add(accountData)
      return account
    }
    return null
  }
}
