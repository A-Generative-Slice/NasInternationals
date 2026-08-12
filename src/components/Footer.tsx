import React from 'react';
import { Plane, Phone, Mail, MapPin, Globe, ShieldCheck, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <footer className="bg-[#041A30] text-white border-t border-slate-800">
      
      {/* Top Banner Accent */}
      <div className="bg-[#F5B800] py-3 text-[#062544] font-extrabold text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center space-x-2">
            <Plane className="w-4 h-4 transform -rotate-45" />
            <span>Apply For Your Visa Online In Minutes With 100% Approval Assistance</span>
          </div>
          <button
            onClick={() => navigateTo('/visas')}
            className="bg-[#062544] text-white px-4 py-1.5 rounded-full text-xs font-bold hover:bg-slate-800 transition cursor-pointer"
          >
            Explore Destinations ↗
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => navigateTo('/')}>
              <div className="w-9 h-9 rounded-full bg-[#F5B800] flex items-center justify-center text-[#062544]">
                <Plane className="w-5 h-5 transform -rotate-45" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                tripate
                <span className="text-[#F5B800] ml-1.5 text-xs font-semibold uppercase">NAS</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-medium max-w-sm">
              Tripate makes your visa process easy, fast, and fully online. Whether it's Japan, France, Dubai or Bhutan tours, we are your trusted travel partner.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-2 font-medium">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-[#F5B800] shrink-0" />
                <span>Saligramam, Chennai - 600093, India</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#F5B800] shrink-0" />
                <span>+91 90000 11111 / +91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#F5B800] shrink-0" />
                <span>support@tripate.com</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-[#F5B800] uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-300">
              <li><button onClick={() => navigateTo('/')} className="hover:text-[#F5B800]">Home</button></li>
              <li><button onClick={() => navigateTo('/tours')} className="hover:text-[#F5B800]">Tours Packages</button></li>
              <li><button onClick={() => navigateTo('/visas')} className="hover:text-[#F5B800]">Visa Applications</button></li>
              <li><button onClick={() => navigateTo('/contact')} className="hover:text-[#F5B800]">Contact Us</button></li>
              <li><button onClick={() => navigateTo('/blogs')} className="hover:text-[#F5B800]">Blogs & Guides</button></li>
              <li><button onClick={() => navigateTo('/faqs')} className="hover:text-[#F5B800]">FAQ's</button></li>
            </ul>
          </div>

          {/* Col 3: Popular Visas */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-[#F5B800] uppercase tracking-wider">Popular Visas</h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-300">
              <li><button onClick={() => navigateTo('/visas')} className="hover:text-[#F5B800]">Dubai 30-Day Express E-Visa</button></li>
              <li><button onClick={() => navigateTo('/visas')} className="hover:text-[#F5B800]">France (Schengen) Visa</button></li>
              <li><button onClick={() => navigateTo('/visas')} className="hover:text-[#F5B800]">Japan E-Visa Tourist</button></li>
              <li><button onClick={() => navigateTo('/visas')} className="hover:text-[#F5B800]">Thailand E-Visa</button></li>
              <li><button onClick={() => navigateTo('/visas')} className="hover:text-[#F5B800]">Canada Visitor Visa</button></li>
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
          <p>© 2026 Tripate - NAS Internationals. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <span className="hover:text-[#F5B800]">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-[#F5B800]">Terms & Conditions</span>
            <span>•</span>
            <span className="hover:text-[#F5B800]">Refund Policy</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
