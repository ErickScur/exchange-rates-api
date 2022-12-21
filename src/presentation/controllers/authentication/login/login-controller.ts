import {
  Controller,
  HttpRequest,
  HttpResponse,
  badRequest,
  MissingParamError,
  Authentication,
} from './login-controller-protocols'

export class LoginController implements Controller {
  constructor(private readonly authentication: Authentication) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, password } = httpRequest.body
    if (!email) {
      return badRequest(new MissingParamError('email'))
    }

    if (!password) {
      return badRequest(new MissingParamError('password'))
    }

    await this.authentication.auth({ email, password })
    return null
  }
}
