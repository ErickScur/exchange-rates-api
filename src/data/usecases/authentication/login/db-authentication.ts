import {
  Authentication,
  LoadAccountByEmailRepository,
  Encrypter,
  HashComparer,
  AuthenticationModel,
} from './db-authentication-protocols'

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly encrypter: Encrypter,
    private readonly hashComparer: HashComparer,
  ) {}

  async auth(authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(
      authentication.email,
    )
    if (!account) return null

    const isValid = await this.hashComparer.compare(
      authentication.password,
      account.password,
    )
    if (!isValid) return null

    const accessToken = await this.encrypter.encrypt(account.id)
    return accessToken
  }
}
