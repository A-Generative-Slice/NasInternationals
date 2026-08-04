import React, { useState } from 'react';
import { Globe, Plane, User, LayoutDashboard, FileText, CreditCard, LogOut, Menu, X, ShieldCheck, LogIn, UserPlus } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Header: React.FC = () => {
  const { currentView, navigateTo, currentUser, userRole, openAuthModal, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (path: string) => {
    navigateTo(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0B1E3D] text-white border-b border-slate-800/80 shadow-lg">
      
      {/* Top Banner Announcement */}
      <div className="bg-[#071329] border-b border-slate-800/60 py-1.5 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 text-slate-300 font-medium">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#C8A24A]/20 text-[#EAC166] border border-[#C8A24A]/30">
              OFFICIAL PORTAL
            </span>
            <span className="hidden sm:inline">🎉 Express 48-Hour UAE & Schengen Visa Processing Available!</span>
          </div>

          <div className="flex items-center space-x-4 text-[11px] text-slate-300">
            <span>24/7 Hotline: <strong className="text-[#EAC166]">+901-974-0030</strong></span>
            {currentUser && (
              <span className="hidden md:inline px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-mono">
                Role: <strong className="text-emerald-400">{currentUser.role}</strong>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavClick('/')}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#C8A24A] via-[#EAC166] to-[#9A772B] p-0.5 flex items-center justify-center shadow-md shadow-[#C8A24A]/20">
            <div className="w-full h-full bg-[#0B1E3D] rounded-full flex items-center justify-center">
              <Globe className="w-5 h-5 text-[#EAC166]" />
            </div>
          </div>
          <div>
            <div className="font-display text-xl font-extrabold tracking-tight text-white flex items-center">
              NAS <span className="text-[#EAC166] ml-1 font-semibold text-sm tracking-widest">INTERNATIONALS</span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium tracking-wide">Tours & Visa Services</p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-7">
          <button
            onClick={() => handleNavClick('/')}
            className={`text-sm font-medium transition-colors ${
              currentView === 'home' || currentView === 'visa-finder' ? 'text-[#EAC166] font-semibold' : 'text-slate-200 hover:text-[#EAC166]'
            }`}
          >
            Home / Visas
          </button>
          
          <button
            onClick={() => handleNavClick('/apply')}
            className={`text-sm font-medium transition-colors ${
              currentView === 'wizard' ? 'text-[#EAC166] font-semibold' : 'text-slate-200 hover:text-[#EAC166]'
            }`}
          >
            Apply Now
          </button>

          <button
            onClick={() => handleNavClick('/dashboard')}
            className={`text-sm font-medium transition-colors ${
              currentView === 'user-dashboard' ? 'text-[#EAC166] font-semibold' : 'text-slate-200 hover:text-[#EAC166]'
            }`}
          >
            My Dashboard
          </button>

          <button
            onClick={() => handleNavClick('/payment-tracker')}
            className={`text-sm font-medium transition-colors ${
              currentView === 'payment-tracker' ? 'text-[#EAC166] font-semibold' : 'text-slate-200 hover:text-[#EAC166]'
            }`}
          >
            Track Payment
          </button>

          {/* If user logged in as ADMIN, show explicit Admin Console link */}
          {userRole === 'ADMIN' && (
            <button
              onClick={() => handleNavClick('/admin/dashboard')}
              className="text-xs font-bold px-3 py-1.5 rounded-xl bg-amber-500/20 text-[#EAC166] border border-[#EAC166]/40 hover:bg-amber-500/30 transition-all flex items-center space-x-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#EAC166]" />
              <span>Admin Console</span>
            </button>
          )}
        </nav>

        {/* Right Auth Action Buttons */}
        <div className="hidden sm:flex items-center space-x-3">
          {currentUser ? (
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleNavClick('/dashboard')}
                className="flex items-center space-x-2.5 bg-slate-800/90 hover:bg-slate-700 px-3.5 py-1.5 rounded-xl border border-slate-700 text-xs transition"
              >
                <div className="w-6 h-6 rounded-full bg-[#036CFB] text-white flex items-center justify-center font-extrabold text-xs">
                  {currentUser.name ? currentUser.name.charAt(0) : 'U'}
                </div>
                <div className="text-left">
                  <span className="font-bold block text-slate-100">{currentUser.name || 'User Account'}</span>
                  <span className="text-[10px] text-[#EAC166] block -mt-0.5">{currentUser.role || 'USER'}</span>
                </div>
              </button>

              <button
                onClick={logout}
                title="Sign Out"
                className="p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-rose-400 hover:bg-slate-700 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            /* Strict User Requirements: Display ONLY Login and Register buttons on the public website */
            <div className="flex items-center space-x-2">
              <button
                onClick={() => openAuthModal('login')}
                className="px-4 py-2 text-xs font-bold text-slate-200 hover:text-white bg-slate-800/90 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all flex items-center space-x-1.5 cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 text-[#EAC166]" />
                <span>Login</span>
              </button>

              <button
                onClick={() => openAuthModal('register')}
                className="px-4 py-2 text-xs font-bold text-[#0B1E3D] bg-[#EAC166] hover:bg-[#cba248] rounded-xl shadow-md transition-all flex items-center space-x-1.5 cursor-pointer"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Register</span>
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-300 hover:bg-slate-800 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#071329] border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <div className="space-y-2 pb-3 border-b border-slate-800">
            <button
              onClick={() => handleNavClick('/')}
              className="w-full text-left py-2 text-xs font-bold text-slate-200 hover:text-[#EAC166]"
            >
              Home / Visas
            </button>
            <button
              onClick={() => handleNavClick('/apply')}
              className="w-full text-left py-2 text-xs font-bold text-slate-200 hover:text-[#EAC166]"
            >
              Apply Now
            </button>
            <button
              onClick={() => handleNavClick('/dashboard')}
              className="w-full text-left py-2 text-xs font-bold text-slate-200 hover:text-[#EAC166]"
            >
              My Dashboard
            </button>
            <button
              onClick={() => handleNavClick('/payment-tracker')}
              className="w-full text-left py-2 text-xs font-bold text-slate-200 hover:text-[#EAC166]"
            >
              Track Payment
            </button>
          </div>

          {!currentUser ? (
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal('login');
                }}
                className="py-2.5 text-center text-xs font-bold bg-slate-800 text-white rounded-xl border border-slate-700"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal('register');
                }}
                className="py-2.5 text-center text-xs font-bold bg-[#EAC166] text-[#0B1E3D] rounded-xl"
              >
                Register
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                logout();
              }}
              className="w-full py-2.5 text-center text-xs font-bold bg-rose-900/40 text-rose-200 rounded-xl border border-rose-700/50"
            >
              Sign Out ({currentUser.email})
            </button>
          )}
        </div>
      )}
    </header>
  );
};
