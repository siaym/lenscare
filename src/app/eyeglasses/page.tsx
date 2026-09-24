import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ShopPageClient } from '@/app/shop/ShopPageClient';

export const metadata: Metadata = {
  title: 'Prescription Eyeglasses',
  description:
    'Browse our curated collection of prescription eyeglasses in Bangladesh. Premium titanium, acetate, and metal frames with anti-glare, blue cut, and progressive lenses.',
};

export default function EyeglassesPage() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="skeleton" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
        </div>
      }
    >
      <ShopPageClient
        initialCategory="EYEGLASSES"
        pageTitle="Prescription Eyeglasses"
        pageSubtitle="Engineered for all-day comfort and crystal-clear optical clarity."
        breadcrumbLabel="Eyeglasses"
      />
    </Suspense>
  );
}
