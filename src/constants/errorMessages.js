const httpCodes = require('./httpCodes')

module.exports = {
  'INVALID_EMAIL_FORMAT': {
    type: 'INVALID_EMAIL_FORMAT',

    message: 'Your email is not in valid format',
    statusCode: httpCodes.BAD_REQUEST,
  },
  'INVALID_PASSWORD_FORMAT': {
    type: 'INVALID_PASSWORD_FORMAT',

    message: 'Your password needs to be at least 8 characters long and without special symbols',
    statusCode: httpCodes.BAD_REQUEST,
  }
}