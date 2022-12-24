import { hash } from 'bcrypt'
import jwt from 'jsonwebtoken'
import request from 'supertest'
import { PrismaInstance } from '../../infra/db/prisma/helpers/prisma-instance'
import app from '../config/app'
import env from '../config/env'

const prismaInstance = new PrismaInstance()

const makeAccessToken = async (): Promise<string> => {
  const password = await hash('valid_password', 12)
  const { id } = await prismaInstance.account.create({
    data: {
      name: 'valid_name',
      email: 'valid_email@mail.mail',
      password,
    },
  })

  return await jwt.sign({ id }, env.jwtSecret)
}

describe('Transactions Routes', () => {
  beforeAll(async () => {
    await prismaInstance.connect()
  })

  afterAll(async () => {
    await prismaInstance.disconnect()
  })

  beforeEach(async () => {
    await prismaInstance.account.deleteMany()
    await prismaInstance.transaction.deleteMany()
  })

  describe('POST /transactions', () => {
    test('Should return 200 on create success', async () => {
      const token = await makeAccessToken()

      await request(app)
        .post('/api/transactions')
        .set('authorization', `Bearer ${token}`)
        .send({
          originCurrency: 'USD',
          originAmount: 100,
          destinationCurrency: 'BRL',
        })
        .expect(200)
    })
    test('Should return 400 if invalid data is provided', async () => {
      const token = await makeAccessToken()

      await request(app)
        .post('/api/transactions')
        .set('authorization', `Bearer ${token}`)
        .send({
          originCurrency: 'invalid_currency',
          originAmount: 100,
          destinationCurrency: 'BRL',
        })
        .expect(400)
    })
  })

  describe('GET /transactions', () => {
    test('Should return 200 on get success', async () => {
      const token = await makeAccessToken()

      await request(app)
        .get('/api/transactions')
        .set('authorization', `Bearer ${token}`)
        .expect(200)
    })
  })
})
