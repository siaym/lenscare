import type { Metadata } from 'next';
import { AccountLayout } from '@/components/account/AccountLayout';
import { Plus, Calendar } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'My Prescriptions',
  description: 'Manage and store your optical prescription parameters for quick eyewear ordering.',
};

export default function AccountPrescriptionsPage() {
  const prescriptions = [
    {
      id: 'rx-1',
      title: 'Current Distance & Computer Glasses',
      doctor: 'Dr. K. Rahman (Bangladesh Eye Hospital)',
      date: 'July 15, 2026',
      expiry: 'July 15, 2027',
      pd: 63,
      rightEye: { sph: -2.0, cyl: -0.5, axis: 90, add: null },
      leftEye: { sph: -1.75, cyl: -0.75, axis: 85, add: null },
      notes: 'Recommended 1.61 or 1.67 Blue-Cut coating for prolonged software engineering screen work.',
      isDefault: true,
    },
  ];

  return (
    <AccountLayout
      title="Saved Prescriptions"
      subtitle="Your verified eye power measurements are stored here for fast precision lens cutting."
    >
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
        <button
          type="button"
          className="btn btn--primary btn--sm"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <Plus size={16} /> Add New Prescription
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {prescriptions.map((rx) => (
          <div
            key={rx.id}
            style={{
              background: 'var(--color-surface)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--color-border)',
              padding: '1.75rem',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '1.25rem',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0, color: 'var(--color-text)' }}>
                    {rx.title}
                  </h3>
                  {rx.isDefault && (
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '0.15rem 0.5rem',
                        borderRadius: '999px',
                        background: 'rgba(201,169,110,0.15)',
                        color: 'var(--color-accent-dark)',
                      }}
                    >
                      Default
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                  Issued by {rx.doctor} • Verified by Optometrist
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                <Calendar size={14} />
                <span>Expires: {rx.expiry}</span>
              </div>
            </div>

            {/* Power Matrix Table */}
            <div
              style={{
                overflowX: 'auto',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                marginBottom: '1.25rem',
              }}
            >
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ background: 'var(--color-surface-2)', borderBottom: '1px solid var(--color-border)' }}>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600 }}>Eye</th>
                    <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Sphere (SPH)</th>
                    <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Cylinder (CYL)</th>
                    <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Axis</th>
                    <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>PD (mm)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 700, color: 'var(--color-primary)' }}>
                      OD (Right Eye)
                    </td>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>{rx.rightEye.sph.toFixed(2)}</td>
                    <td style={{ padding: '0.75rem 1rem' }}>{rx.rightEye.cyl.toFixed(2)}</td>
                    <td style={{ padding: '0.75rem 1rem' }}>{rx.rightEye.axis}°</td>
                    <td style={{ padding: '0.75rem 1rem' }} rowSpan={2}>
                      <strong>{rx.pd} mm</strong>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 700, color: 'var(--color-primary)' }}>
                      OS (Left Eye)
                    </td>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>{rx.leftEye.sph.toFixed(2)}</td>
                    <td style={{ padding: '0.75rem 1rem' }}>{rx.leftEye.cyl.toFixed(2)}</td>
                    <td style={{ padding: '0.75rem 1rem' }}>{rx.leftEye.axis}°</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Notes & Actions */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
                paddingTop: '0.75rem',
              }}
            >
              <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', maxWidth: '500px' }}>
                <strong>Optician Advice:</strong> {rx.notes}
              </div>

              <Link href="/eyeglasses" className="btn btn--secondary btn--sm">
                Shop Frames with this Power
              </Link>
            </div>
          </div>
        ))}
      </div>
    </AccountLayout>
  );
}
