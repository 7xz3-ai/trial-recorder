'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { ArrowRight, Shield, Smartphone, Clock, Award, ChevronLeft, ChevronRight } from 'lucide-react'
import ProductCard from '@/components/ui/ProductCard'

const heroSlides = [
  {
    badge: 'Switch offer — Earn £175',
    title: <>Banking built<br />around <span className="text-barclays-teal">you</span></>,
    desc: 'Switch to Barclays and get £175 when you use our app to open a Premier Current Account and complete a full switch by 30 April 2026.',
    cta: { label: 'Switch & get £175', href: '/apply/premier-account' },
    secondary: { label: 'View all accounts', href: '/personal/accounts' },
    note: 'T&Cs apply. Eligibility criteria apply.',
  },
  {
    badge: 'Premier — Earn £400',
    title: <>Switch to <span className="text-barclays-gold">Premier</span><br />and earn £400</>,
    desc: 'Open a Premier Current Account using the Barclays app and complete a full switch by 30 April 2026 to earn £400.',
    cta: { label: 'Switch & get £400', href: '/apply/premier-account' },
    secondary: { label: 'Premier benefits', href: '/personal/premier' },
    note: 'Income of £75,000+ or £100,000+ in savings/investments required.',
  },
  {
    badge: 'Bank Account — Earn £200',
    title: <>Switch your<br /><span className="text-barclays-teal">current account</span></>,
    desc: 'Open a Barclays Bank Account using the app and complete a full switch. Earn £200 when you meet the criteria by 30 April 2026.',
    cta: { label: 'Switch & get £200', href: '/apply/current-account' },
    secondary: { label: 'Compare accounts', href: '/personal/accounts' },
    note: 'Must pay in £800+ per month. T&Cs apply.',
  },
  {
    badge: 'ISA Season',
    title: <>Use your <span className="text-barclays-teal">£20,000</span><br />ISA allowance</>,
    desc: 'Don\'t miss the ISA deadline — 5 April 2026. Transfer your ISA to Barclays and earn up to £600. Premier customers get even more.',
    cta: { label: 'Open an ISA', href: '/personal/isas' },
    secondary: { label: 'Transfer an ISA', href: '/apply/isa-transfer' },
    note: 'Unused ISA allowance doesn\'t carry over to next year.',
  },
]

const products = [
  {
    title: 'Barclays Current Account',
    description: 'Our everyday current account with no monthly fee.',
    features: ['No monthly account fee', 'Free UK transactions', 'Barclays mobile app', 'Apple Pay & Google Pay'],
    cta: 'Apply now',
    ctaHref: '/apply/current-account',
  },
  {
    title: 'Premier Current Account',
    description: 'Premium banking for those who earn £75,000+ or have £100,000+ in savings.',
    features: ['Dedicated relationship manager', 'Preferential mortgage rates', 'Worldwide travel insurance', 'Airport lounge access'],
    cta: 'Apply now',
    ctaHref: '/apply/premier-account',
    badge: 'Most Popular',
    highlight: true,
  },
  {
    title: 'Barclays Rewards Card',
    description: 'Earn rewards on every purchase with 0% interest for 12 months.',
    features: ['0.5% cashback on purchases', '0% on purchases for 12 months', 'Contactless payments', 'Fraud protection'],
    cta: 'Apply now',
    ctaHref: '/apply/rewards-card',
  },
]

const reasons = [
  { icon: Shield, title: 'Secure banking', desc: 'Advanced fraud protection and secure app authentication.' },
  { icon: Smartphone, title: 'Mobile first', desc: 'Manage everything from the award-winning Barclays app.' },
  { icon: Clock, title: '24/7 support', desc: 'Our UK-based team is here whenever you need us.' },
  { icon: Award, title: 'Award-winning', desc: "Consistently rated one of the UK's best banks." },
]

export default function PersonalHomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % heroSlides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + heroSlides.length) % heroSlides.length)
  }, [])

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(nextSlide, 6000)
    return () => clearInterval(timer)
  }, [isPaused, nextSlide])

  const slide = heroSlides[currentSlide]

  return (
    <>
      {/* Hero Carousel */}
      <section
        className="bg-barclays-blue text-white relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center min-h-[500px]">
          <div key={currentSlide} className="animate-fade-in">
            <span className="inline-block bg-barclays-teal text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
              {slide.badge}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              {slide.title}
            </h1>
            <p className="text-blue-200 text-lg mb-8 leading-relaxed">
              {slide.desc}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href={slide.cta.href} className="barclays-btn-primary">
                {slide.cta.label}
              </Link>
              <Link href={slide.secondary.href} className="barclays-btn-outline-white">
                {slide.secondary.label}
              </Link>
            </div>
            <p className="text-blue-300 text-xs mt-4">{slide.note}</p>
          </div>
          <div className="hidden md:flex justify-center">
            <div className="w-64 h-[500px] bg-barclays-blue-light rounded-[2.5rem] border-4 border-blue-400 shadow-2xl flex flex-col overflow-hidden">
              <div className="bg-barclays-teal h-12 flex items-center justify-center">
                <span className="text-white font-semibold text-sm">Barclays</span>
              </div>
              <div className="flex-1 bg-barclays-gray-light p-4 space-y-3">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-xs text-gray-500">Current Account</p>
                  <p className="text-2xl font-bold text-barclays-blue">£4,821.50</p>
                  <p className="text-xs text-green-600">Available: £4,521.50</p>
                </div>
                {[
                  { name: 'TESCO STORES', amt: '-£42.18', credit: false },
                  { name: 'SALARY', amt: '+£3,200', credit: true },
                  { name: 'AMAZON.CO.UK', amt: '-£29.99', credit: false },
                ].map((t) => (
                  <div key={t.name} className="bg-white rounded p-3 shadow-sm flex justify-between items-center">
                    <span className="text-xs text-gray-700">{t.name}</span>
                    <span className={`text-xs font-semibold ${t.credit ? 'text-green-600' : 'text-red-500'}`}>{t.amt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Carousel controls */}
        <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors" aria-label="Previous slide">
          <ChevronLeft size={24} />
        </button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors" aria-label="Next slide">
          <ChevronRight size={24} />
        </button>

        {/* Slide indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-3 h-3 rounded-full transition-all ${i === currentSlide ? 'bg-barclays-teal w-8' : 'bg-white/40 hover:bg-white/60'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ISA Transfer Promotion Banner */}
      <section className="bg-barclays-gold py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-barclays-dark text-sm font-medium text-center sm:text-left">
            <strong>ISA deadline approaching:</strong> Use your £20,000 tax-free allowance before 5 April 2026. Transfer & earn up to £600.
          </p>
          <Link href="/personal/isas" className="bg-barclays-blue text-white text-sm font-semibold px-5 py-2 rounded hover:bg-barclays-blue-light transition-colors flex-shrink-0">
            View ISAs
          </Link>
        </div>
      </section>

      {/* Products */}
      <section className="bg-barclays-gray-light py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-barclays-blue mb-2">Popular products</h2>
          <p className="text-gray-600 mb-8">Find the right account, card or loan for you.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {products.map((p) => (
              <ProductCard key={p.title} {...p} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/personal/accounts" className="barclays-btn-secondary">
              View all products
            </Link>
          </div>
        </div>
      </section>

      {/* Why Barclays */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-barclays-blue mb-2 text-center">Why choose Barclays?</h2>
          <p className="text-gray-500 text-center mb-10">Over 325 years of helping people with their money.</p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {reasons.map((r) => (
              <div key={r.title} className="text-center">
                <div className="flex justify-center mb-4">
                  <r.icon className="text-barclays-teal w-8 h-8" />
                </div>
                <h3 className="font-semibold text-barclays-blue mb-2">{r.title}</h3>
                <p className="text-gray-500 text-sm">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fraud alert */}
      <section className="bg-blue-50 border-y border-blue-100 py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-6">
          <Shield className="text-barclays-blue w-10 h-10 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="font-bold text-barclays-blue">Protect yourself from scams</h3>
            <p className="text-gray-600 text-sm mt-1">
              Barclays will never ask you to move money to a &quot;safe account&quot;. Learn how to spot and avoid Authorised Push Payment (APP) scams.
            </p>
          </div>
          <Link href="/help/fraud" className="barclays-btn-secondary text-sm flex-shrink-0 flex items-center gap-1">
            Learn more <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* App download */}
      <section className="bg-barclays-blue py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-3">Get the Barclays app</h2>
          <p className="text-blue-200 mb-8">Pay people, manage your account and get spending insights — all in one place.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            {['App Store', 'Google Play'].map((store) => (
              <div key={store} className="bg-black rounded-xl px-5 py-3 flex items-center gap-3 cursor-pointer hover:bg-gray-900 transition-colors">
                <span className="text-white text-sm">
                  <span className="block text-xs opacity-70">Download on the</span>
                  <span className="font-semibold">{store}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
