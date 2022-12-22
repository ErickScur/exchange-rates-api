import { LoginController } from '../../../../../presentation/controllers/authentication/login/login-controller'
import { Controller } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { makeDbAuthentication } from '../../../usecases/authentication/authentication/db-authentication-factory'
import { makeLoginValidation } from './login-validation-factory'

export const makeLoginController = (): Controller => {
  const loginController = new LoginController(
    makeDbAuthentication(),
    makeLoginValidation(),
  )
  return makeLogControllerDecorator(loginController)
}
