'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export function HeroSection() {
  return (
    <section
      style={{
        position: 'relative',
        backgroundColor: '#0B1F3A',
        color: '#FFFFFF',
        overflow: 'hidden',
        padding: '4.5rem 0',
      }}
    >
      {/* Subtle Ambient Radial Lighting (No tacky SaaS grid) */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          right: '5%',
          width: '550px',
          height: '550px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(207, 168, 91, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-20%',
          left: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(26, 53, 96, 0.4) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1, padding: '0 1.25rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '3rem',
            alignItems: 'center',
          }}
          className="hero-layout"
        >
          {/* Left Column — Editorial Story */}
          <div style={{ maxWidth: '540px' }}>
            {/* Category Marker */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                fontSize: '0.8125rem',
                fontWeight: 700,
                color: '#CFA85B',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}
            >
              PREMIUM EYEWEAR
            </motion.p>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                marginBottom: '1.25rem',
                color: '#FFFFFF',
              }}
            >
              See Better.
              <br />
              <span style={{ color: '#E3C783' }}>Look Better.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                fontSize: '1.0625rem',
                lineHeight: 1.65,
                color: 'rgba(255, 255, 255, 0.78)',
                marginBottom: '2rem',
              }}
            >
              Premium frames, prescription lenses, and authentic eyewear — delivered across Bangladesh with custom optical lab precision.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}
            >
              <Link
                href="/eyeglasses"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: '#CFA85B',
                  color: '#07172B',
                  padding: '0.875rem 1.625rem',
                  borderRadius: '4px',
                  fontWeight: 700,
                  fontSize: '0.9375rem',
                  textDecoration: 'none',
                  letterSpacing: '0.02em',
                  transition: 'background 0.15s ease',
                }}
              >
                Shop Eyeglasses
                <ArrowRight size={16} />
              </Link>

              <Link
                href="/sunglasses"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  padding: '0.875rem 1.625rem',
                  borderRadius: '4px',
                  fontWeight: 600,
                  fontSize: '0.9375rem',
                  textDecoration: 'none',
                  transition: 'background 0.15s ease',
                }}
              >
                Explore Sunglasses
              </Link>
            </motion.div>

            {/* Clean Proof Points — Subtle typographic divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.75rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.12)',
              }}
            >
              <div>
                <p style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>5,000+</p>
                <p style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)', margin: 0 }}>Happy Customers</p>
              </div>
              <span style={{ width: '1px', height: '24px', backgroundColor: 'rgba(255, 255, 255, 0.15)' }} />
              <div>
                <p style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>200+</p>
                <p style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)', margin: 0 }}>Frame Styles</p>
              </div>
              <span style={{ width: '1px', height: '24px', backgroundColor: 'rgba(255, 255, 255, 0.15)' }} />
              <div>
                <p style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>10+</p>
                <p style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)', margin: 0 }}>Original Brands</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column — Editorial Eyewear Photograph */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ position: 'relative' }}
          >
            <div
              style={{
                position: 'relative',
                aspectRatio: '4/3',
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.35)',
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=1200&q=85"
                alt="LensCare Premium Eyewear Collection"
                fill
                priority
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 1023px) 100vw, 50vw"
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(11, 31, 58, 0.45) 0%, transparent 60%)',
                }}
              />
            </div>

            {/* Single Refined Optical Badge */}
            <div
              style={{
                position: 'absolute',
                bottom: '1.25rem',
                left: '1.25rem',
                backgroundColor: 'rgba(11, 31, 58, 0.88)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '4px',
                padding: '0.625rem 1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.625rem',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
              }}
            >
              <CheckCircle2 size={16} color="#CFA85B" />
              <div>
                <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#FFFFFF', margin: 0 }}>
                  Free Prescription Fitting
                </p>
                <p style={{ fontSize: '0.6875rem', color: 'rgba(255, 255, 255, 0.65)', margin: 0 }}>
                  Custom fitted in our Dhaka optical lab
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 1024px) {
          .hero-layout {
            grid-template-columns: 1.1fr 0.9fr !important;
          }
        }
      `}</style>
    </section>
  );
}
