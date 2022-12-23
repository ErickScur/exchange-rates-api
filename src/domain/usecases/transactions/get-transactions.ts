import { TransactionModel } from '../../models/transactions/transaction'

export interface GetTransactions {
  get(accountId: string): Promise<TransactionModel[]>
}
