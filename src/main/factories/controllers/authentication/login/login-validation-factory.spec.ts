import { Validation } from '../../../../../presentation/protocols/validation'
import {
  RequiredFieldValidation,
  ValidationComposite,
} from '../../../../../validation/validators'
import { makeLoginValidation } from './login-validation-factory'

jest.mock('../../../../../validation/validators/validation-composite')

describe('LoginValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeLoginValidation()
    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
