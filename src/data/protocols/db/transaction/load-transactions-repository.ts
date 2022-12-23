import { TransactionModel } from '../../../../domain/models/transactions/transaction'

export interface LoadTransactionsRepository {
  load(accountId: string): Promise<TransactionModel[]>
}
