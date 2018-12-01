const express = require('express')

const httpCodes = require('../constants/httpCodes')
const validateSchema = require('../schemas/validate')
const { userSchemas } = require('../schemas')
const { signUpNewUser } = require('../services/users')
const { getAdressBookDB } = require('../getDatabase')

const loginRouter = express.Router()

loginRouter.post('/signup', async (req, res) => {
  try {
    const { email, password } = await validateSchema(req.body, userSchemas.signUpRequest)
    const db = await getAdressBookDB()
    const response = await signUpNewUser(db, { email, password })
    res.status(response.statusCode)
    res.send(response.message)
  } catch (err) {
    res.status(err.statusCode)
    res.send(err.message)
  }
})

loginRouter.post('/signin', (req, res) => {
  res.send('SignIn')
})

module.exports = loginRouter
