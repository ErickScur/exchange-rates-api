import { Validation } from '../../../../../presentation/protocols'
import {
  RequiredFieldValidation,
  ValidationComposite,
} from '../../../../../validation/validators'

export const makeCreateTransactionValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of [
    'originCurrency',
    'originAmount',
    'destinationCurrency',
  ]) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
