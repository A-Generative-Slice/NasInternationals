import React from 'react';
import { X, Stamp, Plane, GraduationCap, CheckCircle2, Phone, MessageSquare } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdditionalServiceModals: React.FC = () => {
  const { activeModal, setActiveModal } = useApp();

  if (!activeModal || activeModal === 'visa-detail') return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#062544]/65 backdrop-blur-md flex items-center justify-center p-3 xs:p-4">
      
      {/* 1. Document Attestation Modal */}
      {activeModal === 'attestation' && (
        <div className="glass-frost rounded-3xl max-w-md w-full p-4 sm:p-7 shadow-2xl space-y-4 relative border border-white/90 backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-200 max-h-[90dvh] overflow-y-auto overscroll-contain">
          <button
            onClick={() => setActiveModal(null)}
            className="absolute top-3.5 right-3.5 p-2 rounded-full hover:bg-slate-100/80 text-slate-500 transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center cursor-pointer active:scale-95"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3 pr-8">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-[#036CFB] to-[#38BDF8] text-white flex items-center justify-center shadow-md shadow-[#036CFB]/25 shrink-0">
              <Stamp className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-base sm:text-lg text-[#062544]">
                Document Attestation
              </h3>
              <p className="text-[10px] sm:text-xs text-[#036CFB] font-bold uppercase tracking-wider">MEA & Foreign Embassy Legalization</p>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-700">
            <p className="leading-relaxed font-medium">
              We manage end-to-end document verification and official apostille services for educational degrees, marriage certificates, birth certificates, and commercial documents.
            </p>
            <ul className="space-y-2 pt-1 font-medium">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Ministry of External Affairs (MEA) Apostille & Attestation</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Embassy Attestation (UAE, Saudi Arabia, Qatar, Kuwait, Oman, Bahrain)</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>State HRD & Home Department Authentication</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Degree, Diploma, Birth, Marriage & Commercial Invoices</span>
              </li>
            </ul>
          </div>

          <div className="pt-3.5 border-t border-slate-200/60 flex flex-col sm:flex-row justify-between items-center gap-2.5 sm:gap-3">
            <a
              href="tel:+919941900055"
              className="min-h-[40px] text-xs font-extrabold text-[#036CFB] hover:text-[#062544] flex items-center space-x-1.5 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Helpline: +91 99419 00055</span>
            </a>
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <a
                href="https://wa.me/919941900055?text=Hello%20NAS%20Internationals,%20I%20need%20assistance%20with%20Document%20Attestation."
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-initial min-h-[42px] px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white text-xs font-bold rounded-full transition-colors flex items-center justify-center space-x-1 shadow-sm active:scale-95"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
              <button
                onClick={() => setActiveModal(null)}
                className="min-h-[42px] px-4 py-2.5 bg-[#062544] hover:bg-[#036CFB] text-white text-xs font-bold rounded-full transition-colors active:scale-95 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Air Ticketing Modal */}
      {activeModal === 'air-ticketing' && (
        <div className="glass-frost rounded-3xl max-w-md w-full p-4 sm:p-7 shadow-2xl space-y-4 relative border border-white/90 backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-200 max-h-[90dvh] overflow-y-auto overscroll-contain">
          <button
            onClick={() => setActiveModal(null)}
            className="absolute top-3.5 right-3.5 p-2 rounded-full hover:bg-slate-100/80 text-slate-500 transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center cursor-pointer active:scale-95"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3 pr-8">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-[#036CFB] to-[#0284C7] text-white flex items-center justify-center shadow-md shadow-[#036CFB]/25 shrink-0">
              <Plane className="w-5 h-5 sm:w-6 sm:h-6 transform -rotate-45" />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-base sm:text-lg text-[#062544]">
                Air Ticketing Services
              </h3>
              <p className="text-[10px] sm:text-xs text-[#036CFB] font-bold uppercase tracking-wider">Domestic & International Flight Bookings</p>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-700">
            <p className="leading-relaxed font-medium">
              Seamless digital flight ticket reservations for individual and corporate travelers with instant electronic PNR confirmations and dedicated route assistance.
            </p>
            <ul className="space-y-2 pt-1 font-medium">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Instant E-Ticket Issuance & WhatsApp / Email Delivery</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Direct & Connecting Global Routes across Major Airlines</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Extra Baggage Allowance & Meal Preference Coordination</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>24/7 Flight Date-Change, Rescheduling & Support Desk</span>
              </li>
            </ul>
          </div>

          <div className="pt-3.5 border-t border-slate-200/60 flex flex-col sm:flex-row justify-between items-center gap-2.5 sm:gap-3">
            <a
              href="tel:+919941900055"
              className="min-h-[40px] text-xs font-extrabold text-[#036CFB] hover:text-[#062544] flex items-center space-x-1.5 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Helpline: +91 99419 00055</span>
            </a>
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <a
                href="https://wa.me/919941900055?text=Hello%20NAS%20Internationals,%20I%20want%20to%20book%20an%20Air%20Ticket."
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-initial min-h-[42px] px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white text-xs font-bold rounded-full transition-colors flex items-center justify-center space-x-1 shadow-sm active:scale-95"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Book on WhatsApp</span>
              </a>
              <button
                onClick={() => setActiveModal(null)}
                className="min-h-[42px] px-4 py-2.5 bg-[#062544] hover:bg-[#036CFB] text-white text-xs font-bold rounded-full transition-colors active:scale-95 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Education Consultancy Modal */}
      {activeModal === 'education' && (
        <div className="glass-frost rounded-3xl max-w-md w-full p-4 sm:p-7 shadow-2xl space-y-4 relative border border-white/90 backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-200 max-h-[90dvh] overflow-y-auto overscroll-contain">
          <button
            onClick={() => setActiveModal(null)}
            className="absolute top-3.5 right-3.5 p-2 rounded-full hover:bg-slate-100/80 text-slate-500 transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center cursor-pointer active:scale-95"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3 pr-8">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-[#036CFB] to-[#38BDF8] text-white flex items-center justify-center shadow-md shadow-[#036CFB]/25 shrink-0">
              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-base sm:text-lg text-[#062544]">
                Education Consultancy
              </h3>
              <p className="text-[10px] sm:text-xs text-[#036CFB] font-bold uppercase tracking-wider">Overseas Admissions & Student Visas</p>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-700">
            <p className="leading-relaxed font-medium">
              Comprehensive academic counseling and dedicated admissions guidance for students seeking higher education in top global destinations.
            </p>
            <ul className="space-y-2 pt-1 font-medium">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>University & College Shortlisting (UK, USA, Canada, Europe, Australia)</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Statement of Purpose (SOP) Review & Application Filing</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Student Visa Documentation & Financial Guidance</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Pre-Departure Orientation & Post-Arrival Guidance</span>
              </li>
            </ul>
          </div>

          <div className="pt-3.5 border-t border-slate-200/60 flex flex-col sm:flex-row justify-between items-center gap-2.5 sm:gap-3">
            <a
              href="tel:+919941900055"
              className="min-h-[40px] text-xs font-extrabold text-[#036CFB] hover:text-[#062544] flex items-center space-x-1.5 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Helpline: +91 99419 00055</span>
            </a>
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <a
                href="https://wa.me/919941900055?text=Hello%20NAS%20Internationals,%20I%20am%20interested%20in%20Overseas%20Education%20Consultancy."
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-initial min-h-[42px] px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white text-xs font-bold rounded-full transition-colors flex items-center justify-center space-x-1 shadow-sm active:scale-95"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
              <button
                onClick={() => setActiveModal(null)}
                className="min-h-[42px] px-4 py-2.5 bg-[#062544] hover:bg-[#036CFB] text-white text-xs font-bold rounded-full transition-colors active:scale-95 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
