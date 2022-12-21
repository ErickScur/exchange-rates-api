import { DbAuthentication } from '../../../../../data/usecases/authentication/login/db-authentication'
import { JwtAdapter } from '../../../../../infra/criptography/jwt-adapter'
import { AccountPrismaRepository } from '../../../../../infra/db/prisma/repositories/account/account-prisma-repository'
import { LoginController } from '../../../../../presentation/controllers/authentication/login/login-controller'
import { Controller } from '../../../../../presentation/protocols'
import env from '../../../../config/env'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'

export const makeLoginController = (): Controller => {
  const repository = new AccountPrismaRepository()
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const authentication = new DbAuthentication(repository, jwtAdapter)
  const loginController = new LoginController(authentication)
  return makeLogControllerDecorator(loginController)
}
