'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Brand } from '@/types';

interface BrandsSectionProps {
  brands: Brand[];
}

export function BrandsSection({ brands }: BrandsSectionProps) {
  return (
    <section style={{ backgroundColor: '#F7F5F0', padding: '4.5rem 0' }} aria-labelledby="brands-heading">
      <div className="container" style={{ padding: '0 1.25rem' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p
            style={{
              fontSize: '0.8125rem',
              fontWeight: 700,
              color: '#CFA85B',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '0.5rem',
            }}
          >
            OUR BRANDS
          </p>
          <h2
            id="brands-heading"
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.125rem)',
              fontWeight: 600,
              color: '#0B1F3A',
              letterSpacing: '-0.02em',
              marginBottom: '0.5rem',
            }}
          >
            The names behind your everyday vision.
          </h2>
          <p style={{ color: '#667085', fontSize: '0.9375rem', margin: 0 }}>
            Curated precision eyewear crafted by verified international houses.
          </p>
        </div>

        {/* Editorial Wordmark Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
            gap: '2rem 1.5rem',
            textAlign: 'center',
          }}
        >
          {brands.map((brand, i) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
            >
              <Link
                href={`/brands/${brand.slug}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textDecoration: 'none',
                  color: 'inherit',
                  padding: '1.25rem 1rem',
                  borderRadius: '6px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E8E5DF',
                  transition: 'all 0.2s ease',
                }}
                className="brand-editorial-card"
              >
                {/* Brand Wordmark Styling */}
                <span
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    color: '#0B1F3A',
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                  }}
                >
                  {brand.name}
                </span>

                <div
                  style={{
                    width: '36px',
                    height: '2px',
                    backgroundColor: '#CFA85B',
                    marginBottom: '0.5rem',
                    transition: 'width 0.2s ease',
                  }}
                  className="brand-divider"
                />

                <span
                  style={{
                    fontSize: '0.75rem',
                    color: '#667085',
                    fontWeight: 500,
                    letterSpacing: '0.02em',
                  }}
                >
                  {brand.country}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Link
            href="/brands"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#0B1F3A',
              textDecoration: 'none',
              padding: '0.5rem 1rem',
            }}
          >
            Explore Brand Directory <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      <style jsx global>{`
        .brand-editorial-card:hover {
          border-color: #0B1F3A !important;
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(11, 31, 58, 0.08);
        }
        .brand-editorial-card:hover .brand-divider {
          width: 54px !important;
        }
      `}</style>
    </section>
  );
}
