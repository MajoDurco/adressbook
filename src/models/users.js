
function createNewUser(db, user) {
  const collection = db.collection('users')
  return collection.insertOne({
    password: user.password,
    email: user.email,
  })
}

module.exports = {
  createNewUser,
}