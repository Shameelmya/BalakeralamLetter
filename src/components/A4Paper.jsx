import React, { forwardRef } from 'react'

const A4Paper = forwardRef(({ name, content }, ref) => {
  const date = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

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
      <div className="a4-content">
        {content}
        
        <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingRight: '40px', transform: 'translateY(-8px)' }}>
          <div className="english" style={{ fontSize: '16px', color: '#666', lineHeight: '38px' }}>{date}</div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: '18px', color: '#666', lineHeight: '38px' }}>സ്നേഹപൂർവ്വം, ❤️</div>
            <div className="english" style={{ fontSize: '24px', color: 'var(--color-primary)', lineHeight: '38px' }}>{name}</div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default A4Paper
