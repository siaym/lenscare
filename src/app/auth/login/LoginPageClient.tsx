'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Mail, ArrowRight, Eye, EyeOff, ShieldCheck, Sparkles } from 'lucide-react';
import { useToast } from '@/components/ui/Toaster';

export function LoginPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/account';

  const { success, error } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      error('Missing credentials', 'Please enter both your email address and password.');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate/perform login
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Store demo auth state in localStorage for client-side persistence
      localStorage.setItem(
        'lenscare_user',
        JSON.stringify({
          email,
          name: email.split('@')[0],
          role: email.includes('admin') ? 'ADMIN' : 'CUSTOMER',
        })
      );

      success('Welcome back!', 'You have successfully signed in.');
      router.push(email.includes('admin') ? '/admin' : redirectUrl);
    } catch {
      error('Login failed', 'Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemo = (role: 'CUSTOMER' | 'ADMIN') => {
    if (role === 'ADMIN') {
      setEmail('admin@lenscare.com.bd');
      setPassword('admin123456');
    } else {
      setEmail('customer@lenscare.com.bd');
      setPassword('customer123456');
    }
  };

  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 1.25rem',
        background: 'var(--color-bg)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          background: 'var(--color-surface)',
          borderRadius: 'var(--radius-2xl)',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-xl)',
          padding: '2.5rem 2rem',
        }}
      >
        {/* Brand Monogram */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              background: 'var(--color-primary)',
              color: 'var(--color-accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              fontSize: '1.25rem',
              fontWeight: 800,
              boxShadow: '0 4px 14px rgba(11,31,58,0.25)',
            }}
          >
            LC
          </div>
          <h1 className="text-heading-2" style={{ marginBottom: '0.35rem' }}>
            Welcome Back
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
            Sign in to track orders, saved power lenses, and wishlists.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label className="form-label" htmlFor="email">
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail
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
                id="email"
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '2.75rem' }}
              />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.375rem' }}>
              <label className="form-label" htmlFor="password" style={{ margin: 0 }}>
                Password
              </label>
              <a href="#" style={{ fontSize: '0.8rem', color: 'var(--color-accent-dark)', textDecoration: 'none' }}>
                Forgot password?
              </a>
            </div>
            <div style={{ position: 'relative' }}>
              <Lock
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
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '2.75rem', paddingRight: '2.75rem' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-text-muted)',
                  cursor: 'pointer',
                  display: 'flex',
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn--primary btn--full btn--lg"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              marginTop: '0.5rem',
            }}
          >
            <span>{isLoading ? 'Signing In...' : 'Sign In to Account'}</span>
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Demo Fast Logins */}
        <div
          style={{
            marginTop: '1.75rem',
            padding: '1rem',
            background: 'var(--color-surface-2)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border)',
            fontSize: '0.8rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
            <Sparkles size={14} style={{ color: 'var(--color-accent-dark)' }} />
            <span>Fast Demo Credentials:</span>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={() => handleQuickDemo('CUSTOMER')}
              style={{
                flex: 1,
                padding: '0.4rem 0.5rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)',
                background: 'white',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.78rem',
              }}
            >
              Fill Customer
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('ADMIN')}
              style={{
                flex: 1,
                padding: '0.4rem 0.5rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)',
                background: 'white',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.78rem',
              }}
            >
              Fill Admin
            </button>
          </div>
        </div>

        {/* Footer link to register */}
        <div style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
          Don&apos;t have an account yet?{' '}
          <Link href="/auth/register" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
            Create an account
          </Link>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem',
            marginTop: '1.5rem',
            fontSize: '0.75rem',
            color: 'var(--color-text-muted)',
          }}
        >
          <ShieldCheck size={14} />
          <span>Encrypted with 256-bit Supabase SSL Auth</span>
        </div>
      </div>
    </div>
  );
}
