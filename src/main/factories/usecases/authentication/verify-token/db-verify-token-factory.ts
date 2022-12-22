import { DbVerifyToken } from '../../../../../data/usecases/authentication/verify-token/db-verify-token'
import { VerifyToken } from '../../../../../domain/usecases/authentication/verify-token'
import { JwtAdapter } from '../../../../../infra/criptography/jwt-adapter/jwt-adapter'
import { PrismaInstance } from '../../../../../infra/db/prisma/helpers/prisma-instance'
import { AccountPrismaRepository } from '../../../../../infra/db/prisma/repositories/account/account-prisma-repository'
import env from '../../../../config/env'

export const makeDbVerifyToken = (): VerifyToken => {
  const decrypter = new JwtAdapter(env.jwtSecret)
  const prisma = new PrismaInstance()
  const repository = new AccountPrismaRepository(prisma)
  return new DbVerifyToken(decrypter, repository)
}
