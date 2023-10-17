// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBtWu3JZac37CtK1bu5hpBZGgbwZPAAps",
  authDomain: "healthy-and-happy-edf1e.firebaseapp.com",
  projectId: "healthy-and-happy-edf1e",
  storageBucket: "healthy-and-happy-edf1e.appspot.com",
  messagingSenderId: "782116018951",
  appId: "1:782116018951:web:1b918b94c017b8ee3783a2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
