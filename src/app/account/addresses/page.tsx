import type { Metadata } from 'next';
import { AccountLayout } from '@/components/account/AccountLayout';
import { Plus, Phone, Home, Briefcase } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Delivery Addresses',
  description: 'Manage your saved delivery destinations across Bangladesh.',
};

export default function AccountAddressesPage() {
  const addresses = [
    {
      id: 'addr-1',
      label: 'Home (Dhanmondi)',
      icon: Home,
      recipientName: 'Siyam Ahmed',
      phone: '01712-345678',
      division: 'Dhaka',
      district: 'Dhaka',
      address: 'House 14, Road 5, Block B, Dhanmondi',
      postalCode: '1205',
      isDefault: true,
    },
    {
      id: 'addr-2',
      label: 'Office (Gulshan)',
      icon: Briefcase,
      recipientName: 'Siyam Ahmed',
      phone: '01712-345678',
      division: 'Dhaka',
      district: 'Dhaka',
      address: 'Level 8, Crystal Palace, SE(D) 22, Gulshan South Avenue',
      postalCode: '1212',
      isDefault: false,
    },
  ];

  return (
    <AccountLayout
      title="Saved Delivery Addresses"
      subtitle="Addresses stored for quick 1-click checkout with local courier delivery."
    >
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
        <button
          type="button"
          className="btn btn--primary btn--sm"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <Plus size={16} /> Add New Address
        </button>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {addresses.map((addr) => {
          const Icon = addr.icon;

          return (
            <div
              key={addr.id}
              style={{
                background: 'var(--color-surface)',
                borderRadius: 'var(--radius-xl)',
                border: addr.isDefault ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                padding: '1.5rem',
                boxShadow: 'var(--shadow-sm)',
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--color-surface-2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-primary)',
                    }}
                  >
                    <Icon size={16} />
                  </div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: 'var(--color-text)' }}>
                    {addr.label}
                  </h3>
                </div>

                {addr.isDefault && (
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '0.15rem 0.5rem',
                      borderRadius: '999px',
                      background: 'rgba(11,31,58,0.1)',
                      color: 'var(--color-primary)',
                    }}
                  >
                    Default Shipping
                  </span>
                )}
              </div>

              <div style={{ fontSize: '0.9rem', color: 'var(--color-text)', marginBottom: '0.5rem', fontWeight: 600 }}>
                {addr.recipientName}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>
                <Phone size={14} />
                <span>{addr.phone}</span>
              </div>

              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                {addr.address}, {addr.district}, {addr.division} - {addr.postalCode}
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
                <button
                  type="button"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-accent-dark)',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  Edit Address
                </button>
                {!addr.isDefault && (
                  <button
                    type="button"
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-text-muted)',
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      padding: 0,
                    }}
                  >
                    Set as Default
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </AccountLayout>
  );
}
