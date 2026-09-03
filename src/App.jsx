import { useState } from 'react'
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

  const handleStart = () => {
    setStep('build')
  }

  const handleBuilderSubmit = (data) => {
    setLetterData(data)
    setStep('preview')
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
