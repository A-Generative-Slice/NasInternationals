import React, { useState, useEffect } from 'react';
import { X, FileCheck, Clock, Download, ShieldCheck, CheckCircle2, ChevronRight, Phone } from 'lucide-react';

interface UserBookingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  userPhone?: string;
}

export const UserBookingsDrawer: React.FC<UserBookingsDrawerProps> = ({
  isOpen,
  onClose,
  userPhone = '+91 91709708777'
}) => {
  if (!isOpen) return null;

  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('nas_user_bookings') || localStorage.getItem('tripate_user_bookings') || '[]');
    setBookings(saved);
  }, [isOpen]);

  const handleDownloadMockVisa = (booking: any) => {
    alert(`Downloading Official ${booking.country} eVisa PDF document for Ref: ${booking.referenceNo}`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
      <div className="bg-slate-900 border-l border-slate-800 text-white w-full max-w-lg h-full flex flex-col justify-between shadow-2xl animate-slideLeft">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">My Applications & Visas</h3>
              <p className="text-xs text-slate-400">Track real-time status & download eVisas</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content List */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          
          {bookings.length === 0 ? (
            <div className="text-center py-16 space-y-3 text-slate-400">
              <FileCheck className="w-12 h-12 text-slate-600 mx-auto" />
              <p className="text-base font-bold text-slate-300">No Active Visa Applications Found</p>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Once you select a visa destination and submit an online application, your tracking status will appear here!
              </p>
            </div>
          ) : (
            bookings.map((b) => (
              <div
                key={b.id || b.referenceNo}
                className="bg-slate-800/90 p-5 rounded-3xl border border-slate-700 shadow-lg space-y-3"
              >
                <div className="flex items-center justify-between border-b border-slate-700/70 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{b.flag || '✈️'}</span>
                    <div>
                      <h4 className="text-sm font-bold text-white leading-tight">{b.serviceTitle}</h4>
                      <span className="text-[10px] font-mono text-amber-400 font-bold">REF: {b.referenceNo}</span>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Active
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Status:</span>
                    <span className="font-bold text-amber-300">{b.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Applicant Name:</span>
                    <span className="font-medium text-white">{b.customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Est. Delivery:</span>
                    <span className="font-medium text-sky-400">{b.estimatedDelivery}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Paid:</span>
                    <span className="font-black text-amber-400">₹{b.totalAmountINR?.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => handleDownloadMockVisa(b)}
                    className="flex-1 py-2 px-3 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 transition-colors flex items-center justify-center gap-1.5 shadow"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download eVisa PDF</span>
                  </button>
                </div>
              </div>
            ))
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 text-center text-xs text-slate-400">
          Need urgent updates? Contact our 24/7 hotline at <strong className="text-amber-400">+91 91709708777</strong>
        </div>

      </div>
    </div>
  );
};
