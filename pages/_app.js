export default function MyApp({ Component, pageProps }) {
  return (
    <div style={{
      backgroundImage: "url('/bg.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      minHeight: "100vh",
      color: "white"
    }}>
      <Component {...pageProps} />
    </div>
  );
}



