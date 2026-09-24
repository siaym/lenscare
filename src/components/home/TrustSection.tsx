'use client';

import { motion } from 'framer-motion';

const PROMISES = [
  {
    step: '01',
    title: 'Authentic Eyewear',
    description: 'Every frame is directly sourced from verified optical manufacturers and authorized ateliers.',
  },
  {
    step: '02',
    title: 'Prescription Expertise',
    description: 'Custom optical lab cutting with anti-glare, blue-light, and high-index lenses matched to your power.',
  },
  {
    step: '03',
    title: 'Nationwide Delivery',
    description: 'Tracked courier delivery across all 64 districts with damage-proof protective hard casing.',
  },
  {
    step: '04',
    title: '7-Day Fit Guarantee',
    description: 'If your frame doesn’t feel completely natural on your face, exchange it effortlessly.',
  },
];

export function TrustSection() {
  return (
    <section style={{ backgroundColor: '#FFFFFF', padding: '4.5rem 0', borderTop: '1px solid #F2EFEA' }} aria-labelledby="why-heading">
      <div className="container" style={{ padding: '0 1.25rem' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p
            style={{
              fontSize: '0.8125rem',
              fontWeight: 700,
              color: '#CFA85B',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '0.5rem',
            }}
          >
            WHY LENSCARE
          </p>
          <h2
            id="why-heading"
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.125rem)',
              fontWeight: 600,
              color: '#0B1F3A',
              letterSpacing: '-0.02em',
            }}
          >
            Craftsmanship behind every pair.
          </h2>
        </div>

        {/* 4-Column Typographic Layout — No Generic Boxed Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2.5rem 2rem',
          }}
        >
          {PROMISES.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              style={{ position: 'relative' }}
            >
              <span
                style={{
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  color: '#CFA85B',
                  letterSpacing: '0.06em',
                  display: 'block',
                  marginBottom: '0.75rem',
                }}
              >
                {item.step}
              </span>
              <h3
                style={{
                  fontSize: '1.0625rem',
                  fontWeight: 600,
                  color: '#111827',
                  marginBottom: '0.5rem',
                  letterSpacing: '-0.01em',
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontSize: '0.875rem',
                  color: '#667085',
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
