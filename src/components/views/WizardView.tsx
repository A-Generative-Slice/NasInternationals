import React, { useState } from 'react';
import { UploadCloud, CheckCircle2, Phone, MessageSquare, ArrowRight, ArrowLeft, FileText, Check, ShieldCheck, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { COUNTRIES_LIST, NATIONALITIES_LIST, PURPOSES_LIST } from '../../data/mockData';

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
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: string }>({
    'Passport Bio-Page': 'passport_rahul_bio.pdf',
    'Recent Photograph': 'photo_35x45mm.jpg',
    'Bank Statements (Last 3 Months)': 'bank_statement_h1.pdf'
  });

  const handleFileUpload = (docTitle: string) => {
    const fakeNames: { [key: string]: string } = {
      'Passport Bio-Page': 'scanned_passport_page1.pdf',
      'Recent Photograph': 'applicant_photo_studio.jpg',
      'Bank Statements (Last 3 Months)': 'bank_statement_6months.pdf'
    };
    setUploadedFiles(prev => ({
      ...prev,
      [docTitle]: fakeNames[docTitle] || 'uploaded_doc.pdf'
    }));
  };

  const handleNext = () => {
    if (wizardStep < 4) {
      setWizardStep(wizardStep + 1);
    } else {
      // Step 4 Submit
      const newApp = submitWizardApplication();
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
    <div className="bg-[#F8FAFC] min-h-[calc(100vh-5rem)] py-5 xs:py-6 sm:py-8 px-3 xs:px-4 sm:px-6 lg:px-8 relative overflow-hidden pb-28 lg:pb-16">
      {/* Ambient background glow blobs for frosted glass reflections */}
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
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                  wizardStep >= 1 ? 'bg-[#036CFB] text-white shadow-md shadow-[#036CFB]/30' : 'bg-slate-100 text-slate-400'
                }`}
              >
                1
              </div>
              <span className="text-xs font-semibold text-slate-800 hidden sm:inline">1. Personal Details</span>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 flex flex-col items-center space-y-1">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                  wizardStep >= 2 ? 'bg-[#036CFB] text-white shadow-md shadow-[#036CFB]/30' : 'bg-slate-100 text-slate-400'
                }`}
              >
                2
              </div>
              <span className="text-xs font-semibold text-slate-800 hidden sm:inline">2. Travel Info</span>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 flex flex-col items-center space-y-1">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                  wizardStep >= 3 ? 'bg-[#036CFB] text-white shadow-md shadow-[#036CFB]/30' : 'bg-slate-100 text-slate-400'
                }`}
              >
                3
              </div>
              <span className="text-xs font-bold text-[#036CFB] hidden sm:inline">3. Document Upload</span>
            </div>

            {/* Step 4 */}
            <div className="relative z-10 flex flex-col items-center space-y-1">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                  wizardStep === 4 ? 'bg-[#036CFB] text-white shadow-md shadow-[#036CFB]/30' : 'bg-slate-100 text-slate-400'
                }`}
              >
                4
              </div>
              <span className="text-xs font-semibold text-slate-800 hidden sm:inline">4. Review & Submit</span>
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
                    Step 1: Personal Details
                  </h2>
                  <p className="text-xs text-slate-500">Provide your full legal name and contact details matching your passport.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name (as in Passport)</label>
                    <input
                      type="text"
                      value={wizardData.applicantName || ''}
                      onChange={(e) => updateWizardData({ applicantName: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-white/90 border border-slate-200 rounded-2xl p-3 sm:p-3.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#036CFB] focus:ring-2 focus:ring-[#036CFB]/20 min-h-[44px] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Passport Number</label>
                    <input
                      type="text"
                      value={wizardData.passportNumber || ''}
                      onChange={(e) => updateWizardData({ passportNumber: e.target.value })}
                      placeholder="e.g. Z8923412"
                      className="w-full bg-white/90 border border-slate-200 rounded-2xl p-3 sm:p-3.5 text-xs font-mono font-semibold text-slate-800 focus:outline-none focus:border-[#036CFB] focus:ring-2 focus:ring-[#036CFB]/20 min-h-[44px] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={wizardData.email || ''}
                      onChange={(e) => updateWizardData({ email: e.target.value })}
                      placeholder="e.g. rahul.sharma@example.com"
                      className="w-full bg-white/90 border border-slate-200 rounded-2xl p-3 sm:p-3.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#036CFB] focus:ring-2 focus:ring-[#036CFB]/20 min-h-[44px] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={wizardData.phone || ''}
                      onChange={(e) => updateWizardData({ phone: e.target.value })}
                      placeholder="e.g. +91 99419 00055"
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
                    Step 2: Travel Info
                  </h2>
                  <p className="text-xs text-slate-500">Select destination, nationality, and visa purpose.</p>
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
                    Step 3: Document Upload
                  </h2>
                  <p className="text-xs text-slate-500">Upload high-resolution scans of your supporting documents.</p>
                </div>

                {/* Drag & Drop Main Box */}
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragActive(false);
                    handleFileUpload('Passport Bio-Page');
                  }}
                  className={`border-2 border-dashed rounded-3xl p-8 text-center transition-all cursor-pointer ${
                    dragActive ? 'border-[#036CFB] bg-blue-50/70 shadow-lg' : 'border-blue-200/80 hover:border-[#036CFB] bg-white/60 shadow-xs'
                  }`}
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#036CFB] to-[#38BDF8] text-white flex items-center justify-center mx-auto mb-3 shadow-md shadow-[#036CFB]/25">
                    <UploadCloud className="w-7 h-7" />
                  </div>
                  <p className="font-bold text-slate-800 text-sm">
                    Drag & drop your documents here
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    or <span className="text-[#036CFB] underline font-bold">Browse</span> files from your device
                  </p>
                  <p className="text-[10px] text-slate-400 mt-2 font-medium">
                    Supported formats: PDF, JPG, PNG (Max 10MB per file) • 100% Encrypted
                  </p>
                </div>

                {/* Document Slots */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Slot 1: Passport Bio-Page */}
                  <div className="glass-frost-subtle rounded-2xl p-4 border border-white/80 space-y-3 shadow-xs">
                    <span className="font-bold text-xs text-slate-800 block">
                      Passport Bio-Page
                    </span>
                    <div className="flex items-center justify-between pt-1">
                      <button
                        onClick={() => handleFileUpload('Passport Bio-Page')}
                        className="py-1.5 px-3.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-xs rounded-xl transition shadow-xs"
                      >
                        File Upload
                      </button>
                      <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#036CFB] flex items-center justify-center">
                        <FileText className="w-4 h-4" />
                      </div>
                    </div>
                    {uploadedFiles['Passport Bio-Page'] && (
                      <p className="text-[10px] text-emerald-600 font-semibold truncate">
                        ✓ {uploadedFiles['Passport Bio-Page']}
                      </p>
                    )}
                  </div>

                  {/* Slot 2: Recent Photograph */}
                  <div className="glass-frost-subtle rounded-2xl p-4 border border-white/80 space-y-3 shadow-xs">
                    <span className="font-bold text-xs text-slate-800 block">
                      Recent Photograph
                    </span>
                    <div className="flex items-center justify-between pt-1">
                      <button
                        onClick={() => handleFileUpload('Recent Photograph')}
                        className="py-1.5 px-3.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-xs rounded-xl transition shadow-xs"
                      >
                        File Upload
                      </button>
                      <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#036CFB] flex items-center justify-center">
                        <FileText className="w-4 h-4" />
                      </div>
                    </div>
                    {uploadedFiles['Recent Photograph'] && (
                      <p className="text-[10px] text-emerald-600 font-semibold truncate">
                        ✓ {uploadedFiles['Recent Photograph']}
                      </p>
                    )}
                  </div>

                  {/* Slot 3: Bank Statements */}
                  <div className="glass-frost-subtle rounded-2xl p-4 border border-white/80 space-y-3 shadow-xs">
                    <span className="font-bold text-xs text-slate-800 block">
                      Bank Statements
                    </span>
                    <div className="flex items-center justify-between pt-1">
                      <button
                        onClick={() => handleFileUpload('Bank Statements (Last 3 Months)')}
                        className="py-1.5 px-3.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-xs rounded-xl transition shadow-xs"
                      >
                        File Upload
                      </button>
                      <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#036CFB] flex items-center justify-center">
                        <FileText className="w-4 h-4" />
                      </div>
                    </div>
                    {uploadedFiles['Bank Statements (Last 3 Months)'] && (
                      <p className="text-[10px] text-emerald-600 font-semibold truncate">
                        ✓ {uploadedFiles['Bank Statements (Last 3 Months)']}
                      </p>
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
                    Step 4: Review & Submit Application
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
                      <span className="text-slate-400 block text-[10px] font-bold uppercase">Application Mode</span>
                      <span className="font-bold text-[#036CFB] flex items-center gap-1 mt-0.5">
                        <Check className="w-4 h-4 text-[#036CFB]" /> 100% Online Digital
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50/90 border border-blue-200/80 text-xs text-blue-950 flex items-start space-x-3 backdrop-blur-md">
                  <ShieldCheck className="w-5 h-5 text-[#036CFB] shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    By submitting, you confirm that all attached documents are authentic and match government specifications.
                  </p>
                </div>
              </div>
            )}

            {/* Action Bar */}
            <div className="pt-6 border-t border-slate-200/60 flex flex-col-reverse xs:flex-row items-stretch xs:items-center justify-between gap-3">
              {wizardStep > 1 ? (
                <button
                  onClick={handlePrev}
                  className="px-5 py-2.5 bg-white hover:bg-slate-100 active:scale-95 text-slate-700 font-bold text-xs rounded-full border border-slate-200 transition flex items-center justify-center space-x-1.5 shadow-xs min-h-[44px]"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
              ) : (
                <button
                  onClick={() => setCurrentView('visa-finder')}
                  className="px-5 py-2.5 bg-white hover:bg-slate-100 active:scale-95 text-slate-700 font-bold text-xs rounded-full border border-slate-200 transition shadow-xs min-h-[44px] flex items-center justify-center"
                >
                  Save as Draft
                </button>
              )}

              <button
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
                Having trouble uploading documents or filling out details? Our support agents are here to assist.
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
