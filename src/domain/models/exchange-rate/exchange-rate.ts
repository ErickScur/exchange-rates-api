export interface GetCurrenciesExchangeRateModel {
  originCurrency: string
  originAmount: number
  destinationCurrency: string
}

export interface ExchangeRateModel {
  rate: number
  result: number
}
