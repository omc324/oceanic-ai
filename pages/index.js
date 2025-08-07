import Link from "next/link";
import Image from "next/image"; // ✅ Correct: placed at the top

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
        minHeight: "100vh",
        paddingBottom: "50px",
        textAlign: "center"
      }}
    >
      <h1 style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          marginBottom: '10px'
        }}>
          🌊 Oceanic AI
        </h1>

        <p style={{
          fontSize: '1.2rem',
          maxWidth: '600px',
          marginBottom: '30px',
          opacity: 0.85
        }}>
          Generate <strong>5 free AI videos daily</strong> and explore the ocean of possibilities with our powerful AI tools.
        </p>

      {/* Login Button */}
      <Link href="/login">
        <button
          style={{
            padding: "12px 30px",
            fontSize: "1.2rem",
            borderRadius: "8px",
            backgroundColor: "black",
            color: "white",
            border: "2px solid white",
            cursor: "pointer",
            boxShadow: "0 0 10px #00B4D8, 0 0 20px #ff00ff"
          }}
        >
          Login
        </button>
      </Link>
    </div>
  );
}








