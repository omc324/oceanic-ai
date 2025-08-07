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
      {/* Logo */}
      <Image
        src="/oceanic-ai.png"
        alt="Oceanic AI Logo"
        width={300}
        height={100}
      />

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







