'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Product } from '@/types';
import { ProductCard } from '@/components/product/ProductCard';

interface SunglassesCampaignSectionProps {
  products: Product[];
}

export function SunglassesCampaignSection({ products }: SunglassesCampaignSectionProps) {
  const selectedSunglasses = products.slice(0, 4);

  return (
    <section className="bg-[#FAF9F5] py-20 lg:py-28 border-b border-[#EBE8E0]">
      <div className="container mx-auto px-5 lg:px-12">
        
        {/* Editorial Campaign Hero Card */}
        <div className="relative w-full overflow-hidden bg-[#07172B] text-white min-h-[440px] md:min-h-[500px] flex items-center mb-16">
          {/* Campaign Background Image */}
          <Image
            src="/images/editorial/sunglasses_campaign.jpg"
            alt="LensCare Summer Sunglasses Campaign - Polarized luxury eyewear in sunlight"
            fill
            sizes="100vw"
            className="object-cover object-center opacity-45 filter contrast-105"
          />

          {/* Gradient Overlay for Editorial Depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#07172B]/90 via-[#07172B]/60 to-transparent z-10" />

          {/* Campaign Narrative */}
          <div className="relative z-20 max-w-xl p-8 sm:p-12 lg:p-16">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-[1px] bg-[#C5A880]" />
              <span className="text-[11px] uppercase tracking-[0.24em] font-medium text-[#C5A880]">
                Summer / 2026 Campaign
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.08] mb-6">
              Sunlight looks better <br />
              <span className="italic font-normal">through the right lens.</span>
            </h2>

            <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-md mb-8 font-normal">
              Category 3 UV400 defense and Japanese polarized filtration. Eliminating intense water and road glare with natural optical color restitution.
            </p>

            <Link
              href="/sunglasses"
              className="group inline-flex items-center gap-3 px-8 py-3.5 bg-white text-[#0A192F] text-xs uppercase tracking-[0.18em] font-medium hover:bg-[#F3EFE6] transition-colors"
            >
              <span>Explore Sunglasses</span>
              <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Selected Sunglasses Product Rail */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#7C8797] block mb-1">
                Curated Silhouettes
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-light text-[#0A192F]">
                Selected <span className="italic font-normal">Sunglasses.</span>
              </h3>
            </div>
            <Link
              href="/sunglasses"
              className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-medium text-[#0A192F] hover:text-[#C5A880] transition-colors"
            >
              <span>View All Sunglasses</span>
              <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {selectedSunglasses.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                showWishlist
                showQuickView
                showAddToCart
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
