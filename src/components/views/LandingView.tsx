import React, { useState } from 'react';
import { Plane, Search, ArrowUpRight, ShieldCheck, Clock, Globe, UserCheck, DollarSign, Headphones, Star } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LandingView: React.FC = () => {
  const { navigateTo } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const popularDestinations = [
    {
      id: 'laos',
      name: 'Laos',
      badge: 'Popular',
      date: 'Processing: 3-5 Days',
      image: 'https://images.unsplash.com/photo-1540611025311-01df3cef54b5?auto=format&fit=crop&w=800&q=80',
      category: 'E-Visa'
    },
    {
      id: 'thailand',
      name: 'Thailand',
      badge: '65+ Visas on Time',
      date: 'Processing: 2-3 Days',
      image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80',
      category: 'Trending'
    },
    {
      id: 'madagascar',
      name: 'Madagascar',
      badge: 'Express',
      date: 'Processing: 2-4 Days',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      category: 'Express'
    },
    {
      id: 'france',
      name: 'France',
      badge: 'Schengen Area',
      date: 'Processing: 7-12 Days',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
      category: 'Trending'
    },
    {
      id: 'japan',
      name: 'Japan',
      badge: 'E-Visa Available',
      date: 'Processing: 4-5 Days',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
      category: 'E-Visa'
    },
    {
      id: 'dubai',
      name: 'Dubai (UAE)',
      badge: 'Express 48H',
      date: 'Processing: 24-48 Hours',
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
    <div className="w-full bg-[#F8FAFC] relative overflow-hidden">
      
      {/* Ambient background light orbs for frosted glass reflections */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#036CFB]/15 via-[#38BDF8]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-0"></div>
      <div className="absolute top-[800px] -right-40 w-[450px] h-[450px] bg-gradient-to-br from-[#036CFB]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-0"></div>

      {/* HERO SECTION */}
      <section className="relative w-full min-h-[580px] sm:min-h-[640px] bg-cover bg-center overflow-hidden flex items-center" style={{
        backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.96) 0%, rgba(255, 255, 255, 0.88) 55%, rgba(255, 255, 255, 0.2) 100%), url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1920&q=80')`
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left Column Content */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top pill badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-frost border border-white/80 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#036CFB] animate-ping"></span>
              <span className="text-[11px] font-bold text-[#062544] uppercase tracking-wider">
                100% Online Digital Operations
              </span>
            </div>

            {/* Big Headline */}
            <div className="space-y-1">
              <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-[#062544] tracking-tight leading-[1.12]">
                GET THE VISA. <br />
                WITHOUT ANY <br />
                <span className="blue-gradient-text">STRESS.</span>
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-slate-600 font-medium text-sm sm:text-base lg:text-lg max-w-lg leading-relaxed">
              Whether it's Japan, France, or Dubai — NAS Internationals makes your visa process easy, fast, and completely online with zero in-person visits.
            </p>

            {/* Floating Glassmorphic Search Bar */}
            <div className="pt-2">
              <form onSubmit={handleSearchSubmit} className="relative max-w-lg glass-frost rounded-full p-2 pl-5 shadow-xl border border-white/80 flex items-center justify-between group transition-all focus-within:ring-2 focus-within:ring-[#036CFB]/40 focus-within:border-[#036CFB]/40">
                <div className="flex items-center space-x-3 flex-1 mr-2">
                  <Plane className="w-5 h-5 text-[#036CFB] transform -rotate-45 shrink-0" />
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
                  aria-label="Search destination"
                  className="w-11 h-11 rounded-full bg-gradient-to-r from-[#036CFB] to-[#0284C7] hover:from-[#0284C7] hover:to-[#036CFB] text-white flex items-center justify-center shadow-lg shadow-[#036CFB]/30 border border-white/20 transition-all shrink-0 cursor-pointer active:scale-95"
                >
                  <Search className="w-5 h-5 stroke-[2.5]" />
                </button>
              </form>

              {/* Sub-caption helper */}
              <p className="text-xs text-slate-500 font-medium mt-2.5 ml-4">
                Search your visa by country – e.g. Japan, France, Dubai, Singapore..
              </p>
            </div>

            {/* Feature Trust Chips Row */}
            <div className="pt-1 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold glass-pill text-[#062544] border border-blue-200/60 shadow-xs flex items-center space-x-1">
                <span>✨</span>
                <span>100% Online Approvals</span>
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] font-bold glass-pill text-[#062544] border border-blue-200/60 shadow-xs flex items-center space-x-1">
                <span>⚡</span>
                <span>Fast 24H E-Visas</span>
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] font-bold glass-pill text-[#062544] border border-blue-200/60 shadow-xs flex items-center space-x-1">
                <span>🛡️</span>
                <span>Embassy Verified</span>
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] font-bold glass-pill text-[#062544] border border-blue-200/60 shadow-xs flex items-center space-x-1">
                <span>📱</span>
                <span>24/7 Digital Helpline</span>
              </span>
            </div>

            {/* Bottom-left Floating Trust Badge */}
            <div className="pt-2 flex items-center">
              <div className="glass-frost px-4 sm:px-5 py-3 rounded-2xl border border-white/80 shadow-lg flex items-center space-x-3 sm:space-x-4">
                <div className="text-xl sm:text-2xl font-black text-[#062544]">240+</div>
                <div className="flex -space-x-2 overflow-hidden">
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Traveler" />
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Traveler" />
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="Traveler" />
                </div>
                <div className="text-xs font-bold text-slate-700">
                  Trusted by Travelers Worldwide <br />
                  <span className="text-[10px] text-[#036CFB] font-extrabold">180+ successful online visas issued!</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Luxury Frosted Glass Visa Quick-Action Card */}
          <div className="lg:col-span-5 hidden lg:flex flex-col justify-center relative">
            <div className="glass-frost rounded-3xl p-7 shadow-2xl border border-white/90 backdrop-blur-2xl space-y-6 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-200/60 pb-4">
                <div className="flex items-center space-x-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#036CFB] to-[#38BDF8] flex items-center justify-center text-white shadow-md shadow-[#036CFB]/30">
                    <Plane className="w-5 h-5 transform -rotate-45" />
                  </div>
                  <div>
                    <h3 className="font-display font-black text-sm text-[#062544]">Online Visa Clearance</h3>
                    <p className="text-[10px] font-bold text-[#036CFB] uppercase tracking-wider">Fast-Track Digital Desk</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                  ● 100% Online
                </span>
              </div>

              {/* Quick destination highlights */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-700 block">Popular Destinations Right Now</label>
                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <button
                    onClick={() => navigateTo('/visas')}
                    className="p-3 rounded-2xl bg-white/80 hover:bg-white border border-slate-200/80 hover:border-[#036CFB]/40 transition text-left space-y-0.5 shadow-xs group"
                  >
                    <div className="font-bold text-[#062544] group-hover:text-[#036CFB] flex items-center justify-between">
                      <span>Dubai (UAE)</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#036CFB]" />
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium block">24-48 Hours Express</span>
                  </button>

                  <button
                    onClick={() => navigateTo('/visas')}
                    className="p-3 rounded-2xl bg-white/80 hover:bg-white border border-slate-200/80 hover:border-[#036CFB]/40 transition text-left space-y-0.5 shadow-xs group"
                  >
                    <div className="font-bold text-[#062544] group-hover:text-[#036CFB] flex items-center justify-between">
                      <span>France / Schengen</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#036CFB]" />
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium block">29 Countries Covered</span>
                  </button>

                  <button
                    onClick={() => navigateTo('/visas')}
                    className="p-3 rounded-2xl bg-white/80 hover:bg-white border border-slate-200/80 hover:border-[#036CFB]/40 transition text-left space-y-0.5 shadow-xs group"
                  >
                    <div className="font-bold text-[#062544] group-hover:text-[#036CFB] flex items-center justify-between">
                      <span>Japan E-Visa</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#036CFB]" />
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium block">4-5 Days Turnaround</span>
                  </button>

                  <button
                    onClick={() => navigateTo('/visas')}
                    className="p-3 rounded-2xl bg-white/80 hover:bg-white border border-slate-200/80 hover:border-[#036CFB]/40 transition text-left space-y-0.5 shadow-xs group"
                  >
                    <div className="font-bold text-[#062544] group-hover:text-[#036CFB] flex items-center justify-between">
                      <span>Thailand E-Visa</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#036CFB]" />
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium block">2-3 Days Fast Track</span>
                  </button>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => navigateTo('/apply')}
                className="w-full py-3.5 bg-gradient-to-r from-[#036CFB] via-[#0284C7] to-[#036CFB] hover:from-[#0256c7] hover:to-[#0284C7] text-white font-display font-black text-xs uppercase tracking-wider rounded-2xl shadow-xl shadow-[#036CFB]/30 border border-white/20 transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-95"
              >
                <span>Start Visa Application Online</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between text-[10px] text-slate-500 font-semibold pt-1">
                <span className="flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#036CFB]" />
                  <span>Zero Office Visit</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-[#036CFB]" />
                  <span>24/7 Processing</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Globe className="w-3.5 h-3.5 text-[#036CFB]" />
                  <span>Worldwide E-Visas</span>
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* TRENDY TRAVEL DESTINATIONS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-2 mb-10 sm:mb-12 relative">
          <span className="text-xs font-bold uppercase tracking-widest text-[#036CFB] block">
            TRENDY TRAVEL DESTINATIONS
          </span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#062544] tracking-tight relative inline-block">
            Explore Our Most Popular Destinations, <br className="hidden sm:inline" />
            Tailored For Every Traveler

            <svg className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-64 h-8 text-[#036CFB]" viewBox="0 0 250 30" fill="none">
              <path d="M5 25 Q 125 0 245 25" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
              <polygon points="245,25 235,20 238,28" fill="currentColor" />
            </svg>
          </h2>
        </div>

        {/* Category Pill Filters Bar + See More button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar glass-frost p-1.5 rounded-full border border-white/70 shadow-md max-w-full">
            {['All', 'Trending', 'E-Visa', 'Express', 'Fast-Track'].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-[#036CFB] to-[#0284C7] text-white shadow-md shadow-[#036CFB]/30'
                    : 'text-slate-600 hover:text-[#062544] hover:bg-white/60'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <button
            onClick={() => navigateTo('/visas')}
            className="px-6 py-2.5 bg-gradient-to-r from-[#036CFB] to-[#0284C7] hover:from-[#0284C7] hover:to-[#036CFB] text-white font-display font-bold text-xs rounded-full shadow-lg shadow-[#036CFB]/25 border border-white/20 transition-all flex items-center space-x-1.5 cursor-pointer shrink-0 active:scale-95"
          >
            <span>See More</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Cards Grid - 3 Columns with Frosted Glass Styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredDestinations.map((destination) => (
            <div
              key={destination.id}
              onClick={() => navigateTo('/visas')}
              className="glass-frost glass-card-hover rounded-3xl overflow-hidden border border-white/80 shadow-md hover:shadow-2xl flex flex-col group cursor-pointer"
            >
              <div className="relative h-60 sm:h-64 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                
                {/* Frosted Glass Badge Overlay */}
                <div className="absolute top-4 left-4 glass-frost-dark text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg border border-white/20 backdrop-blur-md flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse"></span>
                  <span>{destination.badge}</span>
                </div>
              </div>

              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display font-black text-xl text-[#062544] group-hover:text-[#036CFB] transition-colors">
                      {destination.name}
                    </h3>
                    <p className="text-xs font-medium text-slate-500 mt-1 flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-[#036CFB]" />
                      <span>{destination.date}</span>
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold px-3.5 py-1.5 rounded-full bg-[#036CFB]/10 text-[#036CFB] border border-[#036CFB]/25 inline-flex items-center space-x-1 group-hover:bg-[#036CFB] group-hover:text-white transition-all shadow-xs">
                      <span>Apply Online</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* WHY GO WITH NAS INTERNATIONALS SECTION (Frosted Dark Glass Styling) */}
      <section className="bg-gradient-to-b from-[#041A30] via-[#062544] to-[#041A30] text-white py-16 sm:py-24 border-t border-white/10 relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-10 right-10 w-96 h-96 bg-[#036CFB]/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Text & Features */}
          <div className="lg:col-span-7 space-y-8">
            
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#38BDF8] inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10">
                WHY GO WITH NAS INTERNATIONALS
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                100% Online Visa Process With <br />
                Expert Guidance & Zero Office Visits
              </h2>
              <p className="text-sm font-medium text-slate-300 max-w-xl leading-relaxed">
                We handle every detail of your visa process completely online, ensuring a smooth and stress-free journey from anywhere in the world.
              </p>
            </div>

            {/* 4 Feature Items with Frosted Dark Glass Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pt-2">
              
              <div className="glass-frost-dark rounded-2xl p-5 border border-white/10 hover:border-[#38BDF8]/40 transition-all shadow-lg flex items-start space-x-3.5">
                <div className="w-11 h-11 rounded-2xl bg-[#036CFB] text-white flex items-center justify-center shrink-0 shadow-lg shadow-[#036CFB]/30 border border-white/20">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-white">Expert Guidance</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mt-1">
                    Our dedicated immigration team verifies every document digitally to prevent delays and rejections.
                  </p>
                </div>
              </div>

              <div className="glass-frost-dark rounded-2xl p-5 border border-white/10 hover:border-[#38BDF8]/40 transition-all shadow-lg flex items-start space-x-3.5">
                <div className="w-11 h-11 rounded-2xl bg-[#036CFB] text-white flex items-center justify-center shrink-0 shadow-lg shadow-[#036CFB]/30 border border-white/20">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-white">100% Online & Paperless</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mt-1">
                    Complete digital application submission, electronic document verification, and live tracking with zero office queues.
                  </p>
                </div>
              </div>

              <div className="glass-frost-dark rounded-2xl p-5 border border-white/10 hover:border-[#38BDF8]/40 transition-all shadow-lg flex items-start space-x-3.5">
                <div className="w-11 h-11 rounded-2xl bg-[#036CFB] text-white flex items-center justify-center shrink-0 shadow-lg shadow-[#036CFB]/30 border border-white/20">
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-white">24/7 Digital Support</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mt-1">
                    Got questions at any hour? Our specialists are available 24/7 via WhatsApp, phone, and online chat.
                  </p>
                </div>
              </div>

              <div className="glass-frost-dark rounded-2xl p-5 border border-white/10 hover:border-[#38BDF8]/40 transition-all shadow-lg flex items-start space-x-3.5">
                <div className="w-11 h-11 rounded-2xl bg-[#036CFB] text-white flex items-center justify-center shrink-0 shadow-lg shadow-[#036CFB]/30 border border-white/20">
                  <Star className="w-5 h-5 fill-current text-white" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-white">Curated Travel Experiences</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mt-1">
                    We match the right visa category and travel itinerary tailored to your exact travel purpose.
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Right Vector Illustration in Frosted Navy Container */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm glass-frost-navy rounded-3xl p-8 flex flex-col items-center justify-center border border-[#38BDF8]/30 shadow-2xl text-center backdrop-blur-2xl">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#036CFB] to-[#0284C7] text-white flex items-center justify-center shadow-xl shadow-[#036CFB]/40 border border-white/20 mb-4 animate-bounce">
                <Plane className="w-12 h-12 transform -rotate-45" />
              </div>
              <h3 className="font-display font-black text-xl text-white">NAS INTERNATIONALS</h3>
              <p className="text-xs font-bold text-[#38BDF8] uppercase tracking-widest mt-1">TOURS & TRAVELS</p>
              <p className="text-xs text-slate-300 font-medium mt-3">100% ONLINE • HAJJ • UMRAH • VISAS • TOURS</p>
              <div className="mt-4 pt-4 border-t border-white/10 w-full text-center">
                <span className="text-[11px] font-bold text-[#38BDF8] bg-white/10 px-3 py-1 rounded-full border border-white/10">
                  ✓ Verified Digital Operations
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
