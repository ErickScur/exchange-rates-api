import { DbAddAccount } from '../../../../../data/usecases/authentication/add-account/db-add-account'
import { BcryptAdapter } from '../../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { PrismaInstance } from '../../../../../infra/db/prisma/helpers/prisma-instance'
import { AccountPrismaRepository } from '../../../../../infra/db/prisma/repositories/account/account-prisma-repository'
import { SignUpController } from '../../../../../presentation/controllers/authentication/signup/signup-controller'
import { Controller } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'

export const makeSignUpController = (): Controller => {
  const prismaInstance = new PrismaInstance()
  const addAccountRepository = new AccountPrismaRepository(prismaInstance)
  const salt = 12
  const bcryptAdapater = new BcryptAdapter(salt)
  const dbAddAccount = new DbAddAccount(
    addAccountRepository,
    addAccountRepository,
    bcryptAdapater,
  )
  const controller = new SignUpController(dbAddAccount)
  return makeLogControllerDecorator(controller)
}
