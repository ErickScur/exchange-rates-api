import { DbAddAccount } from '../../../../../data/usecases/authentication/add-account/db-add-account'
import { DbAuthentication } from '../../../../../data/usecases/authentication/login/db-authentication'
import { BcryptAdapter } from '../../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../../../infra/criptography/jwt-adapter/jwt-adapter'
import { PrismaInstance } from '../../../../../infra/db/prisma/helpers/prisma-instance'
import { AccountPrismaRepository } from '../../../../../infra/db/prisma/repositories/account/account-prisma-repository'
import { SignUpController } from '../../../../../presentation/controllers/authentication/signup/signup-controller'
import { Controller } from '../../../../../presentation/protocols'
import env from '../../../../config/env'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { makeSignupValidation } from './signup-validation-factory'

export const makeSignUpController = (): Controller => {
  const prismaInstance = new PrismaInstance()
  const addAccountRepository = new AccountPrismaRepository(prismaInstance)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const salt = 12
  const bcryptAdapater = new BcryptAdapter(salt)
  const authentication = new DbAuthentication(
    addAccountRepository,
    jwtAdapter,
    bcryptAdapater,
  )
  const dbAddAccount = new DbAddAccount(
    addAccountRepository,
    addAccountRepository,
    bcryptAdapater,
  )
  const controller = new SignUpController(
    dbAddAccount,
    makeSignupValidation(),
    authentication,
  )
  return makeLogControllerDecorator(controller)
}
