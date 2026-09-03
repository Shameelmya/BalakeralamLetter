import React from 'react'

export default function LetterModeSelector({ onSelect }) {
  return (
    <div className="animate-fade-in" style={{ paddingTop: '60px' }}>
      <button onClick={() => onSelect('home')} style={{ color: '#999', marginBottom: '24px', fontSize: '14px' }}>
        ← Back
      </button>
      
      <h2 style={{ fontSize: '24px', marginBottom: '32px', color: 'var(--color-primary)' }}>
        How would you like to begin?
      </h2>

      <div className="card" style={{ cursor: 'pointer' }} onClick={() => onSelect('template')}>
        <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>💌 Choose a Letter</h3>
        <p style={{ color: '#666', fontSize: '14px' }}>Use one of the ready-made heartfelt letters.</p>
      </div>

      <div className="card" style={{ cursor: 'pointer' }} onClick={() => onSelect('write')}>
        <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>✍️ Write Your Own</h3>
        <p style={{ color: '#666', fontSize: '14px' }}>Write a personal letter from scratch.</p>
      </div>
    </div>
  )
}
