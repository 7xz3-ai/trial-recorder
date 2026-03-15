'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MapPin, Clock, Phone, Search, Navigation } from 'lucide-react'

const BRANCHES = [
  { id: 1, name: 'Barclays Leicester Square', address: '28 Leicester Square, London WC2H 7LE', phone: '0345 734 5345', distance: '0.2 mi', lat: 51.5103, lng: -0.1301, hours: 'Mon–Fri: 9am–5pm, Sat: 9am–4pm', services: ['Cash machines', 'Mortgage adviser', 'Business banking', 'Accessibility'] },
  { id: 2, name: 'Barclays Piccadilly', address: '156 Piccadilly, London W1J 9AE', phone: '0345 734 5345', distance: '0.4 mi', lat: 51.5079, lng: -0.1417, hours: 'Mon–Fri: 9am–5pm, Sat: 10am–3pm', services: ['Cash machines', 'Premier lounge', 'Foreign currency'] },
  { id: 3, name: 'Barclays Oxford Street', address: '280 Oxford Street, London W1C 1DS', phone: '0345 734 5345', distance: '0.5 mi', lat: 51.5155, lng: -0.1443, hours: 'Mon–Fri: 9am–5:30pm, Sat: 9am–5pm', services: ['Cash machines', 'Business banking', 'Accessibility'] },
  { id: 4, name: 'Barclays Canary Wharf', address: '1 Churchill Place, London E14 5HP', phone: '0345 734 5345', distance: '3.2 mi', lat: 51.5054, lng: -0.0235, hours: 'Mon–Fri: 8am–6pm', services: ['Cash machines', 'Premier lounge', 'Mortgage adviser', 'Business banking', 'Foreign currency'] },
  { id: 5, name: 'Barclays Kensington', address: '160 Kensington High Street, London W8 7RG', phone: '0345 734 5345', distance: '2.1 mi', lat: 51.5008, lng: -0.1918, hours: 'Mon–Fri: 9am–5pm, Sat: 9am–4pm', services: ['Cash machines', 'Mortgage adviser', 'Accessibility'] },
  { id: 6, name: 'Barclays City of London', address: '54 Lombard Street, London EC3V 9EX', phone: '0345 734 5345', distance: '2.5 mi', lat: 51.5127, lng: -0.0870, hours: 'Mon–Fri: 8am–6pm', services: ['Cash machines', 'Business banking', 'Premier lounge', 'Foreign currency'] },
]

export default function BranchFinderPage() {
  const [search, setSearch] = useState('')
  const [selectedBranch, setSelectedBranch] = useState<number | null>(null)

  const filtered = search.length > 0
    ? BRANCHES.filter(b => b.name.toLowerCase().includes(search.toLowerCase()) || b.address.toLowerCase().includes(search.toLowerCase()))
    : BRANCHES

  return (
    <div>
      <div className="bg-barclays-blue text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-blue-300 text-sm mb-4">
            <Link href="/" className="hover:text-white">Home</Link> &rsaquo; Branch Finder
          </nav>
          <h1 className="text-4xl font-bold mb-3">Find a branch or ATM</h1>
          <p className="text-blue-200 text-lg">Over 800 branches and 2,000+ ATMs across the UK.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Enter postcode, town or city..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-barclays-teal focus:ring-1 focus:ring-barclays-teal"
              />
            </div>
            <button className="barclays-btn-primary flex items-center gap-2 py-3 text-sm">
              <Navigation size={16} /> Find branches
            </button>
          </div>
          <div className="flex gap-3 mt-3 flex-wrap">
            {['Open now', 'Cash machine', 'Mortgage adviser', 'Business banking', 'Foreign currency'].map(f => (
              <label key={f} className="flex items-center gap-1.5 text-xs text-gray-600 cursor-pointer">
                <input type="checkbox" className="accent-barclays-teal" />
                {f}
              </label>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Map placeholder */}
          <div className="bg-gray-100 rounded-xl border border-gray-200 flex items-center justify-center h-[500px] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-gray-100">
              {/* Simplified map illustration */}
              <div className="absolute inset-0 opacity-20">
                {BRANCHES.map((b) => (
                  <div
                    key={b.id}
                    className={`absolute w-3 h-3 rounded-full cursor-pointer transition-all ${selectedBranch === b.id ? 'bg-barclays-teal w-5 h-5 ring-4 ring-barclays-teal/30' : 'bg-barclays-blue hover:bg-barclays-teal'}`}
                    style={{ top: `${30 + (b.id * 12)}%`, left: `${20 + (b.id * 11)}%` }}
                    onClick={() => setSelectedBranch(b.id)}
                  />
                ))}
              </div>
            </div>
            <div className="relative text-center z-10">
              <MapPin className="text-barclays-teal w-12 h-12 mx-auto mb-3" />
              <p className="text-barclays-blue font-semibold">Interactive map</p>
              <p className="text-gray-500 text-sm mt-1">Map integration would appear here</p>
              <p className="text-gray-400 text-xs mt-1">Connect Google Maps or Mapbox for full functionality</p>
            </div>
          </div>

          {/* Branch list */}
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            <p className="text-sm text-gray-500 mb-2">{filtered.length} branches found</p>
            {filtered.map(b => (
              <div
                key={b.id}
                onClick={() => setSelectedBranch(b.id)}
                className={`bg-white rounded-lg border p-4 cursor-pointer transition-all ${
                  selectedBranch === b.id ? 'border-barclays-teal shadow-md' : 'border-gray-200 hover:border-barclays-teal/50'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-barclays-blue text-sm">{b.name}</h3>
                  <span className="text-xs text-barclays-teal font-semibold bg-barclays-teal/10 px-2 py-0.5 rounded-full">{b.distance}</span>
                </div>
                <div className="space-y-1.5 text-xs text-gray-600">
                  <p className="flex items-center gap-1.5"><MapPin size={12} className="text-gray-400" /> {b.address}</p>
                  <p className="flex items-center gap-1.5"><Clock size={12} className="text-gray-400" /> {b.hours}</p>
                  <p className="flex items-center gap-1.5"><Phone size={12} className="text-gray-400" /> {b.phone}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {b.services.map(s => (
                    <span key={s} className="text-xs bg-barclays-gray-light text-gray-600 px-2 py-0.5 rounded">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
