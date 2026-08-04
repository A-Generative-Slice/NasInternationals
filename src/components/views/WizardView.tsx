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
    <div className="bg-[#EBF3FF]/60 min-h-[calc(100vh-5rem)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Top Stepper Progress Bar */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
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
                  wizardStep >= 1 ? 'bg-[#036CFB] text-white shadow-md' : 'bg-slate-100 text-slate-400'
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
                  wizardStep >= 2 ? 'bg-[#036CFB] text-white shadow-md' : 'bg-slate-100 text-slate-400'
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
                  wizardStep >= 3 ? 'bg-[#036CFB] text-white shadow-md' : 'bg-slate-100 text-slate-400'
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
                  wizardStep === 4 ? 'bg-[#036CFB] text-white shadow-md' : 'bg-slate-100 text-slate-400'
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
          <div className="lg:col-span-3 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
            
            {/* Step 1: Personal Details */}
            {wizardStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display font-bold text-xl text-[#0B1E3D]">
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
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs focus:ring-2 focus:ring-[#036CFB]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Passport Number</label>
                    <input
                      type="text"
                      value={wizardData.passportNumber || ''}
                      onChange={(e) => updateWizardData({ passportNumber: e.target.value })}
                      placeholder="e.g. Z8923412"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-mono focus:ring-2 focus:ring-[#036CFB]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={wizardData.email || ''}
                      onChange={(e) => updateWizardData({ email: e.target.value })}
                      placeholder="e.g. rahul.sharma@example.com"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs focus:ring-2 focus:ring-[#036CFB]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={wizardData.phone || ''}
                      onChange={(e) => updateWizardData({ phone: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs focus:ring-2 focus:ring-[#036CFB]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Travel Info */}
            {wizardStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display font-bold text-xl text-[#0B1E3D]">
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
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs focus:ring-2 focus:ring-[#036CFB]"
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
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs focus:ring-2 focus:ring-[#036CFB]"
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
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs focus:ring-2 focus:ring-[#036CFB]"
                    >
                      {PURPOSES_LIST.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Document Upload (Matching Screen 5) */}
            {wizardStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display font-bold text-xl text-[#0B1E3D]">
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
                  className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${
                    dragActive ? 'border-[#036CFB] bg-blue-50/50' : 'border-slate-300 hover:border-slate-400 bg-slate-50/50'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-blue-100/80 text-[#036CFB] flex items-center justify-center mx-auto mb-3">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <p className="font-bold text-slate-800 text-sm">
                    Drag & drop your documents here
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    or <span className="text-[#036CFB] underline font-semibold">Browse</span> files from your device
                  </p>
                  <p className="text-[10px] text-slate-400 mt-2">
                    Supported formats: PDF, JPG, PNG (Max 10MB per file)
                  </p>
                </div>

                {/* Document Slots */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Slot 1: Passport Bio-Page */}
                  <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-3">
                    <span className="font-bold text-xs text-slate-800 block">
                      Passport Bio-Page
                    </span>
                    <div className="flex items-center justify-between pt-1">
                      <button
                        onClick={() => handleFileUpload('Passport Bio-Page')}
                        className="py-1.5 px-3 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-bold text-xs rounded-lg transition"
                      >
                        File Upload
                      </button>
                      <div className="w-7 h-7 rounded-lg bg-blue-100 text-[#036CFB] flex items-center justify-center">
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
                  <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-3">
                    <span className="font-bold text-xs text-slate-800 block">
                      Recent Photograph
                    </span>
                    <div className="flex items-center justify-between pt-1">
                      <button
                        onClick={() => handleFileUpload('Recent Photograph')}
                        className="py-1.5 px-3 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-bold text-xs rounded-lg transition"
                      >
                        File Upload
                      </button>
                      <div className="w-7 h-7 rounded-lg bg-blue-100 text-[#036CFB] flex items-center justify-center">
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
                  <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-3">
                    <span className="font-bold text-xs text-slate-800 block">
                      Bank Statements (Last 3 Months)
                    </span>
                    <div className="flex items-center justify-between pt-1">
                      <button
                        onClick={() => handleFileUpload('Bank Statements (Last 3 Months)')}
                        className="py-1.5 px-3 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-bold text-xs rounded-lg transition"
                      >
                        File Upload
                      </button>
                      <div className="w-7 h-7 rounded-lg bg-blue-100 text-[#036CFB] flex items-center justify-center">
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
                  <h2 className="font-display font-bold text-xl text-[#0B1E3D]">
                    Step 4: Review & Submit Application
                  </h2>
                  <p className="text-xs text-slate-500">Verify all information before confirming submission.</p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Applicant Name</span>
                      <span className="font-bold text-slate-800">{wizardData.applicantName}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Passport Number</span>
                      <span className="font-mono font-bold text-slate-800">{wizardData.passportNumber}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Destination</span>
                      <span className="font-bold text-slate-800">{wizardData.destination}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Processing Fee</span>
                      <span className="font-bold text-[#0B1E3D]">₹{selectedVisa ? selectedVisa.priceInINR.toLocaleString('en-IN') : '5,000'}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 text-xs text-blue-900 flex items-start space-x-3">
                  <ShieldCheck className="w-5 h-5 text-[#036CFB] shrink-0" />
                  <p>
                    By submitting, you confirm that all attached documents are authentic and match government specifications.
                  </p>
                </div>
              </div>
            )}

            {/* Action Bar */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              {wizardStep > 1 ? (
                <button
                  onClick={handlePrev}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition flex items-center space-x-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
              ) : (
                <button
                  onClick={() => setCurrentView('visa-finder')}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
                >
                  Save as Draft
                </button>
              )}

              <button
                onClick={handleNext}
                className="px-8 py-2.5 bg-[#036CFB] hover:bg-[#0B1E3D] text-white font-display font-bold text-xs tracking-wide rounded-xl shadow-md transition flex items-center space-x-2"
              >
                <span>{wizardStep === 4 ? 'Submit Application' : 'Save & Next'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Help & Support Right Widget (Matching Screen 5) */}
          <div className="bg-blue-50/80 rounded-2xl p-5 border border-blue-100 shadow-sm space-y-4">
            <h3 className="font-display font-bold text-[#0B1E3D] text-base">
              Help & Support
            </h3>
            
            <div className="w-10 h-10 rounded-full bg-blue-100 text-[#036CFB] flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Having trouble uploading documents or filling out details? Our support agents are here to assist.
            </p>

            <div className="pt-2 border-t border-blue-200/60">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Direct Phone Support</p>
              <a href="tel:+9019740030" className="text-sm font-extrabold text-[#0B1E3D] flex items-center space-x-1 mt-0.5">
                <Phone className="w-4 h-4 text-[#036CFB]" />
                <span>+901-974-0030</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
