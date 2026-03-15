import Link from 'next/link'
import { Smartphone, Monitor, CreditCard, MapPin, Phone, Wifi } from 'lucide-react'

const channels = [
  {
    icon: Smartphone,
    title: 'Barclays App',
    desc: 'The award-winning Barclays app — manage your money, pay people, and get spending insights.',
    features: ['Check balances & transactions', 'Send money instantly', 'Freeze/unfreeze your card', 'Set spending limits', 'Mobile PINsentry login', 'Savings goals tracker'],
    badge: 'Most Popular',
  },
  {
    icon: Monitor,
    title: 'Online Banking',
    desc: 'Full banking from your browser — manage accounts, pay bills, and download statements.',
    features: ['View all accounts', 'Set up standing orders', 'Manage Direct Debits', 'Download statements', 'PINsentry authentication', 'Secure messaging'],
  },
  {
    icon: CreditCard,
    title: 'Contactless Payments',
    desc: 'Tap and pay up to £100 per transaction with your Barclays debit or credit card.',
    features: ['Up to £100 per transaction', 'Same fraud protection as Chip & PIN', 'Periodic PIN verification', 'Works at all contactless terminals'],
  },
]

const wallets = [
  { name: 'Apple Pay', desc: 'Pay with your iPhone, Apple Watch, iPad or Mac. Double-click side button and hold near the reader.', devices: 'iPhone, Apple Watch, iPad, Mac' },
  { name: 'Google Pay', desc: 'Add your card to Google Wallet. No contactless limit when paying with your device.', devices: 'Android phones, Wear OS watches' },
]

export default function WaysToBankPage() {
  return (
    <div>
      <div className="bg-barclays-blue text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-blue-300 text-sm mb-4">
            <Link href="/" className="hover:text-white">Home</Link> &rsaquo; Ways to Bank
          </nav>
          <h1 className="text-4xl font-bold mb-3">Ways to bank</h1>
          <p className="text-blue-200 text-lg max-w-2xl">Banking made simple, secure, and always within reach — whether you&apos;re at home or on the go.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Channels */}
        <div className="grid lg:grid-cols-3 gap-6 mb-16">
          {channels.map(c => (
            <div key={c.title} className={`bg-white rounded-lg border ${c.badge ? 'border-barclays-teal shadow-md' : 'border-gray-200'} p-6 card-hover`}>
              {c.badge && <span className="inline-block bg-barclays-teal text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">{c.badge}</span>}
              <c.icon className="text-barclays-teal w-10 h-10 mb-4" />
              <h3 className="text-lg font-bold text-barclays-blue mb-2">{c.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{c.desc}</p>
              <ul className="space-y-2">
                {c.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-barclays-teal font-bold mt-0.5">✓</span>{f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Digital wallets */}
        <h2 className="text-3xl font-bold text-barclays-blue mb-6">Digital wallets</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {wallets.map(w => (
            <div key={w.name} className="bg-barclays-gray-light rounded-xl p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-barclays-blue mb-2">{w.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{w.desc}</p>
              <div className="flex items-center gap-2">
                <Wifi className="text-barclays-teal w-4 h-4" />
                <span className="text-xs text-gray-500">No contactless limit on mobile payments</span>
              </div>
              <p className="text-xs text-gray-400 mt-2">Compatible with: {w.devices}</p>
            </div>
          ))}
        </div>

        {/* Other ways */}
        <h2 className="text-2xl font-bold text-barclays-blue mb-6">Other ways to bank</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { icon: Phone, title: 'Telephone Banking', desc: 'Call 0345 734 5345. Premier: 24/7 UK-based support.' },
            { icon: MapPin, title: 'In branch', desc: 'Visit any of our 800+ branches. Find your nearest.' },
            { icon: CreditCard, title: 'ATMs', desc: '2,000+ ATMs across the UK. Free cash withdrawals.' },
          ].map(o => (
            <div key={o.title} className="bg-white rounded-lg p-5 border border-gray-200 flex gap-4 items-start card-hover">
              <o.icon className="text-barclays-teal w-6 h-6 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-barclays-blue text-sm mb-1">{o.title}</h3>
                <p className="text-gray-500 text-xs">{o.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Security badge */}
        <div className="mt-12 bg-blue-50 border border-blue-100 rounded-xl p-6 flex items-center gap-4">
          <div className="w-14 h-14 bg-barclays-blue rounded-full flex items-center justify-center flex-shrink-0">
            <Wifi className="text-white w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-barclays-blue">Secure Digital Banking Kitemark</h3>
            <p className="text-gray-600 text-sm">Barclays is the only UK bank to have received the Security Digital Banking kitemark for both its app and Online Banking.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
