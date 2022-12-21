import {
  AddAccount,
  EmailInUseError,
  Controller,
  HttpRequest,
  HttpResponse,
  Validation,
} from './signup-controller-protocols'
import {
  badRequest,
  conflict,
  ok,
  serverError,
} from '../../../helpers/http-helper'
import {
  Authentication,
  InvalidParamError,
} from '../login/login-controller-protocols'

export class SignUpController implements Controller {
  constructor(
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { name, email, password, passwordConfirmation } = httpRequest.body

      if (password !== passwordConfirmation)
        return badRequest(new InvalidParamError('passwordConfirmation'))

      const account = await this.addAccount.add({
        name,
        email,
        password,
      })
      if (!account) return conflict(new EmailInUseError())

      const accessToken = await this.authentication.auth({
        email,
        password,
      })
      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
