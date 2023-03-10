import {
  GetCurrenciesExchangeRateModel,
  ExchangeRateModel,
} from '../../../../domain/models/exchange-rate/exchange-rate'
import { TransactionModel } from '../../../../domain/models/transactions/transaction'
import {
  AddTransactionRepository,
  AddTransactionRepositoryModel,
} from '../../../protocols/db/transaction/add-transaction-repository'
import { GetCurrenciesExchangeRate } from '../../../protocols/exchange-rates/get-currencies-exchange-rate'
import { DbAddTransaction } from './db-add-transaction'

interface SutTypes {
  sut: DbAddTransaction
  getExchangeRatesStub: GetCurrenciesExchangeRate
  addTransactionRepositoryStub: AddTransactionRepository
}

const date = new Date()

const makeSut = (): SutTypes => {
  const getExchangeRatesStub = makeGetExchangeRatesStub()
  const addTransactionRepositoryStub = makeAddTransactionRepositoryStub()
  const sut = new DbAddTransaction(
    getExchangeRatesStub,
    addTransactionRepositoryStub,
  )

  return {
    sut,
    getExchangeRatesStub,
    addTransactionRepositoryStub,
  }
}

const makeGetExchangeRatesStub = (): GetCurrenciesExchangeRate => {
  class GetCurrenciesExchangeRateStub implements GetCurrenciesExchangeRate {
    getExchangeRate(
      data: GetCurrenciesExchangeRateModel,
    ): Promise<ExchangeRateModel> {
      return new Promise((resolve) =>
        resolve({
          rate: 5.3,
          result: 10,
        }),
      )
    }
  }
  return new GetCurrenciesExchangeRateStub()
}

const makeAddTransactionRepositoryStub = (): AddTransactionRepository => {
  class AddTransactionRepositoryStub implements AddTransactionRepository {
    add(transaction: AddTransactionRepositoryModel): Promise<TransactionModel> {
      return new Promise((resolve) => resolve(makeFakeTransactionResponse()))
    }
  }
  return new AddTransactionRepositoryStub()
}

const makeFakeTransactionResponse = (): TransactionModel => {
  return {
    id: 'any_id',
    accountId: 'any_id',
    conversionRate: 10,
    conversionRateLabel: '1 -> 5.3',
    createdAt: date,
    destinationAmount: 10,
    destinationCurrency: 'USD',
    originAmount: 53,
    originCurrency: 'BRL',
  }
}

const makeFakeTransactionInput = () => {
  return {
    accountId: 'any_id',
    originCurrency: 'BRL',
    destinationCurrency: 'USD',
    originAmount: 53,
  }
}

describe('DbAddTransaction UseCase', () => {
  test('Should call GetExchangeRates with correct values', async () => {
    const { sut, getExchangeRatesStub } = makeSut()
    const getSpy = jest.spyOn(getExchangeRatesStub, 'getExchangeRate')

    await sut.add(makeFakeTransactionInput())
    expect(getSpy).toHaveBeenCalledWith({
      originCurrency: 'BRL',
      destinationCurrency: 'USD',
      originAmount: 53,
    })
  })

  test('Should throw if GetExchangeRates throws', async () => {
    const { sut, getExchangeRatesStub } = makeSut()
    jest
      .spyOn(getExchangeRatesStub, 'getExchangeRate')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      )
    const promise = sut.add(makeFakeTransactionInput())

    await expect(promise).rejects.toThrow()
  })

  test('Should call AddTransactionRepository with correct values', async () => {
    const { sut, addTransactionRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addTransactionRepositoryStub, 'add')

    await sut.add(makeFakeTransactionInput())
    expect(addSpy).toHaveBeenCalledWith({
      accountId: 'any_id',
      conversionRate: 5.3,
      conversionRateLabel: '1 BRL -> 5.3 USD',
      destinationAmount: 10,
      destinationCurrency: 'USD',
      originAmount: 53,
      originCurrency: 'BRL',
    })
  })

  test('Should throw if AddTransactionRepository throws', async () => {
    const { sut, addTransactionRepositoryStub } = makeSut()
    jest
      .spyOn(addTransactionRepositoryStub, 'add')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      )
    const promise = sut.add(makeFakeTransactionInput())

    await expect(promise).rejects.toThrow()
  })

  test('Should return a transaction on success', async () => {
    const { sut } = makeSut()

    const result = await sut.add(makeFakeTransactionInput())
    expect(result).toEqual(makeFakeTransactionResponse())
  })
})
