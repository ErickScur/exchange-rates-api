import { AccountModel } from '../../../../domain/models/authentication/account'
import { LoadAccountByEmailRepository } from '../../../protocols/db/account/load-account-by-email-repository'
import { DbAuthentication } from './db-authentication'

interface sutTypes {
  sut: DbAuthentication
  loadAccountByEmailRepositorystub: LoadAccountByEmailRepository
}

const makeSut = (): sutTypes => {
  class LoadAccountByEmailRepositoryStub
    implements LoadAccountByEmailRepository
  {
    async loadByEmail(email: string): Promise<AccountModel> {
      const account: AccountModel = {
        id: 'any_id',
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
      }
      return new Promise((resolve) => resolve(account))
    }
  }

  const loadAccountByEmailRepositorystub =
    new LoadAccountByEmailRepositoryStub()
  const sut = new DbAuthentication(loadAccountByEmailRepositorystub)
  return {
    sut,
    loadAccountByEmailRepositorystub,
  }
}

describe('DbAuthentication UseCase', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositorystub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositorystub, 'loadByEmail')
    await sut.auth({
      email: 'any_email@mail.com',
      password: 'any_password',
    })
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
