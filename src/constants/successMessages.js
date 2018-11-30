const httpCodes = require('./httpCodes')

module.exports = {
  'SIGN_UP_SUCCESS': {
    type: 'SIGN_UP_SUCCESS',

    message: 'Your account was successfully created, now you can sign in.',
    statusCode: httpCodes.CREATED,
  },
}