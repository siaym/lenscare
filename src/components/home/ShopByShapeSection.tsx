'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Shape } from '@/types';

// SVG shapes for each frame type
const SHAPE_SVGS: Record<string, React.ReactNode> = {
  rectangle: (
    <svg viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="64" height="32">
      <rect x="4" y="8" width="32" height="24" rx="3" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <rect x="44" y="8" width="32" height="24" rx="3" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <line x1="36" y1="20" x2="44" y2="20" stroke="currentColor" strokeWidth="2.5" />
      <line x1="4" y1="20" x2="0" y2="14" stroke="currentColor" strokeWidth="2.5" />
      <line x1="76" y1="20" x2="80" y2="14" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  ),
  round: (
    <svg viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="64" height="32">
      <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <circle cx="60" cy="20" r="16" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <line x1="36" y1="20" x2="44" y2="20" stroke="currentColor" strokeWidth="2.5" />
      <line x1="4" y1="20" x2="0" y2="14" stroke="currentColor" strokeWidth="2.5" />
      <line x1="76" y1="20" x2="80" y2="14" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  ),
  'cat-eye': (
    <svg viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="64" height="32">
      <path d="M4 24 Q4 8 20 8 L36 8 Q36 8 34 24 Q34 32 20 32 Q6 32 4 24Z" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <path d="M44 24 Q44 8 60 8 L76 8 Q76 8 74 24 Q74 32 60 32 Q46 32 44 24Z" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <line x1="36" y1="18" x2="44" y2="18" stroke="currentColor" strokeWidth="2.5" />
      <line x1="4" y1="20" x2="0" y2="14" stroke="currentColor" strokeWidth="2.5" />
      <line x1="76" y1="20" x2="80" y2="14" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  ),
  aviator: (
    <svg viewBox="0 0 80 44" fill="none" xmlns="http://www.w3.org/2000/svg" width="64" height="36">
      <path d="M4 16 Q4 8 20 8 L34 8 Q38 8 36 22 Q34 36 20 36 Q6 36 4 16Z" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <path d="M44 16 Q44 8 60 8 L74 8 Q78 8 76 22 Q74 36 60 36 Q46 36 44 16Z" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <line x1="36" y1="14" x2="44" y2="14" stroke="currentColor" strokeWidth="2.5" />
      <line x1="4" y1="16" x2="0" y2="10" stroke="currentColor" strokeWidth="2.5" />
      <line x1="76" y1="16" x2="80" y2="10" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  ),
  geometric: (
    <svg viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="64" height="32">
      <polygon points="20,8 36,14 34,28 20,34 4,28 4,14" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <polygon points="60,8 76,14 74,28 60,34 44,28 44,14" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <line x1="36" y1="20" x2="44" y2="20" stroke="currentColor" strokeWidth="2.5" />
      <line x1="4" y1="20" x2="0" y2="14" stroke="currentColor" strokeWidth="2.5" />
      <line x1="74" y1="20" x2="80" y2="14" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  ),
  clubmaster: (
    <svg viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="64" height="32">
      <path d="M4 12 L36 12" stroke="currentColor" strokeWidth="3" />
      <path d="M44 12 L76 12" stroke="currentColor" strokeWidth="3" />
      <path d="M4 12 Q4 32 20 32 Q36 32 36 12" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M44 12 Q44 32 60 32 Q76 32 76 12" stroke="currentColor" strokeWidth="2" fill="none" />
      <line x1="36" y1="18" x2="44" y2="18" stroke="currentColor" strokeWidth="2" />
      <line x1="4" y1="12" x2="0" y2="8" stroke="currentColor" strokeWidth="2" />
      <line x1="76" y1="12" x2="80" y2="8" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  square: (
    <svg viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="64" height="32">
      <rect x="4" y="8" width="32" height="24" rx="1" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <rect x="44" y="8" width="32" height="24" rx="1" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <line x1="36" y1="20" x2="44" y2="20" stroke="currentColor" strokeWidth="2.5" />
      <line x1="4" y1="20" x2="0" y2="14" stroke="currentColor" strokeWidth="2.5" />
      <line x1="76" y1="20" x2="80" y2="14" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  ),
};

interface ShopByShapeSectionProps {
  title: string;
  subtitle?: string;
  shapes: Shape[];
  basePath: string;
  bg?: string;
}

export function ShopByShapeSection({
  title,
  subtitle,
  shapes,
  basePath,
  bg = 'var(--color-surface-2)',
}: ShopByShapeSectionProps) {
  return (
    <section className="section" style={{ background: bg }} aria-labelledby="shape-heading">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: '2.5rem' }}
        >
          <p className="text-section-title" style={{ marginBottom: '0.75rem' }}>
            Browse by Frame Shape
          </p>
          <h2 id="shape-heading" className="text-heading-2" style={{ marginBottom: subtitle ? '0.75rem' : 0 }}>
            {title}
          </h2>
          {subtitle && (
            <p style={{ color: 'var(--color-muted)', fontSize: '0.9375rem' }}>{subtitle}</p>
          )}
        </motion.div>

        {/* Shape Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0.875rem',
          }}
          className="shape-grid"
        >
          {shapes.map((shape, i) => (
            <motion.div
              key={shape.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Link
                href={`${basePath}?shape=${shape.slug}`}
                className="shape-card"
                aria-label={`Browse ${shape.name} frames`}
              >
                <div style={{ color: 'inherit' }}>
                  {SHAPE_SVGS[shape.slug] || SHAPE_SVGS['rectangle']}
                </div>
                <span className="shape-card__label">{shape.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 640px) {
          .shape-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
        @media (min-width: 768px) {
          .shape-grid {
            grid-template-columns: repeat(7, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
