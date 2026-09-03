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
        
        <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingRight: '40px' }}>
          <div className="english" style={{ fontSize: '18px', color: '#666' }}>{date}</div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '20px', color: '#666' }}>സ്നേഹപൂർവ്വം, ❤️</div>
            <div className="english" style={{ fontSize: '26px', color: 'var(--color-primary)', marginTop: '4px' }}>{name}</div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default A4Paper
