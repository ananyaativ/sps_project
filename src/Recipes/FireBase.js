import firebase from 'firebase/compat/app';
import 'firebase/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {

  apiKey: "AIzaSyDhpFcv5x9X6RSywxkMR-B9hMmExUOwQYw",
  authDomain: "recipe-sps.firebaseapp.com",
  projectId: "recipe-sps",
  storageBucket: "recipe-sps.appspot.com",
  messagingSenderId: "102320666746",
  appId: "1:102320666746:web:8a91f21e08ebd3fad2a3c3"
  
};


// Initialize Firebase

firebase.initializeApp(firebaseConfig);





export default firebase;