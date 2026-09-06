import React from 'react';
import { Plane, Phone, Mail, Globe, Stamp, GraduationCap } from 'lucide-react';
import { useApp } from '../context/AppContext';
import logoImg from '../assets/logo.jpg';

export const Footer: React.FC = () => {
  const { navigateTo, setActiveModal } = useApp();

  return (
    <footer className="bg-[#031526] text-white border-t border-white/10 relative overflow-hidden pb-24 lg:pb-12">
      {/* Ambient luminous glow blobs for dark frosted reflections */}
      <div className="ambient-glow-blue top-0 left-1/4 -translate-x-1/2 opacity-30"></div>
      <div className="ambient-glow-sky bottom-10 right-10 opacity-20"></div>

      {/* Top Banner Accent - Official Services */}
      <div className="bg-gradient-to-r from-[#036CFB]/90 via-[#0284C7]/90 to-[#0ea5e9]/90 backdrop-blur-xl py-3 text-white font-extrabold text-xs border-b border-white/15 relative z-10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar max-w-full">
            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Plane className="w-3.5 h-3.5 transform -rotate-45" />
            </div>
            <span className="tracking-wide text-[11px] uppercase font-bold text-white whitespace-nowrap">
              100% ONLINE SERVICES • VISA SERVICES • AIR TICKETING • DOCUMENT ATTESTATION • EDUCATION CONSULTANCY
            </span>
          </div>
          <button
            onClick={() => navigateTo('/visas')}
            className="bg-[#062544]/90 hover:bg-[#062544] text-white px-4 py-1.5 rounded-full text-xs font-bold transition cursor-pointer shrink-0 shadow-md border border-white/20 min-h-[34px] flex items-center active:scale-95 focus-ring"
          >
            Apply Online ↗
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Brand & Official Card Info */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => navigateTo('/')}>
              <div className="w-12 h-12 rounded-2xl bg-white p-1 flex items-center justify-center shadow-lg shadow-[#036CFB]/30 group-hover:scale-105 transition-transform overflow-hidden shrink-0">
                <img src={logoImg} alt="NAS Internationals Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="font-black text-xl tracking-tight text-white block leading-tight">
                  NAS INTERNATIONALS
                </span>
                <span className="text-[10px] font-bold text-[#38BDF8] uppercase tracking-widest block">
                  100% ONLINE SERVICES
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-medium max-w-sm">
              Strictly online portal for Visa Services, Air Ticketing, Document Attestation, and Education Consultancy. Processed 100% digitally from anywhere in the world.
            </p>

            {/* Official Contact Info - Exclusively Mobile, Email & Website URL */}
            <div className="pt-2 text-xs text-slate-300 space-y-3 font-medium">
              <div className="text-[#38BDF8] font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]"></span>
                <span>Managing Director: N. ABDUL HAKEEM</span>
              </div>

              <div className="flex items-center space-x-3 p-2.5 rounded-2xl glass-frost-dark border border-white/10">
                <div className="w-8 h-8 rounded-xl bg-[#036CFB]/30 text-[#38BDF8] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <a href="tel:+919941900055" className="hover:text-white transition-colors">
                  Mobile / WhatsApp: <strong className="text-white block sm:inline">+91 99419 00055</strong>
                </a>
              </div>

              <div className="flex items-center space-x-3 p-2.5 rounded-2xl glass-frost-dark border border-white/10">
                <div className="w-8 h-8 rounded-xl bg-[#036CFB]/30 text-[#38BDF8] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <a href="mailto:info@nasinternationals.com" className="hover:text-white transition-colors break-all">
                  Email: <strong className="text-white block sm:inline">info@nasinternationals.com</strong>
                </a>
              </div>

              <div className="flex items-center space-x-3 p-2.5 rounded-2xl glass-frost-dark border border-white/10">
                <div className="w-8 h-8 rounded-xl bg-[#036CFB]/30 text-[#38BDF8] flex items-center justify-center shrink-0">
                  <Globe className="w-4 h-4 text-[#38BDF8]" />
                </div>
                <a href="https://www.nasinternationals.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  Website: <strong className="text-white block sm:inline">www.nasinternationals.com</strong>
                </a>
              </div>

              <div className="pt-1">
                <span className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-bold glass-pill-dark text-[#38BDF8] border border-[#036CFB]/40 shadow-xs">
                  <Globe className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>Strictly Online Service • Zero In-Person Visits Needed</span>
                </span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-black text-[#38BDF8] uppercase tracking-wider flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]"></span>
              <span>Quick Links</span>
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold text-slate-300">
              <li><button onClick={() => navigateTo('/')} className="hover:text-[#38BDF8] transition-colors py-1 min-h-[32px] flex items-center">Home</button></li>
              <li><button onClick={() => navigateTo('/visas')} className="hover:text-[#38BDF8] transition-colors py-1 min-h-[32px] flex items-center">Visa Applications</button></li>
              <li><button onClick={() => setActiveModal('air-ticketing')} className="hover:text-[#38BDF8] transition-colors py-1 min-h-[32px] flex items-center">Air Ticketing</button></li>
              <li><button onClick={() => setActiveModal('attestation')} className="hover:text-[#38BDF8] transition-colors py-1 min-h-[32px] flex items-center">Document Attestation</button></li>
              <li><button onClick={() => setActiveModal('education')} className="hover:text-[#38BDF8] transition-colors py-1 min-h-[32px] flex items-center">Education Consultancy</button></li>
              <li><button onClick={() => navigateTo('/contact')} className="hover:text-[#38BDF8] transition-colors py-1 min-h-[32px] flex items-center">Contact Us</button></li>
              <li><button onClick={() => navigateTo('/faqs')} className="hover:text-[#38BDF8] transition-colors py-1 min-h-[32px] flex items-center">FAQ's</button></li>
            </ul>
          </div>

          {/* Col 3: Services (Strictly the 4 approved services) */}
          <div className="space-y-4">
            <h4 className="text-xs font-black text-[#38BDF8] uppercase tracking-wider flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]"></span>
              <span>Our Services</span>
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold text-slate-300">
              <li>
                <button onClick={() => navigateTo('/visas')} className="hover:text-[#38BDF8] transition-colors py-1 min-h-[32px] flex items-center">
                  Visa Services
                </button>
              </li>
              <li>
                <button onClick={() => setActiveModal('air-ticketing')} className="hover:text-[#38BDF8] transition-colors py-1 min-h-[32px] flex items-center">
                  Air Ticketing
                </button>
              </li>
              <li>
                <button onClick={() => setActiveModal('attestation')} className="hover:text-[#38BDF8] transition-colors py-1 min-h-[32px] flex items-center">
                  Document Attestation
                </button>
              </li>
              <li>
                <button onClick={() => setActiveModal('education')} className="hover:text-[#38BDF8] transition-colors py-1 min-h-[32px] flex items-center">
                  Education Consultancy
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Online Services & Tracking */}
          <div className="space-y-4">
            <h4 className="text-xs font-black text-[#38BDF8] uppercase tracking-wider flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse"></span>
              <span>Online Services & Tracking</span>
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold text-slate-300">
              <li><button onClick={() => navigateTo('/payment-tracker')} className="hover:text-[#38BDF8] transition-colors py-1 min-h-[32px] flex items-center">Track Application Status</button></li>
              <li><button onClick={() => navigateTo('/apply')} className="hover:text-[#38BDF8] transition-colors py-1 min-h-[32px] flex items-center">Start Visa Application</button></li>
              <li><button onClick={() => navigateTo('/visas')} className="hover:text-[#38BDF8] transition-colors py-1 min-h-[32px] flex items-center">Express E-Visas</button></li>
              <li><button onClick={() => setActiveModal('air-ticketing')} className="hover:text-[#38BDF8] transition-colors py-1 min-h-[32px] flex items-center">Flight Reservation Desk</button></li>
              <li><button onClick={() => navigateTo('/contact')} className="hover:text-[#38BDF8] transition-colors py-1 min-h-[32px] flex items-center">24/7 Digital Helpline</button></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-10 mt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 font-medium gap-4">
          <p>© 2026 NAS INTERNATIONALS. All rights reserved.</p>
          <div className="flex items-center space-x-4 text-[#38BDF8]">
            <span>100% Digital Operations • Verified Travel & Visa Portal</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
