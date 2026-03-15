import Link from 'next/link'
import { Gift, CreditCard, Wifi, Film, ShoppingBag, Percent } from 'lucide-react'

const rewards = [
  { icon: CreditCard, title: 'Cashback on bills', desc: 'Earn cashback when you pay your council tax, water, energy and broadband bills by Direct Debit.' },
  { icon: ShoppingBag, title: 'Retail offers', desc: 'Exclusive discounts and cashback at selected retailers and restaurants.' },
  { icon: Film, title: 'Entertainment perks', desc: 'Two-for-one cinema tickets every week and discounts on dining out.' },
  { icon: Wifi, title: 'Tech & lifestyle', desc: 'Exclusive offers on broadband, mobile phone contracts and streaming services.' },
  { icon: Percent, title: 'Savings boost', desc: 'Higher AER on your Barclays savings when enrolled in Blue Rewards.' },
  { icon: Gift, title: 'Birthday bonus', desc: 'Special reward each year on your birthday — up to £10 bonus cashback.' },
]

export default function BlueRewardsPage() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-br from-barclays-blue to-barclays-blue-light text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-blue-300 text-sm mb-4">
            <Link href="/" className="hover:text-white">Home</Link> &rsaquo; Blue Rewards
          </nav>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block bg-barclays-gold text-barclays-dark text-xs font-semibold px-3 py-1 rounded-full mb-4">
                Loyalty programme
              </span>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                Barclays <span className="text-barclays-teal">Blue Rewards</span>
              </h1>
              <p className="text-blue-200 text-lg mb-6 leading-relaxed">
                Get rewarded just for banking with us. Earn cashback on your bills, enjoy entertainment perks and unlock exclusive offers — for just £5/month.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/apply/blue-rewards" className="barclays-btn-primary">Join Blue Rewards</Link>
                <Link href="#how-it-works" className="barclays-btn-outline-white">How it works</Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm border border-white/20">
                <div className="text-center">
                  <p className="text-blue-300 text-sm mb-2">Your monthly rewards</p>
                  <p className="text-5xl font-bold text-barclays-teal mb-2">£7.50</p>
                  <p className="text-blue-200 text-sm">average monthly cashback earned</p>
                  <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                    {[
                      { val: '£3.50', label: 'Bills cashback' },
                      { val: '£2.50', label: 'Offers used' },
                      { val: '£1.50', label: 'Savings boost' },
                    ].map(s => (
                      <div key={s.label} className="bg-white/10 rounded-lg p-2">
                        <p className="text-white font-bold text-sm">{s.val}</p>
                        <p className="text-blue-300 text-xs">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rewards grid */}
      <div className="bg-barclays-gray-light py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-barclays-blue mb-2 text-center">What you get with Blue Rewards</h2>
          <p className="text-gray-500 text-center mb-10">All for just £5 per month — most members earn more than that back.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rewards.map(r => (
              <div key={r.title} className="bg-white rounded-lg p-6 border border-gray-200 card-hover">
                <div className="w-11 h-11 bg-barclays-teal/10 rounded-full flex items-center justify-center mb-4">
                  <r.icon className="text-barclays-teal w-5 h-5" />
                </div>
                <h3 className="font-bold text-barclays-blue mb-2">{r.title}</h3>
                <p className="text-gray-600 text-sm">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How it works */}
      <div id="how-it-works" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-barclays-blue mb-10 text-center">How it works</h2>
          <div className="space-y-8">
            {[
              { step: '1', title: 'Sign up', desc: 'Join Blue Rewards for £5/month through the Barclays app or Online Banking.' },
              { step: '2', title: 'Set up Direct Debits', desc: 'Pay at least two qualifying bills by Direct Debit from your Barclays current account.' },
              { step: '3', title: 'Earn rewards', desc: 'Cashback is calculated monthly and paid into your account each month.' },
              { step: '4', title: 'Enjoy perks', desc: 'Access exclusive offers, entertainment deals and savings boosts all year round.' },
            ].map(s => (
              <div key={s.step} className="flex items-start gap-5">
                <div className="w-10 h-10 bg-barclays-teal rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  {s.step}
                </div>
                <div>
                  <h3 className="font-bold text-barclays-blue">{s.title}</h3>
                  <p className="text-gray-600 text-sm">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-barclays-blue py-12 text-center text-white">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-3">Ready to start earning?</h2>
          <p className="text-blue-200 mb-6 text-sm">You need a Barclays current account to join Blue Rewards.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/apply/blue-rewards" className="barclays-btn-primary">Join for £5/month</Link>
            <Link href="/personal/accounts" className="barclays-btn-outline-white">Open an account first</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
