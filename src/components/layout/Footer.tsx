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
        <div className="flex items-center gap-3 mb-8">
          <Image src="/barclays-eagle.svg" alt="Barclays" width={32} height={36} className="brightness-0 invert opacity-80" />
          <span className="text-white font-bold text-lg tracking-wide opacity-80">Barclays</span>
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

        {/* Legal */}
        <div className="border-t border-blue-700 pt-6">
          <div className="flex flex-wrap gap-4 mb-4">
            {['Legal', 'Privacy Policy', 'Cookies', 'Security', 'Modern Slavery Statement', 'Sitemap'].map((item) => (
              <Link key={item} href="#" className="text-blue-300 hover:text-white text-xs transition-colors">
                {item}
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
