'use client';

import { useState, useMemo, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
import { MOCK_PRODUCTS, BRANDS, SHAPES } from '@/lib/data/mockData';
import type { ProductFilters, SortOption, ProductCategory, Gender } from '@/types';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'best-selling', label: 'Best Selling' },
  { value: 'rating', label: 'Top Rated' },
];

export interface ShopPageClientProps {
  initialCategory?: ProductCategory;
  isPreorder?: boolean;
  fixedShapeSlug?: string;
  fixedBrandSlug?: string;
  pageTitle?: string;
  pageSubtitle?: string;
  breadcrumbLabel?: string;
}

export function ShopPageClient({
  initialCategory,
  isPreorder,
  fixedShapeSlug,
  fixedBrandSlug,
  pageTitle,
  pageSubtitle,
  breadcrumbLabel,
}: ShopPageClientProps = {}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  // Parse filters from URL
  const filters: ProductFilters = useMemo(
    () => ({
      category: (searchParams.get('category') as ProductCategory) || initialCategory || undefined,
      search: searchParams.get('q') || undefined,
      minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
      maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
      gender: searchParams.getAll('gender') as Gender[],
      brandId: searchParams.getAll('brand'),
      shapeId: searchParams.getAll('shape'),
      prescriptionAvailable: searchParams.get('rx') === 'true' ? true : undefined,
      preorder: searchParams.get('preorder') === 'true' ? true : (isPreorder ? true : undefined),
      inStock: searchParams.get('inStock') === 'true' ? true : undefined,
    }),
    [searchParams, initialCategory, isPreorder]
  );

  const sort = (searchParams.get('sort') as SortOption) || 'featured';

  const updateFilter = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === null) params.delete(key);
      else params.set(key, value);
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, pathname, router]
  );

  const toggleArrayFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      const current = params.getAll(key);
      if (current.includes(value)) {
        params.delete(key);
        current.filter((v) => v !== value).forEach((v) => params.append(key, v));
      } else {
        params.append(key, value);
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, pathname, router]
  );

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let products = [...MOCK_PRODUCTS];

    if (filters.category) products = products.filter((p) => p.category === filters.category);
    if (filters.search) {
      const q = filters.search.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.brand?.name.toLowerCase().includes(q) ||
          p.shape?.name.toLowerCase().includes(q)
      );
    }
    if (filters.gender?.length) {
      products = products.filter((p) => p.gender && filters.gender!.includes(p.gender));
    }
    if (fixedBrandSlug) {
      products = products.filter((p) => p.brand?.slug === fixedBrandSlug);
    }
    if (fixedShapeSlug) {
      products = products.filter((p) => p.shape?.slug === fixedShapeSlug);
    }
    if (filters.brandId?.length) {
      products = products.filter((p) => p.brand && filters.brandId!.includes(p.brand.id));
    }
    if (filters.shapeId?.length) {
      products = products.filter((p) => p.shape && filters.shapeId!.includes(p.shape.id));
    }
    if (filters.minPrice !== undefined) {
      products = products.filter((p) => (p.salePrice || p.price) >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      products = products.filter((p) => (p.salePrice || p.price) <= filters.maxPrice!);
    }
    if (filters.prescriptionAvailable) {
      products = products.filter((p) => p.prescriptionAvailable);
    }
    if (filters.preorder !== undefined) {
      products = products.filter((p) => p.preorder === filters.preorder);
    }
    if (filters.inStock) {
      products = products.filter((p) => p.stock > 0);
    }

    // Sort
    switch (sort) {
      case 'newest':
        products.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
      case 'price-asc':
        products.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        break;
      case 'price-desc':
        products.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        break;
      case 'best-selling':
        products.sort((a, b) => (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0));
        break;
      case 'rating':
        products.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default: // featured
        products.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return products;
  }, [filters, sort, fixedBrandSlug, fixedShapeSlug]);

  const resolvedTitle = pageTitle || (
    filters.category === 'EYEGLASSES' ? 'Eyeglasses' :
    filters.category === 'SUNGLASSES' ? 'Sunglasses' :
    isPreorder ? 'Pre-Order Collection' :
    'Shop All Eyewear'
  );
  const resolvedBreadcrumb = breadcrumbLabel || resolvedTitle;

  const hasActiveFilters =
    !!(filters.category ||
      filters.search ||
      filters.gender?.length ||
      filters.brandId?.length ||
      filters.shapeId?.length ||
      filters.minPrice ||
      filters.maxPrice ||
      filters.prescriptionAvailable ||
      filters.inStock);

  return (
    <>
      {/* Page Header */}
      <div
        style={{
          background: 'var(--color-primary)',
          color: 'white',
          padding: '3rem 0 2.5rem',
        }}
      >
        <div className="container">
          <nav className="breadcrumb" style={{ marginBottom: '1rem' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.6)' }}>Home</Link>
            <span className="breadcrumb__separator" style={{ color: 'rgba(255,255,255,0.3)' }}>/</span>
            <span style={{ color: 'white' }}>{resolvedBreadcrumb}</span>
          </nav>
          <h1 className="text-heading-1" style={{ color: 'white' }}>
            {resolvedTitle}
          </h1>
          {pageSubtitle && (
            <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: '0.375rem', fontSize: '1.05rem' }}>
              {pageSubtitle}
            </p>
          )}
          <p style={{ color: 'rgba(255,255,255,0.65)', marginTop: '0.625rem' }}>
            {filteredProducts.length} products found
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '2rem 1.25rem' }}>
        {/* Toolbar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            marginBottom: '1.5rem',
            flexWrap: 'wrap',
          }}
        >
          {/* Mobile filter button */}
          <button
            onClick={() => setFilterDrawerOpen(true)}
            className="btn btn-outline btn-sm show-mobile"
            style={{ display: 'none', alignItems: 'center', gap: '0.375rem' }}
          >
            <SlidersHorizontal size={15} />
            Filters
            {hasActiveFilters && (
              <span style={{
                background: 'var(--color-accent)',
                color: 'var(--color-primary)',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                fontSize: '11px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>!</span>
            )}
          </button>

          {/* Active filters */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', flex: 1 }}>
            {filters.category && (
              <span
                style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.25rem 0.625rem', background: 'var(--color-primary)', color: 'white', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 600 }}
              >
                {filters.category}
                <button onClick={() => updateFilter('category', null)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'inherit', padding: 0, display: 'flex' }}>
                  <X size={11} />
                </button>
              </span>
            )}
          </div>

          {/* Sort */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flexShrink: 0 }}>
            <label style={{ fontSize: '0.875rem', color: 'var(--color-muted)', fontWeight: 500 }}>Sort:</label>
            <select
              value={sort}
              onChange={(e) => updateFilter('sort', e.target.value)}
              className="input"
              style={{ width: 'auto', padding: '0.5rem 2rem 0.5rem 0.875rem', fontSize: '0.875rem', cursor: 'pointer' }}
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }} className="shop-layout">
          {/* Filter Sidebar - desktop */}
          <div className="filter-sidebar hidden-mobile" style={{ display: 'none' }}>
            <FilterPanel filters={filters} updateFilter={updateFilter} toggleArrayFilter={toggleArrayFilter} />
          </div>

          {/* Products */}
          <div>
            {filteredProducts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--color-muted)' }}>
                <p style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-text)' }}>
                  No products found
                </p>
                <p>Try adjusting your filters or search terms.</p>
              </div>
            ) : (
              <div className="product-grid stagger">
                {filteredProducts.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: Math.min(i * 0.05, 0.4) }}
                  >
                    <ProductCard product={product} priority={i < 4} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {filterDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFilterDrawerOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 1000,
                backdropFilter: 'blur(2px)',
              }}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                bottom: 0,
                width: '85vw',
                maxWidth: '340px',
                backgroundColor: 'var(--color-surface)',
                zIndex: 1001,
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 'var(--shadow-xl)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1.25rem',
                  borderBottom: '1px solid var(--color-border)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <SlidersHorizontal size={18} style={{ color: 'var(--color-primary)' }} />
                  <span style={{ fontWeight: 700, fontSize: '1.125rem' }}>Filters</span>
                </div>
                <button
                  onClick={() => setFilterDrawerOpen(false)}
                  style={{
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    padding: '0.25rem',
                    color: 'var(--color-muted)',
                  }}
                  aria-label="Close filters"
                >
                  <X size={20} />
                </button>
              </div>

              <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem' }}>
                <FilterPanel
                  filters={filters}
                  updateFilter={updateFilter}
                  toggleArrayFilter={toggleArrayFilter}
                />
              </div>

              <div
                style={{
                  padding: '1rem 1.25rem',
                  borderTop: '1px solid var(--color-border)',
                  display: 'flex',
                  gap: '0.75rem',
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    router.push(pathname, { scroll: false });
                  }}
                  className="btn btn-outline btn-sm"
                  style={{ flex: 1 }}
                >
                  Clear All
                </button>
                <button
                  type="button"
                  onClick={() => setFilterDrawerOpen(false)}
                  className="btn btn-primary btn-sm"
                  style={{ flex: 1 }}
                >
                  Show Results ({filteredProducts.length})
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx>{`
        @media (min-width: 1024px) {
          .shop-layout {
            grid-template-columns: 260px 1fr !important;
          }
          .filter-sidebar {
            display: block !important;
          }
          .show-mobile {
            display: none !important;
          }
        }
        @media (max-width: 1023px) {
          .show-mobile {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}

// ============================================================
// Filter Panel
// ============================================================

function FilterPanel({
  filters,
  updateFilter,
  toggleArrayFilter,
}: {
  filters: ProductFilters;
  updateFilter: (key: string, value: string | null) => void;
  toggleArrayFilter: (key: string, value: string) => void;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Category */}
      <FilterGroup title="Category">
        {['EYEGLASSES', 'SUNGLASSES', 'ACCESSORIES'].map((cat) => (
          <label key={cat} className="filter-checkbox-item">
            <input
              type="radio"
              name="category"
              checked={filters.category === cat}
              onChange={() => updateFilter('category', filters.category === cat ? null : cat)}
              style={{ accentColor: 'var(--color-primary)' }}
            />
            <span style={{ textTransform: 'capitalize' }}>
              {cat === 'EYEGLASSES' ? 'Eyeglasses' : cat === 'SUNGLASSES' ? 'Sunglasses' : 'Accessories'}
            </span>
          </label>
        ))}
      </FilterGroup>

      {/* Gender */}
      <FilterGroup title="Gender">
        {['MEN', 'WOMEN', 'UNISEX', 'KIDS'].map((g) => (
          <label key={g} className="filter-checkbox-item">
            <input
              type="checkbox"
              checked={filters.gender?.includes(g as Gender)}
              onChange={() => toggleArrayFilter('gender', g)}
              style={{ accentColor: 'var(--color-primary)' }}
            />
            <span style={{ textTransform: 'capitalize' }}>
              {g.charAt(0) + g.slice(1).toLowerCase()}
            </span>
          </label>
        ))}
      </FilterGroup>

      {/* Shape */}
      <FilterGroup title="Frame Shape">
        {SHAPES.map((shape) => (
          <label key={shape.id} className="filter-checkbox-item">
            <input
              type="checkbox"
              checked={filters.shapeId?.includes(shape.id)}
              onChange={() => toggleArrayFilter('shape', shape.id)}
              style={{ accentColor: 'var(--color-primary)' }}
            />
            {shape.name}
          </label>
        ))}
      </FilterGroup>

      {/* Brands */}
      <FilterGroup title="Brand">
        {BRANDS.map((brand) => (
          <label key={brand.id} className="filter-checkbox-item">
            <input
              type="checkbox"
              checked={filters.brandId?.includes(brand.id)}
              onChange={() => toggleArrayFilter('brand', brand.id)}
              style={{ accentColor: 'var(--color-primary)' }}
            />
            {brand.name}
          </label>
        ))}
      </FilterGroup>

      {/* Price Range */}
      <FilterGroup title="Price Range">
        <div style={{ display: 'flex', gap: '0.625rem', alignItems: 'center' }}>
          <input
            type="number"
            placeholder="Min ৳"
            value={filters.minPrice || ''}
            onChange={(e) => updateFilter('minPrice', e.target.value || null)}
            className="input"
            style={{ fontSize: '0.8125rem', padding: '0.5rem 0.75rem' }}
          />
          <span style={{ color: 'var(--color-muted)', flexShrink: 0 }}>–</span>
          <input
            type="number"
            placeholder="Max ৳"
            value={filters.maxPrice || ''}
            onChange={(e) => updateFilter('maxPrice', e.target.value || null)}
            className="input"
            style={{ fontSize: '0.8125rem', padding: '0.5rem 0.75rem' }}
          />
        </div>
        {/* Quick price presets */}
        <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
          {[
            { label: 'Under ৳1,500', min: 0, max: 1500 },
            { label: '৳1,500–৳3,000', min: 1500, max: 3000 },
            { label: '৳3,000+', min: 3000, max: 99999 },
          ].map((range) => (
            <button
              key={range.label}
              onClick={() => {
                updateFilter('minPrice', String(range.min));
                updateFilter('maxPrice', String(range.max));
              }}
              style={{
                padding: '0.25rem 0.5rem',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-full)',
                background: 'transparent',
                fontSize: '0.7rem',
                cursor: 'pointer',
                color: 'var(--color-text)',
                fontFamily: 'var(--font-sans)',
              }}
            >
              {range.label}
            </button>
          ))}
        </div>
      </FilterGroup>

      {/* Availability */}
      <FilterGroup title="Availability">
        <label className="filter-checkbox-item">
          <input
            type="checkbox"
            checked={filters.inStock === true}
            onChange={() => updateFilter('inStock', filters.inStock ? null : 'true')}
            style={{ accentColor: 'var(--color-primary)' }}
          />
          In Stock Only
        </label>
        <label className="filter-checkbox-item">
          <input
            type="checkbox"
            checked={filters.prescriptionAvailable === true}
            onChange={() => updateFilter('rx', filters.prescriptionAvailable ? null : 'true')}
            style={{ accentColor: 'var(--color-primary)' }}
          />
          Prescription Available
        </label>
      </FilterGroup>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="filter-group__title"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'var(--font-sans)',
          padding: 0,
          paddingBottom: '0.75rem',
          borderBottom: '1px solid var(--color-border)',
          marginBottom: '0.75rem',
        }}
      >
        {title}
        <ChevronDown
          size={15}
          style={{
            color: 'var(--color-muted)',
            transform: open ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.2s ease',
          }}
        />
      </button>
      {open && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
          {children}
        </div>
      )}
    </div>
  );
}
