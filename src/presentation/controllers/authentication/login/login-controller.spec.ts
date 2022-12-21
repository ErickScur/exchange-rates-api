import { LoginController } from './login-controller'
import {
  Controller,
  badRequest,
  MissingParamError,
} from './login-controller-protocols'

interface SutTypes {
  sut: Controller
}

const makeSut = (): SutTypes => {
  const sut = new LoginController()
  return {
    sut,
  }
}

describe('Login Controller', () => {
  test('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        password: 'any_password',
      },
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('Should return 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
      },
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })
})
