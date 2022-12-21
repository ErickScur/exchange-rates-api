import { PrismaClient } from '@prisma/client'
import env from '../../../../main/config/env'

export class PrismaInstance extends PrismaClient {
  constructor(url?: string) {
    super({
      datasources: {
        db: {
          url: url || env.databaseUrl,
        },
      },
    })
  }

  async connect(): Promise<void> {
    await this.$connect()
  }

  async disconnect(): Promise<void> {
    await this.$disconnect()
  }
}
