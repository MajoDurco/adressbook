const jwt = require('jsonwebtoken')
const { jwtExpiration, jwtSecret } = require('../../config')

function generateToken(payload, expiration=jwtExpiration) {
  return jwt.sign(payload, jwtSecret, { expiresIn: expiration })
}

function verifyToken(token, jwtSecret) {
  return jwt.verify(token, jwtSecret)
}

module.exports = {
  generateToken,
  verifyToken,
}