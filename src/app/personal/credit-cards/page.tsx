import Link from 'next/link'
import ProductCard from '@/components/ui/ProductCard'
import EligibilityChecker from '@/components/ui/EligibilityChecker'
import RelatedProducts from '@/components/ui/RelatedProducts'

const cards = [
  {
    title: 'Barclaycard Rewards',
    description: 'Earn cashback on every purchase, with no foreign transaction fees.',
    features: ['0.5% cashback on all spending', 'No foreign transaction fees', 'Contactless & Apple/Google Pay', 'Fraud guarantee'],
    cta: 'Apply now', ctaHref: '/apply/rewards-card', badge: 'Best for travel', highlight: true,
  },
  {
    title: 'Balance Transfer Card',
    description: 'Move existing card debt and pay 0% interest for up to 26 months.',
    features: ['0% for 26 months on balance transfers', '2.99% transfer fee', 'No annual fee', 'Online management'],
    cta: 'Apply now', ctaHref: '/apply/balance-transfer',
  },
  {
    title: '0% Purchase Card',
    description: 'Make big purchases and spread the cost with 0% interest.',
    features: ['0% on purchases for 20 months', 'No annual fee', 'Contactless payments', 'Purchase protection'],
    cta: 'Apply now', ctaHref: '/apply/purchase-card',
  },
]

export default function CreditCardsPage() {
  return (
    <div>
      <div className="bg-barclays-blue text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-blue-300 text-sm mb-4">
            <Link href="/" className="hover:text-white">Home</Link> &rsaquo; Credit Cards
          </nav>
          <h1 className="text-4xl font-bold mb-3">Credit Cards</h1>
          <p className="text-blue-200 text-lg max-w-2xl">Whether you want to earn rewards, transfer a balance or spread the cost of purchases, we have a card for you.</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map(c => <ProductCard key={c.title} {...c} />)}
        </div>
        <div className="mt-10">
          <EligibilityChecker
            productName="a Barclaycard credit card"
            criteria={[
              { label: 'Are you aged 18 or over?', description: 'You must be at least 18 years old to apply.' },
              { label: 'Are you a UK resident?', description: 'You must live in the UK with a UK address.' },
              { label: 'Do you have a regular income?', description: 'Employment income, pension, or other regular income.' },
              { label: 'Is your credit history in good standing?', description: 'No recent CCJs, IVAs, or bankruptcies in the last 6 years.' },
            ]}
          />
        </div>

        <div className="mt-10">
          <RelatedProducts products={[
            { title: 'Barclaycard', desc: 'Explore the full Barclaycard range including Avios Plus.', href: '/personal/barclaycard' },
            { title: 'Personal Loans', desc: 'Borrow £1,000 to £50,000 at competitive rates.', href: '/personal/loans' },
            { title: 'Current Accounts', desc: 'Open a Barclays current account to manage your money.', href: '/personal/accounts' },
          ]} />
        </div>

        <div className="mt-10 bg-blue-50 border border-blue-100 rounded-lg p-6">
          <h3 className="font-bold text-barclays-blue mb-2">Important information</h3>
          <p className="text-xs text-gray-600">Credit is subject to status and approval. 0% rates apply to qualifying transactions only. After the promotional period ends, the standard variable rate will apply. Please ensure you can afford repayments before applying.</p>
        </div>
      </div>
    </div>
  )
}
