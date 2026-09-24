'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';

export function HeroSection() {
  return (
    <section
      className="hero"
      style={{
        background: 'linear-gradient(135deg, #0B1F3A 0%, #1a3560 60%, #0B1F3A 100%)',
      }}
    >
      {/* Background decorative elements */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            right: '-10%',
            width: '60%',
            height: '140%',
            background: 'radial-gradient(ellipse, rgba(201,169,110,0.12) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-30%',
            left: '-10%',
            width: '50%',
            height: '100%',
            background: 'radial-gradient(ellipse, rgba(255,255,255,0.04) 0%, transparent 70%)',
          }}
        />
        {/* Grid pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1, padding: '5rem 1.25rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '3rem',
            alignItems: 'center',
          }}
          className="hero-grid"
        >
          {/* Left — Copy */}
          <div>
            {/* Pre-heading */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(201,169,110,0.15)',
                border: '1px solid rgba(201,169,110,0.3)',
                borderRadius: '100px',
                padding: '0.375rem 0.875rem',
                marginBottom: '1.5rem',
              }}
            >
              <Sparkles size={13} style={{ color: 'var(--color-accent)' }} />
              <span style={{ fontSize: '0.75rem', color: 'var(--color-accent)', fontWeight: 600, letterSpacing: '0.06em' }}>
                PREMIUM EYEWEAR — BANGLADESH
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-display"
              style={{ color: 'white', marginBottom: '1.25rem' }}
            >
              See Better.
              <br />
              <span style={{ color: 'var(--color-accent)' }}>Look Better.</span>
            </motion.h1>

            {/* Supporting text */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              style={{
                fontSize: '1.0625rem',
                color: 'rgba(255,255,255,0.7)',
                lineHeight: 1.7,
                maxWidth: '440px',
                marginBottom: '2.25rem',
              }}
            >
              Discover premium eyewear crafted for your style, comfort, and vision. Authentic brands. Expert prescription services.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap' }}
            >
              <Link
                href="/eyeglasses"
                className="btn btn-accent btn-lg"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
              >
                Shop Eyeglasses
                <ArrowRight size={17} />
              </Link>
              <Link
                href="/sunglasses"
                className="btn btn-lg"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  border: '1.5px solid rgba(255,255,255,0.25)',
                  backdropFilter: 'blur(4px)',
                }}
              >
                Shop Sunglasses
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              style={{
                display: 'flex',
                gap: '1.5rem',
                marginTop: '2.5rem',
                flexWrap: 'wrap',
              }}
            >
              {[
                { value: '5,000+', label: 'Happy Customers' },
                { value: '200+', label: 'Frame Styles' },
                { value: '10+', label: 'Premium Brands' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-accent)' }}>
                    {stat.value}
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.125rem' }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{ position: 'relative' }}
          >
            <div
              style={{
                position: 'relative',
                borderRadius: '1.5rem',
                overflow: 'hidden',
                aspectRatio: '4/3',
                background: 'rgba(255,255,255,0.06)',
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=1200&q=85"
                alt="Premium eyewear collection"
                fill
                priority
                style={{ objectFit: 'cover', opacity: 0.9 }}
                sizes="(max-width: 1023px) 100vw, 50vw"
              />
              {/* Gradient overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, rgba(11,31,58,0.4) 0%, transparent 60%)',
                }}
              />
            </div>

            {/* Floating card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                bottom: '1.5rem',
                left: '-1.5rem',
                background: 'white',
                borderRadius: 'var(--radius-xl)',
                padding: '0.875rem 1.125rem',
                boxShadow: 'var(--shadow-xl)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
              }}
            >
              <div
                style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  background: 'var(--color-surface-2)',
                  borderRadius: 'var(--radius-lg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                }}
              >
                👓
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text)', whiteSpace: 'nowrap' }}>
                  Free Prescription Fitting
                </p>
                <p style={{ fontSize: '0.7rem', color: 'var(--color-muted)' }}>
                  On all frame purchases
                </p>
              </div>
            </motion.div>

            {/* Free delivery badge */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '-1rem',
                background: 'var(--color-accent)',
                color: 'var(--color-primary)',
                borderRadius: 'var(--radius-xl)',
                padding: '0.625rem 1rem',
                boxShadow: 'var(--shadow-lg)',
                fontSize: '0.75rem',
                fontWeight: 700,
                whiteSpace: 'nowrap',
              }}
            >
              🚚 Free Delivery over ৳5,000
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
