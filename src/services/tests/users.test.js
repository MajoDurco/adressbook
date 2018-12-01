const { MongoClient } = require('mongodb')
const { MongoMemoryServer } = require('mongodb-memory-server')
const bcrypt = require('bcrypt')

const errorMessages = require('../../constants/errorMessages')
const successMessages = require('../../constants/successMessages')
const { signUpNewUser } = require('../users')

describe('User service', () => {
  let mongoServer
  let client
  let db
  beforeEach(async () => {
    mongoServer = new MongoMemoryServer()
    const mongoUri = await mongoServer.getConnectionString()
    client = await MongoClient.connect(mongoUri)
    db = client.db('testDB')
  })
  afterEach(() => {
    client.close()
  })
  it('Should create new user in the database', async () => {
    const response = await signUpNewUser(db, {
      email: 'fakeEmail',
      password: 'fakePassword',
    })
    const users = await db.collection('users').find().toArray()
    expect(users).toHaveLength(1)
    expect(users[0]).toMatchObject({
      email: 'fakeEmail',
      password: 'hashedPassword',
    })
    expect(response).toEqual(successMessages.SIGN_UP_SUCCESS)
  })
  it('Should catch an error and return correct response', async () => {
    bcrypt.hash.mockImplementation(() => { throw 'Fake Error' })
    const response = await signUpNewUser(db, {
      email: 'fakeEmail',
      password: 'fakePassword',
    })
    expect(response).toEqual(errorMessages.ERROR_IN_CREATING_NEW_USER)
  })
})
