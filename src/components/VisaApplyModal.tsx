import React, { useState } from 'react';
import { VisaInfo, TravelerDetail } from '../types';
import { 
  X, 
  CheckCircle2, 
  UserPlus, 
  Trash2, 
  Upload, 
  CreditCard, 
  QrCode, 
  ShieldCheck, 
  Calendar, 
  FileCheck,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Lock
} from 'lucide-react';
import { publishRealtime } from '../lib/realtime';

interface VisaApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  visa: VisaInfo | null;
  onApplicationCompleted: (newBooking: any) => void;
  userPhone?: string;
}

export const VisaApplyModal: React.FC<VisaApplyModalProps> = ({
  isOpen,
  onClose,
  visa,
  onApplicationCompleted,
  userPhone = '+91 91709708777'
}) => {
  if (!isOpen || !visa) return null;

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [departureDate, setDepartureDate] = useState<string>('2026-08-25');
  const [returnDate, setReturnDate] = useState<string>('2026-09-05');
  
  // Travelers list
  const [travelers, setTravelers] = useState<TravelerDetail[]>([
    {
      id: "tr-1",
      firstName: "",
      lastName: "",
      gender: "Male",
      dob: "1995-06-15",
      occupation: "Private Service",
      mobile: userPhone,
      email: "user@example.com",
      relation: "Self",
      city: "Chennai",
      state: "Tamil Nadu",
      passportNumber: "Z9876543",
      passportExpiry: "2031-05-20"
    }
  ]);

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'netbanking'>('upi');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const handleUpdateTraveler = (index: number, field: keyof TravelerDetail, value: any) => {
    const updated = [...travelers];
    updated[index] = { ...updated[index], [field]: value };
    setTravelers(updated);
  };

  const handleAddTraveler = () => {
    setTravelers(prev => [
      ...prev,
      {
        id: `tr-${Date.now()}`,
        firstName: "",
        lastName: "",
        gender: "Male",
        dob: "2000-01-01",
        occupation: "Traveler",
        mobile: userPhone,
        email: "family@example.com",
        relation: "Spouse",
        city: "Chennai",
        state: "Tamil Nadu",
        passportNumber: "",
        passportExpiry: ""
      }
    ]);
  };

  const handleRemoveTraveler = (index: number) => {
    if (travelers.length > 1) {
      setTravelers(prev => prev.filter((_, i) => i !== index));
    }
  };

  const totalFee = visa.feeINR * travelers.length;

  const handleCompleteApplication = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);

      const referenceNo = `NAS-${Math.floor(100000 + Math.random() * 900000)}`;
      const newBooking = {
        id: referenceNo,
        referenceNo,
        type: 'visa',
        serviceTitle: `${visa.country} Tourist Visa (${visa.entryType})`,
        customerName: `${travelers[0].firstName || 'Traveler'} ${travelers[0].lastName}`,
        customerPhone: travelers[0].mobile || userPhone,
        status: 'Documents Verification in Progress',
        submittedAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        estimatedDelivery: visa.deliveryEstimate || 'Within 3-5 Working Days',
        totalAmountINR: totalFee,
        country: visa.country,
        flag: visa.flag,
        travelersCount: travelers.length,
        travelers: travelers,
        travelDates: { departure: departureDate, returnDate }
      };

      // Save to localStorage
      const existing = JSON.parse(localStorage.getItem('nas_user_bookings') || localStorage.getItem('tripate_user_bookings') || '[]');
      localStorage.setItem('nas_user_bookings', JSON.stringify([newBooking, ...existing]));

      // Publish Realtime sync
      publishRealtime({
        type: 'INQUIRY_SUBMITTED',
        payload: {
          serviceType: `${visa.country} Visa`,
          customerName: newBooking.customerName,
          phone: newBooking.customerPhone,
          timestamp: new Date().toLocaleTimeString()
        },
        sender: newBooking.customerName
      });

      onApplicationCompleted(newBooking);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-3xl w-full text-white overflow-hidden shadow-2xl relative animate-fadeIn max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="bg-slate-950 p-5 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{visa.flag}</span>
            <div>
              <h3 className="text-lg font-bold text-white leading-tight">
                Apply for {visa.country} Visa
              </h3>
              <p className="text-xs text-slate-400">
                Processing: <strong className="text-amber-400">{visa.processingTime}</strong> • Fee per pax: <strong className="text-white">₹{visa.feeINR.toLocaleString('en-IN')}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="bg-slate-900 px-6 py-3 border-b border-slate-800 flex items-center justify-between text-xs font-bold text-slate-400">
          <div className={`flex items-center gap-2 ${step === 1 ? 'text-amber-400' : 'text-emerald-400'}`}>
            <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center text-[10px]">1</span>
            <span>Travel Dates</span>
          </div>

          <div className={`flex items-center gap-2 ${step === 2 ? 'text-amber-400' : step > 2 ? 'text-emerald-400' : 'text-slate-600'}`}>
            <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px]">2</span>
            <span>Traveler Info ({travelers.length})</span>
          </div>

          <div className={`flex items-center gap-2 ${step === 3 ? 'text-amber-400' : 'text-slate-600'}`}>
            <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px]">3</span>
            <span>Payment & Submit</span>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">

          {/* STEP 1: Travel Dates & Options */}
          {step === 1 && (
            <div className="space-y-6">
              
              <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase block">Selected Visa Type</span>
                  <span className="text-base font-bold text-white">{visa.country} {visa.entryType}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-slate-400 uppercase block">Estimated Delivery</span>
                  <span className="text-xs font-bold text-emerald-400">{visa.deliveryEstimate || visa.processingTime}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-2">Select Intended Travel Dates</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-slate-400 block mb-1">Departure Date</span>
                    <input
                      type="date"
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <span className="text-xs text-slate-400 block mb-1">Return Date</span>
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Required Documents for {visa.country}</h4>
                <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  {visa.documentsRequired.map((doc, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* STEP 2: Travelers Information */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  Fill Details for {travelers.length} Traveler(s)
                </h4>
                
                <button
                  type="button"
                  onClick={handleAddTraveler}
                  className="px-3 py-1.5 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold flex items-center gap-1.5 hover:bg-amber-400/30 transition-colors"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>+ Add Co-Traveler</span>
                </button>
              </div>

              {travelers.map((t, idx) => (
                <div key={t.id} className="bg-slate-800/90 p-5 rounded-2xl border border-slate-700 relative space-y-4">
                  
                  <div className="flex items-center justify-between border-b border-slate-700/80 pb-3">
                    <span className="text-xs font-black text-amber-400 uppercase">
                      Traveler #{idx + 1} ({t.relation})
                    </span>

                    {travelers.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveTraveler(idx)}
                        className="text-red-400 hover:text-red-300 text-xs font-bold flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">First Name (as in Passport) *</label>
                      <input
                        type="text"
                        required
                        value={t.firstName}
                        onChange={(e) => handleUpdateTraveler(idx, 'firstName', e.target.value)}
                        placeholder="e.g. Vinoth"
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Last Name *</label>
                      <input
                        type="text"
                        required
                        value={t.lastName}
                        onChange={(e) => handleUpdateTraveler(idx, 'lastName', e.target.value)}
                        placeholder="e.g. Kumar"
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Gender *</label>
                      <select
                        value={t.gender}
                        onChange={(e) => handleUpdateTraveler(idx, 'gender', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Passport Number *</label>
                      <input
                        type="text"
                        required
                        value={t.passportNumber}
                        onChange={(e) => handleUpdateTraveler(idx, 'passportNumber', e.target.value)}
                        placeholder="e.g. Z1234567"
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 uppercase focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Passport Expiry *</label>
                      <input
                        type="date"
                        required
                        value={t.passportExpiry}
                        onChange={(e) => handleUpdateTraveler(idx, 'passportExpiry', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Mobile / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        value={t.mobile}
                        onChange={(e) => handleUpdateTraveler(idx, 'mobile', e.target.value)}
                        placeholder="+91 91709708777"
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}

          {/* STEP 3: Summary, Instant Payment QR & Submit */}
          {step === 3 && (
            <div className="space-y-6">
              
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Visa Service:</span>
                  <strong className="text-white">{visa.country} Visa</strong>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Total Travelers:</span>
                  <strong className="text-white">{travelers.length} Person(s)</strong>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Fee Per Traveler:</span>
                  <strong className="text-white">₹{visa.feeINR.toLocaleString('en-IN')}</strong>
                </div>
                <div className="border-t border-slate-800 pt-2 flex items-center justify-between text-base font-bold text-white">
                  <span>Total Payable:</span>
                  <span className="text-2xl font-black text-amber-400">₹{totalFee.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Select Payment Method</h4>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-4 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all ${
                      paymentMethod === 'upi'
                        ? 'bg-amber-400/20 border-amber-400 text-amber-300 font-bold'
                        : 'bg-slate-800 border-slate-700 text-slate-300'
                    }`}
                  >
                    <QrCode className="w-6 h-6 text-amber-400" />
                    <span className="text-xs">UPI / GPay / PhonePe QR</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`p-4 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all ${
                      paymentMethod === 'netbanking'
                        ? 'bg-amber-400/20 border-amber-400 text-amber-300 font-bold'
                        : 'bg-slate-800 border-slate-700 text-slate-300'
                    }`}
                  >
                    <CreditCard className="w-6 h-6 text-sky-400" />
                    <span className="text-xs">Netbanking / Card</span>
                  </button>
                </div>
              </div>

              {paymentMethod === 'upi' && (
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="text-center sm:text-left">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
                      Scan & Pay via any UPI App
                    </span>
                    <p className="text-xs text-slate-300 mb-2">
                      GPay, PhonePe, Paytm, BHIM to UPI ID: <strong>nasinternationals@upi</strong>
                    </p>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-bold border border-emerald-500/30">
                      <Lock className="w-3 h-3" />
                      <span>Instant Verification Guarantee</span>
                    </div>
                  </div>

                  <div className="w-32 h-32 bg-white p-2 rounded-2xl shrink-0 flex items-center justify-center shadow-md">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=nasinternationals@upi%26pn=NAS%20Internationals%20Visa%26am=${totalFee}%26cu=INR`} 
                      alt="UPI QR Code" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="bg-slate-950 p-4 border-t border-slate-800 flex items-center justify-between shrink-0">
          {step > 1 ? (
            <button
              onClick={() => setStep((step - 1) as any)}
              className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold flex items-center gap-1.5 hover:bg-slate-700"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div></div>
          )}

          {step < 3 ? (
            <button
              onClick={() => setStep((step + 1) as any)}
              className="px-6 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 flex items-center gap-1.5 shadow-md"
            >
              <span>Next Step</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleCompleteApplication}
              disabled={isProcessingPayment}
              className="px-8 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm flex items-center gap-2 shadow-xl active:scale-95 disabled:opacity-50"
            >
              {isProcessingPayment ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Processing Application...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5" />
                  <span>Pay ₹{totalFee.toLocaleString('en-IN')} & Submit</span>
                </>
              )}
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
