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
  },
  'ERROR_IN_CREATING_NEW_USER': {
    type: 'ERROR_IN_CREATING_NEW_USER',

    message: 'We were unable to create you a new account',
    statusCode: httpCodes.INTERNAL_ERROR,
  },
  'WRONG_REQUEST': {
    type: 'WRONG_REQUEST',

    message: 'Your request is in wrong format',
    statusCode: httpCodes.BAD_REQUEST,
  },
  'SIGN_IN_ERROR': {
    type: 'SIGN_IN_ERROR',

    message: 'Your email or password is not correct',
    statusCode: httpCodes.UNAUTHORIZED,
  },
  'EMAIL_IN_USE': {
    type: 'EMAIL_IN_USE',

    message: 'This e-mail address is already in use',
    statusCode: httpCodes.CONFLICT,
  },
  'MISSING_TOKEN': {
    type: 'MISSING_TOKEN',

    message: 'Authorization token in request header is missing or has wrong format',
    statusCode: httpCodes.BAD_REQUEST,
  },
  'AUTH_FAILED': {
    type: 'AUTH_FAILED',

    message: "You need to log in for this action",
    statusCode: httpCodes.UNAUTHORIZED,
  },
  'SERVER_ERROR': {
    type: 'SERVER_ERROR',

    message: 'We were unable to process your request because of internal error',
    statusCode: httpCodes.INTERNAL_ERROR,
  },
  'CONTACT_EXISTS': {
    type: 'CONTACT_EXISTS',

    message: 'This contact already exists',
    statusCode: httpCodes.CONFLICT,
  },
}
