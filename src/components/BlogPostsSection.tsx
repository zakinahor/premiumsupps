import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const BlogPostsSection: React.FC = () => {
  const posts = [
    {
      id: 1,
      tag: 'News',
      title: 'How to Read a Supplement Label Like Someone Who Makes Them',
      excerpt:
        'We manufacture supplements for a living, which means we read labels the way a chef reads menus — we can see the kitchen from behind the ingredient amounts...',
      img: 'https://cdn.shopify.com/s/files/1/0811/8701/2888/articles/Warrior_Grape_60270551-9811-4f12-ba84-9edb58bfdec2.png?v=1787183573',
      url: 'https://premiumsupps.net/blogs/news/how-to-read-a-supplement-label',
    },
    {
      id: 2,
      tag: 'News',
      title: "Bacteriostatic Water vs Saline: What's Actually the Difference?",
      excerpt:
        'Four clear liquids in near-identical vials: bacteriostatic water, sterile water, normal saline, and bacteriostatic saline. They get mixed up constantly — and they are...',
      img: 'https://cdn.shopify.com/s/files/1/0811/8701/2888/files/Bacteriostatic-WaterB.png?v=1780560867',
      url: 'https://premiumsupps.net/blogs/news/bacteriostatic-water-vs-saline',
    },
    {
      id: 3,
      tag: 'News',
      title: 'What "Third-Party Lab Tested" Actually Means — and What It Doesn\'t',
      excerpt:
        '"Lab tested." It\'s printed on half the tubs in Australia, costs nothing to write, and means nothing by itself. Independent testing done properly is...',
      img: 'https://cdn.shopify.com/s/files/1/0811/8701/2888/articles/premium-supplements-horizontal-black-rgb-900px-w-72ppi_5c0f3038-d236-4c66-892e-3dd5bf8ba55a.jpg?v=1787183569',
      url: 'https://premiumsupps.net/blogs/news/what-third-party-lab-tested-means',
    },
  ];

  return (
    <section id="blog-posts" className="py-16 sm:py-20 bg-white border-b border-stone-200 overflow-hidden">
      <div className="max-w-[1410px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-10 pb-4 border-b border-stone-200">
          <h2 className="font-['Instrument_Sans'] text-2xl sm:text-3xl md:text-4xl font-bold text-[#111111] uppercase tracking-tight">
            From The Blog
          </h2>

          <a
            href="https://premiumsupps.net/blogs/news"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 font-['Instrument_Sans'] text-sm font-bold text-[#111111] hover:text-[#e75924] border-b border-[#111111] pb-0.5 uppercase tracking-wider transition-colors"
          >
            <span>All Articles</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group flex flex-col justify-between bg-[#fafafa] rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div>
                {/* Image */}
                <div className="aspect-[16/10] w-full overflow-hidden bg-stone-100 flex items-center justify-center p-2">
                  <img
                    src={post.img}
                    alt={post.title}
                    className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                <div className="p-6">
                  {/* Category Pill */}
                  <span className="inline-block text-[11px] font-['Instrument_Sans'] font-bold uppercase tracking-wider text-stone-700 bg-white border border-stone-300 rounded-full px-3 py-1 mb-3">
                    {post.tag}
                  </span>

                  <h3 className="font-['Instrument_Sans'] font-bold text-lg sm:text-xl text-[#111111] group-hover:text-[#e75924] transition-colors leading-snug mb-3 line-clamp-2">
                    <a href={post.url} target="_blank" rel="noreferrer">
                      {post.title}
                    </a>
                  </h3>

                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <a
                  href={post.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-['Instrument_Sans'] font-bold text-[#111111] group-hover:text-[#e75924] uppercase tracking-wider transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
