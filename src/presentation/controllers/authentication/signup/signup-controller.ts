import { AddAccount } from '../../../../domain/usecases/authentication/add-account'
import { InvalidParamError, MissingParamError } from '../../../errors'
import { badRequest } from '../../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'

export class SignUpController implements Controller {
  constructor(private readonly addAccount: AddAccount) {}

  handle(httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    const { name, email, password, passwordConfirmation } = httpRequest.body

    if (password !== passwordConfirmation)
      return badRequest(new InvalidParamError('passwordConfirmation'))

    this.addAccount.add({
      name,
      email,
      password,
    })
  }
}
