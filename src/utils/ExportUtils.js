import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

export const exportToImage = async (elementRef, filename = "Teachers-Day-Letter.png") => {
  if (!elementRef.current) return null

  try {
    const canvas = await html2canvas(elementRef.current, {
      scale: 8, // Ultra-high maximum resolution for perfect HD PNG sharing
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

export const exportToPDF = async (elementRef, filename = "Teachers-Day-Letter.pdf") => {
  if (!elementRef.current) return false

  try {
    const canvas = await html2canvas(elementRef.current, {
      scale: 6, // Very high quality
      useCORS: true,
      backgroundColor: '#FDFBF7'
    })
    
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    })
    
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
    pdf.save(filename)
    return true
  } catch (error) {
    console.error("PDF Export failed", error)
    return false
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
