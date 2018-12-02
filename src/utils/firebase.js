const firebase = require('firebase/app')
require('firebase/firestore')

const config = require('../../config')

firebase.initializeApp(config.firebase);

// Set this options to remove warning about
// Date object which is going to be changed in firestore
const firestoreSettings = {
  timestampsInSnapshots: true,
};
const firestore = firebase.firestore();
firestore.settings(firestoreSettings);

module.exports = {
  firebase,
  firestore,
}