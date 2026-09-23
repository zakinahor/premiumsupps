import React, { useState } from 'react';
import { Mail, CheckCircle2, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (cat: string) => void;
  onOpenLabTests: () => void;
  onOpenReviews?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenLabTests, onOpenReviews }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#111111] text-stone-400 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-stone-800 rounded-xl flex items-center justify-center text-[#D0473E] font-['Instrument_Sans'] font-black text-xl border border-stone-700">
                P
              </div>
              <span className="font-['Instrument_Sans'] font-black text-xl tracking-tight text-white">
                PREMIUM<span className="text-[#D0473E]">SUPPS</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-normal">
              Australia's premier destination for pure, unadulterated sports nutrition, heavy-dose pre-workouts, 200-mesh creatine, and raw pharmaceutical compounds.
            </p>

            <div className="inline-flex items-center gap-2 bg-stone-800/80 px-3 py-1.5 rounded-full text-xs font-['Instrument_Sans'] font-bold text-amber-400 border border-stone-700">
              <span>🇦🇺</span>
              <span>100% Australian Formulated &amp; Owned</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="font-['Instrument_Sans'] font-black text-white text-xs uppercase mb-4 tracking-widest">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('All Products');
                    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Shop All Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('Pre-Workouts');
                    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Pre-Workouts Matrix
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('Creatine');
                    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Micronised Creatine
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    document.getElementById('stacks')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors text-amber-400 font-bold"
                >
                  Bundles &amp; Stacks (Save 50%)
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenLabTests}
                  className="hover:text-white transition-colors text-blue-400"
                >
                  HPLC Lab Test Certificates
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenReviews}
                  className="hover:text-white transition-colors text-[#edd065] font-semibold flex items-center gap-1.5"
                >
                  <span>Customer Reviews (1,666+)</span>
                  <span className="text-[10px] bg-[#edd065]/20 text-[#edd065] px-1.5 py-0.5 rounded">
                    ★ 4.9
                  </span>
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="font-['Instrument_Sans'] font-black text-white text-xs uppercase mb-4 tracking-widest">
              Customer Support
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <a
                  href="#faq"
                  className="hover:text-white transition-colors"
                >
                  FAQ &amp; Help Center
                </a>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer" onClick={() => alert("Orders dispatched same day before 2:00 PM AEST via Australia Post Express.")}>
                  Express Shipping &amp; Delivery
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer" onClick={() => alert("30-day Australian money back satisfaction guarantee on all products.")}>
                  30-Day Money-Back Guarantee
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer" onClick={() => alert("Wholesale inquiries: please email support@premiumsupps.net")}>
                  Wholesale &amp; Gym Accounts
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer" onClick={() => alert("Terms of Service: All orders are subject to Australian Consumer Law.")}>
                  Terms of Service &amp; Privacy
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter Form */}
          <div>
            <h4 className="font-['Instrument_Sans'] font-black text-white text-xs uppercase mb-4 tracking-widest">
              Athlete Newsletter • 10% Off
            </h4>
            <p className="text-xs text-stone-400 mb-3 leading-relaxed">
              Subscribe for VIP batch drop alerts, new clinical compound releases, and exclusive athlete discounts.
            </p>

            {subscribed ? (
              <div className="bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 rounded-2xl p-3.5 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>Welcome to the team! Check your inbox for your 10% code.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2.5">
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full bg-stone-900 border border-stone-700 rounded-full pl-10 pr-4 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-stone-400 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#D0473E] hover:bg-[#b83a32] text-white font-['Instrument_Sans'] font-bold text-xs uppercase tracking-wider py-2.5 rounded-full transition-colors shadow-md"
                >
                  Claim 10% Off
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-800 text-[11px] text-stone-500 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            © 2026 Premium Supplements Australia. All rights reserved. Registered Australian Business.
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <span className="bg-stone-900 px-2.5 py-1 rounded border border-stone-800 text-stone-300 font-medium">
              Visa
            </span>
            <span className="bg-stone-900 px-2.5 py-1 rounded border border-stone-800 text-stone-300 font-medium">
              Mastercard
            </span>
            <span className="bg-stone-900 px-2.5 py-1 rounded border border-stone-800 text-stone-300 font-medium">
              Apple Pay
            </span>
            <span className="bg-stone-900 px-2.5 py-1 rounded border border-stone-800 text-stone-300 font-medium">
              Google Pay
            </span>
            <span className="bg-stone-900 px-2.5 py-1 rounded border border-stone-800 text-stone-300 font-medium">
              Shop Pay
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
