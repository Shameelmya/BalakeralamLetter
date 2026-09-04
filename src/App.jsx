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
    
    // Smooth simple transition for 1.5s
    setTimeout(() => {
      setStep('preview')
    }, 1500)
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
          <div className="writing-anim" style={{ marginBottom: '24px' }}>
             <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
             </svg>
          </div>
          <h3 style={{ color: 'var(--color-primary)', fontSize: '20px', fontWeight: 400 }}>
            Folding your letter...
          </h3>
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
