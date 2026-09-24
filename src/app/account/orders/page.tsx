import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { AccountLayout } from '@/components/account/AccountLayout';
import { Truck, MessageCircle, Eye } from 'lucide-react';
import { formatPrice, generateWhatsAppUrl } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Order History',
  description: 'View all your past and current eyewear orders placed with LensCare.',
};

interface OrderItem {
  name: string;
  image: string;
  color: string;
  price: number;
  quantity: number;
  lensConfig?: string;
}

interface OrderRecord {
  id: string;
  date: string;
  total: number;
  status: string;
  statusLabel: string;
  paymentMethod: string;
  deliveryAddress: string;
  items: OrderItem[];
}

export default function AccountOrdersPage() {
  const orders: OrderRecord[] = [
    {
      id: 'LC-2026-89412',
      date: 'September 22, 2026',
      total: 4250,
      status: 'PROCESSING',
      statusLabel: 'In Optical Lab Fitting',
      paymentMethod: 'Cash on Delivery',
      deliveryAddress: 'House 14, Road 5, Dhanmondi, Dhaka',
      items: [
        {
          name: 'Fusion Titan-X Air 102',
          image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&q=80',
          color: 'Matte Gunmetal',
          price: 3200,
          quantity: 1,
          lensConfig: 'Single Vision (1.61 Hi-Index, Anti-Glare + Blue Cut)',
        },
      ],
    },
    {
      id: 'LC-2026-31084',
      date: 'August 14, 2026',
      total: 3100,
      status: 'DELIVERED',
      statusLabel: 'Delivered Successfully',
      paymentMethod: 'bKash Paid',
      deliveryAddress: 'House 14, Road 5, Dhanmondi, Dhaka',
      items: [
        {
          name: 'OptiLux Neo Classic C3',
          image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80',
          color: 'Tortoise Brown',
          price: 3100,
          quantity: 1,
        },
      ],
    },
  ];

  return (
    <AccountLayout title="Order History" subtitle="Track optical processing and shipping status for all your frames.">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {orders.map((order) => (
          <div
            key={order.id}
            style={{
              background: 'var(--color-surface)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--color-border)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            {/* Order Card Header */}
            <div
              style={{
                padding: '1.25rem 1.5rem',
                background: 'var(--color-surface-2)',
                borderBottom: '1px solid var(--color-border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                    Order Placed
                  </span>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{order.date}</div>
                </div>

                <div style={{ borderLeft: '1px solid var(--color-border)', paddingLeft: '1rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                    Total
                  </span>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-primary)' }}>
                    {formatPrice(order.total)}
                  </div>
                </div>

                <div style={{ borderLeft: '1px solid var(--color-border)', paddingLeft: '1rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                    Shipped To
                  </span>
                  <div style={{ fontSize: '0.9rem', color: 'var(--color-text)' }}>Dhaka</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '0.25rem 0.75rem',
                    borderRadius: '999px',
                    background: order.status === 'PROCESSING' ? 'rgba(201,169,110,0.15)' : 'rgba(45,122,79,0.1)',
                    color: order.status === 'PROCESSING' ? 'var(--color-accent-dark)' : 'var(--color-success)',
                  }}
                >
                  {order.statusLabel}
                </span>

                <Link
                  href={`/track-order?orderNumber=${order.id}`}
                  className="btn btn--primary btn--sm"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  <Truck size={14} /> Track Order
                </Link>
              </div>
            </div>

            {/* Order Items */}
            <div style={{ padding: '1.5rem' }}>
              {order.items.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                  <div
                    style={{
                      position: 'relative',
                      width: '80px',
                      height: '64px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--color-surface-2)',
                      overflow: 'hidden',
                      flexShrink: 0,
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--color-text)' }}>{item.name}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '0.15rem' }}>
                      Color: {item.color} • Qty: {item.quantity}
                    </div>
                    {item.lensConfig && (
                      <div
                        style={{
                          marginTop: '0.35rem',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          fontSize: '0.78rem',
                          color: 'var(--color-accent-dark)',
                          fontWeight: 600,
                        }}
                      >
                        <Eye size={13} />
                        <span>{item.lensConfig}</span>
                      </div>
                    )}
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--color-text)' }}>
                      {formatPrice(item.price)}
                    </div>
                    <a
                      href={generateWhatsAppUrl(`Hi LensCare, I would like to inquire about my order ${order.id}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        fontSize: '0.8rem',
                        color: '#25D366',
                        textDecoration: 'none',
                        marginTop: '0.35rem',
                        fontWeight: 600,
                      }}
                    >
                      <MessageCircle size={14} /> Support
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AccountLayout>
  );
}
