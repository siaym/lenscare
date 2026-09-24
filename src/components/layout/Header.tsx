'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  ShoppingBag,
  User,
  Menu,
  X,
  Phone,
  Truck,
  ChevronDown,
  Heart,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { useCart } from '@/components/cart/CartProvider';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { SearchModal } from '@/components/search/SearchModal';
import { BRANDS } from '@/lib/data/mockData';

export function Header() {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 15);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setMobileMenuOpen(false), 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  const handleDropdownEnter = (label: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setActiveDropdown(label);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      {/* Top Utility Announcement Bar */}
      <div
        style={{
          backgroundColor: '#07172B',
          color: '#FFFFFF',
          fontSize: '0.75rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '34px',
            padding: '0 1.25rem',
          }}
        >
          {/* Left: Free delivery proposition */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#E5E7EB' }}>
            <Truck size={13} style={{ color: '#CFA85B' }} />
            <span>Free delivery on orders over ৳5,000 across Bangladesh</span>
          </div>

          {/* Right: Service Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <Link
              href="/track-order"
              style={{
                color: '#E5E7EB',
                textDecoration: 'none',
                transition: 'color 0.15s ease',
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#CFA85B')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#E5E7EB')}
            >
              Track Order
            </Link>

            <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>|</span>

            <a
              href="tel:+8801700000000"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.375rem',
                color: '#E5E7EB',
                textDecoration: 'none',
                transition: 'color 0.15s ease',
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#CFA85B')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#E5E7EB')}
            >
              <Phone size={11} style={{ color: '#CFA85B' }} />
              <span>Help: +880 1700-000000</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E8E5DF',
          boxShadow: isScrolled ? '0 4px 20px rgba(11, 31, 58, 0.08)' : 'none',
          transition: 'box-shadow 0.2s ease',
        }}
      >
        <div className="container" style={{ padding: '0 1.25rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '66px',
            }}
          >
            {/* Logo */}
            <Link
              href="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.625rem',
                textDecoration: 'none',
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: '#0B1F3A',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="20" height="10" viewBox="0 0 22 12" fill="none">
                  <circle cx="5.5" cy="6" r="4.5" stroke="#FFFFFF" strokeWidth="1.5" />
                  <circle cx="16.5" cy="6" r="4.5" stroke="#FFFFFF" strokeWidth="1.5" />
                  <line x1="10" y1="6" x2="12" y2="6" stroke="#FFFFFF" strokeWidth="1.5" />
                  <line x1="1" y1="6" x2="1" y2="4" stroke="#FFFFFF" strokeWidth="1.5" />
                  <line x1="21" y1="6" x2="21" y2="4" stroke="#FFFFFF" strokeWidth="1.5" />
                </svg>
              </div>
              <span
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#0B1F3A',
                  letterSpacing: '-0.02em',
                }}
              >
                Lens<span style={{ color: '#CFA85B' }}>Care</span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav
              className="hidden-mobile"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                height: '100%',
              }}
            >
              {/* Eyeglasses with Visual Mega Menu */}
              <div
                style={{ height: '100%', display: 'flex', alignItems: 'center', position: 'relative' }}
                onMouseEnter={() => handleDropdownEnter('eyeglasses')}
                onMouseLeave={handleDropdownLeave}
              >
                <Link
                  href="/eyeglasses"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    padding: '0 0.875rem',
                    height: '100%',
                    fontSize: '0.875rem',
                    fontWeight: isActive('/eyeglasses') ? 600 : 500,
                    color: isActive('/eyeglasses') ? '#0B1F3A' : '#374151',
                    textDecoration: 'none',
                    borderBottom: isActive('/eyeglasses') ? '2px solid #CFA85B' : '2px solid transparent',
                  }}
                >
                  Eyeglasses
                  <ChevronDown size={13} style={{ opacity: 0.6 }} />
                </Link>

                {activeDropdown === 'eyeglasses' && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: '-2rem',
                      width: '620px',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E8E5DF',
                      borderRadius: '0 0 8px 8px',
                      boxShadow: '0 20px 40px -10px rgba(11, 31, 58, 0.15)',
                      padding: '1.75rem',
                      display: 'grid',
                      gridTemplateColumns: '1.3fr 1.3fr 1.4fr',
                      gap: '1.5rem',
                      zIndex: 200,
                    }}
                  >
                    {/* Col 1: Shop by Shape */}
                    <div>
                      <p style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#CFA85B', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.875rem' }}>
                        Shop by Shape
                      </p>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {['Rectangle', 'Round', 'Cat Eye', 'Aviator', 'Geometric', 'Square', 'Clubmaster'].map((shape) => (
                          <li key={shape}>
                            <Link
                              href={`/eyeglasses?shape=${shape.toLowerCase().replace(' ', '-')}`}
                              style={{ fontSize: '0.8125rem', color: '#374151', textDecoration: 'none', display: 'block', transition: 'color 0.15s ease' }}
                              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#0B1F3A')}
                              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#374151')}
                            >
                              {shape}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Col 2: Shop by Type */}
                    <div>
                      <p style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#CFA85B', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.875rem' }}>
                        Shop by Type
                      </p>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                        <li>
                          <Link href="/eyeglasses?rx=true" style={{ fontSize: '0.8125rem', color: '#374151', textDecoration: 'none', fontWeight: 600 }}>
                            Prescription Ready
                          </Link>
                        </li>
                        <li>
                          <Link href="/eyeglasses?q=blue" style={{ fontSize: '0.8125rem', color: '#374151', textDecoration: 'none' }}>
                            Blue Light / Computer
                          </Link>
                        </li>
                        <li>
                          <Link href="/eyeglasses?material=TITANIUM" style={{ fontSize: '0.8125rem', color: '#374151', textDecoration: 'none' }}>
                            Japanese Titanium
                          </Link>
                        </li>
                        <li>
                          <Link href="/eyeglasses?material=ACETATE" style={{ fontSize: '0.8125rem', color: '#374151', textDecoration: 'none' }}>
                            Italian Acetate
                          </Link>
                        </li>
                        <li>
                          <Link href="/eyeglasses?material=TR90" style={{ fontSize: '0.8125rem', color: '#374151', textDecoration: 'none' }}>
                            Ultra-light TR90
                          </Link>
                        </li>
                      </ul>
                    </div>

                    {/* Col 3: Editorial Feature */}
                    <div style={{ backgroundColor: '#F7F5F0', padding: '1rem', borderRadius: '4px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginBottom: '0.5rem' }}>
                          <ShieldCheck size={14} color="#CFA85B" />
                          <span style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.05em', color: '#0B1F3A', textTransform: 'uppercase' }}>Optical Lab Guarantee</span>
                        </div>
                        <p style={{ fontSize: '0.75rem', color: '#667085', lineHeight: 1.4, margin: 0 }}>
                          Custom precision lens cutting & power fitting by certified optical specialists.
                        </p>
                      </div>

                      <Link
                        href="/eyeglasses"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.375rem',
                          fontSize: '0.8125rem',
                          fontWeight: 700,
                          color: '#0B1F3A',
                          textDecoration: 'none',
                          marginTop: '1rem',
                        }}
                      >
                        Shop All Eyeglasses <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Sunglasses with Visual Mega Menu */}
              <div
                style={{ height: '100%', display: 'flex', alignItems: 'center', position: 'relative' }}
                onMouseEnter={() => handleDropdownEnter('sunglasses')}
                onMouseLeave={handleDropdownLeave}
              >
                <Link
                  href="/sunglasses"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    padding: '0 0.875rem',
                    height: '100%',
                    fontSize: '0.875rem',
                    fontWeight: isActive('/sunglasses') ? 600 : 500,
                    color: isActive('/sunglasses') ? '#0B1F3A' : '#374151',
                    textDecoration: 'none',
                    borderBottom: isActive('/sunglasses') ? '2px solid #CFA85B' : '2px solid transparent',
                  }}
                >
                  Sunglasses
                  <ChevronDown size={13} style={{ opacity: 0.6 }} />
                </Link>

                {activeDropdown === 'sunglasses' && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: '-2rem',
                      width: '560px',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E8E5DF',
                      borderRadius: '0 0 8px 8px',
                      boxShadow: '0 20px 40px -10px rgba(11, 31, 58, 0.15)',
                      padding: '1.75rem',
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '1.5rem',
                      zIndex: 200,
                    }}
                  >
                    <div>
                      <p style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#CFA85B', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.875rem' }}>
                        Curated Silhouettes
                      </p>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {['Aviator Polarized', 'Classic Wayfarer', 'Retro Round', 'Cat Eye Glam', 'Square Polarized'].map((s) => (
                          <li key={s}>
                            <Link
                              href="/sunglasses"
                              style={{ fontSize: '0.8125rem', color: '#374151', textDecoration: 'none', display: 'block' }}
                            >
                              {s}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div style={{ backgroundColor: '#0B1F3A', color: '#FFFFFF', padding: '1.25rem', borderRadius: '4px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <span style={{ fontSize: '0.6875rem', color: '#CFA85B', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                          UV400 & Polarized
                        </span>
                        <h4 style={{ fontSize: '1rem', fontWeight: 600, margin: '0.375rem 0 0.5rem 0' }}>
                          100% Sun Glare Protection
                        </h4>
                        <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                          High-clarity optical lenses engineered for Bangladesh’s tropical sunlight.
                        </p>
                      </div>

                      <Link
                        href="/sunglasses"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.375rem',
                          fontSize: '0.8125rem',
                          fontWeight: 700,
                          color: '#CFA85B',
                          textDecoration: 'none',
                          marginTop: '1rem',
                        }}
                      >
                        Explore Sunglasses <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Brands Dropdown */}
              <div
                style={{ height: '100%', display: 'flex', alignItems: 'center', position: 'relative' }}
                onMouseEnter={() => handleDropdownEnter('brands')}
                onMouseLeave={handleDropdownLeave}
              >
                <Link
                  href="/brands"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    padding: '0 0.875rem',
                    height: '100%',
                    fontSize: '0.875rem',
                    fontWeight: isActive('/brands') ? 600 : 500,
                    color: isActive('/brands') ? '#0B1F3A' : '#374151',
                    textDecoration: 'none',
                    borderBottom: isActive('/brands') ? '2px solid #CFA85B' : '2px solid transparent',
                  }}
                >
                  Brands
                  <ChevronDown size={13} style={{ opacity: 0.6 }} />
                </Link>

                {activeDropdown === 'brands' && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: '0',
                      width: '240px',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E8E5DF',
                      borderRadius: '0 0 8px 8px',
                      boxShadow: '0 20px 40px -10px rgba(11, 31, 58, 0.15)',
                      padding: '0.75rem',
                      zIndex: 200,
                    }}
                  >
                    {BRANDS.slice(0, 6).map((b) => (
                      <Link
                        key={b.id}
                        href={`/brands/${b.slug}`}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '0.5rem 0.75rem',
                          fontSize: '0.8125rem',
                          color: '#374151',
                          textDecoration: 'none',
                          borderRadius: '4px',
                        }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = '#F7F5F0')}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = 'transparent')}
                      >
                        <span style={{ fontWeight: 600 }}>{b.name}</span>
                        <span style={{ fontSize: '0.6875rem', color: '#9CA3AF' }}>{b.country}</span>
                      </Link>
                    ))}
                    <div style={{ borderTop: '1px solid #F2EFEA', marginTop: '0.5rem', paddingTop: '0.5rem' }}>
                      <Link
                        href="/brands"
                        style={{
                          display: 'block',
                          textAlign: 'center',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          color: '#0B1F3A',
                          textDecoration: 'none',
                          padding: '0.375rem',
                        }}
                      >
                        View All Brands →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Pre-Order */}
              <Link
                href="/pre-order"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 0.875rem',
                  height: '100%',
                  fontSize: '0.875rem',
                  fontWeight: isActive('/pre-order') ? 600 : 500,
                  color: isActive('/pre-order') ? '#0B1F3A' : '#374151',
                  textDecoration: 'none',
                  borderBottom: isActive('/pre-order') ? '2px solid #CFA85B' : '2px solid transparent',
                }}
              >
                Pre-Order
              </Link>

              {/* Shop All */}
              <Link
                href="/shop"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 0.875rem',
                  height: '100%',
                  fontSize: '0.875rem',
                  fontWeight: isActive('/shop') ? 600 : 500,
                  color: isActive('/shop') ? '#0B1F3A' : '#374151',
                  textDecoration: 'none',
                  borderBottom: isActive('/shop') ? '2px solid #CFA85B' : '2px solid transparent',
                }}
              >
                Shop All
              </Link>
            </nav>

            {/* Right Action Icons: Search, Wishlist, Account, Cart */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {/* Search Trigger */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Search catalog"
                style={{
                  width: '38px',
                  height: '38px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  color: '#111827',
                  borderRadius: '50%',
                  transition: 'background 0.15s ease',
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = '#F7F5F0')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = 'transparent')}
              >
                <Search size={18} />
              </button>

              {/* Wishlist Link */}
              <Link
                href="/account/wishlist"
                className="hidden-mobile"
                aria-label="Wishlist"
                style={{
                  width: '38px',
                  height: '38px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#111827',
                  textDecoration: 'none',
                  borderRadius: '50%',
                  transition: 'background 0.15s ease',
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = '#F7F5F0')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = 'transparent')}
              >
                <Heart size={18} />
              </Link>

              {/* Customer Account */}
              <Link
                href="/account"
                className="hidden-mobile"
                aria-label="Customer Account"
                style={{
                  width: '38px',
                  height: '38px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#111827',
                  textDecoration: 'none',
                  borderRadius: '50%',
                  transition: 'background 0.15s ease',
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = '#F7F5F0')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = 'transparent')}
              >
                <User size={18} />
              </Link>

              {/* Shopping Bag Button with Live Counter Badge */}
              <button
                type="button"
                onClick={() => setCartOpen(true)}
                aria-label={`Shopping Bag (${itemCount} items)`}
                style={{
                  position: 'relative',
                  width: '38px',
                  height: '38px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  color: '#111827',
                  borderRadius: '50%',
                  transition: 'background 0.15s ease',
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = '#F7F5F0')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = 'transparent')}
              >
                <ShoppingBag size={18} />
                {itemCount > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '4px',
                      right: '4px',
                      minWidth: '16px',
                      height: '16px',
                      padding: '0 3px',
                      backgroundColor: '#CFA85B',
                      color: '#07172B',
                      borderRadius: '8px',
                      fontSize: '10px',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      lineHeight: 1,
                    }}
                  >
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </button>

              {/* Mobile Hamburger Toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="show-mobile"
                aria-label="Toggle navigation menu"
                style={{
                  width: '38px',
                  height: '38px',
                  display: 'none',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  color: '#111827',
                }}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            style={{
              position: 'fixed',
              top: '100px',
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: '#FFFFFF',
              zIndex: 150,
              overflowY: 'auto',
              padding: '1.5rem',
              borderTop: '1px solid #E8E5DF',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Link href="/eyeglasses" style={{ fontSize: '1rem', fontWeight: 600, color: '#111827', textDecoration: 'none', padding: '0.5rem 0' }}>
                Eyeglasses
              </Link>
              <Link href="/sunglasses" style={{ fontSize: '1rem', fontWeight: 600, color: '#111827', textDecoration: 'none', padding: '0.5rem 0' }}>
                Sunglasses
              </Link>
              <Link href="/brands" style={{ fontSize: '1rem', fontWeight: 600, color: '#111827', textDecoration: 'none', padding: '0.5rem 0' }}>
                Brands
              </Link>
              <Link href="/pre-order" style={{ fontSize: '1rem', fontWeight: 600, color: '#111827', textDecoration: 'none', padding: '0.5rem 0' }}>
                Pre-Order
              </Link>
              <Link href="/shop" style={{ fontSize: '1rem', fontWeight: 600, color: '#111827', textDecoration: 'none', padding: '0.5rem 0' }}>
                Shop All
              </Link>

              <div style={{ borderTop: '1px solid #E8E5DF', paddingTop: '1rem', marginTop: '0.5rem' }}>
                <Link href="/account" style={{ display: 'block', fontSize: '0.9375rem', color: '#374151', textDecoration: 'none', padding: '0.5rem 0' }}>
                  My Account
                </Link>
                <Link href="/account/wishlist" style={{ display: 'block', fontSize: '0.9375rem', color: '#374151', textDecoration: 'none', padding: '0.5rem 0' }}>
                  Wishlist
                </Link>
                <Link href="/track-order" style={{ display: 'block', fontSize: '0.9375rem', color: '#374151', textDecoration: 'none', padding: '0.5rem 0' }}>
                  Track Order
                </Link>
                <Link href="/admin" style={{ display: 'block', fontSize: '0.875rem', color: '#667085', textDecoration: 'none', padding: '0.5rem 0' }}>
                  Admin Portal
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Cart Drawer */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Search Modal */}
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
