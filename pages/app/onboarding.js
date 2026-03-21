import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import AppLayout from '../../components/AppLayout'
import { useAuthUser } from '../../lib/useAuthUser'
import { createProject, getCancelFlow, saveCancelFlow } from '../../lib/localStore'

const t = {
  bg: '#FAF9F5',
  text: '#191919',
  gray: '#666666',
  grayLight: '#999999',
  accent: '#D97757',
  border: '#E5E5E5',
  white: '#FFFFFF',
  green: '#2D7A4F',
  greenLight: '#EDF7F1',
  blue: '#2563EB',
  blueLight: '#EFF6FF',
  fontSans: '"Instrument Sans", sans-serif',
  fontSerif: '"Merriweather", serif',
  codeBg: '#1E1E2E',
  codeText: '#CDD6F4',
}

const FLOW_TEMPLATES = [
  {
    id: 'saas-standard',
    name: 'SaaS Standard',
    description: 'Common reasons for SaaS cancellations with discount and pause offers',
    icon: '💼',
    reasons: [
      { id: 'too-expensive', label: 'Too expensive', icon: '💰', offerType: 'discount', offerValue: 30, offerDuration: 3 },
      { id: 'not-using', label: 'Not using it enough', icon: '😴', offerType: 'pause', offerValue: 2, offerDuration: null },
      { id: 'switching', label: 'Switching to competitor', icon: '👋', offerType: 'discount', offerValue: 50, offerDuration: 6 },
      { id: 'missing-feature', label: 'Missing a feature', icon: '🔧', offerType: 'human', offerValue: null, offerDuration: null },
      { id: 'other', label: 'Something else', icon: '💬', offerType: 'feedback', offerValue: null, offerDuration: null },
    ]
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    description: 'Subscription box and recurring purchase flows',
    icon: '🛒',
    reasons: [
      { id: 'too-expensive', label: 'Too expensive', icon: '💰', offerType: 'discount', offerValue: 25, offerDuration: 6 },
      { id: 'delivery-issues', label: 'Delivery problems', icon: '📦', offerType: 'human', offerValue: null, offerDuration: null },
      { id: 'product-quality', label: 'Product quality issues', icon: '⭐', offerType: 'human', offerValue: null, offerDuration: null },
      { id: 'lifestyle-change', label: 'Lifestyle change', icon: '🏃‍♀️', offerType: 'pause', offerValue: 3, offerDuration: null },
      { id: 'other', label: 'Something else', icon: '💬', offerType: 'feedback', offerValue: null, offerDuration: null },
    ]
  },
  {
    id: 'streaming',
    name: 'Streaming/Media',
    description: 'Video, audio, and content subscription services',
    icon: '🎬',
    reasons: [
      { id: 'too-expensive', label: 'Too expensive', icon: '💰', offerType: 'discount', offerValue: 20, offerDuration: 2 },
      { id: 'not-watching', label: 'Not watching enough', icon: '📺', offerType: 'pause', offerValue: 1, offerDuration: null },
      { id: 'content-quality', label: 'Content quality', icon: '🎭', offerType: 'feedback', offerValue: null, offerDuration: null },
      { id: 'technical-issues', label: 'Technical problems', icon: '⚠️', offerType: 'human', offerValue: null, offerDuration: null },
      { id: 'other', label: 'Something else', icon: '💬', offerType: 'feedback', offerValue: null, offerDuration: null },
    ]
  },
  {
    id: 'custom',
    name: 'Build Custom',
    description: 'Start from scratch with your own reasons and offers',
    icon: '🛠️',
    reasons: []
  }
]

function StepIndicator({ currentStep, totalSteps }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px' }}>
      {Array.from({ length: totalSteps }, (_, i) => {
        const stepNum = i + 1
        const isActive = stepNum === currentStep
        const isCompleted = stepNum < currentStep
        
        return (
          <div key={stepNum} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: isCompleted ? t.green : isActive ? t.accent : t.border,
              color: isCompleted || isActive ? t.white : t.gray,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.85rem',
              fontWeight: 600
            }}>
              {isCompleted ? '✓' : stepNum}
            </div>
            {i < totalSteps - 1 && (
              <div style={{
                width: '24px',
                height: '2px',
                background: isCompleted ? t.green : t.border,
                marginLeft: '8px'
              }} />
            )}
          </div>
        )
      })}
    </div>
  )
}

function Step1({ formData, onNext, onUpdate }) {
  const [errors, setErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}
    
    if (!formData.projectName?.trim()) {
      newErrors.projectName = 'Project name is required'
    }
    
    if (!formData.websiteUrl?.trim()) {
      newErrors.websiteUrl = 'Website URL is required'
    } else if (!formData.websiteUrl.match(/^https?:\/\/.+/)) {
      newErrors.websiteUrl = 'Please enter a valid URL (including http:// or https://)'
    }

    setErrors(newErrors)
    
    if (Object.keys(newErrors).length === 0) {
      onNext()
    }
  }

  return (
    <div>
      <h2 style={{ fontFamily: t.fontSans, fontSize: '1.5rem', fontWeight: 700, color: t.text, margin: '0 0 8px' }}>
        Create Your Project
      </h2>
      <p style={{ fontFamily: t.fontSerif, fontSize: '0.9rem', color: t.gray, margin: '0 0 32px', lineHeight: 1.7 }}>
        Let's start by setting up your project. This will help us organize your cancel flows and analytics.
      </p>

      <form onSubmit={handleSubmit} style={{ maxWidth: '500px' }}>
        <div style={{ marginBottom: '24px' }}>
          <label style={{ 
            display: 'block', 
            fontSize: '0.85rem', 
            fontWeight: 600, 
            color: t.text, 
            marginBottom: '8px',
            fontFamily: t.fontSans
          }}>
            Project Name
          </label>
          <input
            type="text"
            value={formData.projectName || ''}
            onChange={e => onUpdate({ projectName: e.target.value })}
            placeholder="e.g. My SaaS App, E-commerce Store"
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '8px',
              border: `1px solid ${errors.projectName ? t.accent : t.border}`,
              fontFamily: t.fontSans,
              fontSize: '0.9rem',
              color: t.text,
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
          {errors.projectName && (
            <div style={{ fontSize: '0.8rem', color: t.accent, marginTop: '4px' }}>
              {errors.projectName}
            </div>
          )}
        </div>

        <div style={{ marginBottom: '32px' }}>
          <label style={{ 
            display: 'block', 
            fontSize: '0.85rem', 
            fontWeight: 600, 
            color: t.text, 
            marginBottom: '8px',
            fontFamily: t.fontSans
          }}>
            Website URL
          </label>
          <input
            type="url"
            value={formData.websiteUrl || ''}
            onChange={e => onUpdate({ websiteUrl: e.target.value })}
            placeholder="https://myapp.com"
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '8px',
              border: `1px solid ${errors.websiteUrl ? t.accent : t.border}`,
              fontFamily: t.fontSans,
              fontSize: '0.9rem',
              color: t.text,
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
          {errors.websiteUrl && (
            <div style={{ fontSize: '0.8rem', color: t.accent, marginTop: '4px' }}>
              {errors.websiteUrl}
            </div>
          )}
          <div style={{ fontSize: '0.8rem', color: t.grayLight, marginTop: '4px' }}>
            This is where you'll install the ChurnRecovery widget
          </div>
        </div>

        <button
          type="submit"
          style={{
            padding: '12px 32px',
            borderRadius: '8px',
            background: t.accent,
            color: t.white,
            border: 'none',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.9rem',
            fontFamily: t.fontSans
          }}
        >
          Continue →
        </button>
      </form>
    </div>
  )
}

function Step2({ formData, onNext, onUpdate, onBack }) {
  const [selectedTemplate, setSelectedTemplate] = useState(formData.flowTemplate || 'saas-standard')

  const handleNext = () => {
    onUpdate({ 
      flowTemplate: selectedTemplate,
      customReasons: FLOW_TEMPLATES.find(t => t.id === selectedTemplate)?.reasons || []
    })
    onNext()
  }

  return (
    <div>
      <h2 style={{ fontFamily: t.fontSans, fontSize: '1.5rem', fontWeight: 700, color: t.text, margin: '0 0 8px' }}>
        Choose Your Cancel Flow
      </h2>
      <p style={{ fontFamily: t.fontSerif, fontSize: '0.9rem', color: t.gray, margin: '0 0 32px', lineHeight: 1.7 }}>
        Pick a template that matches your business type, or build a custom flow from scratch.
      </p>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '16px', 
        marginBottom: '32px' 
      }}>
        {FLOW_TEMPLATES.map(template => (
          <div
            key={template.id}
            onClick={() => setSelectedTemplate(template.id)}
            style={{
              padding: '20px',
              borderRadius: '12px',
              border: `2px solid ${selectedTemplate === template.id ? t.accent : t.border}`,
              background: selectedTemplate === template.id ? '#FDF4EF' : t.white,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <span style={{ fontSize: '2rem' }}>{template.icon}</span>
              <h3 style={{ 
                fontFamily: t.fontSans, 
                fontSize: '1.1rem', 
                fontWeight: 700, 
                color: t.text, 
                margin: 0 
              }}>
                {template.name}
              </h3>
            </div>
            <p style={{ 
              fontSize: '0.85rem', 
              color: t.gray, 
              margin: '0 0 12px', 
              lineHeight: 1.6 
            }}>
              {template.description}
            </p>
            {template.reasons.length > 0 && (
              <div style={{ fontSize: '0.75rem', color: t.grayLight }}>
                {template.reasons.length} pre-configured reasons
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <button
          onClick={onBack}
          style={{
            padding: '12px 24px',
            borderRadius: '8px',
            background: 'transparent',
            color: t.gray,
            border: `1px solid ${t.border}`,
            cursor: 'pointer',
            fontWeight: 500,
            fontSize: '0.9rem',
            fontFamily: t.fontSans
          }}
        >
          ← Back
        </button>
        <button
          onClick={handleNext}
          style={{
            padding: '12px 32px',
            borderRadius: '8px',
            background: t.accent,
            color: t.white,
            border: 'none',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.9rem',
            fontFamily: t.fontSans
          }}
        >
          Continue →
        </button>
      </div>
    </div>
  )
}

function Step3({ formData, onNext, onBack }) {
  const [project, setProject] = useState(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    // Create the project when we reach step 3
    if (!project) {
      const newProject = createProject(formData.projectName)
      
      // Save the selected flow template
      if (formData.customReasons?.length > 0) {
        saveCancelFlow(newProject.id, formData.customReasons)
      }
      
      setProject(newProject)
    }
  }, [formData, project])

  const handleCopy = () => {
    if (!project) return
    const code = `<script
  src="https://churnrecovery.com/widget.js"
  data-project="${project.id}"
  data-api-key="${project.api_key}"
  async
></script>`
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!project) {
    return (
      <div style={{ textAlign: 'center', padding: '60px' }}>
        <div style={{ fontSize: '0.9rem', color: t.gray }}>Creating your project...</div>
      </div>
    )
  }

  return (
    <div>
      <h2 style={{ fontFamily: t.fontSans, fontSize: '1.5rem', fontWeight: 700, color: t.text, margin: '0 0 8px' }}>
        Install the Widget
      </h2>
      <p style={{ fontFamily: t.fontSerif, fontSize: '0.9rem', color: t.gray, margin: '0 0 32px', lineHeight: 1.7 }}>
        Add this code snippet to your website to enable the cancel flow. Place it before the closing <code>&lt;/body&gt;</code> tag.
      </p>

      <div style={{ marginBottom: '32px' }}>
        <div style={{
          background: t.codeBg,
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.05)'
        }}>
          <div style={{
            background: '#181825',
            padding: '12px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <span style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#6C7086' }}>
              HTML
            </span>
            <button
              onClick={handleCopy}
              style={{
                fontSize: '0.75rem',
                fontFamily: t.fontSans,
                color: copied ? t.green : '#6C7086',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              {copied ? '✓ Copied' : '📋 Copy'}
            </button>
          </div>
          <pre style={{
            background: t.codeBg,
            padding: '20px',
            margin: 0,
            overflowX: 'auto',
            fontSize: '0.85rem',
            lineHeight: 1.6,
            fontFamily: '"SF Mono", "Fira Code", monospace',
            color: t.codeText
          }}>
            <code>{`<script
  src="https://churnrecovery.com/widget.js"
  data-project="${project.id}"
  data-api-key="${project.api_key}"
  async
></script>`}</code>
          </pre>
        </div>
      </div>

      <div style={{
        background: t.blueLight,
        border: `1px solid ${t.blue}`,
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '32px'
      }}>
        <div style={{ fontSize: '0.85rem', color: t.blue, fontWeight: 600, marginBottom: '4px' }}>
          💡 Quick Setup Guide
        </div>
        <ul style={{ fontSize: '0.8rem', color: t.blue, margin: '0', paddingLeft: '16px', lineHeight: 1.6 }}>
          <li>Add the script tag to your website's HTML</li>
          <li>Call <code>ChurnRecovery.showCancelFlow()</code> when users click cancel</li>
          <li>Test the flow and check analytics in your dashboard</li>
        </ul>
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <button
          onClick={onBack}
          style={{
            padding: '12px 24px',
            borderRadius: '8px',
            background: 'transparent',
            color: t.gray,
            border: `1px solid ${t.border}`,
            cursor: 'pointer',
            fontWeight: 500,
            fontSize: '0.9rem',
            fontFamily: t.fontSans
          }}
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          style={{
            padding: '12px 32px',
            borderRadius: '8px',
            background: t.accent,
            color: t.white,
            border: 'none',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.9rem',
            fontFamily: t.fontSans
          }}
        >
          Continue →
        </button>
      </div>
    </div>
  )
}

function Step4({ formData, onFinish, onBack }) {
  const router = useRouter()

  const handleSkip = () => {
    router.push('/app/dashboard')
  }

  const handleConnectStripe = () => {
    router.push('/app/connect-stripe')
  }

  return (
    <div>
      <h2 style={{ fontFamily: t.fontSans, fontSize: '1.5rem', fontWeight: 700, color: t.text, margin: '0 0 8px' }}>
        Connect Stripe (Optional)
      </h2>
      <p style={{ fontFamily: t.fontSerif, fontSize: '0.9rem', color: t.gray, margin: '0 0 32px', lineHeight: 1.7 }}>
        Connect your Stripe account to automatically apply discounts and pause subscriptions when users accept your offers.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px' }}>
        <div style={{
          background: t.white,
          border: `1px solid ${t.border}`,
          borderRadius: '12px',
          padding: '24px'
        }}>
          <h3 style={{ fontFamily: t.fontSans, fontSize: '1rem', fontWeight: 700, color: t.text, margin: '0 0 12px' }}>
            With Stripe
          </h3>
          <ul style={{ fontSize: '0.85rem', color: t.gray, margin: '0', paddingLeft: '16px', lineHeight: 1.6 }}>
            <li>Automatic discount application</li>
            <li>Subscription pause/resume</li>
            <li>Revenue tracking</li>
            <li>Failed payment recovery</li>
          </ul>
        </div>

        <div style={{
          background: t.white,
          border: `1px solid ${t.border}`,
          borderRadius: '12px',
          padding: '24px'
        }}>
          <h3 style={{ fontFamily: t.fontSans, fontSize: '1rem', fontWeight: 700, color: t.text, margin: '0 0 12px' }}>
            Without Stripe
          </h3>
          <ul style={{ fontSize: '0.85rem', color: t.gray, margin: '0', paddingLeft: '16px', lineHeight: 1.6 }}>
            <li>Collect cancel reasons</li>
            <li>Show retention offers</li>
            <li>Track user responses</li>
            <li>Manual offer fulfillment</li>
          </ul>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <button
          onClick={onBack}
          style={{
            padding: '12px 24px',
            borderRadius: '8px',
            background: 'transparent',
            color: t.gray,
            border: `1px solid ${t.border}`,
            cursor: 'pointer',
            fontWeight: 500,
            fontSize: '0.9rem',
            fontFamily: t.fontSans
          }}
        >
          ← Back
        </button>
        <button
          onClick={handleSkip}
          style={{
            padding: '12px 24px',
            borderRadius: '8px',
            background: 'transparent',
            color: t.gray,
            border: `1px solid ${t.border}`,
            cursor: 'pointer',
            fontWeight: 500,
            fontSize: '0.9rem',
            fontFamily: t.fontSans
          }}
        >
          Skip for Now
        </button>
        <button
          onClick={handleConnectStripe}
          style={{
            padding: '12px 32px',
            borderRadius: '8px',
            background: t.accent,
            color: t.white,
            border: 'none',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.9rem',
            fontFamily: t.fontSans
          }}
        >
          Connect Stripe →
        </button>
      </div>
    </div>
  )
}

export default function OnboardingPage() {
  const { user, isLoaded } = useAuthUser()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({})

  const updateFormData = (updates) => {
    setFormData(prev => ({ ...prev, ...updates }))
  }

  const nextStep = () => {
    setCurrentStep(prev => prev + 1)
  }

  const prevStep = () => {
    setCurrentStep(prev => prev - 1)
  }

  return (
    <>
      <Head>
        <title>Onboarding — ChurnRecovery</title>
      </Head>
      <AppLayout>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <StepIndicator currentStep={currentStep} totalSteps={4} />
          
          {currentStep === 1 && (
            <Step1
              formData={formData}
              onNext={nextStep}
              onUpdate={updateFormData}
            />
          )}
          
          {currentStep === 2 && (
            <Step2
              formData={formData}
              onNext={nextStep}
              onBack={prevStep}
              onUpdate={updateFormData}
            />
          )}
          
          {currentStep === 3 && (
            <Step3
              formData={formData}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          
          {currentStep === 4 && (
            <Step4
              formData={formData}
              onBack={prevStep}
            />
          )}
        </div>
      </AppLayout>
    </>
  )
}

OnboardingPage.isAppPage = true