'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Lock, Mail, AlertCircle } from 'lucide-react'
import { demoLogin, setDemoUser } from '@/lib/demo-auth'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    await new Promise(r => setTimeout(r, 800))

    const user = demoLogin(email, password)
    if (user) {
      setDemoUser(user)
      router.push('/dashboard')
    } else {
      setError('Invalid email or password. Try demo@barclays-demo.com / Demo1234!')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-barclays-gray-light flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex justify-center mb-4">
            <Image src="/barclays-logo.svg" alt="Barclays" width={220} height={52} />
          </div>
          <h1 className="text-2xl font-bold text-barclays-blue">Online Banking Login</h1>
          <p className="text-gray-500 text-sm mt-1">Sign in to manage your accounts</p>
        </div>

        {/* Demo hint */}
        <div className="bg-barclays-gold/20 border border-barclays-gold rounded-lg p-3 mb-6 text-sm text-barclays-dark">
          <strong>Demo credentials:</strong><br />
          Email: <code className="bg-white px-1 rounded">demo@barclays-demo.com</code><br />
          Password: <code className="bg-white px-1 rounded">Demo1234!</code>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
                <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                  className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-barclays-teal focus:ring-1 focus:ring-barclays-teal"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-barclays-teal focus:ring-1 focus:ring-barclays-teal"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="accent-barclays-teal" />
                <span className="text-gray-600">Remember me</span>
              </label>
              <Link href="#" className="text-barclays-teal hover:underline">Forgot password?</Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full barclays-btn-primary py-3 text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500 mb-3">Don&apos;t have online banking?</p>
            <Link href="/auth/register" className="barclays-btn-secondary text-sm w-full block">
              Register for online banking
            </Link>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">
            This is a demo. No real banking data is used. <Link href="/" className="text-barclays-teal hover:underline">Back to home</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
