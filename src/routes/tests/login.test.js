const bcrypt = require('bcrypt')
const request = require('supertest');
const { MongoClient } = require('mongodb')
const { MongoMemoryServer } = require('mongodb-memory-server')

const app = require('../../../app');
const errorMessages = require('../../constants/errorMessages')
const successMessages = require('../../constants/successMessages')

const { getAddressBookDB } = require('../../utils/getDatabase')
jest.mock('../../utils/getDatabase.js')

describe('Login', () => {
  let mongoServer
  let client
  let db
  beforeAll(async () => {
    mongoServer = new MongoMemoryServer()
    const mongoUri = await mongoServer.getConnectionString()
    client = await MongoClient.connect(mongoUri)
    db = client.db('addressbook')
    getAddressBookDB.mockResolvedValue(db)
  })
  afterAll(() => {
    client.close()
    mongoServer.stop()
  })
  describe('/signup', () => {
    it('Should fail because you are missing required fields', () => {
      const response = errorMessages.INVALID_EMAIL_FORMAT
      return request(app)
        .post('/signup')
        .send({})
        .expect({
          message: response.message,
          status: response.statusCode,
        })
    })
    it('Should fail because the email is not in right format', () => {
      const response = errorMessages.INVALID_EMAIL_FORMAT
      return request(app)
        .post('/signup')
        .send({
          email: 'wrong email',
          password: 'xxx'
        })
        .expect({
          message: response.message,
          status: response.statusCode,
        })
    })
    it('Should fail because password is short', () => {
      const response = errorMessages.INVALID_PASSWORD_FORMAT
      return request(app)
        .post('/signup')
        .send({
          email: 'a@a.com',
          password: 'xxx'
        })
        .expect({
          message: response.message,
          status: response.statusCode,
        })
    })
    it('Should fail because request has more data', () => {
      const response = errorMessages.WRONG_REQUEST
      return request(app)
        .post('/signup')
        .send({
          email: 'a@a.com',
          password: 'xxxyyyzzz',
          foo: 'boo'
        })
        .expect({
          message: response.message,
          status: response.statusCode,
        })
    })
    it('Should fail because the email is already in use', () => {
      db.collection('users').insertOne({
        email: 'user@user.com',
        password: 'pass1',
      })
      const response = errorMessages.EMAIL_IN_USE
      return request(app)
        .post('/signup')
        .send({
          email: 'user@user.com',
          password: 'xxxyyyzzz',
        })
        .expect({
          message: response.message,
          status: response.statusCode,
        })
    })
    it('Should create new user', async () => {
      const response = successMessages.SIGN_UP_SUCCESS
      await request(app)
        .post('/signup')
        .send({
          email: 'a@a.com',
          password: 'xxxyyyzzz',
        })
        .expect({
          message: response.message,
          status: response.statusCode,
        })
      const users = await db.collection('users').find({ email: 'a@a.com'}).toArray()
      expect(users[0]).toMatchObject({
        email: 'a@a.com',
        password: 'hashedPassword',
      })
    })
  })
  describe('/signin', () => {
    it('Should fail because the request is not in correct format', () => {
      const response = errorMessages.SIGN_IN_ERROR
      return request(app)
        .post('/signin')
        .send({})
        .expect({
          message: response.message,
          status: response.statusCode,
        })
    })
    it('Should fail because the user is not found', () => {
      const response = errorMessages.SIGN_IN_ERROR
      return request(app)
        .post('/signin')
        .send({
          email: 'b@b.com',
          password: 'xxxyyyzzz',
        })
        .expect({
          message: response.message,
          status: response.statusCode,
        })
    })
    it('Should fail because password is not correct', () => {
      db.collection('users').insertOne({
        email: 'c@c.com',
        password: 'pass1',
      })
      bcrypt.compare.mockImplementation(() => false)
      const response = errorMessages.SIGN_IN_ERROR
      return request(app)
        .post('/signin')
        .send({
          email: 'c@c.com',
          password: 'wrong',
        })
        .expect({
          message: response.message,
          status: response.statusCode,
        })
    })
    it('Should log in the user', () => {
      db.collection('users').insertOne({
        email: 'c@c.com',
        password: 'pass1',
      })
      bcrypt.compare.mockImplementation(() => true)
      return request(app)
        .post('/signin')
        .send({
          email: 'c@c.com',
          password: 'pass1',
        })
        .expect(200)
    })
  })
})