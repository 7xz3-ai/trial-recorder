import Link from 'next/link'
import { Shield, AlertTriangle, Phone, Mail, Eye, CreditCard, Smartphone, Users } from 'lucide-react'

const scamTypes = [
  {
    icon: Phone,
    title: 'Phone scams (Vishing)',
    desc: 'Fraudsters call pretending to be your bank, HMRC, or police. They may ask you to move money to a "safe account" — there is no such thing.',
    tip: 'Hang up and call us on 0800 400 100 using a different phone.',
  },
  {
    icon: Mail,
    title: 'Email & text scams (Phishing/Smishing)',
    desc: 'Fake emails or texts that look like they\'re from Barclays, asking you to click a link and enter your details.',
    tip: 'Never click links in unexpected messages. We\'ll never ask for your full PIN or password via email or text.',
  },
  {
    icon: CreditCard,
    title: 'Card fraud',
    desc: 'Unauthorised transactions on your debit or credit card, often from data breaches or card skimming.',
    tip: 'Regularly check your statements and set up transaction alerts in the Barclays app.',
  },
  {
    icon: Users,
    title: 'Authorised Push Payment (APP) scams',
    desc: 'You\'re tricked into sending money to a fraudster\'s account — for example, fake invoices, romance scams, or investment fraud.',
    tip: 'Take your time. Genuine organisations will never rush you into sending money.',
  },
  {
    icon: Smartphone,
    title: 'Remote access scams',
    desc: 'Fraudsters ask you to download software so they can "fix" a problem on your computer, then use it to access your banking.',
    tip: 'Never let someone you don\'t know remotely access your device.',
  },
  {
    icon: Eye,
    title: 'Identity theft',
    desc: 'Criminals use your personal information to open accounts, take out credit, or access your existing accounts.',
    tip: 'Shred sensitive documents. Be careful what you share on social media.',
  },
]

export default function FraudPage() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-barclays-blue text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-blue-300 text-sm mb-4">
            <Link href="/" className="hover:text-white">Home</Link> &rsaquo; <Link href="/help/fraud" className="hover:text-white">Help</Link> &rsaquo; Fraud &amp; Security
          </nav>
          <div className="flex items-center gap-4 mb-3">
            <Shield className="w-10 h-10 text-barclays-teal" />
            <h1 className="text-4xl font-bold">Fraud &amp; Security Centre</h1>
          </div>
          <p className="text-blue-200 text-lg max-w-2xl">Learn how to protect yourself from scams and what to do if you think you&apos;ve been a victim.</p>
        </div>
      </div>

      {/* Emergency banner */}
      <div className="bg-red-50 border-y border-red-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-start md:items-center gap-4">
          <AlertTriangle className="text-red-600 w-6 h-6 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-bold text-red-800 text-sm">Think you&apos;ve been scammed?</p>
            <p className="text-red-700 text-xs">Call us immediately on <strong>0800 400 100</strong> (24/7). If you&apos;re abroad, call +44 24 7684 2100.</p>
          </div>
          <a href="tel:08004001000" className="bg-red-600 text-white text-sm font-semibold px-5 py-2 rounded hover:bg-red-700 transition-colors flex items-center gap-2 flex-shrink-0">
            <Phone size={16} /> Call now
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Key principles */}
        <div className="bg-barclays-teal/10 border border-barclays-teal/30 rounded-xl p-8 mb-12">
          <h2 className="text-xl font-bold text-barclays-blue mb-4">Barclays will NEVER:</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              'Ask you to move money to a "safe account"',
              'Send someone to collect your card or cash',
              'Ask for your full PIN or online banking password',
              'Rush you into making a financial decision',
              'Ask you to download remote access software',
              'Send you an email asking you to click a link to verify your identity',
            ].map(item => (
              <div key={item} className="flex items-start gap-2">
                <span className="text-red-500 font-bold mt-0.5">✗</span>
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scam types */}
        <h2 className="text-3xl font-bold text-barclays-blue mb-2">Types of scams</h2>
        <p className="text-gray-500 mb-8">Know what to look out for so you can stay one step ahead.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {scamTypes.map(s => (
            <div key={s.title} className="bg-white rounded-lg border border-gray-200 p-6 card-hover">
              <div className="w-10 h-10 bg-barclays-blue/10 rounded-full flex items-center justify-center mb-4">
                <s.icon className="text-barclays-blue w-5 h-5" />
              </div>
              <h3 className="font-bold text-barclays-blue mb-2">{s.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{s.desc}</p>
              <div className="bg-green-50 border border-green-100 rounded p-3">
                <p className="text-xs text-green-800"><strong>Protection tip:</strong> {s.tip}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Report steps */}
        <div className="bg-barclays-gray-light rounded-xl p-8">
          <h2 className="text-2xl font-bold text-barclays-blue mb-6">How to report fraud</h2>
          <div className="space-y-4">
            {[
              { step: '1', title: 'Contact us immediately', desc: 'Call 0800 400 100 (24/7) or use in-app chat. We\'ll freeze your account to prevent further loss.' },
              { step: '2', title: 'Report to Action Fraud', desc: 'Report the scam to Action Fraud at actionfraud.police.uk or call 0300 123 2040.' },
              { step: '3', title: 'Change your passwords', desc: 'Update your online banking password, email password, and any other accounts that may be compromised.' },
              { step: '4', title: 'Check your credit report', desc: 'Monitor your credit file for any accounts or applications you don\'t recognise.' },
            ].map(s => (
              <div key={s.step} className="flex items-start gap-4 bg-white rounded-lg p-4 border border-gray-100">
                <div className="w-8 h-8 bg-barclays-teal rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">{s.step}</div>
                <div>
                  <h3 className="font-semibold text-barclays-blue text-sm">{s.title}</h3>
                  <p className="text-gray-600 text-xs mt-1">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
