import { VerifyToken } from '../../domain/usecases/authentication/verify-token'
import { AccessDeniedError } from '../errors/access-denied-error'
import { forbidden, ok } from '../helpers/http-helper'
import { HttpRequest, HttpResponse, Middleware } from '../protocols'

export class AuthMiddleware implements Middleware {
  constructor(private readonly verifyToken: VerifyToken) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token']
      if (accessToken) {
        const account = await this.verifyToken.verify(accessToken)
        if (account) {
          if (!httpRequest.body) {
            httpRequest.body = {
              user: account,
            }
          } else {
            httpRequest.body.user = account
          }
          return ok({ accountId: account.id })
        }
      }

      return forbidden(new AccessDeniedError())
    } catch (error) {
      throw error
    }
  }
}
