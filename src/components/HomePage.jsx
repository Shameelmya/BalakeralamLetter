import React from 'react'

export default function HomePage({ onStart }) {
  return (
    <div style={{ textAlign: 'center', paddingTop: '40px' }}>
      <img src="/logo.png" alt="Ente Teacherkk" className="logo" />
      <h1 style={{ fontSize: '18px', fontFamily: 'var(--font-malayalam)', color: 'black', marginTop: '8px', marginBottom: '40px', fontWeight: 'bold' }}>
        പ്രിയപ്പെട്ട ടീച്ചർക്കൊരു കത്തെഴുതാം..
      </h1>
      
      {/* PNG image placeholder */}
      <img 
        src="/board.png" 
        alt="Letter illustration" 
        style={{ 
          maxWidth: '100%', 
          height: 'auto', 
          marginBottom: '40px', 
          display: 'block',
          margin: '0 auto 40px'
        }} 
      />
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
        <button className="btn-primary" onClick={onStart} style={{ padding: '16px 32px', fontSize: '18px' }}>
          Create Your Letter
        </button>
      </div>
    </div>
  )
}
