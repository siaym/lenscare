'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Product } from '@/types';
import { formatPrice, calculateDiscount, getEffectivePrice, isOnSale } from '@/lib/utils';
import { useCart } from '@/components/cart/CartProvider';
import { useToast } from '@/components/ui/Toaster';

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
  const { addItem } = useCart();
  const { success, info } = useToast();

  const effectivePrice = getEffectivePrice(product);
  const onSale = isOnSale(product);
  const discount = onSale ? calculateDiscount(product.price, product.salePrice!) : 0;

  const primaryImage = product.images.find((i) => i.isPrimary) || product.images[0];
  const secondaryImage = product.images.find((i) => !i.isPrimary && i !== primaryImage);
  const isOutOfStock = product.stock === 0 && !product.preorder;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;

    addItem({
      productId: product.id,
      product,
      quantity: 1,
      unitPrice: effectivePrice,
    });
    success('Added to cart', product.name);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted((prev) => !prev);
    if (!isWishlisted) {
      success('Added to wishlist', product.name);
    } else {
      info('Removed from wishlist', product.name);
    }
  };

  return (
    <motion.div
      className="product-card"
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
        {/* Image */}
        <div className="product-card__image-wrapper">
          {/* Primary image */}
          {primaryImage ? (
            <Image
              src={primaryImage.url}
              alt={primaryImage.alt || product.name}
              fill
              style={{ objectFit: 'cover' }}
              className="product-card__image"
              priority={priority}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                background: 'var(--color-surface-3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ShoppingBag size={32} style={{ color: 'var(--color-border)' }} />
            </div>
          )}

          {/* Secondary image (hover) */}
          {secondaryImage && (
            <Image
              src={secondaryImage.url}
              alt={secondaryImage.alt || `${product.name} alternate view`}
              fill
              style={{ objectFit: 'cover' }}
              className="product-card__secondary-image"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          )}

          {/* Out of stock overlay */}
          {isOutOfStock && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(255,255,255,0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(1px)',
              }}
            >
              <span className="badge badge-outofstock">Out of Stock</span>
            </div>
          )}

          {/* Badges */}
          <div className="product-card__badges">
            {onSale && <span className="badge badge-sale">{discount}% OFF</span>}
            {product.preorder && <span className="badge badge-preorder">Pre-Order</span>}
            {!onSale && !product.preorder && product.bestSeller && (
              <span className="badge badge-new">Best Seller</span>
            )}
            {!onSale && !product.preorder && !product.bestSeller && product.featured && (
              <span className="badge badge-new" style={{ background: 'var(--color-primary)' }}>Featured</span>
            )}
          </div>

          {/* Action buttons (hover) */}
          <div className="product-card__actions">
            {showWishlist && (
              <button
                onClick={handleWishlist}
                className="product-card__action-btn"
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart
                  size={15}
                  fill={isWishlisted ? 'currentColor' : 'none'}
                  style={{ color: isWishlisted ? '#C0392B' : 'inherit' }}
                />
              </button>
            )}
            {showQuickView && (
              <button
                className="product-card__action-btn"
                aria-label="Quick view"
                title="Quick view"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
              >
                <Eye size={15} />
              </button>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="product-card__body">
          {product.brand && (
            <p className="product-card__brand">{product.brand.name}</p>
          )}
          <h3 className="product-card__name">{product.name}</h3>

          {/* Rating */}
          {product.rating && product.rating > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.375rem' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={11}
                  fill={star <= Math.round(product.rating!) ? '#C9A96E' : 'none'}
                  stroke={star <= Math.round(product.rating!) ? '#C9A96E' : '#D4D4D4'}
                />
              ))}
              {product.reviewCount && product.reviewCount > 0 && (
                <span style={{ fontSize: '0.7rem', color: 'var(--color-muted)' }}>
                  ({product.reviewCount})
                </span>
              )}
            </div>
          )}

          {/* Pricing */}
          <div className="product-card__pricing">
            <span className="product-card__price">{formatPrice(effectivePrice)}</span>
            {onSale && (
              <span className="product-card__original-price">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* Add to Cart */}
          {showAddToCart && (
            <motion.button
              onClick={handleAddToCart}
              className="product-card__add-to-cart"
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 4 }}
              transition={{ duration: 0.15 }}
              disabled={isOutOfStock}
              aria-label={product.preorder ? 'Pre-Order Now' : 'Add to Cart'}
            >
              <ShoppingBag size={13} />
              {isOutOfStock
                ? 'Out of Stock'
                : product.preorder
                ? 'Pre-Order Now'
                : 'Add to Cart'}
            </motion.button>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
