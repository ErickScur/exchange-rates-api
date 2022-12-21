import { MissingParamError } from '../../../errors'
import { badRequest } from '../../../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../../../protocols'

export class SignUpController {
  handle(httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}