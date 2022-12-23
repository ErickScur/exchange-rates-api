import { CurrencyValidator } from '../../validation/protocols/currency-validator'
import { currencies } from './existing-currencies'

export class CurrencyValidatorAdapter implements CurrencyValidator {
  isValid(value: string): boolean {
    const exists = currencies[value]
    return exists ? true : false
  }
}
