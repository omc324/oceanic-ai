// pages/login.js

import { useState } from "react";
import { auth, db } from "../lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc
} from "firebase/firestore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        // Create account
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Create Firestore user doc
        await setDoc(doc(db, "users", user.uid), {
          videosToday: 0,
          lastLogin: new Date().toISOString()
        });

        alert("Account created!");
      } else {
        // Login
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        await handlePostLogin(userCredential.user);
        alert("Login successful!");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        // New Google user — create doc
        await setDoc(userDocRef, {
          videosToday: 0,
          lastLogin: new Date().toISOString()
        });
      } else {
        // Existing Google user — daily reset check
        await handlePostLogin(user);
      }

      alert("Google login successful!");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const handlePostLogin = async (user) => {
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const data = userDoc.data();
      const lastLoginDate = new Date(data.lastLogin).toDateString();
      const today = new Date().toDateString();

      if (lastLoginDate !== today) {
        await updateDoc(userDocRef, {
          videosToday: 0,
          lastLogin: new Date().toISOString()
        });
      }
    }
  };

  return (
    <div style={{ textAlign: "center", paddingTop: "50px" }}>
      <h2>{isSignUp ? "Sign Up" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br /><br />
        <button type="submit">
          {isSignUp ? "Sign Up" : "Login"}
        </button>
      </form>
      <br />
      <button onClick={handleGoogleLogin}>Sign in with Google</button>
      <br /><br />
      <p onClick={() => setIsSignUp(!isSignUp)} style={{ cursor: "pointer" }}>
        {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
      </p>
    </div>
  );
}






