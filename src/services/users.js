const errorMessages = require('../constants/errorMessages')
const mongo = require('../mongo')()
const successMessages = require('../constants/successMessages')
const { createNewUser } = require('../models/users')

async function signUpNewUser(user) {
  try {
    const client = await mongo;
    const db = client.db('adressbook')
    await createNewUser(db, user)
    return successMessages.SIGN_UP_SUCCESS
  } catch (err) {
    console.error('xxx', err)
    return errorMessages.ERROR_IN_CREATING_NEW_USER
  }
}

module.exports = {
  signUpNewUser,
}
