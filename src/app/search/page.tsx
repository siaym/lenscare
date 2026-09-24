import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ShopPageClient } from '@/app/shop/ShopPageClient';

export const metadata: Metadata = {
  title: 'Search Eyewear',
  description: 'Search for prescription eyeglasses, designer sunglasses, and lens options.',
};

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="skeleton" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
        </div>
      }
    >
      <ShopPageClient
        pageTitle="Search Eyewear Collection"
        pageSubtitle="Search by frame silhouette, color, brand, or model SKU."
        breadcrumbLabel="Search"
      />
    </Suspense>
  );
}
