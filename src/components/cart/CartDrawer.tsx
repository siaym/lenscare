'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { X, ShoppingBag, Trash2, Plus, Minus, Tag, ChevronRight } from 'lucide-react';
import { useCart } from './CartProvider';
import { formatPrice } from '@/lib/utils';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, itemCount, subtotal, total, deliveryFee, discount, couponCode, removeItem, updateQuantity } = useCart();

  // Lock body scroll when open
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="cart-drawer__overlay"
            onClick={onClose}
            aria-hidden
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            className="cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          >
            {/* Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.25rem 1.5rem',
                borderBottom: '1px solid var(--color-border)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <ShoppingBag size={20} color="var(--color-primary)" />
                <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                  Your Cart
                </h2>
                {itemCount > 0 && (
                  <span
                    style={{
                      background: 'var(--color-accent)',
                      color: 'var(--color-primary)',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      padding: '0.1rem 0.5rem',
                      borderRadius: '100px',
                    }}
                  >
                    {itemCount}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                aria-label="Close cart"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '2rem',
                  height: '2rem',
                  background: 'var(--color-surface-2)',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  color: 'var(--color-text)',
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Items */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.5rem' }}>
              {items.length === 0 ? (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1rem',
                    height: '60%',
                    textAlign: 'center',
                    color: 'var(--color-muted)',
                  }}
                >
                  <ShoppingBag size={48} style={{ opacity: 0.3 }} />
                  <div>
                    <p style={{ fontWeight: 600, marginBottom: '0.375rem', color: 'var(--color-text)' }}>
                      Your cart is empty
                    </p>
                    <p style={{ fontSize: '0.875rem' }}>
                      Add some eyewear to get started
                    </p>
                  </div>
                  <Link
                    href="/shop"
                    onClick={onClose}
                    className="btn btn-primary btn-sm"
                  >
                    Browse Products
                  </Link>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {items.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: 'flex',
                        gap: '0.875rem',
                        padding: '0.875rem',
                        background: 'var(--color-surface-2)',
                        borderRadius: 'var(--radius-lg)',
                      }}
                    >
                      {/* Image */}
                      <div
                        style={{
                          width: '72px',
                          height: '56px',
                          borderRadius: 'var(--radius-md)',
                          overflow: 'hidden',
                          flexShrink: 0,
                          background: 'var(--color-surface-3)',
                        }}
                      >
                        {item.product?.images?.[0]?.url && (
                          <Image
                            src={item.product.images[0].url}
                            alt={item.product.name}
                            width={72}
                            height={56}
                            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                          />
                        )}
                      </div>

                      {/* Details */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p
                          style={{
                            fontSize: '0.8125rem',
                            fontWeight: 600,
                            color: 'var(--color-text)',
                            marginBottom: '0.125rem',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {item.product?.name}
                        </p>
                        {item.variant && (
                          <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)', marginBottom: '0.25rem' }}>
                            {item.variant.color}
                          </p>
                        )}
                        {item.lensConfig && (
                          <p style={{ fontSize: '0.7rem', color: 'var(--color-accent-dark)', marginBottom: '0.25rem', fontWeight: 500 }}>
                            + {item.lensConfig.type.replace('_', ' ')} lens
                          </p>
                        )}

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                          {/* Qty controls */}
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              background: 'white',
                              border: '1px solid var(--color-border)',
                              borderRadius: 'var(--radius-md)',
                              padding: '0.25rem',
                            }}
                          >
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              style={{ display: 'flex', alignItems: 'center', padding: '0.125rem', cursor: 'pointer', border: 'none', background: 'none', color: 'var(--color-text)' }}
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} />
                            </button>
                            <span style={{ fontSize: '0.8125rem', fontWeight: 600, minWidth: '1.25rem', textAlign: 'center' }}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              style={{ display: 'flex', alignItems: 'center', padding: '0.125rem', cursor: 'pointer', border: 'none', background: 'none', color: 'var(--color-text)' }}
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                              {formatPrice(item.totalPrice)}
                            </span>
                            <button
                              onClick={() => removeItem(item.id)}
                              style={{ display: 'flex', border: 'none', background: 'none', cursor: 'pointer', color: 'var(--color-subtle)', padding: '0.125rem' }}
                              aria-label="Remove item"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div
                style={{
                  borderTop: '1px solid var(--color-border)',
                  padding: '1.25rem 1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}
              >
                {/* Price breakdown */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--color-muted)' }}>
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--color-success)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                        <Tag size={12} />
                        Coupon ({couponCode})
                      </span>
                      <span>−{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--color-muted)' }}>
                    <span>Delivery</span>
                    <span>
                      {subtotal >= 5000 ? (
                        <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>FREE</span>
                      ) : (
                        formatPrice(deliveryFee)
                      )}
                    </span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontWeight: 700,
                      fontSize: '1rem',
                      color: 'var(--color-primary)',
                      paddingTop: '0.5rem',
                      borderTop: '1px solid var(--color-border)',
                    }}
                  >
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                {subtotal < 5000 && (
                  <div
                    style={{
                      background: 'var(--color-surface-2)',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.5rem 0.75rem',
                      fontSize: '0.75rem',
                      color: 'var(--color-muted)',
                      textAlign: 'center',
                    }}
                  >
                    Add {formatPrice(5000 - subtotal)} more for <strong>free delivery</strong>
                  </div>
                )}

                {/* Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                  <Link
                    href="/checkout"
                    onClick={onClose}
                    className="btn btn-primary"
                    style={{ justifyContent: 'center', gap: '0.5rem', fontSize: '0.875rem' }}
                  >
                    Proceed to Checkout
                    <ChevronRight size={16} />
                  </Link>
                  <Link
                    href="/cart"
                    onClick={onClose}
                    className="btn btn-outline"
                    style={{ justifyContent: 'center', fontSize: '0.875rem' }}
                  >
                    View Cart
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
