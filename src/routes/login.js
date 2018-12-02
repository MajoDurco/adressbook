const express = require('express')

const validateSchema = require('../schemas/validate')
const { generateToken } = require('../services/jwt')
const { getAdressBookDB } = require('../utils/getDatabase')
const { sendErrorResponse } = require('../utils')
const { signUpNewUser, signInUser } = require('../services/users')
const { userSchemas } = require('../schemas')

const loginRouter = express.Router()

loginRouter.post('/signup', async (req, res) => {
  try {
    const { email, password } = await validateSchema(req.body, userSchemas.signUpRequest)
    const db = await getAdressBookDB()
    const response = await signUpNewUser(db, { email, password })
    res.status(response.statusCode)
    res.send({
      message: response.message,
      status: response.statusCode
    })
  } catch (err) {
    sendErrorResponse(res, err)
  }
})

loginRouter.post('/signin', async (req, res) => {
  try {
    const { email, password } = await validateSchema(req.body, userSchemas.signInRequest)
    const db = await getAdressBookDB()
    const user = await signInUser(db, { email, password })
    const token = generateToken({ email: user.email })
    res.send({ token })
  } catch (err) {
    sendErrorResponse(res, err)
  }
})

module.exports = loginRouter
