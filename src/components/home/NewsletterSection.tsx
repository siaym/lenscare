'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, CheckCircle } from 'lucide-react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('loading');
    // Simulate API call
    await new Promise((r) => setTimeout(r, 800));
    setStatus('success');
    setMessage("You're in! Expect exclusive deals in your inbox.");
    setEmail('');
  };

  return (
    <section className="newsletter-section" aria-labelledby="newsletter-heading">
      <div className="container">
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Icon */}
            <div
              style={{
                width: '4rem',
                height: '4rem',
                background: 'rgba(201,169,110,0.2)',
                border: '1px solid rgba(201,169,110,0.3)',
                borderRadius: 'var(--radius-xl)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                color: 'var(--color-accent)',
              }}
            >
              <Mail size={24} />
            </div>

            <h2
              id="newsletter-heading"
              className="text-heading-2"
              style={{ color: 'white', marginBottom: '0.875rem' }}
            >
              Get Exclusive Deals
            </h2>
            <p
              style={{
                color: 'rgba(255,255,255,0.65)',
                marginBottom: '2rem',
                fontSize: '0.9375rem',
                lineHeight: 1.65,
              }}
            >
              Subscribe to our newsletter and be the first to know about new arrivals, exclusive discounts, and prescription tips.
            </p>

            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '1rem 1.5rem',
                  color: 'white',
                }}
              >
                <CheckCircle size={20} style={{ color: '#6BCB77', flexShrink: 0 }} />
                <p style={{ fontSize: '0.9375rem', fontWeight: 500 }}>{message}</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div
                  style={{
                    display: 'flex',
                    gap: '0.625rem',
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: 'var(--radius-xl)',
                    padding: '0.375rem',
                  }}
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    style={{
                      flex: 1,
                      background: 'transparent',
                      border: 'none',
                      outline: 'none',
                      padding: '0.75rem 1rem',
                      fontSize: '0.9375rem',
                      color: 'white',
                      fontFamily: 'var(--font-sans)',
                    }}
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn btn-accent"
                    style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: '0.375rem' }}
                  >
                    {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                    {status !== 'loading' && <ArrowRight size={16} />}
                  </button>
                </div>
              </form>
            )}

            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginTop: '1rem' }}>
              No spam, ever. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
