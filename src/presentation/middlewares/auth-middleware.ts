import { VerifyToken } from '../../domain/usecases/authentication/verify-token'
import { AccessDeniedError } from '../errors/access-denied-error'
import { forbidden } from '../helpers/http-helper'
import { HttpRequest, HttpResponse, Middleware } from '../protocols'

export class AuthMiddleware implements Middleware {
  constructor(private readonly verifyToken: VerifyToken) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token']
      if (accessToken) {
        const account = await this.verifyToken.verify(accessToken)
      }

      return forbidden(new AccessDeniedError())
    } catch (error) {
      throw error
    }
  }
}
