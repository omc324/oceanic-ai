import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { auth, db } from "../lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc
} from "firebase/firestore";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) router.push("/dashboard");
    });
    return () => unsubscribe();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    console.log("Trying:", email, password); // debug

    try {
      if (isLogin) {
        // LOGIN
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const data = userDoc.data();
          const today = new Date().toISOString().split("T")[0];
          const lastLoginDate = data.lastLogin ? data.lastLogin.split("T")[0] : null;

          if (lastLoginDate !== today) {
            await updateDoc(userRef, {
              videosToday: 0,
              lastLogin: new Date().toISOString()
            });
          }

          if (data.videosToday >= 5 && lastLoginDate === today) {
            alert("You have reached your free video limit for today.");
            return;
          }
        } else {
          await setDoc(userRef, {
            videosToday: 0,
            lastLogin: new Date().toISOString()
          });
        }

      } else {
        // SIGN UP
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
          videosToday: 0,
          lastLogin: new Date().toISOString()
        });
      }

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: "10px", margin: "5px" }}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: "10px", margin: "5px" }}
        />
        <br />
        <button type="submit" style={{ padding: "10px", marginTop: "10px" }}>
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          onClick={() => setIsLogin(!isLogin)}
          style={{
            color: "blue",
            background: "none",
            border: "none",
            cursor: "pointer"
          }}
        >
          {isLogin ? "Sign Up" : "Login"}
        </button>
      </p>
    </div>
  );
}









