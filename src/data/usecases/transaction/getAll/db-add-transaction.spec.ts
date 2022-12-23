import { TransactionModel } from '../../../../domain/models/transactions/transaction'
import { LoadTransactionsRepository } from '../../../protocols/db/transaction/load-transactions-repository'
import { DbGetTransactions } from './db-get-transactions'

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

const makeLoadTransactionsRepository = (): LoadTransactionsRepository => {
  class LoadTransactionsRepositoryStub implements LoadTransactionsRepository {
    load(accountId: string): Promise<TransactionModel[]> {
      return new Promise((resolve) => resolve(makeTransactionArray()))
    }
  }
  return new LoadTransactionsRepositoryStub()
}

interface SutTypes {
  sut: DbGetTransactions
  loadTransactionsRepositoryStub: LoadTransactionsRepository
}

const makeSut = (): SutTypes => {
  const loadTransactionsRepositoryStub = makeLoadTransactionsRepository()
  const sut = new DbGetTransactions(loadTransactionsRepositoryStub)

  return {
    sut,
    loadTransactionsRepositoryStub,
  }
}

describe('DbAddTransaction UseCase', () => {
  test('Should call LoadTransactionRepository with correct id', async () => {
    const { sut, loadTransactionsRepositoryStub } = makeSut()

    const loadSpy = jest.spyOn(loadTransactionsRepositoryStub, 'load')
    await sut.get('any_id')

    expect(loadSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should return transactions on success', async () => {
    const { sut } = makeSut()

    const response = await sut.get('any_id')
    expect(response).toEqual(makeTransactionArray())
  })

  test('Should throw if AddTransactionRepository throws', async () => {
    const { sut, loadTransactionsRepositoryStub } = makeSut()
    jest
      .spyOn(loadTransactionsRepositoryStub, 'load')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      )
    const promise = sut.get('any_id')

    await expect(promise).rejects.toThrow()
  })
})
