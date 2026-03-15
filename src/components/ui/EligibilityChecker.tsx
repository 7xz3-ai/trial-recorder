'use client'

import { useState } from 'react'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'

interface Props {
  productName: string
  criteria: { label: string; description: string }[]
}

export default function EligibilityChecker({ productName, criteria }: Props) {
  const [answers, setAnswers] = useState<Record<number, boolean | null>>({})
  const [checking, setChecking] = useState(false)
  const [result, setResult] = useState<'eligible' | 'not-eligible' | null>(null)

  const toggle = (idx: number, val: boolean) => {
    setAnswers(prev => ({ ...prev, [idx]: val }))
    setResult(null)
  }

  const allAnswered = criteria.every((_, i) => answers[i] !== undefined && answers[i] !== null)

  const checkEligibility = () => {
    setChecking(true)
    setTimeout(() => {
      const allYes = criteria.every((_, i) => answers[i] === true)
      setResult(allYes ? 'eligible' : 'not-eligible')
      setChecking(false)
    }, 1500)
  }

  return (
    <div className="bg-barclays-gray-light rounded-xl p-6 md:p-8">
      <h3 className="text-xl font-bold text-barclays-blue mb-2">Check your eligibility</h3>
      <p className="text-gray-600 text-sm mb-6">Answer a few quick questions to see if you&apos;re likely to be approved for {productName}. This won&apos;t affect your credit score.</p>

      <div className="space-y-4 mb-6">
        {criteria.map((c, i) => (
          <div key={i} className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="font-medium text-barclays-blue text-sm mb-1">{c.label}</p>
            <p className="text-gray-500 text-xs mb-3">{c.description}</p>
            <div className="flex gap-3">
              <button
                onClick={() => toggle(i, true)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  answers[i] === true
                    ? 'bg-green-100 text-green-700 border-2 border-green-400'
                    : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200'
                }`}
              >
                Yes
              </button>
              <button
                onClick={() => toggle(i, false)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  answers[i] === false
                    ? 'bg-red-100 text-red-700 border-2 border-red-400'
                    : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200'
                }`}
              >
                No
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={checkEligibility}
        disabled={!allAnswered || checking}
        className="barclays-btn-primary text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        {checking && <Loader2 size={16} className="animate-spin" />}
        {checking ? 'Checking...' : 'Check eligibility'}
      </button>

      {result && (
        <div className={`mt-4 p-4 rounded-lg flex items-start gap-3 ${
          result === 'eligible' ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'
        }`}>
          {result === 'eligible' ? (
            <>
              <CheckCircle className="text-green-600 w-5 h-5 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-bold text-green-800 text-sm">You&apos;re likely eligible!</p>
                <p className="text-green-700 text-xs mt-1">Based on your answers, you&apos;re likely to be approved. This is an indicative result — the final decision is subject to a full application and credit check.</p>
              </div>
            </>
          ) : (
            <>
              <XCircle className="text-amber-600 w-5 h-5 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-bold text-amber-800 text-sm">You may not be eligible right now</p>
                <p className="text-amber-700 text-xs mt-1">Based on your answers, you may not meet all the criteria. You can still apply — this is just an indicative check. Contact us on 0345 734 5345 for more options.</p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
