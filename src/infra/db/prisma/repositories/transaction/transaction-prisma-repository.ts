import {
  AddTransactionRepository,
  AddTransactionRepositoryModel,
} from '../../../../../data/protocols/db/transaction/add-transaction-repository'
import { TransactionModel } from '../../../../../domain/models/transactions/transaction'
import { PrismaInstance } from '../../helpers/prisma-instance'

export class TransactionPrismaRepository implements AddTransactionRepository {
  constructor(private readonly prisma: PrismaInstance) {}

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
