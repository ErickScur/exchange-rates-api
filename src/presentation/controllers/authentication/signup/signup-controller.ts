import {
  AddAccount,
  EmailInUseError,
  InvalidParamError,
  MissingParamError,
  Controller,
  HttpRequest,
  HttpResponse,
} from './signup-controller-protocols'
import { badRequest, conflict, ok } from '../../../helpers/http-helper'

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
