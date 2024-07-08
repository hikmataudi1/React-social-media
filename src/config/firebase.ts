// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth , GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDN2RJW45qZkNuxozZlQSKsNPJB3TEvu2I",
  authDomain: "react-social-media-e4d3a.firebaseapp.com",
  projectId: "react-social-media-e4d3a",
  storageBucket: "react-social-media-e4d3a.appspot.com",
  messagingSenderId: "734927700404",
  appId: "1:734927700404:web:c81eb913a4adb6a68232e1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)