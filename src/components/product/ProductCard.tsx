'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Check } from 'lucide-react';
import type { Product } from '@/types';
import { formatPrice, calculateDiscount, getEffectivePrice, isOnSale } from '@/lib/utils';
import { useCart } from '@/components/cart/CartProvider';
import { useToast } from '@/components/ui/Toaster';
import { QuickViewModal } from '@/components/product/QuickViewModal';

interface ProductCardProps {
  product: Product;
  showWishlist?: boolean;
  showQuickView?: boolean;
  showAddToCart?: boolean;
  priority?: boolean;
}

export function ProductCard({
  product,
  showWishlist = true,
  showQuickView = true,
  showAddToCart = true,
  priority = false,
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const { success, info } = useToast();

  const effectivePrice = getEffectivePrice(product);
  const onSale = isOnSale(product);
  const discount = onSale ? calculateDiscount(product.price, product.salePrice!) : 0;

  const primaryImage = product.images[0]?.url || '/images/products/glasses_rectangle.jpg';
  const secondaryImage = product.images[1]?.url || primaryImage;
  const isOutOfStock = product.stock === 0 && !product.preorder;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;

    addItem({
      productId: product.id,
      product,
      quantity: 1,
      variant: product.variants?.[0],
      unitPrice: effectivePrice,
    });
    setAdded(true);
    success('Added to Bag', product.name);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted((prev) => !prev);
    if (!isWishlisted) {
      success('Saved to Wishlist', product.name);
    } else {
      info('Removed from Wishlist', product.name);
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewOpen(true);
  };

  return (
    <>
      <div
        className="group relative flex flex-col bg-transparent"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link
          href={`/products/${product.slug}`}
          className="block no-underline text-inherit"
        >
          {/* Photography Canvas — Borderless, Soft Warm Neutral */}
          <div className="relative aspect-square w-full bg-[#F8F7F4] overflow-hidden">
            {/* Primary Isolated Frame Image */}
            <Image
              src={primaryImage}
              alt={product.name}
              fill
              priority={priority}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={`object-contain p-6 mix-blend-multiply transition-all duration-500 ease-out ${
                isHovered && secondaryImage ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
              }`}
            />

            {/* Secondary Lifestyle Model Image (Crossfade on Hover) */}
            {secondaryImage && (
              <Image
                src={secondaryImage}
                alt={`${product.name} lifestyle`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className={`object-cover transition-all duration-500 ease-out ${
                  isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
                }`}
              />
            )}

            {/* Subtle Sale / Pre-Order Badge */}
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
              {onSale && (
                <span className="px-2 py-0.5 bg-[#0A192F] text-white text-[10px] uppercase tracking-[0.14em] font-medium">
                  {discount}% Off
                </span>
              )}
              {product.preorder && (
                <span className="px-2 py-0.5 bg-[#C5A880] text-[#0A192F] text-[10px] uppercase tracking-[0.14em] font-semibold">
                  Pre-Order
                </span>
              )}
            </div>

            {/* Sold Out Overlay */}
            {isOutOfStock && (
              <div className="absolute inset-0 bg-white/70 backdrop-blur-xs flex items-center justify-center z-20">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7C8797]">
                  Sold Out
                </span>
              </div>
            )}

            {/* Top Right: Wishlist Heart */}
            {showWishlist && (
              <button
                type="button"
                onClick={handleWishlist}
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                className={`absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#0A192F] flex items-center justify-center shadow-xs transition-all duration-200 ${
                  isWishlisted ? 'text-[#C0392B]' : 'opacity-0 group-hover:opacity-100'
                }`}
              >
                <Heart size={14} fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>
            )}

            {/* Center Quick View Trigger (Subtle hover reveal) */}
            {showQuickView && (
              <button
                type="button"
                onClick={handleQuickView}
                aria-label="Quick View"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 px-4 py-2 bg-white/95 hover:bg-white text-[#0A192F] text-[10px] uppercase tracking-[0.18em] font-medium shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200"
              >
                Quick View
              </button>
            )}

            {/* Slide-Up "Add to Bag" Bottom Action */}
            {showAddToCart && !isOutOfStock && (
              <button
                type="button"
                onClick={handleAddToCart}
                className={`absolute bottom-0 inset-x-0 z-20 h-10 bg-[#0A192F] hover:bg-[#162E52] text-white text-[11px] uppercase tracking-[0.18em] font-medium flex items-center justify-center gap-2 transition-transform duration-300 ease-out ${
                  isHovered || added ? 'translate-y-0' : 'translate-y-full'
                }`}
              >
                {added ? (
                  <>
                    <Check size={13} className="text-[#C5A880]" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={13} />
                    <span>Add to Bag</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Minimalist Editorial Typography Below Image */}
          <div className="pt-3.5 pb-1 flex flex-col gap-1">
            {/* Brand in subtle uppercase tracking */}
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#8C95A3]">
              {product.brand?.name || 'LensCare'}
            </span>

            {/* Product Name */}
            <h3 className="text-sm font-normal text-[#0A192F] group-hover:text-[#C5A880] transition-colors leading-snug line-clamp-1">
              {product.name}
            </h3>

            {/* Price */}
            <div className="flex items-center gap-2.5 pt-0.5">
              <span className="text-sm font-semibold text-[#0A192F]">
                {formatPrice(effectivePrice)}
              </span>
              {onSale && (
                <span className="text-xs text-[#8C95A3] line-through font-normal">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            {/* Color Swatch Dots */}
            {product.variants && product.variants.length > 1 && (
              <div className="flex items-center gap-1.5 pt-1.5">
                {product.variants.slice(0, 4).map((v) => (
                  <span
                    key={v.id}
                    title={v.color}
                    className="w-2.5 h-2.5 rounded-full border border-black/10 inline-block"
                    style={{ backgroundColor: v.colorCode || '#1A1A1A' }}
                  />
                ))}
                {product.variants.length > 4 && (
                  <span className="text-[9px] text-[#8C95A3] font-medium">
                    +{product.variants.length - 4}
                  </span>
                )}
              </div>
            )}
          </div>
        </Link>
      </div>

      {/* Centered Modal Portal */}
      <QuickViewModal
        product={product}
        isOpen={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
      />
    </>
  );
}
