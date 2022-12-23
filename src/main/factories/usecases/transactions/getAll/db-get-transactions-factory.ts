import { DbGetTransactions } from '../../../../../data/usecases/transaction/getAll/db-get-transactions'
import { PrismaInstance } from '../../../../../infra/db/prisma/helpers/prisma-instance'
import { TransactionPrismaRepository } from '../../../../../infra/db/prisma/repositories/transaction/transaction-prisma-repository'

export const makeDbGetTransactions = (): DbGetTransactions => {
  const prismaInstance = new PrismaInstance()
  const loadTransactionsRepository = new TransactionPrismaRepository(
    prismaInstance,
  )
  return new DbGetTransactions(loadTransactionsRepository)
}
