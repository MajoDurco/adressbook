const express = require('express')
const loginRouter = express.Router()

loginRouter.post('/signup', (req, res) => {
  res.send('SignUp')
})

loginRouter.post('/signin', (req, res) => {
  res.send('SignIn')
})

module.exports = loginRouter
