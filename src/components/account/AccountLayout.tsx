'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  User,
  ShoppingBag,
  Heart,
  FileText,
  MapPin,
  LogOut,
  Shield,
  ChevronRight,
} from 'lucide-react';

interface AccountLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function AccountLayout({ children, title, subtitle }: AccountLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<{ name: string; email: string; role?: string }>({
    name: 'Siyam Ahmed',
    email: 'siyam@example.com',
    role: 'CUSTOMER',
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem('lenscare_user');
      if (stored) {
        const parsed = JSON.parse(stored);
        const timer = setTimeout(() => {
          setUser(parsed);
        }, 0);
        return () => clearTimeout(timer);
      }
    } catch {
      // Ignore
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('lenscare_user');
    router.push('/auth/login');
  };

  const navItems = [
    { label: 'Account Overview', href: '/account', icon: User },
    { label: 'My Orders', href: '/account/orders', icon: ShoppingBag },
    { label: 'My Wishlist', href: '/account/wishlist', icon: Heart },
    { label: 'Prescriptions', href: '/account/prescriptions', icon: FileText },
    { label: 'Delivery Addresses', href: '/account/addresses', icon: MapPin },
  ];

  return (
    <>
      {/* Account Header */}
      <div
        style={{
          background: 'var(--color-primary)',
          color: 'white',
          padding: '2.5rem 0 2rem',
        }}
      >
        <div className="container">
          <nav className="breadcrumb" style={{ marginBottom: '0.75rem' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.6)' }}>Home</Link>
            <span className="breadcrumb__separator" style={{ color: 'rgba(255,255,255,0.3)' }}>/</span>
            <span style={{ color: 'white' }}>Account</span>
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 className="text-heading-1" style={{ color: 'white', fontSize: '1.75rem' }}>
                {title}
              </h1>
              {subtitle && (
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                  {subtitle}
                </p>
              )}
            </div>

            {user.role === 'ADMIN' && (
              <Link
                href="/admin"
                className="btn btn--secondary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.85rem',
                  color: 'white',
                  borderColor: 'rgba(255,255,255,0.3)',
                }}
              >
                <Shield size={16} /> Admin Dashboard
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '2.5rem 1.25rem 5rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '2rem',
          }}
          className="lg:grid-cols-4"
        >
          {/* Sidebar Nav */}
          <div className="lg:col-span-1">
            <div
              style={{
                background: 'var(--color-surface)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)',
                overflow: 'hidden',
              }}
            >
              {/* User Bio Card */}
              <div
                style={{
                  padding: '1.5rem',
                  borderBottom: '1px solid var(--color-border)',
                  background: 'var(--color-surface-2)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.875rem',
                }}
              >
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    background: 'var(--color-primary)',
                    color: 'var(--color-accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                  }}
                >
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {user.name}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {user.email}
                  </div>
                </div>
              </div>

              {/* Navigation Links */}
              <div style={{ padding: '0.75rem' }}>
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-md)',
                        color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)',
                        background: isActive ? 'rgba(11,31,58,0.06)' : 'transparent',
                        fontWeight: isActive ? 700 : 500,
                        fontSize: '0.9rem',
                        textDecoration: 'none',
                        transition: 'all 0.15s ease',
                        marginBottom: '0.25rem',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Icon size={18} style={{ color: isActive ? 'var(--color-accent-dark)' : 'inherit' }} />
                        <span>{item.label}</span>
                      </div>
                      <ChevronRight size={14} style={{ opacity: isActive ? 1 : 0.4 }} />
                    </Link>
                  );
                })}

                <button
                  type="button"
                  onClick={handleLogout}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--color-error)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    textAlign: 'left',
                    marginTop: '0.5rem',
                    borderTop: '1px solid var(--color-border)',
                  }}
                >
                  <LogOut size={18} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
