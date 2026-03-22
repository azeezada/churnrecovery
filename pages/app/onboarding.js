import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import AppLayout from '../../components/AppLayout'
import { useAuthUser } from '../../lib/useAuthUser'
import { createProject, getCancelFlow, saveCancelFlow } from '../../lib/localStore'
import { apiFetch } from '../../lib/useApi'

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
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: totalSteps }, (_, i) => {
        const stepNum = i + 1
        const isActive = stepNum === currentStep
        const isCompleted = stepNum < currentStep

        return (
          <div key={stepNum} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-[0.85rem] font-semibold ${
                isCompleted ? 'bg-brand-green text-brand-white'
                : isActive ? 'bg-brand-accent text-brand-white'
                : 'bg-brand-border text-brand-gray'
              }`}
            >
              {isCompleted ? '✓' : stepNum}
            </div>
            {i < totalSteps - 1 && (
              <div className={`w-6 h-[2px] ml-2 ${isCompleted ? 'bg-brand-green' : 'bg-brand-border'}`} />
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
      <h2 className="font-sans text-[1.5rem] font-bold text-brand-text m-0 mb-2">
        Create Your Project
      </h2>
      <p className="font-serif text-[0.9rem] text-brand-gray m-0 mb-8 leading-[1.7]">
        Let's start by setting up your project. This will help us organize your cancel flows and analytics.
      </p>

      <form onSubmit={handleSubmit} className="max-w-[500px]">
        <div className="mb-6">
          <label className="block text-[0.85rem] font-semibold text-brand-text mb-2 font-sans">
            Project Name
          </label>
          <input
            type="text"
            value={formData.projectName || ''}
            onChange={e => onUpdate({ projectName: e.target.value })}
            placeholder="e.g. My SaaS App, E-commerce Store"
            className={`w-full px-4 py-3 rounded-lg border font-sans text-[0.9rem] text-brand-text outline-none box-border ${
              errors.projectName ? 'border-brand-accent' : 'border-brand-border'
            }`}
          />
          {errors.projectName && (
            <div className="text-[0.8rem] text-brand-accent mt-1">
              {errors.projectName}
            </div>
          )}
        </div>

        <div className="mb-8">
          <label className="block text-[0.85rem] font-semibold text-brand-text mb-2 font-sans">
            Website URL
          </label>
          <input
            type="url"
            value={formData.websiteUrl || ''}
            onChange={e => onUpdate({ websiteUrl: e.target.value })}
            placeholder="https://myapp.com"
            className={`w-full px-4 py-3 rounded-lg border font-sans text-[0.9rem] text-brand-text outline-none box-border ${
              errors.websiteUrl ? 'border-brand-accent' : 'border-brand-border'
            }`}
          />
          {errors.websiteUrl && (
            <div className="text-[0.8rem] text-brand-accent mt-1">
              {errors.websiteUrl}
            </div>
          )}
          <div className="text-[0.8rem] text-brand-gray-light mt-1">
            This is where you'll install the ChurnRecovery widget
          </div>
        </div>

        <button
          type="submit"
          className="px-8 py-3 rounded-lg bg-brand-accent text-brand-white border-none cursor-pointer font-semibold text-[0.9rem] font-sans"
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
      <h2 className="font-sans text-[1.5rem] font-bold text-brand-text m-0 mb-2">
        Choose Your Cancel Flow
      </h2>
      <p className="font-serif text-[0.9rem] text-brand-gray m-0 mb-8 leading-[1.7]">
        Pick a template that matches your business type, or build a custom flow from scratch.
      </p>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4 mb-8">
        {FLOW_TEMPLATES.map(template => (
          <div
            key={template.id}
            onClick={() => setSelectedTemplate(template.id)}
            className={`p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
              selectedTemplate === template.id
                ? 'border-brand-accent bg-[#FDF4EF]'
                : 'border-brand-border bg-brand-white'
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[2rem]">{template.icon}</span>
              <h3 className="font-sans text-[1.1rem] font-bold text-brand-text m-0">
                {template.name}
              </h3>
            </div>
            <p className="text-[0.85rem] text-brand-gray m-0 mb-3 leading-[1.6]">
              {template.description}
            </p>
            {template.reasons.length > 0 && (
              <div className="text-[0.75rem] text-brand-gray-light">
                {template.reasons.length} pre-configured reasons
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-lg bg-transparent text-brand-gray border border-brand-border cursor-pointer font-medium text-[0.9rem] font-sans"
        >
          ← Back
        </button>
        <button
          onClick={handleNext}
          className="px-8 py-3 rounded-lg bg-brand-accent text-brand-white border-none cursor-pointer font-semibold text-[0.9rem] font-sans"
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
      async function createAndSave() {
        let newProject = null
        try {
          newProject = await apiFetch('/api/projects', {
            method: 'POST',
            body: { name: formData.projectName, url: formData.websiteUrl },
          })
          // Save the selected flow template via API
          if (formData.customReasons?.length > 0) {
            try {
              await apiFetch('/api/cancel-flow', {
                method: 'POST',
                body: { projectId: newProject.id, reasons: formData.customReasons },
              })
            } catch {
              saveCancelFlow(newProject.id, formData.customReasons)
            }
          }
        } catch {
          // Fall back to localStore
          newProject = createProject(formData.projectName)
          if (formData.customReasons?.length > 0) {
            saveCancelFlow(newProject.id, formData.customReasons)
          }
        }
        setProject(newProject)
      }
      createAndSave()
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
      <div className="text-center p-[60px]">
        <div className="text-[0.9rem] text-brand-gray">Creating your project...</div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="font-sans text-[1.5rem] font-bold text-brand-text m-0 mb-2">
        Install the Widget
      </h2>
      <p className="font-serif text-[0.9rem] text-brand-gray m-0 mb-8 leading-[1.7]">
        Add this code snippet to your website to enable the cancel flow. Place it before the closing <code>&lt;/body&gt;</code> tag.
      </p>

      <div className="mb-8">
        <div className="bg-[#1E1E2E] rounded-xl overflow-hidden border border-white/5">
          <div className="bg-[#181825] px-5 py-3 flex items-center justify-between">
            <span className="font-mono text-[0.8rem] text-[#6C7086]">
              HTML
            </span>
            <button
              onClick={handleCopy}
              className={`text-[0.75rem] font-sans bg-transparent border-none cursor-pointer ${
                copied ? 'text-brand-green' : 'text-[#6C7086]'
              }`}
            >
              {copied ? '✓ Copied' : '📋 Copy'}
            </button>
          </div>
          <pre className="bg-[#1E1E2E] p-5 m-0 overflow-x-auto text-[0.85rem] leading-[1.6] font-[&quot;SF_Mono&quot;,&quot;Fira_Code&quot;,monospace] text-[#CDD6F4]">
            <code>{`<script
  src="https://churnrecovery.com/widget.js"
  data-project="${project.id}"
  data-api-key="${project.api_key}"
  async
></script>`}</code>
          </pre>
        </div>
      </div>

      <div className="bg-brand-blue-light border border-brand-blue rounded-lg p-4 mb-8">
        <div className="text-[0.85rem] text-brand-blue font-semibold mb-1">
          💡 Quick Setup Guide
        </div>
        <ul className="text-[0.8rem] text-brand-blue m-0 pl-4 leading-[1.6]">
          <li>Add the script tag to your website's HTML</li>
          <li>Call <code>ChurnRecovery.showCancelFlow()</code> when users click cancel</li>
          <li>Test the flow and check analytics in your dashboard</li>
        </ul>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-lg bg-transparent text-brand-gray border border-brand-border cursor-pointer font-medium text-[0.9rem] font-sans"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          className="px-8 py-3 rounded-lg bg-brand-accent text-brand-white border-none cursor-pointer font-semibold text-[0.9rem] font-sans"
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
      <h2 className="font-sans text-[1.5rem] font-bold text-brand-text m-0 mb-2">
        Connect Stripe (Optional)
      </h2>
      <p className="font-serif text-[0.9rem] text-brand-gray m-0 mb-8 leading-[1.7]">
        Connect your Stripe account to automatically apply discounts and pause subscriptions when users accept your offers.
      </p>

      <div className="grid grid-cols-2 gap-5 mb-8">
        <div className="bg-brand-white border border-brand-border rounded-xl p-6">
          <h3 className="font-sans text-[1rem] font-bold text-brand-text m-0 mb-3">
            With Stripe
          </h3>
          <ul className="text-[0.85rem] text-brand-gray m-0 pl-4 leading-[1.6]">
            <li>Automatic discount application</li>
            <li>Subscription pause/resume</li>
            <li>Revenue tracking</li>
            <li>Failed payment recovery</li>
          </ul>
        </div>

        <div className="bg-brand-white border border-brand-border rounded-xl p-6">
          <h3 className="font-sans text-[1rem] font-bold text-brand-text m-0 mb-3">
            Without Stripe
          </h3>
          <ul className="text-[0.85rem] text-brand-gray m-0 pl-4 leading-[1.6]">
            <li>Collect cancel reasons</li>
            <li>Show retention offers</li>
            <li>Track user responses</li>
            <li>Manual offer fulfillment</li>
          </ul>
        </div>
      </div>

      <div className="flex gap-3 justify-center">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-lg bg-transparent text-brand-gray border border-brand-border cursor-pointer font-medium text-[0.9rem] font-sans"
        >
          ← Back
        </button>
        <button
          onClick={handleSkip}
          className="px-6 py-3 rounded-lg bg-transparent text-brand-gray border border-brand-border cursor-pointer font-medium text-[0.9rem] font-sans"
        >
          Skip for Now
        </button>
        <button
          onClick={handleConnectStripe}
          className="px-8 py-3 rounded-lg bg-brand-accent text-brand-white border-none cursor-pointer font-semibold text-[0.9rem] font-sans"
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
        <div className="max-w-[800px] mx-auto">
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
