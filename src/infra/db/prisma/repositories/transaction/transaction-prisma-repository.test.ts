import { PrismaInstance } from '../../helpers/prisma-instance'
import { TransactionPrismaRepository } from './transaction-prisma-repository'

describe('Transaction Prisma Repository', () => {
  const prismaInstance = new PrismaInstance()

  const makeSut = (): TransactionPrismaRepository => {
    return new TransactionPrismaRepository(prismaInstance)
  }

  beforeAll(async () => {
    await prismaInstance.connect()
  })

  afterAll(async () => {
    await prismaInstance.disconnect()
  })

  beforeEach(async () => {
    await prismaInstance.account.deleteMany()
    await prismaInstance.transaction.deleteMany()
  })

  test('Should return a transaction on add success', async () => {
    const { id: accountId } = await prismaInstance.account.create({
      data: {
        email: 'any_email',
        password: 'any_password',
        name: 'any_name',
      },
    })

    const sut = makeSut()
    const transaction = await sut.add({
      accountId,
      conversionRate: 10,
      conversionRateLabel: '1 -> 5.3',
      destinationAmount: 10,
      destinationCurrency: 'USD',
      originAmount: 53,
      originCurrency: 'BRL',
    })

    expect(transaction).toBeTruthy()
    expect(transaction.id).toBeTruthy()
    expect(transaction.conversionRate).toBe(10)
    expect(transaction.conversionRateLabel).toBe('1 -> 5.3')
    expect(transaction.destinationAmount).toBe(10)
    expect(transaction.destinationCurrency).toBe('USD')
    expect(transaction.originAmount).toBe(53)
    expect(transaction.originCurrency).toBe('BRL')
  })

  test('Should return a transaction on add success', async () => {
    const { id: accountId } = await prismaInstance.account.create({
      data: {
        email: 'any_email',
        password: 'any_password',
        name: 'any_name',
      },
    })

    const sut = makeSut()
    await sut.add({
      accountId,
      conversionRate: 10,
      conversionRateLabel: '1 -> 5.3',
      destinationAmount: 10,
      destinationCurrency: 'USD',
      originAmount: 53,
      originCurrency: 'BRL',
    })
    await sut.add({
      accountId,
      conversionRate: 10,
      conversionRateLabel: '1 -> 5.3',
      destinationAmount: 10,
      destinationCurrency: 'USD',
      originAmount: 53,
      originCurrency: 'BRL',
    })

    const transactions = await sut.load(accountId)

    transactions.forEach((t) => {
      expect(t).toBeTruthy()
      expect(t.id).toBeTruthy()
      expect(t.conversionRate).toBe(10)
      expect(t.conversionRateLabel).toBe('1 -> 5.3')
      expect(t.destinationAmount).toBe(10)
      expect(t.destinationCurrency).toBe('USD')
      expect(t.originAmount).toBe(53)
      expect(t.originCurrency).toBe('BRL')
    })
  })
})
