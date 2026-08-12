import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, Headphones, CheckCircle2, Globe, Building2 } from 'lucide-react';

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
    <div className="w-full bg-[#F8FAFC]">
      
      {/* HERO SECTION */}
      <section className="bg-white py-14 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-3">
            <h1 className="text-4xl sm:text-5xl font-black text-[#062544] tracking-tight">
              Contact Us
            </h1>
            <p className="text-lg font-bold text-slate-500">
              NAS INTERNATIONALS TOURS & TRAVELS — We're here to help!
            </p>
          </div>

          {/* Right Support Agent Illustration Graphic */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm h-56 bg-[#F5B800]/10 rounded-3xl p-6 flex items-center justify-center border border-[#F5B800]/20">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-full bg-[#062544] text-[#F5B800] flex items-center justify-center mx-auto shadow-md">
                  <Headphones className="w-7 h-7" />
                </div>
                <h3 className="font-extrabold text-[#062544] text-base">Managing Director: N. ABDUL HAKEEM</h3>
                <p className="text-xs text-slate-600 font-bold text-[#F5B800]">LET'S EXPLORE THE WORLD</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SOLID YELLOW HORIZONTAL ACCENT DIVIDER BAR */}
      <div className="w-full h-3 bg-[#F5B800]"></div>

      {/* MAIN CONTENT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Main Card Container */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Contact Information */}
          <div className="lg:col-span-6 space-y-8">
            
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#F5B800] block">
                NAS INTERNATIONALS HEADQUARTERS
              </span>
              <h2 className="text-3xl font-extrabold text-[#062544]">
                Contact with Us for Your Any Help
              </h2>
              <p className="text-sm font-medium text-slate-600 leading-relaxed">
                <strong>Need Help With Your Visa, Umrah, or Tour Booking?</strong> : We're here to assist you at every step. Reach out with any questions we respond fast!
              </p>
            </div>

            {/* Information Cards from Official Business Card */}
            <div className="space-y-6">
              
              {/* Location Card */}
              <div className="flex items-start space-x-4 p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/60">
                <div className="w-12 h-12 rounded-2xl bg-[#062544] text-[#F5B800] flex items-center justify-center shrink-0 shadow-md">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-[#F5B800] text-sm uppercase">Official Office Address</h4>
                  <p className="text-xs font-bold text-slate-800 leading-relaxed mt-1">
                    No. 144/183, First Floor, Valluvarkottam High Road, <br />
                    Nungambakkam, Chennai - 600034, Tamilnadu, India
                  </p>
                </div>
              </div>

              {/* Phone Card */}
              <div className="flex items-start space-x-4 p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/60">
                <div className="w-12 h-12 rounded-2xl bg-[#062544] text-[#F5B800] flex items-center justify-center shrink-0 shadow-md">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-[#F5B800] text-sm uppercase">Direct Phone & WhatsApp</h4>
                  <p className="text-xs font-bold text-slate-800 leading-relaxed mt-1">
                    WhatsApp: <strong>+91 99419 00055</strong> 💬 <br />
                    Landline: <strong>044-26791505</strong> ☎
                  </p>
                </div>
              </div>

              {/* Email & Web Card */}
              <div className="flex items-start space-x-4 p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/60">
                <div className="w-12 h-12 rounded-2xl bg-[#062544] text-[#F5B800] flex items-center justify-center shrink-0 shadow-md">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-[#F5B800] text-sm uppercase">Email & Online Portal</h4>
                  <p className="text-xs font-bold text-slate-800 leading-relaxed mt-1">
                    Email: <strong>info@nasinternationals.com</strong> <br />
                    Website: <strong>www.nasinternationals.com</strong> <br />
                    Social: <strong>@officialnasinternationals</strong>
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Right Interactive Form */}
          <div className="lg:col-span-6 bg-[#F8FAFC] p-8 rounded-3xl border border-slate-200/80">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#062544]">Message Sent!</h3>
                <p className="text-xs text-slate-600 font-medium">Thank you for contacting NAS Internationals. Managing Director N. Abdul Hakeem & our specialist team will get back to you shortly.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-[#062544] text-white font-bold text-xs rounded-full"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-extrabold text-[#062544] mb-2">Send Us a Message</h3>
                
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium focus:outline-none focus:border-[#062544]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium focus:outline-none focus:border-[#062544]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 99419 00055"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium focus:outline-none focus:border-[#062544]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Service / Country Query</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Visa Assistance / Hajj & Umrah / Tour Packages"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium focus:outline-none focus:border-[#062544]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Message</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your requirement or travel inquiry here..."
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium focus:outline-none focus:border-[#062544]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#F5B800] hover:bg-[#e0a800] text-[#062544] font-extrabold text-xs rounded-full shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
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
