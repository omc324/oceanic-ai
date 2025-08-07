// pages/_app.js

import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <div style={{
      backgroundImage: "url('/background.jpg')", // Make sure this is the correct file name
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









