'use client'
/**
 * FAQItem — accordion-style FAQ row used in FAQ sections on /for/* pages.
 *
 * Props:
 *   q     {string}  Question text
 *   a     {string|ReactNode}  Answer text or JSX
 *   theme {object}  (optional) Partial theme override. Merged with defaults.
 */
import { useState } from 'react'

export default function FAQItem({ q, a, theme = {} }) {
  const [open, setOpen] = useState(false)

  const t = {
    bg: '#FAF9F5',
    text: '#191919',
    gray: '#666666',
    border: '#E5E5E5',
    white: '#FFFFFF',
    accent: '#D97757',
    fontSans: '"Instrument Sans", sans-serif',
    fontSerif: '"Merriweather", serif',
    ...theme,
  }

  return (
    <div style={{
      border: `1px solid ${t.border}`,
      borderRadius: '10px',
      overflow: 'hidden',
      marginBottom: '8px',
    }}>
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        style={{
          width: '100%', background: t.white, border: 'none',
          cursor: 'pointer', padding: '16px 20px',
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', gap: '12px', textAlign: 'left',
        }}
      >
        <span style={{
          fontFamily: t.fontSans, fontWeight: 600,
          fontSize: '0.93rem', color: t.text,
        }}>
          {q}
        </span>
        <span style={{
          color: t.accent, fontSize: '1.2rem',
          fontWeight: 700, flexShrink: 0,
        }}>
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <div style={{ padding: '0 20px 16px', background: t.bg }}>
          <p style={{
            fontFamily: t.fontSerif, fontSize: '0.88rem',
            color: t.gray, margin: 0, lineHeight: 1.7,
          }}>
            {a}
          </p>
        </div>
      )}
    </div>
  )
}
