import type { Metadata } from 'next';
import { Suspense } from 'react';
import { TrackOrderClient } from './TrackOrderClient';

export const metadata: Metadata = {
  title: 'Track Your Order',
  description:
    'Track the real-time optical lab fitting, quality check, and courier transit of your LensCare eyewear order.',
};

export default function TrackOrderPage() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="skeleton" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
        </div>
      }
    >
      <TrackOrderClient />
    </Suspense>
  );
}
