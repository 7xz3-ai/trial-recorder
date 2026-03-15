import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface Product {
  title: string
  desc: string
  href: string
}

interface Props {
  heading?: string
  products: Product[]
}

export default function RelatedProducts({ heading = 'You might also be interested in', products }: Props) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
      <h3 className="text-xl font-bold text-barclays-blue mb-6">{heading}</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(p => (
          <Link
            key={p.title}
            href={p.href}
            className="group bg-barclays-gray-light rounded-lg p-5 hover:shadow-md transition-shadow border border-transparent hover:border-barclays-teal"
          >
            <h4 className="font-bold text-barclays-blue text-sm mb-1 group-hover:text-barclays-teal transition-colors">{p.title}</h4>
            <p className="text-gray-500 text-xs mb-3 leading-relaxed">{p.desc}</p>
            <span className="text-barclays-teal text-xs font-medium flex items-center gap-1">
              Learn more <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
