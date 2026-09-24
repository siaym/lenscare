'use client';

import { useState, useEffect, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import type { Product } from '@/types';
import { formatPrice, calculateDiscount, getEffectivePrice, isOnSale } from '@/lib/utils';
import { useCart } from '@/components/cart/CartProvider';
import { useToast } from '@/components/ui/Toaster';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const { addItem } = useCart();
  const { success } = useToast();
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [added, setAdded] = useState(false);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!mounted || !product) return null;

  const effectivePrice = getEffectivePrice(product);
  const onSale = isOnSale(product);
  const discount = onSale ? calculateDiscount(product.price, product.salePrice!) : 0;
  const primaryImage = product.images[0]?.url || '/placeholder.jpg';
  const isOutOfStock = product.stock === 0 && !product.preorder;
  const currentVariant = product.variants?.[selectedVariantIndex];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isOutOfStock) return;

    addItem({
      productId: product.id,
      product,
      quantity: 1,
      variant: currentVariant,
      unitPrice: effectivePrice,
    });
    setAdded(true);
    success('Added to Bag', `${product.name}${currentVariant ? ` (${currentVariant.color})` : ''}`);
    setTimeout(() => setAdded(false), 2000);
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(7, 23, 43, 0.72)',
              backdropFilter: 'blur(4px)',
            }}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '840px',
              backgroundColor: '#FFFFFF',
              borderRadius: '8px',
              boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.35)',
              overflow: 'hidden',
              zIndex: 10000,
            }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                backgroundColor: '#F7F5F0',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#111827',
                zIndex: 10,
                transition: 'background 0.15s ease',
              }}
              aria-label="Close Quick View"
            >
              <X size={18} />
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
              {/* Product Image Side */}
              <div
                style={{
                  position: 'relative',
                  backgroundColor: '#F7F5F0',
                  aspectRatio: '1/1',
                  minHeight: '350px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '2.5rem',
                }}
              >
                <Image
                  src={primaryImage}
                  alt={product.name}
                  fill
                  style={{ objectFit: 'contain', padding: '1.75rem' }}
                  sizes="(max-width: 768px) 100vw, 420px"
                />
                {onSale && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '1.25rem',
                      left: '1.25rem',
                      backgroundColor: '#0B1F3A',
                      color: '#FFFFFF',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      padding: '0.25rem 0.625rem',
                      borderRadius: '2px',
                    }}
                  >
                    {discount}% OFF
                  </span>
                )}
              </div>

              {/* Product Details Side */}
              <div style={{ padding: '2.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  {product.brand && (
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#CFA85B', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '0.375rem' }}>
                      {product.brand.name}
                    </span>
                  )}
                  <h2 style={{ fontSize: '1.375rem', fontWeight: 600, color: '#111827', lineHeight: 1.25, marginBottom: '0.75rem' }}>
                    {product.name}
                  </h2>

                  {/* Price */}
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1.25rem' }}>
                    <span style={{ fontSize: '1.375rem', fontWeight: 700, color: '#0B1F3A' }}>
                      {formatPrice(effectivePrice)}
                    </span>
                    {onSale && (
                      <span style={{ fontSize: '0.9375rem', color: '#9CA3AF', textDecoration: 'line-through' }}>
                        {formatPrice(product.price)}
                      </span>
                    )}
                  </div>

                  <p style={{ fontSize: '0.875rem', color: '#667085', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    {product.description}
                  </p>

                  {/* Dimensions specs */}
                  {product.dimensions && (
                    <div style={{ display: 'flex', gap: '1rem', padding: '0.625rem 0.875rem', backgroundColor: '#F7F5F0', borderRadius: '4px', marginBottom: '1.5rem', fontSize: '0.75rem', color: '#374151' }}>
                      <span>Lens: <strong>{product.dimensions.lensWidth}mm</strong></span>
                      <span>Bridge: <strong>{product.dimensions.bridgeWidth}mm</strong></span>
                      <span>Temple: <strong>{product.dimensions.templeLength}mm</strong></span>
                    </div>
                  )}

                  {/* Color selector */}
                  {product.variants && product.variants.length > 0 && (
                    <div style={{ marginBottom: '1.75rem' }}>
                      <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#111827', marginBottom: '0.5rem' }}>
                        Color: <span style={{ fontWeight: 400, color: '#667085' }}>{currentVariant?.color}</span>
                      </label>
                      <div style={{ display: 'flex', gap: '0.625rem' }}>
                        {product.variants.map((v, i) => (
                          <button
                            key={v.id}
                            type="button"
                            onClick={() => setSelectedVariantIndex(i)}
                            style={{
                              width: '26px',
                              height: '26px',
                              borderRadius: '50%',
                              backgroundColor: v.colorCode,
                              border: selectedVariantIndex === i ? '2px solid #0B1F3A' : '1px solid #E8E5DF',
                              boxShadow: selectedVariantIndex === i ? '0 0 0 2px #FFFFFF inset' : 'none',
                              cursor: 'pointer',
                              padding: 0,
                            }}
                            title={v.color}
                            aria-label={`Select ${v.color}`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div>
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={isOutOfStock}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      backgroundColor: added ? '#2D7A4F' : '#0B1F3A',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '0.875rem 1.25rem',
                      borderRadius: '4px',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      letterSpacing: '0.03em',
                      cursor: isOutOfStock ? 'not-allowed' : 'pointer',
                      opacity: isOutOfStock ? 0.6 : 1,
                      marginBottom: '1rem',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {added ? (
                      <>
                        <Check size={16} />
                        Added ✓
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={16} />
                        {isOutOfStock ? 'Out of Stock' : product.preorder ? 'Pre-Order Now' : 'Add to Bag'}
                      </>
                    )}
                  </button>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid #F2EFEA' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: '#667085' }}>
                      <ShieldCheck size={14} color="#CFA85B" />
                      100% Authentic Eyewear
                    </span>

                    <Link
                      href={`/products/${product.slug}`}
                      onClick={onClose}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        fontSize: '0.8125rem',
                        fontWeight: 600,
                        color: '#0B1F3A',
                        textDecoration: 'none',
                      }}
                    >
                      Full Details <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
