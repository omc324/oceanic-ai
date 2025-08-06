export default function Home() {
  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(135deg, #0F2027, #203A43, #2C5364)',
      color: 'white',
      margin: 0,
      padding: 0
    }}>
      
      {/* Full-Width Hero Banner */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '60vh',
        backgroundImage: 'url(/banner.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
      }}>
        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: 'bold',
          margin: '0',
          color: 'white',
          textShadow: '2px 2px 10px rgba(0,0,0,0.6)'
        }}>
        
        </h1>
        <p style={{
          fontSize: '1.3rem',
          maxWidth: '600px',
          marginTop: '10px',
          textShadow: '1px 1px 8px rgba(0,0,0,0.6)'
        }}>
          Generate <strong>5 free AI videos daily</strong> and explore the ocean of possibilities with our powerful AI tools.
        </p>
      </div>

      {/* Main Content Section */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '40px 20px',
        textAlign: 'center'
      }}>
        <button
          onClick={() => window.location.href = "/login"}
          style={{
            backgroundColor: 'black',
            border: '2px solid white',
            padding: '14px 30px',
            fontSize: '1.2rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            color: 'white',
            boxShadow: '0 0 20px #00B4D8, 0 0 40px #ff00ff',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#111';
            e.target.style.boxShadow = '0 0 25px #00B4D8, 0 0 50px #ff00ff';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = 'black';
            e.target.style.boxShadow = '0 0 20px #00B4D8, 0 0 40px #ff00ff';
          }}
        >
          🚀 Start Now
        </button>
      </div>
    </div>
  );
}
