import React, { useState } from 'react';
import { VISA_SERVICES, ATTESTATION_SERVICES } from '../lib/data';
import { VisaInfo, DocumentAttestationService } from '../types';
import { 
  FileText, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  BookOpen, 
  GraduationCap, 
  Send,
  Building2,
  Award
} from 'lucide-react';

interface VisaAttestationProps {
  onBookNow: (serviceName: string, details: string) => void;
}

export const VisaAttestationSection: React.FC<VisaAttestationProps> = ({ onBookNow }) => {
  const [activeTab, setActiveTab] = useState<'visa' | 'attestation' | 'education'>('visa');
  const [selectedVisa, setSelectedVisa] = useState<VisaInfo>(VISA_SERVICES[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-10">
      
      {/* Subnav Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <span className="text-xs font-bold text-sky-600 uppercase tracking-widest flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-sky-600" />
            <span>OFFICIAL DOCUMENTATION & VISAS</span>
          </span>
          <h2 className="text-3xl font-bold font-serif text-slate-900 mt-1">
            Visa Assistance & Document Attestation Desk
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Complete consular support from our Nungambakkam, Chennai office.
          </p>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          <button
            onClick={() => setActiveTab('visa')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'visa' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Visa Assistance
          </button>
          <button
            onClick={() => setActiveTab('attestation')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'attestation' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Certificate Attestation
          </button>
          <button
            onClick={() => setActiveTab('education')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'education' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Education Abroad
          </button>
        </div>
      </div>

      {/* VISA ASSISTANCE TAB */}
      {activeTab === 'visa' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Country Selection List */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Select Destination Country</h3>
            <div className="space-y-2">
              {VISA_SERVICES.map((v) => (
                <div
                  key={v.id}
                  onClick={() => setSelectedVisa(v)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    selectedVisa.id === v.id
                      ? 'bg-sky-50 border-sky-600 shadow-sm text-slate-900'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{v.flag}</span>
                    <div>
                      <h4 className="text-sm font-bold">{v.country}</h4>
                      <p className="text-xs text-slate-500">{v.entryType} • {v.processingTime}</p>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold text-slate-900">
                    ₹{v.feeINR.toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Visa Requirements & Details Card */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{selectedVisa.flag}</span>
                <div>
                  <h3 className="text-xl font-bold font-serif text-slate-900">{selectedVisa.country}</h3>
                  <span className="text-xs text-sky-600 font-mono font-bold">{selectedVisa.entryType}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-500 block">Est. Processing</span>
                <span className="text-sm font-bold text-emerald-600 font-mono flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {selectedVisa.processingTime}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">NAS Express Assistance Notes</h4>
              <p className="text-xs text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-200 leading-relaxed">
                {selectedVisa.nasAssistanceNotes}
              </p>
            </div>

            <div className="mb-6">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Mandatory Document Checklist</h4>
              <div className="space-y-2">
                {selectedVisa.documentsRequired.map((doc, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-200 pt-4 flex items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-500 block">Assistance Fee</span>
                <span className="text-2xl font-black text-slate-900 font-mono">
                  ₹{selectedVisa.feeINR.toLocaleString('en-IN')}
                </span>
              </div>

              <button
                onClick={() => onBookNow(`Visa Assistance: ${selectedVisa.country}`, `Processing time: ${selectedVisa.processingTime}`)}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm transition-all active:scale-95"
              >
                Apply Visa Assistance
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ATTESTATION TAB */}
      {activeTab === 'attestation' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ATTESTATION_SERVICES.map((att) => (
              <div key={att.id} className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between text-left shadow-sm">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 border border-amber-200">
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{att.title}</h3>
                  <p className="text-xs text-slate-600 mt-2">{att.description}</p>

                  <div className="mt-4 space-y-1.5 border-t border-slate-200 pt-3">
                    <span className="text-[11px] font-bold text-sky-600 uppercase tracking-wider block mb-1">Workflow Steps:</span>
                    {att.steps.map((st, i) => (
                      <p key={i} className="text-xs text-slate-700">{st}</p>
                    ))}
                  </div>
                </div>

                <div className="mt-6 border-t border-slate-200 pt-3 flex items-center justify-between">
                  <span className="text-xs text-emerald-600 font-mono font-bold">{att.processingTime}</span>
                  <button
                    onClick={() => onBookNow(`Attestation: ${att.title}`, `Processing time: ${att.processingTime}`)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-sm"
                  >
                    Submit Document
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EDUCATION ABROAD TAB */}
      {activeTab === 'education' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 text-left shadow-sm">
          <div className="max-w-3xl">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 border border-indigo-200">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold font-serif text-slate-900">Study Abroad Education Consultants</h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              NAS Internationals provides direct university admissions, SOP counseling, scholarship assistance, and student visa processing for top institutions in UK, Canada, Australia, Malaysia, UAE, and Singapore.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <strong className="text-sky-700 block mb-1">Global University Admissions</strong>
                Guidance on selecting top accredited courses matching your profile.
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <strong className="text-sky-700 block mb-1">Student Visa & Proof of Funds</strong>
                Error-free student visa filing and financial document preparation.
              </div>
            </div>

            <button
              onClick={() => onBookNow('Study Abroad Counseling', 'Inquiry for university selection and student visa')}
              className="mt-6 px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-sm transition-all"
            >
              Book Free Student Counseling
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
