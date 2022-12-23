import { GetTransactions } from '../../../../domain/usecases/transactions/get-transactions'
import { ok, unauthorized } from '../../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'

export class GetAllTransactionsController implements Controller {
  constructor(private readonly getTransactions: GetTransactions) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.body.accountId) return unauthorized()

      const transactions = await this.getTransactions.get(
        httpRequest.body.accountId,
      )

      return ok(transactions)
    } catch (error) {
      throw error
    }
  }
}
