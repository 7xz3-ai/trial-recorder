'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, CreditCard, Home, HelpCircle, Shield, Smartphone, Phone, Users, Heart, ChevronDown } from 'lucide-react'

const categories = [
  { icon: CreditCard, title: 'Accounts & Cards', topics: ['Lost or stolen card', 'Order a new card', 'Change my address', 'Close an account', 'Statement requests', 'Card spending limits'] },
  { icon: Smartphone, title: 'App & Online Banking', topics: ['Login help', 'Mobile PINsentry', 'Reset password', 'App not working', 'Set up alerts', 'Enable biometric login'] },
  { icon: Home, title: 'Mortgages & Loans', topics: ['Mortgage rates', 'Overpayment', 'Payment holiday', 'Remortgage', 'Loan repayment', 'Early settlement'] },
  { icon: Shield, title: 'Fraud & Security', topics: ['Report fraud', 'Suspicious email/text', 'Card fraud', 'Identity theft', 'Scam awareness', 'Secure your account'] },
  { icon: Users, title: 'Premier Banking', topics: ['Join Premier', 'Benefits overview', 'Avios Rewards', 'Travel insurance', 'Relationship manager', 'Wealth Hub'] },
  { icon: Heart, title: 'Support & Wellbeing', topics: ['Financial difficulty', 'Bereavement', 'Power of Attorney', 'Accessibility', 'Money management', 'Vulnerable customers'] },
]

const faqs = [
  { q: 'How do I reset my Online Banking password?', a: 'Go to the login page and click "Forgotten your details?". You\'ll need your debit card and PINsentry device or Mobile PINsentry in the app to verify your identity and set a new password.' },
  { q: 'What do I do if my card is lost or stolen?', a: 'Freeze your card immediately in the Barclays app or call 0800 400 100 (24/7). We\'ll cancel the card and send a replacement within 3-5 working days.' },
  { q: 'How do I set up Apple Pay or Google Pay?', a: 'Open the Wallet app on your device, tap the + icon, and follow the prompts to add your Barclays card. You can also set it up through the Barclays app.' },
  { q: 'Can I switch my current account to Barclays?', a: 'Yes! Use the Current Account Switch Service (CASS) through the Barclays app. The switch takes 7 working days and moves all your Direct Debits and standing orders automatically.' },
  { q: 'How do I apply for an overdraft?', a: 'You can apply through the Barclays app or Online Banking. Go to your account, select "Manage overdraft" and follow the steps. Decisions are usually instant.' },
  { q: 'What is PINsentry and how does it work?', a: 'PINsentry is a security device that generates an 8-digit code to verify your identity. You can use the physical card reader or Mobile PINsentry in the Barclays app (no card reader needed).' },
]

export default function HelpCentrePage() {
  const [search, setSearch] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const filteredFaqs = search.length > 2
    ? faqs.filter(f => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()))
    : faqs

  return (
    <div>
      <div className="bg-barclays-blue text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-3">Help &amp; Support</h1>
          <p className="text-blue-200 text-lg mb-6">Find answers, get support, and manage your banking.</p>
          <div className="relative max-w-xl">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search for help... e.g. lost card, login, mortgage"
              className="w-full pl-12 pr-4 py-4 bg-white/10 border border-blue-400 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:border-barclays-teal"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Quick links */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {categories.map(c => (
            <div key={c.title} className="bg-white rounded-lg border border-gray-200 p-5 card-hover">
              <div className="flex items-center gap-3 mb-3">
                <c.icon className="text-barclays-teal w-6 h-6" />
                <h3 className="font-bold text-barclays-blue text-sm">{c.title}</h3>
              </div>
              <ul className="space-y-1.5">
                {c.topics.map(t => (
                  <li key={t}>
                    <Link href="#" className="text-xs text-gray-600 hover:text-barclays-teal transition-colors">
                      {t}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <h2 className="text-2xl font-bold text-barclays-blue mb-6">Frequently asked questions</h2>
        <div className="space-y-3 mb-12">
          {filteredFaqs.map((f, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-barclays-gray-light transition-colors"
              >
                <span className="font-medium text-barclays-blue text-sm pr-4">{f.q}</span>
                <ChevronDown size={18} className={`text-barclays-teal flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4 border-t border-gray-100">
                  <p className="text-gray-600 text-sm pt-3 leading-relaxed">{f.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="bg-barclays-blue rounded-xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Phone className="w-10 h-10 text-barclays-teal" />
            <div>
              <h3 className="font-bold text-lg">Still need help?</h3>
              <p className="text-blue-200 text-sm">Call 0345 734 5345 or send us a secure message.</p>
            </div>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link href="/contact" className="barclays-btn-primary text-sm">Contact us</Link>
            <a href="tel:03457345345" className="barclays-btn-outline-white text-sm">Call now</a>
          </div>
        </div>
      </div>
    </div>
  )
}
