'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Product } from '@/types';
import { ProductCard } from '@/components/product/ProductCard';

interface NewCollectionSectionProps {
  products: Product[];
}

export function NewCollectionSection({ products }: NewCollectionSectionProps) {
  // Select top 3 curated pieces
  const featuredItems = products.slice(0, 3);

  return (
    <section className="bg-white py-20 lg:py-28 border-b border-[#EBE8E0]">
      <div className="container mx-auto px-5 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-5 h-[1px] bg-[#C5A880]" />
              <span className="text-[11px] uppercase tracking-[0.22em] font-medium text-[#7C8797]">
                New Collection · 2026
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-[#0A192F] tracking-tight">
              Architectural <span className="italic font-normal">Silhouettes.</span>
            </h2>
          </div>
          <Link
            href="/shop?sort=newest"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-medium text-[#0A192F] hover:text-[#C5A880] transition-colors"
          >
            <span>View All New Arrivals</span>
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Asymmetrical Editorial Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left: Editorial Spotlight Card */}
          <div className="lg:col-span-4 bg-[#F8F7F3] p-8 lg:p-10 flex flex-col justify-between min-h-[460px] border border-[#EFECE6]">
            <div>
              <span className="inline-block text-[10px] uppercase tracking-[0.24em] font-semibold text-[#C5A880] mb-4">
                Curated Series
              </span>
              <h3 className="font-serif text-3xl font-light text-[#0A192F] leading-tight mb-4">
                The Pure Titanium Edition.
              </h3>
              <p className="text-sm text-[#4A5568] leading-relaxed mb-6 font-normal">
                Engineered in Japan and hand-finished for featherweight all-day wear. Under 11 grams of aerospace-grade resilience.
              </p>
            </div>

            <div className="pt-6 border-t border-[#E8E5DF]">
              <div className="grid grid-cols-2 gap-4 text-xs text-[#0A192F] mb-6">
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.16em] text-[#8C95A3] mb-1">Weight</span>
                  <span className="font-medium text-sm">11.4g</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.16em] text-[#8C95A3] mb-1">Origin</span>
                  <span className="font-medium text-sm">Fukui, Japan</span>
                </div>
              </div>
              <Link
                href="/shop?material=TITANIUM"
                className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-medium text-[#0A192F] hover:text-[#C5A880] transition-colors"
              >
                <span>Explore Titanium Frames</span>
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right: Curated Product Rail */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
            {featuredItems.map((product) => (
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
