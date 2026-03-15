'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown, User, LogOut, Search } from 'lucide-react'
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
    label: 'Savings & ISAs',
    href: '/personal/savings',
    children: [
      { label: 'Savings Accounts', href: '/personal/savings' },
      { label: 'Cash ISAs', href: '/personal/isas' },
      { label: 'Investments', href: '/personal/investments' },
      { label: 'Overdrafts', href: '/personal/overdrafts' },
    ],
  },
  {
    label: 'Barclaycard',
    href: '/personal/barclaycard',
    children: [
      { label: 'Avios Plus', href: '/personal/barclaycard#avios' },
      { label: 'Rewards Card', href: '/personal/barclaycard#rewards' },
      { label: 'Platinum 0%', href: '/personal/barclaycard#platinum' },
      { label: 'Credit Builder', href: '/personal/barclaycard#forward' },
    ],
  },
  {
    label: 'Insurance',
    href: '/personal/insurance',
    children: [
      { label: 'Home Insurance', href: '/personal/insurance#home' },
      { label: 'Car Insurance', href: '/personal/insurance#car' },
      { label: 'Life Insurance', href: '/personal/insurance#life' },
      { label: 'Travel Insurance', href: '/personal/insurance#travel' },
    ],
  },
  {
    label: 'More',
    href: '/personal/ways-to-bank',
    children: [
      { label: 'Premier Banking', href: '/personal/premier' },
      { label: 'Wealth Management', href: '/personal/wealth' },
      { label: 'Ways to Bank', href: '/personal/ways-to-bank' },
      { label: 'Help & Support', href: '/help/centre' },
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
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

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
          <Link href={isCorporate ? '/corporate' : '/'} className="flex items-center">
            <Image src="/barclays-logo.png" alt="Barclays" width={180} height={44} className="brightness-0 invert" />
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

          {/* Search button */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="text-white p-2 hover:text-barclays-teal transition-colors"
            aria-label="Search"
          >
            <Search size={20} />
          </button>

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
      {/* Search overlay */}
      {searchOpen && (
        <div className="bg-barclays-blue-light border-t border-blue-700">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="relative">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search Barclays... e.g. mortgages, credit cards, ISA"
                className="w-full pl-12 pr-12 py-4 bg-white/10 border border-blue-500 rounded-xl text-white placeholder-blue-300 text-lg focus:outline-none focus:border-barclays-teal focus:bg-white/15"
              />
              <button onClick={() => { setSearchOpen(false); setSearchQuery('') }} className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-300 hover:text-white">
                <X size={20} />
              </button>
            </div>
            {searchQuery.length > 1 && (
              <div className="mt-3 bg-white rounded-lg shadow-lg overflow-hidden">
                {[
                  { label: 'Current Accounts', href: '/personal/accounts' },
                  { label: 'Mortgages', href: '/personal/mortgages' },
                  { label: 'Credit Cards', href: '/personal/credit-cards' },
                  { label: 'Barclaycard', href: '/personal/barclaycard' },
                  { label: 'Personal Loans', href: '/personal/loans' },
                  { label: 'Savings', href: '/personal/savings' },
                  { label: 'ISAs', href: '/personal/isas' },
                  { label: 'Investments', href: '/personal/investments' },
                  { label: 'Overdrafts', href: '/personal/overdrafts' },
                  { label: 'Insurance', href: '/personal/insurance' },
                  { label: 'Premier Banking', href: '/personal/premier' },
                  { label: 'Wealth Management', href: '/personal/wealth' },
                  { label: 'Ways to Bank', href: '/personal/ways-to-bank' },
                  { label: 'Help & Support', href: '/help/centre' },
                  { label: 'Business Banking', href: '/corporate/banking' },
                  { label: 'Blue Rewards', href: '/personal/blue-rewards' },
                  { label: 'Contact Us', href: '/contact' },
                  { label: 'Fraud & Security', href: '/help/fraud' },
                ].filter(r => r.label.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5).map(r => (
                  <Link
                    key={r.label}
                    href={r.href}
                    onClick={() => { setSearchOpen(false); setSearchQuery('') }}
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-barclays-gray-light hover:text-barclays-blue border-b border-gray-50 last:border-0"
                  >
                    <Search size={14} className="inline mr-2 text-gray-400" />
                    {r.label}
                  </Link>
                ))}
                {[].length === 0 && (
                  <p className="px-4 py-3 text-sm text-gray-400">No results found</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
