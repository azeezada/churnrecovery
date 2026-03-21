import Head from 'next/head'
import { useState, useEffect } from 'react'
import AppLayout from '../../components/AppLayout'
import { getProjects, getCancelFlow, saveCancelFlow } from '../../lib/localStore'

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
    <div className="bg-brand-white border border-brand-border rounded-[10px] p-5 flex gap-4 items-start">
      {/* Drag handle + icon */}
      <div className="flex flex-col items-center gap-1 pt-1">
        <span className="text-[0.7rem] text-brand-gray-light cursor-grab">⋮⋮</span>
        <span className="text-2xl">{reason.icon}</span>
      </div>

      {/* Fields */}
      <div className="flex-1">
        <div className="flex gap-3 mb-3">
          <div className="flex-1">
            <label className="text-[0.72rem] text-brand-gray-light font-medium block mb-1">
              REASON TEXT
            </label>
            <input
              type="text"
              value={reason.label}
              onChange={(e) => onUpdate({ ...reason, label: e.target.value })}
              className="w-full px-3 py-2 rounded-md border border-brand-border text-[0.88rem] font-sans text-brand-text bg-brand-bg outline-none box-border"
            />
          </div>
          <div className="w-[60px]">
            <label className="text-[0.72rem] text-brand-gray-light font-medium block mb-1">
              ICON
            </label>
            <input
              type="text"
              value={reason.icon}
              onChange={(e) => onUpdate({ ...reason, icon: e.target.value })}
              className="w-full px-3 py-2 rounded-md border border-brand-border text-[1.1rem] text-center bg-brand-bg outline-none box-border"
            />
          </div>
        </div>

        {/* Offer config */}
        <div className="flex gap-3 items-end">
          <div className="flex-1">
            <label className="text-[0.72rem] text-brand-gray-light font-medium block mb-1">
              OFFER TYPE
            </label>
            <select
              value={reason.offerType}
              onChange={(e) => onUpdate({ ...reason, offerType: e.target.value })}
              className="w-full px-3 py-2 rounded-md border border-brand-border text-[0.85rem] font-sans text-brand-text bg-brand-bg outline-none box-border"
            >
              {offerTypes.map(o => (
                <option key={o.value} value={o.value}>{o.icon} {o.label}</option>
              ))}
            </select>
          </div>

          {reason.offerType === 'discount' && (
            <>
              <div className="w-[100px]">
                <label className="text-[0.72rem] text-brand-gray-light font-medium block mb-1">
                  DISCOUNT %
                </label>
                <input
                  type="number"
                  value={reason.offerValue || ''}
                  onChange={(e) => onUpdate({ ...reason, offerValue: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-md border border-brand-border text-[0.85rem] font-sans bg-brand-bg outline-none box-border"
                />
              </div>
              <div className="w-[100px]">
                <label className="text-[0.72rem] text-brand-gray-light font-medium block mb-1">
                  MONTHS
                </label>
                <input
                  type="number"
                  value={reason.offerDuration || ''}
                  onChange={(e) => onUpdate({ ...reason, offerDuration: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-md border border-brand-border text-[0.85rem] font-sans bg-brand-bg outline-none box-border"
                />
              </div>
            </>
          )}

          {reason.offerType === 'pause' && (
            <div className="w-[100px]">
              <label className="text-[0.72rem] text-brand-gray-light font-medium block mb-1">
                MONTHS
              </label>
              <input
                type="number"
                value={reason.offerValue || ''}
                onChange={(e) => onUpdate({ ...reason, offerValue: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 rounded-md border border-brand-border text-[0.85rem] font-sans bg-brand-bg outline-none box-border"
              />
            </div>
          )}

          <button
            onClick={onRemove}
            className="px-3 py-2 rounded-md border border-brand-border bg-brand-white text-brand-gray-light cursor-pointer text-[0.85rem] font-sans"
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
    <div className="bg-brand-white border border-brand-border rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-brand-border flex justify-between items-center">
        <h3 className="font-sans text-[0.88rem] font-bold text-brand-text m-0">
          Live Preview
        </h3>
        {step > 0 && (
          <button onClick={reset} className="text-xs text-brand-accent bg-transparent border-none cursor-pointer font-sans font-medium">
            Reset ↺
          </button>
        )}
      </div>

      <div className="px-6 py-8 bg-[#FAFAFA] min-h-[300px]">
        {/* Mock modal */}
        <div className="bg-brand-white rounded-xl p-7 shadow-[0_8px_32px_rgba(0,0,0,0.08)] max-w-[380px] mx-auto">
          {step === 0 && (
            <>
              <h4 className="font-sans text-base font-bold text-brand-text m-0 mb-1 text-center">
                We&apos;re sorry to see you go
              </h4>
              <p className="text-[0.8rem] text-brand-gray m-0 mb-5 text-center">
                What&apos;s the main reason you&apos;re canceling?
              </p>
              <div className="flex flex-col gap-2">
                {reasons.map(r => (
                  <button
                    key={r.id}
                    onClick={() => handleReasonClick(r)}
                    className="flex items-center gap-[10px] px-3.5 py-3 rounded-lg border border-brand-border bg-brand-white cursor-pointer text-[0.85rem] font-sans text-brand-text text-left w-full"
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
                  <div className="text-center mb-5">
                    <span className="text-[2.5rem]">🎉</span>
                  </div>
                  <h4 className="font-sans text-base font-bold text-brand-text m-0 mb-2 text-center">
                    Wait — how about {selected.offerValue}% off?
                  </h4>
                  <p className="text-[0.8rem] text-brand-gray m-0 mb-5 text-center">
                    We&apos;d love to keep you. Here&apos;s {selected.offerValue}% off for the next {selected.offerDuration} months.
                  </p>
                </>
              )}
              {selected.offerType === 'pause' && (
                <>
                  <div className="text-center mb-5">
                    <span className="text-[2.5rem]">⏸️</span>
                  </div>
                  <h4 className="font-sans text-base font-bold text-brand-text m-0 mb-2 text-center">
                    Need a break?
                  </h4>
                  <p className="text-[0.8rem] text-brand-gray m-0 mb-5 text-center">
                    Pause your subscription for {selected.offerValue} months — no charge. Come back whenever you&apos;re ready.
                  </p>
                </>
              )}
              {selected.offerType === 'human' && (
                <>
                  <div className="text-center mb-5">
                    <span className="text-[2.5rem]">💬</span>
                  </div>
                  <h4 className="font-sans text-base font-bold text-brand-text m-0 mb-2 text-center">
                    Let&apos;s talk
                  </h4>
                  <p className="text-[0.8rem] text-brand-gray m-0 mb-5 text-center">
                    We&apos;d love to help. Chat with our team and we&apos;ll find a solution.
                  </p>
                </>
              )}
              {selected.offerType === 'feedback' && (
                <>
                  <h4 className="font-sans text-base font-bold text-brand-text m-0 mb-2 text-center">
                    Any feedback for us?
                  </h4>
                  <textarea
                    placeholder="What could we do better?"
                    className="w-full p-[10px] rounded-lg border border-brand-border text-[0.85rem] font-sans resize-y min-h-[80px] outline-none box-border mb-4"
                  />
                </>
              )}
              <div className="flex gap-2">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 p-[10px] rounded-lg bg-brand-accent text-brand-white border-none cursor-pointer font-semibold text-[0.85rem] font-sans"
                >
                  {selected.offerType === 'feedback' ? 'Submit & Cancel' : 'Accept Offer'}
                </button>
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 p-[10px] rounded-lg bg-brand-white text-brand-gray border border-brand-border cursor-pointer font-medium text-[0.85rem] font-sans"
                >
                  Cancel anyway
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <div className="text-center py-5">
              <span className="text-[2.5rem]">✅</span>
              <h4 className="font-sans text-base font-bold text-brand-text mt-3 mb-2">
                Done!
              </h4>
              <p className="text-[0.8rem] text-brand-gray m-0 mb-4">
                This is where the flow ends. The result gets logged to your analytics.
              </p>
              <button
                onClick={reset}
                className="px-5 py-2 rounded-md bg-brand-accent text-brand-white border-none cursor-pointer font-semibold text-[0.82rem] font-sans"
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

  // Load project + existing flow config from localStore
  useEffect(() => {
    const projects = getProjects()
    if (projects.length === 0) return
    const pid = projects[0].id
    setProjectId(pid)
    const flow = getCancelFlow(pid)
    if (flow && flow.reasons && flow.reasons.length > 0) {
      setReasons(flow.reasons)
    }
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

  const handleSave = () => {
    setSaving(true)
    saveCancelFlow(projectId || 'default', reasons)
    setTimeout(() => {
      setSaving(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }, 300)
  }

  return (
    <>
      <Head>
        <title>Cancel Flow Builder — ChurnRecovery</title>
      </Head>
      <AppLayout title="Cancel Flow Builder">
        <p className="font-serif text-[0.9rem] text-brand-gray m-0 mb-8 leading-[1.7]">
          Configure the reasons and offers shown when a customer tries to cancel. Each reason maps to a retention offer.
        </p>

        <div className="grid grid-cols-[1fr_380px] gap-6 items-start">
          {/* Editor */}
          <div>
            <div className="flex flex-col gap-3 mb-4">
              {reasons.map((reason, i) => (
                <ReasonEditor
                  key={reason.id}
                  reason={reason}
                  onUpdate={(updated) => updateReason(i, updated)}
                  onRemove={() => removeReason(i)}
                />
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={addReason}
                className="px-5 py-[10px] rounded-lg border-2 border-dashed border-brand-border bg-brand-white text-brand-gray cursor-pointer text-[0.85rem] font-sans font-medium flex-1"
              >
                + Add Reason
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className={`px-6 py-[10px] rounded-lg ${saved ? 'bg-brand-green' : 'bg-brand-accent'} text-brand-white border-none ${saving ? 'cursor-not-allowed opacity-70' : 'cursor-pointer opacity-100'} text-[0.85rem] font-sans font-semibold transition-colors duration-200`}
              >
                {saved ? '✓ Saved' : saving ? 'Saving...' : 'Save Flow'}
              </button>
            </div>
          </div>

          {/* Preview */}
          <div className="sticky top-8">
            <FlowPreview reasons={reasons} />
          </div>
        </div>
      </AppLayout>
    </>
  )
}

CancelFlowPage.isAppPage = true
