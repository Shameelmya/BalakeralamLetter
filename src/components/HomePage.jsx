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
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        maxWidth: '56.25vh',
        aspectRatio: '1080 / 1920',
        pointerEvents: 'none'
      }}>
        {/* Adjusted bottom position to move button slightly lower */}
        <div style={{ position: 'absolute', bottom: '12%', left: '50%', transform: 'translateX(-50%)', width: '100%', textAlign: 'center', pointerEvents: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <button 
            className="btn-primary" 
            onClick={onStart} 
            style={{ 
              padding: '12px 30px', 
              fontSize: '18px', 
              borderRadius: '28px 10px 28px 10px', 
              boxShadow: '0 8px 24px rgba(0,0,0,0.2)' 
            }}
          >
            Write Your Letter
          </button>
          
          <div style={{ fontSize: '12px', color: '#888', fontFamily: "'Sora', sans-serif", fontWeight: 300 }}>
            Designed by{' '}
            <a 
              href="https://wa.me/917559865389?text=Hello%2C%20we%20have%20experienced%20your%20letter%20website%20for%20Balakeralam.%20We%20have%20an%20enquiry." 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 300 }}
            >
              Dot projects
            </a>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
