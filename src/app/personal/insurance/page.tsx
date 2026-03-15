import Link from 'next/link'
import { Shield, Home, Car, Heart, Plane } from 'lucide-react'

const products = [
  {
    icon: Home,
    title: 'Home Insurance',
    description: 'Protect your home and belongings with buildings and contents cover.',
    features: ['Buildings cover up to £1M', 'Contents cover up to £100K', 'Accidental damage included', 'Emergency home assistance', 'New-for-old cover on contents'],
    cta: 'Get a quote',
    ctaHref: '/apply/home-insurance',
    highlight: true,
  },
  {
    icon: Car,
    title: 'Car Insurance',
    description: 'Comprehensive car insurance with a range of cover levels.',
    features: ['Comprehensive, Third Party or TPFT', 'Courtesy car included', 'Windscreen cover', 'Personal belongings cover', 'Legal expenses cover'],
    cta: 'Get a quote',
    ctaHref: '/apply/car-insurance',
  },
  {
    icon: Heart,
    title: 'Life Insurance',
    description: 'Financial protection for your family if the worst should happen.',
    features: ['Level or decreasing cover', 'Terminal illness included', 'Joint or single policies', 'From £5 per month', 'Critical illness add-on'],
    cta: 'Get a quote',
    ctaHref: '/apply/life-insurance',
  },
  {
    icon: Plane,
    title: 'Travel Insurance',
    description: 'Cover for single trips or annual multi-trip policies.',
    features: ['Medical cover up to £10M', 'Cancellation up to £5,000', 'Baggage & personal money', 'Over 65s covered', '24/7 emergency helpline'],
    cta: 'Get a quote',
    ctaHref: '/apply/travel-insurance',
  },
]

export default function InsurancePage() {
  return (
    <div>
      <div className="bg-barclays-blue text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-blue-300 text-sm mb-4">
            <Link href="/" className="hover:text-white">Home</Link> &rsaquo; Insurance
          </nav>
          <h1 className="text-4xl font-bold mb-3">Insurance</h1>
          <p className="text-blue-200 text-lg max-w-2xl">Protect what matters most — your home, car, health and travels.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Info banner */}
        <div className="bg-barclays-teal/10 border border-barclays-teal/30 rounded-lg p-6 mb-10 flex items-start gap-4">
          <Shield className="text-barclays-teal w-8 h-8 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-barclays-blue mb-1">Why insure with Barclays?</h3>
            <p className="text-sm text-gray-600">
              As a Barclays customer, you may qualify for exclusive discounts. Premier customers receive complimentary worldwide family travel insurance.
              All policies are underwritten by leading UK insurers and include 24/7 claims support.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {products.map(p => (
            <div key={p.title} className={`bg-white rounded-lg border ${p.highlight ? 'border-barclays-teal shadow-md' : 'border-gray-200'} p-6 flex flex-col card-hover`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 bg-barclays-teal/10 rounded-full flex items-center justify-center">
                  <p.icon className="text-barclays-teal w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-barclays-blue">{p.title}</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">{p.description}</p>
              <ul className="space-y-2 mb-6 flex-1">
                {p.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-barclays-teal font-bold mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href={p.ctaHref} className="barclays-btn-primary text-sm text-center">{p.cta}</Link>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-blue-50 border border-blue-100 rounded-lg p-6 text-xs text-gray-600">
          <strong>Important:</strong> Insurance policies are subject to terms, conditions and exclusions. Please read the policy documents carefully before purchasing.
          Cover levels and premiums may vary. Barclays Insurance Services Company Limited is authorised and regulated by the Financial Conduct Authority.
        </div>
      </div>
    </div>
  )
}
