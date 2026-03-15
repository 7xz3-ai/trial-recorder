'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react'
import { setDemoUser } from '@/lib/demo-auth'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirm: '' })
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return }
    if (form.password.length < 8) { setError('Password must be at least 8 characters.'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setDemoUser({ id: Date.now().toString(), email: form.email, name: `${form.firstName} ${form.lastName}`, accountType: 'personal' })
    setSuccess(true)
    setTimeout(() => router.push('/dashboard'), 1500)
    setLoading(false)
  }

  if (success) {
    return (
      <div className="min-h-screen bg-barclays-gray-light flex items-center justify-center">
        <div className="bg-white rounded-xl p-10 text-center shadow-sm max-w-sm w-full">
          <CheckCircle className="text-green-500 w-14 h-14 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-barclays-blue mb-2">Registration successful!</h2>
          <p className="text-gray-500 text-sm">Redirecting you to your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-barclays-gray-light flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex justify-center mb-4">
            <Image src="/barclays-logo.svg" alt="Barclays" width={200} height={48} />
          </Link>
          <h1 className="text-2xl font-bold text-barclays-blue">Register for Online Banking</h1>
          <p className="text-gray-500 text-sm mt-1">Create your account in minutes</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
                <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">First name</label>
                <input type="text" required value={form.firstName} onChange={e => update('firstName', e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-barclays-teal focus:ring-1 focus:ring-barclays-teal" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Last name</label>
                <input type="text" required value={form.lastName} onChange={e => update('lastName', e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-barclays-teal focus:ring-1 focus:ring-barclays-teal" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
              <input type="email" required value={form.email} onChange={e => update('email', e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-barclays-teal focus:ring-1 focus:ring-barclays-teal" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} required value={form.password} onChange={e => update('password', e.target.value)}
                  className="w-full px-3 py-2.5 pr-10 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-barclays-teal focus:ring-1 focus:ring-barclays-teal" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-1">Minimum 8 characters</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm password</label>
              <input type="password" required value={form.confirm} onChange={e => update('confirm', e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-barclays-teal focus:ring-1 focus:ring-barclays-teal" />
            </div>

            <div className="flex items-start gap-2">
              <input type="checkbox" required className="mt-1 accent-barclays-teal" />
              <label className="text-xs text-gray-600">
                I agree to the <Link href="#" className="text-barclays-teal hover:underline">Terms & Conditions</Link> and <Link href="#" className="text-barclays-teal hover:underline">Privacy Policy</Link>
              </label>
            </div>

            <button type="submit" disabled={loading} className="w-full barclays-btn-primary py-3 text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100 text-center text-sm">
            <span className="text-gray-500">Already registered? </span>
            <Link href="/auth/login" className="text-barclays-teal hover:underline font-medium">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
