import { AccountModel } from '../../models/authentication/account'

export interface VerifyToken {
  verify(token: string): Promise<AccountModel>
}
