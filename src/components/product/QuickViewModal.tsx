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
  const primaryImage = product.images[0]?.url || '/images/products/glasses_rectangle.jpg';
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
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#07172B]/75 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-3xl bg-white shadow-2xl overflow-hidden z-[10000] border border-[#EBE8E0]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-[#F8F7F4] hover:bg-[#EFECE6] text-[#0A192F] w-9 h-9 flex items-center justify-center rounded-full z-20 transition-colors"
              aria-label="Close Quick View"
            >
              <X size={17} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Product Image Side */}
              <div className="relative bg-[#F8F7F4] aspect-square min-h-[320px] flex items-center justify-center p-8">
                <Image
                  src={primaryImage}
                  alt={product.name}
                  fill
                  className="object-contain p-8 mix-blend-multiply"
                  sizes="(max-width: 768px) 100vw, 420px"
                />
                {onSale && (
                  <span className="absolute top-4 left-4 bg-[#0A192F] text-white text-[10px] uppercase tracking-[0.16em] font-medium px-2.5 py-1">
                    {discount}% Off
                  </span>
                )}
              </div>

              {/* Product Details Side */}
              <div className="p-8 sm:p-10 flex flex-col justify-between">
                <div>
                  {product.brand && (
                    <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#C5A880] block mb-2">
                      {product.brand.name}
                    </span>
                  )}
                  <h2 className="font-serif text-2xl font-light text-[#0A192F] leading-snug mb-3">
                    {product.name}
                  </h2>

                  {/* Price */}
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-xl font-semibold text-[#0A192F]">
                      {formatPrice(effectivePrice)}
                    </span>
                    {onSale && (
                      <span className="text-sm text-[#8C95A3] line-through font-normal">
                        {formatPrice(product.price)}
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-[#4A5568] leading-relaxed mb-6 font-normal line-clamp-3">
                    {product.description}
                  </p>

                  {/* Dimensions specs */}
                  {product.dimensions && (
                    <div className="flex items-center gap-4 py-2.5 px-3.5 bg-[#FAF9F5] border border-[#EFECE6] mb-6 text-xs text-[#4A5568]">
                      <span>Lens: <strong className="text-[#0A192F]">{product.dimensions.lensWidth}mm</strong></span>
                      <span>Bridge: <strong className="text-[#0A192F]">{product.dimensions.bridgeWidth}mm</strong></span>
                      <span>Temple: <strong className="text-[#0A192F]">{product.dimensions.templeLength}mm</strong></span>
                    </div>
                  )}

                  {/* Color selector */}
                  {product.variants && product.variants.length > 0 && (
                    <div className="mb-6">
                      <label className="block text-xs font-medium text-[#0A192F] mb-2">
                        Color: <span className="font-normal text-[#667085]">{currentVariant?.color}</span>
                      </label>
                      <div className="flex gap-2">
                        {product.variants.map((v, i) => (
                          <button
                            key={v.id}
                            type="button"
                            onClick={() => setSelectedVariantIndex(i)}
                            className={`w-6 h-6 rounded-full transition-all ${
                              selectedVariantIndex === i
                                ? 'ring-2 ring-offset-2 ring-[#0A192F]'
                                : 'border border-black/10'
                            }`}
                            style={{ backgroundColor: v.colorCode }}
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
                    className={`w-full flex items-center justify-center gap-2 py-3.5 text-xs uppercase tracking-[0.16em] font-medium transition-colors mb-3 ${
                      added
                        ? 'bg-[#2D7A4F] text-white'
                        : isOutOfStock
                        ? 'bg-[#E5E2DB] text-[#8C95A3] cursor-not-allowed'
                        : 'bg-[#0A192F] hover:bg-[#162E52] text-white'
                    }`}
                  >
                    {added ? (
                      <>
                        <Check size={14} className="text-[#C5A880]" />
                        <span>Added to Bag</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={14} />
                        <span>{isOutOfStock ? 'Sold Out' : product.preorder ? 'Pre-Order Now' : 'Add to Bag'}</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-between pt-3 border-t border-[#EFECE6] text-xs">
                    <span className="flex items-center gap-1.5 text-[#7C8797]">
                      <ShieldCheck size={13} className="text-[#C5A880]" />
                      Authentic Optical Verification
                    </span>

                    <Link
                      href={`/products/${product.slug}`}
                      onClick={onClose}
                      className="inline-flex items-center gap-1 text-[#0A192F] hover:text-[#C5A880] font-medium transition-colors"
                    >
                      Full Details <ArrowRight size={12} />
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
