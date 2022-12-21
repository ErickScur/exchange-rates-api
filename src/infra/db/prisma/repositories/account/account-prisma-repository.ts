import { AddAccountRepository } from '../../../../../data/protocols/db/account/add-account-repository'
import { LoadAccountByEmailRepository } from '../../../../../data/protocols/db/account/load-account-by-email-repository'
import { AccountModel } from '../../../../../domain/models/authentication/account'
import { AddAccountModel } from '../../../../../domain/usecases/authentication/add-account'
import { prismaInstance } from '../../helpers/prisma-instance'

export class AccountPrismaRepository
  implements AddAccountRepository, LoadAccountByEmailRepository
{
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    try {
      return await prismaInstance.account.create({
        data: accountData,
      })
    } catch (error) {
      throw error
    }
  }

  async loadByEmail(email: string): Promise<AccountModel> {
    try {
      return await prismaInstance.account.findUnique({
        where: { email },
      })
    } catch (error) {
      throw error
    }
  }
}
