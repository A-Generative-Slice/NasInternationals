import React, { useState } from 'react';
import { Search, Plane, ArrowRight, ShieldCheck, Clock, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

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
      price: 8500,
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
      price: 9500,
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
      price: 6500,
      processingTime: '24-48 Hours',
      validity: '30 / 60 Days',
      category: 'Express',
      badge: 'Fastest 24H',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
      description: 'Quick 30-day and 60-day e-visas processed 100% online.'
    },
    {
      id: 'japan-evisa',
      name: 'Japan E-Visa',
      country: 'Japan',
      type: 'Tourist Visa',
      price: 3450,
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
      price: 1999,
      processingTime: '2-3 Days',
      validity: '60 Days',
      category: 'Cheapest',
      badge: 'E-Visa',
      image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80',
      description: 'Instant e-visa for beaches, culture, and leisure travel.'
    },
    {
      id: 'uk-visitor',
      name: 'United Kingdom Standard Visitor',
      country: 'United Kingdom',
      type: 'Tourist Visa',
      price: 12500,
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
    <div className="w-full bg-[#F8FAFC]">
      
      {/* HERO SECTION */}
      <section className="bg-white py-14 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#062544] tracking-tight leading-tight">
              Apply for all Tourist visa online in one place – Tripate
            </h1>
            <p className="text-base font-bold text-slate-500">
              Find Your Next Destination
            </p>
          </div>

          {/* Right Travel Illustration Graphic */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm h-56 bg-[#F5B800]/10 rounded-3xl p-6 flex items-center justify-center border border-[#F5B800]/20">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#F5B800] text-[#062544] flex items-center justify-center mx-auto shadow-md">
                  <Plane className="w-8 h-8 transform -rotate-45" />
                </div>
                <h3 className="font-extrabold text-[#062544] text-lg">100% Online Visa Process</h3>
                <p className="text-xs text-slate-600 font-medium">Fast approval, expert verification & 24/7 status tracking</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SOLID YELLOW HORIZONTAL ACCENT DIVIDER BAR */}
      <div className="w-full h-3 bg-[#F5B800]"></div>

      {/* FILTER & SEARCH BAR ROW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left Category Pills */}
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

          {/* Right Search Bar */}
          <div className="w-full md:w-80">
            <div className="relative bg-white rounded-full p-1.5 pl-4 shadow-sm border border-slate-200 flex items-center justify-between">
              <div className="flex items-center space-x-2 flex-1 mr-2">
                <Plane className="w-4 h-4 text-[#062544] transform -rotate-45 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Where do you want to travel"
                  className="w-full bg-transparent text-xs font-medium text-slate-800 focus:outline-none placeholder-slate-400"
                />
              </div>
              <div className="w-8 h-8 rounded-full bg-[#F5B800] text-[#062544] flex items-center justify-center shrink-0">
                <Search className="w-4 h-4" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* VISA CARDS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVisas.map((visa) => (
            <div
              key={visa.id}
              onClick={() => navigateTo('/apply')}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col"
            >
              {/* Card Image */}
              <div className="relative h-60 overflow-hidden">
                <img
                  src={visa.image}
                  alt={visa.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                <div className="absolute top-4 left-4 bg-[#062544]/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
                  {visa.badge}
                </div>
              </div>

              {/* Card Info */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                
                <div className="space-y-2">
                  <h3 className="font-extrabold text-xl text-[#062544] group-hover:text-[#F5B800] transition-colors">
                    {visa.name}
                  </h3>
                  
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {visa.description}
                  </p>

                  <div className="pt-2 space-y-1.5 text-xs text-slate-600 font-medium">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-3.5 h-3.5 text-[#F5B800]" />
                      <span>Processing Time: <strong>{visa.processingTime}</strong></span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Validity: <strong>{visa.validity}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Footer Action & Price */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Starting Fee</span>
                    <span className="text-2xl font-black text-[#F5B800]">
                      ₹{visa.price.toLocaleString()}
                    </span>
                  </div>

                  <button className="px-5 py-2 bg-[#062544] group-hover:bg-[#F5B800] text-white group-hover:text-[#062544] font-bold text-xs rounded-full transition-all flex items-center space-x-1.5">
                    <span>Apply Now</span>
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
