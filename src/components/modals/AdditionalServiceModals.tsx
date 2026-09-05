import React, { useState } from 'react';
import { X, Stamp, FileText, Lock, User, CheckCircle2, Phone } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdditionalServiceModals: React.FC = () => {
  const { activeModal, setActiveModal, userRole, setUserRole } = useApp();

  const [loginEmail, setLoginEmail] = useState('');
  const [loginRole, setLoginRole] = useState<'client' | 'admin'>('client');

  if (!activeModal || activeModal === 'visa-detail') return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      
      {/* Attestation Modal */}
      {activeModal === 'attestation' && (
        <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 relative">
          <button
            onClick={() => setActiveModal(null)}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-slate-100 text-slate-500"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#036CFB] flex items-center justify-center">
              <Stamp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-[#0B1E3D]">
                Document Attestation Services
              </h3>
              <p className="text-xs text-slate-500">MEA, HRD & Foreign Embassy Accreditation</p>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-700">
            <p className="leading-relaxed">
              We manage end-to-end verification and apostille services for educational degrees, marriage certificates, birth certificates, and commercial documents.
            </p>
            <ul className="space-y-1.5 pt-2 font-medium">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Ministry of External Affairs (MEA) Apostille</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Embassy Attestation (UAE, Saudi Arabia, Qatar, Kuwait)</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Home Department & State HRD Verification</span>
              </li>
            </ul>
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
            <a
              href="tel:+919941900055"
              className="text-xs font-extrabold text-[#036CFB] flex items-center space-x-1"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Helpline: +91 99419 00055</span>
            </a>
            <button
              onClick={() => setActiveModal(null)}
              className="px-4 py-2 bg-[#062544] text-white text-xs font-bold rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Passport Services Modal */}
      {activeModal === 'passport' && (
        <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 relative">
          <button
            onClick={() => setActiveModal(null)}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-slate-100 text-slate-500"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#036CFB] flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-[#0B1E3D]">
                Passport Consultancy & Tatkal
              </h3>
              <p className="text-xs text-slate-500">Expedited Online Passport Application & Tatkal Assistance</p>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-700">
            <p className="leading-relaxed">
              Fast-track fresh passport applications, Tatkal appointments, address modifications, ECNR conversions, and lost passport replacements—all managed digitally.
            </p>
            <ul className="space-y-1.5 pt-2 font-medium">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>100% Online Passport Application & Tatkal Assistance</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Passport Renewal & Address Changes</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Lost / Damaged Passport Replacement Guidance</span>
              </li>
            </ul>
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
            <a
              href="tel:+919941900055"
              className="text-xs font-extrabold text-[#036CFB] flex items-center space-x-1"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Helpline: +91 99419 00055</span>
            </a>
            <button
              onClick={() => setActiveModal(null)}
              className="px-4 py-2 bg-[#062544] text-white text-xs font-bold rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Login / Role Switcher Modal */}
      {activeModal === 'login' && (
        <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 relative">
          <button
            onClick={() => setActiveModal(null)}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-slate-100 text-slate-500"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center space-y-1">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#036CFB]/15 text-[#036CFB] uppercase tracking-wider">
              Authentication Portal
            </span>
            <h3 className="font-display font-extrabold text-2xl text-[#0B1E3D]">
              Sign In to NAS Portal
            </h3>
            <p className="text-xs text-slate-500">
              Test two different user accounts to verify role-based permissions
            </p>
          </div>

          {/* Quick Preset Buttons */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Select Test Account Type:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setUserRole('client');
                  setActiveModal(null);
                }}
                className={`p-3 rounded-xl border text-left transition space-y-1 ${
                  userRole === 'client'
                    ? 'border-[#036CFB] bg-blue-50/80 ring-2 ring-[#036CFB]/30'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#0B1E3D]">👤 Client User</span>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">Standard</span>
                </div>
                <p className="text-[10px] text-slate-500 font-mono">client@nas.com</p>
                <p className="text-[10px] text-slate-600 leading-tight">
                  Cannot access Admin Page
                </p>
              </button>

              <button
                type="button"
                onClick={() => {
                  setUserRole('admin');
                  setActiveModal(null);
                }}
                className={`p-3 rounded-xl border text-left transition space-y-1 ${
                  userRole === 'admin'
                    ? 'border-[#036CFB] bg-slate-900 text-white ring-2 ring-[#036CFB]'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-bold text-xs ${userRole === 'admin' ? 'text-[#38BDF8]' : 'text-[#0B1E3D]'}`}>
                    🛡️ Admin User
                  </span>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300">Full Ops</span>
                </div>
                <p className={`text-[10px] font-mono ${userRole === 'admin' ? 'text-slate-300' : 'text-slate-500'}`}>
                  admin@nas.com
                </p>
                <p className={`text-[10px] leading-tight ${userRole === 'admin' ? 'text-slate-300' : 'text-slate-600'}`}>
                  Full Access to Admin Page
                </p>
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-3">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
              <span className="font-bold text-slate-800 block">🔒 Access Control Policy:</span>
              <p className="text-[11px] text-slate-500">
                When signed in as <strong>Client User</strong>, navigating to the <strong>Admin Ops</strong> page will display an <strong>Access Denied</strong> security barrier.
              </p>
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="w-full py-2.5 bg-[#0B1E3D] hover:bg-blue-900 text-white font-display font-bold text-xs tracking-wide rounded-xl shadow-md transition"
            >
              Continue to Portal
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
