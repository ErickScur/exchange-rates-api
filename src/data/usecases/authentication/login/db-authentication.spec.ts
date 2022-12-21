import { AccountModel } from '../../../../domain/models/authentication/account'
import { Encrypter } from '../../../protocols/criptography/encrypter'
import { LoadAccountByEmailRepository } from '../../../protocols/db/account/load-account-by-email-repository'
import { DbAuthentication } from './db-authentication'

interface sutTypes {
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  encrypterStub: Encrypter
}

const makeLoadAccountByEmail = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub
    implements LoadAccountByEmailRepository
  {
    async loadByEmail(email: string): Promise<AccountModel> {
      const account: AccountModel = makeFakeAccount()
      return new Promise((resolve) => resolve(account))
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return new Promise((resolve) => resolve('any_token'))
    }
  }
  return new EncrypterStub()
}

const makeSut = (): sutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmail()
  const encrypterStub = makeEncrypter()
  const sut = new DbAuthentication(
    loadAccountByEmailRepositoryStub,
    encrypterStub,
  )
  return {
    sut,
    loadAccountByEmailRepositoryStub,
    encrypterStub,
  }
}

const makeFakeAccount = (): AccountModel => {
  const account: AccountModel = {
    id: 'any_id',
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
  }
  return account
}

describe('DbAuthentication UseCase', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.auth({
      email: 'any_email@mail.com',
      password: 'any_password',
    })
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest
      .spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
      .mockReturnValueOnce(null)
    const accessToken = await sut.auth({
      email: 'any_email@mail.com',
      password: 'any_password',
    })
    expect(accessToken).toBe(null)
  })

  test('Should call Encrypter with correct id', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.auth({
      email: 'any_email@mail.com',
      password: 'any_password',
    })
    expect(encryptSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest
      .spyOn(encrypterStub, 'encrypt')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      )

    const promise = sut.auth({
      email: 'any_email@mail.com',
      password: 'any_password',
    })
    await expect(promise).rejects.toThrow()
  })

  test('Should return a token on success', async () => {
    const { sut } = makeSut()
    const accessToken = await sut.auth({
      email: 'any_email@mail.com',
      password: 'any_password',
    })
    expect(accessToken).toBe('any_token')
  })
})
