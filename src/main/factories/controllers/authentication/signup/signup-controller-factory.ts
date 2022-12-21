import { DbAddAccount } from '../../../../../data/usecases/authentication/add-account/db-add-account'
import { AccountPrismaRepository } from '../../../../../infra/db/prisma/repositories/account/account-prisma-repository'
import { SignUpController } from '../../../../../presentation/controllers/authentication/signup/signup-controller'
import { Controller } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'

export const makeSignUpController = (): Controller => {
  const addAccountRepository = new AccountPrismaRepository()
  const dbAddAccount = new DbAddAccount(
    addAccountRepository,
    addAccountRepository,
  )
  const controller = new SignUpController(dbAddAccount)
  return makeLogControllerDecorator(controller)
}
