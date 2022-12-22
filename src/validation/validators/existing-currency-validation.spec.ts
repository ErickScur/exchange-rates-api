import { InvalidParamError } from '../../presentation/errors'
import { CurrencyValidator } from '../protocols/currency-validator'
import { ExistingCurrencyValidation } from './existing-currency-validation'

type SutTypes = {
  sut: ExistingCurrencyValidation
  currencyValidatorStub: CurrencyValidator
}

const makeCurrencyValidator = (): CurrencyValidator => {
  class CurrencyValidatorStub implements CurrencyValidator {
    isValid(): boolean {
      return false
    }
  }
  return new CurrencyValidatorStub()
}

const makeSut = (): SutTypes => {
  const currencyValidatorStub = makeCurrencyValidator()
  const sut = new ExistingCurrencyValidation('any_field', currencyValidatorStub)
  return {
    sut,
    currencyValidatorStub,
  }
}

describe('RequiredField Validation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const { sut } = makeSut()
    const error = sut.validate({ name: 'any_name' })
    expect(error).toEqual(new InvalidParamError('any_field'))
  })

  test('Should not return if validation succeeds', () => {
    const { sut, currencyValidatorStub } = makeSut()
    jest.spyOn(currencyValidatorStub, 'isValid').mockReturnValueOnce(true)
    const error = sut.validate({ field: 'any_name' })
    expect(error).toBeFalsy()
  })
})
