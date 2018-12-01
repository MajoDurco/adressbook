const joi = require('joi');
const errorMessages = require('../constants/errorMessages')

const signUpRequest = joi.object({
  email: joi
    .string()
    .email({ minDomainAtoms: 2 })
    .required()
    .error(new Error(errorMessages.INVALID_EMAIL_FORMAT.type)),
  password: joi
    .string()
    .regex(/^[a-zA-Z0-9]{8,30}$/)
    .required()
    .error(new Error(errorMessages.INVALID_PASSWORD_FORMAT.type)),
}).required()

const signInRequest = joi.object({
  email: joi
    .string()
    .required()
    .error(new Error(errorMessages.SIGN_IN_ERROR.type)),
  password: joi
    .string()
    .required()
    .error(new Error(errorMessages.SIGN_IN_ERROR.type)),
}).required()

module.exports = {
  signInRequest,
  signUpRequest,
}
