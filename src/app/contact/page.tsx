'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import { submitEnquiry } from '@/lib/demo-submissions'

const subjects = [
  'General enquiry',
  'Account opening',
  'Mortgage enquiry',
  'Credit card',
  'Personal loan',
  'Business banking',
  'Fraud or security concern',
  'Complaint',
  'Other',
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    await new Promise(r => setTimeout(r, 900))
    try {
      submitEnquiry(form)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div>
      {/* Hero */}
      <div className="bg-barclays-blue text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-3">Contact us</h1>
          <p className="text-blue-200 text-lg">We&apos;re here to help. Reach us by phone, online or in branch.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Contact info */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-barclays-blue">Get in touch</h2>

            {[
              {
                icon: Phone,
                title: 'Call us',
                lines: ['Personal banking: 0345 734 5345', 'Business banking: 0345 605 2345', 'From abroad: +44 24 7684 2100'],
              },
              {
                icon: Clock,
                title: 'Opening hours',
                lines: ['Monday–Friday: 8am–8pm', 'Saturday: 9am–5pm', 'Sunday: 10am–4pm'],
              },
              {
                icon: MapPin,
                title: 'Find a branch',
                lines: ['Over 800 branches across the UK.', 'Use our branch finder to locate your nearest.'],
              },
              {
                icon: Mail,
                title: 'Secure message',
                lines: ['Log in to send a secure message through Online Banking.'],
              },
            ].map(item => (
              <div key={item.title} className="flex gap-4">
                <div className="w-10 h-10 bg-barclays-gray-light rounded-full flex items-center justify-center flex-shrink-0">
                  <item.icon size={18} className="text-barclays-teal" />
                </div>
                <div>
                  <p className="font-semibold text-barclays-blue mb-1">{item.title}</p>
                  {item.lines.map(l => <p key={l} className="text-sm text-gray-600">{l}</p>)}
                </div>
              </div>
            ))}
          </div>

          {/* Enquiry form */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-barclays-blue mb-6">Send an enquiry</h2>

            {status === 'success' ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                <CheckCircle className="text-green-500 w-12 h-12 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-green-800 mb-2">Enquiry received</h3>
                <p className="text-green-700 text-sm">Thank you for contacting us. We aim to respond within 2 business days.</p>
                <button onClick={() => { setStatus('idle'); setForm({ name: '', email: '', phone: '', subject: '', message: '' }) }} className="barclays-btn-primary mt-6 text-sm">
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-8 space-y-5 shadow-sm">
                {status === 'error' && (
                  <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
                    <AlertCircle size={16} /> Something went wrong. Please try again.
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Full name <span className="text-red-500">*</span></label>
                    <input type="text" required value={form.name} onChange={e => update('name', e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-barclays-teal focus:ring-1 focus:ring-barclays-teal" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address <span className="text-red-500">*</span></label>
                    <input type="email" required value={form.email} onChange={e => update('email', e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-barclays-teal focus:ring-1 focus:ring-barclays-teal" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone number</label>
                    <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-barclays-teal focus:ring-1 focus:ring-barclays-teal" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject <span className="text-red-500">*</span></label>
                    <select required value={form.subject} onChange={e => update('subject', e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-barclays-teal focus:ring-1 focus:ring-barclays-teal bg-white">
                      <option value="">Select a subject</option>
                      {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Message <span className="text-red-500">*</span></label>
                  <textarea required rows={5} value={form.message} onChange={e => update('message', e.target.value)}
                    placeholder="How can we help you?"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-barclays-teal focus:ring-1 focus:ring-barclays-teal resize-none" />
                </div>

                <div className="flex items-start gap-2">
                  <input type="checkbox" required className="mt-1 accent-barclays-teal" />
                  <label className="text-xs text-gray-600">
                    I consent to Barclays processing my data to handle this enquiry in accordance with the <span className="text-barclays-teal cursor-pointer hover:underline">Privacy Policy</span>.
                  </label>
                </div>

                <button type="submit" disabled={status === 'loading'}
                  className="barclays-btn-primary text-sm px-8 disabled:opacity-60 disabled:cursor-not-allowed">
                  {status === 'loading' ? 'Sending...' : 'Submit enquiry'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
