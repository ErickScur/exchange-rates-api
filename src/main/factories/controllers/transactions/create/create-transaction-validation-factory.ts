import { CurrencyValidatorAdapter } from '../../../../../infra/validators/currency-validator-adapter'
import { Validation } from '../../../../../presentation/protocols'
import {
  RequiredFieldValidation,
  ValidationComposite,
} from '../../../../../validation/validators'
import { ExistingCurrencyValidation } from '../../../../../validation/validators/existing-currency-validation'

export const makeCreateTransactionValidation = (): ValidationComposite => {
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
  return new ValidationComposite(validations)
}
