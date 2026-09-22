import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X, User } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenLabTests: () => void;
  onSelectCategory: (category: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenLabTests,
  onSelectCategory,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currency, setCurrency] = useState('AUD');

  const handleNavClick = (category?: string, hash?: string) => {
    setMobileMenuOpen(false);
    if (category) {
      onSelectCategory(category);
    }
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* 1. TOP SCROLLING MARQUEE TICKER */}
      <div
        id="top-scrolling-ticker"
        className="bg-[#000000] text-white text-[13px] sm:text-[14px] py-2 overflow-hidden border-b border-stone-800"
      >
        <div className="flex whitespace-nowrap animate-[marquee_24s_linear_infinite] gap-12 font-medium">
          {[...Array(4)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="flex items-center gap-3">
                Free Shipping On Orders Over $150
                <span className="w-1.5 h-1.5 rounded-full bg-stone-500 inline-block" />
              </span>
              <span className="flex items-center gap-3 font-semibold text-amber-300">
                No Proprietary Blends — EVERY ACTIVE LISTED
                <span className="w-1.5 h-1.5 rounded-full bg-stone-500 inline-block" />
              </span>
              <span className="flex items-center gap-3">
                30-Day Money-Back Guarantee
                <span className="w-1.5 h-1.5 rounded-full bg-stone-500 inline-block" />
              </span>
              <span className="flex items-center gap-3 text-stone-200">
                Trusted By 36,000+ Australians
                <span className="w-1.5 h-1.5 rounded-full bg-stone-500 inline-block" />
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* 2. MAIN STOREFRONT HEADER */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm transition-all duration-300">
        <div className="max-w-[1410px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 sm:h-[68px]">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              id="mobile-nav-toggle-btn"
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-stone-900 hover:text-[#D0473E] focus:outline-none"
              aria-label="Open Mobile Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Logo */}
          <div className="flex items-center">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 group"
              aria-label="Premium Supplements Home"
            >
              <img
                src="https://cdn.shopify.com/s/files/1/0811/8701/2888/files/premium-supplements-horizontal-black-rgb-900px-w-72ppi.jpg?v=1758999039"
                alt="Premium Supplements"
                className="h-8 sm:h-9 w-auto object-contain max-w-[180px]"
                onError={(e) => {
                  // Fallback to text styling if image takes time to load
                  (e.target as HTMLElement).style.display = 'none';
                  const fallback = document.getElementById('logo-fallback');
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div id="logo-fallback" style={{ display: 'none' }} className="items-center gap-2">
                <span className="font-['Instrument_Sans'] font-black text-2xl tracking-tighter text-[#111111]">
                  PREMIUM<span className="text-[#D0473E]">SUPPS</span>
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 font-['Instrument_Sans'] font-semibold text-[14px] uppercase tracking-wider text-[#111111]">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-[#D0473E] transition-colors py-2"
            >
              Home
            </button>

            <button
              onClick={() => {
                onSelectCategory('All Products');
                document.getElementById('premium-range')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-[#D0473E] transition-colors py-2"
            >
              Shop All
            </button>

            <button
              onClick={() => {
                onSelectCategory('Best Sellers');
                document.getElementById('premium-range')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-[#D0473E] transition-colors py-2 flex items-center gap-1.5"
            >
              <span>Best Seller</span>
              <span className="bg-[#D0473E] text-white text-[10px] font-bold px-1.5 py-0.5 rounded tracking-normal">
                Sale
              </span>
            </button>

            <button
              onClick={onOpenLabTests}
              className="hover:text-[#D0473E] transition-colors py-2"
            >
              Lab Tests
            </button>

            <button
              onClick={() => {
                document.getElementById('why-supps')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-[#D0473E] transition-colors py-2"
            >
              About
            </button>

            <button
              onClick={() => {
                document.getElementById('blog-posts')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-[#D0473E] transition-colors py-2"
            >
              Blogs
            </button>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Currency Selector (Desktop) */}
            <div className="hidden xl:flex items-center text-xs font-semibold text-stone-600 bg-stone-100 rounded-full px-3 py-1.5 border border-stone-200">
              <span>Australia (AUD $)</span>
            </div>

            {/* Search Button */}
            <button
              id="header-search-btn"
              onClick={onOpenSearch}
              className="p-2 text-stone-800 hover:text-[#D0473E] transition-colors flex items-center gap-2"
              aria-label="Search store"
            >
              <Search className="w-5 h-5" />
              <span className="hidden md:inline text-xs font-medium text-stone-500 bg-stone-100 px-3 py-1.5 rounded-full border border-stone-200">
                I'm looking for...
              </span>
            </button>

            {/* Account Link */}
            <button
              onClick={() => alert("Welcome! Account sign-in is available at checkout or with your order confirmation email.")}
              className="hidden sm:inline-flex p-2 text-stone-800 hover:text-[#D0473E] transition-colors"
              aria-label="Account Login"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Minicart Drawer Trigger */}
            <button
              id="cart-icon-bubble"
              onClick={onOpenCart}
              className="relative p-2.5 bg-stone-100 hover:bg-stone-200 text-stone-900 rounded-full transition-all flex items-center justify-center border border-stone-200"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              <span
                id="cart-count-badge"
                className="absolute -top-1 -right-1 bg-[#D0473E] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm"
              >
                {cartCount}
              </span>
            </button>
          </div>

        </div>
      </header>

      {/* 3. MOBILE SLIDE-IN NAVIGATION MENU */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-300">
            {/* Mobile Header Bar */}
            <div className="p-4 bg-[#D0473E] text-white flex items-center justify-between">
              <span className="font-['Instrument_Sans'] font-bold uppercase tracking-wider text-sm">
                Menu
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-white hover:opacity-80 p-1"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <div className="flex-1 overflow-y-auto divide-y divide-stone-100 py-2 font-['Instrument_Sans'] font-bold text-xs uppercase tracking-wider">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full text-left px-5 py-3.5 hover:bg-stone-50 hover:text-[#D0473E] flex justify-between items-center"
              >
                <span>Home</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onSelectCategory('All Products');
                  document.getElementById('premium-range')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full text-left px-5 py-3.5 hover:bg-stone-50 hover:text-[#D0473E] flex justify-between items-center"
              >
                <span>Shop All</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onSelectCategory('Best Sellers');
                  document.getElementById('premium-range')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full text-left px-5 py-3.5 hover:bg-stone-50 hover:text-[#D0473E] flex justify-between items-center text-[#D0473E]"
              >
                <span>Best Seller</span>
                <span className="bg-[#D0473E] text-white text-[10px] px-2 py-0.5 rounded">
                  Sale
                </span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLabTests();
                }}
                className="w-full text-left px-5 py-3.5 hover:bg-stone-50 hover:text-[#D0473E] flex justify-between items-center"
              >
                <span>Lab Tests</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  document.getElementById('why-supps')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full text-left px-5 py-3.5 hover:bg-stone-50 hover:text-[#D0473E] flex justify-between items-center"
              >
                <span>About</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  document.getElementById('blog-posts')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full text-left px-5 py-3.5 hover:bg-stone-50 hover:text-[#D0473E] flex justify-between items-center"
              >
                <span>Blogs</span>
              </button>
            </div>

            {/* Mobile Footer Country / Account */}
            <div className="p-5 border-t border-stone-200 bg-stone-50 space-y-3">
              <div className="text-xs text-stone-600 flex items-center justify-between">
                <span>Country / Currency:</span>
                <span className="font-bold text-stone-900 bg-white border border-stone-200 px-2 py-1 rounded">
                  Australia (AUD $)
                </span>
              </div>
              <button
                onClick={() => onOpenCart()}
                className="w-full bg-[#111111] text-white py-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                View Cart ({cartCount})
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
