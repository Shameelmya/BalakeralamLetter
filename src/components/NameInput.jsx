import React, { useState } from 'react'

export default function NameInput({ initialName, onSubmit }) {
  const [name, setName] = useState(initialName || '')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name.trim()) {
      onSubmit(name.trim())
    }
  }

  return (
    <div className="animate-fade-in" style={{ paddingTop: '60px' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '32px', color: 'var(--color-primary)' }}>
        First, tell us who’s writing this.
      </h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '8px', fontSize: '14px', color: '#555', fontWeight: 500 }}>
          Your Name
        </div>
        <input 
          type="text" 
          className="input-field" 
          placeholder="Enter your name" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />
        
        <button 
          type="submit" 
          className="btn-primary" 
          style={{ width: '100%' }}
          disabled={!name.trim()}
        >
          Continue →
        </button>
      </form>
    </div>
  )
}
