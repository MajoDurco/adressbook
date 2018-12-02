const request = require('supertest');

const app = require('../../../app');
const errorMessages = require('../../constants/errorMessages')
const successMessages = require('../../constants/successMessages')
const { VALID_TOKEN } = require('../../constants/index')

const { addNewContact } = require('../../services/contacts')
jest.mock('../../services/contacts')

describe('/contacts', () => {
  beforeEach(() => {
    addNewContact.mockImplementation(() => {})
  })
  it('Should fail because of missing token in headers', () => {
    const expectedResponse = errorMessages.MISSING_TOKEN
    return request(app)
      .post('/contacts')
      .send({
        email: 'c@c.com',
      })
      .expect(expectedResponse.statusCode, {
        message: expectedResponse.message,
        status: expectedResponse.statusCode
      })
  })
  it('Should fail because of the not valid token', () => {
    const expectedResponse = errorMessages.AUTH_FAILED
    return request(app)
      .post('/contacts')
      .set('Authorization', 'fakeToken')
      .send({
        email: 'c@c.com',
      })
      .expect(expectedResponse.statusCode, {
        message: expectedResponse.message,
        status: expectedResponse.statusCode
      })
  })
  it('Should fail because the email is in wrong format', () => {
    const expectedResponse = errorMessages.INVALID_EMAIL_FORMAT
    return request(app)
      .post('/contacts')
      .set('Authorization', VALID_TOKEN)
      .send({
        email: 'email',
      })
      .expect(expectedResponse.statusCode, {
        message: expectedResponse.message,
        status: expectedResponse.statusCode
      })
  })
  it('Should fail because request contains unknown keys', () => {
    const expectedResponse = errorMessages.WRONG_REQUEST
    return request(app)
      .post('/contacts')
      .set('Authorization', VALID_TOKEN)
      .send({
        email: 'a@a.com',
        'foo': 'boo',
      })
      .expect(expectedResponse.statusCode, {
        message: expectedResponse.message,
        status: expectedResponse.statusCode
      })
  })
  it('Should succed and add new contact', () => {
    const expectedResponse = successMessages.CONTACT_ADDED
    return request(app)
      .post('/contacts')
      .set('Authorization', VALID_TOKEN)
      .send({
        email: 'a@a.com',
      })
      .expect(expectedResponse.statusCode, {
        message: expectedResponse.message,
        status: expectedResponse.statusCode
      })
  })
  it('Should succed and add new contact with first and last name', () => {
    const expectedResponse = successMessages.CONTACT_ADDED
    return request(app)
      .post('/contacts')
      .set('Authorization', VALID_TOKEN)
      .send({
        email: 'a@a.com',
        firstName: 'first',
        lastName: 'last',
      })
      .expect(expectedResponse.statusCode, {
        message: expectedResponse.message,
        status: expectedResponse.statusCode
      })
  })
  it('Should fail when contact already exists in DB', () => {
    addNewContact.mockImplementation(() => {
      throw errorMessages.CONTACT_EXISTS
    })
    const expectedResponse = errorMessages.CONTACT_EXISTS
    return request(app)
      .post('/contacts')
      .set('Authorization', VALID_TOKEN)
      .send({
        email: 'a@a.com',
        firstName: 'first',
        lastName: 'last',
      })
      .expect(expectedResponse.statusCode, {
        message: expectedResponse.message,
        status: expectedResponse.statusCode
      })
  })
})
