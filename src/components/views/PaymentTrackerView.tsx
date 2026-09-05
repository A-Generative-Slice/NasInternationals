import React, { useState } from 'react';
import { QrCode, Upload, Shield, ShieldCheck, CheckCircle2, Clock, Lock, CreditCard, Sparkles, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';

export const PaymentTrackerView: React.FC = () => {
  const { activeApplication, submitPaymentProof, applications, setActiveTrackerAppId } = useApp();

  const app = activeApplication || applications[0];
  const payment = app.payment;

  const [transactionId, setTransactionId] = useState(payment?.transactionId || '');
  const [proofFileName, setProofFileName] = useState(payment?.proofFileName || '');
  const [isSubmitted, setIsSubmitted] = useState(payment?.isVerified || false);

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

  return (
    <div className="bg-[#F8FAFC] min-h-[calc(100vh-5rem)] py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden pb-24 lg:pb-16">
      {/* Ambient background glow blobs for frosted glass reflections */}
      <div className="ambient-glow-blue top-12 left-1/4 -translate-x-1/2"></div>
      <div className="ambient-glow-sky top-80 right-10"></div>
      <div className="ambient-glow-blue bottom-32 left-10"></div>

      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        
        {/* Page Title & Booking Subtitle */}
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-pill text-[#036CFB] text-xs font-bold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#036CFB] animate-pulse"></span>
            <span>Digital Payment & Real-Time Tracking</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#062544] tracking-tight">
            Payment Verification & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#036CFB] via-[#0284C7] to-[#38BDF8]">Status Tracker</span>
          </h1>
          <div className="flex items-center justify-center sm:justify-start space-x-2 text-xs sm:text-sm text-slate-600 font-medium">
            <span>Your Booking Reference:</span>
            <span className="font-mono font-bold text-[#062544] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">{payment?.bookingId || 'NAS-987654321'}</span>
          </div>
        </div>

        {/* Application Selector Pills if user has multiple apps */}
        {applications.length > 1 && (
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 no-scrollbar glass-frost p-2 rounded-2xl border border-white/80 shadow-xs">
            <span className="text-xs text-slate-500 font-semibold shrink-0 pl-1">Switch Application:</span>
            {applications.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTrackerAppId(item.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold transition whitespace-nowrap min-h-[36px] ${
                  item.id === app.id
                    ? 'bg-[#036CFB] text-white shadow-md shadow-[#036CFB]/30'
                    : 'bg-white/80 text-slate-600 border border-slate-200 hover:bg-white'
                }`}
              >
                {item.id} ({item.destination})
              </button>
            ))}
          </div>
        )}

        {/* Top 2 Boxes Grid: Secure Payment Info & Upload Payment Proof */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          
          {/* Box 1: Secure Payment Information */}
          <div className="glass-frost rounded-3xl p-6 shadow-xl border border-white/80 space-y-4 flex flex-col justify-between backdrop-blur-2xl">
            <h3 className="font-display font-bold text-[#062544] text-base flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#036CFB]"></span>
              <span>Secure Digital Payment</span>
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
                  <p><span className="font-semibold text-slate-700">Bank Details:</span></p>
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
                <span>Upload Payment Proof</span>
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
                <input
                  type="text"
                  placeholder="Transaction ID / UTR Number"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  required
                  className="w-full bg-white/90 border border-slate-200/90 rounded-2xl px-4 py-3 text-xs focus:ring-2 focus:ring-[#036CFB]/20 font-mono font-bold min-h-[44px]"
                />
                {proofFileName && (
                  <p className="text-[11px] text-emerald-600 font-semibold mt-1.5 pl-1">
                    ✓ Attached file: {proofFileName}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-[#036CFB] to-[#0284C7] hover:from-[#0256c7] hover:to-[#036CFB] text-white font-display font-bold text-xs tracking-wide rounded-2xl shadow-lg shadow-[#036CFB]/30 transition min-h-[44px]"
              >
                {isSubmitted ? 'Update Payment Details' : 'Submit Payment Details'}
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

        {/* Application Timeline (Vertical Stepper) */}
        <div className="glass-frost rounded-3xl p-6 sm:p-8 shadow-xl border border-white/80 space-y-6 backdrop-blur-2xl">
          <h2 className="font-display font-bold text-[#062544] text-lg text-center">
            Application Progress Timeline
          </h2>

          <div className="max-w-md mx-auto space-y-6 relative pl-6 border-l-2 border-blue-200/80 ml-4 sm:ml-auto">
            
            {/* Step 1: Submitted */}
            <div className="relative space-y-1">
              <div className="absolute -left-[31px] top-0 w-8 h-8 rounded-full bg-[#062544] text-white flex items-center justify-center shadow-md shadow-[#062544]/25">
                <CheckCircle2 className="w-5 h-5 text-[#38BDF8]" />
              </div>
              <p className="font-bold text-slate-800 text-sm">
                Submitted <span className="text-slate-400 font-normal text-xs">- 10 Oct 2024</span>
              </p>
              <p className="text-xs text-slate-500 font-medium">Initial visa form and bio data registered.</p>
            </div>

            {/* Step 2: Under Review */}
            <div className="relative space-y-1 pt-2">
              <div className={`absolute -left-[31px] top-2 w-8 h-8 rounded-full flex items-center justify-center shadow-md ${
                app.status !== 'Submitted' ? 'bg-[#062544] text-white shadow-[#062544]/25' : 'bg-slate-200 text-slate-400'
              }`}>
                <Clock className="w-5 h-5 text-[#38BDF8]" />
              </div>
              <p className="font-bold text-slate-800 text-sm">
                Under Review <span className="text-slate-400 font-normal text-xs">- 12 Oct 2024</span>
              </p>
              <p className="text-xs text-slate-500 font-medium">Document attestation and digital verification review.</p>
            </div>

            {/* Step 3: Processing */}
            <div className="relative space-y-1 pt-2">
              <div className={`absolute -left-[31px] top-2 w-8 h-8 rounded-full flex items-center justify-center shadow-md ${
                app.status === 'Processing' || app.status === 'In Process' || app.status === 'Approved' || app.status === 'Completed'
                  ? 'bg-[#062544] text-white shadow-[#062544]/25'
                  : 'bg-slate-200 text-slate-400'
              }`}>
                <ShieldCheck className="w-5 h-5 text-[#036CFB]" />
              </div>
              <p className="font-bold text-slate-800 text-sm">
                Processing <span className="text-slate-400 font-normal text-xs">- 15 Oct 2024</span>
              </p>
              <p className="text-xs text-slate-500 font-medium">Consulate e-visa clearance in progress.</p>
            </div>

            {/* Step 4: Visa Approved */}
            <div className="relative pt-2">
              <div className={`absolute -left-[31px] top-2 w-8 h-8 rounded-full flex items-center justify-center shadow-md ${
                app.status === 'Approved' || app.status === 'Completed'
                  ? 'bg-[#036CFB] text-white shadow-md shadow-[#036CFB]/30'
                  : 'bg-slate-200 text-slate-400'
              }`}>
                <CheckCircle2 className="w-5 h-5" />
              </div>

              {/* Highlight Box */}
              <div className={`p-4 rounded-2xl border flex items-center justify-between ${
                app.status === 'Approved' || app.status === 'Completed'
                  ? 'bg-blue-50/90 border-blue-200 text-blue-900 shadow-sm'
                  : 'bg-white/60 border-slate-200 text-slate-600'
              }`}>
                <span className="font-display font-extrabold text-sm uppercase">Visa Approved</span>
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                  <Check className="w-4 h-4" />
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
