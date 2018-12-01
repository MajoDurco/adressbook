
function createNewUser(db, user) {
  const collection = db.collection('users')
  return collection.insertOne({
    password: user.password,
    email: user.email,
  })
}

function findUserByEmail(db, email) {
  const collection = db.collection('users')
  return collection.findOne({ email })
}

module.exports = {
  createNewUser,
  findUserByEmail
}