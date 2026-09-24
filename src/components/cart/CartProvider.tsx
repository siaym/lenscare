'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import type { CartItem } from '@/types';

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  total: number;
  deliveryFee: number;
  discount: number;
  couponCode: string | null;
  addItem: (item: Omit<CartItem, 'id' | 'totalPrice'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
  removeCoupon: () => void;
  setDeliveryLocation: (isInsideDhaka: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'lenscare_cart';

function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [deliveryFee, setDeliveryFee] = useState(60);
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const timer = setTimeout(() => {
          setItems(parsed.items || []);
          setDeliveryFee(parsed.deliveryFee || 60);
          setDiscount(parsed.discount || 0);
          setCouponCode(parsed.couponCode || null);
          setIsHydrated(true);
        }, 0);
        return () => clearTimeout(timer);
      }
    } catch {
      // Corrupt storage — start fresh
    }
    const timer = setTimeout(() => setIsHydrated(true), 0);
    return () => clearTimeout(timer);
  }, []);

  // Persist cart to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify({ items, deliveryFee, discount, couponCode })
      );
    } catch {
      // Storage full — ignore
    }
  }, [items, deliveryFee, discount, couponCode, isHydrated]);

  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const total = Math.max(0, subtotal - discount + (subtotal >= 5000 ? 0 : deliveryFee));
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const addItem = useCallback(
    (newItem: Omit<CartItem, 'id' | 'totalPrice'>) => {
      setItems((prev) => {
        // Check if identical item exists (same product + variant + lensConfig)
        const existingIdx = prev.findIndex(
          (item) =>
            item.productId === newItem.productId &&
            item.variantId === newItem.variantId &&
            JSON.stringify(item.lensConfig) === JSON.stringify(newItem.lensConfig)
        );

        if (existingIdx >= 0) {
          const updated = [...prev];
          const existing = updated[existingIdx];
          const qty = existing.quantity + newItem.quantity;
          updated[existingIdx] = {
            ...existing,
            quantity: qty,
            totalPrice: existing.unitPrice * qty,
          };
          return updated;
        }

        const totalPrice = newItem.unitPrice * newItem.quantity;
        return [...prev, { ...newItem, id: generateId(), totalPrice }];
      });
    },
    []
  );

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity, totalPrice: item.unitPrice * quantity }
          : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setDiscount(0);
    setCouponCode(null);
  }, []);

  const applyCoupon = useCallback(
    async (code: string): Promise<{ success: boolean; message: string }> => {
      try {
        const res = await fetch('/api/coupons/validate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code, subtotal }),
        });
        const data = await res.json();

        if (data.success) {
          setDiscount(data.discount);
          setCouponCode(code.toUpperCase());
          return { success: true, message: `Coupon applied! You saved ৳${data.discount}` };
        }
        return { success: false, message: data.message || 'Invalid coupon code' };
      } catch {
        return { success: false, message: 'Failed to apply coupon' };
      }
    },
    [subtotal]
  );

  const removeCoupon = useCallback(() => {
    setDiscount(0);
    setCouponCode(null);
  }, []);

  const setDeliveryLocation = useCallback((isInsideDhaka: boolean) => {
    setDeliveryFee(isInsideDhaka ? 60 : 120);
  }, []);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        total,
        deliveryFee: subtotal >= 5000 ? 0 : deliveryFee,
        discount,
        couponCode,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        applyCoupon,
        removeCoupon,
        setDeliveryLocation,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
