import React, { useRef, useState, useEffect } from 'react'
import A4Paper from './A4Paper'
import { exportToImage, shareImage } from '../utils/ExportUtils'

export default function LetterPreview({ data, onEdit, onNew }) {
  const paperRef = useRef(null)
  const [scale, setScale] = useState(1)
  const [isExporting, setIsExporting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  // Calculate scale so the 794x1123 paper fits perfectly on the screen
  useEffect(() => {
    const calculateScale = () => {
      const containerWidth = Math.min(window.innerWidth - 32, 600) // max width of container
      const availableHeight = window.innerHeight - 260 // Leave plenty of space for headers and footer buttons on mobile
      
      const widthScale = containerWidth / 794
      const heightScale = availableHeight / 1123
      
      setScale(Math.min(widthScale, heightScale))
    }
    
    calculateScale()
    window.addEventListener('resize', calculateScale)
    return () => window.removeEventListener('resize', calculateScale)
  }, [])

  const handleDownloadPNG = async () => {
    setIsExporting(true)
    setErrorMsg('')
    const blob = await exportToImage(paperRef)
    if (blob) {
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = "Teachers-Day-Letter.png"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } else {
      setErrorMsg("We couldn't prepare the file just yet. Please try again.")
    }
    setIsExporting(false)
  }

  const handleShare = async () => {
    setIsExporting(true)
    setErrorMsg('')
    const blob = await exportToImage(paperRef)
    if (blob) {
      await shareImage(blob)
    } else {
      setErrorMsg("We couldn't prepare the file just yet. Please try again.")
    }
    setIsExporting(false)
  }

  return (
    <div className="animate-fade-in" style={{ paddingTop: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: '80px', overflow: 'hidden' }}>
      
      <h2 style={{ fontSize: '20px', marginBottom: '8px', color: 'var(--color-primary)' }}>
        A little piece of your heart, on paper. ❤️
      </h2>
      <p style={{ color: '#666', marginBottom: '16px', fontSize: '14px' }}>
        Ready to turn your words into something they'll keep?
      </p>

      {errorMsg && (
        <div style={{ padding: '12px', backgroundColor: '#FDECEC', color: 'var(--color-primary)', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>
          {errorMsg}
        </div>
      )}

      {/* Wrapper to hold the scaled paper without overlapping other elements */}
      <div 
        style={{ 
          width: 794 * scale, 
          height: 1123 * scale,
          marginBottom: '32px',
          transition: 'all 0.3s ease'
        }}
      >
        <div style={{ '--a4-scale': scale }}>
          <A4Paper ref={paperRef} name={data.name} content={data.content} />
        </div>
      </div>

      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: '16px', background: 'white', borderTop: '1px solid #EAE0D5', display: 'flex', justifyContent: 'center', zIndex: 10, boxShadow: '0 -4px 10px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', gap: '8px', width: '100%', maxWidth: '600px' }}>
          
          {/* Share Button (Green) */}
          <button 
            onClick={handleShare}
            disabled={isExporting}
            style={{ flex: 1, padding: '10px 4px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px', background: '#e8f5e9', color: '#2e7d32', border: '1px solid #c8e6c9', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s', opacity: isExporting ? 0.5 : 1 }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
            <span style={{ fontSize: '12px', fontWeight: 300 }}>Share</span>
          </button>
          
          {/* Download Button (Blue) */}
          <button 
            onClick={handleDownloadPNG}
            disabled={isExporting}
            style={{ flex: 1, padding: '10px 4px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px', background: '#e3f2fd', color: '#1565c0', border: '1px solid #bbdefb', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s', opacity: isExporting ? 0.5 : 1 }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            <span style={{ fontSize: '12px', fontWeight: 300 }}>Save</span>
          </button>
          
          {/* Edit Button (Orange) */}
          <button 
            onClick={onEdit}
            disabled={isExporting}
            style={{ flex: 1, padding: '10px 4px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px', background: '#fff3e0', color: '#e65100', border: '1px solid #ffe0b2', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s', opacity: isExporting ? 0.5 : 1 }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
            <span style={{ fontSize: '12px', fontWeight: 300 }}>Edit</span>
          </button>
          
          {/* New Button (Purple) */}
          <button 
            onClick={onNew}
            disabled={isExporting}
            style={{ flex: 1, padding: '10px 4px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px', background: '#f3e5f5', color: '#7b1fa2', border: '1px solid #e1bee7', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s', opacity: isExporting ? 0.5 : 1 }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
            <span style={{ fontSize: '12px', fontWeight: 300 }}>New</span>
          </button>
          
        </div>
      </div>
    </div>
  )
}
