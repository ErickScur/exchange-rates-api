import { DbAuthentication } from '../../../../../data/usecases/authentication/login/db-authentication'
import { BcryptAdapter } from '../../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../../../infra/criptography/jwt-adapter/jwt-adapter'
import { PrismaInstance } from '../../../../../infra/db/prisma/helpers/prisma-instance'
import { AccountPrismaRepository } from '../../../../../infra/db/prisma/repositories/account/account-prisma-repository'
import { LoginController } from '../../../../../presentation/controllers/authentication/login/login-controller'
import { Controller } from '../../../../../presentation/protocols'
import env from '../../../../config/env'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'

export const makeLoginController = (): Controller => {
  const prismaInstance = new PrismaInstance()
  const repository = new AccountPrismaRepository(prismaInstance)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const salt = 12
  const bcryptAdapater = new BcryptAdapter(salt)
  const authentication = new DbAuthentication(
    repository,
    jwtAdapter,
    bcryptAdapater,
  )
  const loginController = new LoginController(authentication)
  return makeLogControllerDecorator(loginController)
}