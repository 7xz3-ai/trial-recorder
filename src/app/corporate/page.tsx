import Link from 'next/link'
import { ArrowRight, Globe, TrendingUp, Lock, Users } from 'lucide-react'

const solutions = [
  { title: 'Business Current Account', desc: 'Day-to-day banking for your business with online and mobile access.', href: '/corporate/banking', icon: '🏦' },
  { title: 'Business Finance', desc: 'Loans, invoice finance and asset finance to help your business grow.', href: '/corporate/finance', icon: '📈' },
  { title: 'International Banking', desc: 'Foreign exchange, trade finance and global payments.', href: '/corporate/international', icon: '🌍' },
  { title: 'iPortal', desc: 'Secure single access point for all your corporate banking services.', href: '/corporate/banking#iportal', icon: '🔒' },
]

const stats = [
  { value: '1M+', label: 'Business customers' },
  { value: '£50bn+', label: 'Business lending' },
  { value: '175+', label: 'Countries served' },
  { value: '325', label: 'Years of banking' },
]

export default function CorporatePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-barclays-blue text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <span className="inline-block bg-barclays-teal text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
              Corporate &amp; Business Banking
            </span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
              Banking that works <span className="text-barclays-teal">as hard as you do</span>
            </h1>
            <p className="text-blue-200 text-lg mb-8 leading-relaxed">
              From start-ups to large corporations, Barclays offers the financial solutions and expert guidance to help your business thrive.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/corporate/banking" className="barclays-btn-primary">Explore business banking</Link>
              <Link href="/contact" className="barclays-btn-outline-white">Talk to a specialist</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-barclays-teal py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            {stats.map(s => (
              <div key={s.label}>
                <div className="text-3xl font-bold mb-1">{s.value}</div>
                <div className="text-sm opacity-80">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-barclays-blue mb-2">Our business solutions</h2>
          <p className="text-gray-600 mb-10">Everything your business needs, in one place.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {solutions.map(s => (
              <Link key={s.title} href={s.href} className="group bg-white border border-gray-200 rounded-lg p-6 hover:border-barclays-teal hover:shadow-md transition-all">
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="font-bold text-barclays-blue mb-2 group-hover:text-barclays-teal transition-colors">{s.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{s.desc}</p>
                <span className="text-barclays-teal text-sm font-semibold flex items-center gap-1">
                  Learn more <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-barclays-gray-light py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-barclays-blue mb-10 text-center">Why businesses choose Barclays</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Globe, title: 'Global reach', desc: 'Access international markets and cross-border payment solutions.' },
              { icon: TrendingUp, title: 'Growth funding', desc: 'Flexible finance options to help your business scale.' },
              { icon: Lock, title: 'Secure platform', desc: 'Enterprise-grade security with iPortal single sign-on.' },
              { icon: Users, title: 'Dedicated team', desc: 'Relationship managers who understand your sector.' },
            ].map(f => (
              <div key={f.title} className="text-center">
                <div className="flex justify-center mb-4">
                  <f.icon className="text-barclays-teal w-9 h-9" />
                </div>
                <h3 className="font-semibold text-barclays-blue mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-barclays-blue py-14 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-blue-200 mb-8">Speak to one of our business banking specialists today.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/apply/business-account" className="barclays-btn-primary">Open a business account</Link>
            <Link href="/contact" className="barclays-btn-outline-white">Contact us</Link>
          </div>
        </div>
      </section>
    </>
  )
}
