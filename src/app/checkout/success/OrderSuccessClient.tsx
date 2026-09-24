'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Truck,
  MessageCircle,
  ShoppingBag,
  ArrowRight,
  Clock,
  PhoneCall,
} from 'lucide-react';
import { generateWhatsAppUrl } from '@/lib/utils';

export function OrderSuccessClient() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber') || `LC-${new Date().getFullYear()}-82914`;

  const whatsappMessage = `Hi LensCare, I just placed an order on your website with Order ID: *${orderNumber}*. Please confirm my order status.`;

  return (
    <div className="container" style={{ padding: '4rem 1.25rem 6rem' }}>
      <div
        style={{
          maxWidth: '680px',
          margin: '0 auto',
          background: 'var(--color-surface)',
          borderRadius: 'var(--radius-2xl)',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden',
          textAlign: 'center',
        }}
      >
        {/* Top Banner */}
        <div
          style={{
            background: 'linear-gradient(135deg, var(--color-primary) 0%, #15325b 100%)',
            color: 'white',
            padding: '3rem 2rem 2.5rem',
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem',
              color: 'var(--color-accent)',
            }}
          >
            <CheckCircle size={48} />
          </motion.div>

          <h1 className="text-heading-1" style={{ color: 'white', marginBottom: '0.5rem', fontSize: '2rem' }}>
            Order Confirmed!
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem', maxWidth: '440px', margin: '0 auto' }}>
            Thank you for shopping with LensCare. We are getting your eyewear ready.
          </p>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginTop: '1.5rem',
              background: 'rgba(255,255,255,0.1)',
              padding: '0.75rem 1.5rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>Order ID:</span>
            <strong style={{ fontSize: '1.15rem', color: 'var(--color-accent)', letterSpacing: '0.05em' }}>
              {orderNumber}
            </strong>
          </div>
        </div>

        {/* Next Steps / Timeline */}
        <div style={{ padding: '2.5rem 2rem' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--color-text)' }}>
            What Happens Next?
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1.25rem',
              textAlign: 'left',
              marginBottom: '2.5rem',
            }}
          >
            <div
              style={{
                padding: '1.25rem',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--color-surface-2)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div style={{ color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
                <PhoneCall size={20} />
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.25rem' }}>1. Verification</div>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: 0 }}>
                Our optical specialist will call/WhatsApp to verify frame size and lens power.
              </p>
            </div>

            <div
              style={{
                padding: '1.25rem',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--color-surface-2)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div style={{ color: 'var(--color-accent-dark)', marginBottom: '0.5rem' }}>
                <Clock size={20} />
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.25rem' }}>2. Lab Fitting</div>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: 0 }}>
                High-precision cutting, anti-reflective coating, and laser alignment check.
              </p>
            </div>

            <div
              style={{
                padding: '1.25rem',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--color-surface-2)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div style={{ color: 'var(--color-success)', marginBottom: '0.5rem' }}>
                <Truck size={20} />
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.25rem' }}>3. Dispatch</div>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: 0 }}>
                Delivered safely to your door within 2-3 business days with hard case & microfiber cloth.
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              maxWidth: '420px',
              margin: '0 auto',
            }}
          >
            <Link
              href={`/track-order?orderNumber=${orderNumber}`}
              className="btn btn--primary btn--full btn--lg"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
            >
              <Truck size={18} />
              <span>Track Your Order</span>
              <ArrowRight size={16} />
            </Link>

            <a
              href={generateWhatsAppUrl(whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--secondary btn--full"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                color: '#25D366',
                borderColor: '#25D366',
              }}
            >
              <MessageCircle size={18} />
              <span>Send Confirmation on WhatsApp</span>
            </a>

            <Link
              href="/shop"
              style={{
                color: 'var(--color-text-muted)',
                fontSize: '0.9rem',
                marginTop: '0.5rem',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
              }}
            >
              <ShoppingBag size={16} /> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
