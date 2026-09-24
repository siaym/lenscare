import type { Metadata } from 'next';
import Link from 'next/link';
import { AccountLayout } from '@/components/account/AccountLayout';
import {
  ShoppingBag,
  FileText,
  MapPin,
  ArrowRight,
  Truck,
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'My Account Dashboard',
  description: 'Manage your LensCare orders, prescription power records, and addresses.',
};

export default function AccountPage() {
  const recentOrders = [
    {
      id: 'LC-2026-89412',
      date: 'Sep 22, 2026',
      total: 4250,
      status: 'PROCESSING',
      statusLabel: 'In Optical Lab',
      itemCount: 1,
      frame: 'Fusion Titan-X Air 102',
    },
    {
      id: 'LC-2026-31084',
      date: 'Aug 14, 2026',
      total: 3100,
      status: 'DELIVERED',
      statusLabel: 'Delivered',
      itemCount: 1,
      frame: 'OptiLux Neo Classic C3',
    },
  ];

  return (
    <AccountLayout title="Account Dashboard" subtitle="Welcome back! Here is a summary of your eyewear orders and profile.">
      {/* Quick Metrics Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2rem',
        }}
      >
        <div
          style={{
            background: 'var(--color-surface)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-border)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Total Orders</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(11,31,58,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
              <ShoppingBag size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text)' }}>2</div>
          <Link href="/account/orders" style={{ fontSize: '0.8rem', color: 'var(--color-accent-dark)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.5rem' }}>
            View order history <ArrowRight size={12} />
          </Link>
        </div>

        <div
          style={{
            background: 'var(--color-surface)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-border)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Prescriptions</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(201,169,110,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent-dark)' }}>
              <FileText size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text)' }}>1 Active</div>
          <Link href="/account/prescriptions" style={{ fontSize: '0.8rem', color: 'var(--color-accent-dark)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.5rem' }}>
            View power details <ArrowRight size={12} />
          </Link>
        </div>

        <div
          style={{
            background: 'var(--color-surface)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-border)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Saved Addresses</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(45,122,79,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-success)' }}>
              <MapPin size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text)' }}>Dhaka (Home)</div>
          <Link href="/account/addresses" style={{ fontSize: '0.8rem', color: 'var(--color-accent-dark)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.5rem' }}>
            Manage addresses <ArrowRight size={12} />
          </Link>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div
        style={{
          background: 'var(--color-surface)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-border)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '2rem',
        }}
      >
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, color: 'var(--color-text)' }}>
            Recent Orders
          </h2>
          <Link href="/account/orders" style={{ fontSize: '0.85rem', color: 'var(--color-accent-dark)', fontWeight: 600 }}>
            View All Orders
          </Link>
        </div>

        <div>
          {recentOrders.map((order) => (
            <div
              key={order.id}
              style={{
                padding: '1.5rem',
                borderBottom: '1px solid var(--color-border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--color-primary)' }}>{order.id}</span>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '0.2rem 0.6rem',
                      borderRadius: '999px',
                      background: order.status === 'PROCESSING' ? 'rgba(201,169,110,0.15)' : 'rgba(45,122,79,0.1)',
                      color: order.status === 'PROCESSING' ? 'var(--color-accent-dark)' : 'var(--color-success)',
                    }}
                  >
                    {order.statusLabel}
                  </span>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  Placed on {order.date} • {order.frame}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{formatPrice(order.total)}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Cash on Delivery</div>
                </div>

                <Link
                  href={`/track-order?orderNumber=${order.id}`}
                  className="btn btn--secondary btn--sm"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  <Truck size={14} /> Track Order
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Action Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, var(--color-primary) 0%, #15325b 100%)',
          borderRadius: 'var(--radius-xl)',
          padding: '2rem',
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}
      >
        <div>
          <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.35rem' }}>
            Need to update your eye power?
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem', margin: 0, maxWidth: '480px' }}>
            Keep your optical prescription on file for fast 1-click ordering with precision lab cutting.
          </p>
        </div>

        <Link href="/account/prescriptions" className="btn btn--primary" style={{ background: 'var(--color-accent)', color: 'var(--color-primary-dark)' }}>
          Manage Prescriptions
        </Link>
      </div>
    </AccountLayout>
  );
}
