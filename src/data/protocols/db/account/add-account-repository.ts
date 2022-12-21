import { AccountModel } from '../../../../domain/models/authentication/account'
import { AddAccountModel } from '../../../../domain/usecases/authentication/add-account'

export interface AddAccountRepository {
  add(accountData: AddAccountModel): Promise<AccountModel>
}
