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
    const requiredFields = ['email', 'password']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    await this.authentication.auth({ email, password })
    return null
  }
}
