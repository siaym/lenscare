'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Plus } from 'lucide-react';
import { MOCK_PRODUCTS } from '@/lib/data/mockData';
import { formatPrice } from '@/lib/utils';

export default function AdminProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [products, setProducts] = useState(MOCK_PRODUCTS);

  const filtered = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.brand?.name && p.brand.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory =
      categoryFilter === 'ALL' || p.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const toggleStock = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock: p.stock > 0 ? 0 : 15 } : p))
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 className="text-heading-2" style={{ margin: 0 }}>
            Eyewear Inventory & Catalog
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', margin: 0, marginTop: '0.2rem' }}>
            Manage stock availability, pricing, and prescription eligibility.
          </p>
        </div>

        <button
          type="button"
          className="btn btn--primary btn--sm"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <Plus size={16} /> Add New Frame
        </button>
      </div>

      {/* Filter and Search Bar */}
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
            placeholder="Search by model name, SKU, or brand..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '2.5rem', fontSize: '0.875rem' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['ALL', 'EYEGLASSES', 'SUNGLASSES'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoryFilter(cat)}
              style={{
                padding: '0.4rem 0.875rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                background: categoryFilter === cat ? 'var(--color-primary)' : 'var(--color-surface)',
                color: categoryFilter === cat ? 'white' : 'var(--color-text)',
                fontWeight: 600,
                fontSize: '0.82rem',
                cursor: 'pointer',
              }}
            >
              {cat === 'ALL' ? 'All Frames' : cat === 'EYEGLASSES' ? 'Eyeglasses' : 'Sunglasses'}
            </button>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <div
        style={{
          background: 'var(--color-surface)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-border)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ background: 'var(--color-surface-2)', borderBottom: '1px solid var(--color-border)' }}>
                <th style={{ padding: '0.875rem 1.25rem', fontWeight: 600 }}>Product</th>
                <th style={{ padding: '0.875rem 1.25rem', fontWeight: 600 }}>Category & Shape</th>
                <th style={{ padding: '0.875rem 1.25rem', fontWeight: 600 }}>Price</th>
                <th style={{ padding: '0.875rem 1.25rem', fontWeight: 600 }}>Stock</th>
                <th style={{ padding: '0.875rem 1.25rem', fontWeight: 600 }}>Prescription Ready</th>
                <th style={{ padding: '0.875rem 1.25rem', fontWeight: 600 }}>Stock Toggle</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                      <div
                        style={{
                          position: 'relative',
                          width: '54px',
                          height: '42px',
                          borderRadius: 'var(--radius-sm)',
                          overflow: 'hidden',
                          background: 'var(--color-surface-2)',
                          flexShrink: 0,
                          border: '1px solid var(--color-border)',
                        }}
                      >
                        {product.images?.[0]?.url && (
                          <Image src={product.images[0].url} alt={product.name} fill className="object-cover" sizes="54px" />
                        )}
                      </div>
                      <div>
                        <Link
                          href={`/products/${product.slug}`}
                          target="_blank"
                          style={{
                            fontWeight: 700,
                            color: 'var(--color-text)',
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                          }}
                        >
                          {product.name}
                        </Link>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                          SKU: {product.sku} • {product.brand?.name}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td style={{ padding: '1rem 1.25rem' }}>
                    <div style={{ fontWeight: 600 }}>{product.category}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                      {product.shape?.name || 'Geometric'}
                    </div>
                  </td>

                  <td style={{ padding: '1rem 1.25rem' }}>
                    <div style={{ fontWeight: 700 }}>{formatPrice(product.salePrice || product.price)}</div>
                    {product.salePrice && (
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textDecoration: 'line-through' }}>
                        {formatPrice(product.price)}
                      </div>
                    )}
                  </td>

                  <td style={{ padding: '1rem 1.25rem' }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '0.2rem 0.6rem',
                        borderRadius: '999px',
                        background:
                          product.stock > 5
                            ? 'rgba(45,122,79,0.1)'
                            : product.stock > 0
                            ? 'rgba(217,119,6,0.1)'
                            : 'rgba(192,57,43,0.1)',
                        color:
                          product.stock > 5
                            ? 'var(--color-success)'
                            : product.stock > 0
                            ? '#D97706'
                            : 'var(--color-error)',
                      }}
                    >
                      {product.stock > 0 ? `${product.stock} In Stock` : 'Out of Stock'}
                    </span>
                  </td>

                  <td style={{ padding: '1rem 1.25rem' }}>
                    {product.prescriptionAvailable ? (
                      <span style={{ fontSize: '0.78rem', color: 'var(--color-accent-dark)', fontWeight: 600 }}>
                        Yes (Power Compatible)
                      </span>
                    ) : (
                      <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                        Sunglasses Only
                      </span>
                    )}
                  </td>

                  <td style={{ padding: '1rem 1.25rem' }}>
                    <button
                      type="button"
                      onClick={() => toggleStock(product.id)}
                      style={{
                        padding: '0.35rem 0.75rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-border)',
                        background: product.stock > 0 ? 'var(--color-surface-2)' : 'rgba(45,122,79,0.1)',
                        color: product.stock > 0 ? 'var(--color-text-muted)' : 'var(--color-success)',
                        fontWeight: 600,
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                      }}
                    >
                      {product.stock > 0 ? 'Mark Out of Stock' : 'Restock (+15)'}
                    </button>
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
