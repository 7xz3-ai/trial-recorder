'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown, User, LogOut } from 'lucide-react'
import { getDemoUser, clearDemoUser, type DemoUser } from '@/lib/demo-auth'

const personalNav = [
  {
    label: 'Current Accounts',
    href: '/personal/accounts',
    children: [
      { label: 'Everyday Banking', href: '/personal/accounts#everyday' },
      { label: 'Premier Banking', href: '/personal/accounts#premier' },
      { label: 'Student Account', href: '/personal/accounts#student' },
      { label: 'Basic Account', href: '/personal/accounts#basic' },
    ],
  },
  {
    label: 'Mortgages',
    href: '/personal/mortgages',
    children: [
      { label: 'First-Time Buyer', href: '/personal/mortgages#first-time' },
      { label: 'Remortgage', href: '/personal/mortgages#remortgage' },
      { label: 'Buy to Let', href: '/personal/mortgages#buy-to-let' },
      { label: 'Mortgage Calculator', href: '/personal/mortgages#calculator' },
    ],
  },
  {
    label: 'Credit Cards',
    href: '/personal/credit-cards',
    children: [
      { label: 'Rewards Cards', href: '/personal/credit-cards#rewards' },
      { label: 'Balance Transfer', href: '/personal/credit-cards#balance-transfer' },
      { label: '0% Purchase', href: '/personal/credit-cards#purchase' },
    ],
  },
  {
    label: 'Loans',
    href: '/personal/loans',
    children: [
      { label: 'Personal Loan', href: '/personal/loans#personal' },
      { label: 'Car Finance', href: '/personal/loans#car' },
      { label: 'Debt Consolidation', href: '/personal/loans#consolidation' },
    ],
  },
  {
    label: 'Savings',
    href: '/personal/savings',
    children: [
      { label: 'Instant Access', href: '/personal/savings#instant' },
      { label: 'Fixed Rate Bonds', href: '/personal/savings#fixed' },
      { label: 'Cash ISA', href: '/personal/savings#isa' },
    ],
  },
]

const corporateNav = [
  {
    label: 'Business Banking',
    href: '/corporate/banking',
    children: [
      { label: 'Business Current Account', href: '/corporate/banking#current' },
      { label: 'iPortal', href: '/corporate/banking#iportal' },
      { label: 'Payments', href: '/corporate/banking#payments' },
    ],
  },
  {
    label: 'Finance',
    href: '/corporate/finance',
    children: [
      { label: 'Business Loans', href: '/corporate/finance#loans' },
      { label: 'Invoice Finance', href: '/corporate/finance#invoice' },
      { label: 'Asset Finance', href: '/corporate/finance#asset' },
    ],
  },
  {
    label: 'International',
    href: '/corporate/international',
    children: [
      { label: 'Foreign Exchange', href: '/corporate/international#fx' },
      { label: 'Trade Finance', href: '/corporate/international#trade' },
      { label: 'Global Payments', href: '/corporate/international#payments' },
    ],
  },
]

export default function Header() {
  const pathname = usePathname()
  const isCorporate = pathname.startsWith('/corporate')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [user, setUser] = useState<DemoUser | null>(null)

  const nav = isCorporate ? corporateNav : personalNav

  useEffect(() => {
    setUser(getDemoUser())
  }, [pathname])

  const handleLogout = () => {
    clearDemoUser()
    setUser(null)
    window.location.href = '/'
  }

  return (
    <header className="bg-barclays-blue sticky top-0 z-50 shadow-md">
      {/* Top utility bar */}
      <div className="bg-barclays-blue border-b border-blue-800">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-10">
          <div className="flex items-center gap-4 text-xs text-blue-200">
            <Link href="/" className={`hover:text-white ${!isCorporate ? 'text-white font-semibold border-b border-barclays-teal' : ''}`}>
              Personal
            </Link>
            <Link href="/corporate" className={`hover:text-white ${isCorporate ? 'text-white font-semibold border-b border-barclays-teal' : ''}`}>
              Corporate
            </Link>
            <Link href="/contact" className="hover:text-white">Contact us</Link>
          </div>
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <Link href="/dashboard" className="flex items-center gap-1 text-xs text-white hover:text-barclays-teal">
                  <User size={14} />
                  <span>{user.name}</span>
                </Link>
                <button onClick={handleLogout} className="flex items-center gap-1 text-xs text-blue-200 hover:text-white">
                  <LogOut size={14} />
                  <span>Sign out</span>
                </button>
              </div>
            ) : (
              <Link href="/auth/login" className="text-xs text-white bg-barclays-teal hover:bg-barclays-teal-dark px-3 py-1 rounded transition-colors">
                Online Banking Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={isCorporate ? '/corporate' : '/'} className="flex items-center gap-3">
            <Image src="/barclays-eagle.svg" alt="Barclays" width={38} height={42} className="brightness-0 invert" />
            <span className="text-white font-bold text-xl tracking-wide">Barclays</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {nav.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1 text-white text-sm px-3 py-5 hover:text-barclays-teal transition-colors"
                >
                  {item.label}
                  <ChevronDown size={14} className={`transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`} />
                </Link>
                {openDropdown === item.label && (
                  <div className="absolute top-full left-0 bg-white shadow-xl border-t-2 border-barclays-teal min-w-[200px] z-50">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block px-4 py-3 text-sm text-barclays-dark hover:bg-barclays-gray-light hover:text-barclays-blue border-b border-gray-100 last:border-0"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-barclays-blue border-t border-blue-700">
          {nav.map((item) => (
            <div key={item.label}>
              <button
                className="w-full flex items-center justify-between px-4 py-3 text-white text-sm border-b border-blue-700"
                onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
              >
                {item.label}
                <ChevronDown size={14} className={`transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`} />
              </button>
              {openDropdown === item.label && (
                <div className="bg-blue-800">
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      className="block px-8 py-2 text-sm text-blue-100 hover:text-white border-b border-blue-700"
                      onClick={() => setMobileOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="px-4 py-3">
            {user ? (
              <button onClick={handleLogout} className="w-full barclays-btn-primary text-sm">
                Sign out ({user.name})
              </button>
            ) : (
              <Link href="/auth/login" className="w-full barclays-btn-primary text-sm block" onClick={() => setMobileOpen(false)}>
                Online Banking Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
