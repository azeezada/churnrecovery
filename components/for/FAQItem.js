'use client'
/**
 * FAQItem — accordion-style FAQ row used in FAQ sections on /for/* pages.
 *
 * Props:
 *   q     {string}  Question text
 *   a     {string|ReactNode}  Answer text or JSX
 */
import { useState } from 'react'

export default function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-brand-border rounded-[10px] overflow-hidden mb-2">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full bg-brand-white border-none cursor-pointer px-5 py-4 flex justify-between items-center gap-3 text-left"
      >
        <span className="font-sans font-semibold text-[0.93rem] text-brand-text">
          {q}
        </span>
        <span className="text-brand-accent text-[1.2rem] font-bold shrink-0">
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <div className="px-5 pb-4 bg-brand-bg">
          <p className="font-serif text-[0.88rem] text-brand-gray m-0 leading-[1.7]">
            {a}
          </p>
        </div>
      )}
    </div>
  )
}
