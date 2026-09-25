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
    <footer className="bg-[#07172B] text-white pt-20 pb-10 border-t border-white/10 font-normal">
      <div className="container mx-auto px-5 lg:px-12">
        {/* Main Grid: Brand Column + 3 Link Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16">
          {/* Brand Intro Column (2 cols on lg) */}
          <div className="lg:col-span-2 max-w-sm">
            <Link href="/" className="inline-block mb-5 no-underline">
              <span className="font-serif text-2xl tracking-[0.14em] font-light text-white uppercase">
                Lens<span className="font-normal text-[#C5A880]">Care</span>
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-white/65 leading-relaxed mb-6 font-normal">
              Architectural eyewear tailored for modern Bangladesh. Authentic frames, optical lab precision, and verified nationwide delivery.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2.5">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://wa.me/8801700000000"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all"
              >
                <WhatsAppIcon />
              </a>
            </div>
          </div>

          {/* Column 1: SHOP */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#C5A880] mb-5">
              Shop
            </p>
            <ul className="space-y-3 text-xs">
              <li>
                <Link href="/eyeglasses" className="text-white/70 hover:text-white transition-colors">
                  Eyeglasses
                </Link>
              </li>
              <li>
                <Link href="/sunglasses" className="text-white/70 hover:text-white transition-colors">
                  Sunglasses
                </Link>
              </li>
              <li>
                <Link href="/brands" className="text-white/70 hover:text-white transition-colors">
                  Brands
                </Link>
              </li>
              <li>
                <Link href="/pre-order" className="text-white/70 hover:text-white transition-colors">
                  Pre-Order
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-white/70 hover:text-white transition-colors">
                  Complete Catalog
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: HELP & SUPPORT */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#C5A880] mb-5">
              Support
            </p>
            <ul className="space-y-3 text-xs">
              <li>
                <Link href="/track-order" className="text-white/70 hover:text-white transition-colors">
                  Track Optical Order
                </Link>
              </li>
              <li>
                <Link href="/account/prescriptions" className="text-white/70 hover:text-white transition-colors">
                  Upload Prescription
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-white/70 hover:text-white transition-colors">
                  Shipping & Courier
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-white/70 hover:text-white transition-colors">
                  7-Day Fit Guarantee
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-white/70 hover:text-white transition-colors">
                  Optical Lens FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: COMPANY */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#C5A880] mb-5">
              Company
            </p>
            <ul className="space-y-3 text-xs">
              <li>
                <Link href="/about" className="text-white/70 hover:text-white transition-colors">
                  About LensCare
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-white/70 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-white/70 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund" className="text-white/70 hover:text-white transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-white/40 hover:text-white/70 transition-colors">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal / Payment Strip */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} LensCare Optical Systems. All rights reserved.</p>

          <div className="flex items-center gap-3 text-[11px] text-white/60">
            <span>SSLCommerz Verified</span>
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
