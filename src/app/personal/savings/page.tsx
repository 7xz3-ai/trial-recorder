import Link from 'next/link'
import ProductCard from '@/components/ui/ProductCard'

const savings = [
  {
    title: 'Instant Access Savings',
    description: 'Save flexibly and access your money whenever you need it.',
    features: ['2.55% AER (variable)', 'Unlimited withdrawals', 'Minimum £1 deposit', 'FSCS protected'],
    cta: 'Open account', ctaHref: '/apply/instant-savings',
  },
  {
    title: '1-Year Fixed Rate Bond',
    description: 'Lock away your savings for 12 months for a guaranteed rate.',
    features: ['4.75% AER (fixed)', 'Minimum £500', 'FSCS protected', 'No withdrawals during term'],
    cta: 'Open account', ctaHref: '/apply/fixed-bond', badge: 'Best Rate', highlight: true,
  },
  {
    title: 'Cash ISA',
    description: 'Save up to £20,000 per year tax-free.',
    features: ['3.25% AER (variable)', 'Tax-free interest', 'Transfer existing ISAs', 'FSCS protected'],
    cta: 'Open account', ctaHref: '/apply/cash-isa',
  },
]

export default function SavingsPage() {
  return (
    <div>
      <div className="bg-barclays-blue text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-blue-300 text-sm mb-4">
            <Link href="/" className="hover:text-white">Home</Link> &rsaquo; Savings
          </nav>
          <h1 className="text-4xl font-bold mb-3">Savings Accounts</h1>
          <p className="text-blue-200 text-lg max-w-2xl">Grow your savings with competitive rates and flexible options.</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {savings.map(s => <ProductCard key={s.title} {...s} />)}
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
          <p className="text-sm text-gray-600">
            <strong>FSCS protection:</strong> Eligible deposits up to £85,000 per person are protected by the Financial Services Compensation Scheme (FSCS).
            AER stands for Annual Equivalent Rate. Rates correct as of March 2026.
          </p>
        </div>
      </div>
    </div>
  )
}
