import { AuthMiddleware } from '../../../../presentation/middlewares/auth-middleware'
import { makeDbVerifyToken } from '../../usecases/authentication/verify-token/db-verify-token-factory'

export const makeAuthMiddleware = (): AuthMiddleware => {
  return new AuthMiddleware(makeDbVerifyToken())
}
