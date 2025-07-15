// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAozXK9ReMuecBasdtJ0PyQXEkauCK35S8",
  authDomain: "authentication-by-email.firebaseapp.com",
  projectId: "authentication-by-email",
  storageBucket: "authentication-by-email.firebasestorage.app",
  messagingSenderId: "13272587649",
  appId: "1:13272587649:web:79a5117726f7a985a81c80",
  measurementId: "G-R52YFPQCMH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);