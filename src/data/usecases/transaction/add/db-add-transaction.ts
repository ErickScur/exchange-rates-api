import { TransactionModel } from '../../../../domain/models/transactions/transaction'
import {
  AddTransaction,
  AddTransactionModel,
} from '../../../../domain/usecases/transactions/add-transaction'
import { AddTransactionRepository } from '../../../protocols/db/transaction/add-transaction-repository'
import { GetCurrenciesExchangeRate } from '../../../protocols/exchange-rates/get-currencies-exchange-rate'

export class DbAddTransaction implements AddTransaction {
  constructor(
    private readonly getExchangeRates: GetCurrenciesExchangeRate,
    private readonly addTransactionRepository: AddTransactionRepository,
  ) {}

  async add(transaction: AddTransactionModel): Promise<TransactionModel> {
    try {
      const { accountId, destinationCurrency, originAmount, originCurrency } =
        transaction

      await this.getExchangeRates.getExchangeRate({
        destinationCurrency,
        originAmount,
        originCurrency,
      })
      return null
    } catch (error) {
      throw error
    }
  }
}