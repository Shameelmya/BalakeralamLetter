import React from 'react'

export default function HomePage({ onStart }) {
  return (
    <div className="animate-fade-in" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      backgroundColor: '#EFEAE2', // Match the light cream edge of the image
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 100
    }}>
      <div style={{
        position: 'relative',
        height: '100%',
        maxHeight: '100vh',
        maxWidth: '100vw',
        aspectRatio: '1080 / 2340',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <img 
          src="/home.jpg" 
          alt="Home Background" 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
        />
        
        {/* Button positioned absolutely relative to the image boundaries */}
        <div style={{
          position: 'absolute',
          bottom: '13%', // Precisely places it over the board legs within the image
          width: '100%',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <button 
            className="btn-primary" 
            onClick={onStart} 
            style={{ 
              padding: '12px 30px', 
              fontSize: '18px', 
              borderRadius: '28px 10px 28px 10px', // Playful, slightly irregular shape
              boxShadow: '0 8px 24px rgba(0,0,0,0.2)' 
            }}
          >
            Write Your Letter
          </button>
        </div>
      </div>
    </div>
  )
}
