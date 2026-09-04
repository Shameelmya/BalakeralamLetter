import { useState, useEffect, useRef } from 'react'
import './index.css'
import HomePage from './components/HomePage'
import LetterBuilder from './components/LetterBuilder'
import LetterPreview from './components/LetterPreview'

function App() {
  const [step, setStep] = useState('home') // home, build, preview
  const [letterData, setLetterData] = useState({
    name: '',
    content: '',
    templateId: null
  })
  
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    // Initialize audio only once
    if (!audioRef.current) {
      const audio = new Audio('/music.mp3')
      audio.loop = true
      audio.volume = 0.2 // low volume
      audioRef.current = audio
    }
  }, [])

  const toggleMute = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(e => console.log('Audio play error:', e))
      }
      setIsPlaying(!isPlaying)
    }
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [step])

  const handleStart = () => {
    setStep('build')
    if (audioRef.current && !isPlaying) {
      audioRef.current.play().then(() => {
        setIsPlaying(true)
      }).catch(e => console.log('Autoplay prevented:', e))
    }
  }

  const handleBuilderSubmit = (data) => {
    setLetterData(data)
    setStep('generating')
    
    // Smooth simple transition for 1s
    setTimeout(() => {
      setStep('preview')
    }, 1000)
  }

  const handleNewLetter = () => {
    if (window.confirm("Start a new letter?\nYour current letter will be cleared.")) {
      setLetterData({ name: '', content: '', templateId: null })
      setStep('build')
    }
  }

  const handleEdit = () => {
    setStep('build')
  }

  return (
    <div className="container animate-fade-in" style={{ position: 'relative' }}>
      
      {/* Global Mute Toggle Button */}
      {step !== 'home' && (
        <button 
          onClick={toggleMute}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 1000,
            background: 'rgba(255,255,255,0.7)',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)'
          }}
        >
          {isPlaying ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
          )}
        </button>
      )}

      {step === 'home' && <HomePage onStart={handleStart} />}
      
      {step === 'build' && (
        <LetterBuilder 
          initialData={letterData} 
          onSubmit={handleBuilderSubmit} 
        />
      )}

      {step === 'generating' && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100%', backgroundColor: 'var(--color-bg)' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid rgba(213, 55, 104, 0.1)',
            borderTop: '3px solid var(--color-primary)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '24px'
          }}></div>
          <h3 style={{ color: 'var(--color-primary)', fontSize: '14px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', fontFamily: "'Sora', sans-serif" }}>
            Drafting Letter...
          </h3>
          <p style={{ color: '#888', fontSize: '12px', marginTop: '8px', fontWeight: 300, fontFamily: "'Sora', sans-serif" }}>
            Applying elegant typography
          </p>
        </div>
      )}
      
      {step === 'preview' && (
        <LetterPreview 
          data={letterData} 
          onEdit={handleEdit} 
          onNew={handleNewLetter} 
        />
      )}
    </div>
  )
}

export default App
