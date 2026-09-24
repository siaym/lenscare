import type { Metadata } from 'next';
import { Suspense } from 'react';
import { OrderSuccessClient } from './OrderSuccessClient';

export const metadata: Metadata = {
  title: 'Order Confirmed',
  description: 'Your eyewear order has been successfully placed with LensCare Bangladesh.',
};

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="skeleton" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
        </div>
      }
    >
      <OrderSuccessClient />
    </Suspense>
  );
}
