// pages/dashboard.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth, db, storage } from "../lib/firebase";
import {
  doc,
  getDoc,
  updateDoc,
  increment,
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { signOut } from "firebase/auth";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState([]);
  const [quota, setQuota] = useState(0);

  // Auth protection + initial data fetch
  useEffect(() => {
    const unsubAuth = auth.onAuthStateChanged(async (u) => {
      if (!u) {
        router.push("/login");
        return;
      }
      setUser(u);

      // Fetch today's quota
      const docRef = doc(db, "users", u.uid);
      const snap = await getDoc(docRef);
      setQuota(snap.exists() ? snap.data().videosToday || 0 : 0);

      // Listen for videos
      const q = query(
        collection(db, "videos"),
        where("uid", "==", u.uid),
        orderBy("createdAt", "desc")
      );
      const unsubVideos = onSnapshot(q, (snap) => {
        setVideos(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      });

      return () => unsubVideos();
    });

    return () => unsubAuth();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  const generateVideo = async () => {
    if (!user) return router.push("/login");
    if (quota >= 5) {
      alert("Daily limit reached (5).");
      return;
    }

    setLoading(true);
    try {
      // Call API to generate video
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: res.statusText }));
        throw new Error(err.error || res.statusText);
      }

      const blob = await res.blob();

      // Upload to Firebase Storage
      const filename = `${user.uid}/${Date.now()}.mp4`;
      const storageRef = ref(storage, filename);
      await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(storageRef);

      // Update quota + save video metadata
      await updateDoc(doc(db, "users", user.uid), {
        videosToday: increment(1)
      });
      await addDoc(collection(db, "videos"), {
        uid: user.uid,
        url,
        prompt,
        createdAt: serverTimestamp()
      });

      alert("Video generated and saved!");
    } catch (err) {
      console.error(err);
      alert("Error: " + (err.message || err));
    } finally {
      setLoading(false);
      const snap = await getDoc(doc(db, "users", user.uid));
      setQuota(snap.exists() ? snap.data().videosToday || 0 : 0);
    }
  };

  if (!user) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>;
  }

  return (
    <div style={{ minHeight: "100vh", padding: 24 }}>
      <h1>Welcome, {user.email}</h1>
      <button onClick={handleLogout} style={{ marginBottom: 20 }}>
        Logout
      </button>
      <p>Videos today: {quota}/5</p>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe the video (e.g. 'A cat running')"
        rows={3}
        style={{ width: "100%", marginTop: 12 }}
      />
      <button
        onClick={generateVideo}
        disabled={loading}
        style={{ marginTop: 12 }}
      >
        {loading ? "Generating..." : "Generate Video"}
      </button>

      <hr style={{ margin: "24px 0" }} />
      <h2>Your videos</h2>
      {videos.length === 0 && <p>No videos yet.</p>}
      {videos.map((v) => (
        <div
          key={v.id}
          style={{
            marginBottom: 12,
            background: "#f0f0f0",
            padding: 12,
            borderRadius: 8
          }}
        >
          <video src={v.url} controls style={{ maxWidth: "100%" }} />
          <div style={{ marginTop: 8 }}>
            <a href={v.url} target="_blank" rel="noreferrer">
              Download
            </a>
            <div style={{ fontSize: 12, color: "#555" }}>{v.prompt}</div>
          </div>
        </div>
      ))}
    </div>
  );
}


