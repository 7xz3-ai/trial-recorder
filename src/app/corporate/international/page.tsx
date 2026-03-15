import Link from 'next/link'
import ProductCard from '@/components/ui/ProductCard'

const products = [
  {
    title: 'Foreign Exchange',
    description: 'Competitive FX rates for businesses trading internationally.',
    features: ['Spot, forward and options', '175+ currencies', 'Hedging solutions', 'Real-time rates via iPortal'],
    cta: 'Get rates', ctaHref: '/apply/fx', badge: 'Best Rates', highlight: true,
  },
  {
    title: 'Trade Finance',
    description: 'Letters of credit, guarantees and documentary collections.',
    features: ['Import/export LCs', 'Bank guarantees', 'Documentary collections', 'Supply chain finance'],
    cta: 'Learn more', ctaHref: '/apply/trade-finance',
  },
  {
    title: 'Global Payments',
    description: 'Fast, secure international payments to over 175 countries.',
    features: ['SWIFT payments', 'Bulk payment processing', 'Real-time tracking', 'Competitive rates'],
    cta: 'Learn more', ctaHref: '/apply/global-payments',
  },
]

export default function InternationalPage() {
  return (
    <div>
      <div className="bg-barclays-blue text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-blue-300 text-sm mb-4">
            <Link href="/corporate" className="hover:text-white">Corporate</Link> &rsaquo; International
          </nav>
          <h1 className="text-4xl font-bold mb-3">International Banking</h1>
          <p className="text-blue-200 text-lg max-w-2xl">Take your business global with Barclays&apos; international banking services.</p>
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
