// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBl7oF1ZRg7BhNk5Co36va2LB3o9UB83OE",
  authDomain: "expense-tracker-5e943.firebaseapp.com",
  projectId: "expense-tracker-5e943",
  storageBucket: "expense-tracker-5e943.appspot.com",
  messagingSenderId: "230393342015",
  appId: "1:230393342015:web:288d04876b757713a4708a",
  measurementId: "G-PGLFL45C83",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
