import React from 'react'

export default function HomePage({ onStart }) {
  return (
    <div className="animate-fade-in" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      backgroundImage: 'url(/home.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingBottom: '15vh', // Positions the button appropriately on the screen
      zIndex: 100,
      backgroundColor: 'var(--color-bg)'
    }}>
      <button 
        className="btn-primary" 
        onClick={onStart} 
        style={{ 
          padding: '16px 40px', 
          fontSize: '20px', 
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)' 
        }}
      >
        Create Your Letter
      </button>
    </div>
  )
}
