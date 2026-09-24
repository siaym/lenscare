'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Search,
  Truck,
  CheckCircle2,
  Clock,
  Wrench,
  MapPin,
  MessageCircle,
  HelpCircle,
} from 'lucide-react';
import { generateWhatsAppUrl } from '@/lib/utils';

interface TrackingEvent {
  status: string;
  description: string;
  time: string;
  completed: boolean;
  current?: boolean;
}

interface OrderDetails {
  orderNumber: string;
  customerName: string;
  deliveryAddress: string;
  status: string;
  estimatedDelivery: string;
  courierName: string;
  courierTrackingId: string;
  total: number;
  events: TrackingEvent[];
}

export function TrackOrderClient() {
  const searchParams = useSearchParams();
  const initialOrder = searchParams.get('orderNumber') || '';

  const [orderIdInput, setOrderIdInput] = useState(initialOrder);
  const [isLoading, setIsLoading] = useState(false);
  const [orderData, setOrderData] = useState<OrderDetails | null>(null);

  const fetchTracking = async (id: string) => {
    if (!id.trim()) return;
    setIsLoading(true);

    try {
      const res = await fetch(`/api/orders?orderNumber=${encodeURIComponent(id.trim().toUpperCase())}`);
      const data = await res.json();

      if (data.success && data.order) {
        const o = data.order;
        setOrderData({
          orderNumber: o.orderNumber || id,
          customerName: o.customer?.name || 'Valued Customer',
          deliveryAddress: `${o.customer?.address || 'Banani'}, ${o.customer?.district || 'Dhaka'}`,
          status: o.status || 'PROCESSING',
          estimatedDelivery: 'In 2 business days',
          courierName: 'Steadfast Courier',
          courierTrackingId: `ST-${Math.floor(100000 + Math.random() * 900000)}`,
          total: o.total || 3200,
          events: [
            {
              status: 'Order Placed & Logged',
              description: 'Your order was verified and registered in the LensCare fulfillment queue.',
              time: 'Yesterday 10:30 AM',
              completed: true,
            },
            {
              status: 'Optical Prescription Verified',
              description: 'Doctor prescription verified with frame dimensions and pupil distance.',
              time: 'Yesterday 02:15 PM',
              completed: true,
            },
            {
              status: 'Optical Lab Cutting & Coating',
              description: 'High-index lenses cut, beveled, and fitted with anti-glare hydrophobic coating.',
              time: 'Today 11:45 AM',
              completed: true,
              current: true,
            },
            {
              status: 'Quality Control & Secure Packaging',
              description: 'Optician alignment verification, micro-fiber inspection, and hard case packing.',
              time: 'Expected Tomorrow 10:00 AM',
              completed: false,
            },
            {
              status: 'Dispatched to Courier',
              description: 'Handed over for last-mile delivery to your address.',
              time: 'Pending',
              completed: false,
            },
            {
              status: 'Delivered',
              description: 'Successfully received by customer with invoice receipt.',
              time: 'Pending',
              completed: false,
            },
          ],
        });
      }
    } catch {
      // Fallback demo state
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!initialOrder) return;
    const timer = setTimeout(() => {
      fetchTracking(initialOrder);
    }, 0);
    return () => clearTimeout(timer);
  }, [initialOrder]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderIdInput.trim()) return;
    fetchTracking(orderIdInput.trim().toUpperCase());
  };

  const handleQuickSelect = (sampleId: string) => {
    setOrderIdInput(sampleId);
    fetchTracking(sampleId);
  };

  return (
    <>
      {/* Page Header */}
      <div
        style={{
          background: 'var(--color-primary)',
          color: 'white',
          padding: '3rem 0 2.5rem',
        }}
      >
        <div className="container">
          <nav className="breadcrumb" style={{ marginBottom: '1rem' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.6)' }}>Home</Link>
            <span className="breadcrumb__separator" style={{ color: 'rgba(255,255,255,0.3)' }}>/</span>
            <span style={{ color: 'white' }}>Track Order</span>
          </nav>
          <h1 className="text-heading-1" style={{ color: 'white' }}>
            Track Your Eyewear Order
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: '0.5rem', maxWidth: '600px' }}>
            Monitor real-time progress from optical prescription lab fitting to doorstep delivery.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '3rem 1.25rem 5rem', maxWidth: '860px' }}>
        {/* Search Bar Box */}
        <div
          style={{
            background: 'var(--color-surface)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-border)',
            padding: '2rem',
            boxShadow: 'var(--shadow-md)',
            marginBottom: '2.5rem',
          }}
        >
          <form onSubmit={handleSearch}>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.75rem' }}>
              Enter Your Order ID or Mobile Number
            </label>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
                <Search
                  size={18}
                  style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--color-text-muted)',
                  }}
                />
                <input
                  type="text"
                  value={orderIdInput}
                  onChange={(e) => setOrderIdInput(e.target.value)}
                  placeholder="e.g. LC-2026-89412 or 017XXXXXXXX"
                  className="form-input"
                  style={{ paddingLeft: '2.75rem' }}
                />
              </div>
              <button
                type="submit"
                disabled={isLoading || !orderIdInput.trim()}
                className="btn btn--primary"
                style={{ padding: '0 2rem' }}
              >
                {isLoading ? 'Searching...' : 'Track Order'}
              </button>
            </div>
          </form>

          {/* Quick Demo Sample Buttons */}
          <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', fontSize: '0.82rem' }}>
            <span style={{ color: 'var(--color-text-muted)' }}>Demo Samples:</span>
            <button
              type="button"
              onClick={() => handleQuickSelect('LC-2026-89412')}
              style={{
                background: 'var(--color-surface-2)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.2rem 0.6rem',
                cursor: 'pointer',
                fontSize: '0.8rem',
              }}
            >
              LC-2026-89412 (In Lab)
            </button>
            <button
              type="button"
              onClick={() => handleQuickSelect('LC-2026-55021')}
              style={{
                background: 'var(--color-surface-2)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.2rem 0.6rem',
                cursor: 'pointer',
                fontSize: '0.8rem',
              }}
            >
              LC-2026-55021 (Dispatched)
            </button>
          </div>
        </div>

        {/* Tracking Results Card */}
        {orderData && (
          <div
            style={{
              background: 'var(--color-surface)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-md)',
              overflow: 'hidden',
            }}
          >
            {/* Header info */}
            <div
              style={{
                padding: '1.5rem 2rem',
                background: 'var(--color-surface-2)',
                borderBottom: '1px solid var(--color-border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Order Number
                </span>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                  {orderData.orderNumber}
                </div>
              </div>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'rgba(201,169,110,0.15)',
                  color: 'var(--color-accent-dark)',
                  padding: '0.4rem 1rem',
                  borderRadius: '999px',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                }}
              >
                <Wrench size={16} />
                <span>Optical Lab Fitting in Progress</span>
              </div>
            </div>

            {/* Courier & Delivery Meta */}
            <div
              style={{
                padding: '1.5rem 2rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.5rem',
                borderBottom: '1px solid var(--color-border)',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-text-muted)', fontSize: '0.82rem', marginBottom: '0.25rem' }}>
                  <Truck size={15} /> Courier Partner
                </div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>
                  {orderData.courierName} ({orderData.courierTrackingId})
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-text-muted)', fontSize: '0.82rem', marginBottom: '0.25rem' }}>
                  <Clock size={15} /> Estimated Delivery
                </div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--color-primary)' }}>
                  {orderData.estimatedDelivery}
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-text-muted)', fontSize: '0.82rem', marginBottom: '0.25rem' }}>
                  <MapPin size={15} /> Delivery Destination
                </div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>
                  {orderData.deliveryAddress}
                </div>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div style={{ padding: '2.5rem 2rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '2rem', color: 'var(--color-text)' }}>
                Fulfillment & Transit Milestones
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative' }}>
                {orderData.events.map((evt, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '1.25rem',
                      position: 'relative',
                    }}
                  >
                    {/* Vertical connecting line */}
                    {idx < orderData.events.length - 1 && (
                      <div
                        style={{
                          position: 'absolute',
                          left: '15px',
                          top: '32px',
                          bottom: '-2rem',
                          width: '2px',
                          background: evt.completed ? 'var(--color-accent)' : 'var(--color-border)',
                        }}
                      />
                    )}

                    {/* Step Icon */}
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: evt.completed
                          ? 'var(--color-primary)'
                          : 'var(--color-surface-2)',
                        border: evt.current
                          ? '3px solid var(--color-accent)'
                          : evt.completed
                          ? 'none'
                          : '2px solid var(--color-border)',
                        color: evt.completed ? 'white' : 'var(--color-text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        zIndex: 1,
                      }}
                    >
                      {evt.completed ? <CheckCircle2 size={18} /> : <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-border)' }} />}
                    </div>

                    {/* Step Info */}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <div style={{ fontWeight: 700, fontSize: '0.975rem', color: evt.completed ? 'var(--color-text)' : 'var(--color-text-muted)' }}>
                          {evt.status}
                          {evt.current && (
                            <span
                              style={{
                                marginLeft: '0.625rem',
                                fontSize: '0.72rem',
                                background: 'var(--color-accent)',
                                color: 'var(--color-primary-dark)',
                                padding: '0.15rem 0.5rem',
                                borderRadius: '999px',
                                fontWeight: 700,
                              }}
                            >
                              Current Stage
                            </span>
                          )}
                        </div>
                        <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{evt.time}</span>
                      </div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '0.35rem', margin: 0 }}>
                        {evt.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Need Help Card */}
            <div
              style={{
                padding: '1.25rem 2rem',
                background: 'var(--color-surface-2)',
                borderTop: '1px solid var(--color-border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                <HelpCircle size={18} style={{ color: 'var(--color-text-muted)' }} />
                <span>Questions about your order or prescription power?</span>
              </div>
              <a
                href={generateWhatsAppUrl(`Hi LensCare, I am tracking order ${orderData.orderNumber} and need help with my delivery.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--secondary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: '#25D366', borderColor: '#25D366' }}
              >
                <MessageCircle size={16} /> WhatsApp Optical Specialist
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
