const express = require('express')

const successMessages = require('../constants/successMessages')
const validateSchema = require('../schemas/validate')
const { addNewContact } = require('../services/contacts')
const { contactSchemas } = require('../schemas')
const { jwtMiddleware } = require('../middlewares/auth')
const { sendErrorResponse } = require('../utils')

const contactsRouter = express.Router()

contactsRouter.post('/', jwtMiddleware, async (req, res) => {
  try {
    const { token } = res.locals
    const contact = await validateSchema(req.body, contactSchemas.contactSchema)
    await addNewContact(token, contact)
    res.status(successMessages.CONTACT_ADDED.statusCode)
    res.send({
      message: successMessages.CONTACT_ADDED.message,
      status: successMessages.CONTACT_ADDED.statusCode,
    })
  } catch (err) {
    sendErrorResponse(res, err)
  }
})

module.exports = contactsRouter
