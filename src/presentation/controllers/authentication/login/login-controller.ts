import {
  Controller,
  HttpRequest,
  HttpResponse,
  badRequest,
  MissingParamError,
} from './login-controller-protocols'

export class LoginController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, password } = httpRequest.body
    if (!email) {
      return badRequest(new MissingParamError('email'))
    }

    if (!password) {
      return badRequest(new MissingParamError('password'))
    }
    return null
  }
}
