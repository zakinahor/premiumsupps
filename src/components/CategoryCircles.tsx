import React from 'react';

interface CategoryCirclesProps {
  onSelectCategory: (category: string) => void;
  activeCategory?: string;
}

export const CategoryCircles: React.FC<CategoryCirclesProps> = ({
  onSelectCategory,
  activeCategory,
}) => {
  const categories = [
    {
      name: 'Pre-Workouts',
      label: 'PRE WORKOUTS',
      img: 'https://cdn.shopify.com/s/files/1/0811/8701/2888/files/Ellipse_1_9dbdbd8e-fe2e-4751-b90b-bd4b9ab9ba6d.png?v=1780059739',
    },
    {
      name: 'Pre-Workouts',
      label: 'PERFORMANCE',
      img: 'https://cdn.shopify.com/s/files/1/0811/8701/2888/files/Ellipse2.png?v=1780059573',
    },
    {
      name: 'Creatine',
      label: 'CREATINE',
      img: 'https://cdn.shopify.com/s/files/1/0811/8701/2888/files/Ellipse3.png?v=1780059573',
    },
    {
      name: 'Stacks',
      label: 'STACKS',
      img: 'https://cdn.shopify.com/s/files/1/0811/8701/2888/files/Ellipse4.png?v=1780059573',
    },
    {
      name: 'Health',
      label: 'METABOLIC SUPPORT',
      img: 'https://cdn.shopify.com/s/files/1/0811/8701/2888/files/Ellipse5.png?v=1780059573',
    },
    {
      name: 'Raw Compounds',
      label: 'RAW COMPOUNDS',
      img: 'https://cdn.shopify.com/s/files/1/0811/8701/2888/files/Ellipse6.png?v=1780059574',
    },
  ];

  return (
    <section id="shop-category-circles" className="py-12 sm:py-16 bg-white border-b border-stone-200 overflow-hidden">
      <div className="max-w-[1410px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <p className="font-['Instrument_Sans'] text-xs sm:text-sm font-semibold text-[#e75924] uppercase tracking-widest mb-1.5">
              BROWSE THE RANGE
            </p>
            <h2 className="font-['Instrument_Sans'] text-2xl sm:text-3xl md:text-4xl font-bold text-[#111111] uppercase tracking-tight">
              SHOP BY CATEGORY
            </h2>
          </div>

          <button
            onClick={() => {
              onSelectCategory('All Products');
              document.getElementById('premium-range')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 font-['Instrument_Sans'] text-sm font-bold text-[#111111] hover:text-[#e75924] border-b border-[#edd065] pb-1 uppercase tracking-wider transition-colors"
          >
            <span>View All</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-4 h-4 stroke-current stroke-2">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* 6 Circular Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
          {categories.map((cat, idx) => {
            const isSelected = activeCategory?.toLowerCase() === cat.name.toLowerCase();
            return (
              <button
                key={idx}
                onClick={() => {
                  onSelectCategory(cat.name);
                  document.getElementById('premium-range')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group flex flex-col items-center text-center focus:outline-none cursor-pointer"
              >
                <div
                  className={`w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-2 transition-all duration-300 shadow-sm flex items-center justify-center p-1 bg-[#f5f5f5] ${
                    isSelected
                      ? 'border-[#edd065] ring-4 ring-[#edd065]/30 scale-105'
                      : 'border-transparent group-hover:border-[#edd065] group-hover:scale-95'
                  }`}
                >
                  <img
                    src={cat.img}
                    alt={cat.label}
                    className="w-full h-full object-cover rounded-full"
                    loading="lazy"
                  />
                </div>
                <span className="font-['Instrument_Sans'] font-bold text-xs sm:text-sm text-[#111111] group-hover:text-[#e75924] uppercase tracking-wider mt-3 transition-colors">
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
