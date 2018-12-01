const { addUserContact, findUserContact } = require('../models/contacts')
const errorMessages = require('../constants/errorMessages')

async function addNewContact(token, newContact) {
  const { email } = token
  contact_exists = await findUserContact(email, newContact)
  if (contact_exists) throw errorMessages.CONTACT_EXISTS
  return addUserContact(email, newContact)
}

module.exports = {
  addNewContact
}