const joi = require('joi');

const signUpRequest = joi.object({
  email: joi.string().email({ minDomainAtoms: 2 }).required(),
  password: joi.string().regex(/^[a-zA-Z0-9]{8,30}$/).required(),
});

module.exports = {
  signUpRequest,
}
