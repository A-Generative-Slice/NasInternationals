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
      <header className="sticky top-2.5 sm:top-4 z-50 px-3.5 sm:px-6 w-full max-w-7xl mx-auto transition-all">
        <div className="bg-white/90 backdrop-blur-2xl border border-white/90 shadow-[0_8px_32px_rgba(0,0,0,0.06)] rounded-full px-3.5 sm:px-5 py-2 sm:py-2.5 transition-all flex items-center justify-between">
          
          {/* Brand Emblem Logo */}
          <div 
            className="flex items-center cursor-pointer group select-none" 
            onClick={() => handleNavClick('/')}
            aria-label="NAS Internationals Home"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white p-1 flex items-center justify-center shadow-xs border border-slate-200/80 group-hover:scale-105 group-hover:border-[#036CFB]/50 group-hover:shadow-sm transition-all duration-200 overflow-hidden shrink-0">
              <img src={logoImg} alt="NAS Internationals" className="w-full h-full object-contain" />
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
                className="px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-700 hover:text-[#036CFB] hover:bg-slate-100 transition-colors cursor-pointer border border-transparent hover:border-slate-200"
              >
                Sign In / Sign Up
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
              className="px-4 py-1.5 min-h-[36px] bg-[#036CFB] hover:bg-[#0256c7] text-white font-bold text-xs rounded-full shadow-xs active:scale-[0.96] transition-all flex items-center justify-center cursor-pointer"
            >
              Apply
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-9 h-9 rounded-full text-slate-700 bg-slate-100 hover:bg-slate-200/80 border border-slate-200/80 flex items-center justify-center cursor-pointer active:scale-[0.96] transition-all"
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
      <nav className="fixed bottom-3 left-4 right-4 sm:left-auto sm:right-auto sm:w-[380px] sm:left-1/2 sm:-translate-x-1/2 z-40 lg:hidden bg-white/90 backdrop-blur-2xl border border-white/90 shadow-[0_10px_35px_rgba(0,0,0,0.1)] rounded-full px-2.5 py-1.5 safe-bottom transition-all">
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
