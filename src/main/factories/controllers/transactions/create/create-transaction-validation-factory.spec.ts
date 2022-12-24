import { CurrencyValidatorAdapter } from '../../../../../infra/validators/currency-validator-adapter'
import { Validation } from '../../../../../presentation/protocols/validation'
import {
  RequiredFieldValidation,
  ValidationComposite,
} from '../../../../../validation/validators'
import { ExistingCurrencyValidation } from '../../../../../validation/validators/existing-currency-validation'
import { makeCreateTransactionValidation } from './create-transaction-validation-factory'

jest.mock('../../../../../validation/validators/validation-composite')

describe('CreateTransactionValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeCreateTransactionValidation()
    const validations: Validation[] = []
    for (const field of [
      'originCurrency',
      'originAmount',
      'destinationCurrency',
    ]) {
      validations.push(new RequiredFieldValidation(field))
    }

    const currencyValidator = new CurrencyValidatorAdapter()
    validations.push(
      new ExistingCurrencyValidation('originCurrency', currencyValidator),
    )
    validations.push(
      new ExistingCurrencyValidation('destinationCurrency', currencyValidator),
    )

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
