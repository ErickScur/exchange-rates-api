import { LogPrismaRepository } from '../../../infra/db/prisma/repositories/log/log-prisma-repository'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'

export const makeLogControllerDecorator = (
  controller: Controller,
): Controller => {
  const logRepository = new LogPrismaRepository()
  return new LogControllerDecorator(controller, logRepository)
}
