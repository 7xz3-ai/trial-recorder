import Link from 'next/link'
import { Crown, Shield, Plane, Phone, TrendingUp, CreditCard, Tv, Award } from 'lucide-react'

const benefits = [
  { icon: TrendingUp, title: 'Exclusive rates', desc: 'Preferential savings rates, mortgage deals and overdraft interest-free up to £500.' },
  { icon: Plane, title: 'Avios Rewards', desc: 'Collect Avios points for British Airways flights for £12/month. Bonus 7,000 points each year.' },
  { icon: Tv, title: 'Free Apple TV+', desc: 'Complimentary Apple TV+ subscription worth £9.99/month included with Premier.' },
  { icon: Phone, title: '24/7 UK support', desc: 'Speak to our UK-based Premier Telephone Banking team anytime, day or night.' },
  { icon: Shield, title: 'Higher limits', desc: 'Withdraw up to £2,000/day. Higher payment limits in Online Banking and the app.' },
  { icon: CreditCard, title: 'Premier debit card', desc: 'Distinctive black Premier debit card with worldwide acceptance.' },
  { icon: Award, title: 'Wealth Hub access', desc: 'Manage all your finances in one place through the Barclays app Wealth Hub.' },
  { icon: Crown, title: 'Exclusive events', desc: 'Early-access tickets, exclusive events, and lifestyle experiences.' },
]

const addOns = [
  { name: 'Travel Insurance', price: 'From £8/month', desc: 'Worldwide family cover for holidays and trips.' },
  { name: 'RAC Breakdown Cover', price: 'From £6/month', desc: 'Roadside assistance and vehicle recovery.' },
  { name: 'Gadget Insurance', price: 'From £15/month', desc: 'Cover for phones, tablets, laptops and wearables.' },
]

export default function PremierPage() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-br from-barclays-blue to-[#001a2e] text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-blue-300 text-sm mb-4">
            <Link href="/" className="hover:text-white">Home</Link> &rsaquo; Premier Banking
          </nav>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block bg-barclays-gold text-barclays-dark text-xs font-bold px-3 py-1 rounded-full mb-4">PREMIER BANKING</span>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                Banking that goes <span className="text-barclays-gold">further</span>
              </h1>
              <p className="text-blue-200 text-lg mb-6 leading-relaxed">
                Exclusive rates, dedicated support, and premium perks — for customers earning £75,000+ or with £100,000+ in savings and investments.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/apply/premier-account" className="bg-barclays-gold text-barclays-dark font-semibold px-6 py-3 rounded hover:bg-yellow-400 transition-colors">
                  Join Premier Banking
                </Link>
                <Link href="#benefits" className="barclays-btn-outline-white">View benefits</Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 shadow-2xl aspect-video flex flex-col justify-between border border-gray-700">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest">Premier Current Account</p>
                    <p className="font-semibold mt-1 text-barclays-gold">Barclays Premier</p>
                  </div>
                  <Crown className="text-barclays-gold w-8 h-8" />
                </div>
                <div>
                  <p className="font-mono text-lg tracking-widest mb-3 text-gray-300">•••• •••• •••• 9001</p>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>PREMIER MEMBER</span>
                    <span>VALID THRU 12/28</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Switch offer */}
      <div className="bg-barclays-gold py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-bold text-barclays-dark text-lg">Switch & get £400</p>
            <p className="text-barclays-dark/80 text-sm">Open a Premier Account, switch with CASS and deposit £4,000 by 30 April 2026.</p>
          </div>
          <Link href="/apply/premier-account" className="bg-barclays-blue text-white font-semibold px-6 py-2.5 rounded hover:bg-barclays-blue-light transition-colors text-sm flex-shrink-0">
            Switch now
          </Link>
        </div>
      </div>

      {/* Eligibility */}
      <div className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-barclays-blue mb-4">Am I eligible?</h2>
          <p className="text-gray-600 mb-8">You need a Barclays current account and one of the following:</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-barclays-gray-light rounded-xl p-6 border-2 border-barclays-teal">
              <p className="text-4xl font-bold text-barclays-blue mb-2">£75,000+</p>
              <p className="text-gray-600 text-sm">Gross annual income paid into your Barclays account</p>
            </div>
            <div className="bg-barclays-gray-light rounded-xl p-6 border-2 border-barclays-teal">
              <p className="text-4xl font-bold text-barclays-blue mb-2">£100,000+</p>
              <p className="text-gray-600 text-sm">In savings, eligible investments, or a combination of both</p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div id="benefits" className="bg-barclays-gray-light py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-barclays-blue mb-2 text-center">Premier benefits</h2>
          <p className="text-gray-500 text-center mb-10">Everything included with your Premier Current Account.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map(b => (
              <div key={b.title} className="bg-white rounded-lg p-6 border border-gray-200 card-hover">
                <b.icon className="text-barclays-teal w-8 h-8 mb-4" />
                <h3 className="font-bold text-barclays-blue mb-2 text-sm">{b.title}</h3>
                <p className="text-gray-600 text-xs">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add-ons */}
      <div className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-barclays-blue mb-6 text-center">Optional add-ons</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {addOns.map(a => (
              <div key={a.name} className="bg-barclays-gray-light rounded-lg p-6 text-center border border-gray-200">
                <h3 className="font-bold text-barclays-blue mb-1">{a.name}</h3>
                <p className="text-barclays-teal font-semibold text-sm mb-2">{a.price}</p>
                <p className="text-gray-500 text-xs">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-barclays-blue py-12 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-3">Ready to go Premier?</h2>
          <p className="text-blue-200 text-sm mb-6">Join over 1 million customers who enjoy Premier Banking.</p>
          <Link href="/apply/premier-account" className="bg-barclays-gold text-barclays-dark font-semibold px-8 py-3 rounded hover:bg-yellow-400 transition-colors inline-block">
            Apply for Premier
          </Link>
        </div>
      </div>
    </div>
  )
}
