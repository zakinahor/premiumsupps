import React from 'react';
import { CheckCircle2, ShoppingBag } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
  onOpenCart: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose, onOpenCart }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-[#111111] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-stone-700 flex items-center gap-3">
        <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
        <span className="font-['Instrument_Sans'] text-xs font-bold uppercase tracking-wider text-stone-200">
          {message}
        </span>
        <button
          onClick={() => {
            onClose();
            onOpenCart();
          }}
          className="ml-2 bg-[#D0473E] hover:bg-[#b83a32] text-white text-[11px] font-['Instrument_Sans'] font-bold uppercase px-3 py-1.5 rounded-full transition-colors flex items-center gap-1"
        >
          <ShoppingBag className="w-3 h-3" />
          View Cart
        </button>
      </div>
    </div>
  );
};
