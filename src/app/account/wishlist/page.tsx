import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { AccountLayout } from '@/components/account/AccountLayout';
import { MOCK_PRODUCTS } from '@/lib/data/mockData';
import { formatPrice } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'My Wishlist',
  description: 'Saved eyewear frames and sunglasses you love.',
};

export default function AccountWishlistPage() {
  const wishlistProducts = MOCK_PRODUCTS.slice(0, 4);

  return (
    <AccountLayout
      title="My Wishlist"
      subtitle="Save your favorite frames to compare silhouettes and colors before buying."
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {wishlistProducts.map((product) => (
          <div
            key={product.id}
            style={{
              background: 'var(--color-surface)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--color-border)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Link
              href={`/products/${product.slug}`}
              style={{
                position: 'relative',
                height: '180px',
                background: 'var(--color-surface-2)',
                display: 'block',
              }}
            >
              {product.images?.[0]?.url && (
                <Image
                  src={product.images[0].url}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 240px"
                />
              )}
            </Link>

            <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-accent-dark)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                {product.brand?.name || 'Designer'}
              </div>

              <Link
                href={`/products/${product.slug}`}
                style={{
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  color: 'var(--color-text)',
                  textDecoration: 'none',
                  marginBottom: '0.5rem',
                }}
              >
                {product.name}
              </Link>

              <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid var(--color-border)' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--color-primary)' }}>
                    {formatPrice(product.salePrice || product.price)}
                  </div>
                  {product.salePrice && (
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', textDecoration: 'line-through' }}>
                      {formatPrice(product.price)}
                    </div>
                  )}
                </div>

                <Link href={`/products/${product.slug}`} className="btn btn--primary btn--sm" style={{ padding: '0.4rem 0.75rem' }}>
                  View Frame
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AccountLayout>
  );
}
