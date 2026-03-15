import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl font-bold text-barclays-teal mb-4">404</div>
        <h1 className="text-2xl font-bold text-barclays-blue mb-3">Page not found</h1>
        <p className="text-gray-500 mb-8">Sorry, we couldn&apos;t find the page you were looking for.</p>
        <div className="flex gap-4 justify-center">
          <Link href="/" className="barclays-btn-primary">Go to homepage</Link>
          <Link href="/contact" className="barclays-btn-secondary">Contact us</Link>
        </div>
      </div>
    </div>
  )
}
