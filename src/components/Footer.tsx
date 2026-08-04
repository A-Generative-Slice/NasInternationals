import React from 'react';
import { Globe, Phone, Mail, MapPin, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setCurrentView } = useApp();

  return (
    <footer className="bg-[#071329] text-slate-300 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#C8A24A] via-[#EAC166] to-[#9A772B] p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-[#0B1E3D] rounded-full flex items-center justify-center">
                  <Globe className="w-4 h-4 text-[#EAC166]" />
                </div>
              </div>
              <span className="font-display font-extrabold text-white text-lg tracking-wider">
                NAS <span className="text-[#EAC166]">INTERNATIONALS</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Your premier corporate partner for global visa processing, haj & umrah logistics, document attestation, and enterprise travel solutions across 120+ destinations worldwide.
            </p>
            <div className="flex items-center space-x-3 text-xs text-slate-400 pt-2">
              <ShieldCheck className="w-4 h-4 text-[#C8A24A]" />
              <span>Government Approved & Embassy Accredited Travel Partner</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-white text-xs tracking-wider uppercase text-[#EAC166]">
              Visa Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => setCurrentView('visa-finder')} className="hover:text-white transition">Tourist Visas</button></li>
              <li><button onClick={() => setCurrentView('visa-finder')} className="hover:text-white transition">Business Visas</button></li>
              <li><button onClick={() => setCurrentView('visa-finder')} className="hover:text-white transition">Student & Study Visas</button></li>
              <li><button onClick={() => setCurrentView('visa-finder')} className="hover:text-white transition">Employment & Work Permits</button></li>
              <li><button onClick={() => setCurrentView('visa-finder')} className="hover:text-white transition">Document Attestation</button></li>
            </ul>
          </div>

          {/* Quick Actions */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-white text-xs tracking-wider uppercase text-[#EAC166]">
              Portals & Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => setCurrentView('wizard')} className="hover:text-white transition">Application Wizard</button></li>
              <li><button onClick={() => setCurrentView('user-dashboard')} className="hover:text-white transition">Applicant Dashboard</button></li>
              <li><button onClick={() => setCurrentView('payment-tracker')} className="hover:text-white transition">Payment Verification</button></li>
              <li><button onClick={() => setCurrentView('admin-dashboard')} className="hover:text-white transition">Admin Operations</button></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-white text-xs tracking-wider uppercase text-[#EAC166]">
              Support Hotline
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-[#C8A24A]" />
                <span>+901-974-0030</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-[#C8A24A]" />
                <span>support@nas-internationals.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-3.5 h-3.5 text-[#C8A24A] shrink-0 mt-0.5" />
                <span>NAS Tower, Executive Business Bay, Dubai & New Delhi</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 NAS INTERNATIONALS. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-slate-300">Privacy Policy</a>
            <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-slate-300">Terms of Service</a>
            <a href="#refund" onClick={(e) => e.preventDefault()} className="hover:text-slate-300">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
