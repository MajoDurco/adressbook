
function createNewUser(db, user) {
  const collection = db.collection('users')
  return collection.insertOne({
    password: user.password,
    user: user.email,
  })
}

module.exports = {
  createNewUser,
}