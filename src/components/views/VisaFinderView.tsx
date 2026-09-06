import React from 'react';
import { Globe, Briefcase, GraduationCap, Handshake, Stamp, FileText, ChevronDown, CheckCircle, ArrowRight, Clock, ShieldCheck, Sparkles, Plane } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { COUNTRIES_LIST, NATIONALITIES_LIST, PURPOSES_LIST, VISA_CATEGORIES } from '../../data/mockData';
import { VisaItem } from '../../types';

export const VisaFinderView: React.FC = () => {
  const {
    selectedDestination,
    setSelectedDestination,
    selectedNationality,
    setSelectedNationality,
    selectedPurpose,
    setSelectedPurpose,
    setSelectedVisa,
    setCurrentView,
    setActiveModal,
    resetWizard
  } = useApp();

  const handleApplyClick = (visa: VisaItem) => {
    setSelectedVisa(visa);
    resetWizard();
    setCurrentView('wizard');
  };

  const handleLearnMoreVisa = (visa: VisaItem) => {
    setSelectedVisa(visa);
    setActiveModal('visa-detail');
  };

  const renderIcon = (iconName: VisaItem['iconName']) => {
    switch (iconName) {
      case 'globe':
        return <Globe className="w-6 h-6 text-[#036CFB]" />;
      case 'briefcase':
        return <Briefcase className="w-6 h-6 text-[#036CFB]" />;
      case 'graduation-cap':
        return <GraduationCap className="w-6 h-6 text-[#036CFB]" />;
      case 'handshake':
        return <Handshake className="w-6 h-6 text-[#036CFB]" />;
      default:
        return <Globe className="w-6 h-6 text-[#036CFB]" />;
    }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-[calc(100vh-5rem)] py-6 sm:py-8 px-3.5 sm:px-6 lg:px-8 relative overflow-hidden pb-28 lg:pb-16">
      {/* Ambient background glow blobs for frosted glass reflections */}
      <div className="ambient-glow-blue top-16 left-10"></div>
      <div className="ambient-glow-sky top-80 right-10"></div>
      <div className="ambient-glow-blue bottom-32 left-1/3"></div>

      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 relative z-10">
        
        {/* Page Title */}
        <div className="text-center md:text-left space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 sm:px-3.5 py-1.5 rounded-full glass-pill text-[#036CFB] text-xs font-bold shadow-xs">
            <span>Online Visa Finder & Eligibility Engine</span>
          </div>
          <h1 className="font-display text-2xl xs:text-3xl md:text-4xl font-extrabold text-[#062544] tracking-tight uppercase">
            Interactive Visa Finder & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#036CFB] via-[#0284C7] to-[#38BDF8]">Services</span>
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
            Instant eligibility check, 100% digital processing, and fast-track embassy approvals with zero physical visits.
          </p>
        </div>

        {/* Frosted Navy Filter Control Bar */}
        <div className="glass-frost-navy rounded-3xl p-4 sm:p-6 shadow-2xl border border-white/15 relative overflow-hidden backdrop-blur-2xl">
          <div className="absolute top-0 right-0 w-64 h-32 bg-[#036CFB]/20 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3.5 sm:gap-4 items-center relative z-10">
            {/* Destination Selector */}
            <div className="relative">
              <label className="block text-[11px] font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                Destination Country
              </label>
              <div className="relative">
                <select
                  value={selectedDestination}
                  onChange={(e) => setSelectedDestination(e.target.value)}
                  className="w-full bg-white/95 text-slate-900 text-xs sm:text-sm font-bold py-3 px-3.5 pr-8 rounded-2xl appearance-none focus:outline-none focus:ring-2 focus:ring-[#38BDF8] cursor-pointer shadow-md min-h-[44px]"
                >
                  {COUNTRIES_LIST.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-3.5 pointer-events-none" />
              </div>
            </div>

            {/* Nationality Selector */}
            <div className="relative">
              <label className="block text-[11px] font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                Nationality
              </label>
              <div className="relative">
                <select
                  value={selectedNationality}
                  onChange={(e) => setSelectedNationality(e.target.value)}
                  className="w-full bg-white/95 text-slate-900 text-xs sm:text-sm font-bold py-3 px-3.5 pr-8 rounded-2xl appearance-none focus:outline-none focus:ring-2 focus:ring-[#38BDF8] cursor-pointer shadow-md min-h-[44px]"
                >
                  {NATIONALITIES_LIST.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-3.5 pointer-events-none" />
              </div>
            </div>

            {/* Purpose Selector */}
            <div className="relative">
              <label className="block text-[11px] font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                Purpose of Visit
              </label>
              <div className="relative">
                <select
                  value={selectedPurpose}
                  onChange={(e) => setSelectedPurpose(e.target.value)}
                  className="w-full bg-white/95 text-slate-900 text-xs sm:text-sm font-bold py-3 px-3.5 pr-8 rounded-2xl appearance-none focus:outline-none focus:ring-2 focus:ring-[#38BDF8] cursor-pointer shadow-md min-h-[44px]"
                >
                  {PURPOSES_LIST.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-3.5 pointer-events-none" />
              </div>
            </div>

            {/* Find Visa Button */}
            <div className="pt-2 sm:pt-6">
              <button
                onClick={() => {
                  // Filter trigger feedback
                }}
                className="w-full min-h-[46px] px-4 bg-gradient-to-r from-[#036CFB] to-[#0284C7] hover:from-[#0256c7] hover:to-[#036CFB] active:scale-98 text-white font-display font-bold text-xs tracking-wider uppercase rounded-2xl shadow-lg shadow-[#036CFB]/40 transition-all flex items-center justify-center space-x-2"
              >
                <span>Find Visa</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Grid & Additional Services Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left 2-Column Main Visa Cards Grid */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {VISA_CATEGORIES.map((visa) => (
              <div
                key={visa.id}
                className="glass-frost glass-card-hover rounded-3xl p-4 sm:p-6 shadow-md hover:shadow-2xl transition-all border border-white/80 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Subtle sky background gradient glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/50 rounded-bl-full pointer-events-none -z-0"></div>

                <div className="relative z-10 space-y-3.5 sm:space-y-4">
                  {/* Icon & Title */}
                  <div className="flex items-center space-x-3">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-blue-50 to-blue-100 text-[#036CFB] flex items-center justify-center shadow-sm shrink-0 group-hover:bg-[#036CFB] group-hover:text-white transition-all">
                      {renderIcon(visa.iconName)}
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-[#062544] text-base sm:text-lg uppercase tracking-wide">
                        {visa.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        For {selectedDestination} ({selectedNationality})
                      </p>
                    </div>
                  </div>

                  {/* Online Processing Mode & Time info */}
                  <div className="space-y-2 pt-1 sm:pt-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50/90 text-[#036CFB] text-xs font-bold border border-blue-100">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#036CFB]" />
                      <span>100% Online Application</span>
                    </div>

                    <p className="text-xs text-slate-500 flex items-center space-x-1.5 font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#036CFB]" />
                      <span>Processing: <strong className="text-slate-700">{visa.processingTimeMin}-{visa.processingTimeMax} Days</strong></span>
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {visa.description}
                  </p>
                </div>

                {/* Apply Now Button */}
                <div className="pt-5 sm:pt-6 relative z-10 flex items-center space-x-2">
                  <button
                    onClick={() => handleApplyClick(visa)}
                    className="flex-1 min-h-[42px] py-2.5 px-4 bg-[#036CFB] hover:bg-[#062544] text-white font-display font-bold text-xs tracking-wider uppercase rounded-full shadow-md shadow-[#036CFB]/25 transition-all text-center flex items-center justify-center space-x-1 active:scale-95 cursor-pointer"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleLearnMoreVisa(visa)}
                    className="min-h-[42px] py-2.5 px-4 bg-white/80 hover:bg-white text-slate-700 text-xs font-bold rounded-full border border-slate-200 transition-colors shadow-xs active:scale-95 cursor-pointer"
                  >
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Sidebar Column: Additional Services */}
          <div className="space-y-4 sm:space-y-6">
            <h2 className="font-display font-bold text-sm sm:text-base text-[#062544] uppercase tracking-wider flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#036CFB]"></span>
              <span>APPROVED CORE SERVICES</span>
            </h2>

            {/* Air Ticketing Card */}
            <div className="glass-frost glass-card-hover rounded-3xl p-4 sm:p-6 shadow-md border border-white/80 space-y-3 sm:space-y-4">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-blue-50 to-blue-100 flex items-center justify-center shadow-xs">
                <Plane className="w-5 h-5 sm:w-6 sm:h-6 text-[#036CFB] transform -rotate-45" />
              </div>

              <div>
                <h3 className="font-display font-bold text-[#062544] text-sm sm:text-base uppercase tracking-tight">
                  AIR TICKETING
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Domestic and international airline flight reservations with instant electronic PNR confirmations and route coordination.
                </p>
              </div>

              <button
                onClick={() => setActiveModal('air-ticketing')}
                className="min-h-[36px] inline-flex items-center text-xs font-bold text-[#036CFB] hover:text-[#062544] underline underline-offset-4 transition-colors cursor-pointer"
              >
                Book Tickets
              </button>
            </div>

            {/* Document Attestation Card */}
            <div className="glass-frost glass-card-hover rounded-3xl p-4 sm:p-6 shadow-md border border-white/80 space-y-3 sm:space-y-4">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-blue-50 to-blue-100 flex items-center justify-center shadow-xs">
                <Stamp className="w-5 h-5 sm:w-6 sm:h-6 text-[#036CFB]" />
              </div>

              <div>
                <h3 className="font-display font-bold text-[#062544] text-sm sm:text-base uppercase tracking-tight">
                  DOCUMENT ATTESTATION
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Fast and reliable online coordination for educational, personal, and commercial document attestations from MEA & Foreign Embassies.
                </p>
              </div>

              <button
                onClick={() => setActiveModal('attestation')}
                className="min-h-[36px] inline-flex items-center text-xs font-bold text-[#036CFB] hover:text-[#062544] underline underline-offset-4 transition-colors cursor-pointer"
              >
                Learn More
              </button>
            </div>

            {/* Education Consultancy Card */}
            <div className="glass-frost glass-card-hover rounded-3xl p-4 sm:p-6 shadow-md border border-white/80 space-y-3 sm:space-y-4">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-blue-50 to-blue-100 flex items-center justify-center shadow-xs">
                <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-[#036CFB]" />
              </div>

              <div>
                <h3 className="font-display font-bold text-[#062544] text-sm sm:text-base uppercase tracking-tight">
                  EDUCATION CONSULTANCY
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Overseas university selection, application vetting, SOP assistance, and complete student visa filing.
                </p>
              </div>

              <button
                onClick={() => setActiveModal('education')}
                className="min-h-[36px] inline-flex items-center text-xs font-bold text-[#036CFB] hover:text-[#062544] underline underline-offset-4 transition-colors cursor-pointer"
              >
                Explore Admissions
              </button>
            </div>

            {/* Need Assistance Helpline Box */}
            <div className="glass-frost-navy rounded-3xl p-4 sm:p-6 text-white shadow-xl space-y-3 border border-white/15 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-28 h-28 bg-[#036CFB]/30 rounded-full blur-2xl pointer-events-none"></div>
              <div className="relative z-10 space-y-3">
                <div className="flex items-center space-x-2 text-[#38BDF8] text-xs font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Need Personalized Help?</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  Our online visa specialists are standing by to review your documents digitally before submission.
                </p>
                <a
                  href="tel:+919941900055"
                  className="block text-center py-3 px-4 bg-[#036CFB] hover:bg-[#0256c7] rounded-2xl text-xs font-bold text-white shadow-lg shadow-[#036CFB]/30 transition min-h-[44px] flex items-center justify-center space-x-2 active:scale-95"
                >
                  <span>Call Helpline: +91 99419 00055</span>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
