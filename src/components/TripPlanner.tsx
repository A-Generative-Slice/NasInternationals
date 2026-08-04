import React, { useState, useEffect } from 'react';
import { TripPlan, DayItinerary, ActivityItem } from '../types';
import { COMPANY_INFO } from '../lib/data';
import { saveTripToStore, subscribeRealtime, RealtimeMessage } from '../lib/realtime';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Plus, 
  Trash2, 
  Share2, 
  Printer, 
  Send, 
  Plane, 
  Hotel, 
  Utensils, 
  Camera, 
  Car, 
  FileText, 
  Sparkles, 
  Radio, 
  Users, 
  IndianRupee, 
  Check, 
  Copy,
  Edit2
} from 'lucide-react';

interface TripPlannerProps {
  currentTrip: TripPlan;
  onTripChange: (updatedTrip: TripPlan) => void;
  onOpenAiModal: () => void;
  onOpenBookingModal: (serviceName: string, details: string) => void;
}

export const TripPlanner: React.FC<TripPlannerProps> = ({
  currentTrip,
  onTripChange,
  onOpenAiModal,
  onOpenBookingModal
}) => {
  const [activeDayIdx, setActiveDayIdx] = useState<number>(0);
  const [copiedCode, setCopiedCode] = useState(false);
  const [liveEditNotice, setLiveEditNotice] = useState<string | null>(null);

  // New Activity Modal State
  const [showAddActivityModal, setShowAddActivityModal] = useState(false);
  const [newActivity, setNewActivity] = useState<Partial<ActivityItem>>({
    time: '10:00 AM',
    type: 'sightseeing',
    title: '',
    description: '',
    location: '',
    estimatedCostINR: 1000
  });

  // Listen for real-time live trip updates from other tabs
  useEffect(() => {
    const unsub = subscribeRealtime((msg: RealtimeMessage) => {
      if ((msg.type === 'TRIP_UPDATED' || msg.type === 'TRIP_CREATED') && msg.payload.id === currentTrip.id) {
        onTripChange(msg.payload);
        setLiveEditNotice(`Live sync: Trip updated by ${msg.sender} at ${new Date(msg.timestamp).toLocaleTimeString()}`);
        setTimeout(() => setLiveEditNotice(null), 5000);
      }
    });
    return unsub;
  }, [currentTrip.id, onTripChange]);

  const activeDay: DayItinerary | undefined = currentTrip.days[activeDayIdx] || currentTrip.days[0];

  // Recalculate Total Budget
  const totalCost = currentTrip.days.reduce((accDay, day) => {
    return accDay + day.activities.reduce((accAct, act) => accAct + (act.estimatedCostINR || 0), 0);
  }, 0);

  const handleCopyShareCode = () => {
    navigator.clipboard.writeText(`NAS Internationals Plan: ${currentTrip.title} (Code: ${currentTrip.shareCode})`);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleAddDay = () => {
    const nextDayNum = currentTrip.days.length + 1;
    const newDay: DayItinerary = {
      dayNumber: nextDayNum,
      title: `Day ${nextDayNum}: Explore & Discover`,
      activities: []
    };
    const updatedTrip = {
      ...currentTrip,
      days: [...currentTrip.days, newDay]
    };
    saveTripToStore(updatedTrip, 'Traveler');
    onTripChange(updatedTrip);
    setActiveDayIdx(currentTrip.days.length);
  };

  const handleDeleteDay = (dayIdx: number) => {
    if (currentTrip.days.length <= 1) return;
    const updatedDays = currentTrip.days.filter((_, idx) => idx !== dayIdx).map((d, index) => ({
      ...d,
      dayNumber: index + 1
    }));
    const updatedTrip = {
      ...currentTrip,
      days: updatedDays
    };
    saveTripToStore(updatedTrip, 'Traveler');
    onTripChange(updatedTrip);
    setActiveDayIdx(Math.max(0, dayIdx - 1));
  };

  const handleCreateActivitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActivity.title) return;

    const createdActivity: ActivityItem = {
      id: `act-${Date.now()}`,
      time: newActivity.time || '10:00 AM',
      type: newActivity.type || 'sightseeing',
      title: newActivity.title,
      description: newActivity.description || '',
      location: newActivity.location || '',
      estimatedCostINR: Number(newActivity.estimatedCostINR) || 0
    };

    const updatedDays = [...currentTrip.days];
    updatedDays[activeDayIdx] = {
      ...updatedDays[activeDayIdx],
      activities: [...updatedDays[activeDayIdx].activities, createdActivity]
    };

    const updatedTrip = {
      ...currentTrip,
      days: updatedDays
    };

    saveTripToStore(updatedTrip, 'User Edit');
    onTripChange(updatedTrip);

    setShowAddActivityModal(false);
    setNewActivity({
      time: '10:00 AM',
      type: 'sightseeing',
      title: '',
      description: '',
      location: '',
      estimatedCostINR: 1000
    });
  };

  const handleDeleteActivity = (actId: string) => {
    const updatedDays = [...currentTrip.days];
    updatedDays[activeDayIdx] = {
      ...updatedDays[activeDayIdx],
      activities: updatedDays[activeDayIdx].activities.filter((a) => a.id !== actId)
    };
    const updatedTrip = {
      ...currentTrip,
      days: updatedDays
    };
    saveTripToStore(updatedTrip, 'User Edit');
    onTripChange(updatedTrip);
  };

  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'flight': return <Plane className="w-4 h-4 text-sky-400" />;
      case 'hotel': return <Hotel className="w-4 h-4 text-amber-400" />;
      case 'meal': return <Utensils className="w-4 h-4 text-emerald-400" />;
      case 'sightseeing': return <Camera className="w-4 h-4 text-purple-400" />;
      case 'transfer': return <Car className="w-4 h-4 text-indigo-400" />;
      default: return <FileText className="w-4 h-4 text-slate-400" />;
    }
  };

  const handleSendToWhatsApp = () => {
    const message = `Hello NAS Internationals! I created a trip itinerary on your live planner:
Title: ${currentTrip.title}
Destination: ${currentTrip.destination}
Duration: ${currentTrip.days.length} Days (${currentTrip.travelersCount} Travelers)
Share Code: ${currentTrip.shareCode}
Total Estimated Cost: ₹${totalCost.toLocaleString('en-IN')}

Please assist with flight booking, hotel vouchers, and visa processing.`;
    window.open(`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
      
      {/* Top Planner Control Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 mb-6 shadow-sm text-slate-900">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-amber-100 text-amber-900 text-xs font-mono font-bold px-2.5 py-1 rounded-full border border-amber-300 flex items-center gap-1">
                <Radio className="w-3 h-3 text-amber-600 animate-pulse" />
                <span>CODE: {currentTrip.shareCode}</span>
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Last updated by <strong className="text-slate-800">{currentTrip.updatedBy}</strong>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 mt-2">
              {currentTrip.title}
            </h2>
            <p className="text-sm text-slate-600 flex items-center gap-2 mt-1">
              <MapPin className="w-4 h-4 text-red-500" />
              <span>{currentTrip.destination}</span>
              <span>•</span>
              <Users className="w-4 h-4 text-sky-600" />
              <span>{currentTrip.travelersCount} Travelers</span>
            </p>
          </div>

          {/* Quick Actions & Cost summary */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200 text-left">
              <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold block">Estimated Total</span>
              <span className="text-xl font-black text-slate-900 font-mono">
                ₹{totalCost.toLocaleString('en-IN')}
              </span>
            </div>

            <button
              onClick={onOpenAiModal}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-sky-50 border border-sky-300 text-sky-700 text-xs font-bold hover:bg-sky-100 transition-all shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-sky-600" />
              <span>Re-Generate Itinerary</span>
            </button>

            <button
              onClick={handleCopyShareCode}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-100 border border-slate-300 text-slate-800 text-xs font-semibold hover:bg-slate-200 transition-colors"
            >
              {copiedCode ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4 text-amber-600" />}
              <span>{copiedCode ? 'Copied!' : 'Share Live Code'}</span>
            </button>

            <button
              onClick={handleSendToWhatsApp}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>WhatsApp NAS Agent</span>
            </button>
          </div>
        </div>

        {/* Realtime Live Edit Toast Banner */}
        {liveEditNotice && (
          <div className="mt-4 bg-sky-50 border border-sky-200 text-sky-800 text-xs px-4 py-2 rounded-xl flex items-center justify-between animate-fadeIn font-medium">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-sky-600 animate-spin" />
              <span>{liveEditNotice}</span>
            </div>
          </div>
        )}
      </div>

      {/* Main Itinerary Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Day Selector Sidebar */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-sky-600" />
              <span>Itinerary Timeline ({currentTrip.days.length} Days)</span>
            </h3>

            <button
              onClick={handleAddDay}
              className="flex items-center gap-1 text-xs text-sky-700 font-bold hover:text-sky-800 bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-200 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Day</span>
            </button>
          </div>

          <div className="space-y-2">
            {currentTrip.days.map((day, idx) => (
              <div
                key={idx}
                onClick={() => setActiveDayIdx(idx)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                  activeDayIdx === idx
                    ? 'bg-sky-600 border-sky-600 shadow-md text-white'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-8 h-8 rounded-lg font-bold text-xs flex items-center justify-center shrink-0 ${
                    activeDayIdx === idx ? 'bg-white text-sky-600' : 'bg-slate-100 text-slate-700'
                  }`}>
                    D{day.dayNumber}
                  </div>
                  <div className="truncate">
                    <h4 className="text-sm font-semibold truncate">{day.title}</h4>
                    <p className={`text-xs ${activeDayIdx === idx ? 'text-sky-100' : 'text-slate-500'}`}>{day.activities.length} Events planned</p>
                  </div>
                </div>

                {currentTrip.days.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteDay(idx);
                    }}
                    className={`p-1.5 rounded transition-colors ${
                      activeDayIdx === idx ? 'text-sky-200 hover:text-white hover:bg-sky-700' : 'text-slate-400 hover:text-red-500 hover:bg-slate-100'
                    }`}
                    title="Delete Day"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Quick Package Quote Request Box */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 text-left shadow-sm">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Ready for Booking Vouchers?</span>
            </h4>
            <p className="text-xs text-slate-600 mt-1">
              Let NAS Internationals handle your flight ticketing, hotel reservations, and visa processing at best market rates.
            </p>
            <button
              onClick={() => onOpenBookingModal('Custom Trip Itinerary', `Trip: ${currentTrip.title} (${currentTrip.shareCode})`)}
              className="mt-3 w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-all shadow-sm"
            >
              Get Official Quote & Book
            </button>
          </div>
        </div>

        {/* Day Activities Detailed Timeline View */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-sm">
          
          {activeDay ? (
            <div>
              {/* Active Day Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-4 mb-6 gap-2">
                <div>
                  <span className="text-xs font-bold text-sky-600 uppercase tracking-widest">
                    DAY {activeDay.dayNumber} TIMELINE
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">{activeDay.title}</h3>
                </div>

                <button
                  onClick={() => setShowAddActivityModal(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-600 text-white text-xs font-bold hover:bg-sky-700 transition-all shadow-sm active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Activity</span>
                </button>
              </div>

              {/* Activity Timeline List */}
              {activeDay.activities.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl">
                  <Camera className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-600">No activities added for Day {activeDay.dayNumber} yet.</p>
                  <button
                    onClick={() => setShowAddActivityModal(true)}
                    className="mt-3 text-xs text-sky-600 font-bold hover:underline"
                  >
                    + Add first activity item
                  </button>
                </div>
              ) : (
                <div className="relative border-l-2 border-slate-200 ml-4 space-y-6 pl-6 py-2">
                  {activeDay.activities.map((act) => (
                    <div key={act.id} className="relative group">
                      
                      {/* Timeline Dot Icon */}
                      <div className="absolute -left-[35px] top-1 w-8 h-8 rounded-full bg-white border-2 border-slate-300 flex items-center justify-center group-hover:border-sky-600 transition-colors shadow-sm">
                        {getActivityIcon(act.type)}
                      </div>

                      {/* Content Card */}
                      <div className="bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl p-4 transition-all shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2.5 mb-2.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold bg-white px-2 py-0.5 rounded text-sky-700 border border-slate-200 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {act.time}
                            </span>
                            <span className="text-xs text-slate-600 capitalize font-medium px-2 py-0.5 rounded bg-slate-200">
                              {act.type}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            {act.estimatedCostINR !== undefined && act.estimatedCostINR > 0 && (
                              <span className="text-xs font-bold text-slate-900 font-mono">
                                ₹{act.estimatedCostINR.toLocaleString('en-IN')}
                              </span>
                            )}
                            <button
                              onClick={() => handleDeleteActivity(act.id)}
                              className="text-slate-400 hover:text-red-600 p-1 transition-colors"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <h4 className="text-sm font-bold text-slate-900">{act.title}</h4>
                        {act.description && (
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed">{act.description}</p>
                        )}
                        {act.location && (
                          <div className="mt-2 text-[11px] text-slate-500 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-red-500" />
                            <span>{act.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="text-slate-400 text-center py-10">Select a day to view timeline</div>
          )}

        </div>
      </div>

      {/* Add Activity Modal */}
      {showAddActivityModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl animate-scaleUp">
            <h3 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5 text-amber-400" />
              <span>Add Event for Day {activeDay?.dayNumber}</span>
            </h3>

            <form onSubmit={handleCreateActivitySubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-slate-400 font-medium mb-1">Time</label>
                <input
                  type="text"
                  value={newActivity.time}
                  onChange={(e) => setNewActivity({ ...newActivity, time: e.target.value })}
                  placeholder="e.g. 09:30 AM"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-400 font-medium mb-1">Event Type</label>
                  <select
                    value={newActivity.type}
                    onChange={(e) => setNewActivity({ ...newActivity, type: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                  >
                    <option value="sightseeing">Sightseeing</option>
                    <option value="flight">Flight</option>
                    <option value="hotel">Hotel</option>
                    <option value="meal">Meal</option>
                    <option value="transfer">Transfer</option>
                    <option value="note">Note</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 font-medium mb-1">Est. Cost (₹)</label>
                  <input
                    type="number"
                    value={newActivity.estimatedCostINR}
                    onChange={(e) => setNewActivity({ ...newActivity, estimatedCostINR: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={newActivity.title}
                  onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
                  placeholder="e.g. Visit Burj Khalifa Observation Deck"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 font-medium mb-1">Location / Venue</label>
                <input
                  type="text"
                  value={newActivity.location}
                  onChange={(e) => setNewActivity({ ...newActivity, location: e.target.value })}
                  placeholder="e.g. Downtown Dubai"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 font-medium mb-1">Description / Notes</label>
                <textarea
                  value={newActivity.description}
                  onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
                  rows={2}
                  placeholder="Additional details..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddActivityModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-all shadow-md"
                >
                  Save Activity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
