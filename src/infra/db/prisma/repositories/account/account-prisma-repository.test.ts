import { PrismaInstance } from '../../helpers/prisma-instance'
import { AccountPrismaRepository } from './account-prisma-repository'

describe('Account Prisma Repository', () => {
  const prismaInstance = new PrismaInstance()

  const makeSut = (): AccountPrismaRepository => {
    return new AccountPrismaRepository(prismaInstance)
  }

  beforeAll(async () => {
    await prismaInstance.connect()
  })

  afterAll(async () => {
    await prismaInstance.disconnect()
  })

  beforeEach(async () => {
    await prismaInstance.account.deleteMany()
  })

  test('Should return an account on add success', async () => {
    const sut = makeSut()
    const account = await sut.add({
      name: 'any_name',
      email: 'any_mail@mail.mail',
      password: 'any_password',
    })

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_mail@mail.mail')
    expect(account.password).toBe('any_password')
  })
})
