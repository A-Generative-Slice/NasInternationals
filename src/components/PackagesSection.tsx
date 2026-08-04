import React, { useState } from 'react';
import { TourPackage } from '../types';
import { PackageCard } from './PackageCard';
import { FEATURED_PACKAGES } from '../lib/data';
import { Compass, Sparkles, Filter } from 'lucide-react';

interface PackagesSectionProps {
  onBookNow: (pkgTitle: string, details: string) => void;
  onOpenAiPlanner: () => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({ onBookNow, onOpenAiPlanner }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredPackages = FEATURED_PACKAGES.filter((pkg) => {
    const matchesCategory = selectedCategory === 'all' || pkg.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.destination.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-slate-200 pb-6">
        <div>
          <span className="text-xs font-bold text-sky-600 uppercase tracking-widest flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-sky-600" />
            <span>NAS INTERNATIONALS FEATURED PACKAGES</span>
          </span>
          <h2 className="text-3xl font-bold font-serif text-slate-900 mt-1">
            Handpicked Tour Packages & Pilgrimages
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
            Explore carefully crafted holiday packages, direct Hajj & Umrah trips from Chennai, and luxury international getaways.
          </p>
        </div>

        <button
          onClick={onOpenAiPlanner}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-md transition-all self-start md:self-auto active:scale-95"
        >
          <Sparkles className="w-4 h-4" />
          <span>Need Custom Plan? Customize Now</span>
        </button>
      </div>

      {/* Filter Category Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none pb-2 sm:pb-0">
          {[
            { id: 'all', label: 'All Packages' },
            { id: 'hajj_umrah', label: '🕋 Hajj & Umrah' },
            { id: 'international', label: '✈️ International' },
            { id: 'domestic', label: '⛰️ Domestic India' },
            { id: 'luxury', label: '✨ Luxury Tours' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="w-full sm:w-64">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter destination..."
            className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-600 shadow-sm"
          />
        </div>
      </div>

      {/* Package Grid */}
      {filteredPackages.length === 0 ? (
        <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl shadow-sm">
          <Filter className="w-10 h-10 text-slate-400 mx-auto mb-2" />
          <h3 className="text-base font-bold text-slate-700">No packages found</h3>
          <p className="text-xs text-slate-500 mt-1">Try clearing your search filter or request a custom itinerary.</p>
          <button
            onClick={() => { setSelectedCategory('all'); setSearchTerm(''); }}
            className="mt-4 text-xs font-bold text-sky-600 hover:underline"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} onBookNow={onBookNow} />
          ))}
        </div>
      )}

    </section>
  );
};
