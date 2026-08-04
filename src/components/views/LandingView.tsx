import React from 'react';
import { Globe, Smile, ArrowRight, ShieldCheck, Compass, MapPin, Search, Star } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DESTINATIONS } from '../../data/mockData';

export const LandingView: React.FC = () => {
  const { setCurrentView, setSelectedDestination, setActiveTrackerAppId } = useApp();

  const handleApplyNow = () => {
    setCurrentView('visa-finder');
  };

  const handleTrackApp = () => {
    setCurrentView('user-dashboard');
  };

  const handleDestinationClick = (destName: string) => {
    setSelectedDestination(destName.split(' ')[0]);
    setCurrentView('visa-finder');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Desert & Skyline Background */}
      <section className="relative bg-[#071329] text-white min-h-[580px] flex items-center overflow-hidden">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2000&q=80"
            alt="Global Skyline"
            className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071329] via-[#071329]/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#071329] via-[#071329]/60 to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full text-center md:text-left">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#C8A24A]/20 border border-[#C8A24A]/40 text-[#EAC166] text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Government Approved & Certified Visa Agency</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Your Trusted <span className="gold-gradient-text">Global Visa</span> & Travel Partner
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-body max-w-2xl">
              Enterprise-grade Tours, Travels, Visa Assistance | Haj & Umrah Packages | Education Consultancy & Global Placement
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <button
                onClick={handleApplyNow}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#C8A24A] hover:bg-[#EAC166] text-[#0B1E3D] font-display font-bold text-sm tracking-wide rounded-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center space-x-2"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleTrackApp}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#036CFB]/20 hover:bg-[#036CFB]/30 border border-[#036CFB] text-white font-display font-bold text-sm tracking-wide rounded-lg transition-all flex items-center justify-center space-x-2 backdrop-blur-sm"
              >
                <span>Track Application</span>
              </button>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none overflow-hidden leading-none">
          <svg className="relative block w-full h-12 text-slate-50" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,120 L0,120 Z" fill="currentColor"></path>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-slate-50 py-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
            {/* Stat 1 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                <Globe className="w-6 h-6 text-[#036CFB]" />
              </div>
              <div>
                <div className="font-display text-3xl font-extrabold text-[#0B1E3D]">
                  100,000+
                </div>
                <div className="font-display font-bold text-slate-800 text-sm mt-0.5">
                  Visas Processed
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Seamless global mobility solutions for enterprises and individuals.
                </p>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                <Smile className="w-6 h-6 text-[#C8A24A]" />
              </div>
              <div>
                <div className="font-display text-3xl font-extrabold text-[#0B1E3D]">
                  95,000+
                </div>
                <div className="font-display font-bold text-slate-800 text-sm mt-0.5">
                  Happy Customers
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Trusted approval rates and dedicated 24/7 concierge support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-2 mb-12">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0B1E3D] tracking-tight">
            Featured Destinations
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-lg mx-auto">
            Seamless global mobility solutions for enterprises and individuals worldwide.
          </p>
        </div>

        {/* Destinations Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DESTINATIONS.map((dest) => (
            <div
              key={dest.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between"
            >
              <div className="relative h-52 overflow-hidden bg-slate-100">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-[#0B1E3D]/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-semibold text-[#EAC166]">
                  From ₹{dest.startingPrice.toLocaleString('en-IN')}
                </div>
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-[#0B1E3D] text-base">
                    {dest.name}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {dest.description}
                  </p>
                </div>

                <button
                  onClick={() => handleDestinationClick(dest.name)}
                  className="w-full py-2 bg-slate-100 hover:bg-[#036CFB] hover:text-white text-[#0B1E3D] font-display font-semibold text-xs rounded-lg transition-all text-center border border-slate-200 hover:border-[#036CFB]"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Haj & Umrah Highlight Banner */}
      <section className="bg-gradient-to-r from-[#0B1E3D] via-[#1A365D] to-[#071329] text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="px-3 py-1 rounded-full bg-[#C8A24A]/20 text-[#EAC166] border border-[#C8A24A]/40 text-xs font-semibold">
              Specialized Pilgrimage Packages
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold">
              Haj & Umrah Express Visa Logistics
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Complete Umrah e-visa assistance, hotel bookings near Al-Haram, guided transportation, and group flight bookings.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={() => {
                setSelectedDestination('Saudi Arabia');
                setCurrentView('visa-finder');
              }}
              className="py-3 px-6 bg-[#C8A24A] hover:bg-[#EAC166] text-[#0B1E3D] font-display font-bold text-xs rounded-lg shadow-lg transition text-center"
            >
              Explore Umrah Packages
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
