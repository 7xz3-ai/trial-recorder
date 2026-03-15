'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowDownLeft, ArrowUpRight, CreditCard, PiggyBank, Send, Settings, LogOut, Bell, TrendingDown } from 'lucide-react'
import { getDemoUser, clearDemoUser, DEMO_ACCOUNT, type DemoUser } from '@/lib/demo-auth'
import { DashboardSkeleton } from '@/components/ui/Skeleton'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<DemoUser | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'cards' | 'insights'>('overview')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const u = getDemoUser()
    if (!u) { router.push('/auth/login'); return }
    setUser(u)
    setTimeout(() => setLoading(false), 1200)
  }, [router])

  const handleLogout = () => {
    clearDemoUser()
    router.push('/')
  }

  if (!user || loading) return (
    <div className="min-h-screen bg-barclays-gray-light">
      <div className="bg-barclays-blue text-white">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="h-5 w-48 bg-blue-400/30 rounded animate-pulse" />
        </div>
      </div>
      <DashboardSkeleton />
    </div>
  )

  return (
    <div className="min-h-screen bg-barclays-gray-light">
      {/* Dashboard header */}
      <div className="bg-barclays-blue text-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <p className="text-blue-300 text-xs mb-0.5">Welcome back</p>
            <h1 className="text-xl font-bold">{user.name}</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-blue-200 hover:text-white relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">2</span>
            </button>
            <button className="text-blue-200 hover:text-white">
              <Settings size={20} />
            </button>
            <button onClick={handleLogout} className="flex items-center gap-1 text-blue-200 hover:text-white text-sm">
              <LogOut size={16} /> Sign out
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-6xl mx-auto px-4 flex gap-0 border-t border-blue-700 mt-2">
          {([['overview', 'Overview'], ['transactions', 'Transactions'], ['cards', 'Cards'], ['insights', 'Spending Insights']] as const).map(([tab, label]) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-sm font-medium transition-colors border-b-2 ${activeTab === tab ? 'border-barclays-teal text-white' : 'border-transparent text-blue-300 hover:text-white'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Overview tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Account cards */}
            <div className="grid md:grid-cols-3 gap-4">
              {/* Current account */}
              <div className="md:col-span-2 bg-barclays-blue text-white rounded-xl p-6 shadow">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-blue-300 text-xs uppercase tracking-wide mb-1">Current Account</p>
                    <p className="text-sm text-blue-200">{DEMO_ACCOUNT.sortCode} | {DEMO_ACCOUNT.accountNumber}</p>
                  </div>
                  <div className="w-10 h-10 bg-barclays-teal rounded-full flex items-center justify-center">
                    <CreditCard size={18} />
                  </div>
                </div>
                <p className="text-4xl font-bold mb-1">£{DEMO_ACCOUNT.balance.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</p>
                <p className="text-blue-300 text-sm">Available: £{DEMO_ACCOUNT.availableBalance.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</p>
              </div>

              {/* Savings */}
              <div className="bg-white rounded-xl p-6 shadow border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">Instant Access Savings</p>
                    <p className="text-xs text-gray-400">2.55% AER</p>
                  </div>
                  <PiggyBank size={20} className="text-barclays-teal" />
                </div>
                <p className="text-3xl font-bold text-barclays-blue">£8,500.00</p>
                <Link href="/personal/savings" className="text-barclays-teal text-xs mt-3 inline-block hover:underline">View savings</Link>
              </div>
            </div>

            {/* Quick actions */}
            <div className="bg-white rounded-xl p-6 shadow border border-gray-100">
              <h2 className="font-bold text-barclays-blue mb-4">Quick actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: 'Send money', icon: Send, color: 'bg-barclays-teal' },
                  { label: 'Pay someone', icon: ArrowUpRight, color: 'bg-blue-500' },
                  { label: 'View statements', icon: ArrowDownLeft, color: 'bg-purple-500' },
                  { label: 'Manage cards', icon: CreditCard, color: 'bg-orange-500' },
                ].map(a => (
                  <button key={a.label} className="flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-100 hover:border-barclays-teal hover:bg-barclays-gray-light transition-all group">
                    <div className={`w-10 h-10 ${a.color} rounded-full flex items-center justify-center`}>
                      <a.icon size={18} className="text-white" />
                    </div>
                    <span className="text-xs font-medium text-gray-600 group-hover:text-barclays-blue text-center">{a.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent transactions preview */}
            <div className="bg-white rounded-xl p-6 shadow border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-barclays-blue">Recent transactions</h2>
                <button onClick={() => setActiveTab('transactions')} className="text-barclays-teal text-sm hover:underline">View all</button>
              </div>
              <div className="space-y-3">
                {DEMO_ACCOUNT.transactions.slice(0, 4).map(t => (
                  <div key={t.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${t.type === 'credit' ? 'bg-green-100' : 'bg-red-50'}`}>
                        {t.type === 'credit'
                          ? <ArrowDownLeft size={14} className="text-green-600" />
                          : <ArrowUpRight size={14} className="text-red-500" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{t.description}</p>
                        <p className="text-xs text-gray-400">{formatDate(t.date)}</p>
                      </div>
                    </div>
                    <span className={`text-sm font-semibold ${t.type === 'credit' ? 'text-green-600' : 'text-gray-800'}`}>
                      {t.type === 'credit' ? '+' : ''}£{Math.abs(t.amount).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Transactions tab */}
        {activeTab === 'transactions' && (
          <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-bold text-barclays-blue text-lg">All transactions</h2>
              <select className="border border-gray-200 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-barclays-teal">
                <option>Last 30 days</option>
                <option>Last 3 months</option>
                <option>Last 6 months</option>
              </select>
            </div>
            <div className="divide-y divide-gray-50">
              {DEMO_ACCOUNT.transactions.map(t => (
                <div key={t.id} className="flex items-center justify-between px-6 py-4 hover:bg-barclays-gray-light transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${t.type === 'credit' ? 'bg-green-100' : 'bg-gray-100'}`}>
                      {t.type === 'credit'
                        ? <ArrowDownLeft size={16} className="text-green-600" />
                        : <ArrowUpRight size={16} className="text-gray-500" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{t.description}</p>
                      <p className="text-xs text-gray-400">{formatDate(t.date)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-semibold ${t.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                      {t.type === 'credit' ? '+' : '-'}£{Math.abs(t.amount).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cards tab */}
        {activeTab === 'cards' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Debit card */}
              <div className="bg-gradient-to-br from-barclays-blue to-barclays-blue-light rounded-2xl p-6 text-white shadow-xl aspect-video flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs text-blue-300 uppercase tracking-widest">Debit Card</p>
                    <p className="font-semibold mt-1">Barclays Current Account</p>
                  </div>
                  <div className="w-10 h-10 bg-barclays-teal rounded-full opacity-80" />
                </div>
                <div>
                  <p className="font-mono text-lg tracking-widest mb-3">•••• •••• •••• 4521</p>
                  <div className="flex justify-between text-xs text-blue-300">
                    <span>{user.name.toUpperCase()}</span>
                    <span>03/28</span>
                  </div>
                </div>
              </div>

              {/* Credit card */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 text-white shadow-xl aspect-video flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest">Credit Card</p>
                    <p className="font-semibold mt-1">Barclaycard Rewards</p>
                  </div>
                  <div className="flex">
                    <div className="w-8 h-8 bg-red-500 rounded-full opacity-80 -mr-2" />
                    <div className="w-8 h-8 bg-yellow-400 rounded-full opacity-80" />
                  </div>
                </div>
                <div>
                  <p className="font-mono text-lg tracking-widest mb-3">•••• •••• •••• 7832</p>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>{user.name.toUpperCase()}</span>
                    <span>09/27</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card controls */}
            <div className="bg-white rounded-xl p-6 shadow border border-gray-100">
              <h3 className="font-bold text-barclays-blue mb-4">Card controls</h3>
              <div className="space-y-3">
                {[
                  { label: 'Freeze card', desc: 'Temporarily freeze your debit card', enabled: false },
                  { label: 'Contactless payments', desc: 'Enable or disable contactless', enabled: true },
                  { label: 'Online payments', desc: 'Enable or disable online transactions', enabled: true },
                  { label: 'International payments', desc: 'Use your card abroad', enabled: false },
                ].map(ctrl => (
                  <div key={ctrl.label} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{ctrl.label}</p>
                      <p className="text-xs text-gray-400">{ctrl.desc}</p>
                    </div>
                    <div className={`w-11 h-6 rounded-full flex items-center px-1 cursor-pointer transition-colors ${ctrl.enabled ? 'bg-barclays-teal justify-end' : 'bg-gray-200 justify-start'}`}>
                      <div className="w-4 h-4 bg-white rounded-full shadow" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Insights tab */}
        {activeTab === 'insights' && (
          <div className="space-y-6">
            {/* Monthly summary */}
            <div className="bg-white rounded-xl p-6 shadow border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-barclays-blue text-lg">March 2026 — Spending breakdown</h2>
                <select className="border border-gray-200 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-barclays-teal">
                  <option>March 2026</option>
                  <option>February 2026</option>
                  <option>January 2026</option>
                </select>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {[
                  { label: 'Total spent', value: '£1,298.61', color: 'text-red-600' },
                  { label: 'Total income', value: '£3,450.00', color: 'text-green-600' },
                  { label: 'Net savings', value: '£2,151.39', color: 'text-barclays-teal' },
                ].map(s => (
                  <div key={s.label} className="bg-barclays-gray-light rounded-lg p-4 text-center">
                    <p className="text-xs text-gray-500 mb-1">{s.label}</p>
                    <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                  </div>
                ))}
              </div>

              {/* Category bars */}
              <h3 className="font-semibold text-barclays-blue mb-4">Spending by category</h3>
              <div className="space-y-4">
                {[
                  { cat: 'Groceries', amount: 405.63, pct: 31, color: 'bg-blue-500' },
                  { cat: 'Bills & Subscriptions', amount: 262.99, pct: 20, color: 'bg-barclays-teal' },
                  { cat: 'Shopping', amount: 229.99, pct: 18, color: 'bg-purple-500' },
                  { cat: 'Transport', amount: 148.00, pct: 11, color: 'bg-orange-500' },
                  { cat: 'Eating Out', amount: 132.00, pct: 10, color: 'bg-pink-500' },
                  { cat: 'Cash & ATM', amount: 100.00, pct: 8, color: 'bg-gray-500' },
                  { cat: 'Other', amount: 20.00, pct: 2, color: 'bg-gray-300' },
                ].map(c => (
                  <div key={c.cat}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${c.color}`} />
                        <span className="text-sm text-gray-700">{c.cat}</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-800">£{c.amount.toFixed(2)}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div className={`h-2.5 rounded-full ${c.color} transition-all duration-700`} style={{ width: `${c.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Spending vs last month */}
            <div className="bg-white rounded-xl p-6 shadow border border-gray-100">
              <h3 className="font-bold text-barclays-blue mb-4">Compared to last month</h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { cat: 'Groceries', change: -12, direction: 'down' },
                  { cat: 'Bills', change: 0, direction: 'same' },
                  { cat: 'Shopping', change: 23, direction: 'up' },
                  { cat: 'Eating Out', change: -8, direction: 'down' },
                ].map(c => (
                  <div key={c.cat} className="bg-barclays-gray-light rounded-lg p-4 text-center">
                    <p className="text-xs text-gray-500 mb-1">{c.cat}</p>
                    <p className={`text-lg font-bold ${c.change > 0 ? 'text-red-500' : c.change < 0 ? 'text-green-600' : 'text-gray-500'}`}>
                      {c.change > 0 ? '+' : ''}{c.change}%
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {c.change > 0 ? 'Spending up' : c.change < 0 ? 'Spending down' : 'No change'}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tip */}
            <div className="bg-barclays-teal/10 border border-barclays-teal/30 rounded-xl p-6 flex items-start gap-4">
              <TrendingDown className="text-barclays-teal w-8 h-8 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-barclays-blue mb-1">Spending insight</h3>
                <p className="text-sm text-gray-600">
                  Your grocery spending is down 12% this month — great job! Your shopping spend has increased by 23% though.
                  Consider setting a spending limit in the Barclays app to stay on track.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
