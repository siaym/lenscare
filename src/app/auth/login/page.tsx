import type { Metadata } from 'next';
import { Suspense } from 'react';
import { LoginPageClient } from './LoginPageClient';

export const metadata: Metadata = {
  title: 'Sign In to LensCare',
  description: 'Log in to your LensCare account to view order status, saved prescriptions, and addresses.',
};

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="skeleton" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
        </div>
      }
    >
      <LoginPageClient />
    </Suspense>
  );
}
