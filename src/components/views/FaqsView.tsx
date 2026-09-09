import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const FaqsView: React.FC = () => {
  const { navigateTo } = useApp();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How long does e-Visa processing take?',
      a: 'E-visa processing depends on the country, but most popular tourist e-visas (like Dubai, Thailand, Japan, and Vietnam) are processed within 24 to 72 hours through our direct digital portal.'
    },
    {
      q: 'Are any in-person visits or physical office appointments required?',
      a: 'No, absolutely not. NAS Internationals operates as a strictly online service. All applications, document submissions, biometric assistance guidance, and visa issuances are handled digitally. You can complete your entire application from the comfort of your home.'
    },
    {
      q: 'Can I track my visa application status online?',
      a: 'Yes! After applying with NAS Internationals, you get access to your real-time User Dashboard and Payment Tracker where you can view every step from document verification to approval.'
    },
    {
      q: 'What happens if my document is rejected by embassy specifications?',
      a: 'Our specialist team checks all uploaded documents before submission. If any photo or document fails specification, we will notify you immediately in your dashboard with re-upload instructions.'
    },
    {
      q: 'Can you assist with flight reservations and airline ticketing?',
      a: 'Yes! We provide complete domestic and international air ticketing across all airlines with instant e-ticket issuance and 24/7 rescheduling assistance.'
    },
    {
      q: 'How does online Document Attestation work?',
      a: 'You can submit scanned copies for preliminary verification. We coordinate end-to-end MEA, HRD, apostille, and foreign embassy attestation with secure doorstep collection and delivery.'
    },
    {
      q: 'What education consultancy services do you offer for overseas studies?',
      a: 'We provide university selection, application vetting, statement of purpose (SOP) guidance, and complete student visa filing for top study destinations worldwide.'
    }
  ];

  return (
    <div className="w-full bg-[#F8FAFC] py-8 sm:py-14 relative overflow-hidden min-h-screen pb-28 lg:pb-16 px-3.5 xs:px-4 sm:px-6 lg:px-8">
      {/* Ambient luminous glow blobs */}
      <div className="ambient-glow-blue top-12 left-1/4 -translate-x-1/2"></div>
      <div className="ambient-glow-sky top-96 right-10"></div>

      <div className="max-w-4xl mx-auto space-y-8 sm:space-y-12 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-2.5 sm:space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-pill text-[#036CFB] text-xs font-bold shadow-xs">
            <span>GOT QUESTIONS? WE HAVE ANSWERS</span>
          </div>
          <h1 className="text-2xl xs:text-3xl sm:text-4xl font-black text-[#062544] tracking-tight">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#036CFB] via-[#0284C7] to-[#38BDF8]">Questions</span>
          </h1>
          <p className="text-xs sm:text-sm font-medium text-slate-600 max-w-md mx-auto">Find quick answers to common visa, air ticketing, document attestation, and education consultancy questions.</p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="glass-frost rounded-2xl sm:rounded-3xl border border-white/80 shadow-sm overflow-hidden transition-all backdrop-blur-xl">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left p-4 xs:p-5 sm:p-6 font-extrabold text-xs xs:text-sm sm:text-base text-[#062544] flex items-center justify-between hover:bg-white/40 cursor-pointer min-h-[48px]"
              >
                <div className="flex items-center space-x-3 pr-4">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#036CFB] flex items-center justify-center shrink-0">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <span>{faq.q}</span>
                </div>
                <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${openIndex === index ? 'transform rotate-180 text-[#036CFB]' : ''}`} />
              </button>

              {openIndex === index && (
                <div className="px-6 pb-6 pt-2 text-xs font-semibold text-slate-600 leading-relaxed border-t border-slate-200/60">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Support CTA */}
        <div className="glass-frost-navy rounded-2xl sm:rounded-3xl p-5 xs:p-6 sm:p-8 text-center text-white space-y-4 border border-white/15 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#036CFB]/30 rounded-full blur-2xl pointer-events-none"></div>
          <div className="relative z-10 space-y-3">
            <h3 className="text-xl xs:text-2xl font-extrabold tracking-tight">Still have questions?</h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">Our visa experts are online 24/7 to clarify your doubts and guide your online application.</p>
            <button
              onClick={() => navigateTo('/contact')}
              className="px-8 py-3.5 bg-gradient-to-r from-[#036CFB] to-[#0284C7] hover:from-[#0256c7] hover:to-[#036CFB] active:scale-95 text-white font-extrabold text-xs rounded-full shadow-lg shadow-[#036CFB]/30 transition-all cursor-pointer min-h-[44px]"
            >
              Contact Online Support
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
