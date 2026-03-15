import Link from 'next/link'
import { Monitor, Keyboard, Volume2, Eye, Type, Smartphone } from 'lucide-react'

const features = [
  { icon: Keyboard, title: 'Keyboard navigation', desc: 'All pages and interactive elements can be accessed using a keyboard alone. Use Tab to navigate, Enter to activate, and Escape to close overlays.' },
  { icon: Volume2, title: 'Screen reader support', desc: 'Our website is compatible with screen readers including JAWS, NVDA, and VoiceOver. We use semantic HTML and ARIA labels throughout.' },
  { icon: Eye, title: 'Colour & contrast', desc: 'Our colour scheme meets WCAG 2.1 AA contrast standards. You can customise colours using your browser or system settings.' },
  { icon: Type, title: 'Text resizing', desc: 'All text can be resized up to 200% without loss of functionality. Use Ctrl/Cmd and + to increase text size in your browser.' },
  { icon: Monitor, title: 'Responsive design', desc: 'Our website adapts to all screen sizes and orientations, ensuring full functionality on desktop, tablet and mobile devices.' },
  { icon: Smartphone, title: 'Barclays app accessibility', desc: 'The Barclays app supports VoiceOver (iOS) and TalkBack (Android), dynamic text sizing, and provides biometric login options.' },
]

export default function AccessibilityPage() {
  return (
    <div>
      <div className="bg-barclays-blue text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-blue-300 text-sm mb-4">
            <Link href="/" className="hover:text-white">Home</Link> &rsaquo; Accessibility
          </nav>
          <h1 className="text-4xl font-bold mb-3">Accessibility</h1>
          <p className="text-blue-200 text-lg max-w-2xl">We&apos;re committed to making our banking services accessible to everyone.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose max-w-none mb-12">
          <p className="text-gray-600 leading-relaxed">
            At Barclays, we believe that banking should be accessible to all of our customers. We continually work to improve the
            accessibility of our digital services, including this website and the Barclays app, following the Web Content Accessibility
            Guidelines (WCAG) 2.1 at Level AA.
          </p>
        </div>

        {/* Features */}
        <h2 className="text-2xl font-bold text-barclays-blue mb-6">Accessibility features</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {features.map(f => (
            <div key={f.title} className="flex gap-4 p-5 bg-white rounded-lg border border-gray-200 card-hover">
              <div className="w-10 h-10 bg-barclays-teal/10 rounded-full flex items-center justify-center flex-shrink-0">
                <f.icon className="text-barclays-teal w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-barclays-blue mb-1 text-sm">{f.title}</h3>
                <p className="text-gray-600 text-sm">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Browsing tools */}
        <div className="bg-barclays-gray-light rounded-xl p-8 mb-12">
          <h2 className="text-xl font-bold text-barclays-blue mb-4">Tools that can help</h2>
          <div className="space-y-4">
            {[
              { name: 'BrowseAloud', desc: 'Text-to-speech and translation toolbar — available on our website.' },
              { name: 'Recite Me', desc: 'Accessibility toolbar with speech, magnification and colour overlays.' },
              { name: 'High-contrast mode', desc: 'Use your operating system\'s built-in high-contrast display settings.' },
              { name: 'Browser zoom', desc: 'Press Ctrl/Cmd + to increase page zoom, Ctrl/Cmd - to decrease.' },
            ].map(t => (
              <div key={t.name} className="flex items-start gap-3 bg-white rounded-lg p-4 border border-gray-100">
                <span className="text-barclays-teal font-bold mt-0.5">✓</span>
                <div>
                  <p className="font-semibold text-barclays-blue text-sm">{t.name}</p>
                  <p className="text-gray-600 text-xs">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* In-branch support */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-8 mb-12">
          <h2 className="text-xl font-bold text-barclays-blue mb-3">In-branch accessibility</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
            {[
              'Hearing loops at all counter positions',
              'Large-print statements available',
              'Braille and audio statements on request',
              'Sign language interpretation via video relay',
              'Step-free access at most branches',
              'Assisted service for customers who need help',
            ].map(item => (
              <p key={item} className="flex items-center gap-2">
                <span className="text-barclays-teal">✓</span> {item}
              </p>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="text-center bg-barclays-blue text-white rounded-xl p-8">
          <h2 className="text-xl font-bold mb-3">Need further assistance?</h2>
          <p className="text-blue-200 text-sm mb-6">
            If you have difficulty accessing any part of our website or app, please contact our dedicated accessibility team.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/contact" className="barclays-btn-primary">Contact us</Link>
            <a href="tel:03457345345" className="barclays-btn-outline-white">Call 0345 734 5345</a>
          </div>
        </div>
      </div>
    </div>
  )
}
