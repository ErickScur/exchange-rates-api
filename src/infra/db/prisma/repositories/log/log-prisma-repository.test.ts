import { PrismaInstance } from '../../helpers/prisma-instance'
import { LogPrismaRepository } from './log-prisma-repository'

describe('Account Prisma Repository', () => {
  const prismaInstance = new PrismaInstance()

  const makeSut = (): LogPrismaRepository => {
    return new LogPrismaRepository(prismaInstance)
  }

  beforeAll(async () => {
    await prismaInstance.connect()
  })

  afterAll(async () => {
    await prismaInstance.disconnect()
  })

  beforeEach(async () => {
    await prismaInstance.log.deleteMany()
  })

  test('Should create an error log on success', async () => {
    const sut = makeSut()
    await sut.logError('any_error')
    const count = await prismaInstance.log.count()
    expect(count).toBe(1)
  })
})
