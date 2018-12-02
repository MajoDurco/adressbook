const { firestore } = require('../utils/firebase')

function getUserDocument(userEmail) {
  return firestore.collection('users').doc(userEmail)
}

function getUserContactsCollection(userEmail) {
  return getUserDocument(userEmail).collection('contacts')
}

function addUserContact(userEmail, contact) {
  return getUserContactsCollection(userEmail).doc().set(contact)
}

async function getUserContacts(userEmail) {
  const contacts = await getUserContactsCollection(userEmail).get()
  return contacts.docs.map((contact) => contact.data())
}

async function findUserContact(userEmail, requestContact) {
  const contacts = await getUserContacts(userEmail)
  return contacts.find((contact) => contact.email === requestContact.email)
}

module.exports = {
  addUserContact,
  findUserContact
}