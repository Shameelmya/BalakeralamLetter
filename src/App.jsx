import { useState, useEffect } from 'react'
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [step])

  const handleStart = () => {
    setStep('build')
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
    <div className="container animate-fade-in">
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
