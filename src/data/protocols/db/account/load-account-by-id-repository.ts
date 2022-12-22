import { AccountModel } from '../../../../domain/models/authentication/account'

export interface LoadAccountByIdRepository {
  loadById(id: string): Promise<AccountModel>
}
