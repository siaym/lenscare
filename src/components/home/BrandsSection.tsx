'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { Brand } from '@/types';

interface BrandsSectionProps {
  brands: Brand[];
}

// Brand placeholder logos using initials
function BrandLogo({ brand }: { brand: Brand }) {
  const initials = brand.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const colors = [
    ['#0B1F3A', '#C9A96E'],
    ['#1a3560', '#dbbe93'],
    ['#2D4E7A', '#C9A96E'],
    ['#0B1F3A', '#ffffff'],
    ['#1A1A1A', '#C9A96E'],
    ['#4A3728', '#dbbe93'],
  ];
  const [bg, text] = colors[brand.name.charCodeAt(0) % colors.length];

  return (
    <div
      style={{
        width: '56px',
        height: '56px',
        background: bg,
        borderRadius: 'var(--radius-lg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.125rem',
        fontWeight: 800,
        color: text,
        letterSpacing: '-0.02em',
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}

export function BrandsSection({ brands }: BrandsSectionProps) {
  return (
    <section
      className="section"
      style={{ background: 'var(--color-surface-2)' }}
      aria-labelledby="brands-heading"
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: '2.5rem' }}
        >
          <p className="text-section-title" style={{ marginBottom: '0.75rem' }}>
            Our Brands
          </p>
          <h2 id="brands-heading" className="text-heading-2">
            Premium Eyewear Brands
          </h2>
          <p style={{ color: 'var(--color-muted)', marginTop: '0.625rem', fontSize: '0.9375rem' }}>
            Curated selection of the world&apos;s finest eyewear labels.
          </p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
          }}
          className="brands-grid"
        >
          {brands.map((brand, i) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.07 }}
            >
              <Link
                href={`/brands/${brand.slug}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1.5rem 1rem',
                  background: 'white',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-xl)',
                  textDecoration: 'none',
                  color: 'var(--color-text)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-primary)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-lg)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)';
                  (e.currentTarget as HTMLElement).style.transform = '';
                  (e.currentTarget as HTMLElement).style.boxShadow = '';
                }}
              >
                <BrandLogo brand={brand} />
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '0.125rem' }}>
                    {brand.name}
                  </p>
                  {brand.country && (
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>
                      {brand.country}
                    </p>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          style={{ textAlign: 'center', marginTop: '2.5rem' }}
        >
          <Link href="/brands" className="btn btn-outline">
            View All Brands
          </Link>
        </motion.div>
      </div>

      <style jsx>{`
        @media (min-width: 640px) {
          .brands-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
        @media (min-width: 1024px) {
          .brands-grid {
            grid-template-columns: repeat(6, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
