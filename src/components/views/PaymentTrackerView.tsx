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
  AlertCircle,
  Copy,
  Building2,
  QrCode,
  ZoomIn,
  X,
  Eye,
  RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { uploadCustomerDocument } from '../../services/supabaseStorage';
import paymentQrImg from '../../assets/payment-qr.jpg';
import paymentQrFullImg from '../../assets/payment-qr-full.jpg';

export const PaymentTrackerView: React.FC = () => {
  const { activeApplication, submitPaymentProof, applications, setActiveTrackerAppId } = useApp();

  const app = activeApplication || applications[0];
  const payment = app.payment;

  const [searchInput, setSearchInput] = useState('');
  const [searchError, setSearchError] = useState('');
  const [searchSuccess, setSearchSuccess] = useState('');

  const [transactionId, setTransactionId] = useState(payment?.transactionId || '');
  const [proofFileName, setProofFileName] = useState(payment?.proofFileName || '');
  const [uploadedProofUrl, setUploadedProofUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(payment?.isVerified || false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [showQrModal, setShowQrModal] = useState(false);

  const copyToClipboard = (text: string, key: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

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
      setSearchError('Application reference or passport number not found. Please verify details.');
      setSearchSuccess('');
    }
  };

  const handleQuickSelect = (id: string) => {
    setActiveTrackerAppId(id);
    setSearchError('');
    setSearchSuccess(`Switched to application ${id}`);
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transactionId.trim()) return;
    submitPaymentProof(app.id, transactionId, proofFileName || 'payment_proof.jpg');
    setIsSubmitted(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  const handleDownloadVisa = () => {
    setDownloadSuccess(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.5 }
    });
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  const isApproved = app.status === 'Approved' || app.status === 'Completed';

  return (
    <div className="bg-[#F8FAFC] min-h-[calc(100vh-5rem)] py-6 sm:py-8 px-3.5 sm:px-6 lg:px-8 relative overflow-hidden pb-44 lg:pb-20">
      {/* Ambient background glow blobs for frosted glass reflections */}
      <div className="ambient-glow-blue top-12 left-1/4 -translate-x-1/2 opacity-30"></div>
      <div className="ambient-glow-sky top-80 right-10 opacity-25"></div>
      <div className="ambient-glow-blue bottom-32 left-10 opacity-20"></div>

      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 relative z-10">
        
        {/* Page Title & Real-Time Tracking Header */}
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center space-x-2 px-3 sm:px-3.5 py-1.5 rounded-full glass-pill text-[#036CFB] text-xs font-bold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#036CFB] animate-ping"></span>
            <span>100% Online Real-Time Application Tracking</span>
          </div>
          <h1 className="font-display text-2xl xs:text-3xl sm:text-4xl font-extrabold text-[#062544] tracking-tight">
            Digital Payment & <span className="blue-gradient-text">Status Tracker</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xl leading-relaxed">
            Track your official visa dossier, verify electronic payment confirmation, and download your approved e-visa documents instantly.
          </p>
        </div>

        {/* Live Search Bar for Reference / Passport No */}
        <div className="glass-frost rounded-3xl p-4 sm:p-6 shadow-xl border border-white/80 backdrop-blur-2xl space-y-3">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3">
            <div className="relative flex-1 w-full">
              <label htmlFor="tracker-search-input" className="sr-only">
                Application Reference or Passport Number
              </label>
              <div className="absolute inset-y-0 left-0 pl-3.5 sm:pl-4 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4 text-[#036CFB]" />
              </div>
              <input
                id="tracker-search-input"
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter Ref (e.g. NAS-101) or Passport No (e.g. Z8923412)..."
                className="w-full bg-white/90 border border-slate-200/90 rounded-2xl pl-10 pr-3 sm:pl-11 sm:pr-4 py-3 text-xs sm:text-sm focus:ring-2 focus:ring-[#036CFB]/30 font-medium min-h-[46px] shadow-inner focus-ring"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-5 sm:px-6 py-3 bg-gradient-to-r from-[#036CFB] to-[#0284C7] hover:from-[#0284C7] hover:to-[#036CFB] text-white font-display font-bold text-xs sm:text-sm rounded-2xl shadow-lg shadow-[#036CFB]/30 border border-white/20 transition-all flex items-center justify-center space-x-2 shrink-0 cursor-pointer min-h-[46px] active:scale-95 focus-ring"
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
            <span className="font-semibold shrink-0 text-slate-600 text-[11px]">Quick Track:</span>
            {applications.slice(0, 3).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleQuickSelect(item.id)}
                className={`min-h-[30px] px-2.5 sm:px-3 py-1 rounded-full text-[11px] font-mono font-bold transition whitespace-nowrap border cursor-pointer active:scale-95 ${
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
        <div className="glass-frost rounded-3xl p-4 sm:p-7 lg:p-8 shadow-xl border border-white/80 backdrop-blur-2xl space-y-4 sm:space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 pb-4 border-b border-slate-200/60">
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-mono text-xs font-black text-[#036CFB] bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
                  {app.id}
                </span>
                <span className="text-[11px] sm:text-xs text-slate-500 font-semibold">Ref: {payment?.bookingId || 'NAS-987654321'}</span>
              </div>
              <h2 className="font-display text-lg xs:text-xl sm:text-2xl font-black text-[#062544] mt-1">
                {app.destination} • {app.visaType}
              </h2>
            </div>

            <div className="flex items-center space-x-2">
              <div className={`px-3 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-black flex items-center space-x-1.5 shadow-xs border ${
                isApproved 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-blue-50 text-[#036CFB] border-blue-200'
              }`}>
                <span className="uppercase tracking-wider">Status: {app.status}</span>
              </div>
            </div>
          </div>

          {/* Details 5-Column Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 text-xs">
            <div className="p-2.5 sm:p-3 bg-white/70 rounded-2xl border border-slate-200/80 space-y-0.5">
              <span className="text-[10px] sm:text-[11px] text-slate-500 font-semibold block uppercase">Passport No</span>
              <span className="font-mono font-bold text-[#062544] text-xs sm:text-sm">{app.passportNumber || 'Z8923412'}</span>
            </div>

            <div className="p-2.5 sm:p-3 bg-white/70 rounded-2xl border border-slate-200/80 space-y-0.5">
              <span className="text-[10px] sm:text-[11px] text-slate-500 font-semibold block uppercase">Submission Date</span>
              <span className="font-bold text-[#062544] text-xs sm:text-sm">{app.submissionDate || '10 Oct 2024'}</span>
            </div>

            <div className="p-2.5 sm:p-3 bg-white/70 rounded-2xl border border-slate-200/80 space-y-0.5">
              <span className="text-[10px] sm:text-[11px] text-slate-500 font-semibold block uppercase">Service Mode</span>
              <span className="font-bold text-[#036CFB] text-xs sm:text-sm">100% Online</span>
            </div>

            <div className="p-2.5 sm:p-3 bg-white/70 rounded-2xl border border-slate-200/80 space-y-0.5">
              <span className="text-[10px] sm:text-[11px] text-slate-500 font-semibold block uppercase">Service Duration</span>
              <span className="font-bold text-emerald-600 text-xs sm:text-sm">1 Year Validity</span>
            </div>

            <div className="p-2.5 sm:p-3 bg-white/70 rounded-2xl border border-slate-200/80 space-y-0.5 col-span-2 sm:col-span-1">
              <span className="text-[10px] sm:text-[11px] text-slate-500 font-semibold block uppercase">Turnaround</span>
              <span className="font-bold text-[#062544] text-xs sm:text-sm">{app.processingTime || '2-4 Days'}</span>
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          
          {/* Box 1: Official Bank Details & Digital Payment (GPay/PhonePe/QR) */}
          <div className="lg:col-span-7 glass-frost rounded-3xl p-4 sm:p-6 lg:p-7 shadow-xl border border-white/80 space-y-4 sm:space-y-5 flex flex-col justify-between backdrop-blur-2xl">
            {/* Header with 1-Year Duration Notice Badge */}
            <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 pb-3 border-b border-slate-200/60">
              <h3 className="font-display font-black text-[#062544] text-sm sm:text-base flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#036CFB]"></span>
                <span>Online Payment & Bank Details</span>
              </h3>
              <div className="inline-flex items-center space-x-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] sm:text-xs font-bold shadow-xs self-start xs:self-auto">
                <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Service & Payment: 1 Year</span>
              </div>
            </div>

            {/* Digital Payment Section (Google Pay / PhonePe & QR Code) */}
            <div className="bg-white/85 rounded-2xl p-3.5 sm:p-5 border border-slate-200/90 shadow-sm space-y-3.5 sm:space-y-4">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3.5 sm:gap-4">
                {/* Scan to Pay QR Code */}
                <div className="relative group shrink-0 text-center flex flex-col items-center">
                  <div 
                    onClick={() => setShowQrModal(true)}
                    className="w-32 h-36 xs:w-36 xs:h-40 sm:w-40 sm:h-44 bg-white border-2 border-[#036CFB]/30 p-2 rounded-2xl flex items-center justify-center shadow-md overflow-hidden cursor-pointer group-hover:border-[#036CFB] transition relative"
                    title="Click to Enlarge QR Code"
                  >
                    <img
                      src={paymentQrImg}
                      alt="Nas Internationals Google Pay UPI QR Code"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                      <span className="bg-white/95 text-[#062544] text-[10px] font-bold px-2 py-1 rounded-lg flex items-center space-x-1 shadow-sm">
                        <ZoomIn className="w-3 h-3 text-[#036CFB]" />
                        <span>Enlarge</span>
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowQrModal(true)}
                    className="min-h-[32px] text-[10px] font-black text-[#036CFB] hover:underline mt-1 uppercase tracking-wider flex items-center space-x-1 cursor-pointer"
                  >
                    <QrCode className="w-3 h-3" />
                    <span>View Full QR</span>
                  </button>
                </div>

                {/* Digital Payment Details */}
                <div className="flex-1 space-y-2.5 w-full text-center sm:text-left">
                  <div>
                    <div className="inline-flex items-center space-x-1 text-[10px] sm:text-[11px] font-bold text-[#036CFB] uppercase tracking-wide">
                      <Sparkles className="w-3 h-3 text-[#036CFB]" />
                      <span>Digital Payment</span>
                    </div>
                    <h4 className="font-display font-extrabold text-[#062544] text-sm sm:text-base">
                      Google Pay / PhonePe
                    </h4>
                    <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium">
                      Pay instantly via official mobile number or UPI ID:
                    </p>
                  </div>

                  {/* Google Pay / PhonePe Box with Copy */}
                  <div className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50/70 border border-blue-200/80 flex items-center justify-between gap-2">
                    <div className="text-left">
                      <span className="text-[9px] sm:text-[10px] font-bold uppercase text-slate-500 block">
                        Google Pay / PhonePe No.
                      </span>
                      <span className="font-mono text-sm sm:text-base font-black text-[#062544] tracking-wide">
                        9941900055
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard('9941900055', 'gpay')}
                      className="min-h-[38px] px-2.5 sm:px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-[#036CFB] border border-blue-200 text-xs font-bold transition flex items-center space-x-1 shadow-xs cursor-pointer active:scale-95 shrink-0"
                    >
                      {copiedKey === 'gpay' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Official UPI ID Box with Copy */}
                  <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-2">
                    <div className="truncate text-left min-w-0">
                      <span className="text-[9px] sm:text-[10px] font-bold uppercase text-slate-500 block">
                        Official UPI ID
                      </span>
                      <span className="font-mono text-[11px] sm:text-xs font-bold text-[#062544] truncate block">
                        nasgroup036@okhdfcbank
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard('nasgroup036@okhdfcbank', 'upi_id')}
                      className="min-h-[38px] px-2.5 sm:px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold transition flex items-center space-x-1 shadow-xs cursor-pointer active:scale-95 shrink-0"
                    >
                      {copiedKey === 'upi_id' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#036CFB]" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Payment Apps Badges */}
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1 text-[9px] sm:text-[10px] font-bold text-slate-600 pt-0.5">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-700">Google Pay</span>
                    <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200">PhonePe</span>
                    <span className="px-2 py-0.5 rounded-md bg-sky-50 text-sky-700 border border-sky-200">Paytm</span>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">BHIM / SBI</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bank Account Information Section */}
            <div className="bg-white/85 rounded-2xl p-3.5 sm:p-5 border border-slate-200/90 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-display font-extrabold text-[#062544] text-[11px] sm:text-xs uppercase tracking-wider flex items-center space-x-1.5">
                  <Building2 className="w-4 h-4 text-[#036CFB]" />
                  <span>Bank Account Information</span>
                </h4>
                <span className="text-[10px] font-bold text-[#036CFB] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                  Official Account
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 text-xs">
                {/* Account Name */}
                <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[9px] sm:text-[10px] font-semibold text-slate-500 block uppercase">Account Name</span>
                  <span className="font-bold text-[#062544] text-xs block">Nas Internationals</span>
                </div>

                {/* Bank Name */}
                <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[9px] sm:text-[10px] font-semibold text-slate-500 block uppercase">Bank</span>
                  <span className="font-bold text-[#062544] text-xs block">State Bank Of India</span>
                </div>

                {/* Account Number */}
                <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] sm:text-[10px] font-semibold text-slate-500 block uppercase">Account Number</span>
                    <span className="font-mono font-black text-[#062544] text-xs sm:text-sm tracking-wider">39081079535</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard('39081079535', 'acc')}
                    className="min-h-[36px] min-w-[36px] p-2 text-slate-500 hover:text-[#036CFB] hover:bg-white rounded-lg transition flex items-center justify-center cursor-pointer active:scale-95"
                    title="Copy Account Number"
                  >
                    {copiedKey === 'acc' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* IFSC & Branch */}
                <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] sm:text-[10px] font-semibold text-slate-500 block uppercase">IFSC / Branch</span>
                    <span className="font-mono font-black text-[#062544] text-xs sm:text-sm tracking-wider">SBIN0005201</span>
                    <span className="text-[10px] text-slate-500 font-medium block">Branch: Poonamallee</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard('SBIN0005201', 'ifsc')}
                    className="min-h-[36px] min-w-[36px] p-2 text-slate-500 hover:text-[#036CFB] hover:bg-white rounded-lg transition flex items-center justify-center cursor-pointer active:scale-95"
                    title="Copy IFSC Code"
                  >
                    {copiedKey === 'ifsc' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Duration / Validity Notice Banner */}
            <div className="p-2.5 sm:p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 flex items-center space-x-2 sm:space-x-2.5 text-xs text-emerald-900">
              <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
              <p className="font-medium text-[10px] sm:text-[11px] leading-tight">
                <strong>Service / Payment Duration: 1 Year</strong> — All registered visas, consultations, and document tracking remain valid for 1 year from payment processing.
              </p>
            </div>
          </div>

          {/* Box 2: Upload Payment Proof */}
          <div className="lg:col-span-5 glass-frost rounded-3xl p-4 sm:p-6 lg:p-7 shadow-xl border border-white/80 space-y-4 flex flex-col justify-between backdrop-blur-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/60">
              <h3 className="font-display font-black text-[#062544] text-sm sm:text-base flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#036CFB]"></span>
                <span>Submit Digital Proof</span>
              </h3>
              <label className="cursor-pointer min-h-[36px] py-1.5 px-3 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 flex items-center space-x-1.5 shadow-xs active:scale-95">
                {isUploading ? (
                  <RefreshCw className="w-3.5 h-3.5 text-[#036CFB] animate-spin" />
                ) : (
                  <Upload className="w-3.5 h-3.5 text-[#036CFB]" />
                )}
                <span>{isUploading ? 'Uploading...' : 'Choose File'}</span>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  className="hidden"
                  onChange={async (e) => {
                    if (e.target.files && e.target.files[0]) {
                      const file = e.target.files[0];
                      setProofFileName(file.name);
                      setIsUploading(true);
                      try {
                        const result = await uploadCustomerDocument(file, 'payment-proofs');
                        setUploadedProofUrl(result.url);
                      } catch (err) {
                        console.warn('Upload error:', err);
                      } finally {
                        setIsUploading(false);
                      }
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
                  className="w-full bg-white/90 border border-slate-200/90 rounded-2xl px-4 py-3 text-xs focus:ring-2 focus:ring-[#036CFB]/20 font-mono font-bold min-h-[46px] focus-ring"
                />
                {proofFileName && (
                  <div className="flex items-center justify-between mt-2 p-2 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs">
                    <p className="text-[11px] text-emerald-700 font-semibold truncate flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
                      <span className="truncate">{proofFileName}</span>
                    </p>
                    {uploadedProofUrl && (
                      <a
                        href={uploadedProofUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] font-bold text-[#036CFB] hover:underline flex items-center space-x-0.5 ml-2 shrink-0"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Preview</span>
                      </a>
                    )}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isUploading}
                className="w-full py-3 bg-gradient-to-r from-[#036CFB] to-[#0284C7] hover:from-[#0284C7] hover:to-[#036CFB] text-white font-display font-bold text-xs tracking-wide rounded-2xl shadow-lg shadow-[#036CFB]/30 transition min-h-[46px] cursor-pointer active:scale-95 flex items-center justify-center space-x-2"
              >
                <span>{isSubmitted ? 'Update Payment Verification' : 'Confirm & Submit Proof'}</span>
              </button>
            </form>

            {/* Badges Row */}
            <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[9px] sm:text-[10px] text-slate-500 font-semibold">
              <div className="flex items-center space-x-1">
                <Lock className="w-3.5 h-3.5 text-[#036CFB]" />
                <span>256-bit SSL</span>
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
        <div className="glass-frost rounded-3xl p-5 sm:p-7 lg:p-8 shadow-xl border border-white/80 space-y-6 backdrop-blur-2xl">
          <div className="text-center space-y-1">
            <h2 className="font-display font-bold text-[#062544] text-base sm:text-lg">
              Application Progress Timeline
            </h2>
            <p className="text-xs text-slate-500 font-medium">Real-time status updates from our consular processing desk</p>
          </div>

          <div className="max-w-md mx-auto space-y-6 relative pl-7 sm:pl-8 border-l-2 border-blue-200/90 ml-3 sm:ml-auto">
            
            {/* Step 1: Submitted */}
            <div className="relative space-y-1">
              <div className="absolute -left-[30px] sm:-left-[34px] top-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#062544] text-white flex items-center justify-center shadow-md shadow-[#062544]/25">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#38BDF8]" />
              </div>
              <div className="flex items-center justify-between">
                <p className="font-bold text-slate-800 text-xs sm:text-sm">
                  Dossier Submitted
                </p>
                <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium">{app.submissionDate || '10 Oct 2024'}</span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium leading-relaxed">
                Initial visa dossier and applicant details officially registered.
              </p>
            </div>

            {/* Step 2: Under Review */}
            <div className="relative space-y-1 pt-1">
              <div className={`absolute -left-[30px] sm:-left-[34px] top-1 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-md ${
                app.status !== 'Submitted' ? 'bg-[#062544] text-white shadow-[#062544]/25' : 'bg-slate-200 text-slate-400'
              }`}>
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#38BDF8]" />
              </div>
              <div className="flex items-center justify-between">
                <p className="font-bold text-slate-800 text-xs sm:text-sm">
                  Document Verification
                </p>
                <span className={`text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  app.status !== 'Submitted' ? 'bg-blue-100 text-[#036CFB]' : 'bg-slate-100 text-slate-500'
                }`}>
                  {app.status === 'Submitted' ? 'Pending' : 'Completed'}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium leading-relaxed">
                Internal digital verification and mandatory document checklist validated.
              </p>
            </div>

            {/* Step 3: Processing */}
            <div className="relative space-y-1 pt-1">
              <div className={`absolute -left-[30px] sm:-left-[34px] top-1 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-md ${
                app.status === 'Processing' || app.status === 'In Process' || isApproved
                  ? 'bg-[#036CFB] text-white shadow-[#036CFB]/30'
                  : 'bg-slate-200 text-slate-400'
              }`}>
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="flex items-center justify-between">
                <p className="font-bold text-slate-800 text-xs sm:text-sm">
                  Consular Processing
                </p>
                <span className={`text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  isApproved 
                    ? 'bg-emerald-100 text-emerald-700'
                    : app.status === 'Processing' || app.status === 'In Process'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-slate-100 text-slate-500'
                }`}>
                  {isApproved ? 'Cleared' : app.status === 'Processing' ? 'In Progress' : 'Queued'}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium leading-relaxed">
                Consular e-visa clearance and official verification checks in progress.
              </p>
            </div>

            {/* Step 4: Visa Approved & Issued */}
            <div className="relative space-y-1 pt-1">
              <div className={`absolute -left-[30px] sm:-left-[34px] top-1 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-md ${
                isApproved
                  ? 'bg-emerald-500 text-white shadow-emerald-500/30'
                  : 'bg-slate-200 text-slate-400'
              }`}>
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="flex items-center justify-between">
                <p className="font-bold text-slate-800 text-xs sm:text-sm">
                  Visa Approved & Issued
                </p>
                {isApproved ? (
                  <span className="text-[10px] sm:text-[11px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center space-x-1">
                    <Check className="w-3 h-3" />
                    <span>Issued</span>
                  </span>
                ) : (
                  <span className="text-[10px] sm:text-[11px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                    Awaiting
                  </span>
                )}
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium leading-relaxed">
                Verified electronic visa copy generated for international travel.
              </p>

              {isApproved && (
                <div className="pt-2">
                  <button
                    onClick={handleDownloadVisa}
                    className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center space-x-2 transition"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Official Approved E-Visa PDF</span>
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* 24/7 Digital Support Helpline Footer Box */}
        <div className="glass-frost rounded-3xl p-5 sm:p-6 shadow-lg border border-white/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left mb-10 sm:mb-6">
          <div className="space-y-1">
            <h4 className="font-display font-bold text-xs sm:text-sm text-[#062544]">
              Need Immediate Assistance With Your Application?
            </h4>
            <p className="text-[11px] sm:text-xs text-slate-600 font-medium">
              Our travel support desk is available around the clock to assist you.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2.5 w-full sm:w-auto">
            <a
              href="tel:+919941900055"
              className="min-h-[44px] px-4 py-2.5 bg-[#062544] hover:bg-[#031526] text-white rounded-xl text-xs font-bold transition flex items-center space-x-1.5 shadow-sm active:scale-95"
            >
              <Phone className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>+91 99419 00055</span>
            </a>
            <a
              href="mailto:info@nasinternationals.com"
              className="min-h-[44px] px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-800 rounded-xl text-xs font-bold transition border border-slate-200 flex items-center space-x-1.5 shadow-xs active:scale-95"
            >
              <Mail className="w-3.5 h-3.5 text-[#036CFB]" />
              <span>Email Support</span>
            </a>
          </div>
        </div>

        {/* Full-Screen QR Code Modal */}
        {showQrModal && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-3 xs:p-4">
            <div className="bg-white rounded-3xl p-4 sm:p-6 max-w-sm w-full shadow-2xl border border-slate-200 space-y-3.5 relative animate-in fade-in zoom-in-95 duration-150 max-h-[92dvh] overflow-y-auto">
              <button
                type="button"
                onClick={() => setShowQrModal(false)}
                className="absolute top-3.5 right-3.5 p-2 min-h-[38px] min-w-[38px] rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition flex items-center justify-center cursor-pointer active:scale-95"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center space-y-0.5 pt-1">
                <h3 className="font-display font-black text-sm sm:text-base text-[#062544]">
                  Nas Internationals
                </h3>
                <p className="text-xs text-[#036CFB] font-bold">
                  Official UPI Merchant Payment QR
                </p>
              </div>

              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-inner bg-slate-50 flex items-center justify-center p-2">
                <img
                  src={paymentQrFullImg}
                  alt="Nas Internationals Full Merchant QR Standee"
                  className="w-full max-h-[300px] sm:max-h-[380px] object-contain rounded-xl"
                />
              </div>

              <div className="space-y-1 text-center text-xs">
                <p className="font-mono font-bold text-slate-800 text-[11px] sm:text-xs">
                  UPI ID: <span className="text-[#036CFB]">nasgroup036@okhdfcbank</span>
                </p>
                <p className="text-[10px] sm:text-[11px] text-slate-500">
                  Scan with Google Pay, PhonePe, Paytm, BHIM, or any banking app.
                </p>
              </div>

              <div className="flex gap-2 pt-1">
                <a
                  href={paymentQrFullImg}
                  download="NasInternationals-UPI-QR.jpg"
                  className="flex-1 min-h-[44px] py-2.5 bg-[#036CFB] hover:bg-[#0256c7] text-white rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 shadow-md cursor-pointer active:scale-95"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download QR</span>
                </a>
                <button
                  type="button"
                  onClick={() => setShowQrModal(false)}
                  className="min-h-[44px] px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer active:scale-95"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

