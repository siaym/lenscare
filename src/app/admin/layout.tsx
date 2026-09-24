import type { Metadata } from 'next';
import Link from 'next/link';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  ExternalLink,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Admin Dashboard | LensCare Optical Systems',
  description: 'Manage store orders, optical lab fittings, and product inventory.',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', display: 'flex' }}>
      {/* Admin Sidebar */}
      <aside
        style={{
          width: '260px',
          background: 'var(--color-primary)',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
          borderRight: '1px solid rgba(255,255,255,0.1)',
        }}
        className="hidden md:flex"
      >
        {/* Brand Bar */}
        <div
          style={{
            padding: '1.75rem 1.5rem',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--color-accent)',
              color: 'var(--color-primary-dark)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1rem',
            }}
          >
            LC
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.02em', color: 'white' }}>
              LensCare
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Admin Console
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ padding: '1.25rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', flex: 1 }}>
          <Link
            href="/admin"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              color: 'white',
              background: 'rgba(255,255,255,0.1)',
              fontWeight: 600,
              fontSize: '0.9rem',
              textDecoration: 'none',
            }}
          >
            <LayoutDashboard size={18} style={{ color: 'var(--color-accent)' }} />
            <span>Dashboard</span>
          </Link>

          <Link
            href="/admin/orders"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              color: 'rgba(255,255,255,0.7)',
              fontSize: '0.9rem',
              fontWeight: 500,
              textDecoration: 'none',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <ShoppingBag size={18} />
              <span>Orders</span>
            </div>
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                background: 'var(--color-accent)',
                color: 'var(--color-primary-dark)',
                padding: '0.1rem 0.45rem',
                borderRadius: '999px',
              }}
            >
              12
            </span>
          </Link>

          <Link
            href="/admin/products"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              color: 'rgba(255,255,255,0.7)',
              fontSize: '0.9rem',
              fontWeight: 500,
              textDecoration: 'none',
            }}
          >
            <Package size={18} />
            <span>Inventory</span>
          </Link>
        </nav>

        {/* Back to store */}
        <div style={{ padding: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.85rem',
              color: 'rgba(255,255,255,0.6)',
              textDecoration: 'none',
            }}
          >
            <ExternalLink size={16} />
            <span>View Public Storefront</span>
          </Link>
        </div>
      </aside>

      {/* Main Admin Area */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        {/* Top Bar */}
        <header
          style={{
            height: '64px',
            background: 'var(--color-surface)',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 2rem',
          }}
        >
          <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-text)' }}>
            LensCare Optical Store Manager
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-success)' }} />
              <span style={{ color: 'var(--color-text-muted)' }}>Online Store: Active</span>
            </div>

            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'var(--color-primary)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.85rem',
              }}
            >
              AD
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ padding: '2rem', flex: 1, overflowY: 'auto' }}>{children}</main>
      </div>
    </div>
  );
}
