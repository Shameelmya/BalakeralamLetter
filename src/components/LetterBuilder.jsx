import React, { useState, useEffect, useRef } from 'react'
import { templates } from '../data/templates'

const MAX_CHARS = 700

export default function LetterBuilder({ initialData, onSubmit }) {
  const [name, setName] = useState(initialData?.name || '')
  const [mode, setMode] = useState(initialData?.templateId ? `template-${initialData.templateId}` : 'custom')
  const [content, setContent] = useState(initialData?.content || '')
  const [errorMsg, setErrorMsg] = useState('')
  const errorRef = useRef(null)

  useEffect(() => {
    if (mode.startsWith('template-')) {
      const tplId = parseInt(mode.split('-')[1])
      const tpl = templates.find(t => t.id === tplId)
      if (tpl) {
        setContent(tpl.content)
      }
    }
  }, [mode])

  const showError = (msg) => {
    setErrorMsg(msg)
    setTimeout(() => {
      errorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 50)
  }

  const handleSubmit = () => {
    if (!name.trim()) {
      showError('Please enter your name before generating.')
      return
    }
    if (content.length > MAX_CHARS) {
      showError(`Your letter exceeds the ${MAX_CHARS} character limit. Please shorten it.`)
      return
    }
    if (!content.trim()) {
      showError('Please write something in your letter.')
      return
    }
    
    setErrorMsg('')
    onSubmit({
      name: name.trim(),
      content: content.trim(),
      templateId: mode.startsWith('template-') ? parseInt(mode.split('-')[1]) : null
    })
  }

  return (
    <div className="animate-fade-in" style={{ 
      minHeight: '100vh', 
      width: '100%', 
      paddingTop: '20px', 
      paddingBottom: '100px',
      background: 'linear-gradient(135deg, #FFD54F, #FF8F00)' // Full opacity yellow-orange gradient
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 16px' }}>
        <div className="card" style={{ padding: '16px', border: 'none', backgroundColor: 'rgba(255,255,255,0.95)', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '24px', color: 'var(--color-magenta)', textAlign: 'center', fontWeight: 300, whiteSpace: 'nowrap', fontFamily: 'var(--font-malayalam)' }}>
            പ്രിയപ്പെട്ട ടീച്ചറേ.. ❤️
          </h2>

          {errorMsg && (
            <div ref={errorRef} style={{ padding: '12px', backgroundColor: '#FDECEC', color: 'var(--color-primary)', borderRadius: '8px', marginBottom: '16px', fontSize: '13px', textAlign: 'center' }}>
              {errorMsg}
            </div>
          )}

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 400, color: '#888', fontSize: '13px', letterSpacing: '0.5px' }}>
              What's Your Name?
            </label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="Enter Your Name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ marginBottom: 0, padding: '10px 12px', fontSize: '15px' }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 400, color: '#888', fontSize: '13px', letterSpacing: '0.5px' }}>
              Choose A Template
            </label>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'nowrap', overflowX: 'auto', paddingBottom: '4px' }}>
              <button 
                className={`pill-btn ${mode === 'custom' ? 'active' : ''}`}
                onClick={() => { setMode('custom'); setContent(''); }}
                style={{ padding: '6px 12px', fontSize: '13px', whiteSpace: 'nowrap' }}
              >
                Custom
              </button>
              {templates.map(tpl => (
                <button 
                  key={tpl.id}
                  className={`pill-btn ${mode === `template-${tpl.id}` ? 'active' : ''}`}
                  onClick={() => setMode(`template-${tpl.id}`)}
                  style={{ padding: '6px 12px', fontSize: '13px', whiteSpace: 'nowrap' }}
                >
                  Template {tpl.id}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 400, color: '#888', fontSize: '13px', letterSpacing: '0.5px' }}>
              Write Or Edit Your Letter Here (Max ~{MAX_CHARS} Chars):
            </label>
            <div style={{ position: 'relative' }}>
              <textarea 
                className="input-field" 
                style={{ 
                  minHeight: '380px', // Significantly increased height
                  fontFamily: 'var(--font-ui)', 
                  fontSize: '16px',
                  lineHeight: 1.8,
                  resize: 'vertical',
                  marginBottom: 0,
                  borderColor: content.length > MAX_CHARS ? 'red' : 'var(--color-border)'
                }}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <div style={{ position: 'absolute', bottom: '12px', right: '12px', fontSize: '12px', color: content.length > MAX_CHARS ? 'red' : '#888' }}>
                {content.length} / {MAX_CHARS}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Button fixed at the very bottom, full width */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 10 }}>
        <button 
          className="btn-primary" 
          onClick={handleSubmit} 
          style={{ width: '100%', padding: '20px 0', fontSize: '18px', borderRadius: '0', boxShadow: '0 -4px 20px rgba(0,0,0,0.15)' }}
        >
          Generate Letter
        </button>
      </div>
    </div>
  )
}
