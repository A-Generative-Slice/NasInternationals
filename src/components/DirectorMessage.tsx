import React from 'react';
import { COMPANY_INFO } from '../lib/data';
import { 
  Phone, 
  Mail, 
  Globe, 
  MapPin, 
  UserCheck, 
  Award, 
  MessageSquare, 
  Share2,
  ExternalLink
} from 'lucide-react';

export const DirectorMessage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold text-sky-600 uppercase tracking-widest bg-sky-50 px-3 py-1 rounded-full border border-sky-200 inline-block mb-3">
          LEADERSHIP & HEADQUARTERS
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold font-serif text-slate-900">
          Welcome to NAS Internationals Tours & Travels
        </h2>
        <p className="text-sm text-slate-600 mt-2">
          Headquartered in Nungambakkam, Chennai, offering premier travel assistance, Hajj & Umrah pilgrimage, air tickets, visa processing, and certificate attestations.
        </p>
      </div>

      {/* Main Grid: Card & Director Profile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Digital Business Card Component (Recreating uploaded card design visually) */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden flex flex-col justify-between">
          
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-2xl pointer-events-none"></div>

          <div>
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-wide">{COMPANY_INFO.director}</h3>
                <p className="text-xs font-bold text-sky-600 uppercase tracking-widest">{COMPANY_INFO.designation}</p>
              </div>

              <div className="text-right">
                <span className="text-xl font-bold font-serif text-slate-900">NAS</span>
                <span className="text-[10px] text-amber-600 font-sans block uppercase font-bold">INTERNATIONALS TOURS & TRAVELS</span>
              </div>
            </div>

            {/* Business Card Contact List */}
            <div className="space-y-3 text-xs sm:text-sm text-slate-700">
              <a 
                href={`tel:${COMPANY_INFO.phone}`} 
                className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-sky-400 transition-all"
              >
                <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Mobile / WhatsApp: <strong>{COMPANY_INFO.phone}</strong></span>
              </a>

              <a 
                href={`tel:${COMPANY_INFO.landline}`} 
                className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-sky-400 transition-all"
              >
                <Phone className="w-4 h-4 text-sky-600 shrink-0" />
                <span>Landline Office: <strong>{COMPANY_INFO.landline}</strong></span>
              </a>

              <a 
                href={`mailto:${COMPANY_INFO.email}`} 
                className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-sky-400 transition-all"
              >
                <Mail className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Email: <strong>{COMPANY_INFO.email}</strong></span>
              </a>

              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <Globe className="w-4 h-4 text-purple-600 shrink-0" />
                <span>Web: <strong>{COMPANY_INFO.website}</strong></span>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <Share2 className="w-4 h-4 text-pink-600 shrink-0" />
                <span>Social Handle: <strong>{COMPANY_INFO.socialHandle}</strong></span>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-700 leading-relaxed">
                  <strong>Address:</strong> {COMPANY_INFO.address}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 text-center">
            <span className="text-xs font-serif italic text-slate-900 font-semibold">
              "{COMPANY_INFO.tagline}"
            </span>
          </div>
        </div>

        {/* Message from MD */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between text-left shadow-sm">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center">
                <UserCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Message from the Managing Director</h3>
                <p className="text-xs text-sky-600 font-semibold">{COMPANY_INFO.director}</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal space-y-3">
              <span>
                "At NAS Internationals Tours & Travels, we believe travel is more than reaching a destination—it is about creating lifelong memories, spiritual fulfillment, and peace of mind."
              </span>
              <br className="my-2" />
              <span>
                "Whether you are planning a sacred Hajj or Umrah journey, applying for an urgent UAE/Saudi/Schengen visa, booking flight tickets, or getting your university documents attested, our dedicated team in Chennai ensures transparent, personalized, and stress-free service."
              </span>
            </p>

            {/* List of Services on Card */}
            <div className="mt-6">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Our Core Services</h4>
              <div className="flex flex-wrap gap-2">
                {COMPANY_INFO.services.map((srv, idx) => (
                  <span key={idx} className="bg-slate-50 border border-slate-200 text-slate-700 text-xs px-3 py-1 rounded-lg font-medium">
                    ✓ {srv}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Verified Chennai Headquarters</span>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(COMPANY_INFO.googleMapsQuery)}`}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-bold text-sky-600 hover:underline flex items-center gap-1"
            >
              <span>View Map Location</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>

    </div>
  );
};
