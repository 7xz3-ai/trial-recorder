import Link from 'next/link'
import Image from 'next/image'

const footerLinks = {
  'Personal Banking': [
    { label: 'Current Accounts', href: '/personal/accounts' },
    { label: 'Mortgages', href: '/personal/mortgages' },
    { label: 'Credit Cards', href: '/personal/credit-cards' },
    { label: 'Personal Loans', href: '/personal/loans' },
    { label: 'Savings', href: '/personal/savings' },
  ],
  'Corporate Banking': [
    { label: 'Business Accounts', href: '/corporate/banking' },
    { label: 'Business Finance', href: '/corporate/finance' },
    { label: 'International Banking', href: '/corporate/international' },
    { label: 'iPortal', href: '/corporate/banking#iportal' },
  ],
  'Help & Support': [
    { label: 'Contact Us', href: '/contact' },
    { label: 'Online Banking Help', href: '/help' },
    { label: 'Fraud Prevention', href: '/help/fraud' },
    { label: 'Accessibility', href: '/help/accessibility' },
  ],
  'About Barclays': [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'News & Media', href: '/news' },
    { label: 'Investor Relations', href: '/investors' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-barclays-blue text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Footer logo */}
        <div className="mb-8">
          <Image src="/barclays-logo.png" alt="Barclays" width={160} height={38} className="rounded" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-sm text-barclays-teal mb-4 uppercase tracking-wide">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-blue-200 hover:text-white text-sm transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* App download */}
        <div className="border-t border-blue-700 pt-8 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-semibold mb-1">Download the Barclays app</p>
              <p className="text-blue-200 text-sm">Manage your money, pay people and much more.</p>
            </div>
            <div className="flex gap-3">
              <div className="bg-black rounded-lg px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-900">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                <div>
                  <div className="text-white text-xs">Download on the</div>
                  <div className="text-white text-sm font-semibold">App Store</div>
                </div>
              </div>
              <div className="bg-black rounded-lg px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-900">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white"><path d="M3.18 23.76c.3.16.65.19.98.09l11.37-6.55-2.5-2.5-9.85 8.96zm-1.3-1.49L1.81 2.3c-.01-.46.22-.88.61-1.11l11.79 11.79-11.79 11.79c-.38-.24-.61-.65-.61-1.11l.07-.39zM22.29 10.7l-2.59-1.49-2.9 2.9 2.9 2.9 2.62-1.52c.74-.43.74-1.56-.03-2zm-18.41 1.3L15.3 1.12 13.17 0 3.18.24C2.5.27 2 .76 2 1.43v.01l.58 10.56z"/></svg>
                <div>
                  <div className="text-white text-xs">Get it on</div>
                  <div className="text-white text-sm font-semibold">Google Play</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social media */}
        <div className="border-t border-blue-700 pt-6 pb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-blue-200 text-sm font-medium">Follow us</p>
          <div className="flex gap-4">
            {[
              { label: 'X (Twitter)', svg: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
              { label: 'LinkedIn', svg: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
              { label: 'Facebook', svg: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
              { label: 'Instagram', svg: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
              { label: 'YouTube', svg: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
            ].map(s => (
              <a key={s.label} href="#" className="w-9 h-9 bg-blue-700 hover:bg-barclays-teal rounded-full flex items-center justify-center transition-colors" aria-label={s.label}>
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d={s.svg}/></svg>
              </a>
            ))}
          </div>
        </div>

        {/* Legal */}
        <div className="border-t border-blue-700 pt-6">
          <div className="flex flex-wrap gap-4 mb-4">
            {[
              { label: 'Legal', href: '#' },
              { label: 'Privacy Policy', href: '#' },
              { label: 'Cookies', href: '#' },
              { label: 'Security', href: '/help/fraud' },
              { label: 'Accessibility', href: '/help/accessibility' },
              { label: 'Modern Slavery Statement', href: '#' },
              { label: 'Sitemap', href: '#' },
            ].map((item) => (
              <Link key={item.label} href={item.href} className="text-blue-300 hover:text-white text-xs transition-colors">
                {item.label}
              </Link>
            ))}
          </div>
          <p className="text-blue-300 text-xs leading-relaxed">
            Barclays Bank UK PLC. Authorised by the Prudential Regulation Authority and regulated by the Financial Conduct Authority
            and the Prudential Regulation Authority (Financial Services Register No. 759676). Registered in England.
            Registered No. 9740322. Registered Office: 1 Churchill Place, London E14 5HP.
          </p>
          <p className="text-blue-400 text-xs mt-2">
            © {new Date().getFullYear()} Barclays. All rights reserved. This is a demonstration replica for educational purposes only.
          </p>
        </div>
      </div>
    </footer>
  )
}
