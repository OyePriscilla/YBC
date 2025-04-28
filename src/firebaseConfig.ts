// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, getDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmqKLUPQ7_KWCbrH1vvWunCu7Sdx4XE1U",
  authDomain: "yorubabibleapi.firebaseapp.com",
  projectId: "yorubabibleapi",
  storageBucket: "yorubabibleapi.firebasestorage.app",
  messagingSenderId: "541696610715",
  appId: "1:541696610715:web:49bf85310ecd122932113e",
  measurementId: "G-S79PFJXTBL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

export { db, doc, getDoc };