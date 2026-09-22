import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      num: 1,
      q: "What's the best way to get in contact?",
      a: "Please email us at admin@premiumsupps.net and our team will respond as soon as possible.",
    },
    {
      num: 2,
      q: 'How long will it take for my order to arrive?',
      a: 'Most orders arrive within 2–5 business days, depending on your location and the postage option you choose. Express Post takes 1–2 business days for 95%+ of orders. Standard Post takes 2–4 business days for 90% of orders. Once your order is placed, you will receive an email with an estimated delivery date range.',
    },
    {
      num: 3,
      q: 'I have an issue with my order',
      a: "Please email us with your name and order number at admin@premiumsupps.net and we'll resolve it as soon as possible.",
    },
    {
      num: 4,
      q: 'What is your shipping policy?',
      a: 'We aim to get your order moving as quickly as possible. Almost all orders placed before 3pm Adelaide time are shipped the same day. Shipping business days are Monday to Friday. Orders over $150 AUD receive complimentary Free Express Shipping.',
    },
    {
      num: 5,
      q: 'Can I cancel my order?',
      a: "As long as the order has not already been shipped we MAY be able to cancel your order as long as our 3PL hasn't dispatched it yet, please contact us via email at admin@premiumsupps.net and a member of our team will happily help you!",
    },
  ];

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-12 sm:py-20 bg-white border-b border-stone-200 overflow-hidden">
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row items-stretch rounded-3xl overflow-hidden border border-stone-200 shadow-md">
          
          {/* Left Media Image */}
          <div className="w-full lg:w-[45%] relative bg-[#0d0d0d] flex-shrink-0 min-h-[300px] lg:min-h-full">
            <img
              src="https://cdn.shopify.com/s/files/1/0811/8701/2888/files/Card.png"
              alt="Premium Supplements Australia FAQ"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Right FAQ Content */}
          <div className="w-full lg:w-[55%] bg-[#F7F7F7] p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
            
            <h2 className="font-['Instrument_Sans'] text-2xl sm:text-3xl lg:text-4xl font-black text-[#111111] uppercase tracking-tight mb-8 text-center lg:text-left">
              Frequently Asked Questions
            </h2>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl overflow-hidden transition-all bg-white border border-stone-200 shadow-sm"
                  >
                    <button
                      onClick={() => toggleAccordion(idx)}
                      className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-center gap-3.5">
                        <span className="w-7 h-7 rounded-full bg-black text-white text-xs sm:text-sm font-bold flex items-center justify-center flex-shrink-0 font-['Instrument_Sans']">
                          {faq.num}
                        </span>
                        <span className="font-['Instrument_Sans'] font-bold text-sm sm:text-base text-[#111111]">
                          {faq.q}
                        </span>
                      </div>

                      <div className="text-black flex-shrink-0">
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 bg-[#fafafa]">
                        <p>{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
