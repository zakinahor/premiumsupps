import React from 'react';
import { CartItem } from '../types';
import { X, Trash2, ShieldCheck, Truck, ShoppingBag, ArrowRight } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (index: number, delta: number) => void;
  onRemoveItem: (index: number) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  if (!isOpen) return null;

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeShippingThreshold = 150.0;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingPercentage = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-900 text-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h3 className="font-['Instrument_Sans'] font-black text-lg tracking-tight uppercase">
              Your Cart
            </h3>
            <span className="bg-[#D0473E] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full ml-1">
              {totalCount} {totalCount === 1 ? 'item' : 'items'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="bg-[#FBF6E0] p-4 border-b border-stone-300/80 text-xs text-stone-800">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 font-['Instrument_Sans'] font-bold uppercase tracking-wider">
              <Truck className="w-4 h-4 text-[#D0473E]" />
              {remainingForFreeShipping === 0 ? (
                <span className="text-emerald-700">
                  🎉 You've Unlocked FREE AU Express Shipping!
                </span>
              ) : (
                <span>
                  Add <span className="text-[#D0473E] font-black">${remainingForFreeShipping.toFixed(2)} AUD</span> for <strong className="text-stone-900">FREE Express Shipping</strong>
                </span>
              )}
            </div>
            <span className="font-bold text-stone-500">
              {Math.round(freeShippingPercentage)}%
            </span>
          </div>

          <div className="w-full h-2.5 bg-stone-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                remainingForFreeShipping === 0 ? 'bg-emerald-500' : 'bg-[#D0473E]'
              }`}
              style={{ width: `${freeShippingPercentage}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-grow overflow-y-auto divide-y divide-stone-100 p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="text-center py-20 px-4 text-stone-500">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-4 text-stone-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-['Instrument_Sans'] font-black text-lg text-stone-800 uppercase mb-1">
                Your cart is empty
              </h4>
              <p className="text-xs text-stone-500 mb-6">
                Fuel your workout with pure Australian clinical doses.
              </p>
              <button
                onClick={onClose}
                className="bg-stone-900 hover:bg-[#D0473E] text-white font-['Instrument_Sans'] font-bold text-xs uppercase px-6 py-3 rounded-full transition-colors"
              >
                Browse Best Sellers
              </button>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div key={`${item.productId}-${item.variantId}-${idx}`} className="flex gap-4 pt-3 pb-3 items-center">
                <div className="w-16 h-16 bg-[#faf8f2] rounded-xl p-1.5 border border-stone-200 flex-shrink-0 flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex-grow min-w-0">
                  <h4 className="font-['Instrument_Sans'] font-bold text-sm text-stone-900 truncate" title={item.title}>
                    {item.title}
                  </h4>
                  {item.variantTitle && item.variantTitle !== 'Default Title' && (
                    <p className="text-[11px] text-stone-500 mb-2">
                      Option: <span className="font-medium text-stone-700">{item.variantTitle}</span>
                    </p>
                  )}

                  <div className="flex items-center justify-between mt-1">
                    <div className="inline-flex items-center border border-stone-300 rounded-full bg-stone-50 text-xs">
                      <button
                        onClick={() => onUpdateQuantity(idx, -1)}
                        className="px-2.5 py-1 font-bold hover:bg-stone-200 rounded-l-full text-stone-600 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-2 font-bold text-stone-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(idx, 1)}
                        className="px-2.5 py-1 font-bold hover:bg-stone-200 rounded-r-full text-stone-600 transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-['Instrument_Sans'] font-black text-sm text-[#D0473E]">
                      ${(item.price * item.quantity).toFixed(2)} AUD
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onRemoveItem(idx)}
                  className="text-stone-400 hover:text-red-600 p-1 transition-colors"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer & Checkout Action */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50 space-y-4">
            <div className="flex justify-between items-baseline text-sm font-['Instrument_Sans'] font-bold text-stone-900">
              <span className="uppercase tracking-wider">Subtotal</span>
              <span className="text-2xl text-[#D0473E] font-black">
                ${subtotal.toFixed(2)} <span className="text-xs font-normal text-stone-500">AUD</span>
              </span>
            </div>

            <p className="text-[11px] text-stone-500 text-center">
              Taxes calculated at checkout. Free AU Express shipping applied automatically on orders over $100.
            </p>

            <button
              id="checkout-button"
              onClick={onCheckout}
              className="w-full bg-[#D0473E] hover:bg-[#b83a32] text-white py-4 rounded-full font-['Instrument_Sans'] font-black text-sm uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-3 text-stone-500 text-[11px] pt-1">
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-emerald-600" /> Australia Post Express
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 256-Bit SSL Encrypted
              </span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
