// pages/dashboard.js
import { useEffect, useState } from "react";
import { auth, db, storage } from "../lib/firebase";
import { doc, getDoc, updateDoc, increment, collection, addDoc, query, where, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState([]);
  const [quota, setQuota] = useState(0);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(u => {
      if (!u) return router.push("/login");
      setUser(u);
      // read videosToday
      (async () => {
        const docRef = doc(db, "users", u.uid);
        const snap = await getDoc(docRef);
        setQuota(snap.exists() ? (snap.data().videosToday || 0) : 0);
      })();

      // subscribe to user's videos
      const q = query(collection(db, "videos"), where("uid", "==", u.uid), orderBy("createdAt", "desc"));
      const unsubscribe = onSnapshot(q, snap => {
        setVideos(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      });
      return () => unsubscribe();
    });
    return () => unsub();
  }, []);

  const generateVideo = async () => {
    if (!user) return router.push("/login");
    // Quota check (5 per day)
    if (quota >= 5) { alert("Daily limit reached (5)."); return; }

    setLoading(true);
    try {
      // Call serverless to generate binary
      const r = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });
      if (!r.ok) {
        const err = await r.json().catch(()=>({error:r.statusText}));
        throw new Error(err.error || r.statusText);
      }

      // receive blob
      const blob = await r.blob();

      // upload to Firebase Storage
      const filename = `${user.uid}/${Date.now()}.mp4`;
      const storageRef = ref(storage, filename);
      await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(storageRef);

      // increment quota & create video record
      await updateDoc(doc(db, "users", user.uid), { videosToday: increment(1) });
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
      // refresh quota
      const snap = await getDoc(doc(db, "users", user.uid));
      setQuota(snap.exists() ? (snap.data().videosToday || 0) : 0);
    }
  };

  return (
    <div style={{ minHeight: "100vh", padding: 24, color: "white" }}>
      <h1>Dashboard</h1>
      <p>Videos today: {quota}/5</p>

      <div>
        <textarea value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="Describe the video (e.g. 'A cat running')" rows={3} style={{ width:"100%" }}/>
        <button onClick={generateVideo} disabled={loading} style={{ marginTop:12 }}>
          {loading ? "Generating..." : "Generate Video"}
        </button>
      </div>

      <hr style={{ margin: "24px 0" }} />
      <h2>Your videos</h2>
      <div>
        {videos.length === 0 && <p>No videos yet.</p>}
        {videos.map(v => (
          <div key={v.id} style={{ marginBottom: 12, background: "#111", padding: 12, borderRadius: 8 }}>
            <video src={v.url} controls style={{ maxWidth: "100%" }} />
            <div style={{ marginTop:8 }}>
              <a href={v.url} target="_blank" rel="noreferrer">Download</a>
              <div style={{ fontSize:12, color:"#bbb" }}>{v.prompt}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

