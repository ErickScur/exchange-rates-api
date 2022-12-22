import { AddTransaction } from '../../../../domain/usecases/transactions/add-transaction'
import { badRequest, ok, unauthorized } from '../../../helpers/http-helper'
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
    const error = this.validation.validate(httpRequest.body)
    if (error) return badRequest(error)

    if (!httpRequest.body.account) return unauthorized()

    const { account, originCurrency, originAmount, destinationCurrency } =
      httpRequest.body

    const transaction = await this.addTransaction.add({
      accountId: account.id,
      originCurrency,
      originAmount,
      destinationCurrency,
    })
    return ok(transaction)
  }
}
