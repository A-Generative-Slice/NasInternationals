import React, { useState } from 'react';
import { TRIPATE_TOURS } from '../lib/data';
import { TourPackage } from '../types';
import { 
  Compass, 
  MapPin, 
  Calendar, 
  Users, 
  CheckCircle, 
  Star, 
  ArrowRight,
  Sparkles,
  Plane,
  X,
  ShieldCheck,
  Building
} from 'lucide-react';

interface ToursSectionProps {
  onBookTour: (tourName: string, details: string) => void;
  onOpenAiPlanner: () => void;
}

export const ToursSection: React.FC<ToursSectionProps> = ({
  onBookTour,
  onOpenAiPlanner
}) => {
  const [selectedContinent, setSelectedContinent] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [activeTour, setActiveTour] = useState<TourPackage | null>(null);

  const filteredTours = TRIPATE_TOURS.filter((tour) => {
    const matchesContinent = selectedContinent === 'all' || tour.continent === selectedContinent;
    const matchesStatus = selectedStatus === 'all' || tour.status === selectedStatus;
    return matchesContinent && matchesStatus;
  });

  return (
    <section className="py-16 bg-slate-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-4 h-4" />
            <span>Handcrafted Small Group & Private Tours</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase font-sans">
            POPULAR <span className="text-amber-400">TOUR PACKAGES</span>
          </h2>

          <p className="mt-3 text-slate-300 text-base sm:text-lg">
            Guaranteed Small Group Vacations with All Visas, 4-Star Hotels, & Direct Flights from Chennai & Hyderabad.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
          
          {/* Continent Filter */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto scrollbar-none">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider hidden lg:inline mr-2">
              Region:
            </span>
            {['all', 'Asia', 'Europe', 'Americas', 'Africa'].map((continent) => (
              <button
                key={continent}
                onClick={() => setSelectedContinent(continent)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                  selectedContinent === continent
                    ? 'bg-amber-400 text-slate-950 shadow-md'
                    : 'bg-slate-700/60 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {continent === 'all' ? 'All Destinations' : continent}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider hidden md:inline">
              Availability:
            </span>
            <button
              onClick={() => setSelectedStatus(selectedStatus === 'OPEN' ? 'all' : 'OPEN')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                selectedStatus === 'OPEN'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
              }`}
            >
              🟢 Open for Booking
            </button>
          </div>

        </div>

        {/* Tour Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTours.map((tour) => (
            <div
              key={tour.id}
              className="bg-slate-800 rounded-3xl border border-slate-700 overflow-hidden shadow-xl hover:border-amber-400/50 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Image & Badge Header */}
              <div className="relative h-56 overflow-hidden bg-slate-900">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-black/30"></div>

                {/* Status Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-[11px] font-black tracking-wider uppercase shadow-md ${
                    tour.status === 'OPEN'
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-red-500 text-white'
                  }`}>
                    {tour.badge || tour.status}
                  </span>

                  {tour.groupOrPrivate && (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-900/80 backdrop-blur-md text-amber-300 border border-white/20">
                      {tour.groupOrPrivate} TOUR
                    </span>
                  )}
                </div>

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-amber-400 flex items-center gap-1 border border-amber-400/30">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{tour.rating}</span>
                </div>

                {/* Departure & Dates */}
                {tour.datesStr && (
                  <div className="absolute bottom-3 left-4 text-xs font-semibold text-slate-200 flex items-center gap-1.5 bg-slate-900/90 px-3 py-1 rounded-lg border border-slate-700">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>{tour.datesStr}</span>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{tour.destination}</span>
                    <span>•</span>
                    <span className="text-sky-400">{tour.duration}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2">
                    {tour.title}
                  </h3>

                  <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                    {tour.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="mt-4 space-y-1.5 border-t border-slate-700/60 pt-3">
                    {tour.highlights.slice(0, 3).map((hl, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing & CTA */}
                <div className="mt-6 pt-4 border-t border-slate-700 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Total Per Person</span>
                    <div className="text-2xl font-black text-amber-400">
                      ₹{tour.priceINR.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTour(tour)}
                    className="px-4 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 transition-all flex items-center gap-1.5 shadow-md active:scale-95"
                  >
                    <span>View Itinerary</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* AI Custom Tour Banner */}
        <div className="mt-16 bg-gradient-to-r from-amber-500/20 via-sky-500/20 to-indigo-500/20 p-8 rounded-3xl border border-amber-400/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 shadow-lg">
              <Sparkles className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white">Need a Customized Private Tour Package?</h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Tell our AI Itinerary generator where you want to go and get a instant personalized plan with hotels and flights!
              </p>
            </div>
          </div>

          <button
            onClick={onOpenAiPlanner}
            className="px-6 py-3.5 rounded-2xl bg-amber-400 text-slate-950 font-black text-sm hover:bg-amber-300 transition-all shadow-xl whitespace-nowrap"
          >
            Launch AI Itinerary Builder
          </button>
        </div>

      </div>

      {/* Tour Detail Modal */}
      {activeTour && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto text-white p-6 relative shadow-2xl animate-fadeIn">
            
            <button
              onClick={() => setActiveTour(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
              <Compass className="w-4 h-4" />
              <span>{activeTour.destination} • {activeTour.duration}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
              {activeTour.title}
            </h2>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 mb-6">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                {activeTour.badge || activeTour.status}
              </span>
              {activeTour.datesStr && (
                <span className="flex items-center gap-1 font-semibold text-sky-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{activeTour.datesStr}</span>
                </span>
              )}
              {activeTour.departureCity && (
                <span className="flex items-center gap-1 font-semibold text-slate-300">
                  <Plane className="w-3.5 h-3.5 text-amber-400" />
                  <span>Departs from {activeTour.departureCity}</span>
                </span>
              )}
            </div>

            <div className="h-64 rounded-2xl overflow-hidden mb-6">
              <img src={activeTour.image} alt={activeTour.title} className="w-full h-full object-cover" />
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Tour Description</h4>
                <p className="text-sm text-slate-200 leading-relaxed">{activeTour.description}</p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Package Inclusions</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeTour.inclusions.map((inc, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-emerald-300 bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-500/20">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {activeTour.itinerary && activeTour.itinerary.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Day-by-Day Itinerary</h4>
                  <div className="space-y-3">
                    {activeTour.itinerary.map((day) => (
                      <div key={day.day} className="bg-slate-800 p-3.5 rounded-xl border border-slate-700">
                        <span className="text-xs font-black text-amber-400 block mb-0.5">Day {day.day}: {day.title}</span>
                        <p className="text-xs text-slate-300">{day.details}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Total Price per Pax</span>
                <span className="text-2xl font-black text-amber-400">₹{activeTour.priceINR.toLocaleString('en-IN')}</span>
              </div>

              <button
                onClick={() => {
                  onBookTour(activeTour.title, `Tour Package: ${activeTour.title} (${activeTour.duration})`);
                  setActiveTour(null);
                }}
                className="px-6 py-3 rounded-2xl bg-amber-400 text-slate-950 font-black text-sm hover:bg-amber-300 transition-all shadow-xl"
              >
                Book This Tour Now
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
