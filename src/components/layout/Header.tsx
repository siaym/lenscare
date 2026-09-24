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
  MapPin,
  ChevronDown,
  Heart,
} from 'lucide-react';
import { useCart } from '@/components/cart/CartProvider';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { SearchModal } from '@/components/search/SearchModal';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  {
    href: '/eyeglasses',
    label: 'Eyeglasses',
    children: [
      { href: '/eyeglasses', label: 'All Eyeglasses' },
      { href: '/eyeglasses?gender=MEN', label: "Men's" },
      { href: '/eyeglasses?gender=WOMEN', label: "Women's" },
      { href: '/eyeglasses?gender=KIDS', label: "Kids'" },
    ],
  },
  {
    href: '/sunglasses',
    label: 'Sunglasses',
    children: [
      { href: '/sunglasses', label: 'All Sunglasses' },
      { href: '/sunglasses?gender=MEN', label: "Men's" },
      { href: '/sunglasses?gender=WOMEN', label: "Women's" },
    ],
  },
  { href: '/brands', label: 'Brands' },
  { href: '/pre-order', label: 'Pre-Order' },
  { href: '/shop', label: 'Shop All' },
];

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
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
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
      {/* Announcement Bar */}
      <div className="announcement-bar">
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <a
              href="tel:+8801XXXXXXXXX"
              style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: 'rgba(255,255,255,0.85)', fontSize: '0.75rem', textDecoration: 'none' }}
            >
              <Phone size={11} />
              +880 1XXX-XXXXXX
            </a>
          </div>
          <p style={{ fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.02em' }}>
            🚚 Free delivery on orders over ৳5,000
          </p>
          <Link
            href="/track-order"
            style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: 'rgba(255,255,255,0.85)', fontSize: '0.75rem', textDecoration: 'none' }}
          >
            <MapPin size={11} />
            Track Order
          </Link>
        </div>
      </div>

      {/* Main Header */}
      <header
        className="header"
        style={{
          boxShadow: isScrolled ? 'var(--shadow-md)' : 'none',
          transition: 'box-shadow 0.3s ease',
        }}
      >
        <div className="container">
          <div className="header-inner">
            {/* Logo */}
            <Link href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    background: 'var(--color-primary)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="22" height="12" viewBox="0 0 22 12" fill="none">
                    <circle cx="5.5" cy="6" r="4.5" stroke="white" strokeWidth="1.5" fill="none" />
                    <circle cx="16.5" cy="6" r="4.5" stroke="white" strokeWidth="1.5" fill="none" />
                    <line x1="10" y1="6" x2="12" y2="6" stroke="white" strokeWidth="1.5" />
                    <line x1="1" y1="6" x2="1" y2="4" stroke="white" strokeWidth="1.5" />
                    <line x1="21" y1="6" x2="21" y2="4" stroke="white" strokeWidth="1.5" />
                  </svg>
                </div>
                <span
                  style={{
                    fontWeight: 800,
                    fontSize: '1.25rem',
                    color: 'var(--color-primary)',
                    letterSpacing: '-0.03em',
                  }}
                >
                  Lens<span style={{ color: 'var(--color-accent)' }}>Care</span>
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.125rem',
              }}
              className="hidden-mobile"
            >
              {NAV_LINKS.map((link) => (
                <div
                  key={link.href}
                  style={{ position: 'relative' }}
                  onMouseEnter={() => link.children && handleDropdownEnter(link.label)}
                  onMouseLeave={() => link.children && handleDropdownLeave()}
                >
                  <Link
                    href={link.href}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      padding: '0.5rem 0.75rem',
                      fontSize: '0.875rem',
                      fontWeight: isActive(link.href) ? 600 : 500,
                      color: isActive(link.href) ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                      textDecoration: 'none',
                      borderRadius: 'var(--radius-md)',
                      transition: 'color 0.15s ease, background 0.15s ease',
                      position: 'relative',
                    }}
                    className="nav-link"
                  >
                    {link.label}
                    {link.children && <ChevronDown size={13} style={{ opacity: 0.6 }} />}
                    {isActive(link.href) && (
                      <span
                        style={{
                          position: 'absolute',
                          bottom: '0',
                          left: '0.75rem',
                          right: '0.75rem',
                          height: '2px',
                          background: 'var(--color-accent)',
                          borderRadius: '2px 2px 0 0',
                        }}
                      />
                    )}
                  </Link>

                  {/* Dropdown */}
                  {link.children && activeDropdown === link.label && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 'calc(100% + 8px)',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'white',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-lg)',
                        boxShadow: 'var(--shadow-xl)',
                        padding: '0.5rem',
                        minWidth: '180px',
                        zIndex: 'var(--z-dropdown)',
                        animation: 'scaleIn 0.15s ease',
                      }}
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          style={{
                            display: 'block',
                            padding: '0.625rem 0.875rem',
                            fontSize: '0.875rem',
                            color: 'var(--color-text)',
                            textDecoration: 'none',
                            borderRadius: 'var(--radius-md)',
                            transition: 'background 0.1s ease, color 0.1s ease',
                          }}
                          onMouseEnter={(e) => {
                            (e.target as HTMLElement).style.background = 'var(--color-surface-2)';
                            (e.target as HTMLElement).style.color = 'var(--color-primary)';
                          }}
                          onMouseLeave={(e) => {
                            (e.target as HTMLElement).style.background = '';
                            (e.target as HTMLElement).style.color = '';
                          }}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className="btn btn-ghost btn-icon"
                aria-label="Search"
                style={{ color: 'var(--color-text)', display: 'flex' }}
              >
                <Search size={20} />
              </button>

              {/* Account — desktop only */}
              <Link
                href="/account"
                className="btn btn-ghost btn-icon hidden-mobile"
                aria-label="Account"
                style={{ color: 'var(--color-text)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <User size={20} />
              </Link>

              {/* Wishlist — desktop only */}
              <Link
                href="/account/wishlist"
                className="btn btn-ghost btn-icon hidden-mobile"
                aria-label="Wishlist"
                style={{ color: 'var(--color-text)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Heart size={20} />
              </Link>

              {/* Cart */}
              <button
                onClick={() => setCartOpen(true)}
                className="btn btn-ghost btn-icon"
                aria-label={`Cart (${itemCount} items)`}
                style={{ color: 'var(--color-text)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <ShoppingBag size={20} />
                {itemCount > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '2px',
                      right: '2px',
                      width: '16px',
                      height: '16px',
                      background: 'var(--color-accent)',
                      color: 'var(--color-primary)',
                      borderRadius: '50%',
                      fontSize: '10px',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="btn btn-ghost btn-icon show-mobile"
                aria-label="Menu"
                style={{ color: 'var(--color-text)', display: 'none' }}
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            style={{
              position: 'fixed',
              top: '96px', // announcement bar + header
              left: 0,
              right: 0,
              bottom: 0,
              background: 'white',
              zIndex: 'var(--z-drawer)',
              overflowY: 'auto',
              padding: '1.5rem',
              animation: 'slideInLeft 0.25s ease',
              borderTop: '1px solid var(--color-border)',
            }}
          >
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {NAV_LINKS.map((link) => (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      display: 'block',
                      padding: '0.875rem 1rem',
                      fontSize: '1rem',
                      fontWeight: isActive(link.href) ? 600 : 500,
                      color: isActive(link.href) ? 'var(--color-primary)' : 'var(--color-text)',
                      textDecoration: 'none',
                      borderRadius: 'var(--radius-lg)',
                      background: isActive(link.href) ? 'var(--color-surface-2)' : 'transparent',
                    }}
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <div style={{ paddingLeft: '1.5rem' }}>
                      {link.children.slice(1).map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          style={{
                            display: 'block',
                            padding: '0.625rem 1rem',
                            fontSize: '0.875rem',
                            color: 'var(--color-muted)',
                            textDecoration: 'none',
                          }}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <hr style={{ margin: '1rem 0', borderColor: 'var(--color-border)' }} />

              <Link
                href="/account"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.875rem 1rem',
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: 'var(--color-text)',
                  textDecoration: 'none',
                  borderRadius: 'var(--radius-lg)',
                }}
              >
                <User size={20} />
                My Account
              </Link>

              <Link
                href="/account/wishlist"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.875rem 1rem',
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: 'var(--color-text)',
                  textDecoration: 'none',
                  borderRadius: 'var(--radius-lg)',
                }}
              >
                <Heart size={20} />
                Wishlist
              </Link>

              <Link
                href="/track-order"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.875rem 1rem',
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: 'var(--color-text)',
                  textDecoration: 'none',
                  borderRadius: 'var(--radius-lg)',
                }}
              >
                <MapPin size={20} />
                Track Order
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Cart Drawer */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Search Modal */}
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />

      <style jsx global>{`
        @media (max-width: 1023px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 1024px) {
          .show-mobile { display: none !important; }
        }
        .nav-link:hover {
          color: var(--color-primary) !important;
          background: var(--color-surface-2);
        }
      `}</style>
    </>
  );
}
