import { DbAddAccount } from './db-add-account'
import {
  AccountModel,
  LoadAccountByEmailRepository,
  Hasher,
  AddAccountRepository,
  AddAccountModel,
} from './db-add-account-protocols'

const makeFakeAccount = (): AccountModel => {
  const account: AccountModel = {
    id: 'any_id',
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'hashed_password',
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

const makeHasher = (): Hasher => {
  class HasherStub {
    async hash(value: string): Promise<string> {
      return new Promise((resolve) => resolve('hashed_password'))
    }
  }
  return new HasherStub()
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

interface SutTypes {
  sut: DbAddAccount
  addAccountRepositoryStub: AddAccountRepository
  loadAccountByEmailRepositorystub: LoadAccountByEmailRepository
  hasherStub: Hasher
}

const makeSut = (): SutTypes => {
  const addAccountRepositoryStub = makeAddAccountRepository()
  const loadAccountByEmailRepositorystub =
    new LoadAccountByEmailRepositoryStub()
  const hasherStub = makeHasher()
  const sut = new DbAddAccount(
    addAccountRepositoryStub,
    loadAccountByEmailRepositorystub,
    hasherStub,
  )

  return {
    sut,
    addAccountRepositoryStub,
    loadAccountByEmailRepositorystub,
    hasherStub,
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
      password: 'hashed_password',
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

  test('Should call Hasher with correct password', async () => {
    const { sut, hasherStub } = makeSut()
    const hashSpy = jest.spyOn(hasherStub, 'hash')
    await sut.add(accountData)

    expect(hashSpy).toHaveBeenCalledWith('valid_password')
  })
})
