import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

type TokenPayload = {
  id: string
  iat: number
  exp: number
}

jest.mock('jsonwebtoken', () => ({
  async sign(): Promise<string> {
    return new Promise((resolve) => resolve('any_token'))
  },
  async verify(): Promise<TokenPayload> {
    return new Promise((resolve) => resolve({ id: 'any_id', iat: 1, exp: 1 }))
  },
}))
const makeSut = (): JwtAdapter => {
  return new JwtAdapter('secret')
}

describe('Jwt Adapter', () => {
  test('Should call sign with correct values', async () => {
    const sut = makeSut()
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt('any_value')
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_value' }, 'secret')
  })

  test('Should return a token on sign success', async () => {
    const sut = makeSut()
    const accessToken = await sut.encrypt('any_value')
    expect(accessToken).toBe('any_token')
  })

  test('Should throw if sign throws', async () => {
    const sut = makeSut()
    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.encrypt('any_value')

    await expect(promise).rejects.toThrow()
  })

  test('Should return an id on verify success', async () => {
    const sut = makeSut()
    const payload = await sut.decrypt('any_token')
    expect(payload).toBe('any_id')
  })

  test('Should throw if verify throws', async () => {
    const sut = makeSut()
    jest.spyOn(jwt, 'verify').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.decrypt('any_value')

    await expect(promise).rejects.toThrow()
  })
})
