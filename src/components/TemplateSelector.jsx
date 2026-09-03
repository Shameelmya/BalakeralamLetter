import React from 'react'
import { templates } from '../data/templates'

export default function TemplateSelector({ onSelect }) {
  return (
    <div className="animate-fade-in" style={{ paddingTop: '60px' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '32px', color: 'var(--color-primary)' }}>
        Choose the words that feel like you.
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {templates.map((tpl, idx) => (
          <div key={tpl.id} className="card">
            <h4 style={{ color: '#999', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Template 0{idx + 1}
            </h4>
            <h3 style={{ fontSize: '20px', margin: '8px 0 12px 0', color: 'var(--color-primary)' }}>
              {tpl.title}
            </h3>
            <p style={{ fontFamily: 'var(--font-malayalam)', color: '#555', marginBottom: '24px', lineHeight: 1.6, fontSize: '16px' }}>
              "{tpl.preview}"
            </p>
            <button className="btn-primary" onClick={() => onSelect(tpl)}>
              Use This Letter →
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
