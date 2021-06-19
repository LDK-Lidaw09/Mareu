//export default firebase;
import firebase from "firebase";
//import * as firebase from 'firebase';
//import firestore from 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyD0kEyQVcm9sh5gX7shS2PbQmQcz5ItaE4",
  authDomain: "mareu-6a392.firebaseapp.com",
  projectId: "mareu-6a392",
  storageBucket: "mareu-6a392.appspot.com",
  messagingSenderId: "270200024777",
  appId: "1:270200024777:web:744ab0200ad7f157286718",
};
// Initialize Firebase

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export default db;
