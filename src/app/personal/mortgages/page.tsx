import Link from 'next/link'
import ProductCard from '@/components/ui/ProductCard'

const mortgages = [
  {
    title: 'First-Time Buyer Mortgage',
    description: 'Get on the property ladder with our range of first-time buyer mortgages.',
    features: ['5% deposit options', 'Fixed and tracker rates', 'Free mortgage advice', 'Up to 35-year term'],
    cta: 'Get a mortgage', ctaHref: '/apply/mortgage-first-time', badge: 'Great for starters',
  },
  {
    title: 'Remortgage',
    description: 'Switch your existing mortgage to Barclays and potentially save money.',
    features: ['Competitive rates', 'Free valuation', 'No arrangement fee options', 'Online management'],
    cta: 'Remortgage now', ctaHref: '/apply/remortgage', highlight: true,
  },
  {
    title: 'Buy to Let Mortgage',
    description: 'For landlords looking to purchase or refinance a rental property.',
    features: ['Up to 75% LTV', 'Rental income assessment', 'Fixed and variable rates', 'Portfolio landlord options'],
    cta: 'Learn more', ctaHref: '/apply/buy-to-let',
  },
]

export default function MortgagesPage() {
  return (
    <div>
      <div className="bg-barclays-blue text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-blue-300 text-sm mb-4">
            <Link href="/" className="hover:text-white">Home</Link> &rsaquo; Mortgages
          </nav>
          <h1 className="text-4xl font-bold mb-3">Mortgages</h1>
          <p className="text-blue-200 text-lg max-w-2xl">From your first home to remortgaging, we can help you find the right deal.</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {mortgages.map(m => <ProductCard key={m.title} {...m} />)}
        </div>

        {/* Calculator */}
        <div id="calculator" className="bg-barclays-gray-light rounded-lg p-8">
          <h2 className="text-2xl font-bold text-barclays-blue mb-2">Mortgage calculator</h2>
          <p className="text-gray-600 mb-6 text-sm">Get an estimate of your monthly repayments.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { label: 'Property value', placeholder: '£250,000', id: 'value' },
              { label: 'Deposit amount', placeholder: '£25,000', id: 'deposit' },
              { label: 'Mortgage term (years)', placeholder: '25', id: 'term' },
            ].map(f => (
              <div key={f.id}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                <input type="text" placeholder={f.placeholder} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-barclays-teal" />
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-white rounded border border-barclays-teal">
            <p className="text-sm text-gray-500 mb-1">Estimated monthly repayment</p>
            <p className="text-3xl font-bold text-barclays-blue">£937 <span className="text-base font-normal text-gray-500">/ month</span></p>
            <p className="text-xs text-gray-400 mt-1">Based on 4.79% interest rate (APRC 5.1%). For illustration only.</p>
          </div>
          <Link href="/apply/mortgage-first-time" className="barclays-btn-primary mt-4 inline-block">Apply for a mortgage</Link>
        </div>
      </div>
    </div>
  )
}
