import React, { useState } from 'react';
import { Plane, Search, ArrowUpRight, Star, ShieldCheck, CheckCircle2, Clock, Globe } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LandingView: React.FC = () => {
  const { navigateTo } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const popularDestinations = [
    {
      id: 'laos',
      name: 'Laos',
      price: '₹5,770',
      badge: 'Popular',
      date: 'Get on 19 Aug 2026',
      image: 'https://images.unsplash.com/photo-1540611025311-01df3cef54b5?auto=format&fit=crop&w=800&q=80',
      category: 'E-Visa'
    },
    {
      id: 'thailand',
      name: 'Thailand',
      price: '₹1,999',
      badge: '65+ Visas on Time',
      date: 'Get on 13 Aug 2026',
      image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80',
      category: 'Trending'
    },
    {
      id: 'madagascar',
      name: 'Madagascar',
      price: '₹11,237',
      badge: 'Express',
      date: 'Get on 25 Aug 2026',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      category: 'Cheapest'
    },
    {
      id: 'france',
      name: 'France',
      price: '₹7,800',
      badge: '1+ Visas on Time',
      date: 'Get on 18 Aug 2026',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
      category: 'Trending'
    },
    {
      id: 'japan',
      name: 'Japan',
      price: '₹3,450',
      badge: 'E-Visa Available',
      date: 'Get on 14 Aug 2026',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
      category: 'E-Visa'
    },
    {
      id: 'dubai',
      name: 'Dubai (UAE)',
      price: '₹6,200',
      badge: 'Express 48H',
      date: 'Get on 12 Aug 2026',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
      category: 'Express'
    }
  ];

  const filteredDestinations = popularDestinations.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = searchQuery === '' || item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigateTo('/visas');
  };

  return (
    <div className="w-full bg-[#F8FAFC]">
      
      {/* HERO SECTION */}
      <section className="relative w-full min-h-[620px] bg-cover bg-center overflow-hidden flex items-center" style={{
        backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 45%, rgba(255, 255, 255, 0.1) 100%), url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1920&q=80')`
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column Content */}
          <div className="lg:col-span-7 space-y-6 z-10">
            
            {/* Big Headline */}
            <div className="space-y-1">
              <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#062544] tracking-tight leading-[1.1]">
                GET THE VISA. <br />
                WITHOUT ANY <br />
                <span className="text-[#062544]">STRESS.</span>
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-slate-600 font-medium text-base sm:text-lg max-w-lg leading-relaxed">
              Whether it's Japan, France, or Dubai. <br className="hidden sm:inline" />
              Tripate makes your visa process easy, fast, and fully online.
            </p>

            {/* Floating Search Bar */}
            <div className="pt-2">
              <form onSubmit={handleSearchSubmit} className="relative max-w-lg bg-white rounded-full p-2 pl-5 shadow-xl border border-slate-200/80 flex items-center justify-between group transition-all">
                <div className="flex items-center space-x-3 flex-1 mr-2">
                  <Plane className="w-5 h-5 text-[#062544] transform -rotate-45 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Where to, Captain? The world is yours."
                    className="w-full bg-transparent text-sm font-medium text-slate-800 focus:outline-none placeholder-slate-400"
                  />
                </div>
                <button
                  type="submit"
                  className="w-11 h-11 rounded-full bg-[#F5B800] hover:bg-[#e0a800] text-[#062544] flex items-center justify-center shadow-md transition-all shrink-0 cursor-pointer"
                >
                  <Search className="w-5 h-5 stroke-[2.5]" />
                </button>
              </form>

              {/* Sub-caption helper */}
              <p className="text-xs text-slate-500 font-medium mt-2.5 ml-4">
                Search your visa by country – e.g. Japan, France, Dubai..
              </p>
            </div>

            {/* Bottom-left Floating Trust Badge */}
            <div className="pt-4 flex items-center">
              <div className="bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl border border-slate-200/80 shadow-lg flex items-center space-x-4">
                <div className="text-2xl font-black text-[#062544]">240+</div>
                <div className="flex -space-x-2 overflow-hidden">
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="User" />
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="User" />
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="User" />
                </div>
                <div className="text-xs font-bold text-slate-700">Trusted by<br />Travelers</div>
              </div>
            </div>

          </div>

          {/* Right Column Image Space (Traveler Photo) */}
          <div className="lg:col-span-5 hidden lg:block relative min-h-[500px]">
            {/* Transparent placeholder space allowing background image traveler to shine */}
          </div>

        </div>
      </section>

      {/* TRENDY TRAVEL DESTINATIONS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Section Header */}
        <div className="text-center space-y-2 mb-12 relative">
          <span className="text-xs font-bold uppercase tracking-widest text-[#F5B800] block">
            TRENDY TRAVEL DESTINATIONS
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#062544] tracking-tight relative inline-block">
            Explore Our Most Popular Destinations, <br className="hidden sm:inline" />
            Tailored For Every Traveler

            {/* Flight trajectory arc line vector illustration */}
            <svg className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-64 h-8 text-[#F5B800]" viewBox="0 0 250 30" fill="none">
              <path d="M5 25 Q 125 0 245 25" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
              <polygon points="245,25 235,20 238,28" fill="currentColor" />
            </svg>
          </h2>
        </div>

        {/* Category Pill Filters Bar + See More button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Left Category Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto bg-white p-1.5 rounded-full border border-slate-200 shadow-sm max-w-full">
            {['All', 'Trending', 'E-Visa', 'Express', 'Cheapest'].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === category
                    ? 'bg-[#062544] text-white shadow-md'
                    : 'text-slate-600 hover:text-[#062544] hover:bg-slate-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Right See More button */}
          <button
            onClick={() => navigateTo('/visas')}
            className="px-6 py-2.5 bg-[#F5B800] hover:bg-[#e0a800] text-[#062544] font-bold text-xs rounded-full shadow-md transition-all flex items-center space-x-1.5 cursor-pointer shrink-0"
          >
            <span>See More</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Cards Grid - 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((destination) => (
            <div
              key={destination.id}
              onClick={() => navigateTo('/visas')}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col"
            >
              {/* Card Image Header */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Badge Top Left */}
                <div className="absolute top-4 left-4 bg-[#062544]/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-md flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#F5B800] animate-pulse"></span>
                  <span>{destination.badge}</span>
                </div>
              </div>

              {/* Card Info Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-extrabold text-xl text-[#062544] group-hover:text-[#F5B800] transition-colors">
                      {destination.name}
                    </h3>
                    <p className="text-xs font-medium text-slate-500 mt-1">
                      {destination.date}
                    </p>
                  </div>

                  {/* Price Tag */}
                  <div className="text-right">
                    <span className="text-2xl font-black text-[#F5B800]">
                      {destination.price}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="bg-white py-20 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            
            <div className="p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200/60 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#F5B800]/20 text-[#062544] flex items-center justify-center mx-auto">
                <Clock className="w-7 h-7 text-[#062544]" />
              </div>
              <h3 className="font-extrabold text-lg text-[#062544]">Fastest Turnaround</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Get your e-visas and express tourist visas processed in as fast as 24 to 48 hours.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200/60 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#F5B800]/20 text-[#062544] flex items-center justify-center mx-auto">
                <ShieldCheck className="w-7 h-7 text-[#062544]" />
              </div>
              <h3 className="font-extrabold text-lg text-[#062544]">99.4% Approval Success</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Thorough document checking by visa specialists ensures error-free submission.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200/60 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#F5B800]/20 text-[#062544] flex items-center justify-center mx-auto">
                <Globe className="w-7 h-7 text-[#062544]" />
              </div>
              <h3 className="font-extrabold text-lg text-[#062544]">100% Online Process</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                No embassy visits required for major tourist destinations. Apply comfortably online.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
