export default function Home() {
  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h1 style={{ fontSize: "3rem", marginBottom: "10px" }}>Welcome to Oceanic AI</h1>
      <p style={{ fontSize: "1.2rem", maxWidth: "600px", margin: "0 auto 20px" }}>
        Generate <strong>5 free AI videos daily</strong> with our powerful AI tools.
      </p>
      <button
        style={{
          padding: "12px 30px",
          fontSize: "1.2rem",
          fontWeight: "bold",
          border: "2px solid white",
          backgroundColor: "transparent",
          color: "white",
          borderRadius: "8px",
          cursor: "pointer",
          boxShadow: "0 0 10px #00B4D8, 0 0 20px #ff00ff",
          transition: "all 0.3s ease",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "rgba(255,255,255,0.2)")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
      >
        Start Now
      </button>
    </div>
  );
}

