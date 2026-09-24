import type { Metadata } from 'next';
import { Suspense } from 'react';
import { RegisterPageClient } from './RegisterPageClient';

export const metadata: Metadata = {
  title: 'Create an Account',
  description: 'Join LensCare Bangladesh to enjoy faster checkout, prescription history, and exclusive member discounts.',
};

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="skeleton" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
        </div>
      }
    >
      <RegisterPageClient />
    </Suspense>
  );
}
