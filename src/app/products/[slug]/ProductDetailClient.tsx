'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  ShoppingBag,
  Star,
  Shield,
  Truck,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  ZoomIn,
} from 'lucide-react';
import type { Product } from '@/types';
import { formatPrice, calculateDiscount, getEffectivePrice, isOnSale, generateWhatsAppUrl } from '@/lib/utils';
import { useCart } from '@/components/cart/CartProvider';
import { useToast } from '@/components/ui/Toaster';
import { ProductCard } from '@/components/product/ProductCard';
import { PrescriptionFlow } from '@/components/product/PrescriptionFlow';

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants[0]?.id || null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [prescriptionFlowOpen, setPrescriptionFlowOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>('description');
  const { addItem } = useCart();
  const { success } = useToast();

  const selectedVariant = product.variants.find((v) => v.id === selectedVariantId);
  const effectivePrice = getEffectivePrice(product);
  const onSale = isOnSale(product);
  const discount = onSale ? calculateDiscount(product.price, product.salePrice!) : 0;
  const isOutOfStock = (selectedVariant?.stock || product.stock) === 0 && !product.preorder;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addItem({
      productId: product.id,
      product,
      variantId: selectedVariantId || undefined,
      variant: selectedVariant,
      quantity,
      unitPrice: effectivePrice,
    });
    success('Added to cart!', product.name);
  };

  const whatsappUrl = generateWhatsAppUrl({
    phone: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '8801XXXXXXXXX',
    productName: product.name,
    model: product.sku,
    color: selectedVariant?.color,
    price: effectivePrice,
  });

  const toggleSection = (section: string) =>
    setExpandedSection(expandedSection === section ? null : section);

  const INFO_SECTIONS = [
    {
      id: 'description',
      title: 'Description',
      content: product.description || 'Premium quality eyewear crafted with precision and style.',
    },
    {
      id: 'specs',
      title: 'Specifications',
      content: [
        product.material && `Material: ${product.material.replace('_', ' ')}`,
        product.frameType && `Frame Type: ${product.frameType.replace('_', ' ')}`,
        product.gender && `Gender: ${product.gender}`,
        product.dimensions?.lensWidth && `Lens Width: ${product.dimensions.lensWidth}mm`,
        product.dimensions?.bridgeWidth && `Bridge Width: ${product.dimensions.bridgeWidth}mm`,
        product.dimensions?.templeLength && `Temple Length: ${product.dimensions.templeLength}mm`,
      ].filter(Boolean).join('\n'),
    },
    {
      id: 'warranty',
      title: 'Warranty & Returns',
      content: `Warranty: ${product.warranty || '1 Year'}\n\n7-day hassle-free exchange on all unworn frames. Please bring original packaging and receipt.`,
    },
    {
      id: 'delivery',
      title: 'Delivery Information',
      content: `Estimated delivery: ${product.estimatedDelivery || '3-5 business days'}\n\nInside Dhaka: ৳60\nOutside Dhaka: ৳120\nFree delivery on orders over ৳5,000`,
    },
  ];

  return (
    <>
      {/* Breadcrumb */}
      <div style={{ background: 'var(--color-surface-2)', padding: '0.875rem 0', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="breadcrumb__separator">/</span>
            <Link href="/shop">Shop</Link>
            <span className="breadcrumb__separator">/</span>
            <Link href={`/${product.category.toLowerCase()}`}>
              {product.category === 'EYEGLASSES' ? 'Eyeglasses' : product.category === 'SUNGLASSES' ? 'Sunglasses' : 'Shop'}
            </Link>
            <span className="breadcrumb__separator">/</span>
            <span style={{ color: 'var(--color-text)' }}>{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container" style={{ padding: '2.5rem 1.25rem' }}>
        {/* Product Grid */}
        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }}
          className="product-detail-grid"
        >
          {/* === LEFT: Gallery === */}
          <div>
            {/* Main Image */}
            <div
              style={{
                position: 'relative',
                aspectRatio: '4/3',
                borderRadius: 'var(--radius-2xl)',
                overflow: 'hidden',
                background: 'var(--color-surface-2)',
                marginBottom: '0.875rem',
                cursor: 'zoom-in',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ position: 'absolute', inset: 0 }}
                >
                  {product.images[selectedImageIndex] ? (
                    <Image
                      src={product.images[selectedImageIndex].url}
                      alt={product.images[selectedImageIndex].alt || product.name}
                      fill
                      priority
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ShoppingBag size={64} style={{ color: 'var(--color-border)' }} />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Badges */}
              <div style={{ position: 'absolute', top: '1rem', left: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', zIndex: 1 }}>
                {onSale && <span className="badge badge-sale">{discount}% OFF</span>}
                {product.preorder && <span className="badge badge-preorder">Pre-Order</span>}
              </div>

              <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', zIndex: 1 }}>
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.5rem',
                    background: 'rgba(255,255,255,0.9)',
                    borderRadius: 'var(--radius-md)',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--color-primary)',
                  }}
                  aria-label="Zoom image"
                >
                  <ZoomIn size={18} />
                </button>
              </div>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div style={{ display: 'flex', gap: '0.625rem', overflowX: 'auto' }} className="scrollbar-hide">
                {product.images.map((img, i) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImageIndex(i)}
                    style={{
                      flexShrink: 0,
                      width: '72px',
                      height: '56px',
                      borderRadius: 'var(--radius-lg)',
                      overflow: 'hidden',
                      border: i === selectedImageIndex ? '2px solid var(--color-primary)' : '2px solid var(--color-border)',
                      background: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      transition: 'border-color 0.15s ease',
                    }}
                    aria-label={`View image ${i + 1}`}
                  >
                    <Image
                      src={img.url}
                      alt={img.alt || `${product.name} ${i + 1}`}
                      width={72}
                      height={56}
                      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* === RIGHT: Info === */}
          <div>
            {/* Brand */}
            {product.brand && (
              <Link
                href={`/brands/${product.brand.slug}`}
                style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-accent-dark)', letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block', marginBottom: '0.625rem' }}
              >
                {product.brand.name}
              </Link>
            )}

            {/* Name */}
            <h1 style={{ fontSize: 'clamp(1.375rem, 3vw, 1.875rem)', fontWeight: 700, color: 'var(--color-text)', lineHeight: 1.2, marginBottom: '0.875rem' }}>
              {product.name}
            </h1>

            {/* Rating */}
            {product.rating && product.rating > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', gap: '2px' }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={14} fill={s <= Math.round(product.rating!) ? '#C9A96E' : 'none'} stroke={s <= Math.round(product.rating!) ? '#C9A96E' : '#D4D4D4'} />
                  ))}
                </div>
                <span style={{ fontSize: '0.875rem', color: 'var(--color-muted)' }}>
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
            )}

            {/* Pricing */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                {formatPrice(effectivePrice)}
              </span>
              {onSale && (
                <>
                  <span style={{ fontSize: '1.125rem', color: 'var(--color-subtle)', textDecoration: 'line-through' }}>
                    {formatPrice(product.price)}
                  </span>
                  <span className="badge badge-sale">{discount}% OFF</span>
                </>
              )}
            </div>

            {/* Color Variants */}
            {product.variants.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text)', marginBottom: '0.625rem' }}>
                  Color: <span style={{ fontWeight: 400, color: 'var(--color-muted)' }}>{selectedVariant?.color}</span>
                </p>
                <div style={{ display: 'flex', gap: '0.625rem', flexWrap: 'wrap' }}>
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariantId(v.id)}
                      aria-label={`Select ${v.color}`}
                      title={v.color}
                      style={{
                        width: '2rem',
                        height: '2rem',
                        borderRadius: '50%',
                        background: v.colorCode,
                        border: v.id === selectedVariantId
                          ? '3px solid var(--color-primary)'
                          : '2px solid var(--color-border)',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        boxShadow: v.id === selectedVariantId ? '0 0 0 2px white, 0 0 0 4px var(--color-primary)' : 'none',
                        outline: 'none',
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* SKU & Availability */}
            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)', marginBottom: '0.125rem' }}>Model</p>
                <p style={{ fontSize: '0.875rem', fontWeight: 600, fontFamily: 'monospace' }}>{product.sku}</p>
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)', marginBottom: '0.125rem' }}>Availability</p>
                <p style={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: isOutOfStock ? '#C0392B' : '#2D7A4F',
                }}>
                  {product.preorder ? '📦 Pre-Order Available' : isOutOfStock ? 'Out of Stock' : `✓ In Stock (${selectedVariant?.stock || product.stock} left)`}
                </p>
              </div>
            </div>

            {/* Dimensions */}
            {product.dimensions && (
              <div
                style={{
                  background: 'var(--color-surface-2)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '0.875rem 1rem',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  gap: '1.25rem',
                  flexWrap: 'wrap',
                }}
              >
                {product.dimensions.lensWidth && (
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-primary)' }}>{product.dimensions.lensWidth}</p>
                    <p style={{ fontSize: '0.7rem', color: 'var(--color-muted)' }}>Lens</p>
                  </div>
                )}
                {product.dimensions.bridgeWidth && (
                  <>
                    <span style={{ color: 'var(--color-border)', alignSelf: 'center' }}>□</span>
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-primary)' }}>{product.dimensions.bridgeWidth}</p>
                      <p style={{ fontSize: '0.7rem', color: 'var(--color-muted)' }}>Bridge</p>
                    </div>
                  </>
                )}
                {product.dimensions.templeLength && (
                  <>
                    <span style={{ color: 'var(--color-border)', alignSelf: 'center' }}>–</span>
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-primary)' }}>{product.dimensions.templeLength}</p>
                      <p style={{ fontSize: '0.7rem', color: 'var(--color-muted)' }}>Temple</p>
                    </div>
                  </>
                )}
                <Link href="/size-guide" style={{ marginLeft: 'auto', alignSelf: 'center', fontSize: '0.75rem', color: 'var(--color-accent-dark)', textDecoration: 'underline', fontWeight: 500 }}>
                  Size Guide →
                </Link>
              </div>
            )}

            {/* Quantity */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
              <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>Qty:</p>
              <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ padding: '0.5rem 0.875rem', border: 'none', background: 'var(--color-surface-2)', cursor: 'pointer', fontSize: '1.125rem', color: 'var(--color-text)' }}
                >
                  −
                </button>
                <span style={{ padding: '0.5rem 1rem', fontWeight: 700, minWidth: '2.5rem', textAlign: 'center' }}>{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ padding: '0.5rem 0.875rem', border: 'none', background: 'var(--color-surface-2)', cursor: 'pointer', fontSize: '1.125rem', color: 'var(--color-text)' }}
                >
                  +
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="btn btn-primary btn-lg"
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}
              >
                <ShoppingBag size={18} />
                {isOutOfStock ? 'Out of Stock' : product.preorder ? 'Pre-Order Now' : 'Add to Cart'}
              </button>

              {product.prescriptionAvailable && (
                <button
                  onClick={() => setPrescriptionFlowOpen(true)}
                  className="btn btn-outline btn-lg"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}
                >
                  👁️ Add Power Lens
                </button>
              )}

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-lg btn-whatsapp"
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', textDecoration: 'none' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
                Order via WhatsApp
              </a>

              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="btn btn-ghost"
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', color: isWishlisted ? '#C0392B' : 'var(--color-muted)' }}
              >
                <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
                {isWishlisted ? 'Saved to Wishlist' : 'Save to Wishlist'}
              </button>
            </div>

            {/* Trust badges */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0.875rem',
                padding: '1rem',
                background: 'var(--color-surface-2)',
                borderRadius: 'var(--radius-xl)',
                marginBottom: '1.5rem',
              }}
            >
              {[
                { icon: <Shield size={16} />, label: 'Authentic' },
                { icon: <Truck size={16} />, label: 'Fast Delivery' },
                { icon: <RefreshCw size={16} />, label: 'Easy Exchange' },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.375rem', textAlign: 'center' }}>
                  <div style={{ color: 'var(--color-primary)' }}>{item.icon}</div>
                  <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--color-text)' }}>{item.label}</span>
                </div>
              ))}
            </div>

            {/* Accordion sections */}
            <div style={{ borderTop: '1px solid var(--color-border)' }}>
              {INFO_SECTIONS.map((section) => (
                <div key={section.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <button
                    onClick={() => toggleSection(section.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      padding: '1rem 0',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.9375rem',
                      fontWeight: 600,
                      color: 'var(--color-text)',
                      textAlign: 'left',
                    }}
                  >
                    {section.title}
                    {expandedSection === section.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  <AnimatePresence>
                    {expandedSection === section.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <p style={{ paddingBottom: '1rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                          {section.content}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div style={{ marginTop: '5rem' }}>
            <h2 className="text-heading-2" style={{ marginBottom: '2rem' }}>You Might Also Like</h2>
            <div className="product-grid">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Prescription Flow Modal */}
      <PrescriptionFlow
        open={prescriptionFlowOpen}
        onClose={() => setPrescriptionFlowOpen(false)}
        product={product}
        variant={selectedVariant}
      />

      <style jsx>{`
        @media (min-width: 1024px) {
          .product-detail-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
