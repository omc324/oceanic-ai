import { useState } from "react";
import { auth, db } from "../lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  increment
} from "firebase/firestore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async () => {
    try {
      if (isSignUp) {
        // Sign up
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Create Firestore doc
        await setDoc(doc(db, "users", user.uid), {
          videosToday: 0,
          lastLogin: new Date().toISOString()
        });

        alert("Account created successfully!");
        window.location.href = "/dashboard";

      } else {
        // Login
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const data = userDoc.data();
          const today = new Date().toISOString().split("T")[0];
          const lastLoginDate = data.lastLogin ? data.lastLogin.split("T")[0] : null;

          // Reset counter if new day
          if (lastLoginDate !== today) {
            await updateDoc(userRef, {
              videosToday: 0,
              lastLogin: new Date().toISOString()
            });
          }

          // Check free limit
          if (data.videosToday >= 5 && lastLoginDate === today) {
            alert("You have reached your free video limit for today.");
            return;
          }
        } else {
          // If doc doesn't exist, create one
          await setDoc(userRef, {
            videosToday: 0,
            lastLogin: new Date().toISOString()
          });
        }

        alert("Logged in successfully!");
        window.location.href = "/dashboard";
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      background: "#f4f4f4"
    }}>
      <h1>{isSignUp ? "Sign Up" : "Login"}</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ margin: "8px", padding: "10px" }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ margin: "8px", padding: "10px" }}
      />
      <button onClick={handleAuth} style={{ margin: "8px", padding: "10px 20px" }}>
        {isSignUp ? "Sign Up" : "Login"}
      </button>
      <p
        style={{ color: "blue", cursor: "pointer" }}
        onClick={() => setIsSignUp(!isSignUp)}
      >
        {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
      </p>
    </div>
  );
}






