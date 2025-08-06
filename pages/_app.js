import "../styles/globals.css";
import Head from "next/head";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Oceanic AI</title>
        <meta name="description" content="Generate 5 free AI videos daily with Oceanic AI." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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

        {/* Logo */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            padding: "20px",
            textAlign: "center",
          }}
        >
          <img src="/logo.png" alt="Oceanic AI" style={{ maxHeight: "120px" }} />
        </div>

        {/* Page content */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <Component {...pageProps} />
        </div>
      </div>
    </>
  );
}

