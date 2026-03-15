import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'

export default function OverdraftsPage() {
  return (
    <div>
      <div className="bg-barclays-blue text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-blue-300 text-sm mb-4">
            <Link href="/" className="hover:text-white">Home</Link> &rsaquo; Overdrafts
          </nav>
          <h1 className="text-4xl font-bold mb-3">Overdrafts</h1>
          <p className="text-blue-200 text-lg max-w-2xl">An overdraft lets you spend more than you have in your current account, for those times when you need a little extra.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Types */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white rounded-lg border border-gray-200 p-6 card-hover">
            <h3 className="text-lg font-bold text-barclays-blue mb-3">Arranged Overdraft</h3>
            <p className="text-gray-600 text-sm mb-4">A pre-agreed limit that lets you spend more than your balance. You know your limit in advance and can manage your spending accordingly.</p>
            <div className="bg-barclays-gray-light rounded p-4 mb-4">
              <p className="text-sm text-gray-500 mb-1">Annual interest rate</p>
              <p className="text-3xl font-bold text-barclays-blue">35% <span className="text-base font-normal text-gray-500">EAR (variable)</span></p>
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2"><span className="text-barclays-teal font-bold">✓</span> Pre-agreed credit limit</li>
              <li className="flex items-start gap-2"><span className="text-barclays-teal font-bold">✓</span> Apply in app or online</li>
              <li className="flex items-start gap-2"><span className="text-barclays-teal font-bold">✓</span> Charged daily when in use</li>
              <li className="flex items-start gap-2"><span className="text-barclays-teal font-bold">✓</span> Repayable on demand</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg border-2 border-barclays-teal p-6 card-hover shadow-md">
            <span className="inline-block bg-barclays-gold text-barclays-dark text-xs font-bold px-3 py-1 rounded-full mb-3">PREMIER</span>
            <h3 className="text-lg font-bold text-barclays-blue mb-3">Premier Interest-Free Overdraft</h3>
            <p className="text-gray-600 text-sm mb-4">Premier customers can apply for an arranged overdraft with up to £500 interest-free.</p>
            <div className="bg-barclays-gray-light rounded p-4 mb-4">
              <p className="text-sm text-gray-500 mb-1">First £500</p>
              <p className="text-3xl font-bold text-green-600">0% <span className="text-base font-normal text-gray-500">interest-free</span></p>
              <p className="text-xs text-gray-400 mt-1">35% EAR on amounts over £500</p>
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2"><span className="text-barclays-teal font-bold">✓</span> First £500 interest-free</li>
              <li className="flex items-start gap-2"><span className="text-barclays-teal font-bold">✓</span> Premier customers only</li>
              <li className="flex items-start gap-2"><span className="text-barclays-teal font-bold">✓</span> Subject to approval</li>
              <li className="flex items-start gap-2"><span className="text-barclays-teal font-bold">✓</span> Manage in app</li>
            </ul>
          </div>
        </div>

        {/* Warning */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 mb-8 flex items-start gap-3">
          <AlertTriangle className="text-amber-600 w-5 h-5 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-bold text-amber-800 text-sm mb-1">Overdrafts are not free money</p>
            <p className="text-amber-700 text-xs leading-relaxed">An overdraft is a form of borrowing and is repayable on demand. You must be 18+ and a UK resident. Using an arranged overdraft will incur daily interest charges. Going over your arranged limit may result in additional charges. If you&apos;re struggling with debt, contact us or visit MoneyHelper for free advice.</p>
          </div>
        </div>

        {/* How to apply */}
        <div className="bg-barclays-gray-light rounded-xl p-8 text-center">
          <h2 className="text-xl font-bold text-barclays-blue mb-3">Apply for an overdraft</h2>
          <p className="text-gray-600 text-sm mb-6">Apply through the Barclays app or Online Banking. Most decisions are instant.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/auth/login" className="barclays-btn-primary text-sm">Log in to apply</Link>
            <Link href="/personal/accounts" className="barclays-btn-secondary text-sm">Open an account first</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
