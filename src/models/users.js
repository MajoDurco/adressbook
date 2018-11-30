
function createNewUser(db, user) {
  try {
    const collection = db.collection('users')
    return collection.insertOne({ user: user.email, password: user.password })
  } catch(err) {
    console.error('xxxx', err) 
  }
}

module.exports = {
  createNewUser,
}