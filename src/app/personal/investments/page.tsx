import Link from 'next/link'
import { TrendingUp, Shield, BarChart3, Target } from 'lucide-react'

const products = [
  { title: 'Investment ISA', desc: 'Invest up to £20,000 per year tax-free. Choose from a range of funds.', features: ['Tax-free gains & dividends', 'Wide fund range', 'Low-cost index trackers', 'From £1 per month'], highlight: true, badge: 'Popular' },
  { title: 'General Investment Account', desc: 'No limits on how much you invest. Flexible withdrawals at any time.', features: ['No investment limits', 'Flexible withdrawals', 'Wide fund range', 'Dividend reinvestment'], highlight: false },
  { title: 'SIPP (Self-Invested Personal Pension)', desc: 'Take control of your retirement savings with a wide choice of investments.', features: ['Tax relief on contributions', 'Choose your own funds', 'Consolidate old pensions', 'Access from age 55'], highlight: false },
]

export default function InvestmentsPage() {
  return (
    <div>
      <div className="bg-barclays-blue text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-blue-300 text-sm mb-4">
            <Link href="/" className="hover:text-white">Home</Link> &rsaquo; Investments
          </nav>
          <h1 className="text-4xl font-bold mb-3">Investments</h1>
          <p className="text-blue-200 text-lg max-w-2xl">Whether you&apos;re a beginner or an expert — we can help you make the most of your money.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Risk warning */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 flex items-start gap-3">
          <Shield className="text-amber-600 w-5 h-5 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-amber-800"><strong>Capital at risk:</strong> The value of investments can go down as well as up. You may get back less than you invest. Past performance is not a guide to future performance. Tax treatment depends on individual circumstances and may change.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {products.map(p => (
            <div key={p.title} className={`bg-white rounded-lg border ${p.highlight ? 'border-barclays-teal shadow-md' : 'border-gray-200'} p-6 flex flex-col card-hover`}>
              {p.badge && <span className="inline-block bg-barclays-teal text-white text-xs font-semibold px-3 py-1 rounded-full mb-3 self-start">{p.badge}</span>}
              <h3 className="text-lg font-bold text-barclays-blue mb-2">{p.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{p.desc}</p>
              <ul className="space-y-2 mb-6 flex-1">
                {p.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-barclays-teal font-bold mt-0.5">✓</span>{f}
                  </li>
                ))}
              </ul>
              <Link href="/apply/investment" className="barclays-btn-primary text-sm text-center">Start investing</Link>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className="bg-barclays-gray-light rounded-xl p-8">
          <h2 className="text-2xl font-bold text-barclays-blue mb-6 text-center">Why invest with Barclays?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: BarChart3, title: 'Smart Investor', desc: 'Our award-winning online investment platform.' },
              { icon: Target, title: 'Ready-made funds', desc: 'Diversified portfolios matched to your risk level.' },
              { icon: TrendingUp, title: 'Low costs', desc: 'Competitive fees from just 0.15% per year.' },
              { icon: Shield, title: 'FSCS protected', desc: 'Eligible investments covered up to £85,000.' },
            ].map(w => (
              <div key={w.title} className="text-center">
                <w.icon className="text-barclays-teal w-8 h-8 mx-auto mb-3" />
                <h3 className="font-bold text-barclays-blue text-sm mb-1">{w.title}</h3>
                <p className="text-gray-500 text-xs">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
