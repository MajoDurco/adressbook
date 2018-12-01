const errorMessages = require('../constants/errorMessages')
const validateSchema = require('../schemas/validate')
const { authHeader } = require('../schemas/headers')
const { sendErrorResponse } = require('../utils')
const { verifyToken } = require('../services/jwt')

async function jwtMiddleware(req, res, next) {
  try {
    const { authorization } = await validateSchema(req.headers, authHeader)
    const token = verifyToken(authorization)
    res.locals.token = token
    return next()
  } catch (err) {
    return sendErrorResponse(res, err, errorMessages.AUTH_FAILED)
  }
}

module.exports = {
  jwtMiddleware,
}
