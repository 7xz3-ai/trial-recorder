'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Cookie, X } from 'lucide-react'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const [showManage, setShowManage] = useState(false)
  const [prefs, setPrefs] = useState({ essential: true, analytics: true, marketing: false, functional: true })

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent')
    if (!consent) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem('cookie_consent', JSON.stringify({ ...prefs, analytics: true, marketing: true, functional: true }))
    setVisible(false)
  }

  const reject = () => {
    localStorage.setItem('cookie_consent', JSON.stringify({ essential: true, analytics: false, marketing: false, functional: false }))
    setVisible(false)
  }

  const savePrefs = () => {
    localStorage.setItem('cookie_consent', JSON.stringify(prefs))
    setVisible(false)
    setShowManage(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-white border-t-2 border-barclays-teal shadow-2xl">
      {!showManage ? (
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row items-start md:items-center gap-4">
          <Cookie className="text-barclays-teal w-8 h-8 flex-shrink-0 hidden md:block" />
          <div className="flex-1">
            <h3 className="font-bold text-barclays-blue text-sm mb-1">We use cookies</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              We use cookies and similar technologies to provide the best experience on our website. This includes essential cookies for site functionality,
              analytics cookies to understand how you use our site, and marketing cookies for personalised content.
              See our <Link href="#" className="text-barclays-teal hover:underline">Cookie Policy</Link> for more details.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 flex-shrink-0">
            <button onClick={accept} className="bg-barclays-teal text-white text-sm font-semibold px-5 py-2 rounded hover:bg-barclays-teal-dark transition-colors">
              Accept all
            </button>
            <button onClick={reject} className="bg-gray-200 text-gray-700 text-sm font-semibold px-5 py-2 rounded hover:bg-gray-300 transition-colors">
              Reject all
            </button>
            <button onClick={() => setShowManage(true)} className="text-barclays-teal text-sm font-semibold px-5 py-2 rounded border border-barclays-teal hover:bg-blue-50 transition-colors">
              Manage cookies
            </button>
          </div>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-barclays-blue">Manage cookie preferences</h3>
            <button onClick={() => setShowManage(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
          </div>
          <div className="space-y-3 mb-6">
            {[
              { key: 'essential', label: 'Essential cookies', desc: 'Required for the website to function. Cannot be disabled.', locked: true },
              { key: 'functional', label: 'Functional cookies', desc: 'Enable enhanced functionality and personalisation.', locked: false },
              { key: 'analytics', label: 'Analytics cookies', desc: 'Help us understand how visitors interact with our website.', locked: false },
              { key: 'marketing', label: 'Marketing cookies', desc: 'Used to deliver relevant advertisements and track campaigns.', locked: false },
            ].map(c => (
              <div key={c.key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-800">{c.label}</p>
                  <p className="text-xs text-gray-500">{c.desc}</p>
                </div>
                <button
                  onClick={() => !c.locked && setPrefs(p => ({ ...p, [c.key]: !p[c.key as keyof typeof p] }))}
                  className={`w-11 h-6 rounded-full flex items-center px-1 transition-colors ${
                    prefs[c.key as keyof typeof prefs]
                      ? 'bg-barclays-teal justify-end'
                      : 'bg-gray-200 justify-start'
                  } ${c.locked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="w-4 h-4 bg-white rounded-full shadow" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={savePrefs} className="bg-barclays-teal text-white text-sm font-semibold px-6 py-2 rounded hover:bg-barclays-teal-dark transition-colors">
              Save preferences
            </button>
            <button onClick={accept} className="text-barclays-teal text-sm font-semibold px-6 py-2 rounded border border-barclays-teal hover:bg-blue-50 transition-colors">
              Accept all
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
