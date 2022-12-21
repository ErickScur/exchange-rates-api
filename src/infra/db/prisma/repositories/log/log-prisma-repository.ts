import { LogErrorRepository } from '../../../../../data/protocols/db/log/log-error-repository'
import { PrismaInstance } from '../../helpers/prisma-instance'

export class LogPrismaRepository implements LogErrorRepository {
  constructor(private readonly prismaInstance: PrismaInstance) {}

  async logError(stack: string): Promise<void> {
    await this.prismaInstance.log.create({
      data: { stack },
    })
  }
}
