import React from 'react';
import { Product } from '../types';

interface HeroProps {
  onExplorePreWorkouts: () => void;
  onExploreStacks: () => void;
  onQuickView: (product: Product) => void;
  featuredProduct?: Product;
}

export const Hero: React.FC<HeroProps> = ({
  onExplorePreWorkouts,
  onExploreStacks,
}) => {
  return (
    <section
      id="hero-athletes-section"
      className="relative w-full min-h-[580px] sm:min-h-[680px] bg-black text-white overflow-hidden flex flex-col justify-between pt-8 pb-10 sm:pt-14 sm:pb-12"
    >
      {/* Background Media */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="https://cdn.shopify.com/s/files/1/0811/8701/2888/files/ChatGPT_Image_Jul_13_2026_10_00_58_AM.png?v=1783902719"
          alt="High performance athletic training background"
          className="w-full h-full object-cover object-top opacity-75"
          loading="eager"
        />
        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60 pointer-events-none" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-[1410px] w-full mx-auto px-4 sm:px-6 lg:px-8 my-auto">
        <div className="max-w-2xl text-left space-y-5">
          
          {/* Discount Badge */}
          <div className="inline-flex items-center gap-2 bg-[#e75924] text-white px-3.5 py-2 rounded-md font-['Montserrat',sans-serif] font-bold text-xs sm:text-sm tracking-wider uppercase shadow-md">
            <span>50% OFF STOREWIDE</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              id="hero-shop-all-btn"
              onClick={() => {
                document.getElementById('premium-range')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-[#e6c96b] hover:bg-[#d8b855] text-black font-['Montserrat',sans-serif] font-bold text-xs sm:text-sm uppercase tracking-wider py-3.5 px-8 rounded-full transition-all transform hover:-translate-y-0.5 shadow-lg min-w-[200px]"
            >
              Shop all products
            </button>

            <button
              id="hero-best-sellers-btn"
              onClick={() => {
                document.getElementById('premium-range')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-black/40 hover:bg-[#e6c96b] text-white hover:text-black border border-white/60 hover:border-[#e6c96b] font-['Montserrat',sans-serif] font-bold text-xs sm:text-sm uppercase tracking-wider py-3.5 px-8 rounded-full transition-all transform hover:-translate-y-0.5 min-w-[180px] backdrop-blur-sm"
            >
              Best sellers
            </button>
          </div>

        </div>
      </div>

      {/* 5 Glass Pill Badges along bottom */}
      <div className="relative z-10 max-w-[1410px] w-full mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-3.5">
          
          {/* 1. Australian Made */}
          <div className="bg-black/60 backdrop-blur-md border border-[#EDD065]/70 rounded-2xl p-3.5 sm:p-4 flex items-center gap-3 shadow-lg hover:border-[#EDD065] transition-all">
            <div className="w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 flex items-center justify-center text-[#e75924]">
              <svg viewBox="0 0 38 38" fill="none" className="w-full h-full stroke-current stroke-2">
                <path d="M20.1 5.3L19.5 6.4L20.5 7.2L25.3 10.7L27 12.1L27.6 9.9L28.3 7.4L29.5 11.2L29.6 11.4L29.8 11.7L34.3 17.2L34.7 21.1L30.6 29.1L26 28.4L24 23.8L22.9 21.5L21.4 23.5L20.7 24.4L16.3 21.4L15.6 20.8L14.7 21.3L6.9 25.8L5.5 25.5L3.4 16L8.6 12.9L8.9 12.8L9 12.5L13.1 7.3L14.6 8.4L16.3 9.6L16.9 7.6L17.6 5.4L20.1 5.2Z" />
              </svg>
            </div>
            <p className="font-['Montserrat',sans-serif] font-bold text-xs sm:text-sm text-white uppercase tracking-wider leading-tight">
              AUSTRALIAN MADE
            </p>
          </div>

          {/* 2. Direct Manufacturer */}
          <div className="bg-black/60 backdrop-blur-md border border-[#EDD065]/70 rounded-2xl p-3.5 sm:p-4 flex items-center gap-3 shadow-lg hover:border-[#EDD065] transition-all">
            <div className="w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 flex items-center justify-center text-[#e75924]">
              <svg viewBox="0 0 31 34" fill="currentColor" className="w-full h-full">
                <path d="M30 8.1C30 7.8 29.9 7.6 29.7 7.3L15.7 0.1C15.3 0 14.8 0 14.3 0.1L1 6.8C0.5 7.1 0.1 7.6 0 8.1C0 8.3-1.5 26.1 14.3 33.1C14.8 33.3 15.3 33.3 15.7 33.1C31.6 26.1 30 8.3 30 8.1ZM15 29.8C3.7 24.3 3.2 12.7 3.3 9.3L15 3.5L26.7 9.3C26.8 12.7 26.2 24.4 15 29.8Z" />
                <path d="M13.3 17.6L9.5 13.8L7.2 16.1L13.3 22.3L22.8 12.8L20.5 10.4L13.3 17.6Z" />
              </svg>
            </div>
            <p className="font-['Montserrat',sans-serif] font-bold text-xs sm:text-sm text-white uppercase tracking-wider leading-tight">
              DIRECT MANUFACTURER
            </p>
          </div>

          {/* 3. 36,000+ Customers */}
          <div className="bg-black/60 backdrop-blur-md border border-[#EDD065]/70 rounded-2xl p-3.5 sm:p-4 flex items-center gap-3 shadow-lg hover:border-[#EDD065] transition-all">
            <div className="w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 flex items-center justify-center text-[#e75924]">
              <svg viewBox="0 0 31 30" fill="currentColor" className="w-full h-full">
                <path d="M8.8 24.6L15.2 20.8L21.6 24.7L19.8 17.4L25.5 12.5L18 11.9L15.2 5L12.3 11.8L4.8 12.5L10.5 17.4L8.8 24.6ZM15.2 24.1L7.4 28.8L7.3 18.4L0.4 12.4L10.3 9.2L15.2 0L20 9.2L29.1 10L23 18.4L25.1 27.3L15.2 24.1Z" />
              </svg>
            </div>
            <p className="font-['Montserrat',sans-serif] font-bold text-xs sm:text-sm text-white uppercase tracking-wider leading-tight">
              36,000+ CUSTOMERS
            </p>
          </div>

          {/* 4. Same-Day Dispatch */}
          <div className="bg-black/60 backdrop-blur-md border border-[#EDD065]/70 rounded-2xl p-3.5 sm:p-4 flex items-center gap-3 shadow-lg hover:border-[#EDD065] transition-all">
            <div className="w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 flex items-center justify-center text-[#e75924]">
              <svg viewBox="0 0 40 40" fill="currentColor" className="w-full h-full">
                <path d="M9.4 33.5C8 33.5 6.8 33 5.8 32C4.8 31.1 4.3 30 4.3 28.6H2.8V9.2C2.8 8.5 3.5 6.4 4.2 6.4H25.5C26.3 6.4 28.4 8.5 28.4 9.2V13.2H31.2L38.2 20.7V27.1H35.4C35.4 30 33 33.5 30.4 33.5C29 33.5 27.9 33 26.9 32H14.4C13.8 33 11.9 33.5 9.4 33.5ZM9.4 30.9C10.6 30.9 11.8 29.7 11.8 28.5C11.8 27.2 10.6 26 9.4 26C8.1 26 6.9 27.2 6.9 28.5C6.9 29.7 8.1 30.9 9.4 30.9ZM30.4 30.9C31.7 30.9 32.8 29.7 32.8 28.5C32.8 27.2 31.7 26 30.4 26C29.2 26 28 27.2 28 28.5C28 29.7 29.2 30.9 30.4 30.9Z" />
              </svg>
            </div>
            <p className="font-['Montserrat',sans-serif] font-bold text-xs sm:text-sm text-white uppercase tracking-wider leading-tight">
              SAME-DAY DISPATCH
            </p>
          </div>

          {/* 5. Third-Party Lab Tested */}
          <div className="col-span-2 md:col-span-1 bg-black/60 backdrop-blur-md border border-[#EDD065]/70 rounded-2xl p-3.5 sm:p-4 flex items-center gap-3 shadow-lg hover:border-[#EDD065] transition-all">
            <div className="w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 flex items-center justify-center text-[#e75924]">
              <svg viewBox="0 0 40 40" fill="none" className="w-full h-full stroke-current stroke-2">
                <path d="M25 5H15V18.3L7.5 30.8C7.3 31.3 7.4 32.2 8 33.6C8.2 34 8.6 34.3 9 34.5C9.5 34.8 10 35 10.5 35H29.5C30.9 34.5 32.5 32.2 32.5 30.8L25 18.3V5Z" />
                <path d="M10 26.6H30" />
              </svg>
            </div>
            <p className="font-['Montserrat',sans-serif] font-bold text-xs sm:text-sm text-white uppercase tracking-wider leading-tight">
              THIRD-PARTY LAB TESTED
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
