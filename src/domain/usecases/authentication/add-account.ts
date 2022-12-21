import { AccountModel } from '../../models/authentication/account'

export interface AddAccountModel {
  name: string
  email: string
  password: string
}

export interface AddAccount {
  add(account: AddAccountModel): AccountModel
}
