export default function Home() {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        margin: 0,
        padding: 0,
        minHeight: "100vh",
        backgroundImage: "url('/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        color: "white",
      }}
    >
      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(to right, rgba(0,180,216,0.6), rgba(255,0,255,0.6))",
          zIndex: 1,
        }}
      ></div>

      {/* Logo at top */}
      <div style={{ position: "relative", zIndex: 2, padding: "20px", textAlign: "center" }}>
        <img src="/logo.png" alt="Oceanic AI" style={{ maxHeight: "80px" }} />
      </div>

      {/* Main content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "calc(100vh - 100px)",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: "10px" }}>Welcome to Oceanic AI</h1>
        <p style={{ fontSize: "1.2rem", maxWidth: "600px", marginBottom: "20px" }}>
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
          onClick={() => window.location.href = "/login"}
        >
          Start Now
        </button>
      </div>
    </div>
  );
}