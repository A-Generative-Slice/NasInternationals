import React, { useState } from 'react';
import { TripPlan, DayItinerary, ActivityItem } from '../types';
import { Sparkles, X, Loader2, Compass, AlertCircle } from 'lucide-react';

interface AiPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportGeneratedTrip: (trip: TripPlan) => void;
}

export const AiPlannerModal: React.FC<AiPlannerModalProps> = ({
  isOpen,
  onClose,
  onImportGeneratedTrip
}) => {
  const [destination, setDestination] = useState('Dubai, UAE');
  const [days, setDays] = useState(5);
  const [budget, setBudget] = useState('Moderate');
  const [travelType, setTravelType] = useState('Family / Leisure');
  const [travelerCount, setTravelerCount] = useState(2);
  const [notes, setNotes] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/generate-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination,
          days,
          budget,
          travelType,
          travelerCount,
          notes
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate itinerary');
      }

      const raw = data.itinerary;
      
      // Convert raw output into full TripPlan
      const generatedDays: DayItinerary[] = (raw.days || []).map((d: any, idx: number) => {
        const activities: ActivityItem[] = [];
        
        if (d.morning) {
          activities.push({
            id: `act-${idx}-1`,
            time: '09:00 AM',
            type: 'sightseeing',
            title: d.morning,
            description: d.tips ? `Tip: ${d.tips}` : 'Morning tour',
            location: raw.destination,
            estimatedCostINR: Math.round((raw.estimatedCostINR || 45000) / (raw.durationDays * 3))
          });
        }

        if (d.afternoon) {
          activities.push({
            id: `act-${idx}-2`,
            time: '01:30 PM',
            type: 'meal',
            title: d.afternoon,
            description: 'Afternoon experience & dining',
            location: raw.destination,
            estimatedCostINR: Math.round((raw.estimatedCostINR || 45000) / (raw.durationDays * 4))
          });
        }

        if (d.evening) {
          activities.push({
            id: `act-${idx}-3`,
            time: '07:00 PM',
            type: 'activity',
            title: d.evening,
            description: d.hotelRecommendation ? `Recommended Hotel: ${d.hotelRecommendation}` : 'Evening entertainment',
            location: raw.destination,
            estimatedCostINR: Math.round((raw.estimatedCostINR || 45000) / (raw.durationDays * 3))
          });
        }

        return {
          dayNumber: d.day || (idx + 1),
          title: d.title || `Day ${idx + 1}: ${raw.destination} Sightseeing`,
          activities
        };
      });

      const shareCode = `NAS-${Math.floor(100000 + Math.random() * 900000)}`;
      const importedTrip: TripPlan = {
        id: `trip-ai-${Date.now()}`,
        shareCode,
        title: raw.title || `${days}-Day ${destination} Itinerary`,
        destination: raw.destination || destination,
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + days * 86400000).toISOString().split('T')[0],
        travelersCount: Number(travelerCount),
        budgetLevel: budget.toLowerCase() as any,
        days: generatedDays.length > 0 ? generatedDays : [
          {
            dayNumber: 1,
            title: `Day 1: Arrival in ${destination}`,
            activities: [
              {
                id: 'act-fall-1',
                time: '10:00 AM',
                type: 'flight',
                title: `Flight to ${destination}`,
                description: 'NAS Assisted flight booking',
                estimatedCostINR: 20000
              }
            ]
          }
        ],
        totalEstimatedCostINR: raw.estimatedCostINR || days * 12000,
        lastUpdated: new Date().toISOString(),
        updatedBy: 'NAS Travel Engine'
      };

      onImportGeneratedTrip(importedTrip);
      onClose();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Something went wrong while generating itinerary');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-scaleUp text-slate-900">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-amber-600">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-serif text-slate-900">Smart Custom Trip Generator</h3>
            <p className="text-xs text-slate-500">Powered by NAS Travel Engine</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-xl flex items-center gap-2 font-medium">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Destination</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g. Dubai, Makkah & Madinah, Paris, Kerala..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-600 focus:bg-white"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Duration (Days)</label>
              <input
                type="number"
                min={1}
                max={30}
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-sky-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Travelers</label>
              <input
                type="number"
                min={1}
                max={20}
                value={travelerCount}
                onChange={(e) => setTravelerCount(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-sky-600 focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Budget Tier</label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-sky-600 focus:bg-white"
              >
                <option value="Economy">Economy / Budget</option>
                <option value="Moderate">Moderate / Standard</option>
                <option value="Luxury">Luxury / 5-Star</option>
                <option value="VIP Pilgrimage">VIP Pilgrimage</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Travel Style</label>
              <select
                value={travelType}
                onChange={(e) => setTravelType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-sky-600 focus:bg-white"
              >
                <option value="Family / Leisure">Family / Leisure</option>
                <option value="Hajj & Umrah Pilgrimage">Hajj & Umrah Pilgrimage</option>
                <option value="Honeymoon & Romantic">Honeymoon & Romantic</option>
                <option value="Corporate / Business">Corporate / Business</option>
                <option value="Adventure & Culture">Adventure & Culture</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Special Preferences / Requirements</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder="e.g. Halal food requirements, wheelchair access, shopping time..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-600 focus:bg-white"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Structuring Custom Itinerary...</span>
                </>
              ) : (
                <>
                  <Compass className="w-5 h-5" />
                  <span>Generate Custom Itinerary</span>
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
