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
} from 'lucide-react';
import { useCart } from '@/components/cart/CartProvider';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { SearchModal } from '@/components/search/SearchModal';

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
      <div className="bg-[#07172B] text-white text-[11px] border-b border-white/10 font-normal">
        <div className="container mx-auto px-5 lg:px-12 flex items-center justify-between h-[34px]">
          {/* Left: Free delivery proposition */}
          <div className="flex items-center gap-2 text-[#E2E8F0]">
            <Truck size={12} className="text-[#C5A880]" />
            <span>Complimentary nationwide delivery on orders over ৳5,000</span>
          </div>

          {/* Right: Service Links */}
          <div className="hidden sm:flex items-center gap-5 text-[#CBD5E1]">
            <Link
              href="/track-order"
              className="hover:text-[#C5A880] transition-colors"
            >
              Track Order
            </Link>

            <span className="text-white/20">|</span>

            <a
              href="tel:+8801700000000"
              className="flex items-center gap-1.5 hover:text-[#C5A880] transition-colors"
            >
              <Phone size={11} className="text-[#C5A880]" />
              <span>Lab Support: +880 1700-000000</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header
        className={`sticky top-0 z-50 bg-white border-b border-[#EBE8E0] transition-shadow duration-300 ${
          isScrolled ? 'shadow-sm' : ''
        }`}
      >
        <div className="container mx-auto px-5 lg:px-12">
          <div className="flex items-center justify-between h-[64px]">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 text-inherit no-underline shrink-0"
            >
              <div className="w-7 h-7 bg-[#0A192F] flex items-center justify-center">
                <svg width="18" height="9" viewBox="0 0 22 12" fill="none">
                  <circle cx="5.5" cy="6" r="4.5" stroke="#FFFFFF" strokeWidth="1.5" />
                  <circle cx="16.5" cy="6" r="4.5" stroke="#FFFFFF" strokeWidth="1.5" />
                  <line x1="10" y1="6" x2="12" y2="6" stroke="#FFFFFF" strokeWidth="1.5" />
                  <line x1="1" y1="6" x2="1" y2="4" stroke="#FFFFFF" strokeWidth="1.5" />
                  <line x1="21" y1="6" x2="21" y2="4" stroke="#FFFFFF" strokeWidth="1.5" />
                </svg>
              </div>
              <span className="font-serif text-2xl tracking-[0.12em] font-light text-[#0A192F] uppercase">
                Lens<span className="font-normal text-[#C5A880]">Care</span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 h-full">
              {/* Eyeglasses with Visual Mega Menu */}
              <div
                className="h-full flex items-center relative"
                onMouseEnter={() => handleDropdownEnter('eyeglasses')}
                onMouseLeave={handleDropdownLeave}
              >
                <Link
                  href="/eyeglasses"
                  className={`flex items-center gap-1 px-4 h-full text-xs uppercase tracking-[0.16em] font-medium transition-colors ${
                    isActive('/eyeglasses')
                      ? 'text-[#0A192F] border-b-2 border-[#C5A880]'
                      : 'text-[#4A5568] hover:text-[#0A192F]'
                  }`}
                >
                  <span>Eyeglasses</span>
                  <ChevronDown size={12} className="opacity-50" />
                </Link>

                {activeDropdown === 'eyeglasses' && (
                  <div className="absolute top-full left-0 w-[640px] bg-white border border-[#EBE8E0] shadow-xl p-7 grid grid-cols-12 gap-6 z-50">
                    {/* Col 1: Shop by Shape */}
                    <div className="col-span-5">
                      <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#C5A880] mb-3">
                        Shop by Silhouette
                      </p>
                      <ul className="space-y-2 text-xs">
                        {[
                          { name: 'Classic Rectangle', slug: 'rectangle' },
                          { name: 'Minimal Round', slug: 'round' },
                          { name: 'Feminine Cat Eye', slug: 'cat-eye' },
                          { name: 'Modern Aviator', slug: 'aviator' },
                          { name: 'Geometric Rims', slug: 'geometric' },
                          { name: 'Architectural Square', slug: 'square' },
                          { name: 'Vintage Clubmaster', slug: 'clubmaster' },
                        ].map((item) => (
                          <li key={item.slug}>
                            <Link
                              href={`/eyeglasses?shape=${item.slug}`}
                              className="text-[#4A5568] hover:text-[#0A192F] hover:translate-x-0.5 transition-all block"
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Col 2: Shop by Lens Need */}
                    <div className="col-span-4">
                      <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#C5A880] mb-3">
                        Optical Solutions
                      </p>
                      <ul className="space-y-2 text-xs">
                        <li>
                          <Link href="/eyeglasses" className="text-[#4A5568] hover:text-[#0A192F] block">
                            Single Vision Optics
                          </Link>
                        </li>
                        <li>
                          <Link href="/eyeglasses" className="text-[#4A5568] hover:text-[#0A192F] block">
                            Blue Light Defense
                          </Link>
                        </li>
                        <li>
                          <Link href="/eyeglasses" className="text-[#4A5568] hover:text-[#0A192F] block">
                            Progressive Corridors
                          </Link>
                        </li>
                        <li>
                          <Link href="/eyeglasses" className="text-[#4A5568] hover:text-[#0A192F] block">
                            High-Index (1.67 / 1.74)
                          </Link>
                        </li>
                      </ul>
                    </div>

                    {/* Col 3: Visual Editorial Card */}
                    <div className="col-span-3 bg-[#F8F7F4] p-4 flex flex-col justify-between border border-[#EFECE6]">
                      <div>
                        <span className="text-[9px] uppercase tracking-[0.2em] font-semibold text-[#C5A880] block mb-1">
                          Dhaka Lab
                        </span>
                        <h4 className="font-serif text-sm font-light text-[#0A192F] leading-snug mb-2">
                          Precision Edged to Your PD.
                        </h4>
                      </div>
                      <Link
                        href="/eyeglasses"
                        className="text-[11px] font-medium text-[#0A192F] hover:text-[#C5A880] transition-colors underline underline-offset-4"
                      >
                        Explore Eyeglasses →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Sunglasses */}
              <div
                className="h-full flex items-center relative"
                onMouseEnter={() => handleDropdownEnter('sunglasses')}
                onMouseLeave={handleDropdownLeave}
              >
                <Link
                  href="/sunglasses"
                  className={`flex items-center gap-1 px-4 h-full text-xs uppercase tracking-[0.16em] font-medium transition-colors ${
                    isActive('/sunglasses')
                      ? 'text-[#0A192F] border-b-2 border-[#C5A880]'
                      : 'text-[#4A5568] hover:text-[#0A192F]'
                  }`}
                >
                  <span>Sunglasses</span>
                  <ChevronDown size={12} className="opacity-50" />
                </Link>

                {activeDropdown === 'sunglasses' && (
                  <div className="absolute top-full left-0 w-[500px] bg-white border border-[#EBE8E0] shadow-xl p-7 grid grid-cols-2 gap-6 z-50">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#C5A880] mb-3">
                        Curated Categories
                      </p>
                      <ul className="space-y-2 text-xs">
                        <li>
                          <Link href="/sunglasses?shape=aviator" className="text-[#4A5568] hover:text-[#0A192F] block">
                            Aviator Classics
                          </Link>
                        </li>
                        <li>
                          <Link href="/sunglasses?shape=round" className="text-[#4A5568] hover:text-[#0A192F] block">
                            Retro Round Sun
                          </Link>
                        </li>
                        <li>
                          <Link href="/sunglasses?shape=cat-eye" className="text-[#4A5568] hover:text-[#0A192F] block">
                            Statement Cat Eye
                          </Link>
                        </li>
                        <li>
                          <Link href="/sunglasses?shape=geometric" className="text-[#4A5568] hover:text-[#0A192F] block">
                            Geometric Wireframes
                          </Link>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-[#F8F7F4] p-4 flex flex-col justify-between border border-[#EFECE6]">
                      <div>
                        <span className="text-[9px] uppercase tracking-[0.2em] font-semibold text-[#C5A880] block mb-1">
                          Summer 2026
                        </span>
                        <h4 className="font-serif text-sm font-light text-[#0A192F] leading-snug mb-2">
                          Japanese Polarized Filters.
                        </h4>
                      </div>
                      <Link
                        href="/sunglasses"
                        className="text-[11px] font-medium text-[#0A192F] hover:text-[#C5A880] transition-colors underline underline-offset-4"
                      >
                        Shop All Sunglasses →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Brands */}
              <Link
                href="/brands"
                className={`px-4 h-full flex items-center text-xs uppercase tracking-[0.16em] font-medium transition-colors ${
                  isActive('/brands')
                    ? 'text-[#0A192F] border-b-2 border-[#C5A880]'
                    : 'text-[#4A5568] hover:text-[#0A192F]'
                }`}
              >
                Brands
              </Link>

              {/* Pre-Order */}
              <Link
                href="/pre-order"
                className={`px-4 h-full flex items-center text-xs uppercase tracking-[0.16em] font-medium transition-colors ${
                  isActive('/pre-order')
                    ? 'text-[#0A192F] border-b-2 border-[#C5A880]'
                    : 'text-[#4A5568] hover:text-[#0A192F]'
                }`}
              >
                Pre-Order
              </Link>

              {/* Shop All */}
              <Link
                href="/shop"
                className={`px-4 h-full flex items-center text-xs uppercase tracking-[0.16em] font-medium transition-colors ${
                  isActive('/shop') && !isActive('/eyeglasses') && !isActive('/sunglasses')
                    ? 'text-[#0A192F] border-b-2 border-[#C5A880]'
                    : 'text-[#4A5568] hover:text-[#0A192F]'
                }`}
              >
                Catalog
              </Link>
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center gap-3">
              {/* Search Modal Trigger */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Search Catalog"
                className="w-9 h-9 flex items-center justify-center text-[#0A192F] hover:text-[#C5A880] transition-colors"
              >
                <Search size={18} />
              </button>

              {/* Account Link */}
              <Link
                href="/account"
                aria-label="Account Portal"
                className="w-9 h-9 flex items-center justify-center text-[#0A192F] hover:text-[#C5A880] transition-colors"
              >
                <User size={18} />
              </Link>

              {/* Wishlist Link */}
              <Link
                href="/account/wishlist"
                aria-label="Saved Wishlist"
                className="w-9 h-9 flex items-center justify-center text-[#0A192F] hover:text-[#C5A880] transition-colors"
              >
                <Heart size={18} />
              </Link>

              {/* Bag Trigger */}
              <button
                type="button"
                onClick={() => setCartOpen(true)}
                aria-label={`Shopping Bag, ${itemCount} items`}
                className="relative h-9 px-3 flex items-center gap-2 bg-[#0A192F] text-white hover:bg-[#162E52] transition-colors text-xs uppercase tracking-[0.14em] font-medium"
              >
                <ShoppingBag size={14} />
                <span className="hidden sm:inline">Bag</span>
                <span className="w-5 h-5 rounded-full bg-[#C5A880] text-[#0A192F] text-[10px] font-bold flex items-center justify-center">
                  {itemCount}
                </span>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Navigation Menu"
                className="lg:hidden w-9 h-9 flex items-center justify-center text-[#0A192F]"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Slide-Down Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-[#EBE8E0] px-5 py-6 space-y-4">
            <Link
              href="/eyeglasses"
              className="block text-xs uppercase tracking-[0.18em] font-medium text-[#0A192F] py-2 border-b border-[#F2EFEA]"
            >
              Eyeglasses
            </Link>
            <Link
              href="/sunglasses"
              className="block text-xs uppercase tracking-[0.18em] font-medium text-[#0A192F] py-2 border-b border-[#F2EFEA]"
            >
              Sunglasses
            </Link>
            <Link
              href="/brands"
              className="block text-xs uppercase tracking-[0.18em] font-medium text-[#0A192F] py-2 border-b border-[#F2EFEA]"
            >
              Brands
            </Link>
            <Link
              href="/pre-order"
              className="block text-xs uppercase tracking-[0.18em] font-medium text-[#0A192F] py-2 border-b border-[#F2EFEA]"
            >
              Pre-Order
            </Link>
            <Link
              href="/shop"
              className="block text-xs uppercase tracking-[0.18em] font-medium text-[#0A192F] py-2"
            >
              Full Catalog
            </Link>
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
