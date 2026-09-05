import React from 'react';
import { X, CheckCircle, Clock, ShieldCheck, FileCheck, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const VisaDetailModal: React.FC = () => {
  const { selectedVisa, activeModal, setActiveModal, setCurrentView, resetWizard } = useApp();

  if (activeModal !== 'visa-detail' || !selectedVisa) return null;

  const handleApplyNow = () => {
    setActiveModal(null);
    resetWizard();
    setCurrentView('wizard');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#062544]/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-frost rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto relative border border-white/90 backdrop-blur-2xl">
        <button
          onClick={() => setActiveModal(null)}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100/80 text-slate-500 transition-colors min-h-[38px] min-w-[38px] flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1.5 pr-8">
          <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#036CFB]/15 text-[#036CFB] uppercase tracking-wider border border-[#036CFB]/20 inline-block">
            {selectedVisa.type}
          </span>
          <h2 className="font-display font-extrabold text-2xl text-[#062544]">
            {selectedVisa.title}
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            {selectedVisa.description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 glass-frost-subtle p-4 rounded-2xl border border-white/80 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Application Mode</span>
            <span className="font-display font-extrabold text-[#036CFB] text-xs sm:text-sm flex items-center gap-1.5 mt-1">
              <ShieldCheck className="w-4 h-4 text-[#036CFB] shrink-0" />
              100% Online Digital
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Turnaround Time</span>
            <span className="font-bold text-slate-800 flex items-center space-x-1 mt-1">
              <Clock className="w-3.5 h-3.5 text-[#036CFB]" />
              <span>{selectedVisa.processingTimeMin}-{selectedVisa.processingTimeMax} Days</span>
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-display font-bold text-xs text-[#062544] uppercase tracking-wider flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#036CFB]"></span>
            <span>Mandatory Documents Checklist</span>
          </h3>
          <ul className="space-y-2 text-xs text-slate-700">
            {selectedVisa.requirements.map((req, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between gap-3">
          <button
            onClick={() => setActiveModal(null)}
            className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-white/80 rounded-full border border-slate-200 transition min-h-[44px]"
          >
            Close
          </button>
          <button
            onClick={handleApplyNow}
            className="px-6 py-2.5 bg-gradient-to-r from-[#036CFB] to-[#0284C7] hover:from-[#0256c7] hover:to-[#036CFB] text-white font-display font-bold text-xs rounded-full shadow-lg shadow-[#036CFB]/30 transition flex items-center space-x-1.5 min-h-[44px]"
          >
            <span>Proceed to Apply</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
