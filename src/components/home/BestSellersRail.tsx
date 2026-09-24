'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Product } from '@/types';
import { ProductCard } from '@/components/product/ProductCard';

interface BestSellersRailProps {
  products: Product[];
}

export function BestSellersRail({ products }: BestSellersRailProps) {
  const displayProducts = products.slice(0, 4);

  return (
    <section className="bg-white py-20 lg:py-28 border-b border-[#EBE8E0]">
      <div className="container mx-auto px-5 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-5 h-[1px] bg-[#C5A880]" />
              <span className="text-[11px] uppercase tracking-[0.22em] font-medium text-[#7C8797]">
                Everyday Favorites
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-[#0A192F] tracking-tight">
              Best <span className="italic font-normal">Sellers.</span>
            </h2>
          </div>
          <Link
            href="/shop?sort=best-selling"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-medium text-[#0A192F] hover:text-[#C5A880] transition-colors"
          >
            <span>View All Best Sellers</span>
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 4-Item Compact Editorial Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {displayProducts.map((product) => (
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
    </section>
  );
}
