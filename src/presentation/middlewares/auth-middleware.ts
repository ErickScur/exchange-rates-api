import { VerifyToken } from '../../domain/usecases/authentication/verify-token'
import { AccessDeniedError } from '../errors/access-denied-error'
import { forbidden, ok } from '../helpers/http-helper'
import { HttpResponse, Middleware } from '../protocols'

export class AuthMiddleware implements Middleware {
  constructor(private readonly verifyToken: VerifyToken) {}

  async handle(httpRequest: AuthMiddleware.Request): Promise<HttpResponse> {
    try {
      const { accessToken } = httpRequest
      if (accessToken) {
        const account = await this.verifyToken.verify(accessToken)
        if (account) {
          return ok({ accountId: account.id })
        }
      }

      return forbidden(new AccessDeniedError())
    } catch (error) {
      throw error
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace AuthMiddleware {
  export type Request = {
    accessToken?: string
  }
}
