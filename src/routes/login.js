const express = require('express')
// const joi = require('joi');

const loginRouter = express.Router()
const mongo = require('../mongo')()
const { userSchemas } = require('../schemas')

loginRouter.post('/signup', async (req, res) => {
  try {
    const { email, password } = await userSchemas.signUpRequest.validate(req.body)
    const client = await mongo;
    const db = client.db('adressbook')
    const collection = db.collection('users')
    const result = await collection.insertOne({ email, password })
    res.send('success')
  } catch (err) {
    // #TODO right status
    console.log(err)
    res.send('Err')
  }
})

loginRouter.post('/signin', (req, res) => {
  res.send('SignIn')
})

module.exports = loginRouter
