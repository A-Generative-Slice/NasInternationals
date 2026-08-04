import React from 'react';
import { ShieldCheck, Award, Headphones, Compass, Sparkles, CheckCircle2 } from 'lucide-react';

export const WhyTripateSection: React.FC = () => {
  const FEATURES = [
    {
      icon: ShieldCheck,
      color: "text-emerald-500 bg-emerald-50 border-emerald-200",
      title: "Expert Guidance",
      description: "Our certified visa specialists review every passport, photo, and bank statement before filing to guarantee maximum approval success."
    },
    {
      icon: Award,
      color: "text-amber-500 bg-amber-50 border-amber-200",
      title: "Best Price Guarantee",
      description: "Transparent, upfront pricing with zero hidden fees. You get official embassy fees + simple flat service rates."
    },
    {
      icon: Headphones,
      color: "text-sky-500 bg-sky-50 border-sky-200",
      title: "24/7 Support",
      description: "Dedicated WhatsApp concierge and phone support available 24/7 to solve your travel queries anytime, day or night."
    },
    {
      icon: Compass,
      color: "text-indigo-500 bg-indigo-50 border-indigo-200",
      title: "Curated Experiences",
      description: "More than just visas — get flights, travel insurance, hotel vouchers, and curated group tours all in one place."
    }
  ];

  return (
    <section className="py-16 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text Content */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 border border-slate-300 text-slate-800 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Why Choose NAS Internationals</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-serif uppercase leading-tight">
              WHY GO WITH <span className="text-amber-500">NAS INTERNATIONALS</span>
            </h2>

            <p className="mt-3 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
              Experience Hassle-free, Unforgettable Visa Journey With Expert Guidance
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2.5 text-slate-700 text-sm font-semibold">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span>Over 180+ successful visa journeys completed</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-700 text-sm font-semibold">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span>Direct integration with embassy e-visa portals</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-700 text-sm font-semibold">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span>Automated passport scan & document error checking</span>
              </div>
            </div>
          </div>

          {/* Right 2x2 Feature Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {FEATURES.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={idx}
                  className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-4 ${feature.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {feature.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
