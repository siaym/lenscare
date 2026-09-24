'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import type { Product } from '@/types';
import { ProductCard } from '@/components/product/ProductCard';

interface ProductCarouselSectionProps {
  id: string;
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllHref: string;
  viewAllLabel?: string;
  bg?: string;
  dark?: boolean;
}

export function ProductCarouselSection({
  id,
  title,
  subtitle,
  products,
  viewAllHref,
  viewAllLabel = 'View All',
  bg = 'var(--color-bg)',
  dark = false,
}: ProductCarouselSectionProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const textColor = dark ? 'white' : 'var(--color-text)';
  const subtitleColor = dark ? 'rgba(255,255,255,0.65)' : 'var(--color-muted)';

  return (
    <section
      id={id}
      className="section"
      style={{ background: bg }}
      aria-labelledby={`${id}-heading`}
    >
      <div className="container">
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '2rem',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2
              id={`${id}-heading`}
              className="text-heading-2"
              style={{ color: textColor, marginBottom: subtitle ? '0.5rem' : 0 }}
            >
              {title}
            </h2>
            {subtitle && (
              <p style={{ fontSize: '0.9375rem', color: subtitleColor }}>
                {subtitle}
              </p>
            )}
          </motion.div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
            {/* Prev/Next */}
            <button
              onClick={scrollPrev}
              aria-label="Previous products"
              style={{
                width: '2.5rem',
                height: '2.5rem',
                border: dark ? '1.5px solid rgba(255,255,255,0.2)' : '1.5px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                background: dark ? 'rgba(255,255,255,0.08)' : 'white',
                color: dark ? 'white' : 'var(--color-text)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={scrollNext}
              aria-label="Next products"
              style={{
                width: '2.5rem',
                height: '2.5rem',
                border: dark ? '1.5px solid rgba(255,255,255,0.2)' : '1.5px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                background: dark ? 'rgba(255,255,255,0.08)' : 'white',
                color: dark ? 'white' : 'var(--color-text)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <ChevronRight size={18} />
            </button>

            <Link
              href={viewAllHref}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: dark ? 'var(--color-accent)' : 'var(--color-primary)',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              {viewAllLabel}
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        {/* Carousel */}
        <div ref={emblaRef} className="embla" style={{ overflow: 'hidden' }}>
          <div
            className="embla__container"
            style={{ gap: '1.25rem' }}
          >
            {products.map((product, i) => (
              <div
                key={product.id}
                className="embla__slide"
                style={{
                  minWidth: 0,
                  flex: '0 0 calc(50% - 0.625rem)',
                }}
                data-embla-slide
              >
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.07, 0.4) }}
                >
                  <ProductCard
                    product={product}
                    priority={i < 4}
                  />
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 640px) {
          [data-embla-slide] {
            flex: 0 0 calc(33.333% - 0.875rem) !important;
          }
        }
        @media (min-width: 1024px) {
          [data-embla-slide] {
            flex: 0 0 calc(25% - 1rem) !important;
          }
        }
        @media (min-width: 1280px) {
          [data-embla-slide] {
            flex: 0 0 calc(20% - 1rem) !important;
          }
        }
      `}</style>
    </section>
  );
}
