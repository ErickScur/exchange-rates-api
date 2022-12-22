import { Decrypter } from '../../../protocols/criptography/decrypter'
import { DbVerifyToken } from './db-verify-token'

interface SutTypes {
  sut: DbVerifyToken
  decrypterStub: Decrypter
}

const makeDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    decrypt(value: string): Promise<string> {
      return new Promise((resolve) => resolve('valid_id'))
    }
  }
  return new DecrypterStub()
}

const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypter()
  const sut = new DbVerifyToken(decrypterStub)

  return {
    sut,
    decrypterStub,
  }
}

describe('DbVerifyToken UseCase', () => {
  test('Should call Decrypter with correct value', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')

    await sut.verify('any_token')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })

  test('Should return null if Decrypter returns null', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(null)

    const response = await sut.verify('any_token')
    expect(response).toBe(null)
  })
})
