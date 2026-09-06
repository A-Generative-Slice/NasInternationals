import React, { useState } from 'react';
import { Plane, Menu, X, Globe, Stamp, GraduationCap, FileText, Phone, Home, Sparkles, ArrowRight, User as UserIcon } from 'lucide-react';
import { useApp } from '../context/AppContext';
import logoImg from '../assets/logo.jpg';

export const Header: React.FC = () => {
  const { currentView, navigateTo, setActiveModal, currentUser, openAuthModal } = useApp();
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
      {/* TOP FLOATING DYNAMIC GLASS ISLAND HEADER */}
      <header className="sticky top-2 sm:top-4 z-50 px-3 sm:px-6 w-full max-w-7xl mx-auto transition-all">
        <div className="bg-white/85 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.06)] rounded-2xl sm:rounded-full px-3.5 sm:px-6 py-2.5 sm:py-3 transition-all flex items-center justify-between">
          
          {/* Brand Logo - NAS Internationals */}
          <div className="flex items-center space-x-2.5 sm:space-x-3 cursor-pointer group" onClick={() => handleNavClick('/')}>
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-white p-1 flex items-center justify-center shadow-md shadow-blue-500/15 border border-slate-100 group-hover:scale-105 transition-all overflow-hidden shrink-0">
              <img src={logoImg} alt="NAS Internationals Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-base sm:text-xl tracking-tight text-[#062544] flex items-center leading-none">
                NAS
                <span className="text-[#036CFB] ml-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                  Internationals
                </span>
              </span>
              <span className="text-[10px] text-slate-500 font-semibold tracking-wider hidden sm:block mt-0.5">
                Visa & Travel Services
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 bg-slate-100/70 backdrop-blur-md px-2 py-1 rounded-full border border-slate-200/60 shadow-inner">
            <button
              onClick={() => handleNavClick('/')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                currentView === 'home'
                  ? 'bg-[#036CFB] text-white shadow-sm shadow-[#036CFB]/30'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
              }`}
            >
              Home
            </button>

            {/* 1. Visa Services */}
            <button
              onClick={() => handleNavClick('/visas')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                currentView === 'visa-finder'
                  ? 'bg-[#036CFB] text-white shadow-sm shadow-[#036CFB]/30'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
              }`}
            >
              Visa Services
            </button>

            {/* 2. Air Ticketing */}
            <button
              onClick={() => handleOpenModal('air-ticketing')}
              className="px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer text-slate-600 hover:text-slate-900 hover:bg-white/80 flex items-center space-x-1"
            >
              <Plane className="w-3.5 h-3.5 text-[#036CFB] transform -rotate-45" />
              <span>Air Ticketing</span>
            </button>

            {/* 3. Document Attestation */}
            <button
              onClick={() => handleOpenModal('attestation')}
              className="px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer text-slate-600 hover:text-slate-900 hover:bg-white/80 flex items-center space-x-1"
            >
              <Stamp className="w-3.5 h-3.5 text-[#036CFB]" />
              <span>Document Attestation</span>
            </button>

            {/* 4. Education Consultancy */}
            <button
              onClick={() => handleOpenModal('education')}
              className="px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer text-slate-600 hover:text-slate-900 hover:bg-white/80 flex items-center space-x-1"
            >
              <GraduationCap className="w-3.5 h-3.5 text-[#036CFB]" />
              <span>Education Consultancy</span>
            </button>

            {/* Track Application */}
            <button
              onClick={() => handleNavClick('/payment')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                currentView === 'payment-tracker' || currentView === 'user-dashboard'
                  ? 'bg-[#036CFB] text-white shadow-sm shadow-[#036CFB]/30'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Track Status</span>
            </button>

            <button
              onClick={() => handleNavClick('/faqs')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                currentView === 'faqs'
                  ? 'bg-[#036CFB] text-white shadow-sm shadow-[#036CFB]/30'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
              }`}
            >
              FAQs
            </button>

            <button
              onClick={() => handleNavClick('/contact')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                currentView === 'contact'
                  ? 'bg-[#036CFB] text-white shadow-sm shadow-[#036CFB]/30'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Right Action Callouts: Phone, Auth & Apply Button */}
          <div className="hidden sm:flex items-center space-x-2.5">
            <a
              href="tel:+919941900055"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-xs font-bold text-slate-700 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#036CFB]" />
              <span>+91 99419 00055</span>
            </a>

            {currentUser ? (
              <button
                onClick={() => handleNavClick('/dashboard')}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-blue-50 hover:bg-blue-100 border border-blue-200 text-xs font-bold text-[#036CFB] transition-colors"
              >
                <UserIcon className="w-3.5 h-3.5 text-[#036CFB]" />
                <span className="max-w-[90px] truncate">{currentUser.name.split(' ')[0]}</span>
              </button>
            ) : (
              <button
                onClick={() => openAuthModal('login')}
                className="px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-700 hover:text-[#036CFB] hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Sign In
              </button>
            )}

            <button
              onClick={() => handleNavClick('/apply')}
              className="px-4 py-2 bg-gradient-to-r from-[#036CFB] via-[#0284C7] to-[#38BDF8] hover:from-[#0256c7] hover:to-[#036CFB] text-white font-display font-bold text-xs rounded-full shadow-md shadow-[#036CFB]/25 transition-all flex items-center space-x-1.5 cursor-pointer active:scale-98"
            >
              <span>Apply Online</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Quick Action & Hamburger trigger */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={() => handleNavClick('/apply')}
              className="px-3.5 py-1.5 min-h-[34px] bg-gradient-to-r from-[#036CFB] to-[#0284C7] text-white font-bold text-xs rounded-full shadow-sm shadow-[#036CFB]/25 active:scale-95 flex items-center"
            >
              Apply
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 min-h-[36px] min-w-[36px] flex items-center justify-center cursor-pointer active:scale-95"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Frosted Glass Drawer Attached to Island */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 bg-white/95 backdrop-blur-2xl border border-white/90 rounded-3xl p-4 space-y-3.5 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 max-h-[calc(100dvh-5.5rem)] overflow-y-auto overscroll-contain">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleNavClick('/')}
                className="flex items-center space-x-2 p-3 min-h-[44px] rounded-2xl bg-slate-50 hover:bg-blue-50/70 border border-slate-100 text-left text-xs font-bold text-slate-800 transition-all active:scale-98"
              >
                <Home className="w-4 h-4 text-[#036CFB] shrink-0" />
                <span>Home</span>
              </button>
              <button
                onClick={() => handleNavClick('/visas')}
                className="flex items-center space-x-2 p-3 min-h-[44px] rounded-2xl bg-slate-50 hover:bg-blue-50/70 border border-slate-100 text-left text-xs font-bold text-slate-800 transition-all active:scale-98"
              >
                <Globe className="w-4 h-4 text-[#036CFB] shrink-0" />
                <span>Visa Services</span>
              </button>
              <button
                onClick={() => handleOpenModal('air-ticketing')}
                className="flex items-center space-x-2 p-3 min-h-[44px] rounded-2xl bg-slate-50 hover:bg-blue-50/70 border border-slate-100 text-left text-xs font-bold text-slate-800 transition-all active:scale-98"
              >
                <Plane className="w-4 h-4 text-[#036CFB] transform -rotate-45 shrink-0" />
                <span>Air Ticketing</span>
              </button>
              <button
                onClick={() => handleOpenModal('attestation')}
                className="flex items-center space-x-2 p-3 min-h-[44px] rounded-2xl bg-slate-50 hover:bg-blue-50/70 border border-slate-100 text-left text-xs font-bold text-slate-800 transition-all active:scale-98"
              >
                <Stamp className="w-4 h-4 text-[#036CFB] shrink-0" />
                <span>Attestation</span>
              </button>
              <button
                onClick={() => handleOpenModal('education')}
                className="flex items-center space-x-2 p-3 min-h-[44px] rounded-2xl bg-slate-50 hover:bg-blue-50/70 border border-slate-100 text-left text-xs font-bold text-slate-800 transition-all active:scale-98"
              >
                <GraduationCap className="w-4 h-4 text-[#036CFB] shrink-0" />
                <span>Education</span>
              </button>
              <button
                onClick={() => handleNavClick('/payment')}
                className="flex items-center space-x-2 p-3 min-h-[44px] rounded-2xl bg-slate-50 hover:bg-blue-50/70 border border-slate-100 text-left text-xs font-bold text-slate-800 transition-all active:scale-98"
              >
                <FileText className="w-4 h-4 text-[#036CFB] shrink-0" />
                <span>Track Status</span>
              </button>
              <button
                onClick={() => handleNavClick('/faqs')}
                className="flex items-center space-x-2 p-3 min-h-[44px] rounded-2xl bg-slate-50 hover:bg-blue-50/70 border border-slate-100 text-left text-xs font-bold text-slate-800 transition-all active:scale-98"
              >
                <Sparkles className="w-4 h-4 text-[#036CFB] shrink-0" />
                <span>FAQs</span>
              </button>
              <button
                onClick={() => handleNavClick('/contact')}
                className="flex items-center space-x-2 p-3 min-h-[44px] rounded-2xl bg-slate-50 hover:bg-blue-50/70 border border-slate-100 text-left text-xs font-bold text-slate-800 transition-all active:scale-98"
              >
                <Phone className="w-4 h-4 text-[#036CFB] shrink-0" />
                <span>Contact</span>
              </button>
            </div>

            {/* Quick Contact & Auth in Drawer */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              {currentUser ? (
                <button
                  onClick={() => handleNavClick('/dashboard')}
                  className="w-full flex items-center justify-center space-x-2 p-3 min-h-[44px] rounded-2xl bg-blue-50 text-xs font-bold text-[#036CFB] active:scale-98 transition-all"
                >
                  <UserIcon className="w-4 h-4" />
                  <span>My Account ({currentUser.name})</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal('login');
                  }}
                  className="w-full flex items-center justify-center space-x-2 p-3 min-h-[44px] rounded-2xl bg-slate-100 text-xs font-bold text-slate-700 active:scale-98 transition-all"
                >
                  <UserIcon className="w-4 h-4" />
                  <span>Sign In / Create Account</span>
                </button>
              )}

              <a
                href="tel:+919941900055"
                className="flex items-center justify-center space-x-2 p-3 min-h-[44px] rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 active:scale-98 transition-all"
              >
                <Phone className="w-4 h-4 text-[#036CFB]" />
                <span>Helpline: +91 99419 00055</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* MOBILE-OPTIMIZED FLOATING DYNAMIC GLASS ISLAND BOTTOM DOCK */}
      <nav className="fixed bottom-3 left-3 right-3 sm:left-auto sm:right-auto sm:w-[400px] sm:left-1/2 sm:-translate-x-1/2 z-40 lg:hidden bg-white/90 backdrop-blur-2xl border border-white/80 shadow-[0_10px_35px_rgba(0,0,0,0.12)] rounded-2xl sm:rounded-full px-2 py-1 safe-bottom transition-all">
        <div className="flex items-center justify-around">
          
          {/* Home */}
          <button
            onClick={() => handleNavClick('/')}
            className={`min-h-[44px] min-w-[50px] flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all active:scale-90 ${
              currentView === 'home'
                ? 'text-[#036CFB] bg-blue-50/80 font-extrabold'
                : 'text-slate-500 hover:text-slate-800 font-semibold'
            }`}
          >
            <Home className="w-5 h-5 mb-0.5 shrink-0" />
            <span className="text-[10px] leading-tight">Home</span>
          </button>

          {/* Visas */}
          <button
            onClick={() => handleNavClick('/visas')}
            className={`min-h-[44px] min-w-[50px] flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all active:scale-90 ${
              currentView === 'visa-finder'
                ? 'text-[#036CFB] bg-blue-50/80 font-extrabold'
                : 'text-slate-500 hover:text-slate-800 font-semibold'
            }`}
          >
            <Globe className="w-5 h-5 mb-0.5 shrink-0" />
            <span className="text-[10px] leading-tight">Visas</span>
          </button>

          {/* Flights */}
          <button
            onClick={() => handleOpenModal('air-ticketing')}
            className="min-h-[44px] min-w-[50px] flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all text-slate-500 hover:text-slate-800 active:scale-90 font-semibold"
          >
            <Plane className="w-5 h-5 mb-0.5 transform -rotate-45 text-[#036CFB] shrink-0" />
            <span className="text-[10px] leading-tight">Flights</span>
          </button>

          {/* Track */}
          <button
            onClick={() => handleNavClick('/payment')}
            className={`min-h-[44px] min-w-[50px] flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all active:scale-90 ${
              currentView === 'payment-tracker' || currentView === 'user-dashboard'
                ? 'text-[#036CFB] bg-blue-50/80 font-extrabold'
                : 'text-slate-500 hover:text-slate-800 font-semibold'
            }`}
          >
            <FileText className="w-5 h-5 mb-0.5 shrink-0" />
            <span className="text-[10px] leading-tight">Track</span>
          </button>

          {/* Contact */}
          <button
            onClick={() => handleNavClick('/contact')}
            className={`min-h-[44px] min-w-[50px] flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all active:scale-90 ${
              currentView === 'contact'
                ? 'text-[#036CFB] bg-blue-50/80 font-extrabold'
                : 'text-slate-500 hover:text-slate-800 font-semibold'
            }`}
          >
            <Phone className="w-5 h-5 mb-0.5 shrink-0" />
            <span className="text-[10px] leading-tight">Contact</span>
          </button>

        </div>
      </nav>
    </>
  );
};
