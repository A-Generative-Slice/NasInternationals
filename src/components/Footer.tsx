import React from 'react';
import { COMPANY_INFO } from '../lib/data';
import { Plane, Phone, Mail, MapPin, ShieldCheck, Heart, Sparkles, Globe } from 'lucide-react';

interface FooterProps {
  onNavigateTab: (tab: string) => void;
  onOpenAiPlanner: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateTab,
  onOpenAiPlanner
}) => {
  return (
    <footer className="bg-[#050c18] text-slate-400 text-sm border-t border-slate-800">
      
      {/* Upper Footer CTA Strip */}
      <div className="bg-[#0a192f] border-b border-slate-800 py-10 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 shadow-lg font-black">
              <Plane className="w-6 h-6 transform -rotate-12" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white">Ready for your next journey?</h3>
              <p className="text-xs text-slate-300">Apply for your online e-Visa in 3 minutes or let our AI plan your trip!</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigateTab('visa')}
              className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-colors shadow-md"
            >
              Apply Visa Online
            </button>

            <button
              onClick={onOpenAiPlanner}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-400/30 font-bold text-xs transition-colors"
            >
              AI Itinerary Planner
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400 flex items-center justify-center shadow-lg">
              <Plane className="w-5 h-5 text-slate-950 transform -rotate-12" />
            </div>
            <span className="text-xl font-black text-white tracking-tight uppercase">
              NAS<span className="text-amber-400"> Internationals</span>
            </span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            NAS Internationals is a premier online visa and tour booking portal operated by NAS Internationals Tours & Travels, Nungambakkam, Chennai. We make e-Visas, Schengen filings, and international group tours simple, fast, and 100% online.
          </p>

          <div className="pt-2 text-xs text-slate-300 space-y-2">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Mobile / WA: <strong className="text-white">{COMPANY_INFO.phone}</strong> | Landline: <strong className="text-white">{COMPANY_INFO.landline}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Email: <strong className="text-white">{COMPANY_INFO.email}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Web: <strong className="text-white">{COMPANY_INFO.website}</strong> | Social: <strong className="text-white">{COMPANY_INFO.socialHandle}</strong></span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>Address: <strong className="text-white">{COMPANY_INFO.address}</strong></span>
            </div>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-amber-400 pl-2">
            Quick Navigation
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => onNavigateTab('home')} className="hover:text-amber-400 transition-colors">
                Home
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateTab('tours')} className="hover:text-amber-400 transition-colors flex items-center gap-1">
                <span>Tour Packages</span>
                <span className="text-[9px] bg-amber-400 text-slate-950 font-black px-1 rounded">NEW</span>
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateTab('visa')} className="hover:text-amber-400 transition-colors">
                Online Visa Services
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateTab('faqs')} className="hover:text-amber-400 transition-colors">
                Frequently Asked Questions
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateTab('contact')} className="hover:text-amber-400 transition-colors">
                Contact Us
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Top Visa Destinations */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-amber-400 pl-2">
            Top Visa Destinations
          </h4>
          <ul className="space-y-2 text-xs">
            <li><button onClick={() => onNavigateTab('visa')} className="hover:text-white">🇯🇵 Japan Tourist Visa</button></li>
            <li><button onClick={() => onNavigateTab('visa')} className="hover:text-white">🇫🇷 France Schengen Visa</button></li>
            <li><button onClick={() => onNavigateTab('visa')} className="hover:text-white">🇦🇪 Dubai 30-Day Express</button></li>
            <li><button onClick={() => onNavigateTab('visa')} className="hover:text-white">🇬🇧 United Kingdom Visitor</button></li>
            <li><button onClick={() => onNavigateTab('visa')} className="hover:text-white">🇻🇳 Vietnam 90-Day eVisa</button></li>
            <li><button onClick={() => onNavigateTab('visa')} className="hover:text-white">🇲🇳 Mongolia Tourist eVisa</button></li>
            <li><button onClick={() => onNavigateTab('visa')} className="hover:text-white">🇱🇰 Sri Lanka Instant ETA</button></li>
          </ul>
        </div>

        {/* Column 4: Trust & Compliance */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-amber-400 pl-2">
            Trust & Security
          </h4>
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Govt. Authorized</span>
              </div>
              <p className="text-[11px] text-slate-400">Official registered travel agency under NAS Internationals.</p>
            </div>

            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold mb-1">
                <Sparkles className="w-4 h-4" />
                <span>24/7 Helpline</span>
              </div>
              <p className="text-[11px] text-slate-400">Direct WhatsApp support for urgent passport assistance.</p>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Legal Copyright Strip */}
      <div className="bg-[#03070f] border-t border-slate-800/80 py-6 px-4 sm:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} NAS Internationals Tours & Travels. All Rights Reserved.</p>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms & Conditions</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">Refund Policy</span>
          </div>
        </div>
      </div>

    </footer>
  );
};
