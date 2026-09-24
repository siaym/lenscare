import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Merge Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format price in BDT
export function formatPrice(amount: number): string {
  return `৳${amount.toLocaleString('en-BD')}`;
}

// Calculate discount percentage
export function calculateDiscount(price: number, salePrice: number): number {
  return Math.round(((price - salePrice) / price) * 100);
}

// Generate WhatsApp order URL
export function generateWhatsAppUrl(
  input:
    | string
    | {
        phone?: string;
        productName: string;
        model?: string;
        color?: string;
        price: number;
        lensType?: string;
        prescriptionStatus?: string;
      }
): string {
  const defaultPhone = '8801700000000';
  if (typeof input === 'string') {
    return `https://wa.me/${defaultPhone}?text=${encodeURIComponent(input)}`;
  }
  const targetPhone = input.phone || defaultPhone;
  const message = encodeURIComponent(
    `Hello, I want to order:\n\n` +
    `Product: ${input.productName}\n` +
    (input.model ? `Model: ${input.model}\n` : '') +
    (input.color ? `Color: ${input.color}\n` : '') +
    `Price: ৳${input.price.toLocaleString()}\n` +
    (input.lensType ? `Lens: ${input.lensType}\n` : '') +
    (input.prescriptionStatus ? `Prescription: ${input.prescriptionStatus}\n` : '') +
    `\nPlease confirm availability.`
  );
  return `https://wa.me/${targetPhone}?text=${message}`;
}

// Generate order number
export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `LC-${timestamp}-${random}`;
}

// Truncate text
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.substring(0, length) + '...';
}

// Slug generation
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Parse prescription value
export function parsePrescriptionValue(value: string): number | null {
  const num = parseFloat(value);
  if (isNaN(num)) return null;
  return Math.round(num * 4) / 4; // Round to nearest 0.25
}

// Get delivery fee based on location
export function getDeliveryFee(division: string): number {
  const insideDhaka = ['dhaka'];
  return insideDhaka.includes(division.toLowerCase()) ? 60 : 120;
}

// Format date
export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-BD', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Get order status label
export const ORDER_STATUS_LABELS: Record<string, string> = {
  PENDING: 'Order Placed',
  CONFIRMED: 'Confirmed',
  PROCESSING: 'Processing',
  LENS_PREPARATION: 'Lens Preparation',
  PACKED: 'Packed',
  SHIPPED: 'Shipped',
  OUT_FOR_DELIVERY: 'Out for Delivery',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
  REFUNDED: 'Refunded',
};

// Get status index for tracker
export const ORDER_STATUS_INDEX: Record<string, number> = {
  PENDING: 0,
  CONFIRMED: 1,
  PROCESSING: 2,
  LENS_PREPARATION: 3,
  PACKED: 4,
  SHIPPED: 5,
  OUT_FOR_DELIVERY: 6,
  DELIVERED: 7,
};

// Bangladesh divisions
export const BD_DIVISIONS = [
  'Dhaka',
  'Chittagong',
  'Rajshahi',
  'Khulna',
  'Barisal',
  'Sylhet',
  'Rangpur',
  'Mymensingh',
];

// Frame size descriptions
export const FRAME_SIZE_GUIDE = {
  narrow: { lensWidth: [44, 48], frameWidth: [124, 129], label: 'Narrow' },
  medium: { lensWidth: [49, 53], frameWidth: [130, 138], label: 'Medium' },
  wide: { lensWidth: [54, 58], frameWidth: [139, 147], label: 'Wide' },
  extraWide: { lensWidth: [59, 64], frameWidth: [148, 160], label: 'Extra Wide' },
};

// Product placeholder image
export function getProductPlaceholder(index: number = 0): string {
  const placeholders = [
    '/images/placeholder-glasses-1.jpg',
    '/images/placeholder-glasses-2.jpg',
    '/images/placeholder-glasses-3.jpg',
    '/images/placeholder-glasses-4.jpg',
  ];
  return placeholders[index % placeholders.length];
}

// Check if product is on sale
export function isOnSale(product: { price: number; salePrice?: number | null }): boolean {
  return !!(product.salePrice && product.salePrice < product.price);
}

// Get effective price
export function getEffectivePrice(product: { price: number; salePrice?: number | null }): number {
  return product.salePrice && product.salePrice < product.price
    ? product.salePrice
    : product.price;
}

// Debounce
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
