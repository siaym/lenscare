'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function AdminOrdersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const [orders, setOrders] = useState([
    {
      id: 'LC-2026-89412',
      customer: 'Siyam Ahmed',
      phone: '01712-345678',
      email: 'siyam@example.com',
      address: 'House 14, Road 5, Block B, Dhanmondi, Dhaka',
      date: 'Sep 24, 2026 10:30 AM',
      items: 'Fusion Titan-X Air 102 (Matte Gunmetal)',
      prescription: 'Single Vision • 1.61 Hi-Index • Anti-Glare + Blue Cut (R -2.00, L -1.75)',
      total: 4250,
      paymentMethod: 'COD',
      status: 'PROCESSING',
      statusLabel: 'Optical Lab Fitting',
    },
    {
      id: 'LC-2026-89408',
      customer: 'Farhan Kabir',
      phone: '01844-998877',
      email: 'farhan@gmail.com',
      address: 'Flat 4B, Road 11, Banani, Dhaka',
      date: 'Sep 24, 2026 09:15 AM',
      items: 'Novara Elegance Hexagon (Rose Gold)',
      prescription: 'Zero Power / Fashion UV400',
      total: 2800,
      paymentMethod: 'bKash Paid',
      status: 'CONFIRMED',
      statusLabel: 'Confirmed (Queued for Lab)',
    },
    {
      id: 'LC-2026-89395',
      customer: 'Nusrat Jahan',
      phone: '01911-223344',
      email: 'nusrat.j@yahoo.com',
      address: 'GEC Circle, Nasirabad, Chittagong',
      date: 'Sep 23, 2026 04:20 PM',
      items: 'LensAura Aviator Luxe (Gold / Green Polarized)',
      prescription: 'Sunglasses (100% Polarized UV400)',
      total: 3900,
      paymentMethod: 'SSLCommerz (Visa)',
      status: 'DISPATCHED',
      statusLabel: 'Steadfast Courier (In Transit)',
    },
    {
      id: 'LC-2026-89380',
      customer: 'Mahmudul Hasan',
      phone: '01677-112233',
      email: 'm.hasan@outlook.com',
      address: 'House 9, Sector 7, Uttara, Dhaka',
      date: 'Sep 22, 2026 01:10 PM',
      items: 'OptiLux Neo Classic C3 (Tortoise Brown)',
      prescription: 'Progressive Multifocal • 1.67 Ultra-Thin (R +1.50, L +1.75, Add +1.50)',
      total: 5800,
      paymentMethod: 'COD',
      status: 'DELIVERED',
      statusLabel: 'Delivered',
    },
  ]);

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.phone.includes(searchTerm);

    const matchesStatus = statusFilter === 'ALL' || o.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (id: string, newStatus: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o;
        return {
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
        };
      })
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 className="text-heading-2" style={{ margin: 0 }}>
          Order Management & Prescription Processing
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', margin: 0, marginTop: '0.2rem' }}>
          Inspect frame requirements, customer eye power specs, and dispatch courier packages.
        </p>
      </div>

      {/* Filter and Search */}
      <div
        style={{
          background: 'var(--color-surface)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-border)',
          padding: '1.25rem',
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          alignItems: 'center',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: '0.875rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--color-text-muted)',
            }}
          />
          <input
            type="text"
            placeholder="Search by Order ID, Customer Name, or Phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '2.5rem', fontSize: '0.875rem' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {['ALL', 'CONFIRMED', 'PROCESSING', 'DISPATCHED', 'DELIVERED'].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              style={{
                padding: '0.4rem 0.875rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                background: statusFilter === st ? 'var(--color-primary)' : 'var(--color-surface)',
                color: statusFilter === st ? 'white' : 'var(--color-text)',
                fontWeight: 600,
                fontSize: '0.82rem',
                cursor: 'pointer',
              }}
            >
              {st === 'ALL'
                ? 'All Orders'
                : st === 'PROCESSING'
                ? 'In Lab'
                : st.charAt(0) + st.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            style={{
              background: 'var(--color-surface)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--color-border)',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            {/* Top row */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '1rem',
                borderBottom: '1px solid var(--color-border)',
                paddingBottom: '1rem',
                marginBottom: '1rem',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--color-primary)' }}>
                    {order.id}
                  </span>
                  <span
                    style={{
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
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                  Placed on {order.date}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--color-text)' }}>
                    {formatPrice(order.total)}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    {order.paymentMethod}
                  </div>
                </div>

                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  style={{
                    padding: '0.5rem 0.75rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-primary)',
                    background: 'white',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    color: 'var(--color-primary)',
                  }}
                >
                  <option value="CONFIRMED">Status: Confirmed</option>
                  <option value="PROCESSING">Status: In Optical Lab</option>
                  <option value="DISPATCHED">Status: Dispatched</option>
                  <option value="DELIVERED">Status: Delivered</option>
                </select>
              </div>
            </div>

            {/* Details Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.25rem',
                fontSize: '0.85rem',
              }}
            >
              <div>
                <div style={{ fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.35rem' }}>
                  Customer Details:
                </div>
                <div style={{ fontWeight: 600 }}>{order.customer}</div>
                <div style={{ color: 'var(--color-text-muted)' }}>{order.phone}</div>
                <div style={{ color: 'var(--color-text-muted)' }}>{order.email}</div>
                <div style={{ color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>{order.address}</div>
              </div>

              <div>
                <div style={{ fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.35rem' }}>
                  Frame Ordered:
                </div>
                <div style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{order.items}</div>
                <div
                  style={{
                    marginTop: '0.5rem',
                    padding: '0.5rem 0.75rem',
                    background: 'rgba(201,169,110,0.1)',
                    borderRadius: 'var(--radius-sm)',
                    borderLeft: '3px solid var(--color-accent)',
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: '0.78rem', color: 'var(--color-accent-dark)' }}>
                    Optical Lens Prescription:
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text)', marginTop: '0.15rem' }}>
                    {order.prescription}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
