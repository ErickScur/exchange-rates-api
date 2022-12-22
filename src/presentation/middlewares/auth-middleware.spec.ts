import { VerifyToken } from '../../domain/usecases/authentication/verify-token'
import {
  AccountModel,
  forbidden,
} from '../controllers/authentication/signup/signup-controller-protocols'
import { AccessDeniedError } from '../errors/access-denied-error'
import { HttpRequest } from '../protocols'
import { AuthMiddleware } from './auth-middleware'

const makeFakeRequest = (): HttpRequest => {
  return {
    headers: {
      'x-access-token': 'any_token',
    },
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

const makeVerifyToken = (): VerifyToken => {
  class VerifyTokenStub implements VerifyToken {
    verify(token: string): Promise<AccountModel> {
      const account = makeFakeAccount()
      return new Promise((resolve) => resolve(account))
    }
  }
  return new VerifyTokenStub()
}

const makeSut = (role?: string): SutTypes => {
  const verifyTokenStub = makeVerifyToken()
  const sut = new AuthMiddleware(verifyTokenStub)
  return {
    sut,
    verifyTokenStub,
  }
}

interface SutTypes {
  sut: AuthMiddleware
  verifyTokenStub: VerifyToken
}

describe('Auth Middleware', () => {
  test('Should return 403 if no x-access-token exists in headers', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })
})
