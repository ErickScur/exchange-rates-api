import { Validation } from '../../../../../presentation/protocols/validation'
import {
  CompareFieldsValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '../../../../../validation/validators'

export const makeSignupValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }

  validations.push(
    new CompareFieldsValidation('password', 'passwordConfirmation'),
  )
  return new ValidationComposite(validations)
}
