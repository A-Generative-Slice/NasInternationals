import React, { useState } from 'react';
import { Plane, Menu, X, Globe, Stamp, GraduationCap, FileText, Phone, Home, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import logoImg from '../assets/logo.jpg';

export const Header: React.FC = () => {
  const { currentView, navigateTo, setActiveModal } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (path: string) => {
    navigateTo(path);
    setMobileMenuOpen(false);
  };

  const handleOpenModal = (modal: 'attestation' | 'air-ticketing' | 'education') => {
    setActiveModal(modal);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* TOP FROSTED GLASS HEADER */}
      <header className="sticky top-0 z-50 bg-[#062544]/85 backdrop-blur-2xl text-white border-b border-white/10 shadow-lg shadow-black/10 transition-all">
        {/* Subtle luminous blue accent line on top */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#036CFB] to-transparent opacity-90"></div>

        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Brand Logo - NAS Internationals */}
          <div className="flex items-center space-x-2.5 sm:space-x-3 cursor-pointer group" onClick={() => handleNavClick('/')}>
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-white p-1 flex items-center justify-center shadow-lg shadow-[#036CFB]/30 border border-white/20 group-hover:scale-105 transition-all overflow-hidden shrink-0">
              <img src={logoImg} alt="NAS Internationals Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-lg sm:text-2xl tracking-tight text-white flex items-center">
                NAS
                <span className="text-[#38BDF8] ml-1.5 sm:ml-2 text-[9px] sm:text-xs font-bold uppercase tracking-widest bg-white/10 backdrop-blur-md px-1.5 sm:px-2 py-0.5 rounded-full border border-white/15">
                  INTERNATIONALS
                </span>
              </span>
              <span className="text-[10px] text-slate-300 font-semibold tracking-wider hidden sm:block">
                100% Online Visa & Travel Services
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-inner">
            <button
              onClick={() => handleNavClick('/')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                currentView === 'home'
                  ? 'bg-[#036CFB] text-white shadow-md shadow-[#036CFB]/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Home
            </button>

            {/* 1. Visa Services */}
            <button
              onClick={() => handleNavClick('/visas')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                currentView === 'visa-finder'
                  ? 'bg-[#036CFB] text-white shadow-md shadow-[#036CFB]/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Visa Services
            </button>

            {/* 2. Air Ticketing */}
            <button
              onClick={() => handleOpenModal('air-ticketing')}
              className="px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer text-slate-300 hover:text-white hover:bg-white/10 flex items-center space-x-1"
            >
              <Plane className="w-3.5 h-3.5 text-[#38BDF8] transform -rotate-45" />
              <span>Air Ticketing</span>
            </button>

            {/* 3. Document Attestation */}
            <button
              onClick={() => handleOpenModal('attestation')}
              className="px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer text-slate-300 hover:text-white hover:bg-white/10 flex items-center space-x-1"
            >
              <Stamp className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Document Attestation</span>
            </button>

            {/* 4. Education Consultancy */}
            <button
              onClick={() => handleOpenModal('education')}
              className="px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer text-slate-300 hover:text-white hover:bg-white/10 flex items-center space-x-1"
            >
              <GraduationCap className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Education Consultancy</span>
            </button>

            {/* Track Application Nav Item with Radar Dot */}
            <button
              onClick={() => handleNavClick('/payment')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                currentView === 'payment-tracker' || currentView === 'user-dashboard'
                  ? 'bg-[#036CFB] text-white shadow-md shadow-[#036CFB]/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Track Application</span>
            </button>

            <button
              onClick={() => handleNavClick('/faqs')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                currentView === 'faqs'
                  ? 'bg-[#036CFB] text-white shadow-md shadow-[#036CFB]/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              FAQ's
            </button>

            <button
              onClick={() => handleNavClick('/contact')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                currentView === 'contact'
                  ? 'bg-[#036CFB] text-white shadow-md shadow-[#036CFB]/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Contact Us
            </button>
          </nav>

          {/* Right Action Callouts: Direct Phone & Apply Button */}
          <div className="hidden sm:flex items-center space-x-3">
            <a
              href="tel:+919941900055"
              className="flex items-center space-x-2 px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-bold text-slate-200 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>+91 99419 00055</span>
            </a>

            <button
              onClick={() => handleNavClick('/apply')}
              className="px-5 py-2.5 bg-gradient-to-r from-[#036CFB] via-[#0284C7] to-[#38BDF8] hover:from-[#0256c7] hover:to-[#036CFB] text-white font-display font-bold text-xs rounded-full shadow-lg shadow-[#036CFB]/30 border border-white/20 transition-all flex items-center space-x-1.5 cursor-pointer active:scale-98"
            >
              <span>Apply Online</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Quick Action & Hamburger trigger */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={() => handleNavClick('/apply')}
              className="px-3 py-1.5 min-h-[36px] bg-gradient-to-r from-[#036CFB] to-[#38BDF8] text-white font-bold text-xs rounded-full shadow-md shadow-[#036CFB]/25 active:scale-95 flex items-center"
            >
              Apply
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-200 bg-white/10 border border-white/15 backdrop-blur-md active:bg-white/20 min-h-[38px] min-w-[38px] flex items-center justify-center cursor-pointer active:scale-95"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Frosted Glass Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#041A30]/98 backdrop-blur-2xl border-b border-white/15 px-3.5 sm:px-4 pt-3 pb-6 space-y-3.5 shadow-2xl animate-in fade-in slide-in-from-top-3 duration-200 max-h-[calc(100dvh-4.25rem)] overflow-y-auto overscroll-contain">
            <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
              <button
                onClick={() => handleNavClick('/')}
                className="flex items-center space-x-2 p-2.5 sm:p-3 min-h-[44px] rounded-2xl bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 text-left text-xs font-bold text-white transition-all active:scale-98"
              >
                <Home className="w-4 h-4 text-[#38BDF8] shrink-0" />
                <span>Home</span>
              </button>
              <button
                onClick={() => handleNavClick('/visas')}
                className="flex items-center space-x-2 p-2.5 sm:p-3 min-h-[44px] rounded-2xl bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 text-left text-xs font-bold text-white transition-all active:scale-98"
              >
                <Globe className="w-4 h-4 text-[#38BDF8] shrink-0" />
                <span>Visa Services</span>
              </button>
              <button
                onClick={() => handleOpenModal('air-ticketing')}
                className="flex items-center space-x-2 p-2.5 sm:p-3 min-h-[44px] rounded-2xl bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 text-left text-xs font-bold text-white transition-all active:scale-98"
              >
                <Plane className="w-4 h-4 text-[#38BDF8] transform -rotate-45 shrink-0" />
                <span>Air Ticketing</span>
              </button>
              <button
                onClick={() => handleOpenModal('attestation')}
                className="flex items-center space-x-2 p-2.5 sm:p-3 min-h-[44px] rounded-2xl bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 text-left text-xs font-bold text-white transition-all active:scale-98"
              >
                <Stamp className="w-4 h-4 text-[#38BDF8] shrink-0" />
                <span>Document Attestation</span>
              </button>
              <button
                onClick={() => handleOpenModal('education')}
                className="flex items-center space-x-2 p-2.5 sm:p-3 min-h-[44px] rounded-2xl bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 text-left text-xs font-bold text-white transition-all active:scale-98"
              >
                <GraduationCap className="w-4 h-4 text-[#38BDF8] shrink-0" />
                <span>Education Consultancy</span>
              </button>
              <button
                onClick={() => handleNavClick('/payment')}
                className="flex items-center space-x-2 p-2.5 sm:p-3 min-h-[44px] rounded-2xl bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 text-left text-xs font-bold text-white transition-all active:scale-98"
              >
                <FileText className="w-4 h-4 text-[#38BDF8] shrink-0" />
                <span>Track Application</span>
              </button>
              <button
                onClick={() => handleNavClick('/faqs')}
                className="flex items-center space-x-2 p-2.5 sm:p-3 min-h-[44px] rounded-2xl bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 text-left text-xs font-bold text-white transition-all active:scale-98"
              >
                <Sparkles className="w-4 h-4 text-[#38BDF8] shrink-0" />
                <span>FAQ Support</span>
              </button>
              <button
                onClick={() => handleNavClick('/contact')}
                className="flex items-center space-x-2 p-2.5 sm:p-3 min-h-[44px] rounded-2xl bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 text-left text-xs font-bold text-white transition-all active:scale-98"
              >
                <Phone className="w-4 h-4 text-[#38BDF8] shrink-0" />
                <span>Contact Us</span>
              </button>
            </div>

            {/* Quick Contact & Apply in Drawer */}
            <div className="pt-2 border-t border-white/10 space-y-2">
              <a
                href="tel:+919941900055"
                className="flex items-center justify-center space-x-2 p-3 min-h-[44px] rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-[#38BDF8] active:scale-98 transition-all"
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span className="truncate">Call Online Helpline: +91 99419 00055</span>
              </a>

              <button
                onClick={() => handleNavClick('/apply')}
                className="w-full py-3 min-h-[46px] bg-gradient-to-r from-[#036CFB] to-[#38BDF8] text-white font-bold text-center rounded-full text-xs shadow-lg shadow-[#036CFB]/30 flex items-center justify-center space-x-1.5 cursor-pointer active:scale-98"
              >
                <span>Apply for Visa 100% Online</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* MOBILE-OPTIMIZED FROSTED GLASS BOTTOM DOCK NAVIGATION */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#062544]/90 backdrop-blur-2xl border-t border-white/15 shadow-[0_-8px_30px_rgba(0,0,0,0.5)] px-1 sm:px-3 pt-1 safe-bottom">
        <div className="flex items-center justify-around max-w-md mx-auto">
          
          {/* Home */}
          <button
            onClick={() => handleNavClick('/')}
            className={`min-h-[46px] min-w-[52px] flex flex-col items-center justify-center py-1 px-1.5 rounded-xl transition-all active:scale-90 ${
              currentView === 'home'
                ? 'text-[#38BDF8]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Home className="w-5 h-5 mb-0.5 shrink-0" />
            <span className="text-[10px] font-bold leading-tight">Home</span>
            {currentView === 'home' && (
              <span className="w-1 h-1 rounded-full bg-[#38BDF8] shadow-[0_0_6px_#38BDF8] mt-0.5"></span>
            )}
          </button>

          {/* Visas */}
          <button
            onClick={() => handleNavClick('/visas')}
            className={`min-h-[46px] min-w-[52px] flex flex-col items-center justify-center py-1 px-1.5 rounded-xl transition-all active:scale-90 ${
              currentView === 'visa-finder'
                ? 'text-[#38BDF8]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Globe className="w-5 h-5 mb-0.5 shrink-0" />
            <span className="text-[10px] font-bold leading-tight">Visas</span>
            {currentView === 'visa-finder' && (
              <span className="w-1 h-1 rounded-full bg-[#38BDF8] shadow-[0_0_6px_#38BDF8] mt-0.5"></span>
            )}
          </button>

          {/* Air Tickets Modal Quick trigger */}
          <button
            onClick={() => handleOpenModal('air-ticketing')}
            className="min-h-[46px] min-w-[52px] flex flex-col items-center justify-center py-1 px-1.5 rounded-xl transition-all text-slate-400 hover:text-slate-200 active:scale-90"
          >
            <Plane className="w-5 h-5 mb-0.5 transform -rotate-45 text-[#38BDF8] shrink-0" />
            <span className="text-[10px] font-bold leading-tight">Flights</span>
          </button>

          {/* Track Application */}
          <button
            onClick={() => handleNavClick('/payment')}
            className={`min-h-[46px] min-w-[52px] flex flex-col items-center justify-center py-1 px-1.5 rounded-xl transition-all active:scale-90 ${
              currentView === 'payment-tracker' || currentView === 'user-dashboard'
                ? 'text-[#38BDF8]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-5 h-5 mb-0.5 shrink-0" />
            <span className="text-[10px] font-bold leading-tight">Track</span>
            {(currentView === 'payment-tracker' || currentView === 'user-dashboard') && (
              <span className="w-1 h-1 rounded-full bg-[#38BDF8] shadow-[0_0_6px_#38BDF8] mt-0.5"></span>
            )}
          </button>

          {/* Contact */}
          <button
            onClick={() => handleNavClick('/contact')}
            className={`min-h-[46px] min-w-[52px] flex flex-col items-center justify-center py-1 px-1.5 rounded-xl transition-all active:scale-90 ${
              currentView === 'contact'
                ? 'text-[#38BDF8]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Phone className="w-5 h-5 mb-0.5 shrink-0" />
            <span className="text-[10px] font-bold leading-tight">Contact</span>
            {currentView === 'contact' && (
              <span className="w-1 h-1 rounded-full bg-[#38BDF8] shadow-[0_0_6px_#38BDF8] mt-0.5"></span>
            )}
          </button>

        </div>
      </nav>
    </>
  );
};
