import React, { useState } from 'react';
import { COMPANY_INFO } from '../lib/data';
import { 
  Search, 
  Plane, 
  ShieldCheck, 
  Users, 
  Globe,
  Sparkles,
  CheckCircle2,
  MapPin
} from 'lucide-react';

interface HeroProps {
  onSearchVisa: (query: string) => void;
  onOpenAiPlanner: () => void;
  onSelectCountry: (countryName: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onSearchVisa,
  onOpenAiPlanner,
  onSelectCountry
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearchVisa(query);
    }
  };

  const POPULAR_QUICK_SEARCHES = ['Japan', 'France', 'Dubai', 'United Kingdom', 'Vietnam', 'Mongolia', 'Sri Lanka'];

  return (
    <div className="relative bg-gradient-to-b from-[#0a192f] via-[#0d2240] to-slate-900 text-white pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden">
      
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-10 right-10 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-sky-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 flex flex-col items-center text-center">
        
        {/* Top Trust Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-xs sm:text-sm font-semibold mb-6 shadow-lg">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>100% Online Hassle-Free Visa Processing for Indian Travelers</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-tight max-w-5xl font-sans uppercase">
          GET THE VISA. <br className="hidden sm:inline" />
          <span className="text-amber-400">WITHOUT ANY STRESS.</span>
        </h1>

        {/* Tagline */}
        <p className="mt-5 text-base sm:text-xl text-slate-300 max-w-3xl font-normal leading-relaxed">
          Whether it's Japan, France, or Dubai, NAS Internationals makes your visa process easy, fast, and fully online.
        </p>

        {/* Main Interactive Search Input Card */}
        <div className="mt-10 w-full max-w-3xl bg-white p-3 sm:p-4 rounded-3xl shadow-2xl text-slate-900 border border-slate-200">
          
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 text-left px-3 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-amber-500" />
            <span>Where to, Captain? The world is your...</span>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-2">
            <div className="relative w-full flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search your visa by country - e.g. Japan, France, Dubai..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-100 text-slate-900 placeholder-slate-400 font-medium text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-amber-400 text-slate-950 font-black text-sm sm:text-base hover:bg-amber-300 transition-all flex items-center justify-center gap-2 shadow-md active:scale-95"
            >
              <Search className="w-5 h-5" />
              <span>Search Visa</span>
            </button>
          </form>

          {/* Quick Popular Tags */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs text-slate-500 px-2">
            <span className="font-bold text-slate-700">Trending:</span>
            {POPULAR_QUICK_SEARCHES.map((country) => (
              <button
                key={country}
                type="button"
                onClick={() => onSelectCountry(country)}
                className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-amber-100 hover:text-amber-800 text-slate-600 font-medium transition-colors"
              >
                {country}
              </button>
            ))}
          </div>
        </div>

        {/* Floating Trust Metrics Banner */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl text-left">
          
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-black text-white">240+ Trusted Travelers</p>
              <p className="text-xs text-slate-300">Happy journey reviews</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-400/20 text-emerald-400 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-black text-white">180+ Successful Visas</p>
              <p className="text-xs text-slate-300">99.2% approval rate</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-400/20 text-sky-400 flex items-center justify-center font-bold">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-black text-white">70+ Countries Served</p>
              <p className="text-xs text-slate-300">eVisas & embassy filing</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
