import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

type Props = {
  title: string
  description: string
  features: string[]
  cta: string
  ctaHref: string
  badge?: string
  highlight?: boolean
}

export default function ProductCard({ title, description, features, cta, ctaHref, badge, highlight }: Props) {
  return (
    <div className={`bg-white rounded-lg border ${highlight ? 'border-barclays-teal shadow-md' : 'border-gray-200'} p-6 flex flex-col h-full card-hover`}>
      {badge && (
        <span className="inline-block bg-barclays-teal text-white text-xs font-semibold px-3 py-1 rounded-full mb-3 self-start">
          {badge}
        </span>
      )}
      <h3 className="text-lg font-bold text-barclays-blue mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      <ul className="space-y-2 mb-6 flex-1">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
            <span className="text-barclays-teal font-bold mt-0.5">✓</span>
            {f}
          </li>
        ))}
      </ul>
      <Link href={ctaHref} className="barclays-btn-primary text-sm flex items-center justify-center gap-2">
        {cta} <ArrowRight size={16} />
      </Link>
    </div>
  )
}
