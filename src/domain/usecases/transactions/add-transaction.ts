import { TransactionModel } from '../../models/transactions/transaction'

export interface AddTransactionModel {
  accountId: string
  originCurrency: string
  originAmount: number
  destinationCurrency: string
}

export interface AddTransaction {
  add(transaction: AddTransactionModel): Promise<TransactionModel>
}
