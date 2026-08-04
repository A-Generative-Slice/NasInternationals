import React, { useState } from 'react';
import { COMPANY_INFO } from '../lib/data';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Sparkles, Globe, Plane, Share2, MessageCircle } from 'lucide-react';
import { publishRealtime } from '../lib/realtime';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    serviceType: 'Visa Assistance',
    destination: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [activeCardTab, setActiveCardTab] = useState<'front' | 'back'>('front');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.phone) {
      publishRealtime({
        type: 'INQUIRY_SUBMITTED',
        payload: {
          serviceType: formData.serviceType,
          customerName: formData.name,
          phone: formData.phone,
          timestamp: new Date().toLocaleTimeString()
        },
        sender: formData.name
      });

      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
      setFormData({
        name: '',
        phone: '',
        email: '',
        serviceType: 'Visa Assistance',
        destination: '',
        message: ''
      });
    }
  };

  return (
    <section className="py-16 bg-slate-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>Official Business Contact</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white font-sans uppercase">
            CONTACT <span className="text-amber-400">NAS INTERNATIONALS</span>
          </h2>

          <p className="mt-3 text-slate-300 text-base sm:text-lg">
            Direct access to {COMPANY_INFO.director} ({COMPANY_INFO.designation}) and our main headquarters in Nungambakkam, Chennai.
          </p>
        </div>

        {/* Digital Business Card Feature Block */}
        <div className="mb-12 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Official Visiting Card</span>
            </h3>

            <div className="flex items-center gap-2 bg-slate-800 p-1 rounded-xl border border-slate-700 text-xs font-bold">
              <button
                onClick={() => setActiveCardTab('front')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeCardTab === 'front'
                    ? 'bg-amber-400 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Card Front (Contact)
              </button>
              <button
                onClick={() => setActiveCardTab('back')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeCardTab === 'back'
                    ? 'bg-amber-400 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Card Back (Services)
              </button>
            </div>
          </div>

          {/* Interactive Card Graphic Container */}
          <div className="relative overflow-hidden rounded-2xl border-2 border-amber-400/40 shadow-2xl bg-white text-slate-950 min-h-[300px] sm:min-h-[340px] flex flex-col justify-between transition-all">
            
            {activeCardTab === 'front' ? (
              // FRONT FACE OF BUSINESS CARD
              <div className="p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-stretch gap-6 h-full relative bg-white text-slate-900">
                {/* Left Geometric Design Accent */}
                <div className="hidden sm:block w-36 bg-slate-950 relative overflow-hidden rounded-xl p-4 flex flex-col justify-between shrink-0 border-r-2 border-amber-400">
                  <div className="w-20 h-20 border-2 border-amber-400 rotate-45 transform -translate-x-6 -translate-y-6 opacity-80" />
                  <div className="w-20 h-20 border-2 border-amber-400 rotate-45 transform translate-x-2 translate-y-6 opacity-80" />
                  <div className="text-amber-400 font-black text-xs uppercase tracking-widest text-center z-10">
                    NAS
                  </div>
                </div>

                {/* Right Card Contact Content */}
                <div className="flex-1 flex flex-col justify-between text-right sm:text-right space-y-4">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 font-sans uppercase">
                      {COMPANY_INFO.director}
                    </h3>
                    <p className="text-sm font-semibold text-slate-600 uppercase tracking-wider">
                      {COMPANY_INFO.designation}
                    </p>
                  </div>

                  <div className="space-y-2 text-xs sm:text-sm font-semibold text-slate-800">
                    <div className="flex items-center justify-end gap-2 text-slate-900">
                      <span>{COMPANY_INFO.phone}</span>
                      <Phone className="w-4 h-4 text-slate-900 shrink-0" />
                    </div>

                    <div className="flex items-center justify-end gap-2 text-slate-900">
                      <span>{COMPANY_INFO.landline}</span>
                      <Phone className="w-4 h-4 text-slate-900 shrink-0" />
                    </div>

                    <div className="flex items-center justify-end gap-2 text-slate-900">
                      <a href={`mailto:${COMPANY_INFO.email}`} className="hover:underline">{COMPANY_INFO.email}</a>
                      <Mail className="w-4 h-4 text-slate-900 shrink-0" />
                    </div>

                    <div className="flex items-center justify-end gap-2 text-slate-900">
                      <a href={`https://${COMPANY_INFO.website}`} target="_blank" rel="noreferrer" className="hover:underline">{COMPANY_INFO.website}</a>
                      <Globe className="w-4 h-4 text-slate-900 shrink-0" />
                    </div>

                    <div className="flex items-center justify-end gap-2 text-slate-700 text-xs">
                      <span>{COMPANY_INFO.socialHandle} (FB/IG/TW/YT)</span>
                      <Share2 className="w-3.5 h-3.5 text-slate-700 shrink-0" />
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-3 text-[11px] sm:text-xs text-slate-700 leading-snug">
                    <p className="font-semibold">{COMPANY_INFO.address}</p>
                  </div>
                </div>
              </div>
            ) : (
              // BACK FACE OF BUSINESS CARD
              <div className="p-6 sm:p-8 flex flex-col justify-between items-center text-center h-full bg-white text-slate-900 relative">
                {/* Top Corner Geometric Accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-slate-950 rounded-bl-full border-l-2 border-b-2 border-amber-400 overflow-hidden" />

                {/* Logo & Brand Header */}
                <div className="pt-4 z-10">
                  <div className="inline-flex items-center justify-center gap-2 mb-1">
                    <div className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center font-black shadow-md">
                      <Plane className="w-6 h-6 transform -rotate-12" />
                    </div>
                    <span className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
                      NAS
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-wider uppercase font-sans">
                    NAS INTERNATIONALS
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-amber-600 tracking-widest uppercase">
                    TOURS & TRAVELS
                  </p>
                  <p className="text-xs font-black tracking-widest text-slate-800 uppercase mt-2 border-y border-slate-300 py-1">
                    {COMPANY_INFO.tagline}
                  </p>
                </div>

                {/* List of Services */}
                <div className="my-6 max-w-2xl">
                  <div className="flex flex-wrap justify-center gap-2 text-[11px] sm:text-xs font-bold text-slate-800 uppercase">
                    {COMPANY_INFO.services.map((srv, idx) => (
                      <span key={idx} className="bg-slate-100 px-3 py-1 rounded-md border border-slate-300 shadow-sm">
                        {srv}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-[10px] text-slate-500 uppercase font-semibold">
                  Nungambakkam • Chennai • Tamilnadu
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Main Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Contact Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-slate-800/90 p-6 rounded-3xl border border-slate-700 shadow-xl flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Phone & WhatsApp Direct</h3>
                <p className="text-xs text-slate-400 mb-2">Connect with {COMPANY_INFO.director} & Travel Specialists</p>
                <a 
                  href={`tel:${COMPANY_INFO.phone}`} 
                  className="text-amber-400 text-xl font-black hover:underline block mb-1"
                >
                  {COMPANY_INFO.phone}
                </a>
                <p className="text-xs text-slate-300">
                  Landline: <strong className="text-white">{COMPANY_INFO.landline}</strong>
                </p>
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent('Hello NAS Internationals, I would like to inquire about visa/tours.')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 mt-3 px-3.5 py-1.5 bg-emerald-500 text-slate-950 text-xs font-bold rounded-xl hover:bg-emerald-400 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="bg-slate-800/90 p-6 rounded-3xl border border-slate-700 shadow-xl flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-500 text-slate-950 flex items-center justify-center font-bold shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Email & Website</h3>
                <p className="text-xs text-slate-400 mb-2">For official document verifications & agency bookings</p>
                <a 
                  href={`mailto:${COMPANY_INFO.email}`} 
                  className="text-sky-400 text-base font-bold hover:underline block mb-1"
                >
                  {COMPANY_INFO.email}
                </a>
                <p className="text-xs text-slate-300">
                  Website: <strong className="text-white">{COMPANY_INFO.website}</strong>
                </p>
              </div>
            </div>

            <div className="bg-slate-800/90 p-6 rounded-3xl border border-slate-700 shadow-xl flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Headquarters Office</h3>
                <p className="text-sm text-slate-200 font-medium leading-relaxed">
                  {COMPANY_INFO.address}
                </p>
                <div className="mt-3 text-xs text-slate-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Mon - Sat: 9:30 AM to 7:30 PM IST</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Inquiry Form */}
          <div className="lg:col-span-7 bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl relative">
            
            {submitted && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500 text-emerald-300 text-xs font-bold flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Thank you! Your inquiry has been submitted. Our team will call/WhatsApp you shortly!</span>
              </div>
            )}

            <h3 className="text-2xl font-bold text-white mb-2">Send Us an Inquiry</h3>
            <p className="text-xs text-slate-400 mb-6">Fill in your travel plan details and get immediate assistance from NAS Internationals.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Abdul Hakeem"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Mobile / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 99419 00055"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@gmail.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Service Requested</label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400"
                  >
                    <option value="Hajj & Umrah Package">Hajj & Umrah Package</option>
                    <option value="Visa Assistance">Visa Assistance</option>
                    <option value="Tour Package Booking">Tour Package Booking</option>
                    <option value="Air Ticket Booking">Air Ticket Booking</option>
                    <option value="Education Consultants">Education Consultants</option>
                    <option value="Documents Attestation">Documents Attestation</option>
                    <option value="All Your Travel Needs">All Your Travel Needs</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Destination Country / Purpose</label>
                <input
                  type="text"
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  placeholder="e.g. Saudi Arabia, Japan, France, Dubai, UK, Vietnam..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Travel Message / Questions</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us your travel dates, number of passengers..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-amber-400 text-slate-950 font-black text-sm sm:text-base hover:bg-amber-300 transition-all flex items-center justify-center gap-2 shadow-xl active:scale-95"
              >
                <Send className="w-5 h-5" />
                <span>Submit Inquiry to NAS Internationals</span>
              </button>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
