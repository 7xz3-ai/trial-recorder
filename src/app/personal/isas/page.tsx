import Link from 'next/link'
import { AlertCircle } from 'lucide-react'
import ProductCard from '@/components/ui/ProductCard'

const isas = [
  { title: 'Cash ISA', description: 'Flexible, tax-free savings with instant access.', features: ['3.25% AER (variable)', 'Tax-free interest', 'Instant access', 'FSCS protected', '£20,000 annual allowance'], cta: 'Open Cash ISA', ctaHref: '/apply/cash-isa' },
  { title: '1-Year Flexible Cash ISA', description: 'Fixed rate for 12 months with up to 3 penalty-free withdrawals.', features: ['3.80% AER (fixed)', 'Up to 3 penalty-free withdrawals', '10% of balance per withdrawal', 'Tax-free interest', 'FSCS protected'], cta: 'Open ISA', ctaHref: '/apply/flexible-isa', badge: 'Best Rate', highlight: true },
  { title: 'Premier 1-Year Flexible Cash ISA', description: 'Exclusive higher rate for Premier customers.', features: ['3.85% AER (fixed)', 'Premier exclusive', 'Up to 3 penalty-free withdrawals', 'Tax-free interest', 'FSCS protected'], cta: 'Open ISA', ctaHref: '/apply/premier-isa', badge: 'Premier' },
  { title: 'Reward ISA', description: 'Earn a bonus on top of your interest when you save regularly.', features: ['Bonus for regular saving', 'Tax-free interest', 'Monthly contributions', 'FSCS protected'], cta: 'Open Reward ISA', ctaHref: '/apply/reward-isa' },
]

export default function ISAPage() {
  return (
    <div>
      <div className="bg-barclays-blue text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-blue-300 text-sm mb-4">
            <Link href="/" className="hover:text-white">Home</Link> &rsaquo; ISAs
          </nav>
          <h1 className="text-4xl font-bold mb-3">ISA Savings</h1>
          <p className="text-blue-200 text-lg max-w-2xl">Save up to £20,000 per year tax-free with a Barclays ISA.</p>
        </div>
      </div>

      {/* ISA deadline banner */}
      <div className="bg-barclays-gold py-4">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-3">
          <AlertCircle className="text-barclays-dark w-5 h-5 flex-shrink-0" />
          <p className="text-barclays-dark text-sm font-medium">
            <strong>ISA deadline:</strong> Use your £20,000 tax-free allowance before 5 April 2026. Don&apos;t miss out — unused allowance doesn&apos;t carry over.
          </p>
        </div>
      </div>

      {/* ISA transfer offer */}
      <div className="bg-barclays-teal/10 border-b border-barclays-teal/30">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-bold text-barclays-blue">Transfer your ISA & earn up to £600</p>
            <p className="text-gray-600 text-sm">Transfer £10,000+ from another provider by 30 April 2026. Premier customers earn up to £600.</p>
          </div>
          <Link href="/apply/isa-transfer" className="barclays-btn-primary text-sm flex-shrink-0">Transfer an ISA</Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {isas.map(i => <ProductCard key={i.title} {...i} />)}
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 text-sm text-gray-600">
          <strong>What is an ISA?</strong> An Individual Savings Account lets you earn interest tax-free. You won&apos;t pay income tax on ISA interest, and it doesn&apos;t count towards your Personal Savings Allowance. You can save up to £20,000 across all ISAs each tax year. FSCS protection covers eligible deposits up to £85,000.
        </div>
      </div>
    </div>
  )
}
