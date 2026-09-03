import React from 'react'

export default function HomePage({ onStart }) {
  return (
    <div style={{ textAlign: 'center', paddingTop: '20px' }}>
      <img src="/logo.png" alt="Ente Teacherkk" className="logo" />
      <h1 style={{ fontSize: '18px', fontFamily: 'var(--font-malayalam)', color: 'black', marginTop: '4px', marginBottom: '16px', fontWeight: 'bold' }}>
        പ്രിയപ്പെട്ട ടീച്ചർക്കൊരു കത്തെഴുതാം..
      </h1>
      
      {/* PNG image placeholder */}
      <img 
        src="/board.png" 
        alt="Letter illustration" 
        style={{ 
          maxWidth: '100%', 
          height: 'auto', 
          display: 'block',
          margin: '0 auto'
        }} 
      />
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', position: 'relative', zIndex: 10, marginTop: '-80px' }}>
        <button className="btn-primary" onClick={onStart} style={{ padding: '16px 32px', fontSize: '18px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}>
          Create Your Letter
        </button>
      </div>
    </div>
  )
}
