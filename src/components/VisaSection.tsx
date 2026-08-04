import React, { useState } from 'react';
import { TRIPATE_VISAS } from '../lib/data';
import { VisaInfo } from '../types';
import { 
  Sparkles, 
  Clock, 
  CheckCircle, 
  ArrowRight, 
  Calendar, 
  ShieldCheck, 
  Search,
  Check,
  ChevronDown,
  Info
} from 'lucide-react';

interface VisaSectionProps {
  onSelectVisa: (visa: VisaInfo) => void;
  searchQuery?: string;
}

export const VisaSection: React.FC<VisaSectionProps> = ({
  onSelectVisa,
  searchQuery = ''
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'trending' | 'evisa' | 'express' | 'cheapest'>('all');
  const [showAll, setShowAll] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const filteredVisas = TRIPATE_VISAS.filter((visa) => {
    const matchesCategory = activeCategory === 'all' || visa.category === activeCategory;
    const matchesSearch = !localSearch || visa.country.toLowerCase().includes(localSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const displayedVisas = showAll ? filteredVisas : filteredVisas.slice(0, 8);

  return (
    <section className="py-16 bg-slate-50 text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Most Popular Tourist & Business Visas</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-serif uppercase">
            TRENDY TRAVEL DESTINATIONS
          </h2>

          <p className="mt-2 text-slate-600 text-base sm:text-lg font-normal">
            Explore Our Most Popular Destinations, Tailored For Every Traveler
          </p>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto scrollbar-none pb-2 md:pb-0">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeCategory === 'all'
                  ? 'bg-slate-900 text-white shadow'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All
            </button>

            <button
              onClick={() => setActiveCategory('trending')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeCategory === 'trending'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Trending 🔥
            </button>

            <button
              onClick={() => setActiveCategory('evisa')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeCategory === 'evisa'
                  ? 'bg-sky-600 text-white shadow'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              E-Visa ⚡
            </button>

            <button
              onClick={() => setActiveCategory('express')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeCategory === 'express'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Express 🚀
            </button>

            <button
              onClick={() => setActiveCategory('cheapest')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeCategory === 'cheapest'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Cheapest 💰
            </button>
          </div>

          {/* Quick Filter Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Search destination..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-100 text-xs sm:text-sm text-slate-900 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

        </div>

        {/* Visa Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedVisas.map((visa) => (
            <div
              key={visa.id}
              onClick={() => onSelectVisa(visa)}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              {/* Card Image Header */}
              <div className="relative h-44 overflow-hidden bg-slate-100">
                <img
                  src={visa.image}
                  alt={visa.country}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20"></div>

                {/* Country Flag & Name overlay */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold border border-white/20">
                  <span className="text-base">{visa.flag}</span>
                  <span>{visa.country}</span>
                </div>

                {/* Visas on time Badge */}
                {visa.visasOnTimeBadge && (
                  <div className="absolute top-3 right-3 bg-emerald-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    <span>{visa.visasOnTimeBadge}</span>
                  </div>
                )}

                {/* Delivery Estimate */}
                <div className="absolute bottom-3 left-3 text-white text-xs font-medium flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{visa.deliveryEstimate || `Get in ${visa.processingTime}`}</span>
                </div>
              </div>

              {/* Card Content Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span>Entry: <strong className="text-slate-800">{visa.entryType}</strong></span>
                    <span>Stay: <strong className="text-slate-800">{visa.stayPeriod || visa.validity}</strong></span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                    {visa.country} Visa
                  </h3>

                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {visa.nasAssistanceNotes}
                  </p>
                </div>

                {/* Price & Action Button */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Starting From</span>
                    <span className="text-xl font-black text-slate-900">
                      ₹{visa.feeINR.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectVisa(visa);
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 transition-colors flex items-center gap-1 shadow-sm"
                  >
                    <span>Apply Visa</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {filteredVisas.length > 8 && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 rounded-2xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-all inline-flex items-center gap-2 shadow-md"
            >
              <span>{showAll ? 'Show Less' : 'See More Visa Destinations'}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showAll ? 'rotate-180' : ''}`} />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
