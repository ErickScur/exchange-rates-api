import { Router } from 'express'
import { adaptMiddleware } from '../adapters/express-middleware-adapter'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeCreateTransactionController } from '../factories/controllers/transactions/create/create-transaction-controller-factory'
import { makeGetTransactionsController } from '../factories/controllers/transactions/getAll/get-transactions-controller-factory'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware/auth-middleware-factory'

export default (router: Router): void => {
  router.post(
    '/transactions',
    adaptMiddleware(makeAuthMiddleware()),
    adaptRoute(makeCreateTransactionController()),
  )
  router.get(
    '/transactions',
    adaptMiddleware(makeAuthMiddleware()),
    adaptRoute(makeGetTransactionsController()),
  )
}
