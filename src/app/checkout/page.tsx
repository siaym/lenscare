import type { Metadata } from 'next';
import { CheckoutPageClient } from './CheckoutPageClient';

export const metadata: Metadata = {
  title: 'Secure Checkout',
  description: 'Complete your eyewear order with Cash on Delivery or Mobile Banking in Bangladesh.',
};

export default function CheckoutPage() {
  return <CheckoutPageClient />;
}
