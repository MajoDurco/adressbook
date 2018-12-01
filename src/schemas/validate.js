const joi = require('joi');
const errorMessages = require('../constants/errorMessages')

module.exports = (...args) => {
  return joi
    .validate(...args)
    .catch((err) => {
      throw errorMessages[err.message] || errorMessages.WRONG_REQUEST
    })
}
