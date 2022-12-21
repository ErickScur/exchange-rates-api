import { Validation } from '../../../../../presentation/protocols/validation'
import {
  RequiredFieldValidation,
  CompareFieldsValidation,
  ValidationComposite,
} from '../../../../../validation/validators'
import { makeSignupValidation } from './signup-validation-factory'

jest.mock('../../../../../validation/validators/validation-composite')

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignupValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(
      new CompareFieldsValidation('password', 'passwordConfirmation'),
    )
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
