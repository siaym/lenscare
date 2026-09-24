import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ShopPageClient } from '@/app/shop/ShopPageClient';

export const metadata: Metadata = {
  title: 'Pre-Order Eyewear',
  description:
    'Reserve upcoming and limited edition designer frames before they arrive in stock. Secure your piece with priority dispatch.',
};

export default function PreOrderPage() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="skeleton" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
        </div>
      }
    >
      <ShopPageClient
        isPreorder={true}
        pageTitle="Pre-Order Exclusives"
        pageSubtitle="Lock in rare designer silhouettes before general release."
        breadcrumbLabel="Pre-Order"
      />
    </Suspense>
  );
}
