const joi = require('joi');
const errorMessages = require('../constants/errorMessages')

const authHeader = joi.object({
  authorization: joi
    .string()
    .required()
    .error(new Error(errorMessages.MISSING_TOKEN.type)),
}).unknown()

module.exports = {
  authHeader
}