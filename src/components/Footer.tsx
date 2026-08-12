import React from 'react';
import { Plane, Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <footer className="bg-[#041A30] text-white border-t border-slate-800">
      
      {/* Top Banner Accent - Official Services from Business Card */}
      <div className="bg-[#F5B800] py-2.5 text-[#062544] font-extrabold text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center space-x-2 overflow-x-auto">
            <Plane className="w-4 h-4 transform -rotate-45 shrink-0" />
            <span className="tracking-wide text-[11px] uppercase">
              HAJJ • UMRAH • VISA ASSISTANCE • TOUR PACKAGES • AIR TICKET • EDUCATION CONSULTANTS • DOCUMENTS ATTESTATION
            </span>
          </div>
          <button
            onClick={() => navigateTo('/visas')}
            className="bg-[#062544] text-white px-4 py-1 rounded-full text-xs font-bold hover:bg-slate-800 transition cursor-pointer shrink-0"
          >
            Explore Services ↗
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Brand & Official Card Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => navigateTo('/')}>
              <div className="w-10 h-10 rounded-full bg-[#F5B800] flex items-center justify-center text-[#062544] shadow-md">
                <Plane className="w-5 h-5 transform -rotate-45" />
              </div>
              <div>
                <span className="font-black text-xl tracking-tight text-white block leading-tight">
                  NAS INTERNATIONALS
                </span>
                <span className="text-[10px] font-bold text-[#F5B800] uppercase tracking-widest block">
                  TOURS & TRAVELS • LET'S EXPLORE THE WORLD
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-medium max-w-sm">
              Official travel consultant for Hajj, Umrah, international visas, document attestation, educational consultancy, and group tour packages.
            </p>

            {/* Official Contact Info from Business Card */}
            <div className="pt-2 text-xs text-slate-300 space-y-2 font-medium">
              <div className="text-[#F5B800] font-bold text-xs">
                Managing Director: N. ABDUL HAKEEM
              </div>

              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-[#F5B800] shrink-0 mt-0.5" />
                <span>No. 144/183, First Floor, Valluvarkottam High Road, Nungambakkam, Chennai - 600034, Tamilnadu</span>
              </div>

              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#F5B800] shrink-0" />
                <span>+91 99419 00055 💬 / 044-26791505 ☎</span>
              </div>

              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#F5B800] shrink-0" />
                <span>info@nasinternationals.com</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-[#F5B800] uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-300">
              <li><button onClick={() => navigateTo('/')} className="hover:text-[#F5B800]">Home</button></li>
              <li><button onClick={() => navigateTo('/tours')} className="hover:text-[#F5B800]">Tour Packages</button></li>
              <li><button onClick={() => navigateTo('/visas')} className="hover:text-[#F5B800]">Visa Applications</button></li>
              <li><button onClick={() => navigateTo('/contact')} className="hover:text-[#F5B800]">Contact Us</button></li>
              <li><button onClick={() => navigateTo('/blogs')} className="hover:text-[#F5B800]">Blogs & Guides</button></li>
              <li><button onClick={() => navigateTo('/faqs')} className="hover:text-[#F5B800]">FAQ's</button></li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-[#F5B800] uppercase tracking-wider">Our Services</h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-300">
              <li><button onClick={() => navigateTo('/visas')} className="hover:text-[#F5B800]">Hajj & Umrah Packages</button></li>
              <li><button onClick={() => navigateTo('/visas')} className="hover:text-[#F5B800]">Tourist & Business Visas</button></li>
              <li><button onClick={() => navigateTo('/visas')} className="hover:text-[#F5B800]">Document Attestation</button></li>
              <li><button onClick={() => navigateTo('/visas')} className="hover:text-[#F5B800]">Educational Consultancy</button></li>
              <li><button onClick={() => navigateTo('/visas')} className="hover:text-[#F5B800]">Air Ticket Reservations</button></li>
            </ul>
          </div>

          {/* Col 4: User & Admin Portal */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-[#F5B800] uppercase tracking-wider">Client Portals</h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-300">
              <li><button onClick={() => navigateTo('/dashboard')} className="hover:text-[#F5B800]">My User Dashboard</button></li>
              <li><button onClick={() => navigateTo('/payment-tracker')} className="hover:text-[#F5B800]">Track Payment Status</button></li>
              <li><button onClick={() => navigateTo('/apply')} className="hover:text-[#F5B800]">Apply Visa Wizard</button></li>
              <li><button onClick={() => navigateTo('/admin/login')} className="hover:text-[#F5B800] text-amber-300 flex items-center space-x-1"><ShieldCheck className="w-3.5 h-3.5" /> <span>Admin Console Login</span></button></li>
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
