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
      price: '₹ 66,666',
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
      price: '₹ 66,666',
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
      price: '₹ 40,999',
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
      price: '₹ 35,500',
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
      price: '₹ 52,000',
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
      price: '₹ 48,999',
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
    <div className="w-full bg-[#F8FAFC] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-2 mb-10 relative">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#062544] tracking-tight relative inline-block">
            Tailored For Every Traveler
            
            {/* Flight trajectory arc line vector illustration */}
            <svg className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-64 h-8 text-[#F5B800]" viewBox="0 0 250 30" fill="none">
              <path d="M5 25 Q 125 0 245 25" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
              <polygon points="245,25 235,20 238,28" fill="currentColor" />
            </svg>
          </h1>
        </div>

        {/* Filter Controls Bar (Continent Pills Left + Dropdowns Right) */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-10 pt-4">
          
          {/* Left Continent Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto bg-white p-1.5 rounded-full border border-slate-200 shadow-sm max-w-full">
            {['All', 'Asia', 'Americas', 'Africa', 'Europe', 'Oceania'].map((continent) => (
              <button
                key={continent}
                onClick={() => setActiveContinent(continent)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeContinent === continent
                    ? 'bg-[#062544] text-white shadow-md'
                    : 'text-slate-600 hover:text-[#062544] hover:bg-slate-100'
                }`}
              >
                {continent}
              </button>
            ))}
          </div>

          {/* Right Dropdowns */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-700">
            
            <div className="flex items-center space-x-2">
              <span>Tour Type :</span>
              <select
                value={tourTypeFilter}
                onChange={(e) => setTourTypeFilter(e.target.value)}
                className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-bold focus:outline-none cursor-pointer"
              >
                <option value="ALL">ALL</option>
                <option value="GROUP">GROUP</option>
                <option value="SOLO">SOLO</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <span>Year & Month :</span>
              <select
                value={yearMonthFilter}
                onChange={(e) => setYearMonthFilter(e.target.value)}
                className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-bold focus:outline-none cursor-pointer"
              >
                <option value="ALL">ALL</option>
                <option value="SEP2026">Sep 2026</option>
                <option value="OCT2026">Oct 2026</option>
                <option value="NOV2026">Nov 2026</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <span>Status :</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-bold focus:outline-none cursor-pointer"
              >
                <option value="ALL">ALL</option>
                <option value="OPEN">BOOKING OPEN</option>
              </select>
            </div>

          </div>
        </div>

        {/* Tour Cards Grid - 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTours.map((tour) => (
            <div
              key={tour.id}
              onClick={() => navigateTo('/apply')}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col"
            >
              {/* Card Image Header with Overlapping Badges */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Top Left Badge - BOOKING OPEN */}
                <div className="absolute top-4 left-4 bg-emerald-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                  {tour.status}
                </div>

                {/* Top Right Badge - GROUP */}
                <div className="absolute top-4 right-4 bg-white/95 text-[#062544] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                  {tour.groupType}
                </div>

                {/* Bottom Right Badge Over Image - 7 Days / 6 Nights */}
                <div className="absolute bottom-4 right-4 bg-white/95 text-[#062544] text-xs font-bold px-3.5 py-1.5 rounded-full shadow-md flex items-center space-x-2">
                  <Plane className="w-3.5 h-3.5 text-[#F5B800] transform -rotate-45" />
                  <span>+ 🧳 {tour.duration}</span>
                </div>
              </div>

              {/* Card Info Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                
                <div className="space-y-3">
                  <h3 className="font-extrabold text-xl text-[#062544] group-hover:text-[#F5B800] transition-colors leading-snug">
                    {tour.title}
                  </h3>

                  {/* Location & Dates */}
                  <div className="flex items-center space-x-6 text-xs text-slate-500 font-semibold">
                    <div className="flex items-center space-x-1.5">
                      <MapPin className="w-4 h-4 text-[#F5B800]" />
                      <span>{tour.destination}</span>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      <Calendar className="w-4 h-4 text-[#F5B800]" />
                      <span>{tour.dates}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {tour.description}
                  </p>
                </div>

                {/* Price Tag */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-end">
                  <div className="text-2xl font-black text-[#062544]">
                    {tour.price}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
