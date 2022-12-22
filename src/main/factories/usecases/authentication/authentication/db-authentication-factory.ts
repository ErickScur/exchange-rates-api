import { DbAuthentication } from '../../../../../data/usecases/authentication/login/db-authentication'
import { Authentication } from '../../../../../domain/usecases/authentication/authentication'
import { BcryptAdapter } from '../../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../../../infra/criptography/jwt-adapter/jwt-adapter'
import { PrismaInstance } from '../../../../../infra/db/prisma/helpers/prisma-instance'
import { AccountPrismaRepository } from '../../../../../infra/db/prisma/repositories/account/account-prisma-repository'
import env from '../../../../config/env'

export const makeDbAuthentication = (): Authentication => {
  const salt = 12
  const accountPrismaRepository = new AccountPrismaRepository(
    new PrismaInstance(),
  )
  const bcryptAdapater = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  return new DbAuthentication(
    accountPrismaRepository,
    jwtAdapter,
    bcryptAdapater,
  )
}
