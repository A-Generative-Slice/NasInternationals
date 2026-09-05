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
              NAS Internationals makes your visa process easy, fast, and 100% online.
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
                  className="w-11 h-11 rounded-full bg-[#036CFB] hover:bg-blue-600 text-white flex items-center justify-center shadow-md transition-all shrink-0 cursor-pointer"
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
                <div className="text-xs font-bold text-slate-700">
                  Trusted by Travelers <br />
                  <span className="text-[10px] text-[#036CFB] font-extrabold">180+ successful online visas issued!</span>
                </div>
              </div>
            </div>

          </div>

          <div className="lg:col-span-5 hidden lg:block relative min-h-[500px]"></div>

        </div>
      </section>

      {/* TRENDY TRAVEL DESTINATIONS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Section Header */}
        <div className="text-center space-y-2 mb-12 relative">
          <span className="text-xs font-bold uppercase tracking-widest text-[#036CFB] block">
            TRENDY TRAVEL DESTINATIONS
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#062544] tracking-tight relative inline-block">
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
          
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar bg-white p-1.5 rounded-full border border-slate-200 shadow-sm max-w-full">
            {['All', 'Trending', 'E-Visa', 'Express', 'Fast-Track'].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === category
                    ? 'bg-[#036CFB] text-white shadow-md'
                    : 'text-slate-600 hover:text-[#062544] hover:bg-slate-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <button
            onClick={() => navigateTo('/visas')}
            className="px-6 py-2.5 bg-[#036CFB] hover:bg-blue-600 text-white font-bold text-xs rounded-full shadow-md transition-all flex items-center space-x-1.5 cursor-pointer shrink-0"
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
              <div className="relative h-64 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                <div className="absolute top-4 left-4 bg-[#062544]/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-md flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse"></span>
                  <span>{destination.badge}</span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-extrabold text-xl text-[#062544] group-hover:text-[#036CFB] transition-colors">
                      {destination.name}
                    </h3>
                    <p className="text-xs font-medium text-slate-500 mt-1">
                      {destination.date}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-blue-50 text-[#036CFB] border border-blue-200 inline-flex items-center space-x-1 group-hover:bg-[#036CFB] group-hover:text-white transition-all shadow-xs">
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

      {/* WHY GO WITH NAS INTERNATIONALS SECTION */}
      <section className="bg-[#041A30] text-white py-20 border-t border-slate-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Text & Features */}
          <div className="lg:col-span-7 space-y-8">
            
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#38BDF8]">
                WHY GO WITH NAS INTERNATIONALS
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                100% Online Visa Process With <br />
                Expert Guidance & Zero Office Visits
              </h2>
              <p className="text-sm font-medium text-slate-300 max-w-xl leading-relaxed">
                We handle every detail of your visa process completely online, ensuring a smooth and stress-free journey from anywhere in the world.
              </p>
            </div>

            {/* 4 Feature Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              
              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-full bg-[#036CFB] text-white flex items-center justify-center shrink-0 shadow-md">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-white">Expert Guidance</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mt-1">
                    Our dedicated immigration team verifies every document digitally to prevent delays and rejections.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-full bg-[#036CFB] text-white flex items-center justify-center shrink-0 shadow-md">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-white">100% Online & Paperless</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mt-1">
                    Complete digital application submission, electronic document verification, and live tracking with zero office queues.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-full bg-[#036CFB] text-white flex items-center justify-center shrink-0 shadow-md">
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-white">24/7 Digital Support</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mt-1">
                    Got questions at any hour? Our specialists are available 24/7 via WhatsApp, phone, and online chat.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-full bg-[#036CFB] text-white flex items-center justify-center shrink-0 shadow-md">
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

          {/* Right Vector Illustration */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm h-80 bg-[#062544] rounded-3xl p-8 flex flex-col items-center justify-center border border-slate-700/80 shadow-2xl text-center">
              <div className="w-24 h-24 rounded-full bg-[#036CFB] text-white flex items-center justify-center shadow-xl mb-4">
                <Plane className="w-12 h-12 transform -rotate-45" />
              </div>
              <h3 className="text-xl font-extrabold text-white">NAS INTERNATIONALS</h3>
              <p className="text-xs font-bold text-[#38BDF8] uppercase tracking-widest mt-1">TOURS & TRAVELS</p>
              <p className="text-xs text-slate-400 font-medium mt-3">100% ONLINE • HAJJ • UMRAH • VISAS • TOURS</p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
