import { GetCurrenciesExchangeRate } from '../../data/protocols/exchange-rates/get-currencies-exchange-rate'
import {
  GetCurrenciesExchangeRateModel,
  ExchangeRateModel,
} from '../../domain/models/exchange-rate/exchange-rate'
import axios from 'axios'

export class ExchangeRatesApiAdapter implements GetCurrenciesExchangeRate {
  constructor(private readonly apiKey: string) {}

  async getExchangeRate({
    destinationCurrency,
    originAmount,
    originCurrency,
  }: GetCurrenciesExchangeRateModel): Promise<ExchangeRateModel> {
    try {
      const response = await axios.get(
        `https://api.apilayer.com/exchangerates_data/convert?to=${destinationCurrency}&from=${originCurrency}&amount=${originAmount}`,
        {
          headers: {
            'Accept-Encoding': 'gzip,deflate,compress',
            apikey: this.apiKey,
          },
        },
      )

      return {
        rate: response.data.info.rate,
        result: response.data.result,
      }
    } catch (error) {
      throw error
    }
  }
}
