import React from 'react';
import { X, Stamp, FileText, CheckCircle2, Phone } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdditionalServiceModals: React.FC = () => {
  const { activeModal, setActiveModal } = useApp();

  if (!activeModal || activeModal === 'visa-detail') return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#062544]/60 backdrop-blur-md flex items-center justify-center p-4">
      
      {/* Attestation Modal */}
      {activeModal === 'attestation' && (
        <div className="glass-frost rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-4 relative border border-white/90 backdrop-blur-2xl">
          <button
            onClick={() => setActiveModal(null)}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100/80 text-slate-500 transition-colors min-h-[38px] min-w-[38px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#036CFB] to-[#38BDF8] text-white flex items-center justify-center shadow-md shadow-[#036CFB]/25">
              <Stamp className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-lg text-[#062544]">
                Document Attestation Services
              </h3>
              <p className="text-xs text-slate-500 font-medium">MEA, HRD & Foreign Embassy Accreditation</p>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-700">
            <p className="leading-relaxed">
              We manage end-to-end verification and apostille services for educational degrees, marriage certificates, birth certificates, and commercial documents.
            </p>
            <ul className="space-y-2 pt-2 font-medium">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Ministry of External Affairs (MEA) Apostille</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Embassy Attestation (UAE, Saudi Arabia, Qatar, Kuwait)</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Home Department & State HRD Verification</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-slate-200/60 flex justify-between items-center gap-3">
            <a
              href="tel:+919941900055"
              className="text-xs font-extrabold text-[#036CFB] hover:text-[#062544] flex items-center space-x-1.5 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Call Helpline: +91 99419 00055</span>
            </a>
            <button
              onClick={() => setActiveModal(null)}
              className="px-5 py-2.5 bg-[#062544] hover:bg-[#036CFB] text-white text-xs font-bold rounded-full transition-colors min-h-[40px]"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Passport Services Modal */}
      {activeModal === 'passport' && (
        <div className="glass-frost rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-4 relative border border-white/90 backdrop-blur-2xl">
          <button
            onClick={() => setActiveModal(null)}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100/80 text-slate-500 transition-colors min-h-[38px] min-w-[38px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#036CFB] to-[#38BDF8] text-white flex items-center justify-center shadow-md shadow-[#036CFB]/25">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-lg text-[#062544]">
                Passport Consultancy & Tatkal
              </h3>
              <p className="text-xs text-slate-500 font-medium">Expedited Online Passport Application & Tatkal Assistance</p>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-700">
            <p className="leading-relaxed">
              Fast-track fresh passport applications, Tatkal appointments, address modifications, ECNR conversions, and lost passport replacements—all managed digitally.
            </p>
            <ul className="space-y-2 pt-2 font-medium">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Online Passport Application & Tatkal Assistance</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Passport Renewal & Address Changes</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Lost / Damaged Passport Replacement Guidance</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-slate-200/60 flex justify-between items-center gap-3">
            <a
              href="tel:+919941900055"
              className="text-xs font-extrabold text-[#036CFB] hover:text-[#062544] flex items-center space-x-1.5 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Call Helpline: +91 99419 00055</span>
            </a>
            <button
              onClick={() => setActiveModal(null)}
              className="px-5 py-2.5 bg-[#062544] hover:bg-[#036CFB] text-white text-xs font-bold rounded-full transition-colors min-h-[40px]"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
