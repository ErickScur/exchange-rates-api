import { DbAddTransaction } from '../../../../../data/usecases/transaction/add/db-add-transaction'
import { AddTransaction } from '../../../../../domain/usecases/transactions/add-transaction'
import { PrismaInstance } from '../../../../../infra/db/prisma/helpers/prisma-instance'
import { TransactionPrismaRepository } from '../../../../../infra/db/prisma/repositories/transaction/transaction-prisma-repository'
import { ExchangeRatesApiAdapter } from '../../../../../infra/exchange-rates/exchange-rates-api-adapter'
import env from '../../../../config/env'

export const makeDbAddTransaction = (): AddTransaction => {
  const exchangeRatesAdapter = new ExchangeRatesApiAdapter(
    env.exchangeRatesApiKey,
  )
  const prismaInstance = new PrismaInstance()
  const repository = new TransactionPrismaRepository(prismaInstance)
  return new DbAddTransaction(exchangeRatesAdapter, repository)
}
