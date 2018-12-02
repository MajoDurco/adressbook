const firebase = require('firebase/app')
require('firebase/firestore')

const config = {
  apiKey: "AIzaSyAQqc0FnOtFa_LQP2jZX7aJCasphnQ1sqc",
  authDomain: "adressbook-712e8.firebaseapp.com",
  databaseURL: "https://adressbook-712e8.firebaseio.com",
  projectId: "adressbook-712e8",
  storageBucket: "adressbook-712e8.appspot.com",
  messagingSenderId: "529018047906"
};

firebase.initializeApp(config);

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