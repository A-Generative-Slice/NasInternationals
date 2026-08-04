import React, { useState } from 'react';
import { Plane, X, Send, Calendar, Users, MapPin } from 'lucide-react';
import { COMPANY_INFO } from '../lib/data';

interface FlightSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitInquiry: (serviceName: string, details: string) => void;
}

export const FlightSearchModal: React.FC<FlightSearchModalProps> = ({
  isOpen,
  onClose,
  onSubmitInquiry
}) => {
  const [tripType, setTripType] = useState<'oneWay' | 'roundTrip'>('roundTrip');
  const [fromCity, setFromCity] = useState('Chennai (MAA)');
  const [toCity, setToCity] = useState('Dubai (DXB)');
  const [departDate, setDepartDate] = useState('2026-10-15');
  const [returnDate, setReturnDate] = useState('2026-10-22');
  const [passengers, setPassengers] = useState(1);
  const [travelClass, setTravelClass] = useState('Economy');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const flightDetails = `Flight Search Request: ${tripType === 'roundTrip' ? 'Round Trip' : 'One Way'}
Route: ${fromCity} ➔ ${toCity}
Dates: ${departDate} ${tripType === 'roundTrip' ? `to ${returnDate}` : ''}
Passengers: ${passengers} (${travelClass})`;

    onSubmitInquiry('Air Ticket Search Request', flightDetails);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-scaleUp text-slate-900">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-amber-600">
            <Plane className="w-6 h-6 transform -rotate-12" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-serif text-slate-900">Air Ticket Flight Booking Desk</h3>
            <p className="text-xs text-slate-500">Best Fare Guarantee • NAS International Direct Agent</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 w-fit">
            <button
              type="button"
              onClick={() => setTripType('roundTrip')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                tripType === 'roundTrip' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-600'
              }`}
            >
              Round Trip
            </button>
            <button
              type="button"
              onClick={() => setTripType('oneWay')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                tripType === 'oneWay' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-600'
              }`}
            >
              One Way
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">From Airport / City</label>
              <input
                type="text"
                value={fromCity}
                onChange={(e) => setFromCity(e.target.value)}
                placeholder="e.g. Chennai (MAA)"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-600 focus:bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">To Airport / Destination</label>
              <input
                type="text"
                value={toCity}
                onChange={(e) => setToCity(e.target.value)}
                placeholder="e.g. Dubai (DXB)"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-600 focus:bg-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Departure Date</label>
              <input
                type="date"
                value={departDate}
                onChange={(e) => setDepartDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-sky-600 focus:bg-white"
                required
              />
            </div>

            {tripType === 'roundTrip' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Return Date</label>
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-sky-600 focus:bg-white"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Passengers</label>
              <input
                type="number"
                min={1}
                max={15}
                value={passengers}
                onChange={(e) => setPassengers(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-sky-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Cabin Class</label>
              <select
                value={travelClass}
                onChange={(e) => setTravelClass(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-sky-600 focus:bg-white"
              >
                <option value="Economy">Economy</option>
                <option value="Premium Economy">Premium Economy</option>
                <option value="Business">Business Class</option>
                <option value="First Class">First Class</option>
              </select>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 text-xs sm:text-sm"
            >
              <Send className="w-4 h-4" />
              <span>Get Instant Lowest Flight Quote</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
