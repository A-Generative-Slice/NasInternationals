import React, { useState } from 'react';
import { Plane, User, LogOut, Menu, X, ShieldCheck, Globe, Compass, FileText, Phone, Home, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Header: React.FC = () => {
  const { currentView, navigateTo, currentUser, userRole, openAuthModal, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (path: string) => {
    navigateTo(path);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* TOP FROSTED GLASS HEADER */}
      <header className="sticky top-0 z-50 bg-[#062544]/80 backdrop-blur-2xl text-white border-b border-white/10 shadow-lg shadow-black/10 transition-all">
        {/* Subtle luminous blue accent line on top */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#036CFB] to-transparent opacity-90"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo - NAS Internationals */}
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => handleNavClick('/')}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#036CFB] to-[#0284C7] flex items-center justify-center text-white shadow-lg shadow-[#036CFB]/30 border border-white/20 group-hover:scale-105 transition-all">
              <Plane className="w-5 h-5 transform -rotate-45" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-xl sm:text-2xl tracking-tight text-white flex items-center">
                NAS
                <span className="text-[#38BDF8] ml-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest bg-white/10 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/15">
                  INTERNATIONALS
                </span>
              </span>
              <span className="text-[10px] text-slate-400 font-semibold tracking-wider hidden sm:block">
                100% Online Tours & Travel Services
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-2 bg-white/5 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 shadow-inner">
            <button
              onClick={() => handleNavClick('/')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                currentView === 'home'
                  ? 'bg-[#036CFB] text-white shadow-md shadow-[#036CFB]/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Home
            </button>

            {/* Tours Nav item with blue "NEW" pill badge above */}
            <div className="relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#38BDF8] text-[#062544] text-[8px] font-black px-1.5 py-0.2 rounded-full uppercase tracking-wider shadow-xs">
                NEW
              </span>
              <button
                onClick={() => handleNavClick('/tours')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  currentView === 'tours'
                    ? 'bg-[#036CFB] text-white shadow-md shadow-[#036CFB]/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                Tours
              </button>
            </div>

            <button
              onClick={() => handleNavClick('/visas')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                currentView === 'visa-finder'
                  ? 'bg-[#036CFB] text-white shadow-md shadow-[#036CFB]/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Visa
            </button>

            <button
              onClick={() => handleNavClick('/contact')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                currentView === 'contact'
                  ? 'bg-[#036CFB] text-white shadow-md shadow-[#036CFB]/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Contact Us
            </button>

            <button
              onClick={() => handleNavClick('/blogs')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                currentView === 'blogs'
                  ? 'bg-[#036CFB] text-white shadow-md shadow-[#036CFB]/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Blogs
            </button>

            <button
              onClick={() => handleNavClick('/faqs')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                currentView === 'faqs'
                  ? 'bg-[#036CFB] text-white shadow-md shadow-[#036CFB]/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              FAQ's
            </button>

            {/* Admin console button if ADMIN */}
            {userRole === 'ADMIN' && (
              <button
                onClick={() => handleNavClick('/admin/dashboard')}
                className="text-xs font-bold px-3 py-1.5 rounded-full bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/40 hover:bg-[#38BDF8]/30 transition-all flex items-center space-x-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>Admin</span>
              </button>
            )}
          </nav>

          {/* Right Action Button (Blue Rounded Pill Login/Signup) */}
          <div className="hidden sm:flex items-center space-x-3">
            {currentUser ? (
              <div className="flex items-center space-x-2.5">
                <button
                  onClick={() => handleNavClick('/dashboard')}
                  className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-2.5 rounded-full text-xs border border-white/20 shadow-md backdrop-blur-md transition-all cursor-pointer"
                >
                  <User className="w-4 h-4 text-[#38BDF8]" />
                  <span>{currentUser.name ? currentUser.name.split(' ')[0] : 'Account'}</span>
                </button>

                <button
                  onClick={logout}
                  title="Sign Out"
                  className="p-2.5 rounded-full bg-white/10 text-slate-300 hover:text-rose-400 hover:bg-white/20 border border-white/15 backdrop-blur-md transition"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => openAuthModal('login')}
                className="px-6 py-2.5 bg-gradient-to-r from-[#036CFB] to-[#0284C7] hover:from-[#0284C7] hover:to-[#036CFB] text-white font-display font-bold text-xs rounded-full shadow-lg shadow-[#036CFB]/30 border border-white/20 transition-all flex items-center space-x-2 cursor-pointer active:scale-98"
              >
                <User className="w-4 h-4 fill-current" />
                <span>Login / Signup</span>
              </button>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="lg:hidden flex items-center space-x-2">
            {!currentUser ? (
              <button
                onClick={() => openAuthModal('login')}
                className="px-3.5 py-1.5 bg-[#036CFB] text-white font-bold text-xs rounded-full shadow-md"
              >
                Login
              </button>
            ) : (
              <button
                onClick={() => handleNavClick('/dashboard')}
                className="p-2 rounded-full bg-white/10 border border-white/20 text-[#38BDF8]"
              >
                <User className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-200 bg-white/10 border border-white/15 backdrop-blur-md active:bg-white/20"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Frosted Glass Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#041A30]/95 backdrop-blur-2xl border-b border-white/15 px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-in fade-in slide-in-from-top-3 duration-200">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-white/10">
              <button
                onClick={() => handleNavClick('/')}
                className="flex items-center space-x-2 p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-left text-xs font-bold text-white transition-all"
              >
                <Home className="w-4 h-4 text-[#38BDF8]" />
                <span>Home</span>
              </button>
              <button
                onClick={() => handleNavClick('/tours')}
                className="flex items-center space-x-2 p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-left text-xs font-bold text-white transition-all"
              >
                <Compass className="w-4 h-4 text-[#38BDF8]" />
                <span>Tours Packages</span>
              </button>
              <button
                onClick={() => handleNavClick('/visas')}
                className="flex items-center space-x-2 p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-left text-xs font-bold text-white transition-all"
              >
                <Globe className="w-4 h-4 text-[#38BDF8]" />
                <span>Visa Services</span>
              </button>
              <button
                onClick={() => handleNavClick('/contact')}
                className="flex items-center space-x-2 p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-left text-xs font-bold text-white transition-all"
              >
                <Phone className="w-4 h-4 text-[#38BDF8]" />
                <span>Contact Online</span>
              </button>
              <button
                onClick={() => handleNavClick('/blogs')}
                className="flex items-center space-x-2 p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-left text-xs font-bold text-white transition-all"
              >
                <FileText className="w-4 h-4 text-[#38BDF8]" />
                <span>Blogs & Insights</span>
              </button>
              <button
                onClick={() => handleNavClick('/faqs')}
                className="flex items-center space-x-2 p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-left text-xs font-bold text-white transition-all"
              >
                <Sparkles className="w-4 h-4 text-[#38BDF8]" />
                <span>FAQ Support</span>
              </button>
            </div>

            <div className="pt-2">
              {!currentUser ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal('login');
                  }}
                  className="w-full py-3 bg-[#036CFB] hover:bg-blue-600 text-white font-bold text-center rounded-full text-xs shadow-lg shadow-[#036CFB]/30 transition"
                >
                  Sign In to Online Portal
                </button>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleNavClick('/dashboard')}
                    className="flex-1 py-3 bg-white/10 hover:bg-white/15 text-white font-bold text-center rounded-full text-xs border border-white/20 transition"
                  >
                    Open Dashboard
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                    className="px-4 py-3 bg-rose-900/40 text-rose-200 font-bold text-center rounded-full text-xs border border-rose-700/50 transition"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* MOBILE-OPTIMIZED FROSTED GLASS BOTTOM DOCK NAVIGATION (Strictly for mobile 19.5:9 / 20:9 screens) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#062544]/85 backdrop-blur-2xl border-t border-white/15 shadow-[0_-8px_30px_rgba(0,0,0,0.5)] px-3 py-1.5 safe-bottom">
        <div className="flex items-center justify-around max-w-md mx-auto">
          
          {/* Home */}
          <button
            onClick={() => handleNavClick('/')}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
              currentView === 'home'
                ? 'text-[#38BDF8] scale-105'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Home className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-bold">Home</span>
            {currentView === 'home' && (
              <span className="w-1 h-1 rounded-full bg-[#38BDF8] shadow-[0_0_6px_#38BDF8] mt-0.5"></span>
            )}
          </button>

          {/* Visas */}
          <button
            onClick={() => handleNavClick('/visas')}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
              currentView === 'visa-finder'
                ? 'text-[#38BDF8] scale-105'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Globe className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-bold">Visas</span>
            {currentView === 'visa-finder' && (
              <span className="w-1 h-1 rounded-full bg-[#38BDF8] shadow-[0_0_6px_#38BDF8] mt-0.5"></span>
            )}
          </button>

          {/* Tours */}
          <button
            onClick={() => handleNavClick('/tours')}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all relative ${
              currentView === 'tours'
                ? 'text-[#38BDF8] scale-105'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="absolute top-0 right-2 w-2 h-2 rounded-full bg-[#036CFB] animate-ping"></span>
            <Compass className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-bold">Tours</span>
            {currentView === 'tours' && (
              <span className="w-1 h-1 rounded-full bg-[#38BDF8] shadow-[0_0_6px_#38BDF8] mt-0.5"></span>
            )}
          </button>

          {/* Track / Dashboard */}
          <button
            onClick={() => handleNavClick(currentUser ? '/dashboard' : '/payment')}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
              currentView === 'user-dashboard' || currentView === 'payment-tracker'
                ? 'text-[#38BDF8] scale-105'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-bold">Track</span>
            {(currentView === 'user-dashboard' || currentView === 'payment-tracker') && (
              <span className="w-1 h-1 rounded-full bg-[#38BDF8] shadow-[0_0_6px_#38BDF8] mt-0.5"></span>
            )}
          </button>

          {/* Contact */}
          <button
            onClick={() => handleNavClick('/contact')}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
              currentView === 'contact'
                ? 'text-[#38BDF8] scale-105'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Phone className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-bold">Contact</span>
            {currentView === 'contact' && (
              <span className="w-1 h-1 rounded-full bg-[#38BDF8] shadow-[0_0_6px_#38BDF8] mt-0.5"></span>
            )}
          </button>

        </div>
      </nav>
    </>
  );
};
