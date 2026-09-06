import React, { useState } from 'react';
import { 
  Search, 
  Upload, 
  Shield, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Lock, 
  Plane, 
  FileText, 
  Download, 
  Phone, 
  Mail, 
  Check, 
  Sparkles,
  ExternalLink,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';

export const PaymentTrackerView: React.FC = () => {
  const { activeApplication, submitPaymentProof, applications, setActiveTrackerAppId } = useApp();

  const app = activeApplication || applications[0];
  const payment = app.payment;

  const [searchInput, setSearchInput] = useState('');
  const [searchError, setSearchError] = useState('');
  const [searchSuccess, setSearchSuccess] = useState('');

  const [transactionId, setTransactionId] = useState(payment?.transactionId || '');
  const [proofFileName, setProofFileName] = useState(payment?.proofFileName || '');
  const [isSubmitted, setIsSubmitted] = useState(payment?.isVerified || false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    const query = searchInput.trim().toLowerCase();
    const found = applications.find(
      (a) =>
        a.id.toLowerCase() === query ||
        a.passportNumber?.toLowerCase() === query ||
        a.payment?.bookingId?.toLowerCase() === query
    );

    if (found) {
      setActiveTrackerAppId(found.id);
      setSearchError('');
      setSearchSuccess(`Live record verified for ${found.id} (${found.destination} - ${found.visaType})`);
    } else {
      setSearchSuccess('');
      setSearchError(`No record found matching "${searchInput}". Please check your booking reference or passport number.`);
    }
  };

  const handleQuickSelect = (id: string) => {
    setActiveTrackerAppId(id);
    setSearchError('');
    setSearchSuccess(`Switched to application ${id}`);
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transactionId) return;
    submitPaymentProof(app.id, transactionId, proofFileName || 'payment_receipt.pdf');
    setIsSubmitted(true);
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  const handleDownloadVisa = () => {
    setDownloadSuccess(true);
    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.6 }
    });
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  const isApproved = app.status === 'Approved' || app.status === 'Completed';

  return (
    <div className="bg-[#F8FAFC] min-h-[calc(100vh-5rem)] py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden pb-24 lg:pb-16">
      {/* Ambient background glow blobs for frosted glass reflections */}
      <div className="ambient-glow-blue top-12 left-1/4 -translate-x-1/2 opacity-30"></div>
      <div className="ambient-glow-sky top-80 right-10 opacity-25"></div>
      <div className="ambient-glow-blue bottom-32 left-10 opacity-20"></div>

      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        
        {/* Page Title & Real-Time Tracking Header */}
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-pill text-[#036CFB] text-xs font-bold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#036CFB] animate-ping"></span>
            <span>100% Online Real-Time Application Tracking</span>
          </div>
          <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-[#062544] tracking-tight">
            Digital Payment & <span className="blue-gradient-text">Status Tracker</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xl">
            Track your official visa dossier, verify electronic payment confirmation, and download your approved e-visa documents instantly.
          </p>
        </div>

        {/* Live Search Bar for Reference / Passport No */}
        <div className="glass-frost rounded-3xl p-5 sm:p-6 shadow-xl border border-white/80 backdrop-blur-2xl space-y-3">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <label htmlFor="tracker-search-input" className="sr-only">
                Application Reference or Passport Number
              </label>
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4 text-[#036CFB]" />
              </div>
              <input
                id="tracker-search-input"
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter Application Ref (e.g. NAS-101) or Passport No (e.g. Z8923412)..."
                className="w-full bg-white/90 border border-slate-200/90 rounded-2xl pl-11 pr-4 py-3 text-xs sm:text-sm focus:ring-2 focus:ring-[#036CFB]/30 font-medium min-h-[46px] shadow-inner focus-ring"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#036CFB] to-[#0284C7] hover:from-[#0284C7] hover:to-[#036CFB] text-white font-display font-bold text-xs sm:text-sm rounded-2xl shadow-lg shadow-[#036CFB]/30 border border-white/20 transition-all flex items-center justify-center space-x-2 shrink-0 cursor-pointer min-h-[46px] active:scale-95 focus-ring"
            >
              <span>Track Application</span>
              <Plane className="w-4 h-4 transform -rotate-45" />
            </button>
          </form>

          {/* Search feedback messages */}
          {searchSuccess && (
            <p className="text-xs text-emerald-600 font-bold flex items-center space-x-1.5 pl-1 animate-fadeIn">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>{searchSuccess}</span>
            </p>
          )}
          {searchError && (
            <p className="text-xs text-rose-600 font-semibold flex items-center space-x-1.5 pl-1 animate-fadeIn">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{searchError}</span>
            </p>
          )}

          {/* Quick Demo Reference Suggestions */}
          <div className="pt-1 flex items-center space-x-2 text-xs text-slate-500 overflow-x-auto no-scrollbar">
            <span className="font-semibold shrink-0 text-slate-600">Quick Track:</span>
            {applications.slice(0, 3).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleQuickSelect(item.id)}
                className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold transition whitespace-nowrap border cursor-pointer ${
                  item.id === app.id
                    ? 'bg-[#036CFB] text-white border-[#036CFB] shadow-xs'
                    : 'bg-white/80 hover:bg-white text-slate-600 border-slate-200'
                }`}
              >
                {item.id} • {item.destination}
              </button>
            ))}
          </div>
        </div>

        {/* Live Application Details Card */}
        <div className="glass-frost rounded-3xl p-6 sm:p-8 shadow-xl border border-white/80 backdrop-blur-2xl space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/60">
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-mono text-xs font-black text-[#036CFB] bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
                  {app.id}
                </span>
                <span className="text-xs text-slate-500 font-semibold">Ref: {payment?.bookingId || 'NAS-987654321'}</span>
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-black text-[#062544] mt-1">
                {app.destination} • {app.visaType}
              </h2>
            </div>

            <div className="flex items-center space-x-2">
              <div className={`px-3.5 py-1.5 rounded-full text-xs font-black flex items-center space-x-1.5 shadow-xs border ${
                isApproved 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-blue-50 text-[#036CFB] border-blue-200'
              }`}>
                <span className={`w-2 h-2 rounded-full ${isApproved ? 'bg-emerald-500' : 'bg-[#036CFB] animate-pulse'}`}></span>
                <span className="uppercase tracking-wider">Status: {app.status}</span>
              </div>
            </div>
          </div>

          {/* Details 4-Column Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-3 bg-white/70 rounded-2xl border border-slate-200/80 space-y-1">
              <span className="text-slate-500 font-semibold block">Passport No</span>
              <span className="font-mono font-bold text-[#062544]">{app.passportNumber || 'Z8923412'}</span>
            </div>

            <div className="p-3 bg-white/70 rounded-2xl border border-slate-200/80 space-y-1">
              <span className="text-slate-500 font-semibold block">Submission Date</span>
              <span className="font-bold text-[#062544]">{app.submissionDate || '10 Oct 2024'}</span>
            </div>

            <div className="p-3 bg-white/70 rounded-2xl border border-slate-200/80 space-y-1">
              <span className="text-slate-500 font-semibold block">Service Mode</span>
              <span className="font-bold text-[#036CFB]">100% Online Digital</span>
            </div>

            <div className="p-3 bg-white/70 rounded-2xl border border-slate-200/80 space-y-1">
              <span className="text-slate-500 font-semibold block">Estimated Turnaround</span>
              <span className="font-bold text-[#062544]">{app.processingTime || '2-4 Business Days'}</span>
            </div>
          </div>

          {/* If Approved: Instant E-Visa Download Card */}
          {isApproved && (
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-blue-500/10 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3 text-center sm:text-left">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-sm text-[#062544] flex items-center space-x-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Congratulations! Your E-Visa is Approved</span>
                  </h4>
                  <p className="text-xs text-slate-600 font-medium">
                    Your official consular electronic visa document has been issued and digitally signed.
                  </p>
                </div>
              </div>

              <button
                onClick={handleDownloadVisa}
                className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center justify-center space-x-2 shrink-0 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{downloadSuccess ? 'Downloaded E-Visa PDF!' : 'Download Official E-Visa (PDF)'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Top 2 Boxes Grid: Secure Digital Payment Info & Upload Payment Proof */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          
          {/* Box 1: Secure Payment Information (Strictly Online, Zero Fees Displayed) */}
          <div className="glass-frost rounded-3xl p-6 shadow-xl border border-white/80 space-y-4 flex flex-col justify-between backdrop-blur-2xl">
            <h3 className="font-display font-bold text-[#062544] text-base flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#036CFB]"></span>
              <span>Online Payment Details</span>
            </h3>

            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
              {/* Scan to Pay QR Code */}
              <div className="w-32 h-32 bg-white border border-slate-200/80 p-2 rounded-2xl flex items-center justify-center shrink-0 shadow-md">
                <img
                  src={payment?.upiQrCodeUrl || 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=nastravels@hdfcbank&pn=NAS%20Travels'}
                  alt="UPI Payment QR Code"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Bank Details */}
              <div className="space-y-1 text-xs text-center sm:text-left">
                <p className="font-bold text-slate-800 text-sm">Scan to Pay (UPI)</p>
                <div className="text-slate-600 space-y-0.5 pt-1">
                  <p><span className="font-semibold text-slate-700">Official Account:</span></p>
                  <p className="font-medium text-slate-800">{payment?.bankName || 'HDFC Bank'}</p>
                  <p>NAS Travels Pvt Ltd</p>
                  <p>Account No: <span className="font-mono font-bold text-slate-800">{payment?.accountNumber || '1234567890'}</span></p>
                  <p>IFSC: <span className="font-mono font-bold text-slate-800">{payment?.ifscCode || 'HDFC0001234'}</span></p>
                  <p className="text-[#036CFB] font-bold pt-1">Service Mode: 100% Online Verification</p>
                </div>
              </div>
            </div>
          </div>

          {/* Box 2: Upload Payment Proof */}
          <div className="glass-frost rounded-3xl p-6 shadow-xl border border-white/80 space-y-4 flex flex-col justify-between backdrop-blur-2xl">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-[#062544] text-base flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#036CFB]"></span>
                <span>Submit Digital Proof</span>
              </h3>
              <label className="cursor-pointer py-1.5 px-3 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 flex items-center space-x-1.5 shadow-xs">
                <Upload className="w-3.5 h-3.5 text-[#036CFB]" />
                <span>Choose File</span>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setProofFileName(e.target.files[0].name);
                    }
                  }}
                />
              </label>
            </div>

            <form onSubmit={handleSubmitPayment} className="space-y-3">
              <div>
                <label htmlFor="transaction-id-input" className="sr-only">
                  Transaction ID or UTR Number
                </label>
                <input
                  id="transaction-id-input"
                  type="text"
                  placeholder="Transaction ID / UTR Number"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  required
                  className="w-full bg-white/90 border border-slate-200/90 rounded-2xl px-4 py-3 text-xs focus:ring-2 focus:ring-[#036CFB]/20 font-mono font-bold min-h-[44px] focus-ring"
                />
                {proofFileName && (
                  <p className="text-[11px] text-emerald-600 font-semibold mt-1.5 pl-1 flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Attached file: {proofFileName}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-[#036CFB] to-[#0284C7] hover:from-[#0256c7] hover:to-[#036CFB] text-white font-display font-bold text-xs tracking-wide rounded-2xl shadow-lg shadow-[#036CFB]/30 transition min-h-[44px] cursor-pointer"
              >
                {isSubmitted ? 'Update Payment Verification' : 'Confirm & Submit Proof'}
              </button>
            </form>

            {/* Badges Row */}
            <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-500 font-semibold">
              <div className="flex items-center space-x-1">
                <Lock className="w-3.5 h-3.5 text-[#036CFB]" />
                <span>256-bit SSL Secure</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Instant Verification</span>
              </div>
              <div className="flex items-center space-x-1">
                <Shield className="w-3.5 h-3.5 text-[#036CFB]" />
                <span>Data Privacy</span>
              </div>
            </div>
          </div>

        </div>

        {/* Application Progress Timeline */}
        <div className="glass-frost rounded-3xl p-6 sm:p-8 shadow-xl border border-white/80 space-y-6 backdrop-blur-2xl">
          <h2 className="font-display font-bold text-[#062544] text-lg text-center">
            Consular Application Progress Timeline
          </h2>

          <div className="max-w-md mx-auto space-y-6 relative pl-6 border-l-2 border-blue-200/80 ml-4 sm:ml-auto">
            
            {/* Step 1: Submitted */}
            <div className="relative space-y-1">
              <div className="absolute -left-[31px] top-0 w-8 h-8 rounded-full bg-[#062544] text-white flex items-center justify-center shadow-md shadow-[#062544]/25">
                <CheckCircle2 className="w-5 h-5 text-[#38BDF8]" />
              </div>
              <p className="font-bold text-slate-800 text-sm">
                Submitted <span className="text-slate-400 font-normal text-xs">- {app.submissionDate || '10 Oct 2024'}</span>
              </p>
              <p className="text-xs text-slate-500 font-medium">Initial visa dossier and digital bio-data registered.</p>
            </div>

            {/* Step 2: Under Review */}
            <div className="relative space-y-1 pt-2">
              <div className={`absolute -left-[31px] top-2 w-8 h-8 rounded-full flex items-center justify-center shadow-md ${
                app.status !== 'Submitted' ? 'bg-[#062544] text-white shadow-[#062544]/25' : 'bg-slate-200 text-slate-400'
              }`}>
                <Clock className="w-5 h-5 text-[#38BDF8]" />
              </div>
              <p className="font-bold text-slate-800 text-sm">
                Under Review <span className="text-slate-400 font-normal text-xs">- Document Attestation</span>
              </p>
              <p className="text-xs text-slate-500 font-medium">Internal digital verification and checklist review completed.</p>
            </div>

            {/* Step 3: Processing */}
            <div className="relative space-y-1 pt-2">
              <div className={`absolute -left-[31px] top-2 w-8 h-8 rounded-full flex items-center justify-center shadow-md ${
                app.status === 'Processing' || app.status === 'In Process' || isApproved
                  ? 'bg-[#062544] text-white shadow-[#062544]/25'
                  : 'bg-slate-200 text-slate-400'
              }`}>
                <ShieldCheck className="w-5 h-5 text-[#036CFB]" />
              </div>
              <p className="font-bold text-slate-800 text-sm">
                Processing <span className="text-slate-400 font-normal text-xs">- Embassy / Consulate Clearance</span>
              </p>
              <p className="text-xs text-slate-500 font-medium">Consular e-visa clearance and background security checks in progress.</p>
            </div>

            {/* Step 4: Visa Approved */}
            <div className="relative pt-2">
              <div className={`absolute -left-[31px] top-2 w-8 h-8 rounded-full flex items-center justify-center shadow-md ${
                isApproved
                  ? 'bg-[#036CFB] text-white shadow-md shadow-[#036CFB]/30'
                  : 'bg-slate-200 text-slate-400'
              }`}>
                <CheckCircle2 className="w-5 h-5" />
              </div>

              {/* Highlight Box */}
              <div className={`p-4 rounded-2xl border flex items-center justify-between ${
                isApproved
                  ? 'bg-blue-50/90 border-blue-200 text-blue-900 shadow-sm'
                  : 'bg-white/60 border-slate-200 text-slate-600'
              }`}>
                <div>
                  <span className="font-display font-extrabold text-sm uppercase block">Visa Approved & Issued</span>
                  <span className="text-[11px] text-slate-500 font-medium">Digital copy available for electronic download</span>
                </div>
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs shrink-0">
                  <Check className="w-4 h-4" />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 24/7 Digital Support Helpline Footer Box */}
        <div className="glass-frost rounded-3xl p-6 shadow-lg border border-white/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="font-display font-bold text-sm text-[#062544]">
              Need Immediate Assistance With Your Application?
            </h4>
            <p className="text-xs text-slate-600 font-medium">
              Our 100% online travel desk is available around the clock to support you.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <a
              href="tel:+919941900055"
              className="px-4 py-2 bg-[#062544] hover:bg-[#031526] text-white rounded-xl text-xs font-bold transition flex items-center space-x-1.5 shadow-sm"
            >
              <Phone className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>+91 99419 00055</span>
            </a>
            <a
              href="mailto:info@nasinternationals.com"
              className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-800 rounded-xl text-xs font-bold transition border border-slate-200 flex items-center space-x-1.5 shadow-xs"
            >
              <Mail className="w-3.5 h-3.5 text-[#036CFB]" />
              <span>Email Support</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

