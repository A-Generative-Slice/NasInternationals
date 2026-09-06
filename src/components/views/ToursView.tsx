import React, { useState } from 'react';
import { MapPin, Calendar, Plane, ChevronDown, Filter } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ToursView: React.FC = () => {
  const { navigateTo } = useApp();
  const [activeContinent, setActiveContinent] = useState<string>('All');
  const [tourTypeFilter, setTourTypeFilter] = useState<string>('ALL');
  const [yearMonthFilter, setYearMonthFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const tourPackages = [
    {
      id: 'tour-bhutan-hyd',
      title: 'Bhutan from Hyderabad - September',
      destination: 'Bhutan',
      dates: '3 Sep 2026 – 9 Sep 2026',
      duration: '7 Days / 6 Nights',
      continent: 'Asia',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
      status: 'BOOKING OPEN',
      groupType: 'GROUP',
      description: 'Looking for a perfect Bhutan tour from Hyderabad? Join our Bhutan group tour with flights, hotels, meal...'
    },
    {
      id: 'tour-bhutan-che',
      title: 'Bhutan from Chennai - September',
      destination: 'Bhutan',
      dates: '16 Sep 2026 – 22 Sep 2026',
      duration: '7 Days / 6 Nights',
      continent: 'Asia',
      image: 'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=800&q=80',
      status: 'BOOKING OPEN',
      groupType: 'GROUP',
      description: 'Looking for a perfect Bhutan tour from Chennai? Join our Bhutan group tour with flights, hotels, meal...'
    },
    {
      id: 'tour-andaman-che',
      title: 'Andaman Tour from Chennai - October',
      destination: 'India',
      dates: '27 Oct 2026 – 31 Oct 2026',
      duration: '5 Days / 4 Nights',
      continent: 'Asia',
      image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=800&q=80',
      status: 'BOOKING OPEN',
      groupType: 'GROUP',
      description: 'Looking for a perfect Andaman tour from Chennai? Join our 4 Nights 5 Days Andaman group tour with...'
    },
    {
      id: 'tour-srilanka',
      title: 'Sri Lanka Explorer & Heritage',
      destination: 'Sri Lanka',
      dates: '10 Sep 2026 – 16 Sep 2026',
      duration: '7 Days / 6 Nights',
      continent: 'Asia',
      image: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=800&q=80',
      status: 'BOOKING OPEN',
      groupType: 'GROUP',
      description: 'Experience lush tea plantations, ancient temples, and exotic beaches on our all-inclusive group package.'
    },
    {
      id: 'tour-vietnam',
      title: 'Vietnam & Cambodia Explorer',
      destination: 'Vietnam',
      dates: '05 Oct 2026 – 12 Oct 2026',
      duration: '8 Days / 7 Nights',
      continent: 'Asia',
      image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80',
      status: 'BOOKING OPEN',
      groupType: 'GROUP',
      description: 'Cruise through Halong Bay and explore the ancient Angkor Wat temples with expert local tour guides.'
    },
    {
      id: 'tour-georgia',
      title: 'Georgia Mountain & Wine Retreat',
      destination: 'Georgia',
      dates: '15 Nov 2026 – 21 Nov 2026',
      duration: '7 Days / 6 Nights',
      continent: 'Europe',
      image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=800&q=80',
      status: 'BOOKING OPEN',
      groupType: 'GROUP',
      description: 'Explore Caucasus mountain peaks, historic Tbilisi streets, and rich vineyards in our popular group tour.'
    }
  ];

  const filteredTours = tourPackages.filter(tour => {
    const matchesContinent = activeContinent === 'All' || tour.continent === activeContinent;
    return matchesContinent;
  });

  return (
    <div className="w-full bg-[#F8FAFC] py-12 relative overflow-hidden min-h-screen pb-24 lg:pb-16">
      {/* Ambient background glow blobs for frosted glass reflections */}
      <div className="ambient-glow-blue top-10 left-1/3 -translate-x-1/2"></div>
      <div className="ambient-glow-sky top-96 right-10"></div>
      <div className="ambient-glow-blue bottom-32 left-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10 relative">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-pill text-[#036CFB] text-xs font-bold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#036CFB] animate-pulse"></span>
            <span>Curated International Tour Packages</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#062544] tracking-tight relative inline-block">
            Tailored For <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#036CFB] via-[#0284C7] to-[#38BDF8]">Every Traveler</span>
            
            {/* Flight trajectory arc line vector illustration */}
            <svg className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-64 h-8 text-[#036CFB]" viewBox="0 0 250 30" fill="none">
              <path d="M5 25 Q 125 0 245 25" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
              <polygon points="245,25 235,20 238,28" fill="currentColor" />
            </svg>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium pt-3 max-w-lg mx-auto">
            Explore world wonders with our premium group and solo holiday tours. 100% digital booking and visa support.
          </p>
        </div>

        {/* Filter Controls Bar (Continent Pills Left + Dropdowns Right) */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6 mb-10 pt-4">
          
          {/* Left Continent Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar glass-frost p-1.5 rounded-full border border-white/80 shadow-md max-w-full w-full lg:w-auto">
            {['All', 'Asia', 'Americas', 'Africa', 'Europe', 'Oceania'].map((continent) => (
              <button
                key={continent}
                onClick={() => setActiveContinent(continent)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap min-h-[40px] flex items-center justify-center ${
                  activeContinent === continent
                    ? 'bg-[#036CFB] text-white shadow-md shadow-[#036CFB]/30'
                    : 'text-slate-600 hover:text-[#062544] hover:bg-white/60'
                }`}
              >
                {continent}
              </button>
            ))}
          </div>

          {/* Right Dropdowns */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-700 w-full lg:w-auto justify-start lg:justify-end">
            
            <div className="flex items-center space-x-2 glass-frost px-3.5 py-2 rounded-2xl border border-white/80 shadow-xs">
              <label htmlFor="tour-type-filter" className="text-[11px] font-bold text-slate-500">Type:</label>
              <select
                id="tour-type-filter"
                aria-label="Filter tours by type"
                value={tourTypeFilter}
                onChange={(e) => setTourTypeFilter(e.target.value)}
                className="bg-transparent text-slate-800 font-bold focus:outline-none cursor-pointer text-xs focus-ring rounded-lg px-1"
              >
                <option value="ALL">ALL</option>
                <option value="GROUP">GROUP</option>
                <option value="SOLO">SOLO</option>
              </select>
            </div>

            <div className="flex items-center space-x-2 glass-frost px-3.5 py-2 rounded-2xl border border-white/80 shadow-xs">
              <label htmlFor="tour-date-filter" className="text-[11px] font-bold text-slate-500">Date:</label>
              <select
                id="tour-date-filter"
                aria-label="Filter tours by departure date"
                value={yearMonthFilter}
                onChange={(e) => setYearMonthFilter(e.target.value)}
                className="bg-transparent text-slate-800 font-bold focus:outline-none cursor-pointer text-xs focus-ring rounded-lg px-1"
              >
                <option value="ALL">ALL</option>
                <option value="SEP2026">Sep 2026</option>
                <option value="OCT2026">Oct 2026</option>
                <option value="NOV2026">Nov 2026</option>
              </select>
            </div>

            <div className="flex items-center space-x-2 glass-frost px-3.5 py-2 rounded-2xl border border-white/80 shadow-xs">
              <label htmlFor="tour-status-filter" className="text-[11px] font-bold text-slate-500">Status:</label>
              <select
                id="tour-status-filter"
                aria-label="Filter tours by booking status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent text-slate-800 font-bold focus:outline-none cursor-pointer text-xs focus-ring rounded-lg px-1"
              >
                <option value="ALL">ALL</option>
                <option value="OPEN">BOOKING OPEN</option>
              </select>
            </div>

          </div>
        </div>

        {/* Tour Cards Grid - 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredTours.map((tour) => (
            <div
              key={tour.id}
              onClick={() => navigateTo('/apply')}
              className="glass-frost glass-card-hover rounded-3xl overflow-hidden border border-white/80 shadow-md hover:shadow-2xl transition-all duration-300 group cursor-pointer flex flex-col relative"
            >
              {/* Card Image Header with Overlapping Badges */}
              <div className="relative h-60 sm:h-64 overflow-hidden">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                {/* Top Left Badge - BOOKING OPEN */}
                <div className="absolute top-4 left-4 bg-emerald-500/90 backdrop-blur-md text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md border border-white/20">
                  {tour.status}
                </div>

                {/* Top Right Badge - GROUP */}
                <div className="absolute top-4 right-4 glass-frost-navy text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md border border-white/20">
                  {tour.groupType}
                </div>

                {/* Bottom Right Badge Over Image - 7 Days / 6 Nights */}
                <div className="absolute bottom-3 right-4 glass-frost text-[#062544] text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center space-x-1.5 border border-white/80">
                  <Plane className="w-3.5 h-3.5 text-[#036CFB] transform -rotate-45" />
                  <span>{tour.duration}</span>
                </div>
              </div>

              {/* Card Info Content */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                
                <div className="space-y-3">
                  <h3 className="font-extrabold text-lg sm:text-xl text-[#062544] group-hover:text-[#036CFB] transition-colors leading-snug">
                    {tour.title}
                  </h3>

                  {/* Location & Dates */}
                  <div className="flex items-center space-x-4 text-xs text-slate-500 font-semibold flex-wrap gap-y-1">
                    <div className="flex items-center space-x-1.5">
                      <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center text-[#036CFB]">
                        <MapPin className="w-3.5 h-3.5" />
                      </div>
                      <span>{tour.destination}</span>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center text-[#036CFB]">
                        <Calendar className="w-3.5 h-3.5" />
                      </div>
                      <span>{tour.dates}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {tour.description}
                  </p>
                </div>

                {/* Online Action Tag */}
                <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">100% Online Booking</span>
                  <span className="text-xs font-extrabold text-[#036CFB] flex items-center space-x-1 group-hover:translate-x-0.5 transition-transform">
                    <span>View Itinerary ↗</span>
                  </span>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
