export class TransactionModel {
  id: string
  accountId: string
  originCurrency: string
  originAmount: number
  destinationCurrency: string
  destinationAmount: number
  conversionRate: number
  conversionRateLabel: string
  createdAt: Date
}
