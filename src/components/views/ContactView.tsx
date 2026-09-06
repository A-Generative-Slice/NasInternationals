import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, Headphones, CheckCircle2, Globe, Building2 } from 'lucide-react';
import logoImg from '../../assets/logo.jpg';

export const ContactView: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-[#F8FAFC] relative overflow-hidden min-h-screen pb-28 lg:pb-16">
      {/* Ambient background glow blobs for frosted glass reflections */}
      <div className="ambient-glow-blue top-12 left-1/4 -translate-x-1/2"></div>
      <div className="ambient-glow-sky top-96 right-10"></div>
      <div className="ambient-glow-blue bottom-32 left-10"></div>

      {/* HERO SECTION */}
      <section className="relative py-8 sm:py-14 border-b border-white/60">
        <div className="max-w-7xl mx-auto px-3.5 xs:px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center relative z-10">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-3 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-pill text-[#036CFB] text-xs font-bold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#036CFB] animate-pulse"></span>
              <span>24/7 Digital Support Helpdesk</span>
            </div>

            <h1 className="text-3xl xs:text-4xl sm:text-5xl font-black text-[#062544] tracking-tight">
              Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#036CFB] via-[#0284C7] to-[#38BDF8]">Us</span>
            </h1>
            <p className="text-sm sm:text-lg font-bold text-slate-500">
              NAS INTERNATIONALS — We're here to help!
            </p>
          </div>

          {/* Right Support Agent Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm glass-frost-navy rounded-3xl p-6 text-white border border-white/15 shadow-2xl overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#036CFB]/30 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500"></div>
              <div className="relative z-10 text-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-white p-1.5 flex items-center justify-center mx-auto shadow-lg shadow-[#036CFB]/30 overflow-hidden">
                  <img src={logoImg} alt="NAS Internationals Logo" className="w-full h-full object-contain" />
                </div>
                <h3 className="font-extrabold text-white text-base tracking-tight">Managing Director: N. ABDUL HAKEEM</h3>
                <p className="text-xs text-[#38BDF8] font-bold">100% ONLINE VISA & TRAVEL SUPPORT</p>
                <div className="pt-1 flex items-center justify-center space-x-2 text-[11px] font-bold text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Instant Response on WhatsApp & Phone</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT SECTION */}
      <section className="max-w-7xl mx-auto px-3.5 xs:px-4 sm:px-6 lg:px-8 py-8 sm:py-14 relative z-10">
        
        {/* Main Card Container */}
        <div className="glass-frost rounded-2xl sm:rounded-3xl p-4 xs:p-6 sm:p-10 lg:p-12 border border-white/80 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 backdrop-blur-2xl">
          
          {/* Left Contact Information */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            
            <div className="space-y-2.5 text-center sm:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-[#036CFB] block">
                Digital Client Support Desk
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#062544]">
                Online Support & Consultation
              </h2>
              <p className="text-xs sm:text-sm font-medium text-slate-600 leading-relaxed">
                <strong>Need Help With Visa Services, Air Ticketing, Document Attestation, or Education Consultancy?</strong> All our services are handled 100% digitally. Reach out directly via phone, WhatsApp, or email — zero in-person visits required.
              </p>
            </div>

            {/* Information Cards - Exclusively Mobile Number, Email Address, and Website URL */}
            <div className="space-y-3.5">
              
              {/* Phone / Mobile Card */}
              <div className="flex items-start space-x-3.5 sm:space-x-4 p-3.5 xs:p-5 rounded-2xl sm:rounded-3xl bg-white/70 backdrop-blur-md border border-white/80 shadow-sm hover:shadow-md transition-all">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-[#036CFB] to-[#0284C7] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#036CFB]/20">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-[#036CFB] text-[11px] sm:text-xs uppercase tracking-wider">Mobile Number & WhatsApp</h4>
                  <p className="text-sm font-bold text-slate-800 leading-relaxed mt-0.5">
                    <a href="tel:+919941900055" className="hover:text-[#036CFB] transition-colors inline-block">
                      +91 99419 00055
                    </a>
                  </p>
                  <span className="inline-block mt-1 text-[10px] xs:text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Active 24/7 on WhatsApp & Direct Call
                  </span>
                </div>
              </div>

              {/* Email Card */}
              <div className="flex items-start space-x-3.5 sm:space-x-4 p-3.5 xs:p-5 rounded-2xl sm:rounded-3xl bg-white/70 backdrop-blur-md border border-white/80 shadow-sm hover:shadow-md transition-all">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-[#036CFB] to-[#0284C7] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#036CFB]/20">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-[#036CFB] text-[11px] sm:text-xs uppercase tracking-wider">Email Address</h4>
                  <p className="text-sm font-bold text-slate-800 leading-relaxed mt-0.5">
                    <a href="mailto:info@nasinternationals.com" className="hover:text-[#036CFB] transition-colors inline-block break-all">
                      info@nasinternationals.com
                    </a>
                  </p>
                  <span className="inline-block mt-1 text-[10px] xs:text-[11px] text-blue-700 font-bold bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                    Fast email response within 2 hours
                  </span>
                </div>
              </div>

              {/* Website Portal Card */}
              <div className="flex items-start space-x-3.5 sm:space-x-4 p-3.5 xs:p-5 rounded-2xl sm:rounded-3xl bg-white/70 backdrop-blur-md border border-white/80 shadow-sm hover:shadow-md transition-all">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-[#036CFB] to-[#0284C7] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#036CFB]/20">
                  <Globe className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-[#036CFB] text-[11px] sm:text-xs uppercase tracking-wider">Official Website URL</h4>
                  <p className="text-sm font-bold text-slate-800 leading-relaxed mt-0.5">
                    <a href="https://www.nasinternationals.com" target="_blank" rel="noreferrer" className="hover:text-[#036CFB] transition-colors inline-block">
                      www.nasinternationals.com
                    </a>
                  </p>
                  <span className="inline-block mt-1 text-[10px] xs:text-[11px] text-sky-700 font-bold bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
                    100% Online Application & Document Upload
                  </span>
                </div>
              </div>

              {/* Strictly Online Guarantee Banner */}
              <div className="p-3.5 xs:p-4 rounded-2xl bg-blue-50/90 border border-blue-200/80 text-xs text-blue-950 space-y-1 backdrop-blur-md">
                <div className="flex items-center space-x-2 font-bold text-[#036CFB]">
                  <CheckCircle2 className="w-4 h-4 text-[#036CFB]" />
                  <span>Strictly Online Operations</span>
                </div>
                <p className="text-[11px] text-slate-600 pl-6 leading-relaxed">
                  No office visits, appointments, or physical paper queues required. Everything from visa eligibility, document verification, application submission to visa issuance happens directly through our online system.
                </p>
              </div>

            </div>

          </div>

          {/* Right Interactive Form */}
          <div className="lg:col-span-6 glass-frost-subtle p-4 xs:p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/90 shadow-lg">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#062544]">Message Sent!</h3>
                <p className="text-xs text-slate-600 font-medium max-w-sm mx-auto leading-relaxed">
                  Thank you for contacting NAS Internationals. Managing Director N. Abdul Hakeem & our specialist team will review your inquiry and get back to you shortly.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <a
                    href="https://wa.me/919941900055"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-full min-h-[44px] inline-flex items-center justify-center space-x-2 shadow-sm transition active:scale-95 cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Chat on WhatsApp Now</span>
                  </a>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="w-full sm:w-auto px-6 py-2.5 bg-[#062544] hover:bg-[#041A30] text-white font-bold text-xs rounded-full min-h-[44px] transition active:scale-95 cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1 mb-2">
                  <h3 className="text-xl font-extrabold text-[#062544]">Send Us a Message</h3>
                  <p className="text-xs text-slate-500 font-medium">Fill in your requirements for instant digital support.</p>
                </div>
                
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-bold text-slate-700 mb-1">Your Full Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full bg-white/90 border border-slate-200/90 rounded-2xl px-4 py-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#036CFB] focus:ring-2 focus:ring-[#036CFB]/20 min-h-[44px] transition focus-ring"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full bg-white/90 border border-slate-200/90 rounded-2xl px-4 py-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#036CFB] focus:ring-2 focus:ring-[#036CFB]/20 min-h-[44px] transition focus-ring"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 99419 00055"
                      className="w-full bg-white/90 border border-slate-200/90 rounded-2xl px-4 py-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#036CFB] focus:ring-2 focus:ring-[#036CFB]/20 min-h-[44px] transition focus-ring"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-bold text-slate-700 mb-1">Service / Country Query</label>
                  <input
                    id="contact-subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Visa Services / Air Ticketing / Document Attestation / Education Consultancy"
                    className="w-full bg-white/90 border border-slate-200/90 rounded-2xl px-4 py-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#036CFB] focus:ring-2 focus:ring-[#036CFB]/20 min-h-[44px] transition focus-ring"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-bold text-slate-700 mb-1">Your Message</label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your requirement or travel inquiry here..."
                    className="w-full bg-white/90 border border-slate-200/90 rounded-2xl px-4 py-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#036CFB] focus:ring-2 focus:ring-[#036CFB]/20 transition focus-ring"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-[#036CFB] to-[#0284C7] hover:from-[#0256c7] hover:to-[#036CFB] text-white font-extrabold text-xs rounded-full shadow-lg shadow-[#036CFB]/30 transition-all flex items-center justify-center space-x-2 cursor-pointer min-h-[48px] active:scale-98 focus-ring"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to NAS Internationals</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </section>

    </div>
  );
};
