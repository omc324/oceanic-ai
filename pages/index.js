export default function Home() {
  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      backgroundColor: 'black',
      color: 'white',
      margin: 0,
      padding: 0,
      minHeight: '100vh'
    }}>
      
      {/* Banner */}
      <img 
        src="/banner.jpg" 
        alt="Oceanic AI Banner" 
        style={{
          width: '100%',
          display: 'block',
          boxShadow: '0 0 30px rgba(0,0,0,0.8)'
        }}
      />

      {/* Main Content */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '40px 20px'
      }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          marginBottom: '10px'
        }}>
        
        </h1>

        <p style={{
          fontSize: '1.2rem',
          maxWidth: '600px',
          marginBottom: '30px',
          opacity: 0.85
        }}>
          Generate <strong>5 free AI videos daily</strong> and explore the ocean of possibilities with our powerful AI tools.
        </p>

        {/* Start Now Button */}
        <button style={{
          backgroundColor: 'black',
          color: 'white',
          border: '2px solid white',
          padding: '14px 40px',
          fontSize: '1.2rem',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold',
          boxShadow: '0 0 20px #00B4D8, 0 0 40px #ff00ff', // Blue + Pink shadow
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
