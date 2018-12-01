const joi = require('joi');
const errorMessages = require('../constants/errorMessages')

const contactSchema = joi.object({
  firstName: joi.string(),
  lastName: joi.string(),
  email: joi
    .string()
    .email({ minDomainAtoms: 2 })
    .required()
    .error(new Error(errorMessages.INVALID_EMAIL_FORMAT.type)),
}).error(new Error(errorMessages.WRONG_REQUEST), { self: true })

module.exports = {
  contactSchema,
}
