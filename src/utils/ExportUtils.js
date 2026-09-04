import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

export const exportToImage = async (elementRef, filename = "Teachers-Day-Letter.png") => {
  if (!elementRef.current) return null

  try {
    const canvas = await html2canvas(elementRef.current, {
      scale: 5, // Extremely high resolution for PNG sharing
      useCORS: true,
      backgroundColor: '#FDFBF7'
    })
    
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob)
      }, 'image/png')
    })
  } catch (error) {
    console.error("Image Export failed", error)
    return null
  }
}

export const shareImage = async (blob, filename = "Teachers-Day-Letter.png") => {
  if (!blob) return false

  const file = new File([blob], filename, { type: blob.type })

  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({
        files: [file]
      })
      return true
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error("Share failed", error)
      }
      return false
    }
  } else {
    // Fallback download if share not supported
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    return true
  }
}
