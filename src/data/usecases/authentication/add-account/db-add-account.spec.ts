import { AccountModel } from '../../../../domain/models/authentication/account'
import { AddAccountModel } from '../../../../domain/usecases/authentication/add-account'
import { AddAccountRepository } from '../../../protocols/db/account/add-account-repository'
import { LoadAccountByEmailRepository } from '../../../protocols/db/account/load-account-by-email-repository'
import { DbAddAccount } from './db-add-account'

interface SutTypes {
  sut: DbAddAccount
  addAccountRepositoryStub: AddAccountRepository
  loadAccountByEmailRepositorystub: LoadAccountByEmailRepository
}

const makeFakeAccount = (): AccountModel => {
  const account: AccountModel = {
    id: 'any_id',
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'valid_password',
  }
  return account
}

const accountData = {
  name: 'valid_name',
  email: 'valid_email',
  password: 'valid_password',
}

class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
  async loadByEmail(email: string): Promise<AccountModel> {
    const account = makeFakeAccount()
    return new Promise((resolve) => resolve(null))
  }
}

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(accountData: AddAccountModel): Promise<AccountModel> {
      const fakeAccount = {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email',
        password: 'valid_password',
      }
      return new Promise((resolve) => resolve(fakeAccount))
    }
  }
  return new AddAccountRepositoryStub()
}

const makeSut = (): SutTypes => {
  const addAccountRepositoryStub = makeAddAccountRepository()
  const loadAccountByEmailRepositorystub =
    new LoadAccountByEmailRepositoryStub()
  const sut = new DbAddAccount(
    addAccountRepositoryStub,
    loadAccountByEmailRepositorystub,
  )

  return {
    sut,
    addAccountRepositoryStub,
    loadAccountByEmailRepositorystub,
  }
}

describe('DbAddAccount Usecase', () => {
  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addAccountSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    await sut.add(accountData)

    expect(addAccountSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
    })
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest
      .spyOn(addAccountRepositoryStub, 'add')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      )
    const promise = sut.add(accountData)

    await expect(promise).rejects.toThrow()
  })

  test('Should return an account on success', async () => {
    const { sut } = makeSut()

    const account = await sut.add(accountData)
    expect(account).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
    })
  })

  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositorystub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositorystub, 'loadByEmail')
    await sut.add(accountData)
    expect(loadSpy).toHaveBeenCalledWith('valid_email')
  })

  test('Should return null if LoadAccountByEmailRepository returns an account', async () => {
    const { sut, loadAccountByEmailRepositorystub } = makeSut()
    jest
      .spyOn(loadAccountByEmailRepositorystub, 'loadByEmail')
      .mockReturnValueOnce(new Promise((resolve) => resolve(makeFakeAccount())))

    const account = await sut.add(makeFakeAccount())
    expect(account).toBe(null)
  })
})
