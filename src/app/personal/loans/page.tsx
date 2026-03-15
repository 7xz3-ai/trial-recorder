import Link from 'next/link'
import ProductCard from '@/components/ui/ProductCard'

const loans = [
  {
    title: 'Personal Loan',
    description: 'Borrow £1,000 to £50,000 for almost any purpose.',
    features: ['Representative 6.5% APR', 'Fixed monthly payments', 'No early repayment fee', 'Decision in minutes'],
    cta: 'Apply now', ctaHref: '/apply/personal-loan', badge: 'Most Popular', highlight: true,
  },
  {
    title: 'Car Finance',
    description: 'Finance your next car with a competitive rate personal loan.',
    features: ['From £1,000 to £50,000', 'Terms 1–10 years', 'Own the car outright', 'Flexible repayment dates'],
    cta: 'Apply now', ctaHref: '/apply/car-finance',
  },
  {
    title: 'Debt Consolidation',
    description: 'Combine multiple debts into one manageable monthly payment.',
    features: ['Simplify your finances', 'Potentially lower rate', 'One fixed payment', 'Clear debt faster'],
    cta: 'Apply now', ctaHref: '/apply/debt-consolidation',
  },
]

export default function LoansPage() {
  return (
    <div>
      <div className="bg-barclays-blue text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-blue-300 text-sm mb-4">
            <Link href="/" className="hover:text-white">Home</Link> &rsaquo; Loans
          </nav>
          <h1 className="text-4xl font-bold mb-3">Personal Loans</h1>
          <p className="text-blue-200 text-lg max-w-2xl">Get a quick decision on a personal loan from £1,000 to £50,000.</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {loans.map(l => <ProductCard key={l.title} {...l} />)}
        </div>
        <div className="bg-barclays-gray-light rounded-lg p-8">
          <h2 className="text-2xl font-bold text-barclays-blue mb-4">Loan calculator</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Borrow amount</label>
              <input type="range" min="1000" max="50000" defaultValue="10000" className="w-full accent-barclays-teal" />
              <div className="flex justify-between text-xs text-gray-500 mt-1"><span>£1,000</span><span>£50,000</span></div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Repayment term</label>
              <input type="range" min="1" max="10" defaultValue="3" className="w-full accent-barclays-teal" />
              <div className="flex justify-between text-xs text-gray-500 mt-1"><span>1 year</span><span>10 years</span></div>
            </div>
          </div>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {[
              { label: 'Monthly repayment', value: '£307' },
              { label: 'Total repayable', value: '£11,052' },
              { label: 'Representative APR', value: '6.5%' },
            ].map(s => (
              <div key={s.label} className="bg-white rounded p-4 border border-barclays-teal text-center">
                <p className="text-xs text-gray-500 mb-1">{s.label}</p>
                <p className="text-2xl font-bold text-barclays-blue">{s.value}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3">Representative example: £10,000 over 3 years at 6.5% APR. For illustration only.</p>
          <Link href="/apply/personal-loan" className="barclays-btn-primary mt-4 inline-block">Apply for a loan</Link>
        </div>
      </div>
    </div>
  )
}
