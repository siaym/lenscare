'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Eye, ShoppingBag, Check } from 'lucide-react';
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

  const primaryImage = product.images[0]?.url || '/placeholder.jpg';
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
        className="product-card-editorial"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#FFFFFF',
          transition: 'transform 0.25s ease',
        }}
      >
        <Link
          href={`/products/${product.slug}`}
          style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
        >
          {/* Image Container — Clean off-white background */}
          <div
            style={{
              position: 'relative',
              aspectRatio: '1/1',
              backgroundColor: '#F7F5F0',
              overflow: 'hidden',
              borderRadius: '6px',
            }}
          >
            {/* Primary Frame Image */}
            <Image
              src={primaryImage}
              alt={product.name}
              fill
              priority={priority}
              style={{
                objectFit: 'contain',
                padding: '1.25rem',
                mixBlendMode: 'multiply',
                opacity: isHovered && secondaryImage ? 0 : 1,
                transform: isHovered ? 'scale(1.03)' : 'scale(1)',
                transition: 'opacity 0.35s ease, transform 0.4s ease',
              }}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />

            {/* Secondary Lifestyle / Model Image (Crossfade on Hover) */}
            {secondaryImage && (
              <Image
                src={secondaryImage}
                alt={`${product.name} lifestyle`}
                fill
                style={{
                  objectFit: 'cover',
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? 'scale(1.02)' : 'scale(1)',
                  transition: 'opacity 0.35s ease, transform 0.4s ease',
                }}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            )}

            {/* Sale / Pre-Order Badge */}
            <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', zIndex: 2 }}>
              {onSale && (
                <span
                  style={{
                    backgroundColor: '#0B1F3A',
                    color: '#FFFFFF',
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '2px',
                    display: 'inline-block',
                  }}
                >
                  {discount}% OFF
                </span>
              )}
              {product.preorder && (
                <span
                  style={{
                    backgroundColor: '#CFA85B',
                    color: '#07172B',
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '2px',
                    display: 'inline-block',
                  }}
                >
                  PRE-ORDER
                </span>
              )}
            </div>

            {/* Out of Stock Overlay */}
            {isOutOfStock && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 3,
                }}
              >
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#667085', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  Sold Out
                </span>
              </div>
            )}

            {/* Floating Action Controls on Hover */}
            <div
              style={{
                position: 'absolute',
                top: '0.75rem',
                right: '0.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.375rem',
                zIndex: 4,
                opacity: isHovered ? 1 : 0,
                transform: isHovered ? 'translateX(0)' : 'translateX(6px)',
                transition: 'all 0.2s ease',
              }}
            >
              {showWishlist && (
                <button
                  type="button"
                  onClick={handleWishlist}
                  aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E8E5DF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: isWishlisted ? '#C0392B' : '#111827',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <Heart size={14} fill={isWishlisted ? 'currentColor' : 'none'} />
                </button>
              )}

              {showQuickView && (
                <button
                  type="button"
                  onClick={handleQuickView}
                  aria-label="Quick View"
                  title="Quick View"
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E8E5DF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#111827',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <Eye size={14} />
                </button>
              )}
            </div>

            {/* Slide-Up "Add to Bag" bar on Hover */}
            {showAddToCart && !isOutOfStock && (
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '0.625rem',
                  zIndex: 4,
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? 'translateY(0)' : 'translateY(8px)',
                  transition: 'all 0.25s ease',
                }}
              >
                <button
                  type="button"
                  onClick={handleAddToCart}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.375rem',
                    backgroundColor: added ? '#2D7A4F' : '#0B1F3A',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '0.625rem 1rem',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(11, 31, 58, 0.2)',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {added ? (
                    <>
                      <Check size={13} />
                      Added ✓
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={13} />
                      {product.preorder ? 'Pre-Order Now' : 'Add to Bag'}
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Clean Typography Body — Fashion Retailer Hierarchy */}
          <div style={{ paddingTop: '0.875rem' }}>
            {product.brand && (
              <span
                style={{
                  display: 'block',
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  color: '#667085',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '0.25rem',
                }}
              >
                {product.brand.name}
              </span>
            )}

            <h3
              style={{
                fontSize: '0.875rem',
                fontWeight: 500,
                color: '#111827',
                lineHeight: 1.35,
                marginBottom: '0.375rem',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {product.name}
            </h3>

            {/* Price Line */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0B1F3A' }}>
                {formatPrice(effectivePrice)}
              </span>
              {onSale && (
                <span style={{ fontSize: '0.75rem', color: '#9CA3AF', textDecoration: 'line-through' }}>
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
          </div>
        </Link>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={product}
        isOpen={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
      />
    </>
  );
}
