import Link from "next/link";

export default function Home() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      alignItems: "center",
      minHeight: "100vh",
      paddingBottom: "50px",
      textAlign: "center"
    }}>
      {/* Logo */}
      <img
        src="/logo.png"
        alt="Oceanic AI"
        style={{ maxWidth: "320px", marginBottom: "20px" }}
      />

      {/* Login Button */}
      <Link href="/login">
        <button style={{
          padding: "12px 30px",
          fontSize: "1.2rem",
          borderRadius: "8px",
          backgroundColor: "black",
          color: "white",
          border: "2px solid white",
          cursor: "pointer",
          boxShadow: "0 0 10px #00B4D8, 0 0 20px #ff00ff"
        }}>
          Login
        </button>
      </Link>
    </div>
  );
}


