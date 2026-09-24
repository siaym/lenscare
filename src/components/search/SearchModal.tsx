'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Search, X, ArrowRight, TrendingUp } from 'lucide-react';

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

const POPULAR_SEARCHES = [
  'Aviator sunglasses',
  'Prescription glasses',
  'Blue light glasses',
  'Ray-Ban',
  'Progressive lenses',
  'Round frames',
];

export function SearchModal({ open, onClose }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      const timer = setTimeout(() => setQuery(''), 0);
      return () => clearTimeout(timer);
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="search-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(4px)',
            zIndex: 'var(--z-modal)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: '6rem',
            padding: '6rem 1rem 0',
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            style={{
              background: 'white',
              borderRadius: 'var(--radius-2xl)',
              width: '100%',
              maxWidth: '640px',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-xl)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input */}
            <form onSubmit={handleSubmit}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1rem 1.25rem',
                  borderBottom: query ? '1px solid var(--color-border)' : 'none',
                }}
              >
                <Search size={20} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search eyeglasses, sunglasses, brands..."
                  style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    fontSize: '1rem',
                    fontFamily: 'var(--font-sans)',
                    color: 'var(--color-text)',
                    background: 'transparent',
                  }}
                  autoComplete="off"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '1.75rem',
                      height: '1.75rem',
                      border: 'none',
                      background: 'var(--color-surface-2)',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      color: 'var(--color-muted)',
                    }}
                  >
                    <X size={14} />
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.375rem 0.625rem',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    background: 'transparent',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    color: 'var(--color-muted)',
                  }}
                >
                  ESC
                </button>
              </div>
            </form>

            {/* Content */}
            <div style={{ padding: '1.25rem' }}>
              {!query ? (
                <>
                  <p
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--color-muted)',
                      marginBottom: '0.875rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.375rem',
                    }}
                  >
                    <TrendingUp size={12} />
                    Popular Searches
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {POPULAR_SEARCHES.map((term) => (
                      <button
                        key={term}
                        onClick={() => {
                          setQuery(term);
                          router.push(`/search?q=${encodeURIComponent(term)}`);
                          onClose();
                        }}
                        style={{
                          padding: '0.4rem 0.875rem',
                          background: 'var(--color-surface-2)',
                          border: '1px solid var(--color-border)',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.8125rem',
                          cursor: 'pointer',
                          color: 'var(--color-text)',
                          transition: 'all 0.15s ease',
                          fontFamily: 'var(--font-sans)',
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.background = 'var(--color-primary)';
                          (e.currentTarget as HTMLElement).style.color = 'white';
                          (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-primary)';
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.background = 'var(--color-surface-2)';
                          (e.currentTarget as HTMLElement).style.color = 'var(--color-text)';
                          (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)';
                        }}
                      >
                        {term}
                      </button>
                    ))}
                  </div>

                  <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    {[
                      { label: 'Eyeglasses', href: '/eyeglasses' },
                      { label: 'Sunglasses', href: '/sunglasses' },
                      { label: 'Brands', href: '/brands' },
                      { label: 'Pre-Order', href: '/pre-order' },
                    ].map((cat) => (
                      <Link
                        key={cat.href}
                        href={cat.href}
                        onClick={onClose}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.75rem 1rem',
                          background: 'var(--color-surface-2)',
                          borderRadius: 'var(--radius-lg)',
                          textDecoration: 'none',
                          color: 'var(--color-text)',
                          fontSize: '0.875rem',
                          fontWeight: 500,
                          transition: 'background 0.15s ease',
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.background = 'var(--color-primary)';
                          (e.currentTarget as HTMLElement).style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.background = 'var(--color-surface-2)';
                          (e.currentTarget as HTMLElement).style.color = 'var(--color-text)';
                        }}
                      >
                        {cat.label}
                        <ArrowRight size={14} />
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <div>
                  <Link
                    href={`/search?q=${encodeURIComponent(query)}`}
                    onClick={onClose}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-lg)',
                      textDecoration: 'none',
                      color: 'var(--color-text)',
                      fontSize: '0.875rem',
                      background: 'var(--color-surface-2)',
                    }}
                  >
                    <Search size={16} style={{ color: 'var(--color-muted)', flexShrink: 0 }} />
                    Search for &quot;<strong>{query}</strong>&quot;
                    <ArrowRight size={14} style={{ marginLeft: 'auto', color: 'var(--color-muted)' }} />
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
