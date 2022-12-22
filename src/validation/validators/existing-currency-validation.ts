import { InvalidParamError } from '../../presentation/errors'
import { Validation } from '../../presentation/protocols'
import { CurrencyValidator } from '../protocols/currency-validator'

export class ExistingCurrencyValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly currencyValidator: CurrencyValidator,
  ) {}
  validate(input: any): Error {
    const isValid = this.currencyValidator.isValid(input[this.fieldName])
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
