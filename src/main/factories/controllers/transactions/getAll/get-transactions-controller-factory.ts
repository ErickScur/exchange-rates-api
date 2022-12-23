import { GetAllTransactionsController } from '../../../../../presentation/controllers/transactions/getAll/get-all-transactions-controller'
import { Controller } from '../../../../../presentation/protocols'
import { makeDbGetTransactions } from '../../../usecases/transactions/getAll/db-get-transactions-factory'

export const makeGetTransactionsController = (): Controller => {
  return new GetAllTransactionsController(makeDbGetTransactions())
}
