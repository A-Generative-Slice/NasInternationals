import React, { useState } from 'react';
import { TRIPATE_FAQS } from '../lib/data';
import { HelpCircle, ChevronDown, Sparkles, MessageSquare } from 'lucide-react';

export const FaqsSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const toggleFaq = (id: string) => {
    setOpenId(prev => prev === id ? null : id);
  };

  return (
    <section className="py-16 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>Got Questions? We Have Answers</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-serif uppercase">
            FREQUENTLY ASKED QUESTIONS
          </h2>

          <p className="mt-2 text-slate-600 text-base">
            Everything you need to know about processing visas online with NAS Internationals.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {TRIPATE_FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen ? 'bg-amber-50/50 border-amber-300 shadow-sm' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-base sm:text-lg focus:outline-none"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-amber-400/20 text-amber-700 flex items-center justify-center text-xs font-black shrink-0">
                      ?
                    </span>
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-amber-600' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-amber-200/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Live Support Box */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-amber-400 shrink-0" />
            <div>
              <p className="font-bold text-base">Still have questions?</p>
              <p className="text-xs text-slate-300">Speak directly to our visa concierge team on WhatsApp (+91 91709708777).</p>
            </div>
          </div>
          <a
            href="https://wa.me/9191709708777"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-colors whitespace-nowrap shadow-md"
          >
            Chat on WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
};
