'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Compass, Ruler } from 'lucide-react';

export function FindYourFrameSection() {
  return (
    <section style={{ backgroundColor: '#FFFFFF', padding: '4.5rem 0', borderTop: '1px solid #F2EFEA', borderBottom: '1px solid #F2EFEA' }}>
      <div className="container" style={{ padding: '0 1.25rem' }}>
        <div
          style={{
            backgroundColor: '#F7F5F0',
            borderRadius: '8px',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: '1fr',
            alignItems: 'center',
          }}
          className="frame-guide-grid"
        >
          {/* Left Text / Guide */}
          <div style={{ padding: '3.5rem 2.5rem' }}>
            <p
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#CFA85B',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: '0.75rem',
              }}
            >
              FRAME FIT GUIDE
            </p>
            <h2
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 2.375rem)',
                fontWeight: 700,
                color: '#0B1F3A',
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                marginBottom: '1rem',
              }}
            >
              Not sure which frame suits your face?
            </h2>
            <p
              style={{
                fontSize: '0.9375rem',
                color: '#667085',
                lineHeight: 1.6,
                maxWidth: '460px',
                marginBottom: '2rem',
              }}
            >
              Every face is unique. Our optical fit guide helps you calculate your exact lens width, temple length, and frame proportions for effortless all-day comfort.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0B1F3A' }}>
                  <Compass size={16} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#111827', margin: 0 }}>Silhouette Match</h4>
                  <p style={{ fontSize: '0.75rem', color: '#667085', margin: 0 }}>Round, square, oval, or heart face geometry.</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0B1F3A' }}>
                  <Ruler size={16} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#111827', margin: 0 }}>Millimeter Precision</h4>
                  <p style={{ fontSize: '0.75rem', color: '#667085', margin: 0 }}>Standard lens, bridge, and temple dimensions.</p>
                </div>
              </div>
            </div>

            <Link
              href="/eyeglasses"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: '#0B1F3A',
                color: '#FFFFFF',
                padding: '0.875rem 1.625rem',
                borderRadius: '4px',
                fontSize: '0.875rem',
                fontWeight: 600,
                textDecoration: 'none',
                letterSpacing: '0.02em',
                transition: 'background 0.15s ease',
              }}
            >
              Explore Frame Catalog <ArrowRight size={15} />
            </Link>
          </div>

          {/* Right Editorial Image */}
          <div
            style={{
              position: 'relative',
              minHeight: '380px',
              height: '100%',
              overflow: 'hidden',
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=1000&q=85"
              alt="Professional optometrist and eyewear fitting"
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 1023px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 1024px) {
          .frame-guide-grid {
            grid-template-columns: 1.15fr 0.85fr !important;
          }
        }
      `}</style>
    </section>
  );
}
