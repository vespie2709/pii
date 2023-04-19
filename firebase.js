// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import "firebase/auth";
//import 'firebase/firestore';
//import 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA98BL0l6hSbX5vOXkHwqKU8UkGLaZsd_I",
  authDomain: "easylock-f24e7.firebaseapp.com",
  databaseURL: "https://easylock-f24e7-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "easylock-f24e7",
  storageBucket: "easylock-f24e7.appspot.com",
  messagingSenderId: "212728487425",
  appId: "1:212728487425:web:88ea2fbc4789338f6e2a00",
  measurementId: "G-WPT428DTML"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);

export const utilisateurCollection = collection(db, "utilisateur");
export const casierCollection = collection(db, "casier");
