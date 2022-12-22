import {
  ExchangeRateModel,
  GetCurrenciesExchangeRateModel,
} from '../../../domain/models/exchange-rate/exchange-rate'

export interface GetCurrenciesExchangeRate {
  getExchangeRate(
    data: GetCurrenciesExchangeRateModel,
  ): Promise<ExchangeRateModel>
}
