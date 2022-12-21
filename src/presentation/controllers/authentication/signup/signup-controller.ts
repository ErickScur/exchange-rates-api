import {
  AddAccount,
  EmailInUseError,
  InvalidParamError,
  MissingParamError,
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

export class SignUpController implements Controller {
  constructor(
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
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

      return ok(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
