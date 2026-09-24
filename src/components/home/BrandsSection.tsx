'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Brand } from '@/types';

interface BrandsSectionProps {
  brands: Brand[];
}

export function BrandsSection({ brands }: BrandsSectionProps) {
  return (
    <section className="bg-white py-20 lg:py-28 border-b border-[#EBE8E0]" aria-labelledby="brands-heading">
      <div className="container mx-auto px-5 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-5 h-[1px] bg-[#C5A880]" />
              <span className="text-[11px] uppercase tracking-[0.22em] font-medium text-[#7C8797]">
                Our Brands
              </span>
            </div>
            <h2 id="brands-heading" className="font-serif text-3xl md:text-5xl font-light text-[#0A192F] tracking-tight">
              The Names Behind <br />
              <span className="italic font-normal">Your Vision.</span>
            </h2>
          </div>
          <p className="text-sm text-[#4A5568] max-w-xs font-normal">
            Precision optical houses sourced from certified manufacturers in Japan, Italy, Germany, France, and Korea.
          </p>
        </div>

        {/* Minimalist Editorial Wordmark Wall */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-10 border-t border-[#EBE8E0] pt-12">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={`/brands/${brand.slug}`}
              className="group flex flex-col items-start no-underline text-inherit"
            >
              {/* Brand Wordmark */}
              <span className="font-serif text-2xl lg:text-3xl text-[#0A192F] group-hover:text-[#C5A880] transition-colors duration-200 tracking-tight font-light mb-3">
                {brand.name}
              </span>

              {/* Minimal Line Divider */}
              <div className="w-12 h-[1px] bg-[#D8D4CA] group-hover:w-full group-hover:bg-[#C5A880] transition-all duration-300 mb-2" />

              {/* Country */}
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#7C8797] group-hover:text-[#0A192F] transition-colors">
                {brand.country}
              </span>
            </Link>
          ))}
        </div>

        {/* Directory Link */}
        <div className="mt-14 pt-8 border-t border-[#EBE8E0] flex justify-end">
          <Link
            href="/brands"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-medium text-[#0A192F] hover:text-[#C5A880] transition-colors"
          >
            <span>Explore Complete Brand Directory</span>
            <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
