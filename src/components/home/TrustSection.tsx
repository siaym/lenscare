'use client';

import { motion } from 'framer-motion';
import { Shield, Truck, RefreshCw, Headphones, Award, Eye } from 'lucide-react';

const TRUST_ITEMS = [
  {
    icon: <Award size={26} />,
    title: 'Authentic Products',
    description: '100% genuine eyewear from authorized brand distributors.',
  },
  {
    icon: <Shield size={26} />,
    title: 'Secure Payment',
    description: 'Your transactions are protected with bank-level SSL encryption.',
  },
  {
    icon: <Truck size={26} />,
    title: 'Fast Delivery',
    description: 'Dhaka: 2-3 days. Nationwide: 4-7 business days.',
  },
  {
    icon: <RefreshCw size={26} />,
    title: 'Easy Exchange',
    description: '7-day hassle-free exchange on all unworn frames.',
  },
  {
    icon: <Eye size={26} />,
    title: 'Prescription Support',
    description: 'Expert lens fitting for any prescription — online or in-store.',
  },
  {
    icon: <Headphones size={26} />,
    title: '24/7 Support',
    description: 'WhatsApp, phone, and email support whenever you need us.',
  },
];

export function TrustSection() {
  return (
    <section
      className="section"
      style={{ background: 'var(--color-bg)' }}
      aria-labelledby="trust-heading"
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <p className="text-section-title" style={{ marginBottom: '0.75rem' }}>
            Why LensCare
          </p>
          <h2 id="trust-heading" className="text-heading-2">
            The LensCare Promise
          </h2>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1.5rem',
          }}
          className="trust-grid"
        >
          {TRUST_ITEMS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              style={{
                display: 'flex',
                gap: '1.125rem',
                padding: '1.5rem',
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border-light)',
                borderRadius: 'var(--radius-xl)',
                transition: 'box-shadow 0.2s ease, transform 0.2s ease',
              }}
              whileHover={{ y: -2, boxShadow: 'var(--shadow-md)' }}
            >
              <div
                style={{
                  width: '3rem',
                  height: '3rem',
                  background: 'var(--color-surface-2)',
                  borderRadius: 'var(--radius-lg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-primary)',
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </div>
              <div>
                <h3
                  style={{
                    fontSize: '0.9375rem',
                    fontWeight: 700,
                    color: 'var(--color-text)',
                    marginBottom: '0.375rem',
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.8125rem', color: 'var(--color-muted)', lineHeight: 1.6 }}>
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 768px) {
          .trust-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
