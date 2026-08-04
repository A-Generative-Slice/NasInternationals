import React, { useState } from 'react';
import { submitInquiry } from '../lib/realtime';
import { COMPANY_INFO } from '../lib/data';
import { X, Send, CheckCircle2, Phone, Mail, User, Sparkles, Upload, CreditCard, QrCode, Building2, Image as ImageIcon, Check, AlertCircle } from 'lucide-react';
import { BookingInquiry } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
  initialDetails: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  serviceName,
  initialDetails
}) => {
  const [tabMode, setTabMode] = useState<'booking_payment' | 'quick_inquiry'>('booking_payment');
  
  // User Form State
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [details, setDetails] = useState(initialDetails);
  
  // Payment Verification State
  const [paymentMethod, setPaymentMethod] = useState<'UPI / GPay / PhonePe' | 'Bank Transfer (IMPS/NEFT)' | 'Cash at Chennai Office'>('UPI / GPay / PhonePe');
  const [paymentAmount, setPaymentAmount] = useState<string>('15000'); // Advance deposit or full amount
  const [paymentUtr, setPaymentUtr] = useState('');
  const [paymentScreenshot, setPaymentScreenshot] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [submittedInquiry, setSubmittedInquiry] = useState<BookingInquiry | null>(null);

  if (!isOpen) return null;

  // Handle Image File Upload (Convert to Base64)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Image file size should be less than 5MB");
      return;
    }

    setUploadError(null);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPaymentScreenshot(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone) return;

    const isPaymentSubmission = tabMode === 'booking_payment';

    const newInquiry = submitInquiry({
      customerName,
      phone,
      email: email || 'N/A',
      serviceType: serviceName || 'Tour Package Booking',
      details: details || serviceName,
      paymentMethod: isPaymentSubmission ? paymentMethod : undefined,
      paymentAmountINR: isPaymentSubmission ? parseFloat(paymentAmount) || 0 : undefined,
      paymentScreenshot: isPaymentSubmission && paymentScreenshot ? paymentScreenshot : undefined,
      paymentUtr: isPaymentSubmission ? paymentUtr : undefined,
      paymentStatus: isPaymentSubmission ? 'Pending Verification' : 'Not Required',
    });

    setSubmittedInquiry(newInquiry);
  };

  const handleWhatsAppRedirect = () => {
    if (!submittedInquiry) return;
    const text = `Hi NAS Internationals! I have submitted booking reference: *${submittedInquiry.referenceNo}*
Service: ${submittedInquiry.serviceType}
Name: ${submittedInquiry.customerName}
Phone: ${submittedInquiry.phone}
Payment Method: ${submittedInquiry.paymentMethod || 'Inquiry'}
UTR/Ref: ${submittedInquiry.paymentUtr || 'Attached screenshot'}
Status: ${submittedInquiry.paymentStatus || 'Pending Verification'}`;

    window.open(`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
    onClose();
  };

  const resetAndClose = () => {
    setSubmittedInquiry(null);
    setPaymentScreenshot(null);
    setPaymentUtr('');
    setUploadError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full p-5 sm:p-7 shadow-2xl relative my-auto animate-scaleUp text-slate-900 max-h-[92vh] overflow-y-auto">
        
        <button
          onClick={resetAndClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedInquiry ? (
          <div className="text-center py-4 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200 shadow-inner">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>

            <div>
              <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                BOOKING REF: {submittedInquiry.referenceNo}
              </span>
              <h3 className="text-2xl font-bold font-serif text-slate-900 mt-2">
                {submittedInquiry.paymentMethod ? 'Payment Screenshot Received!' : 'Booking Request Received!'}
              </h3>
              <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
                Thank you <strong>{submittedInquiry.customerName}</strong>. Our admin team will verify your payment and update status in real-time.
              </p>
            </div>

            {/* Status Callout Box */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-left text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  Verification Status:
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900 font-bold uppercase text-[10px]">
                  {submittedInquiry.paymentStatus || 'Pending Verification'}
                </span>
              </div>
              <p className="text-slate-700">
                You can track this booking live on our portal. Once our accounts department in Chennai validates the transaction, you will receive an approved voucher confirmation.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left text-xs space-y-1">
              <p className="text-slate-500 font-bold uppercase text-[10px] tracking-wider mb-1">Booking Summary:</p>
              <p className="text-slate-900"><strong>Service:</strong> {submittedInquiry.serviceType}</p>
              <p className="text-slate-800"><strong>Phone:</strong> {submittedInquiry.phone}</p>
              {submittedInquiry.paymentAmountINR ? (
                <p className="text-emerald-700 font-semibold">
                  <strong>Amount Paid:</strong> ₹{submittedInquiry.paymentAmountINR.toLocaleString('en-IN')} via {submittedInquiry.paymentMethod}
                </p>
              ) : null}
              {submittedInquiry.paymentUtr ? (
                <p className="text-slate-700"><strong>UTR / Ref No:</strong> {submittedInquiry.paymentUtr}</p>
              ) : null}
            </div>

            {paymentScreenshot && (
              <div className="text-left">
                <p className="text-[11px] font-bold text-slate-500 mb-1">Uploaded Payment Receipt:</p>
                <div className="h-32 w-full max-w-xs mx-auto rounded-xl border border-slate-300 overflow-hidden shadow-sm bg-slate-900 flex items-center justify-center">
                  <img src={paymentScreenshot} alt="Payment Receipt" className="h-full object-contain" />
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={handleWhatsAppRedirect}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-md text-xs sm:text-sm transition-all active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>Send Confirmation to WhatsApp Concierge</span>
              </button>

              <button
                onClick={resetAndClose}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 rounded-xl text-xs"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-sky-50 border border-sky-200 rounded-2xl text-sky-600 shrink-0">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-serif text-slate-900">Book & Pay Online</h3>
                <p className="text-xs text-slate-500">{serviceName}</p>
              </div>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-2xl mb-5 text-xs font-bold">
              <button
                type="button"
                onClick={() => setTabMode('booking_payment')}
                className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  tabMode === 'booking_payment'
                    ? 'bg-white text-sky-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Book with Payment</span>
              </button>

              <button
                type="button"
                onClick={() => setTabMode('quick_inquiry')}
                className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  tabMode === 'quick_inquiry'
                    ? 'bg-white text-sky-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Quick Inquiry Only</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              {/* Customer Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. N. Abdul Hakeem"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-sky-600 focus:bg-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone / WhatsApp *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 99419 00055"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-sky-600 focus:bg-white"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address (Optional)</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. info@nasinternationals.com"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-sky-600 focus:bg-white"
                  />
                </div>
              </div>

              {tabMode === 'booking_payment' && (
                <div className="space-y-4 pt-1 border-t border-slate-200">
                  <div className="bg-gradient-to-br from-slate-900 to-sky-950 text-white p-4 rounded-2xl shadow-sm border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Building2 className="w-4 h-4" />
                        Official NAS Bank & UPI Account
                      </span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-mono font-bold">
                        VERIFIED BUSINESS
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/80 space-y-1">
                        <p className="text-[10px] text-slate-400 font-bold uppercase">UPI / GPay / PhonePe</p>
                        <p className="font-mono text-amber-300 font-bold select-all">9941900055@paytm</p>
                        <p className="text-[10px] text-slate-300">Name: NAS INTERNATIONALS</p>
                      </div>

                      <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/80 space-y-1">
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Bank IMPS / NEFT</p>
                        <p className="font-mono text-white text-[11px] font-semibold">A/C: 50200084920154</p>
                        <p className="text-[10px] text-slate-300">IFSC: HDFC0000124 (HDFC Bank)</p>
                      </div>
                    </div>
                  </div>

                  {/* Payment Details Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Payment Method</label>
                      <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value as any)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-sky-600 focus:bg-white font-semibold"
                      >
                        <option value="UPI / GPay / PhonePe">UPI / GPay / PhonePe / Paytm</option>
                        <option value="Bank Transfer (IMPS/NEFT)">Bank Transfer (IMPS / NEFT)</option>
                        <option value="Cash at Chennai Office">Cash at Chennai Office</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Amount Paid (₹ INR)</label>
                      <input
                        type="number"
                        value={paymentAmount}
                        onChange={(e) => setPaymentAmount(e.target.value)}
                        placeholder="e.g. 15000"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:border-sky-600 focus:bg-white"
                        required
                      />
                    </div>
                  </div>

                  {/* UTR Reference Input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      UTR / Transaction Reference Number
                    </label>
                    <input
                      type="text"
                      value={paymentUtr}
                      onChange={(e) => setPaymentUtr(e.target.value)}
                      placeholder="e.g. 429104928101 or UPI Transaction ID"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs font-mono text-slate-900 focus:outline-none focus:border-sky-600 focus:bg-white"
                    />
                  </div>

                  {/* Screenshot File Upload Box */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                      <span>Upload Payment Screenshot *</span>
                      <span className="text-[10px] text-emerald-600 font-medium">PNG, JPG, WEBP (Max 5MB)</span>
                    </label>

                    <div className="border-2 border-dashed border-sky-300 hover:border-sky-500 rounded-2xl p-4 bg-sky-50/50 hover:bg-sky-50 transition-colors text-center relative cursor-pointer group">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />

                      {paymentScreenshot ? (
                        <div className="flex items-center gap-3 text-left">
                          <div className="h-16 w-16 rounded-lg bg-slate-900 border border-slate-300 overflow-hidden shrink-0 flex items-center justify-center">
                            <img src={paymentScreenshot} alt="Preview" className="h-full w-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                              <Check className="w-4 h-4 text-emerald-600" />
                              Screenshot Attached Successfully!
                            </p>
                            <p className="text-[10px] text-slate-500 truncate mt-0.5">Click or drag another image to replace</p>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); setPaymentScreenshot(null); }}
                            className="text-xs text-red-500 font-bold hover:underline z-20"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-1.5 py-1">
                          <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                            <ImageIcon className="w-5 h-5" />
                          </div>
                          <p className="text-xs font-bold text-slate-700">
                            Click to Select or Drop Payment Receipt Screenshot
                          </p>
                          <p className="text-[10px] text-slate-500">
                            Upload your GPay / PhonePe / Bank transfer confirmation screen
                          </p>
                        </div>
                      )}
                    </div>

                    {uploadError && (
                      <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {uploadError}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Trip / Special Requests</label>
                <textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  rows={2}
                  placeholder="e.g. Travel dates, number of passengers, hotel choices..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-sky-600 focus:bg-white"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-700 hover:to-blue-800 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 text-xs sm:text-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {tabMode === 'booking_payment'
                      ? 'Submit Booking & Payment for Approval'
                      : 'Submit Quick Inquiry'}
                  </span>
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
