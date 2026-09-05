import React, { useState } from 'react';
import { Plane, User, LogOut, Menu, X, ShieldCheck, LogIn, UserPlus, Compass } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Header: React.FC = () => {
  const { currentView, navigateTo, currentUser, userRole, openAuthModal, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (path: string) => {
    navigateTo(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#062544] text-white border-b border-slate-800/80 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo - NAS Internationals */}
        <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => handleNavClick('/')}>
          <div className="w-10 h-10 rounded-full bg-[#036CFB] flex items-center justify-center text-white shadow-md">
            <Plane className="w-6 h-6 transform -rotate-45" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-2xl tracking-tight text-white flex items-center">
              NAS
              <span className="text-[#38BDF8] ml-1.5 text-xs font-semibold uppercase tracking-widest bg-[#036CFB]/20 px-2 py-0.5 rounded border border-[#036CFB]/40">
                INTERNATIONALS
              </span>
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8">
          <button
            onClick={() => handleNavClick('/')}
            className={`text-sm font-semibold transition-colors ${
              currentView === 'home' ? 'text-[#38BDF8]' : 'text-slate-200 hover:text-[#38BDF8]'
            }`}
          >
            Home
          </button>

          {/* Tours Nav item with blue "NEW" pill badge above */}
          <div className="relative">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#036CFB] text-white text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase tracking-wider shadow-sm">
              NEW
            </span>
            <button
              onClick={() => handleNavClick('/tours')}
              className={`text-sm font-semibold transition-colors ${
                currentView === 'tours' ? 'text-[#38BDF8]' : 'text-slate-200 hover:text-[#38BDF8]'
              }`}
            >
              Tours
            </button>
          </div>

          <button
            onClick={() => handleNavClick('/visas')}
            className={`text-sm font-semibold transition-colors ${
              currentView === 'visa-finder' ? 'text-[#38BDF8]' : 'text-slate-200 hover:text-[#38BDF8]'
            }`}
          >
            Visa
          </button>

          <button
            onClick={() => handleNavClick('/contact')}
            className={`text-sm font-semibold transition-colors ${
              currentView === 'contact' ? 'text-[#38BDF8]' : 'text-slate-200 hover:text-[#38BDF8]'
            }`}
          >
            Contact Us
          </button>

          <button
            onClick={() => handleNavClick('/blogs')}
            className={`text-sm font-semibold transition-colors ${
              currentView === 'blogs' ? 'text-[#38BDF8]' : 'text-slate-200 hover:text-[#38BDF8]'
            }`}
          >
            Blogs
          </button>

          <button
            onClick={() => handleNavClick('/faqs')}
            className={`text-sm font-semibold transition-colors ${
              currentView === 'faqs' ? 'text-[#38BDF8]' : 'text-slate-200 hover:text-[#38BDF8]'
            }`}
          >
            FAQ's
          </button>

          {/* Admin console button if ADMIN */}
          {userRole === 'ADMIN' && (
            <button
              onClick={() => handleNavClick('/admin/dashboard')}
              className="text-xs font-bold px-3 py-1.5 rounded-full bg-[#036CFB]/20 text-[#38BDF8] border border-[#38BDF8]/40 hover:bg-[#036CFB]/30 transition-all flex items-center space-x-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Admin</span>
            </button>
          )}
        </nav>

        {/* Right Action Button (Blue Rounded Pill Login/Signup) */}
        <div className="hidden sm:flex items-center space-x-3">
          {currentUser ? (
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleNavClick('/dashboard')}
                className="flex items-center space-x-2 bg-[#036CFB] hover:bg-blue-600 text-white font-bold px-4 py-2.5 rounded-full text-xs shadow-md transition-all cursor-pointer"
              >
                <User className="w-4 h-4" />
                <span>{currentUser.name ? currentUser.name.split(' ')[0] : 'Account'}</span>
              </button>

              <button
                onClick={logout}
                title="Sign Out"
                className="p-2.5 rounded-full bg-slate-800 text-slate-300 hover:text-rose-400 hover:bg-slate-700 transition"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => openAuthModal('login')}
              className="px-6 py-2.5 bg-[#036CFB] hover:bg-blue-600 text-white font-bold text-xs rounded-full shadow-md transition-all flex items-center space-x-2 cursor-pointer"
            >
              <User className="w-4 h-4 fill-current" />
              <span>Login/Signup</span>
            </button>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-300 hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#041a30] border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <div className="space-y-2 pb-3 border-b border-slate-800/80">
            <button
              onClick={() => handleNavClick('/')}
              className="w-full text-left py-2 text-sm font-semibold text-slate-200 hover:text-[#38BDF8]"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('/tours')}
              className="w-full text-left py-2 text-sm font-semibold text-slate-200 hover:text-[#38BDF8] flex items-center justify-between"
            >
              <span>Tours</span>
              <span className="bg-[#036CFB] text-white text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase">NEW</span>
            </button>
            <button
              onClick={() => handleNavClick('/visas')}
              className="w-full text-left py-2 text-sm font-semibold text-slate-200 hover:text-[#38BDF8]"
            >
              Visa
            </button>
            <button
              onClick={() => handleNavClick('/contact')}
              className="w-full text-left py-2 text-sm font-semibold text-slate-200 hover:text-[#38BDF8]"
            >
              Contact Us
            </button>
            <button
              onClick={() => handleNavClick('/blogs')}
              className="w-full text-left py-2 text-sm font-semibold text-slate-200 hover:text-[#38BDF8]"
            >
              Blogs
            </button>
            <button
              onClick={() => handleNavClick('/faqs')}
              className="w-full text-left py-2 text-sm font-semibold text-slate-200 hover:text-[#38BDF8]"
            >
              FAQ's
            </button>
          </div>

          <div className="pt-2">
            {!currentUser ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal('login');
                }}
                className="w-full py-3 bg-[#036CFB] text-white font-bold text-center rounded-full text-sm shadow-md"
              >
                Login / Signup
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                }}
                className="w-full py-3 bg-rose-900/40 text-rose-200 font-bold text-center rounded-full text-sm border border-rose-700/50"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
