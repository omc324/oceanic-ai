// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAl9PLQHrg2NFwtTR55njh7ZILexsFPQGo",
  authDomain: "oceanic-ai.firebaseapp.com",
  projectId: "oceanic-ai",
  storageBucket: "oceanic-ai.appspot.com", // fixed from firebasestorage.app to appspot.com
  messagingSenderId: "615947484198",
  appId: "1:615947484198:web:dc0667d0864f6a72f7fae7"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);







