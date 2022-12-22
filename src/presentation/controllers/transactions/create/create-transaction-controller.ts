import {
  Controller,
  HttpRequest,
  HttpResponse,
  Validation,
} from '../../../protocols'

export class CreateTransactionController implements Controller {
  constructor(private readonly validation: Validation) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.validation.validate(httpRequest.body)
    return null
  }
}
