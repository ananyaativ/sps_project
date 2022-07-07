


//Getting data from firebase
// Language: javascript






// Import the functions you need from the SDKs you need
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDi69PCB7pgCc7jam-1BXjSjw1IZhocnME",
  authDomain: "sps-631f3.firebaseapp.com",
  projectId: "sps-631f3",
  storageBucket: "sps-631f3.appspot.com",
  messagingSenderId: "1027563810655",
  appId: "1:1027563810655:web:21531e339029fc7f7b10ea",
  measurementId: "G-SY503F889R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

