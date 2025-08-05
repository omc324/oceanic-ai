import { useState } from "react";
import { auth } from "../lib/firebase";
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  // Google login
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert("Logged in with Google!");
    } catch (err) {
      alert(err.message);
    }
  };

  // Email/Password login or signup
  const handleEmailAuth = async () => {
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Account created successfully!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Logged in successfully!");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "black",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      fontFamily: "Arial, sans-serif"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "400px",
        padding: "30px",
        backgroundColor: "#111",
        borderRadius: "12px",
        textAlign: "center",
        boxShadow: "0 0 20px #00B4D8, 0 0 40px #ff00ff" // blue + pink glow
      }}>
        <h1 style={{ marginBottom: "20px" }}>
          {isSignUp ? "Sign Up" : "Login"} to Oceanic AI
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "6px",
            border: "1px solid white",
            backgroundColor: "black",
            color: "white"
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "6px",
            border: "1px solid white",
            backgroundColor: "black",
            color: "white"
          }}
        />

        <button
          onClick={handleEmailAuth}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            backgroundColor: "black",
            color: "white",
            fontWeight: "bold",
            borderRadius: "8px",
            cursor: "pointer",
            border: "2px solid white",
            boxShadow: "0 0 10px #00B4D8, 0 0 20px #ff00ff"
          }}
        >
          {isSignUp ? "Sign Up" : "Login"}
        </button>

        <button
          onClick={handleGoogleLogin}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#202124",
            color: "white",
            fontWeight: "bold",
            borderRadius: "8px",
            cursor: "pointer",
            border: "2px solid white",
            boxShadow: "0 0 10px #00B4D8, 0 0 20px #ff00ff"
          }}
        >
          Sign in with Google
        </button>

        <p
          style={{ marginTop: "20px", cursor: "pointer", color: "#00B4D8" }}
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp
            ? "Already have an account? Login"
            : "Don't have an account? Sign Up"}
        </p>
      </div>
    </div>
  );
}
