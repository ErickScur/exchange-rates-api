import { LogErrorRepository } from '../../../../../data/protocols/db/log/log-error-repository'
import { prismaInstance } from '../../helpers/prisma-instance'

export class LogPrismaRepository implements LogErrorRepository {
  async logError(stack: string): Promise<void> {
    await prismaInstance.log.create({
      data: { stack },
    })
  }
}
