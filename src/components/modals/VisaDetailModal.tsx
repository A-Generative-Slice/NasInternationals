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
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={() => setActiveModal(null)}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-500"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1 pr-6">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#C8A24A]/20 text-[#0B1E3D] uppercase tracking-wider">
            {selectedVisa.type}
          </span>
          <h2 className="font-display font-extrabold text-2xl text-[#0B1E3D]">
            {selectedVisa.title}
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            {selectedVisa.description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Embassy Processing Fee</span>
            <span className="font-display font-extrabold text-[#0B1E3D] text-lg">
              ₹{selectedVisa.priceInINR.toLocaleString('en-IN')}
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
          <h3 className="font-display font-bold text-xs text-[#0B1E3D] uppercase tracking-wider">
            Mandatory Documents Checklist
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

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={() => setActiveModal(null)}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
          >
            Close
          </button>
          <button
            onClick={handleApplyNow}
            className="px-6 py-2.5 bg-[#C8A24A] hover:bg-[#EAC166] text-[#0B1E3D] font-display font-bold text-xs rounded-xl shadow-md transition flex items-center space-x-1.5"
          >
            <span>Proceed to Apply</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
