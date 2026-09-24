import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ShopPageClient } from './ShopPageClient';

export const metadata: Metadata = {
  title: 'Shop All Eyewear',
  description: 'Browse our complete collection of premium eyeglasses, sunglasses, and frames. Filter by brand, shape, price and more.',
};

export default function ShopPage() {
  return (
    <Suspense fallback={<ShopSkeleton />}>
      <ShopPageClient />
    </Suspense>
  );
}

function ShopSkeleton() {
  return (
    <div className="container" style={{ padding: '2rem 1.25rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '2rem' }}>
        <div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="skeleton" style={{ height: '120px', marginBottom: '1rem', borderRadius: '12px' }} />
          ))}
        </div>
        <div className="product-grid">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="skeleton" style={{ height: '320px', borderRadius: '12px' }} />
          ))}
        </div>
      </div>
    </div>
  );
}
