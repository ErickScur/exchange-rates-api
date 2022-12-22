import { Decrypter } from '../../../protocols/criptography/decrypter'
import { LoadAccountByIdRepository } from '../../../protocols/db/account/load-account-by-id-repository'
import { AccountModel } from '../add-account/db-add-account-protocols'
import { DbVerifyToken } from './db-verify-token'

const makeDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    decrypt(value: string): Promise<string> {
      return new Promise((resolve) => resolve('valid_id'))
    }
  }
  return new DecrypterStub()
}

const makeLoadAccountById = (): LoadAccountByIdRepository => {
  class LoadAccountByIdRepositoryStub implements LoadAccountByIdRepository {
    loadById(id: string): Promise<AccountModel> {
      const account = makeFakeAccount()
      return new Promise((resolve) => resolve(account))
    }
  }
  return new LoadAccountByIdRepositoryStub()
}

interface SutTypes {
  sut: DbVerifyToken
  decrypterStub: Decrypter
  loadAccountByIdRepositoryStub: LoadAccountByIdRepository
}

const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypter()
  const loadAccountByIdRepositoryStub = makeLoadAccountById()
  const sut = new DbVerifyToken(decrypterStub, loadAccountByIdRepositoryStub)

  return {
    sut,
    decrypterStub,
    loadAccountByIdRepositoryStub,
  }
}

const makeFakeAccount = (): AccountModel => {
  const account: AccountModel = {
    id: 'any_id',
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'hashed_password',
  }
  return account
}

describe('DbVerifyToken UseCase', () => {
  test('Should call Decrypter with correct value', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')

    await sut.verify('any_token')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })

  test('Should return null if Decrypter returns null', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(null)

    const response = await sut.verify('any_token')
    expect(response).toBe(null)
  })

  test('Should call LoadAccountByIdRepository with correct value', async () => {
    const { sut, decrypterStub, loadAccountByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadAccountByIdRepositoryStub, 'loadById')

    jest
      .spyOn(decrypterStub, 'decrypt')
      .mockReturnValueOnce(new Promise((resolve) => resolve('valid_id')))
    await sut.verify('any_token')
    expect(loadByIdSpy).toHaveBeenCalledWith('valid_id')
  })
})
