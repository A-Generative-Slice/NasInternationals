import React, { useState } from 'react';
import { TourPackage } from '../types';
import { 
  Star, 
  Clock, 
  Check, 
  ChevronRight, 
  Hotel, 
  Plane, 
  ShieldCheck, 
  Sparkles,
  HeartHandshake,
  X,
  Send
} from 'lucide-react';
import { COMPANY_INFO } from '../lib/data';

interface PackageCardProps {
  pkg: TourPackage;
  onBookNow: (pkgTitle: string, details: string) => void;
}

export const PackageCard: React.FC<PackageCardProps> = ({ pkg, onBookNow }) => {
  const [showDetailModal, setShowDetailModal] = useState(false);

  return (
    <>
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col group">
        
        {/* Package Image */}
        <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100">
          <img
            src={pkg.image}
            alt={pkg.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>

          {pkg.badge && (
            <span className="absolute top-3 left-3 bg-amber-500 text-slate-950 font-bold text-[10px] px-2.5 py-1 rounded-full shadow-md tracking-wider uppercase">
              {pkg.badge}
            </span>
          )}

          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-semibold text-white">
            <span className="flex items-center gap-1 bg-slate-900/80 px-2.5 py-1 rounded-lg backdrop-blur text-slate-200">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              {pkg.duration}
            </span>

            <span className="flex items-center gap-1 bg-slate-900/80 px-2.5 py-1 rounded-lg backdrop-blur text-amber-400 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              {pkg.rating} ({pkg.reviewsCount})
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-bold text-sky-600 uppercase tracking-wider mb-1">
              {pkg.destination}
            </div>

            <h3 className="text-base font-bold text-slate-900 line-clamp-2 leading-snug">
              {pkg.title}
            </h3>

            <p className="text-xs text-slate-600 mt-2 line-clamp-2">
              {pkg.description}
            </p>

            {/* Quick Inclusions Preview */}
            <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-3">
              {pkg.highlights.slice(0, 3).map((hl, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="truncate">{hl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing & Actions */}
          <div className="mt-5 border-t border-slate-100 pt-3.5 flex items-center justify-between gap-2">
            <div>
              {pkg.originalPriceINR && (
                <span className="text-[11px] text-slate-400 line-through block font-mono">
                  ₹{pkg.originalPriceINR.toLocaleString('en-IN')}
                </span>
              )}
              <span className="text-lg font-black text-slate-900 font-mono">
                ₹{pkg.priceINR.toLocaleString('en-IN')}
                <span className="text-[10px] text-slate-500 font-sans font-normal ml-1">/ person</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowDetailModal(true)}
                className="px-3 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Details
              </button>

              <button
                onClick={() => onBookNow(pkg.title, `Duration: ${pkg.duration}, Price: ₹${pkg.priceINR}`)}
                className="px-3.5 py-2 text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white rounded-xl shadow-sm transition-all flex items-center gap-1 active:scale-95"
              >
                <span>Inquire</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Package Detailed Modal */}
      {showDetailModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl relative animate-scaleUp">
            
            <button
              onClick={() => setShowDetailModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="bg-amber-500/20 text-amber-400 font-mono font-bold text-xs px-2.5 py-0.5 rounded border border-amber-500/30">
                {pkg.category.toUpperCase().replace('_', ' ')}
              </span>
              <span className="text-xs text-slate-400">{pkg.duration}</span>
            </div>

            <h2 className="text-2xl font-bold font-serif text-slate-100 mb-2">{pkg.title}</h2>
            <p className="text-xs text-slate-300 mb-6">{pkg.description}</p>

            {/* Hotel Highlights if available */}
            {(pkg.makkahHotel || pkg.madinahHotel) && (
              <div className="bg-emerald-950/50 border border-emerald-500/30 rounded-2xl p-4 mb-6">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <HeartHandshake className="w-4 h-4" />
                  <span>Pilgrimage Hotel Proximity</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200">
                  {pkg.makkahHotel && (
                    <div className="flex items-center gap-2">
                      <Hotel className="w-4 h-4 text-amber-400 shrink-0" />
                      <span><strong>Makkah:</strong> {pkg.makkahHotel}</span>
                    </div>
                  )}
                  {pkg.madinahHotel && (
                    <div className="flex items-center gap-2">
                      <Hotel className="w-4 h-4 text-amber-400 shrink-0" />
                      <span><strong>Madinah:</strong> {pkg.madinahHotel}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Complete Inclusions */}
            <div className="mb-6">
              <h4 className="text-sm font-bold text-slate-200 mb-3">Package Inclusions</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {pkg.inclusions.map((inc, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-300 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Day-by-Day Itinerary Preview */}
            <div className="mb-6">
              <h4 className="text-sm font-bold text-slate-200 mb-3">Day-by-Day Schedule Highlights</h4>
              <div className="space-y-2">
                {pkg.itinerary.map((day) => (
                  <div key={day.day} className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 text-left">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                      <span>Day {day.day}:</span>
                      <span className="text-slate-200">{day.title}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{day.details}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="border-t border-slate-800 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-400 block">Total Package Price</span>
                <span className="text-2xl font-black text-amber-400 font-mono">
                  ₹{pkg.priceINR.toLocaleString('en-IN')}
                  <span className="text-xs text-slate-400 font-sans"> / person</span>
                </span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => {
                    const text = `Hi NAS Internationals! I want to inquire about package: ${pkg.title} (${pkg.duration})`;
                    window.open(`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
                  }}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>WhatsApp Agent</span>
                </button>

                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    onBookNow(pkg.title, `Package ID: ${pkg.id}, Duration: ${pkg.duration}`);
                  }}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md"
                >
                  Book Inquiry
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
