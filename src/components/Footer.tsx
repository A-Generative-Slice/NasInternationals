import React from 'react';
import { Plane, Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <footer className="bg-[#041A30] text-white border-t border-slate-800">
      
      {/* Top Banner Accent - Official Services from Business Card */}
      <div className="bg-gradient-to-r from-[#036CFB] via-[#0284C7] to-[#0ea5e9] py-2.5 text-white font-extrabold text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center space-x-2 overflow-x-auto">
            <Plane className="w-4 h-4 transform -rotate-45 shrink-0" />
            <span className="tracking-wide text-[11px] uppercase">
              100% ONLINE SERVICES • HAJJ • UMRAH • VISA ASSISTANCE • TOUR PACKAGES • AIR TICKET • EDUCATION CONSULTANTS • DOCUMENTS ATTESTATION
            </span>
          </div>
          <button
            onClick={() => navigateTo('/visas')}
            className="bg-[#062544] text-white px-4 py-1 rounded-full text-xs font-bold hover:bg-[#041A30] transition cursor-pointer shrink-0 shadow-sm"
          >
            Apply Online ↗
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Brand & Official Card Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => navigateTo('/')}>
              <div className="w-10 h-10 rounded-full bg-[#036CFB] flex items-center justify-center text-white shadow-md">
                <Plane className="w-5 h-5 transform -rotate-45" />
              </div>
              <div>
                <span className="font-black text-xl tracking-tight text-white block leading-tight">
                  NAS INTERNATIONALS
                </span>
                <span className="text-[10px] font-bold text-[#38BDF8] uppercase tracking-widest block">
                  TOURS & TRAVELS • 100% ONLINE SERVICE
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-medium max-w-sm">
              Strictly online travel & visa portal for Hajj, Umrah, international visas, document attestation, educational consultancy, and group tour packages. Processed 100% digitally from anywhere in the world.
            </p>

            {/* Official Contact Info - Exclusively Mobile, Email & Website URL */}
            <div className="pt-2 text-xs text-slate-300 space-y-2.5 font-medium">
              <div className="text-[#38BDF8] font-bold text-xs uppercase tracking-wider">
                Managing Director: N. ABDUL HAKEEM
              </div>

              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#38BDF8] shrink-0" />
                <a href="tel:+919941900055" className="hover:text-white transition-colors">
                  Mobile / WhatsApp: <strong className="text-white">+91 99419 00055</strong>
                </a>
              </div>

              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#38BDF8] shrink-0" />
                <a href="mailto:info@nasinternationals.com" className="hover:text-white transition-colors">
                  Email: <strong className="text-white">info@nasinternationals.com</strong>
                </a>
              </div>

              <div className="flex items-center space-x-2">
                <Plane className="w-4 h-4 text-[#38BDF8] shrink-0 transform -rotate-45" />
                <a href="https://www.nasinternationals.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  Website: <strong className="text-white">www.nasinternationals.com</strong>
                </a>
              </div>

              <div className="pt-1">
                <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-[#036CFB]/20 text-[#38BDF8] border border-[#036CFB]/40">
                  🌐 Strictly Online Service • No In-Person Visits Needed
                </span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-[#38BDF8] uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-300">
              <li><button onClick={() => navigateTo('/')} className="hover:text-[#38BDF8]">Home</button></li>
              <li><button onClick={() => navigateTo('/tours')} className="hover:text-[#38BDF8]">Tour Packages</button></li>
              <li><button onClick={() => navigateTo('/visas')} className="hover:text-[#38BDF8]">Visa Applications</button></li>
              <li><button onClick={() => navigateTo('/contact')} className="hover:text-[#38BDF8]">Contact Us</button></li>
              <li><button onClick={() => navigateTo('/blogs')} className="hover:text-[#38BDF8]">Blogs & Guides</button></li>
              <li><button onClick={() => navigateTo('/faqs')} className="hover:text-[#38BDF8]">FAQ's</button></li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-[#38BDF8] uppercase tracking-wider">Our Services</h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-300">
              <li><button onClick={() => navigateTo('/visas')} className="hover:text-[#38BDF8]">Hajj & Umrah Packages</button></li>
              <li><button onClick={() => navigateTo('/visas')} className="hover:text-[#38BDF8]">Tourist & Business Visas</button></li>
              <li><button onClick={() => navigateTo('/visas')} className="hover:text-[#38BDF8]">Document Attestation</button></li>
              <li><button onClick={() => navigateTo('/visas')} className="hover:text-[#38BDF8]">Educational Consultancy</button></li>
              <li><button onClick={() => navigateTo('/visas')} className="hover:text-[#38BDF8]">Air Ticket Reservations</button></li>
            </ul>
          </div>

          {/* Col 4: User & Admin Portal */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-[#38BDF8] uppercase tracking-wider">Client Portals</h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-300">
              <li><button onClick={() => navigateTo('/dashboard')} className="hover:text-[#38BDF8]">My User Dashboard</button></li>
              <li><button onClick={() => navigateTo('/payment-tracker')} className="hover:text-[#38BDF8]">Track Payment Status</button></li>
              <li><button onClick={() => navigateTo('/apply')} className="hover:text-[#38BDF8]">Apply Visa Wizard</button></li>
              <li><button onClick={() => navigateTo('/admin/login')} className="hover:text-[#38BDF8] text-sky-300 flex items-center space-x-1"><ShieldCheck className="w-3.5 h-3.5 text-[#38BDF8]" /> <span>Admin Console Login</span></button></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-12 mt-12 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 font-medium gap-4">
          <p>© 2026 NAS INTERNATIONALS TOURS & TRAVELS. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <span>Social: @officialnasinternationals</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
