import { TransactionModel } from '../../../../domain/models/transactions/transaction'

export interface AddTransactionRepositoryModel {
  accountId: string
  originCurrency: string
  originAmount: number
  destinationCurrency: string
  destinationAmount: number
  conversionRate: number
  conversionRateLabel: string
}

export interface AddTransactionRepository {
  add(transaction: AddTransactionRepositoryModel): Promise<TransactionModel>
}
