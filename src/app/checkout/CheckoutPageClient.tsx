'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Banknote,
  Smartphone,
  ArrowLeft,
  CheckCircle2,
  Lock,
  Eye,
  Info,
} from 'lucide-react';
import { useCart } from '@/components/cart/CartProvider';
import { useToast } from '@/components/ui/Toaster';
import { formatPrice } from '@/lib/utils';

const BD_DIVISIONS = [
  'Dhaka',
  'Chittagong',
  'Rajshahi',
  'Sylhet',
  'Khulna',
  'Barisal',
  'Rangpur',
  'Mymensingh',
];

export function CheckoutPageClient() {
  const router = useRouter();
  const { items, subtotal, deliveryFee, discount, total, clearCart, setDeliveryLocation } = useCart();
  const { success, error } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    division: 'Dhaka',
    district: 'Dhaka',
    address: '',
    notes: '',
    prescriptionNote: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'BKASH' | 'SSLCOMMERZ'>('COD');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If division changes, update delivery fee
  const handleDivisionChange = (division: string) => {
    const isDhaka = division.toLowerCase() === 'dhaka';
    setFormData((prev) => ({
      ...prev,
      division,
      district: isDhaka ? 'Dhaka' : prev.district,
    }));
    setDeliveryLocation(isDhaka);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      error('Missing Name', 'Please enter your full name.');
      return;
    }

    if (!formData.phone.trim() || formData.phone.length < 11) {
      error('Invalid Phone Number', 'Please enter a valid 11-digit mobile number (e.g. 017XXXXXXXX).');
      return;
    }

    if (!formData.address.trim()) {
      error('Missing Address', 'Please enter your street / delivery address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: formData,
          items,
          subtotal,
          deliveryFee,
          discount,
          total,
          paymentMethod,
          prescriptionNote: formData.prescriptionNote,
        }),
      });

      const data = await res.json();

      if (data.success) {
        clearCart();
        success('Order Placed!', `Order ${data.orderNumber} confirmed successfully.`);
        router.push(`/checkout/success?orderNumber=${data.orderNumber}`);
      } else {
        error('Order Placement Failed', data.message || 'Something went wrong. Please try again.');
        setIsSubmitting(false);
      }
    } catch {
      error('Connection Error', 'Failed to submit order. Please check your internet connection.');
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container" style={{ padding: '5rem 1.25rem', textAlign: 'center' }}>
        <h1 className="text-heading-2" style={{ marginBottom: '1rem' }}>No Items to Checkout</h1>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
          Your shopping cart is currently empty. Please select eyewear first.
        </p>
        <Link href="/shop" className="btn btn--primary">
          Browse Eyewear Catalog
        </Link>
      </div>
    );
  }

  const hasPrescriptionItems = items.some((item) => !!item.lensConfig);

  return (
    <>
      {/* Header Bar */}
      <div
        style={{
          background: 'var(--color-primary)',
          color: 'white',
          padding: '2rem 0',
        }}
      >
        <div className="container">
          <Link
            href="/cart"
            style={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: '0.85rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              marginBottom: '0.75rem',
              textDecoration: 'none',
            }}
          >
            <ArrowLeft size={16} /> Return to Cart
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Lock size={22} style={{ color: 'var(--color-accent)' }} />
            <h1 className="text-heading-2" style={{ color: 'white', margin: 0 }}>
              Secure Checkout
            </h1>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '2.5rem 1.25rem 5rem' }}>
        <form onSubmit={handleSubmitOrder}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '2.5rem',
            }}
            className="lg:grid-cols-3"
          >
            {/* Left 2 Columns: Forms */}
            <div className="lg:col-span-2" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Step 1: Customer Contact Info */}
              <div
                style={{
                  background: 'var(--color-surface)',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--color-border)',
                  padding: '1.75rem',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <span
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'var(--color-primary)',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                    }}
                  >
                    1
                  </span>
                  <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-text)', margin: 0 }}>
                    Contact Information
                  </h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }} className="sm:grid-cols-2">
                  <div>
                    <label className="form-label" htmlFor="name">
                      Full Name <span style={{ color: 'var(--color-error)' }}>*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="e.g. Tanvir Hasan"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>

                  <div>
                    <label className="form-label" htmlFor="phone">
                      Mobile Number <span style={{ color: 'var(--color-error)' }}>*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="017XXXXXXXX"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.25rem', display: 'block' }}>
                      For delivery coordination and OTP SMS updates.
                    </span>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="form-label" htmlFor="email">
                      Email Address (Optional)
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="tanvir@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Delivery Address */}
              <div
                style={{
                  background: 'var(--color-surface)',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--color-border)',
                  padding: '1.75rem',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <span
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'var(--color-primary)',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                    }}
                  >
                    2
                  </span>
                  <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-text)', margin: 0 }}>
                    Delivery Address
                  </h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }} className="sm:grid-cols-2">
                  <div>
                    <label className="form-label" htmlFor="division">
                      Division <span style={{ color: 'var(--color-error)' }}>*</span>
                    </label>
                    <select
                      id="division"
                      name="division"
                      value={formData.division}
                      onChange={(e) => handleDivisionChange(e.target.value)}
                      className="form-input"
                    >
                      {BD_DIVISIONS.map((div) => (
                        <option key={div} value={div}>
                          {div} {div === 'Dhaka' ? '(Inside Dhaka - ৳60)' : '(Outside Dhaka - ৳120)'}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="form-label" htmlFor="district">
                      District / City <span style={{ color: 'var(--color-error)' }}>*</span>
                    </label>
                    <input
                      id="district"
                      name="district"
                      type="text"
                      required
                      placeholder="e.g. Dhaka, Gazipur, Chittagong..."
                      value={formData.district}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="form-label" htmlFor="address">
                      Street Address, House & Road No, Area <span style={{ color: 'var(--color-error)' }}>*</span>
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      rows={2}
                      required
                      placeholder="e.g. House 42, Road 11, Block D, Banani, Dhaka"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="form-input"
                      style={{ resize: 'vertical' }}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="form-label" htmlFor="notes">
                      Delivery Note (Optional)
                    </label>
                    <input
                      id="notes"
                      name="notes"
                      type="text"
                      placeholder="e.g. Deliver between 2 PM - 6 PM, or call before arriving"
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Prescription Notes (if any prescription item exists) */}
              {hasPrescriptionItems && (
                <div
                  style={{
                    background: 'rgba(201,169,110,0.06)',
                    borderRadius: 'var(--radius-xl)',
                    border: '1px solid rgba(201,169,110,0.4)',
                    padding: '1.75rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <Eye size={22} style={{ color: 'var(--color-accent-dark)' }} />
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-primary)', margin: 0 }}>
                      Prescription Lens Confirmation
                    </h2>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
                    You have frames configured with optical power lenses. You can provide your latest prescription power numbers or upload/send via WhatsApp.
                  </p>
                  <textarea
                    id="prescriptionNote"
                    name="prescriptionNote"
                    rows={2}
                    placeholder="Enter eye power details (OD/OS Sph, Cyl, Axis, PD) or write 'Will send doctor slip on WhatsApp'"
                    value={formData.prescriptionNote}
                    onChange={handleInputChange}
                    className="form-input"
                    style={{ background: 'white' }}
                  />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                    <Info size={14} />
                    <span>Our optometrist will verify your prescription over phone/WhatsApp before lens cutting.</span>
                  </div>
                </div>
              )}

              {/* Step 4: Payment Method */}
              <div
                style={{
                  background: 'var(--color-surface)',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--color-border)',
                  padding: '1.75rem',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <span
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'var(--color-primary)',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                    }}
                  >
                    3
                  </span>
                  <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-text)', margin: 0 }}>
                    Payment Method
                  </h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                  {/* COD */}
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem 1.25rem',
                      borderRadius: 'var(--radius-lg)',
                      border: paymentMethod === 'COD' ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                      background: paymentMethod === 'COD' ? 'rgba(11,31,58,0.03)' : 'var(--color-surface)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="COD"
                      checked={paymentMethod === 'COD'}
                      onChange={() => setPaymentMethod('COD')}
                      style={{ accentColor: 'var(--color-primary)', width: '18px', height: '18px' }}
                    />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
                      <Banknote size={24} style={{ color: 'var(--color-accent-dark)' }} />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Cash on Delivery (COD)</div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                          Pay with cash upon package receipt. Available across all 64 districts in Bangladesh.
                        </div>
                      </div>
                    </div>
                  </label>

                  {/* bKash / Mobile Banking */}
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem 1.25rem',
                      borderRadius: 'var(--radius-lg)',
                      border: paymentMethod === 'BKASH' ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                      background: paymentMethod === 'BKASH' ? 'rgba(11,31,58,0.03)' : 'var(--color-surface)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="BKASH"
                      checked={paymentMethod === 'BKASH'}
                      onChange={() => setPaymentMethod('BKASH')}
                      style={{ accentColor: 'var(--color-primary)', width: '18px', height: '18px' }}
                    />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
                      <Smartphone size={24} style={{ color: '#E2136E' }} />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>bKash / Nagad / Rocket</div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                          Pay instantly via mobile wallet. Merchant payment instructions will be sent after order.
                        </div>
                      </div>
                    </div>
                  </label>

                  {/* SSLCommerz */}
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem 1.25rem',
                      borderRadius: 'var(--radius-lg)',
                      border: paymentMethod === 'SSLCOMMERZ' ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                      background: paymentMethod === 'SSLCOMMERZ' ? 'rgba(11,31,58,0.03)' : 'var(--color-surface)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="SSLCOMMERZ"
                      checked={paymentMethod === 'SSLCOMMERZ'}
                      onChange={() => setPaymentMethod('SSLCOMMERZ')}
                      style={{ accentColor: 'var(--color-primary)', width: '18px', height: '18px' }}
                    />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
                      <CreditCard size={24} style={{ color: 'var(--color-primary)' }} />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Debit / Credit Card & Net Banking</div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                          Visa, MasterCard, Amex, UnionPay through SSLCommerz 256-bit secure gateway.
                        </div>
                      </div>
                    </div>
                  </label>
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
                <h3 className="text-heading-3" style={{ marginBottom: '1.25rem' }}>
                  Order Review
                </h3>

                {/* Mini Item List */}
                <div
                  style={{
                    maxHeight: '260px',
                    overflowY: 'auto',
                    marginBottom: '1.25rem',
                    paddingRight: '0.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.875rem',
                  }}
                >
                  {items.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: 'flex',
                        gap: '0.75rem',
                        alignItems: 'center',
                        fontSize: '0.875rem',
                      }}
                    >
                      <div
                        style={{
                          position: 'relative',
                          width: '56px',
                          height: '46px',
                          borderRadius: 'var(--radius-sm)',
                          overflow: 'hidden',
                          background: 'var(--color-surface-2)',
                          flexShrink: 0,
                          border: '1px solid var(--color-border)',
                        }}
                      >
                        {item.product?.images?.[0]?.url && (
                          <Image src={item.product.images[0].url} alt={item.product.name} fill className="object-cover" sizes="56px" />
                        )}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 600, color: 'var(--color-text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {item.product?.name}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                          Qty: {item.quantity} {item.variant?.color && `• ${item.variant.color}`}
                        </div>
                      </div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-text)' }}>
                        {formatPrice(item.totalPrice)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cost Calculations */}
                <div
                  style={{
                    borderTop: '1px solid var(--color-border)',
                    borderBottom: '1px solid var(--color-border)',
                    padding: '1.25rem 0',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.625rem',
                    fontSize: '0.9rem',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>

                  {discount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-success)' }}>
                      <span>Discount</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>
                      Shipping ({formData.division.toLowerCase() === 'dhaka' ? 'Inside Dhaka' : 'Outside Dhaka'})
                    </span>
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
                    <span>Total Payable</span>
                    <span style={{ color: 'var(--color-primary)' }}>{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn--primary btn--full btn--lg"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    marginBottom: '1rem',
                  }}
                >
                  {isSubmitting ? (
                    'Processing Order...'
                  ) : (
                    <>
                      <CheckCircle2 size={18} /> Place Order Now
                    </>
                  )}
                </button>

                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textAlign: 'center', lineHeight: 1.4 }}>
                  By placing your order, you agree to LensCare Bangladesh&apos;s Terms of Service and Return Policy.
                </p>

                <div
                  style={{
                    marginTop: '1.25rem',
                    paddingTop: '1.25rem',
                    borderTop: '1px solid var(--color-border)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    fontSize: '0.8rem',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Truck size={15} style={{ color: 'var(--color-accent-dark)' }} />
                    <span>Estimated Delivery: 2-3 Business Days</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <ShieldCheck size={15} style={{ color: 'var(--color-accent-dark)' }} />
                    <span>Free Exchange within 7 Days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
