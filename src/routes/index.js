const express = require('express')

const contacts = require('./contacts')
const login = require('./login')
const httpCodes = require('../constants/httpCodes')

const rootRouter = express.Router()

// eslint-disable-next-line
rootRouter.get('/', async (_, res) => {
  try {
    res.send(`
      This application was developed by Marian Durco.
      If you want to know more about it visit the github repository:
      https://github.com/MajoDurco/adressbook
    `)
  } catch (err) {
    console.log(err)
    res.status(httpCodes.INTERNAL_ERROR)
    res.send('Internal server error!')
  }
})

module.exports = {
  rootRouter,
  contacts,
  login,
}