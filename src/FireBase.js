//import firebase from 'firebase/compat/app';



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSsHcwZV73F3JVTUJo0HWFwlFtefelHBM",
  authDomain: "recipe-sps.firebaseapp.com",
  projectId: "recipe-sps",
  storageBucket: "recipe-sps.appspot.com",
  messagingSenderId: "102320666746",
  appId: "1:102320666746:web:8a91f21e08ebd3fad2a3c3"
};
// Initialize Firebase
const firebase = initializeApp(firebaseConfig);






export default firebase;