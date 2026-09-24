import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ShopPageClient } from '@/app/shop/ShopPageClient';

export const metadata: Metadata = {
  title: 'Designer Sunglasses',
  description:
    'Discover 100% UV400 and polarized sunglasses in Bangladesh. Classic aviators, wayfarers, bold cat-eyes and rimless designs from top brands.',
};

export default function SunglassesPage() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="skeleton" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
        </div>
      }
    >
      <ShopPageClient
        initialCategory="SUNGLASSES"
        pageTitle="Designer Sunglasses"
        pageSubtitle="100% UV400 protection with unmatched contemporary flair."
        breadcrumbLabel="Sunglasses"
      />
    </Suspense>
  );
}
