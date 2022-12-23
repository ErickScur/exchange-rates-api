import { TransactionModel } from '../../../../domain/models/transactions/transaction'
import { GetTransactions } from '../../../../domain/usecases/transactions/get-transactions'
import { LoadTransactionsRepository } from '../../../protocols/db/transaction/load-transactions-repository'

export class DbGetTransactions implements GetTransactions {
  constructor(
    private readonly loadTransactionsRepository: LoadTransactionsRepository,
  ) {}

  async get(accountId: string): Promise<TransactionModel[]> {
    try {
      return await this.loadTransactionsRepository.load(accountId)
    } catch (error) {
      throw error
    }
  }
}
