import React, { useState } from 'react'

const MAX_WORDS = 300
const WARN_WORDS = 250

export default function LetterEditor({ initialContent, onSubmit }) {
  const [content, setContent] = useState(initialContent || '')

  const words = content.trim().split(/\s+/).filter(Boolean).length

  const handleChange = (e) => {
    setContent(e.target.value)
  }

  const handleSubmit = () => {
    if (words > 0) {
      onSubmit(content)
    }
  }

  let message = null
  if (words >= MAX_WORDS) {
    message = "That’s a beautiful letter — let’s keep it to one page. Try shortening it a little. ❤️"
  } else if (words >= WARN_WORDS) {
    message = "Your letter is getting full. Try keeping the sweetest parts. ❤️"
  }

  return (
    <div className="animate-fade-in" style={{ paddingTop: '40px', display: 'flex', flexDirection: 'column', flex: 1 }}>
      <h2 style={{ fontSize: '24px', marginBottom: '8px', color: 'var(--color-primary)' }}>
        Say what you’ve always wanted to say.
      </h2>
      <p style={{ color: '#666', marginBottom: '24px', fontSize: '14px' }}>
        There are some things only your own words can express.
      </p>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginBottom: '24px' }}>
        <textarea 
          className="input-field" 
          style={{ 
            flex: 1, 
            minHeight: '400px', 
            fontFamily: 'var(--font-malayalam)', 
            fontSize: '18px',
            lineHeight: 1.6,
            resize: 'none',
            padding: '24px',
            marginBottom: '8px'
          }}
          placeholder="Start writing your letter here..."
          value={content}
          onChange={handleChange}
        />
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px' }}>
          <span style={{ color: words > MAX_WORDS ? 'red' : '#888' }}>
            Words: {words} / {MAX_WORDS}
          </span>
        </div>
        
        {message && (
          <div style={{ 
            marginTop: '12px', 
            padding: '12px', 
            backgroundColor: '#FDECEC', 
            color: 'var(--color-primary)', 
            borderRadius: '8px',
            fontSize: '14px'
          }}>
            {message}
          </div>
        )}
      </div>

      <button 
        className="btn-primary" 
        onClick={handleSubmit} 
        disabled={words === 0 || words > MAX_WORDS}
        style={{ padding: '16px', fontSize: '18px', display: 'flex', justifyContent: 'center' }}
      >
        Make My Letter ✨
      </button>
    </div>
  )
}
