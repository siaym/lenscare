// ============================================================
// LENSCARE — Core Type Definitions
// ============================================================

export type UserRole = 'CUSTOMER' | 'ADMIN' | 'STAFF';

export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'LENS_PREPARATION'
  | 'PACKED'
  | 'SHIPPED'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'REFUNDED';

export type PaymentMethod = 'COD' | 'SSLCOMMERZ';
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';

export type ProductCategory = 'EYEGLASSES' | 'SUNGLASSES' | 'ACCESSORIES';
export type Gender = 'MEN' | 'WOMEN' | 'UNISEX' | 'KIDS';
export type FrameMaterial = 'ACETATE' | 'METAL' | 'TR90' | 'TITANIUM' | 'WOOD' | 'MIXED';
export type FrameType = 'FULL_RIM' | 'HALF_RIM' | 'RIMLESS';
export type ShapeType = 'EYEGLASSES' | 'SUNGLASSES' | 'BOTH';

export type LensType = 'SINGLE_VISION' | 'BIFOCAL' | 'PROGRESSIVE';
export type LensMaterial = 'STANDARD' | 'THIN' | 'ULTRA_THIN';
export type LensCoating = 'ANTI_REFLECTION' | 'BLUE_LIGHT' | 'UV_PROTECTION' | 'PHOTOCHROMIC' | 'TRANSITION';

export interface Brand {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  country?: string;
  featured?: boolean;
  productCount?: number;
}

export interface Shape {
  id: string;
  name: string;
  slug: string;
  image?: string;
  type: ShapeType;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  type: ProductCategory;
}

export interface ProductImage {
  id: string;
  url: string;
  alt?: string;
  order: number;
  isPrimary: boolean;
}

export interface ProductVariant {
  id: string;
  color: string;
  colorCode: string;
  stock: number;
  images?: ProductImage[];
}

export interface ProductDimensions {
  lensWidth?: number;
  bridgeWidth?: number;
  templeLength?: number;
  frameWidth?: number;
  lensHeight?: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  description?: string;
  price: number;
  salePrice?: number;
  stock: number;
  images: ProductImage[];
  variants: ProductVariant[];
  category: ProductCategory;
  brand?: Brand;
  brandId?: string;
  shape?: Shape;
  shapeId?: string;
  material?: FrameMaterial;
  frameType?: FrameType;
  gender?: Gender;
  dimensions?: ProductDimensions;
  prescriptionAvailable: boolean;
  preorder: boolean;
  featured: boolean;
  bestSeller: boolean;
  tags?: string[];
  rating?: number;
  reviewCount?: number;
  estimatedDelivery?: string;
  warranty?: string;
  createdAt: Date;
}

export interface LensConfig {
  type: LensType;
  material: LensMaterial;
  coating: LensCoating;
  price: number;
}

export interface PrescriptionData {
  rightEye: {
    sph: number;
    cyl: number;
    axis: number;
    add?: number;
    pd?: number;
  };
  leftEye: {
    sph: number;
    cyl: number;
    axis: number;
    add?: number;
    pd?: number;
  };
  pdDistance?: number;
  notes?: string;
  prescriptionImageUrl?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  variantId?: string;
  variant?: ProductVariant;
  quantity: number;
  lensConfig?: LensConfig;
  prescription?: PrescriptionData;
  unitPrice: number;
  totalPrice: number;
}

export interface Cart {
  id: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  couponCode?: string;
  itemCount: number;
}

export interface Address {
  id?: string;
  name: string;
  phone: string;
  address: string;
  division: string;
  district: string;
  area?: string;
  postalCode?: string;
  instructions?: string;
  isDefault?: boolean;
}

export interface OrderItem {
  id: string;
  productId: string;
  product: Product;
  variantId?: string;
  variant?: ProductVariant;
  quantity: number;
  price: number;
  lensConfig?: LensConfig;
  prescription?: PrescriptionData;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  items: OrderItem[];
  shippingAddress: Address;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  couponCode?: string;
  notes?: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
  createdAt: Date;
  updatedAt: Date;
  userId?: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  role: UserRole;
  image?: string;
  addresses?: Address[];
  createdAt: Date;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  user: { name?: string; image?: string };
  rating: number;
  comment?: string;
  createdAt: Date;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'PERCENTAGE' | 'FIXED';
  discountValue: number;
  minOrderAmount?: number;
  maxDiscount?: number;
  usageLimit?: number;
  usedCount: number;
  expiresAt?: Date;
  isActive: boolean;
}

// Filter types
export interface ProductFilters {
  category?: ProductCategory;
  gender?: Gender[];
  brandId?: string[];
  shapeId?: string[];
  material?: FrameMaterial[];
  frameType?: FrameType[];
  minPrice?: number;
  maxPrice?: number;
  prescriptionAvailable?: boolean;
  preorder?: boolean;
  inStock?: boolean;
  search?: string;
}

export type SortOption =
  | 'featured'
  | 'newest'
  | 'price-asc'
  | 'price-desc'
  | 'best-selling'
  | 'rating';

// Lens pricing config
export const LENS_PRICES: Record<LensType, Record<LensMaterial, number>> = {
  SINGLE_VISION: { STANDARD: 500, THIN: 800, ULTRA_THIN: 1200 },
  BIFOCAL: { STANDARD: 1000, THIN: 1500, ULTRA_THIN: 2000 },
  PROGRESSIVE: { STANDARD: 2000, THIN: 3000, ULTRA_THIN: 4500 },
};

export const COATING_PRICES: Record<LensCoating, number> = {
  ANTI_REFLECTION: 300,
  BLUE_LIGHT: 500,
  UV_PROTECTION: 300,
  PHOTOCHROMIC: 1500,
  TRANSITION: 2000,
};

export const DELIVERY_FEES = {
  INSIDE_DHAKA: 60,
  OUTSIDE_DHAKA: 120,
};

export const FREE_DELIVERY_THRESHOLD = 5000;
