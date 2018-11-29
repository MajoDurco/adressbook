const express = require('express')

const contacts = require('./contacts')
const login = require('./login')

const rootRouter = express.Router()

rootRouter.get('/', (req, res) => {
  res.send('Home')
})

module.exports = {
  rootRouter,
  contacts,
  login,
}