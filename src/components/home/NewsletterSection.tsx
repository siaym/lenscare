'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('loading');
    await new Promise((r) => setTimeout(r, 600));
    setStatus('success');
    setEmail('');
  };

  return (
    <section style={{ backgroundColor: '#07172B', color: '#FFFFFF', padding: '3.25rem 0', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
      <div className="container" style={{ padding: '0 1.25rem' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '2rem',
          }}
          className="newsletter-row"
        >
          {/* Left Text */}
          <div style={{ maxWidth: '480px' }}>
            <span
              style={{
                fontSize: '0.6875rem',
                fontWeight: 700,
                color: '#CFA85B',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '0.375rem',
              }}
            >
              NEWSLETTER
            </span>
            <h3
              style={{
                fontSize: '1.375rem',
                fontWeight: 600,
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
                marginBottom: '0.375rem',
              }}
            >
              Stay in the know.
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.65)', margin: 0 }}>
              New frame arrivals, seasonal releases, and optical care guides.
            </p>
          </div>

          {/* Right Form */}
          <div style={{ flex: '1', minWidth: '280px', maxWidth: '420px' }}>
            {status === 'success' ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: 'rgba(45, 122, 79, 0.25)',
                  border: '1px solid #2D7A4F',
                  color: '#FFFFFF',
                  padding: '0.75rem 1rem',
                  borderRadius: '4px',
                  fontSize: '0.875rem',
                }}
              >
                <Check size={16} color="#68D391" />
                <span>Thank you. You’re subscribed to LensCare updates.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    flex: 1,
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '4px',
                    padding: '0.75rem 1rem',
                    color: '#FFFFFF',
                    fontSize: '0.875rem',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  style={{
                    backgroundColor: '#CFA85B',
                    color: '#07172B',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '0.75rem 1.5rem',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    letterSpacing: '0.02em',
                    whiteSpace: 'nowrap',
                    transition: 'background 0.15s ease',
                  }}
                >
                  {status === 'loading' ? 'Joining...' : 'Join'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
