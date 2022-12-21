import { AccountModel } from '../../../../domain/models/authentication/account'

export interface LoadAccountByEmailRepository {
  loadByEmail(email: string): Promise<AccountModel>
}
