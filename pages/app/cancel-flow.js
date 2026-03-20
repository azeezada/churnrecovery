import Head from 'next/head'
import { useState, useEffect } from 'react'
import AppLayout from '../../components/AppLayout'

const t = {
  bg: '#FAF9F5',
  text: '#191919',
  gray: '#666666',
  grayLight: '#999999',
  accent: '#D97757',
  accentHover: '#C4603D',
  border: '#E5E5E5',
  white: '#FFFFFF',
  green: '#2D7A4F',
  greenLight: '#EDF7F1',
  blue: '#2563EB',
  blueLight: '#EFF6FF',
  fontSans: '"Instrument Sans", sans-serif',
  fontSerif: '"Merriweather", serif',
}

const defaultReasons = [
  { id: 'too-expensive', label: 'Too expensive', icon: '💰', offerType: 'discount', offerValue: 30, offerDuration: 3 },
  { id: 'not-using', label: 'Not using it enough', icon: '😴', offerType: 'pause', offerValue: 2, offerDuration: null },
  { id: 'switching', label: 'Switching to competitor', icon: '👋', offerType: 'discount', offerValue: 50, offerDuration: 6 },
  { id: 'missing-feature', label: 'Missing a feature', icon: '🔧', offerType: 'human', offerValue: null, offerDuration: null },
  { id: 'too-complex', label: 'Too complex to use', icon: '🤯', offerType: 'human', offerValue: null, offerDuration: null },
  { id: 'other', label: 'Something else', icon: '💬', offerType: 'feedback', offerValue: null, offerDuration: null },
]

const offerTypes = [
  { value: 'discount', label: 'Discount', icon: '💰', desc: 'Offer a percentage discount for X months' },
  { value: 'pause', label: 'Pause', icon: '⏸️', desc: 'Let customer pause their subscription' },
  { value: 'human', label: 'Talk to Human', icon: '💬', desc: 'Route to support for personal help' },
  { value: 'feedback', label: 'Feedback Only', icon: '📝', desc: 'Just collect feedback, no offer' },
]

function ReasonEditor({ reason, onUpdate, onRemove }) {
  return (
    <div style={{
      background: t.white,
      border: `1px solid ${t.border}`,
      borderRadius: '10px',
      padding: '20px',
      display: 'flex',
      gap: '16px',
      alignItems: 'flex-start',
    }}>
      {/* Drag handle + icon */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', paddingTop: '4px' }}>
        <span style={{ fontSize: '0.7rem', color: t.grayLight, cursor: 'grab' }}>⋮⋮</span>
        <span style={{ fontSize: '1.5rem' }}>{reason.icon}</span>
      </div>

      {/* Fields */}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '0.72rem', color: t.grayLight, fontWeight: 500, display: 'block', marginBottom: '4px' }}>
              REASON TEXT
            </label>
            <input
              type="text"
              value={reason.label}
              onChange={(e) => onUpdate({ ...reason, label: e.target.value })}
              style={{
                width: '100%', padding: '8px 12px', borderRadius: '6px',
                border: `1px solid ${t.border}`, fontSize: '0.88rem',
                fontFamily: t.fontSans, color: t.text, background: t.bg,
                outline: 'none', boxSizing: 'border-box',
              }}
            />
          </div>
          <div style={{ width: '60px' }}>
            <label style={{ fontSize: '0.72rem', color: t.grayLight, fontWeight: 500, display: 'block', marginBottom: '4px' }}>
              ICON
            </label>
            <input
              type="text"
              value={reason.icon}
              onChange={(e) => onUpdate({ ...reason, icon: e.target.value })}
              style={{
                width: '100%', padding: '8px 12px', borderRadius: '6px',
                border: `1px solid ${t.border}`, fontSize: '1.1rem',
                textAlign: 'center', background: t.bg,
                outline: 'none', boxSizing: 'border-box',
              }}
            />
          </div>
        </div>

        {/* Offer config */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '0.72rem', color: t.grayLight, fontWeight: 500, display: 'block', marginBottom: '4px' }}>
              OFFER TYPE
            </label>
            <select
              value={reason.offerType}
              onChange={(e) => onUpdate({ ...reason, offerType: e.target.value })}
              style={{
                width: '100%', padding: '8px 12px', borderRadius: '6px',
                border: `1px solid ${t.border}`, fontSize: '0.85rem',
                fontFamily: t.fontSans, color: t.text, background: t.bg,
                outline: 'none', boxSizing: 'border-box',
              }}
            >
              {offerTypes.map(o => (
                <option key={o.value} value={o.value}>{o.icon} {o.label}</option>
              ))}
            </select>
          </div>

          {reason.offerType === 'discount' && (
            <>
              <div style={{ width: '100px' }}>
                <label style={{ fontSize: '0.72rem', color: t.grayLight, fontWeight: 500, display: 'block', marginBottom: '4px' }}>
                  DISCOUNT %
                </label>
                <input
                  type="number"
                  value={reason.offerValue || ''}
                  onChange={(e) => onUpdate({ ...reason, offerValue: parseInt(e.target.value) || 0 })}
                  style={{
                    width: '100%', padding: '8px 12px', borderRadius: '6px',
                    border: `1px solid ${t.border}`, fontSize: '0.85rem',
                    fontFamily: t.fontSans, background: t.bg, outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <div style={{ width: '100px' }}>
                <label style={{ fontSize: '0.72rem', color: t.grayLight, fontWeight: 500, display: 'block', marginBottom: '4px' }}>
                  MONTHS
                </label>
                <input
                  type="number"
                  value={reason.offerDuration || ''}
                  onChange={(e) => onUpdate({ ...reason, offerDuration: parseInt(e.target.value) || 0 })}
                  style={{
                    width: '100%', padding: '8px 12px', borderRadius: '6px',
                    border: `1px solid ${t.border}`, fontSize: '0.85rem',
                    fontFamily: t.fontSans, background: t.bg, outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </>
          )}

          {reason.offerType === 'pause' && (
            <div style={{ width: '100px' }}>
              <label style={{ fontSize: '0.72rem', color: t.grayLight, fontWeight: 500, display: 'block', marginBottom: '4px' }}>
                MONTHS
              </label>
              <input
                type="number"
                value={reason.offerValue || ''}
                onChange={(e) => onUpdate({ ...reason, offerValue: parseInt(e.target.value) || 0 })}
                style={{
                  width: '100%', padding: '8px 12px', borderRadius: '6px',
                  border: `1px solid ${t.border}`, fontSize: '0.85rem',
                  fontFamily: t.fontSans, background: t.bg, outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          )}

          <button
            onClick={onRemove}
            style={{
              padding: '8px 12px', borderRadius: '6px', border: `1px solid ${t.border}`,
              background: t.white, color: t.grayLight, cursor: 'pointer',
              fontSize: '0.85rem', fontFamily: t.fontSans,
            }}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  )
}

function FlowPreview({ reasons }) {
  const [step, setStep] = useState(0) // 0=reasons, 1=offer, 2=result
  const [selected, setSelected] = useState(null)

  const handleReasonClick = (reason) => {
    setSelected(reason)
    setStep(1)
  }

  const reset = () => { setStep(0); setSelected(null) }

  return (
    <div style={{
      background: t.white,
      border: `1px solid ${t.border}`,
      borderRadius: '12px',
      overflow: 'hidden',
    }}>
      <div style={{
        padding: '16px 20px',
        borderBottom: `1px solid ${t.border}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <h3 style={{ fontFamily: t.fontSans, fontSize: '0.88rem', fontWeight: 700, color: t.text, margin: 0 }}>
          Live Preview
        </h3>
        {step > 0 && (
          <button onClick={reset} style={{
            fontSize: '0.75rem', color: t.accent, background: 'none', border: 'none',
            cursor: 'pointer', fontFamily: t.fontSans, fontWeight: 500,
          }}>
            Reset ↺
          </button>
        )}
      </div>

      <div style={{ padding: '32px 24px', background: '#FAFAFA', minHeight: '300px' }}>
        {/* Mock modal */}
        <div style={{
          background: t.white,
          borderRadius: '12px',
          padding: '28px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
          maxWidth: '380px',
          margin: '0 auto',
        }}>
          {step === 0 && (
            <>
              <h4 style={{ fontFamily: t.fontSans, fontSize: '1rem', fontWeight: 700, color: t.text, margin: '0 0 4px', textAlign: 'center' }}>
                We&apos;re sorry to see you go
              </h4>
              <p style={{ fontSize: '0.8rem', color: t.gray, margin: '0 0 20px', textAlign: 'center' }}>
                What&apos;s the main reason you&apos;re canceling?
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {reasons.map(r => (
                  <button
                    key={r.id}
                    onClick={() => handleReasonClick(r)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      padding: '12px 14px', borderRadius: '8px',
                      border: `1px solid ${t.border}`, background: t.white,
                      cursor: 'pointer', fontSize: '0.85rem', fontFamily: t.fontSans,
                      color: t.text, textAlign: 'left', width: '100%',
                    }}
                  >
                    <span>{r.icon}</span> {r.label}
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 1 && selected && (
            <>
              {selected.offerType === 'discount' && (
                <>
                  <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <span style={{ fontSize: '2.5rem' }}>🎉</span>
                  </div>
                  <h4 style={{ fontFamily: t.fontSans, fontSize: '1rem', fontWeight: 700, color: t.text, margin: '0 0 8px', textAlign: 'center' }}>
                    Wait — how about {selected.offerValue}% off?
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: t.gray, margin: '0 0 20px', textAlign: 'center' }}>
                    We&apos;d love to keep you. Here&apos;s {selected.offerValue}% off for the next {selected.offerDuration} months.
                  </p>
                </>
              )}
              {selected.offerType === 'pause' && (
                <>
                  <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <span style={{ fontSize: '2.5rem' }}>⏸️</span>
                  </div>
                  <h4 style={{ fontFamily: t.fontSans, fontSize: '1rem', fontWeight: 700, color: t.text, margin: '0 0 8px', textAlign: 'center' }}>
                    Need a break?
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: t.gray, margin: '0 0 20px', textAlign: 'center' }}>
                    Pause your subscription for {selected.offerValue} months — no charge. Come back whenever you&apos;re ready.
                  </p>
                </>
              )}
              {selected.offerType === 'human' && (
                <>
                  <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <span style={{ fontSize: '2.5rem' }}>💬</span>
                  </div>
                  <h4 style={{ fontFamily: t.fontSans, fontSize: '1rem', fontWeight: 700, color: t.text, margin: '0 0 8px', textAlign: 'center' }}>
                    Let&apos;s talk
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: t.gray, margin: '0 0 20px', textAlign: 'center' }}>
                    We&apos;d love to help. Chat with our team and we&apos;ll find a solution.
                  </p>
                </>
              )}
              {selected.offerType === 'feedback' && (
                <>
                  <h4 style={{ fontFamily: t.fontSans, fontSize: '1rem', fontWeight: 700, color: t.text, margin: '0 0 8px', textAlign: 'center' }}>
                    Any feedback for us?
                  </h4>
                  <textarea
                    placeholder="What could we do better?"
                    style={{
                      width: '100%', padding: '10px', borderRadius: '8px',
                      border: `1px solid ${t.border}`, fontSize: '0.85rem',
                      fontFamily: t.fontSans, resize: 'vertical', minHeight: '80px',
                      outline: 'none', boxSizing: 'border-box', marginBottom: '16px',
                    }}
                  />
                </>
              )}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setStep(2)}
                  style={{
                    flex: 1, padding: '10px', borderRadius: '8px',
                    background: t.accent, color: t.white, border: 'none',
                    cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem',
                    fontFamily: t.fontSans,
                  }}
                >
                  {selected.offerType === 'feedback' ? 'Submit & Cancel' : 'Accept Offer'}
                </button>
                <button
                  onClick={() => setStep(2)}
                  style={{
                    flex: 1, padding: '10px', borderRadius: '8px',
                    background: t.white, color: t.gray, border: `1px solid ${t.border}`,
                    cursor: 'pointer', fontWeight: 500, fontSize: '0.85rem',
                    fontFamily: t.fontSans,
                  }}
                >
                  Cancel anyway
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <span style={{ fontSize: '2.5rem' }}>✅</span>
              <h4 style={{ fontFamily: t.fontSans, fontSize: '1rem', fontWeight: 700, color: t.text, margin: '12px 0 8px' }}>
                Done!
              </h4>
              <p style={{ fontSize: '0.8rem', color: t.gray, margin: '0 0 16px' }}>
                This is where the flow ends. The result gets logged to your analytics.
              </p>
              <button
                onClick={reset}
                style={{
                  padding: '8px 20px', borderRadius: '6px',
                  background: t.accent, color: t.white, border: 'none',
                  cursor: 'pointer', fontWeight: 600, fontSize: '0.82rem',
                  fontFamily: t.fontSans,
                }}
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function CancelFlowPage() {
  const [reasons, setReasons] = useState(defaultReasons)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [projectId, setProjectId] = useState(null)
  const [loadError, setLoadError] = useState(null)

  // Load project + existing flow config
  useEffect(() => {
    async function load() {
      try {
        const projRes = await fetch('/api/projects')
        const projData = await projRes.json()
        if (!projData.projects || projData.projects.length === 0) return
        const pid = projData.projects[0].id
        setProjectId(pid)

        const flowRes = await fetch(`/api/cancel-flow?projectId=${pid}`)
        const flowData = await flowRes.json()
        if (flowData && flowData.reasons && flowData.reasons.length > 0) {
          setReasons(flowData.reasons)
        }
      } catch (e) {
        setLoadError('Failed to load flow config')
      }
    }
    load()
  }, [])

  const updateReason = (index, updated) => {
    const next = [...reasons]
    next[index] = updated
    setReasons(next)
  }

  const removeReason = (index) => {
    setReasons(reasons.filter((_, i) => i !== index))
  }

  const addReason = () => {
    setReasons([...reasons, {
      id: `reason-${Date.now()}`,
      label: 'New reason',
      icon: '❓',
      offerType: 'feedback',
      offerValue: null,
      offerDuration: null,
    }])
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/cancel-flow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId: projectId || 'default', reasons }),
      })
      if (res.ok) {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      }
    } catch (e) {
      console.error('Failed to save:', e)
    }
    setSaving(false)
  }

  return (
    <>
      <Head>
        <title>Cancel Flow Builder — ChurnRecovery</title>
      </Head>
      <AppLayout title="Cancel Flow Builder">
        <p style={{ fontFamily: t.fontSerif, fontSize: '0.9rem', color: t.gray, margin: '0 0 32px', lineHeight: 1.7 }}>
          Configure the reasons and offers shown when a customer tries to cancel. Each reason maps to a retention offer.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '24px', alignItems: 'start' }}>
          {/* Editor */}
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
              {reasons.map((reason, i) => (
                <ReasonEditor
                  key={reason.id}
                  reason={reason}
                  onUpdate={(updated) => updateReason(i, updated)}
                  onRemove={() => removeReason(i)}
                />
              ))}
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={addReason}
                style={{
                  padding: '10px 20px', borderRadius: '8px',
                  border: `2px dashed ${t.border}`, background: t.white,
                  color: t.gray, cursor: 'pointer', fontSize: '0.85rem',
                  fontFamily: t.fontSans, fontWeight: 500, flex: 1,
                }}
              >
                + Add Reason
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                style={{
                  padding: '10px 24px', borderRadius: '8px',
                  background: saved ? t.green : t.accent, color: t.white,
                  border: 'none', cursor: saving ? 'not-allowed' : 'pointer',
                  fontSize: '0.85rem', fontFamily: t.fontSans, fontWeight: 600,
                  opacity: saving ? 0.7 : 1,
                  transition: 'background 0.2s',
                }}
              >
                {saved ? '✓ Saved' : saving ? 'Saving...' : 'Save Flow'}
              </button>
            </div>
          </div>

          {/* Preview */}
          <div style={{ position: 'sticky', top: '32px' }}>
            <FlowPreview reasons={reasons} />
          </div>
        </div>
      </AppLayout>
    </>
  )
}

CancelFlowPage.isAppPage = true
