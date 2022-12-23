import { AddTransaction } from '../../../../domain/usecases/transactions/add-transaction'
import {
  badRequest,
  ok,
  serverError,
  unauthorized,
} from '../../../helpers/http-helper'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  Validation,
} from '../../../protocols'

export class CreateTransactionController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addTransaction: AddTransaction,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) return badRequest(error)

      if (!httpRequest.body.accountId) return unauthorized()

      const { accountId, originCurrency, originAmount, destinationCurrency } =
        httpRequest.body

      const transaction = await this.addTransaction.add({
        accountId,
        originCurrency,
        originAmount,
        destinationCurrency,
      })
      return ok(transaction)
    } catch (error) {
      return serverError(error)
    }
  }
}
