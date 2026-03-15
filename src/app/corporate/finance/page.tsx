import Link from 'next/link'
import ProductCard from '@/components/ui/ProductCard'

const products = [
  {
    title: 'Business Loan',
    description: 'Fixed-rate loans from £25,000 to support business growth.',
    features: ['Borrow £25,000–£10M+', 'Fixed and variable rates', 'Terms 1–25 years', 'Quick decisions'],
    cta: 'Apply now', ctaHref: '/apply/business-loan', badge: 'Most Popular', highlight: true,
  },
  {
    title: 'Invoice Finance',
    description: 'Release cash tied up in unpaid invoices.',
    features: ['Up to 90% of invoice value', 'Confidential factoring', 'Bad debt protection', 'Dedicated support'],
    cta: 'Learn more', ctaHref: '/apply/invoice-finance',
  },
  {
    title: 'Asset Finance',
    description: 'Finance equipment, vehicles and machinery.',
    features: ['Hire purchase', 'Finance lease', 'Operating lease', 'Sale and leaseback'],
    cta: 'Learn more', ctaHref: '/apply/asset-finance',
  },
]

export default function CorporateFinancePage() {
  return (
    <div>
      <div className="bg-barclays-blue text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-blue-300 text-sm mb-4">
            <Link href="/corporate" className="hover:text-white">Corporate</Link> &rsaquo; Finance
          </nav>
          <h1 className="text-4xl font-bold mb-3">Business Finance</h1>
          <p className="text-blue-200 text-lg max-w-2xl">Flexible finance solutions to help your business grow and thrive.</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          {products.map(p => <ProductCard key={p.title} {...p} />)}
        </div>
      </div>
    </div>
  )
}
