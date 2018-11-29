const express = require('express')

const loginRouter = express.Router()
const mongo = require('../mongo')()
const { userSchemas } = require('../schemas')
const validateSchema = require('../schemas/validate')

loginRouter.post('/signup', async (req, res) => {
  try {
    const { email, password } = await validateSchema(req.body, userSchemas.signUpRequest)
    const client = await mongo;
    const db = client.db('adressbook')
    const collection = db.collection('users')
    const result = await collection.insertOne({ email, password })
    res.send('success')
  } catch (err) {
    res.status(err.statusCode)
    res.send(err.message)
  }
})

loginRouter.post('/signin', (req, res) => {
  res.send('SignIn')
})

module.exports = loginRouter
