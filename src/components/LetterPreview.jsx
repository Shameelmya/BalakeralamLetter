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
    <div className="animate-fade-in" style={{ paddingTop: '0px', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: '80px', overflow: 'hidden' }}>
      
      <div style={{ textAlign: 'center', margin: '0px 16px 12px' }}>
        <h2 style={{ fontFamily: 'var(--font-prakasham)', fontSize: '18px', color: 'var(--color-primary)', fontWeight: 800 }}>
          എത്രയും പ്രിയപ്പെട്ട ടീച്ചർ വായിക്കാൻ.. ❤️
        </h2>
      </div>

      {errorMsg && (
        <div style={{ padding: '12px', backgroundColor: '#FDECEC', color: 'var(--color-primary)', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>
          {errorMsg}
        </div>
      )}

      {/* Unified Card Container with perfect iOS clipping */}
      <div 
        style={{ 
          width: 794 * scale, 
          marginBottom: '32px',
          boxShadow: '0 15px 40px rgba(0,0,0,0.15)',
          borderRadius: '24px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'var(--color-primary)',
          WebkitMaskImage: '-webkit-radial-gradient(white, black)',
          transform: 'translateZ(0)'
        }}
      >
        <div 
          style={{ 
            width: '100%', 
            height: 1123 * scale,
            position: 'relative',
            backgroundColor: '#fff'
          }}
        >
          <div style={{ '--a4-scale': scale, transformOrigin: 'top left', position: 'absolute', top: 0, left: 0 }}>
            <A4Paper ref={paperRef} name={data.name} content={data.content} />
          </div>
        </div>

        {/* Brown Menu Area directly attached below */}
        <div style={{
          width: '100%',
          backgroundColor: 'var(--color-primary)', 
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          padding: '16px 8px'
        }}>
          {/* Share Button */}
          <button onClick={handleShare} disabled={isExporting} style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer', opacity: isExporting ? 0.5 : 1 }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '16px', backgroundColor: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', transition: 'transform 0.2s' }} onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.92)'} onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
            </div>
            <span style={{ fontSize: '11px', color: 'white', fontWeight: 300, opacity: 0.9 }}>Share</span>
          </button>
          
          {/* Save Button */}
          <button onClick={handleDownloadPNG} disabled={isExporting} style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer', opacity: isExporting ? 0.5 : 1 }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '16px', backgroundColor: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', transition: 'transform 0.2s' }} onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.92)'} onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            </div>
            <span style={{ fontSize: '11px', color: 'white', fontWeight: 300, opacity: 0.9 }}>Save</span>
          </button>
          
          {/* Edit Button */}
          <button onClick={onEdit} disabled={isExporting} style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer', opacity: isExporting ? 0.5 : 1 }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '16px', backgroundColor: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', transition: 'transform 0.2s' }} onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.92)'} onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
            </div>
            <span style={{ fontSize: '11px', color: 'white', fontWeight: 300, opacity: 0.9 }}>Edit</span>
          </button>
          
          {/* New Button */}
          <button onClick={onNew} disabled={isExporting} style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer', opacity: isExporting ? 0.5 : 1 }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '16px', backgroundColor: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', transition: 'transform 0.2s' }} onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.92)'} onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
            </div>
            <span style={{ fontSize: '11px', color: 'white', fontWeight: 300, opacity: 0.9 }}>New</span>
          </button>
          
        </div>
      </div>
    </div>
  )
}
