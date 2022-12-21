import { DbAddAccount } from '../../../../data/usecases/authentication/add-account/db-add-account'
import { AccountPrismaRepository } from '../../../../infra/db/prisma/repositories/account/account-prisma-repository'
import { SignUpController } from '../../../../presentation/controllers/authentication/signup/signup-controller'

export const makeSignUpController = (): SignUpController => {
  const addAccountRepository = new AccountPrismaRepository()
  const dbAddAccount = new DbAddAccount(
    addAccountRepository,
    addAccountRepository,
  )
  return new SignUpController(dbAddAccount)
}
