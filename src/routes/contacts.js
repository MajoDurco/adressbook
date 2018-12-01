const express = require('express')
const contactsRouter = express.Router()

contactsRouter.post('/', async (req, res) => {
  try {
    res.send('OK')
  } catch (err) {
    console.error(err)
    res.status(err.statusCode)
    res.send(err.message)
  }
})

module.exports = contactsRouter
