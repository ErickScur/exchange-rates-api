import {
  AddTransactionRepository,
  AddTransactionRepositoryModel,
} from '../../../../../data/protocols/db/transaction/add-transaction-repository'
import { LoadTransactionsRepository } from '../../../../../data/protocols/db/transaction/load-transactions-repository'
import { TransactionModel } from '../../../../../domain/models/transactions/transaction'
import { PrismaInstance } from '../../helpers/prisma-instance'

export class TransactionPrismaRepository
  implements AddTransactionRepository, LoadTransactionsRepository
{
  constructor(private readonly prisma: PrismaInstance) {}

  async load(accountId: string): Promise<TransactionModel[]> {
    try {
      const transactions = await this.prisma.transaction.findMany({
        where: { accountId },
      })
      return transactions
    } catch (error) {
      throw error
    }
  }

  async add(
    transaction: AddTransactionRepositoryModel,
  ): Promise<TransactionModel> {
    try {
      return await this.prisma.transaction.create({
        data: transaction,
      })
    } catch (error) {
      throw error
    }
  }
}
