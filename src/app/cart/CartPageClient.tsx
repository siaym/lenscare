'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  Tag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Eye,
  MessageCircle,
} from 'lucide-react';
import { useCart } from '@/components/cart/CartProvider';
import { useToast } from '@/components/ui/Toaster';
import { formatPrice, generateWhatsAppUrl } from '@/lib/utils';

export function CartPageClient() {
  const {
    items,
    itemCount,
    subtotal,
    total,
    deliveryFee,
    discount,
    couponCode,
    removeItem,
    updateQuantity,
    clearCart,
    applyCoupon,
    removeCoupon,
    setDeliveryLocation,
  } = useCart();

  const { success, error } = useToast();
  const [couponInput, setCouponInput] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [isInsideDhaka, setIsInsideDhaka] = useState(true);

  const freeDeliveryThreshold = 5000;
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const freeDeliveryProgress = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    setIsApplyingCoupon(true);
    const res = await applyCoupon(couponInput);
    setIsApplyingCoupon(false);

    if (res.success) {
      success('Coupon applied', res.message);
      setCouponInput('');
    } else {
      error('Coupon failed', res.message);
    }
  };

  const handleDeliveryChange = (inside: boolean) => {
    setIsInsideDhaka(inside);
    setDeliveryLocation(inside);
  };

  const generateCartWhatsAppMessage = () => {
    let msg = `Hi LensCare, I would like to order the items in my cart:\n\n`;
    items.forEach((item, idx) => {
      msg += `${idx + 1}. *${item.product?.name || 'Eyewear Frame'}* (Qty: ${item.quantity}) - ${formatPrice(item.totalPrice)}\n`;
      if (item.variant?.color) msg += `   Color: ${item.variant.color}\n`;
      if (item.lensConfig) {
        msg += `   Lens: ${item.lensConfig.type.replace('_', ' ')} (${item.lensConfig.material})\n`;
      }
    });
    msg += `\n*Subtotal*: ${formatPrice(subtotal)}`;
    if (discount > 0) msg += `\n*Discount*: -${formatPrice(discount)}`;
    msg += `\n*Delivery*: ${deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}`;
    msg += `\n*Estimated Total*: ${formatPrice(total)}`;
    return msg;
  };

  if (items.length === 0) {
    return (
      <div className="container" style={{ padding: '5rem 1.25rem', textAlign: 'center' }}>
        <div
          style={{
            maxWidth: '460px',
            margin: '0 auto',
            padding: '3rem 2rem',
            background: 'var(--color-surface)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'var(--color-surface-2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              color: 'var(--color-text-muted)',
            }}
          >
            <ShoppingBag size={40} />
          </div>
          <h1 className="text-heading-2" style={{ marginBottom: '0.75rem' }}>
            Your Cart is Empty
          </h1>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', fontSize: '0.95rem' }}>
            Looks like you haven&apos;t added any eyeglasses or sunglasses to your shopping bag yet.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Link href="/shop" className="btn btn--primary btn--full btn--lg">
              Explore Eyewear Catalog
            </Link>
            <Link href="/eyeglasses" className="btn btn--secondary btn--full">
              Shop Prescription Eyeglasses
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Page Title */}
      <div
        style={{
          background: 'var(--color-primary)',
          color: 'white',
          padding: '2.5rem 0 2rem',
        }}
      >
        <div className="container">
          <nav className="breadcrumb" style={{ marginBottom: '0.75rem' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.6)' }}>Home</Link>
            <span className="breadcrumb__separator" style={{ color: 'rgba(255,255,255,0.3)' }}>/</span>
            <span style={{ color: 'white' }}>Shopping Cart</span>
          </nav>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', flexWrap: 'wrap' }}>
            <h1 className="text-heading-1" style={{ color: 'white' }}>Shopping Bag</h1>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem' }}>
              ({itemCount} {itemCount === 1 ? 'item' : 'items'})
            </span>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '2.5rem 1.25rem 5rem' }}>
        {/* Free Shipping Bar */}
        <div
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem 1.5rem',
            marginBottom: '2rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.5rem',
              fontSize: '0.9rem',
              fontWeight: 600,
            }}
          >
            <span>
              {remainingForFreeDelivery === 0 ? (
                <span style={{ color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Truck size={16} /> Congratulations! You unlocked FREE delivery nationwide!
                </span>
              ) : (
                <span>
                  Add <strong style={{ color: 'var(--color-accent-dark)' }}>{formatPrice(remainingForFreeDelivery)}</strong> more for FREE shipping
                </span>
              )}
            </span>
            <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>
              Goal: {formatPrice(freeDeliveryThreshold)}
            </span>
          </div>
          <div
            style={{
              height: '8px',
              background: 'var(--color-surface-2)',
              borderRadius: '999px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${freeDeliveryProgress}%`,
                background: remainingForFreeDelivery === 0 ? 'var(--color-success)' : 'var(--color-accent)',
                transition: 'width 0.4s ease',
              }}
            />
          </div>
        </div>

        {/* Layout Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '2.5rem',
          }}
          className="lg:grid-cols-3"
        >
          {/* Cart Items (Left 2 Columns) */}
          <div className="lg:col-span-2">
            <div
              style={{
                background: 'var(--color-surface)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--color-border)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div
                style={{
                  padding: '1.25rem 1.5rem',
                  borderBottom: '1px solid var(--color-border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span style={{ fontWeight: 600, fontSize: '1.05rem' }}>Products in Bag</span>
                <button
                  type="button"
                  onClick={clearCart}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-text-muted)',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  Clear All
                </button>
              </div>

              <div>
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      style={{
                        padding: '1.5rem',
                        borderBottom: '1px solid var(--color-border)',
                        display: 'flex',
                        gap: '1.25rem',
                        alignItems: 'flex-start',
                      }}
                    >
                      {/* Product Thumbnail */}
                      <Link
                        href={`/products/${item.product?.slug || ''}`}
                        style={{
                          position: 'relative',
                          width: '100px',
                          height: '80px',
                          borderRadius: 'var(--radius-md)',
                          background: 'var(--color-surface-2)',
                          overflow: 'hidden',
                          flexShrink: 0,
                          border: '1px solid var(--color-border)',
                        }}
                      >
                        {item.product?.images?.[0]?.url && (
                          <Image
                            src={item.product.images[0].url}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            sizes="100px"
                          />
                        )}
                      </Link>

                      {/* Product Details */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            gap: '0.5rem',
                          }}
                        >
                          <div>
                            <Link
                              href={`/products/${item.product?.slug || ''}`}
                              style={{
                                fontWeight: 700,
                                fontSize: '1rem',
                                color: 'var(--color-text)',
                                textDecoration: 'none',
                              }}
                            >
                              {item.product?.name}
                            </Link>
                            {item.variant?.color && (
                              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '0.15rem' }}>
                                Color: <strong>{item.variant.color}</strong>
                              </p>
                            )}
                          </div>
                          <span style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-primary)' }}>
                            {formatPrice(item.totalPrice)}
                          </span>
                        </div>

                        {/* Prescription Badge */}
                        {item.lensConfig && (
                          <div
                            style={{
                              marginTop: '0.625rem',
                              padding: '0.5rem 0.75rem',
                              background: 'rgba(11,31,58,0.04)',
                              borderRadius: 'var(--radius-sm)',
                              borderLeft: '3px solid var(--color-accent)',
                              fontSize: '0.8rem',
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 600 }}>
                              <Eye size={14} style={{ color: 'var(--color-accent-dark)' }} />
                              <span>Prescription Lens Configured:</span>
                            </div>
                            <p style={{ color: 'var(--color-text-muted)', marginTop: '0.2rem' }}>
                              {item.lensConfig.type.replace('_', ' ')} • {item.lensConfig.material.replace('_', ' ')}
                              {item.lensConfig.coating && ` • ${item.lensConfig.coating.replace('_', ' ')}`}
                            </p>
                          </div>
                        )}

                        {/* Quantity and Actions */}
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: '1rem',
                            flexWrap: 'wrap',
                            gap: '0.75rem',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Qty:</span>
                            <div
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                border: '1px solid var(--color-border)',
                                borderRadius: 'var(--radius-md)',
                                overflow: 'hidden',
                                background: 'var(--color-surface)',
                              }}
                            >
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                style={{
                                  padding: '0.4rem 0.6rem',
                                  background: 'none',
                                  border: 'none',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                }}
                                disabled={item.quantity <= 1}
                              >
                                <Minus size={14} />
                              </button>
                              <span style={{ padding: '0 0.75rem', fontWeight: 600, fontSize: '0.9rem' }}>
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                style={{
                                  padding: '0.4rem 0.6rem',
                                  background: 'none',
                                  border: 'none',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                }}
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginLeft: '0.5rem' }}>
                              ({formatPrice(item.unitPrice)} each)
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.35rem',
                              color: 'var(--color-error)',
                              background: 'none',
                              border: 'none',
                              fontSize: '0.85rem',
                              cursor: 'pointer',
                              padding: '0.25rem 0.5rem',
                            }}
                          >
                            <Trash2 size={15} /> Remove
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Bottom bar of list */}
              <div
                style={{
                  padding: '1.25rem 1.5rem',
                  background: 'var(--color-surface-2)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1rem',
                }}
              >
                <Link
                  href="/shop"
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                >
                  ← Continue Shopping
                </Link>

                {/* WhatsApp Quick Order button */}
                <a
                  href={generateWhatsAppUrl(generateCartWhatsAppMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--secondary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.85rem',
                    color: '#25D366',
                    borderColor: '#25D366',
                  }}
                >
                  <MessageCircle size={16} /> Quick Order on WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-1">
            <div
              style={{
                position: 'sticky',
                top: '5.5rem',
                background: 'var(--color-surface)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--color-border)',
                padding: '1.75rem',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <h2 className="text-heading-3" style={{ marginBottom: '1.25rem' }}>
                Order Summary
              </h2>

              {/* Delivery Zone Selector */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text)', display: 'block', marginBottom: '0.5rem' }}>
                  Delivery Destination
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => handleDeliveryChange(true)}
                    style={{
                      padding: '0.625rem 0.5rem',
                      borderRadius: 'var(--radius-md)',
                      border: isInsideDhaka ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                      background: isInsideDhaka ? 'rgba(11,31,58,0.05)' : 'var(--color-surface)',
                      fontWeight: isInsideDhaka ? 700 : 500,
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      textAlign: 'center',
                    }}
                  >
                    Inside Dhaka (৳60)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeliveryChange(false)}
                    style={{
                      padding: '0.625rem 0.5rem',
                      borderRadius: 'var(--radius-md)',
                      border: !isInsideDhaka ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                      background: !isInsideDhaka ? 'rgba(11,31,58,0.05)' : 'var(--color-surface)',
                      fontWeight: !isInsideDhaka ? 700 : 500,
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      textAlign: 'center',
                    }}
                  >
                    Outside Dhaka (৳120)
                  </button>
                </div>
              </div>

              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text)', display: 'block', marginBottom: '0.5rem' }}>
                  Have a Coupon Code?
                </label>
                {couponCode ? (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'rgba(201,169,110,0.12)',
                      padding: '0.5rem 0.75rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px dashed var(--color-accent)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                      <Tag size={16} style={{ color: 'var(--color-accent-dark)' }} />
                      <strong style={{ color: 'var(--color-accent-dark)' }}>{couponCode}</strong>
                      <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>(-{formatPrice(discount)})</span>
                    </div>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-text-muted)',
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="e.g. WELCOME10"
                      className="form-input"
                      style={{ textTransform: 'uppercase', fontSize: '0.85rem' }}
                    />
                    <button
                      type="submit"
                      disabled={isApplyingCoupon || !couponInput.trim()}
                      className="btn btn--secondary"
                      style={{ padding: '0 1rem', whiteSpace: 'nowrap' }}
                    >
                      {isApplyingCoupon ? '...' : 'Apply'}
                    </button>
                  </div>
                )}
              </form>

              {/* Cost Breakdown */}
              <div
                style={{
                  borderTop: '1px solid var(--color-border)',
                  borderBottom: '1px solid var(--color-border)',
                  padding: '1.25rem 0',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  fontSize: '0.925rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                {discount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-success)' }}>
                    <span>Coupon Discount</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Estimated Delivery</span>
                  <span>
                    {deliveryFee === 0 ? (
                      <strong style={{ color: 'var(--color-success)' }}>FREE</strong>
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
                    fontSize: '1.25rem',
                    color: 'var(--color-text)',
                    paddingTop: '0.75rem',
                    borderTop: '1px dashed var(--color-border)',
                  }}
                >
                  <span>Total Amount</span>
                  <span style={{ color: 'var(--color-primary)' }}>{formatPrice(total)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <Link
                href="/checkout"
                className="btn btn--primary btn--full btn--lg"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  marginBottom: '1.5rem',
                }}
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={18} />
              </Link>

              {/* Trust Badges */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.625rem',
                  fontSize: '0.8rem',
                  color: 'var(--color-text-muted)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ShieldCheck size={16} style={{ color: 'var(--color-accent)' }} />
                  <span>100% Genuine Designer Eyewear Guaranteed</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <RotateCcw size={16} style={{ color: 'var(--color-accent)' }} />
                  <span>7-Day Return & Replacement Guarantee</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Truck size={16} style={{ color: 'var(--color-accent)' }} />
                  <span>Cash on Delivery Available Nationwide</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
