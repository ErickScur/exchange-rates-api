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

    if (!emailInUse) {
      const hashedPassword = await this.hasher.hash(accountData.password)
      return await this.addAccountRepository.add(
        Object.assign({}, accountData, { password: hashedPassword }),
      )
    }
    return null
  }
}
