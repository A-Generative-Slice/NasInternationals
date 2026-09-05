import React from 'react';
import { Globe, Briefcase, GraduationCap, Handshake, Stamp, FileText, ChevronDown, CheckCircle, ArrowRight, Clock, ShieldCheck, Sparkles } from 'lucide-react';
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
    <div className="bg-[#EBF3FF]/60 min-h-[calc(100vh-5rem)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Page Title */}
        <div className="text-center md:text-left">
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0B1E3D] tracking-tight uppercase">
            INTERACTIVE VISA FINDER & SERVICES
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Instant eligibility check, 100% digital processing, and fast-track embassy approvals.
          </p>
        </div>

        {/* Navy Filter Control Bar */}
        <div className="bg-[#0B1E3D] rounded-2xl p-4 sm:p-5 shadow-xl border border-slate-700/50">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-4 items-center">
            {/* Destination Selector */}
            <div className="relative">
              <label className="block text-[11px] font-semibold text-slate-300 mb-1 uppercase tracking-wider">
                Destination Country
              </label>
              <div className="relative">
                <select
                  value={selectedDestination}
                  onChange={(e) => setSelectedDestination(e.target.value)}
                  className="w-full bg-white text-slate-800 text-sm font-medium py-2.5 px-3 pr-8 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-[#036CFB] cursor-pointer shadow-sm"
                >
                  {COUNTRIES_LIST.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Nationality Selector */}
            <div className="relative">
              <label className="block text-[11px] font-semibold text-slate-300 mb-1 uppercase tracking-wider">
                Nationality
              </label>
              <div className="relative">
                <select
                  value={selectedNationality}
                  onChange={(e) => setSelectedNationality(e.target.value)}
                  className="w-full bg-white text-slate-800 text-sm font-medium py-2.5 px-3 pr-8 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-[#036CFB] cursor-pointer shadow-sm"
                >
                  {NATIONALITIES_LIST.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Purpose Selector */}
            <div className="relative">
              <label className="block text-[11px] font-semibold text-slate-300 mb-1 uppercase tracking-wider">
                Purpose of Visit
              </label>
              <div className="relative">
                <select
                  value={selectedPurpose}
                  onChange={(e) => setSelectedPurpose(e.target.value)}
                  className="w-full bg-white text-slate-800 text-sm font-medium py-2.5 px-3 pr-8 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-[#036CFB] cursor-pointer shadow-sm"
                >
                  {PURPOSES_LIST.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Find Visa Button */}
            <div className="pt-2 sm:pt-5">
              <button
                onClick={() => {
                  // Filter trigger feedback
                }}
                className="w-full py-2.5 px-4 bg-[#036CFB] hover:bg-[#0256c7] active:scale-98 text-white font-display font-bold text-sm tracking-wide rounded-xl shadow-lg shadow-[#036CFB]/25 transition-all flex items-center justify-center space-x-2"
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
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {VISA_CATEGORIES.map((visa) => (
              <div
                key={visa.id}
                className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border border-blue-100 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Subtle sky background gradient glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/80 rounded-bl-full pointer-events-none -z-0"></div>

                <div className="relative z-10 space-y-4">
                  {/* Icon & Title */}
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-blue-100/80 flex items-center justify-center shadow-inner shrink-0 group-hover:bg-[#036CFB]/10 transition-colors">
                      {renderIcon(visa.iconName)}
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-[#0B1E3D] text-lg uppercase tracking-wide">
                        {visa.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        For {selectedDestination} ({selectedNationality} Passport)
                      </p>
                    </div>
                  </div>

                  {/* Online Processing Mode & Time info */}
                  <div className="space-y-2 pt-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#036CFB]/10 text-[#036CFB] text-xs font-bold">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#036CFB]" />
                      <span>100% Online Application</span>
                    </div>

                    <p className="text-xs text-slate-500 flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>Processing Time: {visa.processingTimeMin}-{visa.processingTimeMax} Business Days</span>
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {visa.description}
                  </p>
                </div>

                {/* Apply Now Button */}
                <div className="pt-6 relative z-10 flex items-center space-x-2">
                  <button
                    onClick={() => handleApplyClick(visa)}
                    className="flex-1 py-2.5 px-4 bg-[#036CFB] hover:bg-[#0256c7] text-white font-display font-bold text-xs tracking-wider uppercase rounded-full shadow-md shadow-[#036CFB]/25 transition-all text-center"
                  >
                    Apply Now
                  </button>
                  <button
                    onClick={() => handleLearnMoreVisa(visa)}
                    className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-full transition-colors"
                  >
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Sidebar Column: Additional Services */}
          <div className="space-y-6">
            <h2 className="font-display font-bold text-base text-[#0B1E3D] uppercase tracking-wider">
              ADDITIONAL SERVICES
            </h2>

            {/* Document Attestation Card */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-md border border-blue-100 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100/80 flex items-center justify-center">
                <Stamp className="w-6 h-6 text-[#036CFB]" />
              </div>

              <div>
                <h3 className="font-display font-bold text-[#0B1E3D] text-base uppercase tracking-tight">
                  DOCUMENT ATTESTATION
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Fast and reliable online coordination for educational, personal, and commercial document attestations from MEA & Foreign Embassies.
                </p>
              </div>

              <button
                onClick={() => setActiveModal('attestation')}
                className="inline-flex items-center text-xs font-bold text-[#036CFB] hover:text-[#0B1E3D] underline underline-offset-4 transition-colors"
              >
                Learn More
              </button>
            </div>

            {/* Passport Services Card */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-md border border-blue-100 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100/80 flex items-center justify-center">
                <FileText className="w-6 h-6 text-[#036CFB]" />
              </div>

              <div>
                <h3 className="font-display font-bold text-[#0B1E3D] text-base uppercase tracking-tight">
                  PASSPORT SERVICES
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Online assistance for new passports, renewals, Tatkal processing, address modifications, and documentation review.
                </p>
              </div>

              <button
                onClick={() => setActiveModal('passport')}
                className="inline-flex items-center text-xs font-bold text-[#036CFB] hover:text-[#0B1E3D] underline underline-offset-4 transition-colors"
              >
                Learn More
              </button>
            </div>

            {/* Need Assistance Helpline Box */}
            <div className="bg-gradient-to-br from-[#062544] to-[#0B1E3D] rounded-2xl p-5 text-white shadow-lg space-y-3 border border-slate-700">
              <div className="flex items-center space-x-2 text-[#38BDF8] text-xs font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Need Personalized Help?</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Our online visa specialists are standing by to review your documents digitally before submission.
              </p>
              <a
                href="tel:+919941900055"
                className="block text-center py-2 px-3 bg-[#036CFB] hover:bg-[#0256c7] rounded-xl text-xs font-bold text-white shadow-md shadow-[#036CFB]/25 transition"
              >
                Call Helpline: +91 99419 00055
              </a>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
