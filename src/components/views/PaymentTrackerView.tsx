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
    <div className="bg-[#EBF3FF]/60 min-h-[calc(100vh-5rem)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Page Title & Booking Subtitle */}
        <div className="space-y-1">
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0B1E3D] tracking-tight">
            Payment Verification & Status Tracker
          </h1>
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-600 font-medium">
            <span>Your Booking Details:</span>
            <span className="font-mono font-bold text-[#0B1E3D]">Booking ID: {payment?.bookingId || 'NAS-987654321'}</span>
          </div>
        </div>

        {/* Application Selector Pills if user has multiple apps */}
        {applications.length > 1 && (
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            <span className="text-xs text-slate-500 font-semibold shrink-0">Switch Application:</span>
            {applications.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTrackerAppId(item.id)}
                className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition ${
                  item.id === app.id
                    ? 'bg-[#036CFB] text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
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
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4 flex flex-col justify-between">
            <h3 className="font-display font-bold text-[#0B1E3D] text-base">
              Secure Digital Payment Information
            </h3>

            <div className="flex items-center space-x-4">
              {/* Scan to Pay QR Code */}
              <div className="w-32 h-32 bg-slate-50 border border-slate-200 p-2 rounded-xl flex items-center justify-center shrink-0">
                <img
                  src={payment?.upiQrCodeUrl || 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=nastravels@hdfcbank&pn=NAS%20Travels'}
                  alt="UPI Payment QR Code"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Bank Details */}
              <div className="space-y-1 text-xs">
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
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-[#0B1E3D] text-base">
                Upload Payment Proof
              </h3>
              <label className="cursor-pointer py-1 px-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 flex items-center space-x-1">
                <Upload className="w-3.5 h-3.5 text-[#036CFB]" />
                <span>File upload</span>
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
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-[#036CFB] font-mono"
                />
                {proofFileName && (
                  <p className="text-[11px] text-emerald-600 font-semibold mt-1">
                    Attached file: {proofFileName}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#036CFB] hover:bg-[#0256c7] text-white font-display font-bold text-xs tracking-wide rounded-xl shadow-md shadow-[#036CFB]/25 transition"
              >
                {isSubmitted ? 'Update Payment Details' : 'Submit Payment Details'}
              </button>
            </form>

            {/* Badges Row */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 font-semibold">
              <div className="flex items-center space-x-1">
                <Lock className="w-3 h-3 text-[#036CFB]" />
                <span>256-bit SSL Secure</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>Trusted Payment</span>
              </div>
              <div className="flex items-center space-x-1">
                <Shield className="w-3 h-3 text-[#036CFB]" />
                <span>Data Privacy Guaranteed</span>
              </div>
            </div>
          </div>

        </div>

        {/* Application Timeline (Vertical Stepper) */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
          <h2 className="font-display font-bold text-[#0B1E3D] text-lg text-center">
            Application Timeline
          </h2>

          <div className="max-w-md mx-auto space-y-6 relative pl-6 border-l-2 border-slate-200 ml-4 sm:ml-auto">
            
            {/* Step 1: Submitted */}
            <div className="relative space-y-1">
              <div className="absolute -left-[31px] top-0 w-8 h-8 rounded-full bg-[#0B1E3D] text-white flex items-center justify-center shadow-md">
                <CheckCircle2 className="w-5 h-5 text-[#38BDF8]" />
              </div>
              <p className="font-bold text-slate-800 text-sm">
                Submitted <span className="text-slate-400 font-normal text-xs">- 10 Oct 2024</span>
              </p>
              <p className="text-xs text-slate-500">Initial visa form and bio data registered.</p>
            </div>

            {/* Step 2: Under Review */}
            <div className="relative space-y-1 pt-2">
              <div className={`absolute -left-[31px] top-2 w-8 h-8 rounded-full flex items-center justify-center shadow-md ${
                app.status !== 'Submitted' ? 'bg-[#0B1E3D] text-white' : 'bg-slate-200 text-slate-400'
              }`}>
                <Clock className="w-5 h-5 text-[#38BDF8]" />
              </div>
              <p className="font-bold text-slate-800 text-sm">
                Under Review <span className="text-slate-400 font-normal text-xs">- 12 Oct 2024</span>
              </p>
              <p className="text-xs text-slate-500">Document attestation and financial proof review.</p>
            </div>

            {/* Step 3: Processing */}
            <div className="relative space-y-1 pt-2">
              <div className={`absolute -left-[31px] top-2 w-8 h-8 rounded-full flex items-center justify-center shadow-md ${
                app.status === 'Processing' || app.status === 'In Process' || app.status === 'Approved' || app.status === 'Completed'
                  ? 'bg-[#0B1E3D] text-white'
                  : 'bg-slate-200 text-slate-400'
              }`}>
                <ShieldCheck className="w-5 h-5 text-[#036CFB]" />
              </div>
              <p className="font-bold text-slate-800 text-sm">
                Processing <span className="text-slate-400 font-normal text-xs">- 15 Oct 2024</span>
              </p>
              <p className="text-xs text-slate-500">High Commission consulate verification in progress.</p>
            </div>

            {/* Step 4: Visa Approved */}
            <div className="relative pt-2">
              <div className={`absolute -left-[31px] top-2 w-8 h-8 rounded-full flex items-center justify-center shadow-md ${
                app.status === 'Approved' || app.status === 'Completed'
                  ? 'bg-[#036CFB] text-white shadow-md shadow-[#036CFB]/25'
                  : 'bg-slate-200 text-slate-400'
              }`}>
                <CheckCircle2 className="w-5 h-5" />
              </div>

              {/* Highlight Box matching screenshot */}
              <div className={`p-4 rounded-xl border flex items-center justify-between ${
                app.status === 'Approved' || app.status === 'Completed'
                  ? 'bg-blue-50/80 border-blue-200 text-blue-900'
                  : 'bg-slate-50 border-slate-200 text-slate-600'
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
