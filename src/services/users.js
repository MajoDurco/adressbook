const bcrypt = require('bcrypt')

const errorMessages = require('../constants/errorMessages')
const mongo = require('../mongo')()
const successMessages = require('../constants/successMessages')
const { createNewUser } = require('../models/users')

async function signUpNewUser(db, user) {
  try {
    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(user.password, salt)
    await createNewUser(db, {
      password: hash,
      email: user.email,
    })
    return successMessages.SIGN_UP_SUCCESS
  } catch (err) {
    console.error(err)
    return errorMessages.ERROR_IN_CREATING_NEW_USER
  }
}

module.exports = {
  signUpNewUser,
}
