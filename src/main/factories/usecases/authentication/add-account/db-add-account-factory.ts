import { DbAddAccount } from '../../../../../data/usecases/authentication/add-account/db-add-account'
import { AddAccount } from '../../../../../domain/usecases/authentication/add-account'
import { BcryptAdapter } from '../../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { PrismaInstance } from '../../../../../infra/db/prisma/helpers/prisma-instance'
import { AccountPrismaRepository } from '../../../../../infra/db/prisma/repositories/account/account-prisma-repository'

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12
  const bcryptAdapater = new BcryptAdapter(salt)
  const addAccountRepository = new AccountPrismaRepository(new PrismaInstance())
  return new DbAddAccount(
    addAccountRepository,
    addAccountRepository,
    bcryptAdapater,
  )
}
