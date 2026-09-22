import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, CheckCircle2, ShieldCheck, Lock, Truck, CreditCard } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onOrderComplete: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  onOrderComplete,
}) => {
  if (!isOpen) return null;

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('NSW');
  const [postcode, setPostcode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isFreeShipping = subtotal >= 100;
  const shippingCost = isFreeShipping ? 0 : 9.95;
  const grandTotal = subtotal + shippingCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setOrderConfirmed(true);
      setOrderId('PS-' + Math.floor(100000 + Math.random() * 900000));
      onOrderComplete();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="fixed inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl z-10 border border-stone-200">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-stone-200 bg-stone-900 text-white rounded-t-3xl flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Lock className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="font-['Instrument_Sans'] font-black text-lg tracking-tight uppercase">
                Secure Express Checkout
              </h3>
              <p className="text-[11px] text-stone-400">
                256-Bit SSL Encrypted • Australia Post Express Dispatch
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {orderConfirmed ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-2xl font-['Instrument_Sans'] font-black text-stone-900 uppercase">
              Order Confirmed!
            </h4>
            <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
              Thank you for ordering with Premium Supplements Australia. Your order number is{' '}
              <strong className="text-stone-900 font-mono">{orderId}</strong>.
            </p>
            <div className="bg-[#FBF6E0] p-4 rounded-2xl border border-stone-300 max-w-md mx-auto text-xs text-left space-y-1 text-stone-700">
              <p>📦 <strong>Status:</strong> Dispatched before 2:00 PM via AU Post Express</p>
              <p>📍 <strong>Deliver to:</strong> {fullName}, {address}, {state} {postcode}</p>
              <p>✉️ <strong>Confirmation Sent:</strong> {email}</p>
              <p>💳 <strong>Total Paid:</strong> ${grandTotal.toFixed(2)} AUD</p>
            </div>

            <div className="pt-4">
              <button
                onClick={onClose}
                className="bg-stone-900 hover:bg-[#D0473E] text-white font-['Instrument_Sans'] font-bold text-xs uppercase px-8 py-3.5 rounded-full transition-colors"
              >
                Return to Storefront
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            
            {/* Order Summary mini widget */}
            <div className="bg-[#faf8f2] p-4 rounded-2xl border border-stone-200">
              <div className="text-xs font-['Instrument_Sans'] font-bold text-stone-700 uppercase mb-2 flex justify-between">
                <span>Order Summary ({cart.length} items)</span>
                <span className="text-[#D0473E]">${subtotal.toFixed(2)} AUD</span>
              </div>
              <div className="max-h-28 overflow-y-auto divide-y divide-stone-200 text-xs text-stone-600">
                {cart.map((item, idx) => (
                  <div key={idx} className="py-1.5 flex justify-between">
                    <span className="truncate max-w-[280px]">
                      {item.quantity}x {item.title} {item.variantTitle && item.variantTitle !== 'Default Title' ? `(${item.variantTitle})` : ''}
                    </span>
                    <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="pt-2 mt-2 border-t border-stone-200 text-xs flex justify-between font-bold text-stone-800">
                <span>Express Shipping:</span>
                <span className={isFreeShipping ? 'text-emerald-600' : ''}>
                  {isFreeShipping ? 'FREE (Over $100)' : '$9.95 AUD'}
                </span>
              </div>
              <div className="pt-1 text-sm flex justify-between font-black text-[#D0473E] font-['Instrument_Sans']">
                <span>Total to Pay:</span>
                <span>${grandTotal.toFixed(2)} AUD</span>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <h4 className="font-['Instrument_Sans'] font-bold text-sm text-stone-900 uppercase tracking-wider">
                1. Delivery Details (Australia)
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Marcus King"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                    Email Address (for tracking) *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="marcus@example.com.au"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                  Street Address *
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. 42 George Street"
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-stone-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                    State *
                  </label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-stone-900 cursor-pointer"
                  >
                    <option value="NSW">NSW (New South Wales)</option>
                    <option value="VIC">VIC (Victoria)</option>
                    <option value="QLD">QLD (Queensland)</option>
                    <option value="WA">WA (Western Australia)</option>
                    <option value="SA">SA (South Australia)</option>
                    <option value="TAS">TAS (Tasmania)</option>
                    <option value="ACT">ACT (Canberra)</option>
                    <option value="NT">NT (Northern Territory)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                    Postcode *
                  </label>
                  <input
                    type="text"
                    required
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    placeholder="2000"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-stone-900"
                  />
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div className="pt-2 border-t border-stone-200">
              <h4 className="font-['Instrument_Sans'] font-bold text-sm text-stone-900 uppercase tracking-wider mb-3">
                2. Payment Method
              </h4>
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-stone-700" />
                  <span className="text-xs font-bold text-stone-800">
                    Encrypted Credit Card / Apple Pay / Google Pay
                  </span>
                </div>
                <span className="text-[11px] text-emerald-700 bg-emerald-100 font-bold px-2 py-0.5 rounded">
                  Instant Verification
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-[#D0473E] hover:bg-[#b83a32] text-white py-4 rounded-full font-['Instrument_Sans'] font-black text-sm uppercase tracking-wider shadow-xl transition-all disabled:opacity-50"
            >
              {isProcessing
                ? 'Authorizing Secure Payment...'
                : `Authorize Order • $${grandTotal.toFixed(2)} AUD`}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
