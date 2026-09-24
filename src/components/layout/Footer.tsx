'use client';

import Link from 'next/link';

// Inline SVG social icons
const FacebookIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const InstagramIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const WhatsAppIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

export function Footer() {
  return (
    <footer style={{ backgroundColor: '#07172B', color: '#FFFFFF', padding: '4.5rem 0 2rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
      <div className="container" style={{ padding: '0 1.25rem' }}>
        {/* Main Grid: Brand Column + 3 Link Columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '3rem 2rem',
            paddingBottom: '3.5rem',
          }}
        >
          {/* Brand Intro Column */}
          <div style={{ maxWidth: '320px' }}>
            <Link href="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: '1.25rem' }}>
              <span className="font-serif text-2xl tracking-[0.14em] font-light text-white uppercase">
                Lens<span className="font-normal text-[#C5A880]">Care</span>
              </span>
            </Link>

            <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Premium eyewear for modern Bangladesh. Authentic frames, optical lab precision, and verified nationwide delivery.
            </p>

            {/* Social Links */}
            <div style={{ display: 'flex', gap: '0.625rem' }}>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255, 255, 255, 0.8)',
                  textDecoration: 'none',
                }}
              >
                <FacebookIcon />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255, 255, 255, 0.8)',
                  textDecoration: 'none',
                }}
              >
                <InstagramIcon />
              </a>
              <a
                href="https://wa.me/8801700000000"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255, 255, 255, 0.8)',
                  textDecoration: 'none',
                }}
              >
                <WhatsAppIcon />
              </a>
            </div>
          </div>

          {/* Column 1: SHOP */}
          <div>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#CFA85B', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
              SHOP
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li>
                <Link href="/eyeglasses" style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none' }}>
                  Eyeglasses
                </Link>
              </li>
              <li>
                <Link href="/sunglasses" style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none' }}>
                  Sunglasses
                </Link>
              </li>
              <li>
                <Link href="/brands" style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none' }}>
                  Brands
                </Link>
              </li>
              <li>
                <Link href="/pre-order" style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none' }}>
                  Pre-Order
                </Link>
              </li>
              <li>
                <Link href="/shop" style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none' }}>
                  All Eyewear
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: HELP */}
          <div>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#CFA85B', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
              HELP
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li>
                <Link href="/contact" style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none' }}>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/track-order" style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none' }}>
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/shipping" style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none' }}>
                  Shipping & Courier
                </Link>
              </li>
              <li>
                <Link href="/returns" style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none' }}>
                  7-Day Returns
                </Link>
              </li>
              <li>
                <Link href="/faq" style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none' }}>
                  Prescription FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: COMPANY */}
          <div>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#CFA85B', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
              COMPANY
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li>
                <Link href="/about" style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none' }}>
                  About LensCare
                </Link>
              </li>
              <li>
                <Link href="/privacy" style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none' }}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none' }}>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund" style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none' }}>
                  Refund Guarantee
                </Link>
              </li>
              <li>
                <Link href="/admin" style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.5)', textDecoration: 'none' }}>
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal / Payment Strip */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <p style={{ fontSize: '0.8125rem', color: 'rgba(255, 255, 255, 0.5)', margin: 0 }}>
            © {new Date().getFullYear()} LensCare Optical Systems. All rights reserved.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)' }}>
            <span>SSLCommerz Secured</span>
            <span>•</span>
            <span>bKash</span>
            <span>•</span>
            <span>Cash on Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
