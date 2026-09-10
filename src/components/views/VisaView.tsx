import React, { useState } from 'react';
import { Search, Plane, ArrowRight, ShieldCheck, Clock, Check, Globe } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import logoImg from '../../assets/logo.jpg';

export const VisaView: React.FC = () => {
  const { navigateTo, setSelectedVisa } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const visaDestinations = [
    {
      id: 'canada',
      name: 'Canada Visitor Visa',
      country: 'Canada',
      type: 'Tourist Visa',
      processingTime: '10-15 Days',
      validity: 'Up to 10 Years',
      category: 'Trending',
      badge: 'Popular',
      image: 'https://images.unsplash.com/photo-1517935703635-27c737826572?auto=format&fit=crop&w=800&q=80',
      description: 'Multiple entry tourist visa for vacations and visiting family.'
    },
    {
      id: 'france-schengen',
      name: 'France (Schengen) Visa',
      country: 'France',
      type: 'Tourist Visa',
      processingTime: '7-12 Days',
      validity: '90 Days',
      category: 'Express',
      badge: 'Schengen Area',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
      description: 'Travel freely across 29 Schengen member states with one visa.'
    },
    {
      id: 'uae-dubai',
      name: 'Dubai (UAE) Express Visa',
      country: 'United Arab Emirates',
      type: 'Tourist Visa',
      processingTime: '24-48 Hours',
      validity: '30 / 60 Days',
      category: 'Express',
      badge: 'Fastest 24H',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
      description: 'Quick 30-day and 60-day e-visas with express digital turnaround.',
    },
    {
      id: 'japan-evisa',
      name: 'Japan E-Visa',
      country: 'Japan',
      type: 'Tourist Visa',
      processingTime: '4-5 Days',
      validity: '90 Days Single Entry',
      category: 'E-Visa',
      badge: 'E-Visa',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
      description: 'Single-entry e-visa for sightseeing and tourism in Japan.'
    },
    {
      id: 'thailand-evisa',
      name: 'Thailand E-Visa',
      country: 'Thailand',
      type: 'Tourist Visa',
      processingTime: '2-3 Days',
      validity: '60 Days',
      category: 'Fast-Track',
      badge: 'E-Visa',
      image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80',
      description: 'Instant e-visa for beaches, culture, and leisure travel.'
    },
    {
      id: 'uk-visitor',
      name: 'United Kingdom Standard Visitor',
      country: 'United Kingdom',
      type: 'Tourist Visa',
      processingTime: '15-20 Days',
      validity: '6 Months',
      category: 'Trending',
      badge: 'Multiple Entry',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
      description: '6-month multiple entry visitor visa for England, Scotland & Wales.'
    }
  ];

  const filteredVisas = visaDestinations.filter(visa => {
    const matchesCategory = activeCategory === 'All' || visa.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      visa.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      visa.country.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full bg-[#F8FAFC] relative overflow-hidden min-h-screen">
      {/* Ambient background glow blobs for frosted glass reflections */}
      <div className="ambient-glow-blue top-12 left-1/4 -translate-x-1/2"></div>
      <div className="ambient-glow-sky top-96 right-10"></div>
      <div className="ambient-glow-blue bottom-40 left-10"></div>

      {/* HERO SECTION */}
      <section className="relative py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-pill text-[#036CFB] text-xs font-bold shadow-xs">
              <Globe className="w-3.5 h-3.5 text-[#036CFB]" />
              <span>Consulate & Embassy Visa Processing</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#062544] tracking-tight leading-[1.15] text-balance">
              Apply for International Visas
            </h1>
            <p className="text-sm sm:text-base font-medium text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed text-pretty">
              Verified tourist, business, and transit visa clearance for over 50 destinations worldwide with direct document submission and status tracking.
            </p>
          </div>

          {/* Right Travel Highlight Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm glass-frost rounded-3xl p-6 border border-white/80 shadow-xl overflow-hidden group">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-[#036CFB]/10 flex items-center justify-center text-[#036CFB] shrink-0">
                      <Plane className="w-5 h-5 transform -rotate-45" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm text-[#062544]">Visa Desk</h3>
                      <p className="text-[11px] text-slate-500 font-medium">Fast-Track Processing</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    Active
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <div className="p-3 rounded-2xl bg-white/70 border border-slate-100 space-y-0.5">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Destinations</span>
                    <span className="font-extrabold text-[#062544] text-sm">50+ Countries</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/70 border border-slate-100 space-y-0.5">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Turnaround</span>
                    <span className="font-extrabold text-[#036CFB] text-sm">24H – 5 Days</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-center space-x-2.5 text-xs text-[#062544]">
                  <Check className="w-4 h-4 text-[#036CFB] shrink-0" />
                  <span className="font-semibold text-[11px]">Embassy verified document compliance guarantee</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FILTER & SEARCH BAR ROW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          
          {/* Left Category Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar glass-frost p-1.5 rounded-full border border-white/80 shadow-md max-w-full w-full md:w-auto">
            {['All', 'Trending', 'E-Visa', 'Express', 'Fast-Track'].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap min-h-[40px] flex items-center justify-center ${
                  activeCategory === category
                    ? 'bg-[#036CFB] text-white shadow-md shadow-[#036CFB]/30'
                    : 'text-slate-600 hover:text-[#062544] hover:bg-white/60'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Right Search Bar */}
          <div className="w-full md:w-80">
            <div className="relative glass-frost rounded-full p-1.5 pl-4 shadow-md border border-white/80 flex items-center justify-between group focus-within:ring-2 focus-within:ring-[#036CFB]/30">
              <div className="flex items-center space-x-2 flex-1 mr-2">
                <Plane className="w-4 h-4 text-[#036CFB] transform -rotate-45 shrink-0" />
                <input
                  type="text"
                  aria-label="Search destination country"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search destination country..."
                  className="w-full bg-transparent text-xs font-semibold text-slate-800 focus:outline-none placeholder-slate-400 py-1"
                />
              </div>
              <div className="w-9 h-9 rounded-full bg-[#036CFB] text-white flex items-center justify-center shrink-0 shadow-sm">
                <Search className="w-4 h-4" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* VISA CARDS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredVisas.map((visa) => (
            <div
              key={visa.id}
              onClick={() => navigateTo('/apply')}
              className="glass-frost glass-card-hover rounded-3xl overflow-hidden border border-white/80 shadow-md hover:shadow-2xl transition-all duration-300 group cursor-pointer flex flex-col relative"
            >
              {/* Card Image */}
              <div className="relative h-56 sm:h-60 overflow-hidden">
                <img
                  src={visa.image}
                  alt={visa.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                <div className="absolute top-4 left-4 glass-frost-navy text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-lg border border-white/20">
                  {visa.badge}
                </div>

                <div className="absolute bottom-3 left-4 text-white">
                  <span className="text-[10px] font-bold text-[#38BDF8] uppercase tracking-wider block">{visa.country}</span>
                  <span className="text-sm font-black drop-shadow-sm">{visa.type}</span>
                </div>
              </div>

              {/* Card Info */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                
                <div className="space-y-2">
                  <h3 className="font-extrabold text-lg sm:text-xl text-[#062544] group-hover:text-[#036CFB] transition-colors">
                    {visa.name}
                  </h3>
                  
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {visa.description}
                  </p>

                  <div className="pt-2 space-y-2 text-xs text-slate-600 font-medium">
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center text-[#036CFB]">
                        <Clock className="w-3.5 h-3.5" />
                      </div>
                      <span>Processing Time: <strong className="text-slate-800">{visa.processingTime}</strong></span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>Validity: <strong className="text-slate-800">{visa.validity}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Application Mode</span>
                    <span className="text-[11px] font-bold text-[#036CFB] bg-blue-50/90 px-2.5 py-0.5 rounded-full border border-blue-100 inline-block mt-0.5">
                      Electronic Visa
                    </span>
                  </div>

                  <button className="px-5 py-2.5 bg-[#036CFB] group-hover:bg-[#062544] text-white font-bold text-xs rounded-full transition-all flex items-center space-x-1.5 shadow-md shadow-[#036CFB]/25 min-h-[44px]">
                    <span>Apply Online</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
