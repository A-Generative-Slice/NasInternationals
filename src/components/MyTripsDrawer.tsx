import React, { useState, useEffect } from 'react';
import { TripPlan, BookingInquiry } from '../types';
import { getStoredTrips, getStoredInquiries, subscribeRealtime, RealtimeMessage } from '../lib/realtime';
import { X, Calendar, MapPin, Users, Radio, Clock, ChevronRight, Sparkles, Plus } from 'lucide-react';

interface MyTripsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTrip: (trip: TripPlan) => void;
  onOpenAiPlanner: () => void;
}

export const MyTripsDrawer: React.FC<MyTripsDrawerProps> = ({
  isOpen,
  onClose,
  onSelectTrip,
  onOpenAiPlanner
}) => {
  const [trips, setTrips] = useState<TripPlan[]>([]);
  const [inquiries, setInquiries] = useState<BookingInquiry[]>([]);
  const [activeTab, setActiveTab] = useState<'trips' | 'inquiries'>('trips');

  useEffect(() => {
    if (isOpen) {
      setTrips(getStoredTrips());
      setInquiries(getStoredInquiries());
    }
  }, [isOpen]);

  // Subscribe to real-time events to refresh list
  useEffect(() => {
    const unsub = subscribeRealtime((msg: RealtimeMessage) => {
      if (msg.type === 'TRIP_UPDATED' || msg.type === 'TRIP_CREATED') {
        setTrips(getStoredTrips());
      } else if (msg.type === 'INQUIRY_SUBMITTED') {
        setInquiries(getStoredInquiries());
      }
    });
    return unsub;
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex justify-end">
      <div className="bg-white border-l border-slate-200 w-full max-w-md h-full p-6 flex flex-col justify-between shadow-2xl relative animate-slideLeft text-slate-900">
        
        <div>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <h3 className="text-lg font-bold font-serif text-slate-900">Saved Itineraries & Orders</h3>
            </div>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 mb-4">
            <button
              onClick={() => setActiveTab('trips')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'trips' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-600'
              }`}
            >
              Custom Trips ({trips.length})
            </button>
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'inquiries' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-600'
              }`}
            >
              Inquiries ({inquiries.length})
            </button>
          </div>

          {/* List Content */}
          <div className="space-y-3 max-h-[70vh] overflow-y-auto scrollbar-none pr-1">
            {activeTab === 'trips' ? (
              trips.length === 0 ? (
                <div className="text-center py-10 text-slate-400 text-xs">
                  No saved trips yet.
                </div>
              ) : (
                trips.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => {
                      onSelectTrip(t);
                      onClose();
                    }}
                    className="bg-slate-50 border border-slate-200 hover:border-sky-400 p-4 rounded-2xl cursor-pointer transition-all space-y-2 group shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                        {t.shareCode}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {new Date(t.lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                      {t.title}
                    </h4>

                    <div className="flex items-center justify-between text-xs text-slate-600">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-red-500" />
                        {t.destination}
                      </span>
                      <span className="font-mono font-bold text-sky-600">
                        ₹{(t.totalEstimatedCostINR || 0).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                ))
              )
            ) : (
              inquiries.length === 0 ? (
                <div className="text-center py-10 text-slate-400 text-xs">
                  No submitted inquiries yet.
                </div>
              ) : (
                inquiries.map((inq) => (
                  <div key={inq.id} className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-2 text-left shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                        {inq.referenceNo}
                      </span>
                      <span className="text-[10px] text-slate-600 bg-slate-200 px-2 py-0.5 rounded font-semibold">
                        {inq.status}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900">{inq.serviceType}</h4>
                    <p className="text-xs text-slate-600 truncate">{inq.details}</p>
                    <div className="text-[10px] text-slate-400 font-mono">
                      Logged by {inq.customerName} • {new Date(inq.createdTime).toLocaleDateString()}
                    </div>
                  </div>
                ))
              )
            )}
          </div>
        </div>

        {/* Footer Quick Action */}
        <div className="pt-4 border-t border-slate-200">
          <button
            onClick={() => {
              onClose();
              onOpenAiPlanner();
            }}
            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm text-xs transition-all active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            <span>Create Custom Trip</span>
          </button>
        </div>

      </div>
    </div>
  );
};
