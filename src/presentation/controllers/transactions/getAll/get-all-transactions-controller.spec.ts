import { TransactionModel } from '../../../../domain/models/transactions/transaction'
import { GetTransactions } from '../../../../domain/usecases/transactions/get-transactions'
import { ok, serverError, unauthorized } from '../../../helpers/http-helper'
import { GetAllTransactionsController } from './get-all-transactions-controller'

const date = new Date()
const makeTransactionArray = (): TransactionModel[] => {
  return [
    {
      id: 'f53fab1d-01e7-4cda-b02c-4ca5dfa336f7',
      accountId: '05411f67-1737-4301-85a9-f5d715ca621f',
      originCurrency: 'USD',
      originAmount: 100,
      destinationCurrency: 'BRL',
      destinationAmount: 516.1604,
      conversionRate: 5.161604,
      conversionRateLabel: '1 USD -> 5.161604 BRL',
      createdAt: date,
    },
    {
      id: 'f53fab1d-01e7-4cda-b02c-4ca5dfa336f7',
      accountId: '05411f67-1737-4301-85a9-f5d715ca621f',
      originCurrency: 'USD',
      originAmount: 100,
      destinationCurrency: 'BRL',
      destinationAmount: 516.1604,
      conversionRate: 5.161604,
      conversionRateLabel: '1 USD -> 5.161604 BRL',
      createdAt: date,
    },
  ]
}

const makeGetTransactions = (): GetTransactions => {
  class GetTransactionsStub implements GetTransactions {
    get(accountId: string): Promise<TransactionModel[]> {
      return new Promise((resolve) => resolve(makeTransactionArray()))
    }
  }
  return new GetTransactionsStub()
}

interface SutTypes {
  sut: GetAllTransactionsController
  getTransactionsStub: GetTransactions
}

const makeSut = (): SutTypes => {
  const getTransactionsStub = makeGetTransactions()
  const sut = new GetAllTransactionsController(getTransactionsStub)
  return {
    sut,
    getTransactionsStub,
  }
}

const makeFakeRequest = () => ({
  body: {
    accountId: 'any_id',
  },
})

describe('GetAllTransactions Controller', () => {
  test('Should call GetTransactions with correct account id', async () => {
    const { sut, getTransactionsStub } = makeSut()
    const getSpy = jest.spyOn(getTransactionsStub, 'get')

    const httpRequest = makeFakeRequest()

    await sut.handle(httpRequest)
    expect(getSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should return 401 no user exists inside the request body', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        accountId: null,
      },
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(unauthorized())
  })

  test('Should return transactions on success', async () => {
    const { sut } = makeSut()
    const httpRequest = makeFakeRequest()

    const response = await sut.handle(httpRequest)
    expect(response).toEqual(ok(makeTransactionArray()))
  })

  test('Should return 500 if AddTransaction throws', async () => {
    const { sut, getTransactionsStub } = makeSut()
    jest.spyOn(getTransactionsStub, 'get').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
