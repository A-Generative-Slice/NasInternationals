import React from 'react';
import { COMPANY_INFO, FEATURED_PACKAGES } from '../lib/data';
import { PackageCard } from './PackageCard';
import { 
  HeartHandshake, 
  ShieldCheck, 
  Hotel, 
  MapPin, 
  Users, 
  CheckCircle2, 
  BookOpen, 
  PhoneCall, 
  Send 
} from 'lucide-react';

interface HajjUmrahSectionProps {
  onBookNow: (pkgTitle: string, details: string) => void;
}

export const HajjUmrahSection: React.FC<HajjUmrahSectionProps> = ({ onBookNow }) => {
  const pilgrimagePackages = FEATURED_PACKAGES.filter((p) => p.category === 'hajj_umrah');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-12">
      
      {/* Banner Card */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 border border-emerald-600/30 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-xl text-white">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-300 text-xs font-semibold mb-4">
            <HeartHandshake className="w-4 h-4" />
            <span>NAS Internationals Dedicated Pilgrimage Desk</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-white leading-tight">
            Sacred Hajj & Umrah Tours Managed with Reverence
          </h2>

          <p className="text-sm text-slate-200 mt-3 leading-relaxed">
            With over 15+ years of dedicated service from Chennai, NAS Internationals provides end-to-end pilgrimage management: 5-Star Harambag accommodations, direct flights, Nusuk visa issuance, authentic Indian meals, and scholarly Ziyarat guidance.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onBookNow('Umrah Inquiry', 'Direct inquiry from Hajj & Umrah portal')}
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
            >
              Inquire Deluxe Umrah Package
            </button>

            <button
              onClick={() => {
                const text = `Assalamu Alaikum NAS Internationals! I would like details about Hajj & Umrah pilgrimage packages.`;
                window.open(`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
              }}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors border border-white/20"
            >
              <Send className="w-4 h-4 text-emerald-300" />
              <span>WhatsApp Direct Scholar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Pillars of Service Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 text-left shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 border border-amber-200">
            <Hotel className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">50m - 100m to Holy Harams</h3>
          <p className="text-xs text-slate-600 mt-1">
            Stay in 5-Star luxury hotels directly facing Masjid al-Haram in Makkah and Al-Masjid an-Nabawi in Madinah for effortless prayer access.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 text-left shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 border border-emerald-200">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Nusuk & Visa Guaranteed</h3>
          <p className="text-xs text-slate-600 mt-1">
            Authorized electronic Saudi visa processing with Rawdah slot booking via Nusuk platform handled by our specialist team.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 text-left shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4 border border-sky-200">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">South & North Indian Meals</h3>
          <p className="text-xs text-slate-600 mt-1">
            Enjoy full board buffet meals prepared by expert Indian chefs throughout your stay in Makkah and Madinah hotels.
          </p>
        </div>
      </div>

      {/* Featured Pilgrimage Packages */}
      <div>
        <h3 className="text-xl font-bold font-serif text-slate-100 mb-6">
          Active Pilgrimage Packages
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pilgrimagePackages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} onBookNow={onBookNow} />
          ))}
        </div>
      </div>

    </div>
  );
};
