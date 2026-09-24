'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { Shape } from '@/types';

// Curated high-resolution optical frame cutouts for each shape
const SHAPE_IMAGES: Record<string, string> = {
  rectangle: '/images/products/glasses_rectangle.jpg',
  round: '/images/products/glasses_round_gold.jpg',
  'cat-eye': '/images/products/glasses_cateye.jpg',
  aviator: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=400&q=80',
  geometric: '/images/products/glasses_rectangle.jpg',
  clubmaster: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=400&q=80',
  square: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80',
};

interface ShopByShapeSectionProps {
  title?: string;
  subtitle?: string;
  shapes: Shape[];
  basePath: string;
  bg?: string;
}

export function ShopByShapeSection({
  title = 'BROWSE BY FRAME SHAPE',
  subtitle = 'Find the silhouette that naturally flatters your face.',
  shapes,
  basePath,
  bg = '#F7F5F0',
}: ShopByShapeSectionProps) {
  return (
    <section style={{ backgroundColor: bg, padding: '4.5rem 0' }} aria-labelledby="shape-heading">
      <div className="container" style={{ padding: '0 1.25rem' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
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
            {title}
          </p>
          <h2
            id="shape-heading"
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 600,
              color: '#0B1F3A',
              letterSpacing: '-0.02em',
            }}
          >
            {subtitle}
          </h2>
        </div>

        {/* Shape Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
            gap: '1rem',
          }}
          className="shape-grid"
        >
          {shapes.map((shape) => {
            const img = SHAPE_IMAGES[shape.slug] || SHAPE_IMAGES.rectangle;
            return (
              <Link
                key={shape.id}
                href={`${basePath}?shape=${shape.slug}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '6px',
                    padding: '1.25rem 0.75rem 1rem',
                    textAlign: 'center',
                    border: '1px solid #E8E5DF',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  className="shape-card"
                >
                  {/* Frame Silhouette Image */}
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '70px',
                      marginBottom: '0.75rem',
                    }}
                  >
                    <Image
                      src={img}
                      alt={`${shape.name} frame shape`}
                      fill
                      style={{
                        objectFit: 'contain',
                        transition: 'transform 0.3s ease',
                      }}
                      className="shape-img"
                      sizes="(max-width: 640px) 33vw, 160px"
                    />
                  </div>

                  {/* Label & Arrow */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <span
                      style={{
                        fontSize: '0.8125rem',
                        fontWeight: 600,
                        color: '#111827',
                        letterSpacing: '0.01em',
                      }}
                    >
                      {shape.name}
                    </span>
                    <ArrowRight size={12} className="shape-arrow" style={{ opacity: 0, transition: 'opacity 0.2s ease, transform 0.2s ease' }} />
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        .shape-card:hover .shape-img {
          transform: scale(1.06);
        }
        .shape-card:hover .shape-arrow {
          opacity: 1 !important;
          transform: translateX(2px);
          color: #0B1F3A;
        }
        .shape-card:hover {
          border-color: #0B1F3A !important;
          box-shadow: 0 8px 20px rgba(11, 31, 58, 0.08);
        }
      `}</style>
    </section>
  );
}
