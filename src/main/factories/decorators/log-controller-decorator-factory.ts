import { PrismaInstance } from '../../../infra/db/prisma/helpers/prisma-instance'
import { LogPrismaRepository } from '../../../infra/db/prisma/repositories/log/log-prisma-repository'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'

export const makeLogControllerDecorator = (
  controller: Controller,
): Controller => {
  const prismaInstance = new PrismaInstance()
  const logRepository = new LogPrismaRepository(prismaInstance)
  return new LogControllerDecorator(controller, logRepository)
}
