import {
  AddAccountRepository,
  LoadAccountByEmailRepository,
  LoadAccountByIdRepository,
} from '../../../../../data/protocols/db/account'
import { AccountModel } from '../../../../../domain/models/authentication/account'
import { AddAccountModel } from '../../../../../domain/usecases/authentication/add-account'
import { PrismaInstance } from '../../helpers/prisma-instance'

export class AccountPrismaRepository
  implements
    AddAccountRepository,
    LoadAccountByEmailRepository,
    LoadAccountByIdRepository
{
  constructor(private readonly prismaInstance: PrismaInstance) {}

  async loadById(id: string): Promise<AccountModel> {
    try {
      return await this.prismaInstance.account.findUnique({ where: { id } })
    } catch (error) {
      throw error
    }
  }

  async add(accountData: AddAccountModel): Promise<AccountModel> {
    try {
      return await this.prismaInstance.account.create({
        data: accountData,
      })
    } catch (error) {
      throw error
    }
  }

  async loadByEmail(email: string): Promise<AccountModel> {
    try {
      return await this.prismaInstance.account.findUnique({
        where: { email },
      })
    } catch (error) {
      throw error
    }
  }
}
