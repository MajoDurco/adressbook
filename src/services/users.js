const bcrypt = require('bcrypt')

const errorMessages = require('../constants/errorMessages')
const mongo = require('../mongo')()
const successMessages = require('../constants/successMessages')
const { createNewUser, findUserByEmail } = require('../models/users')

async function signUpNewUser(db, user) {
  try {
    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(user.password, salt)
    const userFromDB = await findUserByEmail(db, user.email)
    if (userFromDB) return errorMessages.EMAIL_IN_USE
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

async function getUser(db, user) {
  try {
    const userFromDB = await findUserByEmail(db, user.email)
    if (!userFromDB) throw errorMessages.SIGN_IN_ERROR

    const isPasswordCorrect = await bcrypt.compare(user.password, userFromDB.password)
    if (!isPasswordCorrect) throw errorMessages.SIGN_IN_ERROR

    return userFromDB
  } catch (err) {
    console.error(err)
    throw errorMessages.SIGN_IN_ERROR
  }
}

module.exports = {
  getUser,
  signUpNewUser,
}
