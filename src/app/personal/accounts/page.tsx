import ProductCard from '@/components/ui/ProductCard'
import Link from 'next/link'

const accounts = [
  {
    title: 'Barclays Current Account',
    description: 'An everyday current account with all the essentials.',
    features: ['No monthly fee', 'Barclays app access', 'Debit card', 'Apple & Google Pay', 'Contactless payments'],
    cta: 'Apply now', ctaHref: '/apply/current-account',
  },
  {
    title: 'Premier Current Account',
    description: 'For customers earning £75,000+ or with £100,000+ in savings.',
    features: ['Dedicated relationship manager', 'Worldwide travel insurance', 'Airport lounge access', 'Preferential rates', 'Concierge service'],
    cta: 'Apply now', ctaHref: '/apply/premier-account', badge: 'Most Popular', highlight: true,
  },
  {
    title: 'Student Additions Account',
    description: 'Designed for full-time UK university students.',
    features: ['0% overdraft up to £1,500', 'No monthly fee', 'Student debit card', 'Barclays app', 'Railcard offer'],
    cta: 'Apply now', ctaHref: '/apply/student-account',
  },
  {
    title: 'Basic Current Account',
    description: 'Simple banking for those who don\'t qualify for a standard account.',
    features: ['No overdraft facility', 'Barclays Visa debit card', 'Online and app banking', 'No monthly fee'],
    cta: 'Apply now', ctaHref: '/apply/basic-account',
  },
]

export default function AccountsPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-barclays-blue text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-blue-300 text-sm mb-4">
            <Link href="/" className="hover:text-white">Home</Link> &rsaquo; Current Accounts
          </nav>
          <h1 className="text-4xl font-bold mb-3">Current Accounts</h1>
          <p className="text-blue-200 text-lg max-w-2xl">
            Whether you need everyday banking or premium services, we have an account for you.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {accounts.map((a) => <ProductCard key={a.title} {...a} />)}
        </div>

        <div className="mt-12 bg-barclays-gray-light rounded-lg p-8">
          <h2 className="text-2xl font-bold text-barclays-blue mb-4">Compare accounts</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-barclays-teal">
                  <th className="text-left py-3 pr-4 text-barclays-blue">Feature</th>
                  {accounts.map(a => (
                    <th key={a.title} className="text-center py-3 px-2 text-barclays-blue text-xs">{a.title.replace('Barclays ', '').replace(' Account', '')}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Monthly fee', 'None', 'None', 'None', 'None'],
                  ['Debit card', '✓', '✓', '✓', '✓'],
                  ['Mobile app', '✓', '✓', '✓', '✓'],
                  ['Overdraft', 'Optional', 'Optional', 'Up to £1,500', '✗'],
                  ['Travel insurance', '✗', '✓', '✗', '✗'],
                  ['Relationship manager', '✗', '✓', '✗', '✗'],
                ].map(([feature, ...vals]) => (
                  <tr key={feature} className="border-b border-gray-200">
                    <td className="py-3 pr-4 font-medium text-gray-700">{feature}</td>
                    {vals.map((v, i) => (
                      <td key={i} className="py-3 px-2 text-center text-gray-600">{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
