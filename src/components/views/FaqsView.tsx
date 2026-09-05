import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const FaqsView: React.FC = () => {
  const { navigateTo } = useApp();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How long does e-Visa processing take?',
      a: 'E-visa processing depends on the country, but most popular tourist e-visas (like Dubai, Thailand, Japan, and Vietnam) are processed within 24 to 72 hours through our 100% online portal.'
    },
    {
      q: 'Are any in-person visits or physical office appointments required?',
      a: 'No, absolutely not. NAS Internationals operates as a strictly online service. All applications, document submissions, biometric assistance guidance, and visa issuances are handled 100% digitally. You can complete your entire application from the comfort of your home.'
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
      q: 'Are tour package bookings inclusive of flight tickets?',
      a: 'Yes, our group tour packages include flights, accommodation, meals, transfers, and sightseeing, all bookable 100% online.'
    }
  ];

  return (
    <div className="w-full bg-[#F8FAFC] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#036CFB] block">GOT QUESTIONS?</span>
          <h1 className="text-4xl font-extrabold text-[#062544]">Frequently Asked Questions</h1>
          <p className="text-sm font-medium text-slate-600">Find quick answers to common visa, tour booking, and digital document questions.</p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden transition-all">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left p-6 font-extrabold text-base text-[#062544] flex items-center justify-between hover:bg-slate-50 cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <HelpCircle className="w-5 h-5 text-[#036CFB] shrink-0" />
                  <span>{faq.q}</span>
                </div>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${openIndex === index ? 'transform rotate-180 text-[#062544]' : ''}`} />
              </button>

              {openIndex === index && (
                <div className="px-6 pb-6 pt-2 text-xs font-semibold text-slate-600 leading-relaxed border-t border-slate-100">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Support CTA */}
        <div className="bg-[#062544] rounded-3xl p-8 text-center text-white space-y-4">
          <h3 className="text-2xl font-extrabold">Still have questions?</h3>
          <p className="text-xs text-slate-300 max-w-md mx-auto">Our visa experts are online 24/7 to clarify your doubts and guide your online application.</p>
          <button onClick={() => navigateTo('/contact')} className="px-8 py-3 bg-[#036CFB] hover:bg-blue-600 text-white font-extrabold text-xs rounded-full shadow-md transition-all cursor-pointer">
            Contact Online Support
          </button>
        </div>

      </div>
    </div>
  );
};
