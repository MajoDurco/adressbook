const express = require('express')

const httpCodes = require('../constants/httpCodes')
const validateSchema = require('../schemas/validate')
const { generateToken } = require('../services/jwt')
const { getAdressBookDB } = require('../getDatabase')
const { signUpNewUser, getUser } = require('../services/users')
const { userSchemas } = require('../schemas')

const loginRouter = express.Router()

loginRouter.post('/signup', async (req, res) => {
  try {
    const { email, password } = await validateSchema(req.body, userSchemas.signUpRequest)
    const db = await getAdressBookDB()
    const response = await signUpNewUser(db, { email, password })
    res.status(response.statusCode)
    res.send(response.message)
  } catch (err) {
    console.error(err)
    res.status(err.statusCode)
    res.send(err.message)
  }
})

loginRouter.post('/signin', async (req, res) => {
  try {
    const { email, password } = await validateSchema(req.body, userSchemas.signInRequest)
    const db = await getAdressBookDB()
    const user = await getUser(db, { email, password })
    const token = generateToken({ email: user.email })
    res.send(token)
  } catch (err) {
    console.error(err)
    res.status(err.statusCode)
    res.send(err.message)
  }
})

module.exports = loginRouter
