import request from 'supertest'
import { PrismaInstance } from '../../infra/db/prisma/helpers/prisma-instance'
import app from '../config/app'

const prismaInstance = new PrismaInstance()

describe('Auth Routes', () => {
  beforeAll(async () => {
    await prismaInstance.connect()
  })

  afterAll(async () => {
    await prismaInstance.disconnect()
  })

  beforeEach(async () => {
    await prismaInstance.account.deleteMany()
  })

  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'valid_name',
          email: 'valid_email@mail.mail',
          password: '123456789',
          passwordConfirmation: '123456789',
        })
        .expect(200)
    })
  })

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      await prismaInstance.account.create({
        data: {
          name: 'valid_name',
          email: 'valid_email@mail.mail',
          password: 'valid_password',
        },
      })

      await request(app)
        .post('/api/login')
        .send({
          email: 'valid_email@mail.mail',
          password: 'valid_password',
        })
        .expect(200)
    })

    test('Should return 401 if login fails', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'valid_email@mail.mail',
          password: '123',
        })
        .expect(401)
    })
  })
})
