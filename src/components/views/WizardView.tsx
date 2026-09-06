import React, { useState, useRef } from 'react';
import { UploadCloud, CheckCircle2, Phone, MessageSquare, ArrowRight, ArrowLeft, FileText, Check, ShieldCheck, Sparkles, X, Eye, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { COUNTRIES_LIST, NATIONALITIES_LIST, PURPOSES_LIST } from '../../data/mockData';
import { uploadCustomerDocument } from '../../services/supabaseStorage';

interface UploadedDocInfo {
  name: string;
  size: string;
  url: string;
  type: string;
}

export const WizardView: React.FC = () => {
  const {
    wizardStep,
    setWizardStep,
    wizardData,
    updateWizardData,
    submitWizardApplication,
    setCurrentView,
    selectedVisa
  } = useApp();

  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState<string | null>(null);

  const [uploadedDocs, setUploadedDocs] = useState<{ [key: string]: UploadedDocInfo }>({
    'Passport Bio-Page': {
      name: 'passport_bio_page.pdf',
      size: '1.2 MB',
      url: '',
      type: 'application/pdf'
    },
    'Recent Photograph': {
      name: 'applicant_photo_35x45.jpg',
      size: '420 KB',
      url: '',
      type: 'image/jpeg'
    },
    'Bank Statements': {
      name: 'bank_statement_recent.pdf',
      size: '2.8 MB',
      url: '',
      type: 'application/pdf'
    }
  });

  const generalFileInputRef = useRef<HTMLInputElement | null>(null);
  const passportInputRef = useRef<HTMLInputElement | null>(null);
  const photoInputRef = useRef<HTMLInputElement | null>(null);
  const bankInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelection = async (docTitle: string, file: File) => {
    setIsUploading(docTitle);
    try {
      const result = await uploadCustomerDocument(file, 'visa-documents');
      const sizeStr = file.size > 1024 * 1024 
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` 
        : `${Math.round(file.size / 1024)} KB`;

      setUploadedDocs(prev => ({
        ...prev,
        [docTitle]: {
          name: file.name,
          size: sizeStr,
          url: result.url,
          type: file.type
        }
      }));
    } catch (err) {
      console.warn('Document upload error:', err);
    } finally {
      setIsUploading(null);
    }
  };

  const handleRemoveDoc = (docTitle: string) => {
    setUploadedDocs(prev => {
      const copy = { ...prev };
      delete copy[docTitle];
      return copy;
    });
  };

  const handleNext = () => {
    if (wizardStep < 4) {
      setWizardStep(wizardStep + 1);
    } else {
      // Step 4 Submit
      submitWizardApplication();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      setCurrentView('payment-tracker');
    }
  };

  const handlePrev = () => {
    if (wizardStep > 1) {
      setWizardStep(wizardStep - 1);
    }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-[calc(100vh-5rem)] py-5 xs:py-6 sm:py-8 px-3 xs:px-4 sm:px-6 lg:px-8 relative overflow-hidden pb-40 lg:pb-20">
      {/* Ambient background glow blobs */}
      <div className="ambient-glow-blue top-12 left-1/4 -translate-x-1/2"></div>
      <div className="ambient-glow-sky top-80 right-10"></div>
      <div className="ambient-glow-blue bottom-32 left-10"></div>

      <div className="max-w-5xl mx-auto space-y-8 relative z-10">
        
        {/* Top Stepper Progress Bar */}
        <div className="glass-frost rounded-2xl sm:rounded-3xl p-3.5 xs:p-4 sm:p-6 shadow-md border border-white/80 backdrop-blur-xl">
          <div className="flex items-center justify-between max-w-3xl mx-auto relative">
            
            {/* Connecting Line */}
            <div className="absolute top-4 left-6 right-6 h-0.5 bg-slate-200 -z-0">
              <div
                className="h-full bg-[#036CFB] transition-all duration-300"
                style={{
                  width: wizardStep === 1 ? '0%' : wizardStep === 2 ? '33%' : wizardStep === 3 ? '66%' : '100%'
                }}
              ></div>
            </div>

            {/* Step 1 */}
            <div className="relative z-10 flex flex-col items-center space-y-1">
              <div
                className={`w-8 h-8 xs:w-9 xs:h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                  wizardStep >= 1 ? 'bg-[#036CFB] text-white shadow-md shadow-[#036CFB]/30' : 'bg-slate-100 text-slate-400'
                }`}
              >
                1
              </div>
              <span className="text-xs font-semibold text-slate-800 hidden sm:inline">Personal Details</span>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 flex flex-col items-center space-y-1">
              <div
                className={`w-8 h-8 xs:w-9 xs:h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                  wizardStep >= 2 ? 'bg-[#036CFB] text-white shadow-md shadow-[#036CFB]/30' : 'bg-slate-100 text-slate-400'
                }`}
              >
                2
              </div>
              <span className="text-xs font-semibold text-slate-800 hidden sm:inline">Travel Info</span>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 flex flex-col items-center space-y-1">
              <div
                className={`w-8 h-8 xs:w-9 xs:h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                  wizardStep >= 3 ? 'bg-[#036CFB] text-white shadow-md shadow-[#036CFB]/30' : 'bg-slate-100 text-slate-400'
                }`}
              >
                3
              </div>
              <span className="text-xs font-bold text-[#036CFB] hidden sm:inline">Document Upload</span>
            </div>

            {/* Step 4 */}
            <div className="relative z-10 flex flex-col items-center space-y-1">
              <div
                className={`w-8 h-8 xs:w-9 xs:h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                  wizardStep === 4 ? 'bg-[#036CFB] text-white shadow-md shadow-[#036CFB]/30' : 'bg-slate-100 text-slate-400'
                }`}
              >
                4
              </div>
              <span className="text-xs font-semibold text-slate-800 hidden sm:inline">Review & Submit</span>
            </div>

          </div>
        </div>

        {/* Wizard Main Card & Help Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          
          {/* Main Wizard Form Card (Span 3) */}
          <div className="lg:col-span-3 glass-frost rounded-2xl sm:rounded-3xl p-4 xs:p-6 sm:p-8 shadow-xl border border-white/80 space-y-6 backdrop-blur-2xl">
            
            {/* Step 1: Personal Details */}
            {wizardStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display font-bold text-xl text-[#062544]">
                    Personal Details
                  </h2>
                  <p className="text-xs text-slate-500">Provide legal name and contact details matching your passport.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Legal Name
                    </label>
                    <input
                      type="text"
                      value={wizardData.applicantName || ''}
                      onChange={(e) => updateWizardData({ applicantName: e.target.value })}
                      placeholder="Rahul Sharma"
                      className="w-full bg-white/90 border border-slate-200 rounded-2xl p-3 sm:p-3.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#036CFB] focus:ring-2 focus:ring-[#036CFB]/20 min-h-[44px] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Passport Number
                    </label>
                    <input
                      type="text"
                      value={wizardData.passportNumber || ''}
                      onChange={(e) => updateWizardData({ passportNumber: e.target.value })}
                      placeholder="Z8923412"
                      className="w-full bg-white/90 border border-slate-200 rounded-2xl p-3 sm:p-3.5 text-xs font-mono font-semibold text-slate-800 focus:outline-none focus:border-[#036CFB] focus:ring-2 focus:ring-[#036CFB]/20 min-h-[44px] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={wizardData.email || ''}
                      onChange={(e) => updateWizardData({ email: e.target.value })}
                      placeholder="rahul.sharma@example.com"
                      className="w-full bg-white/90 border border-slate-200 rounded-2xl p-3 sm:p-3.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#036CFB] focus:ring-2 focus:ring-[#036CFB]/20 min-h-[44px] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={wizardData.phone || ''}
                      onChange={(e) => updateWizardData({ phone: e.target.value })}
                      placeholder="+91 99419 00055"
                      className="w-full bg-white/90 border border-slate-200 rounded-2xl p-3 sm:p-3.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#036CFB] focus:ring-2 focus:ring-[#036CFB]/20 min-h-[44px] transition"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Travel Info */}
            {wizardStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display font-bold text-xl text-[#062544]">
                    Travel Details
                  </h2>
                  <p className="text-xs text-slate-500">Select your destination, nationality, and visa category.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Destination Country</label>
                    <select
                      value={wizardData.destination || 'Canada'}
                      onChange={(e) => updateWizardData({ destination: e.target.value })}
                      className="w-full bg-white/90 border border-slate-200 rounded-2xl p-3 sm:p-3.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#036CFB] focus:ring-2 focus:ring-[#036CFB]/20 min-h-[44px] transition cursor-pointer"
                    >
                      {COUNTRIES_LIST.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Nationality</label>
                    <select
                      value={wizardData.nationality || 'Indian'}
                      onChange={(e) => updateWizardData({ nationality: e.target.value })}
                      className="w-full bg-white/90 border border-slate-200 rounded-2xl p-3 sm:p-3.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#036CFB] focus:ring-2 focus:ring-[#036CFB]/20 min-h-[44px] transition cursor-pointer"
                    >
                      {NATIONALITIES_LIST.map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Purpose of Visit</label>
                    <select
                      value={wizardData.purpose || 'Tourism & Leisure'}
                      onChange={(e) => updateWizardData({ purpose: e.target.value })}
                      className="w-full bg-white/90 border border-slate-200 rounded-2xl p-3 sm:p-3.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#036CFB] focus:ring-2 focus:ring-[#036CFB]/20 min-h-[44px] transition cursor-pointer"
                    >
                      {PURPOSES_LIST.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Document Upload */}
            {wizardStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display font-bold text-xl text-[#062544]">
                    Document Upload
                  </h2>
                  <p className="text-xs text-slate-500">Upload clear digital copies or photos of your supporting documents.</p>
                </div>

                {/* Hidden File Inputs */}
                <input
                  type="file"
                  ref={generalFileInputRef}
                  accept="image/*,application/pdf"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileSelection('Supporting Document', e.target.files[0]);
                    }
                  }}
                />
                <input
                  type="file"
                  ref={passportInputRef}
                  accept="image/*,application/pdf"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileSelection('Passport Bio-Page', e.target.files[0]);
                    }
                  }}
                />
                <input
                  type="file"
                  ref={photoInputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileSelection('Recent Photograph', e.target.files[0]);
                    }
                  }}
                />
                <input
                  type="file"
                  ref={bankInputRef}
                  accept="image/*,application/pdf"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileSelection('Bank Statements', e.target.files[0]);
                    }
                  }}
                />

                {/* Drag & Drop Main Box */}
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragActive(false);
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      handleFileSelection('Passport Bio-Page', e.dataTransfer.files[0]);
                    }
                  }}
                  onClick={() => generalFileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-3xl p-6 sm:p-8 text-center transition-all cursor-pointer ${
                    dragActive ? 'border-[#036CFB] bg-blue-50/70 shadow-lg' : 'border-blue-200/80 hover:border-[#036CFB] bg-white/60 shadow-xs'
                  }`}
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#036CFB] to-[#38BDF8] text-white flex items-center justify-center mx-auto mb-3 shadow-md shadow-[#036CFB]/25">
                    <UploadCloud className="w-7 h-7" />
                  </div>
                  <p className="font-bold text-slate-800 text-sm">
                    Drag and drop your documents here
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    or <span className="text-[#036CFB] underline font-bold">Browse files</span> from your device
                  </p>
                  <p className="text-[10px] text-slate-400 mt-2 font-medium">
                    PDF, JPG, PNG accepted • Up to 10MB per file
                  </p>
                </div>

                {/* Document Slots */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  
                  {/* Slot 1: Passport Bio-Page */}
                  <div className="glass-frost-subtle rounded-2xl p-4 border border-white/80 space-y-3 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-800 block">
                        Passport Bio-Page
                      </span>
                      <span className="text-[9px] font-bold text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded">Required</span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <button
                        type="button"
                        onClick={() => passportInputRef.current?.click()}
                        disabled={isUploading === 'Passport Bio-Page'}
                        className="py-1.5 px-3.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-xs rounded-xl transition shadow-xs flex items-center space-x-1.5 cursor-pointer active:scale-95"
                      >
                        {isUploading === 'Passport Bio-Page' ? (
                          <RefreshCw className="w-3.5 h-3.5 text-[#036CFB] animate-spin" />
                        ) : (
                          <FileText className="w-3.5 h-3.5 text-[#036CFB]" />
                        )}
                        <span>{uploadedDocs['Passport Bio-Page'] ? 'Change File' : 'Choose File'}</span>
                      </button>

                      {uploadedDocs['Passport Bio-Page'] && (
                        <button
                          type="button"
                          onClick={() => handleRemoveDoc('Passport Bio-Page')}
                          className="p-1 rounded-lg text-slate-400 hover:text-rose-500 transition"
                          title="Remove"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {uploadedDocs['Passport Bio-Page'] && (
                      <div className="p-2 rounded-xl bg-emerald-50/90 border border-emerald-200/80 text-[11px] text-emerald-700 flex items-center justify-between">
                        <span className="truncate font-semibold max-w-[120px]">
                          ✓ {uploadedDocs['Passport Bio-Page'].name}
                        </span>
                        <span className="text-[10px] text-slate-400 shrink-0 ml-1">
                          {uploadedDocs['Passport Bio-Page'].size}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Slot 2: Recent Photograph */}
                  <div className="glass-frost-subtle rounded-2xl p-4 border border-white/80 space-y-3 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-800 block">
                        Recent Photograph
                      </span>
                      <span className="text-[9px] font-bold text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded">Required</span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <button
                        type="button"
                        onClick={() => photoInputRef.current?.click()}
                        disabled={isUploading === 'Recent Photograph'}
                        className="py-1.5 px-3.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-xs rounded-xl transition shadow-xs flex items-center space-x-1.5 cursor-pointer active:scale-95"
                      >
                        {isUploading === 'Recent Photograph' ? (
                          <RefreshCw className="w-3.5 h-3.5 text-[#036CFB] animate-spin" />
                        ) : (
                          <FileText className="w-3.5 h-3.5 text-[#036CFB]" />
                        )}
                        <span>{uploadedDocs['Recent Photograph'] ? 'Change Photo' : 'Choose Photo'}</span>
                      </button>

                      {uploadedDocs['Recent Photograph'] && (
                        <button
                          type="button"
                          onClick={() => handleRemoveDoc('Recent Photograph')}
                          className="p-1 rounded-lg text-slate-400 hover:text-rose-500 transition"
                          title="Remove"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {uploadedDocs['Recent Photograph'] && (
                      <div className="p-2 rounded-xl bg-emerald-50/90 border border-emerald-200/80 text-[11px] text-emerald-700 flex items-center justify-between">
                        <span className="truncate font-semibold max-w-[120px]">
                          ✓ {uploadedDocs['Recent Photograph'].name}
                        </span>
                        <span className="text-[10px] text-slate-400 shrink-0 ml-1">
                          {uploadedDocs['Recent Photograph'].size}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Slot 3: Bank Statements */}
                  <div className="glass-frost-subtle rounded-2xl p-4 border border-white/80 space-y-3 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-800 block">
                        Bank Statements
                      </span>
                      <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">Past 3 Mos</span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <button
                        type="button"
                        onClick={() => bankInputRef.current?.click()}
                        disabled={isUploading === 'Bank Statements'}
                        className="py-1.5 px-3.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-xs rounded-xl transition shadow-xs flex items-center space-x-1.5 cursor-pointer active:scale-95"
                      >
                        {isUploading === 'Bank Statements' ? (
                          <RefreshCw className="w-3.5 h-3.5 text-[#036CFB] animate-spin" />
                        ) : (
                          <FileText className="w-3.5 h-3.5 text-[#036CFB]" />
                        )}
                        <span>{uploadedDocs['Bank Statements'] ? 'Change File' : 'Choose File'}</span>
                      </button>

                      {uploadedDocs['Bank Statements'] && (
                        <button
                          type="button"
                          onClick={() => handleRemoveDoc('Bank Statements')}
                          className="p-1 rounded-lg text-slate-400 hover:text-rose-500 transition"
                          title="Remove"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {uploadedDocs['Bank Statements'] && (
                      <div className="p-2 rounded-xl bg-emerald-50/90 border border-emerald-200/80 text-[11px] text-emerald-700 flex items-center justify-between">
                        <span className="truncate font-semibold max-w-[120px]">
                          ✓ {uploadedDocs['Bank Statements'].name}
                        </span>
                        <span className="text-[10px] text-slate-400 shrink-0 ml-1">
                          {uploadedDocs['Bank Statements'].size}
                        </span>
                      </div>
                    )}
                  </div>

                </div>

              </div>
            )}

            {/* Step 4: Review & Submit */}
            {wizardStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display font-bold text-xl text-[#062544]">
                    Review Application
                  </h2>
                  <p className="text-xs text-slate-500">Verify all information before confirming submission.</p>
                </div>

                <div className="glass-frost-subtle p-5 rounded-2xl border border-white/90 space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-slate-400 block text-[10px] font-bold uppercase">Applicant Name</span>
                      <span className="font-bold text-slate-800 text-sm">{wizardData.applicantName}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] font-bold uppercase">Passport Number</span>
                      <span className="font-mono font-bold text-slate-800 text-sm">{wizardData.passportNumber}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] font-bold uppercase">Destination</span>
                      <span className="font-bold text-slate-800 text-sm">{wizardData.destination}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] font-bold uppercase">Service Mode</span>
                      <span className="font-bold text-[#036CFB] flex items-center gap-1 mt-0.5">
                        <Check className="w-4 h-4 text-[#036CFB]" /> Digital Application
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50/90 border border-blue-200/80 text-xs text-blue-950 flex items-start space-x-3 backdrop-blur-md">
                  <ShieldCheck className="w-5 h-5 text-[#036CFB] shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    By submitting, you confirm that all attached documents are authentic and match official specifications.
                  </p>
                </div>
              </div>
            )}

            {/* Action Bar */}
            <div className="pt-6 border-t border-slate-200/60 flex flex-col-reverse xs:flex-row items-stretch xs:items-center justify-between gap-3">
              {wizardStep > 1 ? (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-5 py-2.5 bg-white hover:bg-slate-100 active:scale-95 text-slate-700 font-bold text-xs rounded-full border border-slate-200 transition flex items-center justify-center space-x-1.5 shadow-xs min-h-[44px]"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setCurrentView('visa-finder')}
                  className="px-5 py-2.5 bg-white hover:bg-slate-100 active:scale-95 text-slate-700 font-bold text-xs rounded-full border border-slate-200 transition shadow-xs min-h-[44px] flex items-center justify-center"
                >
                  Save as Draft
                </button>
              )}

              <button
                type="button"
                onClick={handleNext}
                className="px-8 py-2.5 bg-gradient-to-r from-[#036CFB] to-[#0284C7] hover:from-[#0256c7] hover:to-[#036CFB] active:scale-98 text-white font-display font-bold text-xs tracking-wide rounded-full shadow-lg shadow-[#036CFB]/30 transition flex items-center justify-center space-x-2 min-h-[44px]"
              >
                <span>{wizardStep === 4 ? 'Submit Application' : 'Save & Next'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Help & Support Right Widget */}
          <div className="glass-frost-navy rounded-3xl p-6 border border-white/15 text-white shadow-xl space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-28 h-28 bg-[#036CFB]/30 rounded-full blur-2xl pointer-events-none"></div>
            
            <div className="relative z-10 space-y-4">
              <h3 className="font-display font-bold text-white text-base">
                Help & Support
              </h3>
              
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#036CFB] to-[#38BDF8] text-white flex items-center justify-center shadow-md shadow-[#036CFB]/25">
                <MessageSquare className="w-6 h-6" />
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Having trouble uploading documents or completing information? Our specialist agents are available to assist.
              </p>

              <div className="pt-2 border-t border-white/10">
                <p className="text-[10px] text-[#38BDF8] font-bold uppercase tracking-wider">Online Support Helpline</p>
                <a href="tel:+919941900055" className="text-sm font-extrabold text-white flex items-center space-x-1.5 mt-1 hover:text-[#38BDF8] transition-colors">
                  <Phone className="w-4 h-4 text-[#38BDF8]" />
                  <span>+91 99419 00055</span>
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
