import React, { useState } from 'react';
import { Gift, X, Sparkles, Check } from 'lucide-react';

export const MysteryGiftModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [revealed, setRevealed] = useState(false);

  const handleReveal = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setRevealed(true);
    }
  };

  return (
    <>
      {/* Floating Bottom-Left Trigger Button */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 bg-[#e75924] hover:bg-[#d0473e] text-white px-4 py-2.5 rounded-full shadow-2xl border-2 border-white/80 font-['Instrument_Sans'] font-bold text-xs uppercase tracking-wider transition-all transform hover:scale-105 active:scale-95 group"
          aria-label="Get Mystery Gift"
        >
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center animate-bounce">
            <Gift className="w-3.5 h-3.5 text-white" />
          </div>
          <span>GET MYSTERY GIFT</span>
        </button>
      </div>

      {/* Modal Popup */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          <div className="relative bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-stone-200 z-10 text-center overflow-hidden">
            {/* Top decorative badge */}
            <div className="w-16 h-16 rounded-2xl bg-[#edd065] flex items-center justify-center mx-auto mb-4 text-black shadow-inner">
              <Gift className="w-8 h-8 text-[#e75924]" />
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-black rounded-full hover:bg-stone-100 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {!revealed ? (
              <>
                <span className="text-[11px] font-bold text-[#e75924] font-['Instrument_Sans'] uppercase tracking-widest block mb-1">
                  EXCLUSIVE WELCOME REWARD
                </span>
                <h3 className="font-['Instrument_Sans'] font-black text-2xl sm:text-3xl text-stone-900 uppercase tracking-tight mb-2">
                  CLAIM YOUR MYSTERY GIFT
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-6">
                  Enter your email to unlock up to <strong>50% off sitewide</strong> plus a free shaker bottle on your first order.
                </p>

                <form onSubmit={handleReveal} className="space-y-3">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#f4f4f4] border border-stone-300 rounded-full px-5 py-3.5 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#edd065] focus:bg-white transition-all font-medium"
                  />

                  <button
                    type="submit"
                    className="w-full bg-[#edd065] hover:bg-[#d8b855] text-stone-900 font-['Instrument_Sans'] font-black text-xs sm:text-sm uppercase tracking-wider py-4 rounded-full shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-[#e75924]" />
                    <span>REVEAL MY GIFT</span>
                  </button>
                </form>

                <p className="text-[10px] text-stone-400 mt-4">
                  By clicking Reveal, you agree to receive training advice and discounts. Unsubscribe anytime.
                </p>
              </>
            ) : (
              <div className="space-y-4 py-2">
                <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  <Check className="w-3.5 h-3.5" />
                  <span>GIFT UNLOCKED</span>
                </div>

                <h3 className="font-['Instrument_Sans'] font-black text-2xl text-stone-900 uppercase">
                  YOU WON 50% OFF + FREE SHAKER!
                </h3>

                <div className="bg-[#fafafa] border-2 border-dashed border-[#edd065] rounded-2xl p-4 my-3">
                  <p className="text-xs text-stone-500 uppercase font-bold">Use Coupon Code At Checkout:</p>
                  <p className="font-['Instrument_Sans'] font-black text-2xl text-[#e75924] tracking-widest mt-1 select-all">
                    PREMIUM50
                  </p>
                </div>

                <p className="text-xs text-stone-600">
                  Discount applied automatically to eligible items in your cart. Free shipping also applies on orders over $150 AUD.
                </p>

                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-stone-900 hover:bg-[#e75924] text-white font-['Instrument_Sans'] font-bold text-xs uppercase tracking-wider py-3.5 rounded-full transition-colors"
                >
                  START SHOPPING
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
