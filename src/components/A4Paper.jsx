import React, { forwardRef } from 'react'

const A4Paper = forwardRef(({ name, content }, ref) => {
  const date = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

  const hasMalayalam = /[\u0D00-\u0D7F]/.test(name)

  return (
    <div 
      ref={ref}
      id="letter-content"
      className="a4-paper" 
      style={{
        transform: 'scale(var(--a4-scale, 1))',
        transformOrigin: 'top left'
      }}
    >
      <div className="lines-layer" style={{
        position: 'absolute',
        top: '232px',
        left: 0,
        right: 0,
        height: '760px',
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='38' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 60 37 L 734 37' stroke='rgba(0,0,255,0.15)' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        zIndex: 0,
        pointerEvents: 'none'
      }} />
      <div className="a4-content" style={{ position: 'relative', zIndex: 1 }}>
        {content}
        
        <div style={{ marginTop: '38px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingRight: '40px', transform: 'translateY(-8px)' }}>
          <div className="english" style={{ fontSize: '16px', color: '#666', lineHeight: '38px' }}>{date}</div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: '18px', color: '#666', lineHeight: '38px' }}>സ്നേഹപൂർവ്വം, ❤️</div>
            <div 
              className={hasMalayalam ? "" : "english"} 
              style={{ 
                fontSize: '24px', 
                color: 'var(--color-primary)', 
                lineHeight: '38px',
                fontFamily: hasMalayalam ? 'var(--font-malayalam)' : undefined
              }}
            >
              {name}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default A4Paper
