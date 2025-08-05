// lib/firebase.js

// Import Firebase functions
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAl9PLQHrg2NFwtTR55njh7ZILexsFPQGo",
  authDomain: "oceanic-ai.firebaseapp.com",
  projectId: "oceanic-ai",
  storageBucket: "oceanic-ai.appspot.com", // fixed from firebasestorage.app to appspot.com
  messagingSenderId: "615947484198",
  appId: "1:615947484198:web:dc0667d0864f6a72f7fae7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore and Auth so other files can use them
export const db = getFirestore(app);
export const auth = getAuth(app);
