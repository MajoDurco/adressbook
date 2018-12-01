const request = require('supertest');
const { MongoClient } = require('mongodb')
const { MongoMemoryServer } = require('mongodb-memory-server')

const app = require('../../../app');
const errorMessages = require('../../constants/errorMessages')
const successMessages = require('../../constants/successMessages')

const { getAdressBookDB } = require('../../getDatabase')
jest.mock('../../getDatabase.js')

describe('/login', () => {
  let mongoServer
  let client
  let db
  beforeEach(async () => {
    mongoServer = new MongoMemoryServer()
    const mongoUri = await mongoServer.getConnectionString()
    client = await MongoClient.connect(mongoUri)
    db = client.db('adressbook')
    getAdressBookDB.mockResolvedValue(db)
  })
  afterEach(() => {
    client.close()
  })
  describe('/signup', () => {
    it('Should fail because you are missing required fields', () => {
      const response = errorMessages.INVALID_EMAIL_FORMAT
      return request(app)
        .post('/login/signup')
        .send({})
        .expect(response.statusCode, response.message)
    })
    it('Should fail because the email is not in right format', () => {
      const response = errorMessages.INVALID_EMAIL_FORMAT
      return request(app)
        .post('/login/signup')
        .send({
          email: 'wrong email',
          password: 'xxx'
        })
        .expect(response.statusCode, response.message)
    })
    it('Should fail because password is short', () => {
      const response = errorMessages.INVALID_PASSWORD_FORMAT
      return request(app)
        .post('/login/signup')
        .send({
          email: 'a@a.com',
          password: 'xxx'
        })
        .expect(response.statusCode, response.message)
    })
    it('Should fail because request has more data', () => {
      const response = errorMessages.WRONG_REQUEST
      return request(app)
        .post('/login/signup')
        .send({
          email: 'a@a.com',
          password: 'xxxyyyzzz',
          foo: 'boo'
        })
        .expect(response.statusCode, response.message)
    })
    it('Should create new user', async () => {
      const response = successMessages.SIGN_UP_SUCCESS
      await request(app)
        .post('/login/signup')
        .send({
          email: 'a@a.com',
          password: 'xxxyyyzzz',
        })
        .expect(response.statusCode, response.message)
      const users = await db.collection('users').find().toArray()
      expect(users).toHaveLength(1)
      expect(users[0]).toMatchObject({
        email: 'a@a.com',
        password: 'hashedPassword',
      })
    })
  })
  describe('/signin', () => {
  })
})