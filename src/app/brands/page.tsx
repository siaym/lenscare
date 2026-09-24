import type { Metadata } from 'next';
import Link from 'next/link';
import { BRANDS, MOCK_PRODUCTS } from '@/lib/data/mockData';
import { ArrowRight, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Eyewear Brands',
  description:
    'Explore genuine international and artisanal eyewear brands available exclusively at LensCare Bangladesh.',
};

export default function BrandsPage() {
  return (
    <>
      <div
        style={{
          background: 'var(--color-primary)',
          color: 'white',
          padding: '3.5rem 0 3rem',
        }}
      >
        <div className="container">
          <nav className="breadcrumb" style={{ marginBottom: '1rem' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.6)' }}>Home</Link>
            <span className="breadcrumb__separator" style={{ color: 'rgba(255,255,255,0.3)' }}>/</span>
            <span style={{ color: 'white' }}>Brands</span>
          </nav>
          <h1 className="text-heading-1" style={{ color: 'white' }}>
            World-Class Eyewear Brands
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: '0.625rem', maxWidth: '600px' }}>
            From precision Japanese titanium to classic Italian acetate, explore 100% authentic designer optical frames.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '3.5rem 1.25rem 5rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {BRANDS.map((brand) => {
            const productCount = MOCK_PRODUCTS.filter((p) => p.brand?.id === brand.id).length;

            return (
              <Link
                key={brand.id}
                href={`/brands/${brand.slug}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '2rem',
                  background: 'var(--color-surface)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all var(--transition-normal)',
                  textDecoration: 'none',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                className="group hover:border-gold hover:shadow-md"
              >
                {brand.featured && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      background: 'rgba(201,169,110,0.15)',
                      color: 'var(--color-accent-dark)',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '999px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    <Sparkles size={12} /> Featured
                  </span>
                )}

                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--color-surface-2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: 'var(--color-primary)',
                    letterSpacing: '-0.03em',
                    marginBottom: '1.25rem',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  {brand.name.substring(0, 2).toUpperCase()}
                </div>

                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: 'var(--color-text)',
                    marginBottom: '0.35rem',
                  }}
                >
                  {brand.name}
                </h3>

                <p
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--color-text-muted)',
                    marginBottom: '1.5rem',
                  }}
                >
                  {brand.country ? `Crafted in ${brand.country}` : 'Premium Optical Line'} • {productCount} {productCount === 1 ? 'Design' : 'Designs'}
                </p>

                <div
                  style={{
                    marginTop: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: 'var(--color-accent-dark)',
                  }}
                >
                  <span>Explore Collection</span>
                  <ArrowRight size={16} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
