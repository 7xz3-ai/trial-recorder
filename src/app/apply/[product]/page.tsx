'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { CheckCircle, AlertCircle, ChevronRight } from 'lucide-react'
import { submitApplication } from '@/lib/demo-submissions'

const PRODUCT_INFO: Record<string, { title: string; type: string; description: string }> = {
  'current-account': { title: 'Current Account', type: 'Current Account', description: 'Apply for a Barclays Current Account — takes about 10 minutes.' },
  'premier-account': { title: 'Premier Current Account', type: 'Premier Account', description: 'Apply for the Barclays Premier Current Account.' },
  'student-account': { title: 'Student Additions Account', type: 'Student Account', description: 'Apply for a Barclays Student Account.' },
  'basic-account': { title: 'Basic Current Account', type: 'Basic Account', description: 'Apply for a Barclays Basic Account.' },
  'rewards-card': { title: 'Barclaycard Rewards', type: 'Credit Card', description: 'Apply for the Barclaycard Rewards credit card.' },
  'balance-transfer': { title: 'Balance Transfer Card', type: 'Credit Card', description: 'Apply for the Barclaycard Balance Transfer card.' },
  'purchase-card': { title: '0% Purchase Card', type: 'Credit Card', description: 'Apply for the Barclaycard 0% Purchase card.' },
  'personal-loan': { title: 'Personal Loan', type: 'Personal Loan', description: 'Apply for a Barclays Personal Loan.' },
  'car-finance': { title: 'Car Finance', type: 'Car Finance', description: 'Apply for Barclays Car Finance.' },
  'debt-consolidation': { title: 'Debt Consolidation Loan', type: 'Debt Consolidation', description: 'Apply for a Barclays Debt Consolidation Loan.' },
  'instant-savings': { title: 'Instant Access Savings', type: 'Savings Account', description: 'Open an Instant Access Savings Account.' },
  'fixed-bond': { title: '1-Year Fixed Rate Bond', type: 'Fixed Rate Bond', description: 'Open a 1-Year Fixed Rate Bond.' },
  'cash-isa': { title: 'Cash ISA', type: 'Cash ISA', description: 'Open a Barclays Cash ISA.' },
  'business-account': { title: 'Business Current Account', type: 'Business Account', description: 'Apply for a Barclays Business Current Account.' },
  'mortgage-first-time': { title: 'First-Time Buyer Mortgage', type: 'Mortgage', description: 'Apply for a First-Time Buyer Mortgage.' },
  'remortgage': { title: 'Remortgage', type: 'Mortgage', description: 'Apply to remortgage with Barclays.' },
}

export default function ApplyPage() {
  const { product } = useParams()
  const info = PRODUCT_INFO[product as string] ?? { title: 'Product Application', type: 'Product', description: 'Apply for this Barclays product.' }

  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    dateOfBirth: '', annualIncome: '', address: '', postcode: '', employed: 'employed',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    await new Promise(r => setTimeout(r, 1200))
    try {
      submitApplication({ productType: info.type, firstName: form.firstName, lastName: form.lastName, email: form.email, phone: form.phone, dateOfBirth: form.dateOfBirth, annualIncome: form.annualIncome })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-barclays-gray-light flex items-center justify-center py-12 px-4">
        <div className="max-w-lg w-full bg-white rounded-2xl shadow-sm border border-gray-200 p-10 text-center">
          <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-barclays-blue mb-2">Application submitted!</h1>
          <p className="text-gray-600 mb-2">Thank you for applying for the <strong>{info.title}</strong>.</p>
          <p className="text-gray-500 text-sm mb-6">We&apos;ll review your application and contact you within 2–3 business days. Your reference number is <strong className="text-barclays-blue">BRC-{Math.random().toString(36).substring(2, 8).toUpperCase()}</strong>.</p>
          <div className="flex gap-3 justify-center">
            <Link href="/" className="barclays-btn-secondary text-sm">Return home</Link>
            <Link href="/auth/login" className="barclays-btn-primary text-sm">Sign in to track application</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-barclays-gray-light py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6 flex items-center gap-1">
          <Link href="/" className="hover:text-barclays-blue">Home</Link>
          <ChevronRight size={14} />
          <span className="text-barclays-blue font-medium">Apply: {info.title}</span>
        </nav>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {['Your details', 'Employment', 'Review'].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step > i + 1 ? 'bg-green-500 text-white' : step === i + 1 ? 'bg-barclays-teal text-white' : 'bg-gray-200 text-gray-500'}`}>
                {step > i + 1 ? '✓' : i + 1}
              </div>
              <span className={`text-xs ${step === i + 1 ? 'text-barclays-blue font-medium' : 'text-gray-400'}`}>{s}</span>
              {i < 2 && <div className="flex-1 h-px bg-gray-200 w-8" />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-barclays-blue text-white px-6 py-4">
            <h1 className="font-bold text-lg">{info.title}</h1>
            <p className="text-blue-200 text-sm">{info.description}</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {status === 'error' && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
                <AlertCircle size={16} /> Something went wrong. Please try again.
              </div>
            )}

            {/* Step 1 */}
            {step === 1 && (
              <>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">First name <span className="text-red-500">*</span></label>
                    <input type="text" required value={form.firstName} onChange={e => update('firstName', e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-barclays-teal focus:ring-1 focus:ring-barclays-teal" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Last name <span className="text-red-500">*</span></label>
                    <input type="text" required value={form.lastName} onChange={e => update('lastName', e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-barclays-teal focus:ring-1 focus:ring-barclays-teal" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Date of birth <span className="text-red-500">*</span></label>
                  <input type="date" required value={form.dateOfBirth} onChange={e => update('dateOfBirth', e.target.value)}
                    max={new Date(Date.now() - 18 * 365.25 * 24 * 3600 * 1000).toISOString().split('T')[0]}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-barclays-teal focus:ring-1 focus:ring-barclays-teal" />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address <span className="text-red-500">*</span></label>
                    <input type="email" required value={form.email} onChange={e => update('email', e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-barclays-teal focus:ring-1 focus:ring-barclays-teal" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone number <span className="text-red-500">*</span></label>
                    <input type="tel" required value={form.phone} onChange={e => update('phone', e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-barclays-teal focus:ring-1 focus:ring-barclays-teal" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Address <span className="text-red-500">*</span></label>
                    <input type="text" required value={form.address} onChange={e => update('address', e.target.value)} placeholder="123 High Street"
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-barclays-teal focus:ring-1 focus:ring-barclays-teal" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Postcode <span className="text-red-500">*</span></label>
                    <input type="text" required value={form.postcode} onChange={e => update('postcode', e.target.value)} placeholder="SW1A 1AA"
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-barclays-teal focus:ring-1 focus:ring-barclays-teal" />
                  </div>
                </div>
                <button type="button" onClick={() => setStep(2)} className="barclays-btn-primary text-sm">
                  Continue
                </button>
              </>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Employment status <span className="text-red-500">*</span></label>
                  <select value={form.employed} onChange={e => update('employed', e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-barclays-teal bg-white">
                    <option value="employed">Employed</option>
                    <option value="self-employed">Self-employed</option>
                    <option value="retired">Retired</option>
                    <option value="student">Student</option>
                    <option value="not-employed">Not currently employed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Annual income (before tax) <span className="text-red-500">*</span></label>
                  <select required value={form.annualIncome} onChange={e => update('annualIncome', e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-barclays-teal bg-white">
                    <option value="">Select income range</option>
                    <option value="under-15k">Under £15,000</option>
                    <option value="15k-25k">£15,000 – £25,000</option>
                    <option value="25k-40k">£25,000 – £40,000</option>
                    <option value="40k-60k">£40,000 – £60,000</option>
                    <option value="60k-100k">£60,000 – £100,000</option>
                    <option value="100k-plus">Over £100,000</option>
                  </select>
                </div>
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-xs text-gray-600">
                  <strong>Credit check notice:</strong> Submitting this application will result in a soft credit search. This will not affect your credit score. If you proceed to the final stage, a hard credit search may be conducted.
                </div>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(1)} className="barclays-btn-secondary text-sm">Back</button>
                  <button type="button" onClick={() => setStep(3)} disabled={!form.annualIncome} className="barclays-btn-primary text-sm disabled:opacity-60">Continue</button>
                </div>
              </>
            )}

            {/* Step 3 - Review */}
            {step === 3 && (
              <>
                <h3 className="font-bold text-barclays-blue">Review your application</h3>
                <div className="bg-barclays-gray-light rounded-lg p-4 space-y-2 text-sm">
                  {[
                    ['Product', info.title],
                    ['Name', `${form.firstName} ${form.lastName}`],
                    ['Date of birth', form.dateOfBirth],
                    ['Email', form.email],
                    ['Phone', form.phone],
                    ['Address', `${form.address}, ${form.postcode}`],
                    ['Employment', form.employed],
                    ['Annual income', form.annualIncome],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between">
                      <span className="text-gray-500">{k}</span>
                      <span className="font-medium text-gray-800">{v}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-start gap-2">
                  <input type="checkbox" required className="mt-1 accent-barclays-teal" />
                  <label className="text-xs text-gray-600">
                    I confirm the information I have provided is accurate and I agree to the <span className="text-barclays-teal cursor-pointer hover:underline">Terms & Conditions</span>.
                  </label>
                </div>

                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(2)} className="barclays-btn-secondary text-sm">Back</button>
                  <button type="submit" disabled={status === 'loading'} className="barclays-btn-primary text-sm disabled:opacity-60">
                    {status === 'loading' ? 'Submitting...' : 'Submit application'}
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
