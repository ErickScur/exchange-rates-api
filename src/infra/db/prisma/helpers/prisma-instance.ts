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

  async cleanDatabase() {
    if (env.enviroment === 'production') return
    const models = Reflect.ownKeys(this).filter((key) => key[0] !== '_')

    return Promise.all(models.map((modelKey) => this[modelKey].deleteMany()))
  }
}
