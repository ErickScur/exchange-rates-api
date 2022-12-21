import { AddAccount } from '../../../../domain/usecases/authentication/add-account'
import {
  EmailInUseError,
  InvalidParamError,
  MissingParamError,
} from '../../../errors'
import {
  badRequest,
  conflict,
  ok,
  serverError,
} from '../../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'

export class SignUpController implements Controller {
  constructor(private readonly addAccount: AddAccount) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation',
      ]

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
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
      throw error
    }
  }
}
