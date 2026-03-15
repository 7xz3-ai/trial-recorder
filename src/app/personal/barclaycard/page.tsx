import Link from 'next/link'
import { Shield, Plane, Gift, Percent, CreditCard, Star, Clock, Globe } from 'lucide-react'

const cards = [
  {
    title: 'Barclaycard Avios Plus',
    desc: 'Earn Avios on every purchase. Perfect for frequent travellers.',
    rate: '28.9%',
    rateLabel: 'APR (variable)',
    fee: '£12/month',
    features: ['1.5 Avios per £1 spent', 'Cabin upgrade voucher', 'Airport lounge access', 'Travel insurance included'],
    badge: 'Most Popular',
    highlight: true,
  },
  {
    title: 'Barclaycard Rewards',
    desc: 'Earn cashback on every purchase with no annual fee.',
    rate: '27.9%',
    rateLabel: 'APR (variable)',
    fee: 'No fee',
    features: ['0.25% cashback', 'No annual fee', 'Contactless enabled', 'Manage in app'],
    badge: null,
    highlight: false,
  },
  {
    title: 'Barclaycard Forward',
    desc: 'Designed to help you build or rebuild your credit score.',
    rate: '34.9%',
    rateLabel: 'APR (variable)',
    fee: 'No fee',
    features: ['Credit builder card', 'Low initial limit', 'Free credit score tracking', 'Responsible lending tools'],
    badge: 'Credit Builder',
    highlight: false,
  },
  {
    title: 'Barclaycard Platinum',
    desc: 'Long 0% interest period on purchases and balance transfers.',
    rate: '24.9%',
    rateLabel: 'APR (variable)',
    fee: 'No fee',
    features: ['Up to 25 months 0% on purchases', 'Up to 25 months 0% on BT', 'No annual fee', 'Contactless & Apple Pay'],
    badge: '0% Intro',
    highlight: false,
  },
]

const benefits = [
  { icon: Shield, title: 'Fraud protection', desc: 'Advanced fraud monitoring and zero liability on unauthorised transactions.' },
  { icon: Plane, title: 'Travel perks', desc: 'Selected cards include travel insurance, airport lounges, and no foreign transaction fees.' },
  { icon: Gift, title: 'Rewards & cashback', desc: 'Earn Avios, cashback, or reward points on everyday spending.' },
  { icon: Percent, title: '0% offers', desc: 'Introductory 0% interest on purchases and balance transfers.' },
  { icon: Clock, title: 'Instant decisions', desc: 'Apply online and get a decision in minutes. Check eligibility without affecting your credit score.' },
  { icon: Globe, title: 'Worldwide acceptance', desc: 'Use your Barclaycard wherever Visa is accepted, in-store and online.' },
]

export default function BarclaycardPage() {
  return (
    <div>
      <div className="bg-barclays-blue text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-blue-300 text-sm mb-4">
            <Link href="/" className="hover:text-white">Home</Link> &rsaquo; Barclaycard
          </nav>
          <div className="flex items-center gap-3 mb-3">
            <CreditCard className="w-10 h-10 text-barclays-teal" />
            <h1 className="text-4xl font-bold">Barclaycard</h1>
          </div>
          <p className="text-blue-200 text-lg max-w-2xl">Find the right credit card for you — whether you want to earn rewards, spread the cost, or build your credit.</p>
        </div>
      </div>

      {/* Eligibility checker banner */}
      <div className="bg-barclays-teal/10 border-b border-barclays-teal/30">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Star className="text-barclays-teal w-6 h-6 flex-shrink-0" />
            <div>
              <p className="font-bold text-barclays-blue">Check your eligibility without affecting your credit score</p>
              <p className="text-gray-600 text-sm">See which cards you&apos;re likely to be approved for in minutes.</p>
            </div>
          </div>
          <Link href="/apply/credit-card" className="barclays-btn-primary text-sm flex-shrink-0">Check eligibility</Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Cards grid */}
        <h2 className="text-2xl font-bold text-barclays-blue mb-6">Our credit cards</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {cards.map(c => (
            <div key={c.title} className={`bg-white rounded-lg border ${c.highlight ? 'border-barclays-teal shadow-md' : 'border-gray-200'} p-6 flex flex-col card-hover`}>
              {c.badge && (
                <span className={`inline-block ${c.highlight ? 'bg-barclays-teal text-white' : 'bg-barclays-gray-light text-barclays-blue'} text-xs font-semibold px-3 py-1 rounded-full mb-3 self-start`}>
                  {c.badge}
                </span>
              )}
              <h3 className="text-lg font-bold text-barclays-blue mb-2">{c.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{c.desc}</p>
              <div className="bg-barclays-gray-light rounded p-3 mb-4">
                <p className="text-2xl font-bold text-barclays-blue">{c.rate} <span className="text-sm font-normal text-gray-500">{c.rateLabel}</span></p>
                <p className="text-xs text-gray-500 mt-1">Annual fee: {c.fee}</p>
              </div>
              <ul className="space-y-2 mb-6 flex-1">
                {c.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-barclays-teal font-bold mt-0.5">✓</span>{f}
                  </li>
                ))}
              </ul>
              <Link href="/apply/credit-card" className="barclays-btn-primary text-sm text-center">Apply now</Link>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <h2 className="text-2xl font-bold text-barclays-blue mb-6">Why choose Barclaycard?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {benefits.map(b => (
            <div key={b.title} className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-barclays-teal/10 rounded-full flex items-center justify-center flex-shrink-0">
                <b.icon className="text-barclays-teal w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-barclays-blue text-sm mb-1">{b.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Balance transfer */}
        <div className="bg-barclays-gray-light rounded-xl p-8 mb-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-barclays-blue mb-3">Looking to transfer a balance?</h2>
            <p className="text-gray-600 text-sm mb-6">Move existing credit card debt to a Barclaycard and pay 0% interest for up to 25 months. A balance transfer fee of 1.5%-3% applies.</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link href="/apply/credit-card" className="barclays-btn-primary text-sm">Transfer a balance</Link>
              <Link href="/personal/credit-cards" className="barclays-btn-secondary text-sm">Compare cards</Link>
            </div>
          </div>
        </div>

        {/* Important info */}
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 text-sm text-gray-600">
          <strong>Important information:</strong> Credit is available subject to status. You must be 18+ and a UK resident. The representative APR shown is for illustrative purposes. Your actual rate may differ based on your individual circumstances and credit history. Always read the full terms and conditions before applying. Barclaycard is a trading name of Barclays Bank UK PLC. Authorised by the Prudential Regulation Authority and regulated by the Financial Conduct Authority and the Prudential Regulation Authority.
        </div>
      </div>
    </div>
  )
}
