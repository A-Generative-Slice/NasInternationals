import React, { useState, useEffect } from 'react';
import { COMPANY_INFO } from '../lib/data';
import { subscribeRealtime, RealtimeMessage } from '../lib/realtime';
import { 
  Phone, 
  Mail, 
  Plane, 
  Sparkles, 
  User,
  Radio,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Briefcase,
  Calendar,
  FileCheck,
  ShieldAlert,
  Compass
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAiPlanner: () => void;
  onOpenMyTrips: () => void;
  onOpenFlightSearch: () => void;
  savedTripsCount: number;
  user: { isLoggedIn: boolean; name: string; phone: string } | null;
  onOpenLogin: () => void;
  onLogout: () => void;
  onOpenUserBookings: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenAiPlanner,
  onOpenMyTrips,
  savedTripsCount,
  user,
  onOpenLogin,
  onLogout,
  onOpenUserBookings
}) => {
  const [livePulse, setLivePulse] = useState(false);
  const [recentNotification, setRecentNotification] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeRealtime((msg: RealtimeMessage) => {
      setLivePulse(true);
      setTimeout(() => setLivePulse(false), 2000);

      if (msg.type === 'TRIP_UPDATED') {
        setRecentNotification(`Trip "${msg.payload.title}" updated by ${msg.sender}`);
      } else if (msg.type === 'INQUIRY_SUBMITTED') {
        setRecentNotification(`New visa application logged for ${msg.payload.serviceType}`);
      } else if (msg.type === 'TRIP_CREATED') {
        setRecentNotification(`New booking created by ${msg.sender}`);
      }

      setTimeout(() => setRecentNotification(null), 4000);
    });
    return unsubscribe;
  }, []);

  return (
    <header className="w-full bg-[#0a192f] text-white shadow-xl sticky top-0 z-50 border-b border-slate-800">
      {/* Top Utility Contact Bar */}
      <div className="bg-[#06101e] text-slate-300 text-xs py-2 px-4 sm:px-8 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-slate-300">
            <a 
              href={`tel:${COMPANY_INFO.phone}`} 
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Mobile / WA: <strong className="text-white">{COMPANY_INFO.phone}</strong></span>
            </a>

            <span className="hidden sm:inline text-slate-700">|</span>

            <a 
              href={`tel:${COMPANY_INFO.landline}`} 
              className="hidden lg:flex items-center gap-1.5 hover:text-amber-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Landline: <strong className="text-white">{COMPANY_INFO.landline}</strong></span>
            </a>

            <span className="hidden lg:inline text-slate-700">|</span>

            <a 
              href={`mailto:${COMPANY_INFO.email}`} 
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>{COMPANY_INFO.email}</span>
            </a>

            <span className="hidden md:inline text-slate-700">|</span>

            <div className="hidden md:flex items-center gap-1.5 text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Online Visa & Travel Portal</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Realtime Sync Status */}
            <div className="flex items-center gap-1.5 bg-slate-900/90 px-2.5 py-1 rounded-full border border-emerald-500/40 text-[11px] text-emerald-400 font-mono shadow-sm">
              <span className={`w-2 h-2 rounded-full bg-emerald-400 ${livePulse ? 'animate-ping' : 'animate-pulse'}`}></span>
              <Radio className="w-3 h-3 text-emerald-400" />
              <span>Live Realtime Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Toast */}
      {recentNotification && (
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 px-4 py-1.5 text-xs font-bold text-center flex items-center justify-center gap-2 animate-fadeIn shadow-inner">
          <Sparkles className="w-4 h-4" />
          <span>{recentNotification}</span>
        </div>
      )}

      {/* Main Brand & Navigation Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        
        {/* Brand Logo "NAS Internationals" */}
        <div 
          onClick={() => setActiveTab('home')} 
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <Plane className="w-6 h-6 text-slate-950 transform -rotate-12" />
          </div>

          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-sans uppercase">
                NAS<span className="text-amber-400"> Internationals</span>
              </span>
            </div>
            <div className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
              Tours & Travels Portal
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'home'
                ? 'text-amber-400 bg-white/10'
                : 'text-slate-200 hover:text-white hover:bg-white/5'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => setActiveTab('tours')}
            className={`relative px-3.5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'tours'
                ? 'text-amber-400 bg-white/10'
                : 'text-slate-200 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>Tours</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-amber-400 text-slate-950 leading-none uppercase">
              NEW
            </span>
          </button>

          <button
            onClick={() => setActiveTab('visa')}
            className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'visa'
                ? 'text-amber-400 bg-white/10'
                : 'text-slate-200 hover:text-white hover:bg-white/5'
            }`}
          >
            Visa
          </button>

          <button
            onClick={() => setActiveTab('faqs')}
            className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'faqs'
                ? 'text-amber-400 bg-white/10'
                : 'text-slate-200 hover:text-white hover:bg-white/5'
            }`}
          >
            FAQs
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'contact'
                ? 'text-amber-400 bg-white/10'
                : 'text-slate-200 hover:text-white hover:bg-white/5'
            }`}
          >
            Contact Us
          </button>

          <button
            onClick={() => setActiveTab('admin')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border flex items-center gap-1 ${
              activeTab === 'admin'
                ? 'bg-amber-400 text-slate-950 border-amber-400'
                : 'bg-slate-800/80 text-amber-300 border-amber-400/40 hover:bg-slate-800'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Admin Portal</span>
          </button>
        </nav>

        {/* Action Buttons & User Menu */}
        <div className="flex items-center gap-3">
          
          <button
            onClick={onOpenAiPlanner}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-400/30 text-xs font-bold transition-all"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>AI Itinerary</span>
          </button>

          {/* User Auth Pill Button / Dropdown */}
          {user && user.isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm hover:bg-amber-300 transition-all shadow-md"
              >
                <User className="w-4 h-4" />
                <span className="max-w-[100px] truncate">{user.name || 'Anonymous'}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {userDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl py-2 z-50 text-slate-200 text-sm animate-fadeIn"
                  onMouseLeave={() => setUserDropdownOpen(false)}
                >
                  <div className="px-4 py-2.5 border-b border-slate-800">
                    <p className="font-bold text-white">{user.name || 'Anonymous User'}</p>
                    <p className="text-xs text-slate-400">{user.phone || '+91 User'}</p>
                  </div>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onOpenUserBookings();
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-slate-800 flex items-center gap-2.5 font-medium text-amber-300"
                  >
                    <FileCheck className="w-4 h-4" />
                    <span>My Bookings & Visas</span>
                  </button>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onOpenMyTrips();
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-slate-800 flex items-center gap-2.5 font-medium"
                  >
                    <Calendar className="w-4 h-4 text-sky-400" />
                    <span>Saved Trips ({savedTripsCount})</span>
                  </button>

                  <div className="border-t border-slate-800 my-1"></div>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onLogout();
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-red-500/10 text-red-400 flex items-center gap-2.5 font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm hover:bg-amber-300 transition-all shadow-md active:scale-95"
            >
              <User className="w-4 h-4" />
              <span>Login / Signup</span>
            </button>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-800 text-slate-200 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a192f] border-t border-slate-800 px-6 py-4 flex flex-col gap-3 font-semibold text-slate-200">
          <button
            onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
            className={`text-left py-2 ${activeTab === 'home' ? 'text-amber-400 font-bold' : ''}`}
          >
            Home
          </button>
          <button
            onClick={() => { setActiveTab('tours'); setMobileMenuOpen(false); }}
            className={`text-left py-2 flex items-center gap-2 ${activeTab === 'tours' ? 'text-amber-400 font-bold' : ''}`}
          >
            <span>Tours</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-amber-400 text-slate-950 leading-none">
              NEW
            </span>
          </button>
          <button
            onClick={() => { setActiveTab('visa'); setMobileMenuOpen(false); }}
            className={`text-left py-2 ${activeTab === 'visa' ? 'text-amber-400 font-bold' : ''}`}
          >
            Visa
          </button>
          <button
            onClick={() => { setActiveTab('faqs'); setMobileMenuOpen(false); }}
            className={`text-left py-2 ${activeTab === 'faqs' ? 'text-amber-400 font-bold' : ''}`}
          >
            FAQs
          </button>
          <button
            onClick={() => { setActiveTab('contact'); setMobileMenuOpen(false); }}
            className={`text-left py-2 ${activeTab === 'contact' ? 'text-amber-400 font-bold' : ''}`}
          >
            Contact Us
          </button>
          <button
            onClick={() => { setActiveTab('admin'); setMobileMenuOpen(false); }}
            className="text-left py-2 text-amber-300 font-bold flex items-center gap-1.5"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Admin Portal</span>
          </button>

          <div className="border-t border-slate-800 pt-3 flex items-center justify-between">
            <button
              onClick={() => { onOpenAiPlanner(); setMobileMenuOpen(false); }}
              className="flex items-center gap-1.5 text-xs font-bold text-amber-300"
            >
              <Sparkles className="w-4 h-4" />
              <span>AI Itinerary Planner</span>
            </button>

            <button
              onClick={() => { onOpenUserBookings(); setMobileMenuOpen(false); }}
              className="flex items-center gap-1.5 text-xs font-bold text-sky-400"
            >
              <FileCheck className="w-4 h-4" />
              <span>My Applications</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
