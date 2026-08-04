import React, { useState } from 'react';
import { TRIPATE_COUNTRIES_SERVED } from '../lib/data';
import { CountryServe } from '../types';
import { Globe, Search, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface CountriesGridSectionProps {
  onSelectCountryName: (countryName: string) => void;
}

export const CountriesGridSection: React.FC<CountriesGridSectionProps> = ({
  onSelectCountryName
}) => {
  const [filterQuery, setFilterQuery] = useState('');

  const filteredCountries = TRIPATE_COUNTRIES_SERVED.filter(c =>
    c.name.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <section className="py-16 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100 border border-sky-200 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3">
              <Globe className="w-3.5 h-3.5 text-sky-600" />
              <span>Worldwide Visa Support</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-serif uppercase">
              70+ COUNTRIES WE SERVE
            </h2>

            <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-xl">
              Click on any destination to check specific document checklists, e-visa pricing, and processing times.
            </p>
          </div>

          {/* Quick Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Search 70+ countries..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
        </div>

        {/* Flag Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filteredCountries.map((country: CountryServe) => (
            <div
              key={country.code}
              onClick={() => onSelectCountryName(country.name)}
              className="p-3 bg-slate-50 hover:bg-amber-50 rounded-2xl border border-slate-200 hover:border-amber-300 transition-all cursor-pointer flex items-center gap-3 group shadow-xs hover:shadow-md"
            >
              <span className="text-2xl group-hover:scale-125 transition-transform">{country.flag}</span>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-slate-900 group-hover:text-amber-700 truncate">
                  {country.name}
                </p>
                <span className="text-[10px] text-slate-400 font-semibold group-hover:text-slate-600">
                  Visa Online →
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredCountries.length === 0 && (
          <div className="text-center py-12 text-slate-500 text-sm">
            No country found matching "{filterQuery}". Contact our 24/7 team for custom filing!
          </div>
        )}

      </div>
    </section>
  );
};
