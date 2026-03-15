import Link from 'next/link'
import { Gem, Users, Globe, TrendingUp, Shield, Building } from 'lucide-react'

const services = [
  { icon: Users, title: 'Dedicated Wealth Manager', desc: 'A personal wealth manager who understands your ambitions and creates bespoke financial plans.' },
  { icon: TrendingUp, title: 'Investment Solutions', desc: 'Access to a wide range of investment products including discretionary and advisory portfolios.' },
  { icon: Building, title: 'Wealth Banking', desc: 'Premium banking with Barclays One — manage your wealth online 24/7.' },
  { icon: Globe, title: 'International Services', desc: 'Multi-currency accounts, international transfers, and global investment opportunities.' },
  { icon: Shield, title: 'Estate & Tax Planning', desc: 'Specialist guidance on inheritance, tax efficiency, and protecting your wealth for future generations.' },
  { icon: Gem, title: 'Exclusive Credit', desc: 'Tailored lending solutions including bespoke mortgages, Lombard lending, and premium credit cards.' },
]

export default function WealthPage() {
  return (
    <div>
      <div className="bg-gradient-to-br from-[#001a2e] to-barclays-blue text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-blue-300 text-sm mb-4">
            <Link href="/" className="hover:text-white">Home</Link> &rsaquo; Wealth Management
          </nav>
          <span className="inline-block bg-white/10 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 border border-white/20">WEALTH MANAGEMENT</span>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 max-w-2xl">
            A personal approach to managing your <span className="text-barclays-teal">wealth</span>
          </h1>
          <p className="text-blue-200 text-lg mb-8 max-w-2xl leading-relaxed">
            Barclays Wealth Management offers a proactive, personal service — taking the time to understand your ambitions and creating unique solutions for every stage of your life.
          </p>
          <Link href="/contact" className="barclays-btn-primary">Speak to a Wealth Manager</Link>
        </div>
      </div>

      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-barclays-blue mb-10 text-center">Our services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(s => (
              <div key={s.title} className="bg-barclays-gray-light rounded-lg p-6 card-hover border border-gray-100">
                <s.icon className="text-barclays-teal w-8 h-8 mb-4" />
                <h3 className="font-bold text-barclays-blue mb-2">{s.title}</h3>
                <p className="text-gray-600 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-barclays-gray-light py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-barclays-blue mb-4">Who we serve</h2>
          <p className="text-gray-600 mb-8">Wealth Management is designed for clients with investable assets of £500,000 or more.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Entrepreneurs', desc: 'Business owners looking to protect and grow personal wealth.' },
              { title: 'Professionals', desc: 'High-earning individuals seeking expert financial guidance.' },
              { title: 'Families', desc: 'Multi-generational wealth planning and inheritance solutions.' },
            ].map(w => (
              <div key={w.title} className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="font-bold text-barclays-blue mb-2">{w.title}</h3>
                <p className="text-gray-500 text-sm">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-barclays-blue py-12 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-3">Get in touch</h2>
          <p className="text-blue-200 text-sm mb-6">Your wealth manager will develop a bespoke financial plan tailored to your goals.</p>
          <Link href="/contact" className="barclays-btn-primary">Request a consultation</Link>
        </div>
      </div>
    </div>
  )
}
