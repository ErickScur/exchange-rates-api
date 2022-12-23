import { CreateTransactionController } from '../../../../../presentation/controllers/transactions/create/create-transaction-controller'
import { Controller } from '../../../../../presentation/protocols'
import { makeDbAddTransaction } from '../../../usecases/transactions/add/db-add-transaction-factory'
import { makeCreateTransactionValidation } from './create-transaction-validation-factory'

export const makeCreateTransactionController = (): Controller => {
  return new CreateTransactionController(
    makeCreateTransactionValidation(),
    makeDbAddTransaction(),
  )
}
