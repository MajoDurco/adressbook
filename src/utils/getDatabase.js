const { mongo } = require('./mongo')

async function getDatabase(dbName) {
  const client = await mongo;
  return client.db(dbName)
}

module.exports = {
  getDatabase,
  getAddressBookDB: () => getDatabase('addressbook')
}
