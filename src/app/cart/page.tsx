import type { Metadata } from 'next';
import { CartPageClient } from './CartPageClient';

export const metadata: Metadata = {
  title: 'Shopping Cart',
  description: 'Review your selected eyewear, lenses, and proceed to secure checkout.',
};

export default function CartPage() {
  return <CartPageClient />;
}
