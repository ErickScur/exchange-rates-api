import { Controller, HttpRequest, Validation } from '../../../protocols'
import {
  AccountModel,
  badRequest,
  MissingParamError,
} from '../../authentication/signup/signup-controller-protocols'
import { CreateTransactionController } from './create-transaction-controller'

interface SutTypes {
  sut: Controller
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const sut = new CreateTransactionController(validationStub)
  return {
    sut,
    validationStub,
  }
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): Error {
      return null
    }
  }
  return new ValidationStub()
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

const makeFakeRequest = (): HttpRequest => ({
  body: {
    accountId: 'any-id',
    originCurrency: 'any_currency',
    originAmount: 10,
    destinationCurrency: 'any_currency',
    account: makeFakeAccount(),
  },
})

describe('CreateTransaction Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')

    const httpRequest = makeFakeRequest()

    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new MissingParamError('any_field'))

    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
