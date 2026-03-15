import Link from 'next/link'
import ProductCard from '@/components/ui/ProductCard'

const products = [
  {
    title: 'Business Current Account',
    description: 'Straightforward day-to-day banking for your business.',
    features: ['Free day-to-day banking for 12 months', 'Online and mobile access', 'Business debit card', 'Direct debits & standing orders'],
    cta: 'Open account', ctaHref: '/apply/business-account', badge: 'Free for 12 months',
  },
  {
    title: 'Business Premium Account',
    description: 'Enhanced banking for established businesses with higher transaction volumes.',
    features: ['Dedicated relationship manager', 'Preferential lending rates', 'Priority phone support', 'Bespoke financial solutions'],
    cta: 'Apply now', ctaHref: '/apply/business-premium', highlight: true,
  },
  {
    title: 'iPortal',
    description: 'Secure, single-access portal for all your corporate banking needs.',
    features: ['Single sign-on to all services', 'Multi-currency accounts', 'Bulk payment processing', 'Real-time reporting'],
    cta: 'Learn more', ctaHref: '/apply/iportal',
  },
]

export default function CorporateBankingPage() {
  return (
    <div>
      <div className="bg-barclays-blue text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-blue-300 text-sm mb-4">
            <Link href="/corporate" className="hover:text-white">Corporate</Link> &rsaquo; Business Banking
          </nav>
          <h1 className="text-4xl font-bold mb-3">Business Banking</h1>
          <p className="text-blue-200 text-lg max-w-2xl">Flexible banking solutions for businesses of all sizes.</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {products.map(p => <ProductCard key={p.title} {...p} />)}
        </div>

        <div id="iportal" className="bg-barclays-blue text-white rounded-lg p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-3">Barclays iPortal</h2>
              <p className="text-blue-200 mb-4">The secure gateway to your corporate banking. Manage payments, monitor balances, and handle FX all from one platform.</p>
              <ul className="space-y-2 mb-6">
                {['Real-time balance and transaction data', 'Bulk payment file upload', 'Multi-user access controls', 'API connectivity', 'SWIFT messaging'].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-blue-100">
                    <span className="text-barclays-teal">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link href="/apply/iportal" className="barclays-btn-primary">Request iPortal access</Link>
            </div>
            <div className="bg-barclays-blue-light rounded-lg p-6 font-mono text-sm">
              <div className="text-barclays-teal mb-2">// iPortal Dashboard</div>
              <div className="text-green-400">GBP Account: £2,450,000.00</div>
              <div className="text-green-400">USD Account: $1,850,000.00</div>
              <div className="text-green-400">EUR Account: €980,000.00</div>
              <div className="text-blue-200 mt-3">Pending payments: 3</div>
              <div className="text-blue-200">FX orders today: 7</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
