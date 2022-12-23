import { TransactionModel } from '../../../../domain/models/transactions/transaction'
import {
  AddTransaction,
  AddTransactionModel,
} from '../../../../domain/usecases/transactions/add-transaction'
import { Controller, HttpRequest, Validation } from '../../../protocols'
import {
  AccountModel,
  badRequest,
  MissingParamError,
  ok,
  serverError,
  unauthorized,
} from '../../authentication/signup/signup-controller-protocols'
import { CreateTransactionController } from './create-transaction-controller'

interface SutTypes {
  sut: Controller
  validationStub: Validation
  addTransactionStub: AddTransaction
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const addTransactionStub = makeAddTransaction()
  const sut = new CreateTransactionController(
    validationStub,
    addTransactionStub,
  )
  return {
    sut,
    validationStub,
    addTransactionStub,
  }
}

const makeAddTransaction = (): AddTransaction => {
  class AddTransactionStub implements AddTransaction {
    async add(transaction: AddTransactionModel): Promise<TransactionModel> {
      return new Promise((resolve) => resolve(makeFakeTransaction()))
    }
  }
  return new AddTransactionStub()
}

const makeFakeTransaction = (): TransactionModel => {
  return {
    id: 'any_id',
    accountId: 'any_id',
    conversionRate: 10,
    conversionRateLabel: '1 -> 5.3',
    createdAt: new Date(),
    destinationAmount: 10,
    destinationCurrency: 'USD',
    originAmount: 53,
    originCurrency: 'BRL',
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

const makeFakeRequest = () => ({
  body: {
    accountId: 'any_id',
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

  test('Should return 500 if Validatiron throws', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 401 no user exists inside the request body', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        originCurrency: 'any_currency',
        originAmount: 10,
        destinationCurrency: 'any_currency',
        accountId: null,
      },
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(unauthorized())
  })

  test('Should call AddTransaction with correct values', async () => {
    const { sut, addTransactionStub } = makeSut()
    const validateSpy = jest.spyOn(addTransactionStub, 'add')

    const httpRequest = makeFakeRequest()

    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith({
      originCurrency: 'any_currency',
      originAmount: 10,
      destinationCurrency: 'any_currency',
      accountId: 'any_id',
    })
  })

  test('Should return a transaction on success', async () => {
    const { sut } = makeSut()
    const httpRequest = makeFakeRequest()

    const response = await sut.handle(httpRequest)
    expect(response).toEqual(ok(makeFakeTransaction()))
  })

  test('Should return 500 if AddTransaction throws', async () => {
    const { sut, addTransactionStub } = makeSut()
    jest.spyOn(addTransactionStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
