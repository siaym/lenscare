'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Shape } from '@/types';

interface ShopByShapeSectionProps {
  shapes: Shape[];
  basePath?: string;
  bg?: string;
}

// Crisp, bespoke optical frame silhouette SVG vectors
function ShapeSilhouette({ slug }: { slug: string }) {
  switch (slug) {
    case 'rectangle':
      return (
        <svg viewBox="0 0 100 40" className="w-full h-auto text-current fill-none stroke-current stroke-[2.2] stroke-linejoin-round" aria-hidden="true">
          {/* Left Lens */}
          <rect x="8" y="8" width="36" height="24" rx="3" />
          {/* Right Lens */}
          <rect x="56" y="8" width="36" height="24" rx="3" />
          {/* Bridge */}
          <path d="M44 18 Q50 16 56 18" strokeWidth="2.5" />
          {/* Temples */}
          <path d="M8 12 H2" strokeWidth="2" />
          <path d="M92 12 H98" strokeWidth="2" />
        </svg>
      );
    case 'round':
      return (
        <svg viewBox="0 0 100 44" className="w-full h-auto text-current fill-none stroke-current stroke-[2.2]" aria-hidden="true">
          {/* Left Lens */}
          <circle cx="26" cy="22" r="17" />
          {/* Right Lens */}
          <circle cx="74" cy="22" r="17" />
          {/* Bridge */}
          <path d="M43 20 Q50 15 57 20" strokeWidth="2.5" />
          {/* Temples */}
          <path d="M9 20 H2" strokeWidth="2" />
          <path d="M91 20 H98" strokeWidth="2" />
        </svg>
      );
    case 'cat-eye':
      return (
        <svg viewBox="0 0 100 44" className="w-full h-auto text-current fill-none stroke-current stroke-[2.2] stroke-linejoin-round" aria-hidden="true">
          {/* Left Lens with swept brow */}
          <path d="M6 14 C12 10, 36 10, 44 18 C44 28, 28 36, 16 32 C8 28, 4 20, 6 14 Z" />
          {/* Right Lens with swept brow */}
          <path d="M94 14 C88 10, 64 10, 56 18 C56 28, 72 36, 84 32 C92 28, 96 20, 94 14 Z" />
          {/* Bridge */}
          <path d="M44 19 Q50 16 56 19" strokeWidth="2.5" />
          {/* Temples */}
          <path d="M6 14 H1" strokeWidth="2" />
          <path d="M94 14 H99" strokeWidth="2" />
        </svg>
      );
    case 'aviator':
      return (
        <svg viewBox="0 0 100 48" className="w-full h-auto text-current fill-none stroke-current stroke-[2.2] stroke-linejoin-round" aria-hidden="true">
          {/* Left Teardrop Lens */}
          <path d="M12 14 C18 12, 38 12, 44 16 C44 26, 38 40, 26 40 C14 40, 8 28, 12 14 Z" />
          {/* Right Teardrop Lens */}
          <path d="M88 14 C82 12, 62 12, 56 16 C56 26, 62 40, 74 40 C86 40, 92 28, 88 14 Z" />
          {/* Double Top Bridge */}
          <path d="M40 13 H60" strokeWidth="2.2" />
          <path d="M44 19 Q50 17 56 19" strokeWidth="2.2" />
          {/* Temples */}
          <path d="M12 14 H4" strokeWidth="2" />
          <path d="M88 14 H96" strokeWidth="2" />
        </svg>
      );
    case 'geometric':
      return (
        <svg viewBox="0 0 100 44" className="w-full h-auto text-current fill-none stroke-current stroke-[2.2] stroke-linejoin-round" aria-hidden="true">
          {/* Left Octagonal Lens */}
          <polygon points="16,10 34,10 44,18 44,28 34,36 16,36 6,28 6,18" />
          {/* Right Octagonal Lens */}
          <polygon points="66,10 84,10 94,18 94,28 84,36 66,36 56,28 56,18" />
          {/* Bridge */}
          <path d="M44 19 H56" strokeWidth="2.5" />
          {/* Temples */}
          <path d="M6 18 H1" strokeWidth="2" />
          <path d="M94 18 H99" strokeWidth="2" />
        </svg>
      );
    case 'clubmaster':
      return (
        <svg viewBox="0 0 100 44" className="w-full h-auto text-current fill-none stroke-current stroke-linejoin-round" aria-hidden="true">
          {/* Bold Browline Left */}
          <path d="M6 14 C12 8, 38 8, 44 15" strokeWidth="4.5" strokeLinecap="round" />
          {/* Wire Bottom Left */}
          <path d="M6 14 C6 26, 16 34, 25 34 C34 34, 44 26, 44 15" strokeWidth="1.8" />
          {/* Bold Browline Right */}
          <path d="M94 14 C88 8, 62 8, 56 15" strokeWidth="4.5" strokeLinecap="round" />
          {/* Wire Bottom Right */}
          <path d="M56 15 C56 26, 66 34, 75 34 C84 34, 94 26, 94 15" strokeWidth="1.8" />
          {/* Bridge */}
          <path d="M44 17 Q50 14 56 17" strokeWidth="2.5" />
          {/* Temples */}
          <path d="M6 14 H1" strokeWidth="2" />
          <path d="M94 14 H99" strokeWidth="2" />
        </svg>
      );
    case 'square':
    default:
      return (
        <svg viewBox="0 0 100 44" className="w-full h-auto text-current fill-none stroke-current stroke-[2.2] stroke-linejoin-round" aria-hidden="true">
          {/* Left Square Lens */}
          <rect x="8" y="6" width="36" height="32" rx="4" />
          {/* Right Square Lens */}
          <rect x="56" y="6" width="36" height="32" rx="4" />
          {/* Bridge */}
          <path d="M44 18 Q50 16 56 18" strokeWidth="2.5" />
          {/* Temples */}
          <path d="M8 12 H2" strokeWidth="2" />
          <path d="M92 12 H98" strokeWidth="2" />
        </svg>
      );
  }
}

// Approximate count for each silhouette
const SHAPE_COUNTS: Record<string, string> = {
  rectangle: '18 styles',
  round: '14 styles',
  'cat-eye': '12 styles',
  aviator: '9 styles',
  geometric: '11 styles',
  clubmaster: '8 styles',
  square: '15 styles',
};

export function ShopByShapeSection({
  shapes,
  basePath = '/shop',
  bg = '#FAF9F5',
}: ShopByShapeSectionProps) {
  return (
    <section className="py-20 lg:py-28 border-b border-[#EBE8E0]" style={{ backgroundColor: bg }}>
      <div className="container mx-auto px-5 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-5 h-[1px] bg-[#C5A880]" />
              <span className="text-[11px] uppercase tracking-[0.22em] font-medium text-[#7C8797]">
                Visual Discovery
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-[#0A192F] tracking-tight">
              Find Your <span className="italic font-normal">Silhouette.</span>
            </h2>
          </div>
          <p className="text-sm text-[#4A5568] max-w-xs font-normal">
            Every facial structure responds to distinct optical geometry. Explore our signature silhouettes.
          </p>
        </div>

        {/* Visual Frame Silhouette Selector Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 lg:gap-5">
          {shapes.map((shape) => {
            const count = SHAPE_COUNTS[shape.slug] || '10+ styles';
            return (
              <Link
                key={shape.id}
                href={`${basePath}?shape=${shape.slug}`}
                className="group relative flex flex-col items-center justify-between p-6 bg-white hover:bg-[#F3EFE6] transition-all duration-300 border border-[#EBE8E0] hover:border-[#C5A880]/40 text-center min-h-[170px]"
              >
                {/* Frame Silhouette SVG */}
                <div className="w-full px-2 py-4 flex items-center justify-center text-[#0A192F] group-hover:text-[#0B1F3A] group-hover:scale-105 transition-all duration-300">
                  <div className="w-20 md:w-24">
                    <ShapeSilhouette slug={shape.slug} />
                  </div>
                </div>

                {/* Details */}
                <div className="mt-2">
                  <h3 className="text-xs uppercase tracking-[0.16em] font-medium text-[#0A192F] mb-1">
                    {shape.name}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[11px] text-[#7C8797] group-hover:text-[#0A192F] transition-colors">
                    {count}
                    <ArrowRight size={10} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
