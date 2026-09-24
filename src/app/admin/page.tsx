'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  ShoppingBag,
  Eye,
  CheckCircle2,
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState([
    {
      id: 'LC-2026-89412',
      customer: 'Siyam Ahmed',
      phone: '01712-345678',
      date: 'Today 10:30 AM',
      items: 'Fusion Titan-X Air 102 (Anti-Glare + Blue Cut 1.61)',
      total: 4250,
      payment: 'COD',
      status: 'PROCESSING',
      statusLabel: 'Optical Lab Fitting',
    },
    {
      id: 'LC-2026-89408',
      customer: 'Farhan Kabir',
      phone: '01844-998877',
      date: 'Today 09:15 AM',
      items: 'Novara Elegance Hexagon (Zero Power)',
      total: 2800,
      payment: 'bKash Paid',
      status: 'CONFIRMED',
      statusLabel: 'Ready for Lab',
    },
    {
      id: 'LC-2026-89395',
      customer: 'Nusrat Jahan',
      phone: '01911-223344',
      date: 'Yesterday 04:20 PM',
      items: 'LensAura Aviator Luxe (UV400 Polarized Sunglasses)',
      total: 3900,
      payment: 'SSLCommerz Paid',
      status: 'DISPATCHED',
      statusLabel: 'Courier Transit',
    },
    {
      id: 'LC-2026-89380',
      customer: 'Mahmudul Hasan',
      phone: '01677-112233',
      date: 'Yesterday 01:10 PM',
      items: 'OptiLux Neo Classic C3 (Progressive 1.67)',
      total: 5800,
      payment: 'COD',
      status: 'DELIVERED',
      statusLabel: 'Delivered',
    },
  ]);

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status: newStatus,
              statusLabel:
                newStatus === 'PROCESSING'
                  ? 'Optical Lab Fitting'
                  : newStatus === 'DISPATCHED'
                  ? 'Courier Transit'
                  : newStatus === 'DELIVERED'
                  ? 'Delivered'
                  : 'Confirmed',
            }
          : o
      )
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Metric Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>This Month Revenue</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(201,169,110,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent-dark)' }}>
              <TrendingUp size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text)' }}>
            ৳486,500
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-success)', fontWeight: 600, marginTop: '0.35rem' }}>
            +18.4% vs last month
          </div>
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Total Orders</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(11,31,58,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
              <ShoppingBag size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text)' }}>184</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.35rem' }}>
            Avg Order Value: ৳2,644
          </div>
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Optical Lab Queue</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(217,119,6,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D97706' }}>
              <Eye size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text)' }}>12 Jobs</div>
          <div style={{ fontSize: '0.8rem', color: '#D97706', fontWeight: 600, marginTop: '0.35rem' }}>
            3 require prescription verification
          </div>
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Active Frames</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(45,122,79,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-success)' }}>
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text)' }}>58 SKUs</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.35rem' }}>
            4 low stock alerts
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div
        style={{
          background: 'var(--color-surface)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-border)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0, color: 'var(--color-text)' }}>
              Recent Orders & Optical Fitting Queue
            </h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', margin: 0, marginTop: '0.2rem' }}>
              Real-time feed of customer orders and optical lab fulfillment state.
            </p>
          </div>

          <Link href="/admin/orders" className="btn btn--secondary btn--sm">
            View All Orders
          </Link>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ background: 'var(--color-surface-2)', borderBottom: '1px solid var(--color-border)' }}>
                <th style={{ padding: '0.875rem 1.25rem', fontWeight: 600 }}>Order ID</th>
                <th style={{ padding: '0.875rem 1.25rem', fontWeight: 600 }}>Customer</th>
                <th style={{ padding: '0.875rem 1.25rem', fontWeight: 600 }}>Eyewear & Lens Specs</th>
                <th style={{ padding: '0.875rem 1.25rem', fontWeight: 600 }}>Amount</th>
                <th style={{ padding: '0.875rem 1.25rem', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '0.875rem 1.25rem', fontWeight: 600 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                    {order.id}
                  </td>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <div style={{ fontWeight: 600 }}>{order.customer}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>{order.phone}</div>
                  </td>
                  <td style={{ padding: '1rem 1.25rem', maxWidth: '320px' }}>
                    <div style={{ color: 'var(--color-text)', lineHeight: 1.4 }}>{order.items}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.2rem' }}>{order.date}</div>
                  </td>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <div style={{ fontWeight: 700 }}>{formatPrice(order.total)}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{order.payment}</div>
                  </td>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '0.2rem 0.6rem',
                        borderRadius: '999px',
                        background:
                          order.status === 'PROCESSING'
                            ? 'rgba(201,169,110,0.15)'
                            : order.status === 'DISPATCHED'
                            ? 'rgba(30,107,168,0.1)'
                            : order.status === 'DELIVERED'
                            ? 'rgba(45,122,79,0.1)'
                            : 'rgba(11,31,58,0.06)',
                        color:
                          order.status === 'PROCESSING'
                            ? 'var(--color-accent-dark)'
                            : order.status === 'DISPATCHED'
                            ? 'var(--color-info)'
                            : order.status === 'DELIVERED'
                            ? 'var(--color-success)'
                            : 'var(--color-primary)',
                      }}
                    >
                      {order.statusLabel}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      style={{
                        padding: '0.35rem 0.6rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-border)',
                        background: 'white',
                        fontSize: '0.8rem',
                        fontWeight: 500,
                        cursor: 'pointer',
                      }}
                    >
                      <option value="CONFIRMED">Set: Confirmed</option>
                      <option value="PROCESSING">Set: In Lab Fitting</option>
                      <option value="DISPATCHED">Set: Dispatched</option>
                      <option value="DELIVERED">Set: Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
