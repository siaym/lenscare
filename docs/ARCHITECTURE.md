# LensCare Architecture Documentation

## 1. System Overview

LensCare is a commercial-grade, multi-tier eyewear e-commerce platform built for Bangladesh, inspired by the information density, optical workflow, and commercial polish of `shop.glassesbd.com`.

### Core Technology Stack
- **Framework**: Next.js (App Router, Server Components & Client Boundaries)
- **Language**: TypeScript (Strict mode enabled, zero `@ts-ignore`)
- **Styling**: Tailored CSS Design System with custom tokens in `globals.css` and Tailwind utilities
- **Database ORM**: Prisma v7 with PostgreSQL
- **Backend / Auth**: Supabase SSR (Auth, Session Refresh via Middleware, Storage)
- **Animations**: Framer Motion (micro-animations, drawer sliding, modal reveals)
- **Icons**: Lucide React + Bespoke SVGs for localized payment & social methods

---

## 2. Route Directory Map

```
src/app/
├── layout.tsx                     # Root layout with CartProvider, ToastProvider, Header & Footer
├── page.tsx                       # Commercial homepage (11 sections matching reference UX)
├── globals.css                    # Design tokens (Colors, Typography, Spacing, Buttons, Badges)
├── shop/                          # Catalog browsing with live URL-driven filter state
├── eyeglasses/                    # Eyeglasses category showcase
├── sunglasses/                    # Designer sunglasses collection
├── pre-order/                     # Luxury pre-order showcase
├── brands/                        # World-class eyewear brands directory
│   └── [slug]/                    # Individual brand collection
├── products/
│   └── [slug]/                    # Product detail page (gallery, specs, color picker, prescription)
├── cart/                          # Dedicated shopping bag with free shipping meter & coupon codes
├── checkout/                      # 2-column checkout with BD divisions, COD, bKash & SSLCommerz
│   └── success/                   # Confirmation page with Order ID & timeline preview
├── track-order/                   # Optical lab & courier tracking interface
├── account/                       # Customer portal
│   ├── orders/                    # Past order history & re-ordering
│   ├── wishlist/                  # Saved frame favorites
│   ├── prescriptions/             # Optical power records (OD/OS matrix, PD, optician notes)
│   └── addresses/                 # Saved BD shipping destinations
├── admin/                         # Store Operations & Lab Management Console
│   ├── orders/                    # Real-time order dispatch & prescription verification
│   └── products/                  # Inventory catalog with instant stock toggling
├── auth/
│   ├── login/                     # Secure login with 1-click customer/admin demo fill
│   └── register/                  # Account registration with validation
├── api/
│   ├── orders/                    # Order placement, persistence & retrieval
│   └── coupons/validate/          # Coupon calculation engine
├── sitemap.ts                     # Search engine XML sitemap
└── robots.ts                      # Web crawler directives
```

---

## 3. Component Architecture

### Layout Components
- `Header.tsx`: Top announcement ticker, logo, primary navigation, desktop search trigger, cart counter badge, mobile drawer.
- `Footer.tsx`: Customer care, optical guides, policies, and localized payment credentials (`SSLCommerz`, `bKash`, `Cash on Delivery`).

### Catalog & Product Components
- `ProductCard.tsx`: Standardized card with aspect ratio `4:3`, frame silhouette, price hierarchy, discount badge, color count, and hover quick-view.
- `ProductCarouselSection.tsx`: Horizontal scrollable carousels with section metadata and view-all triggers.
- `ShopByShapeSection.tsx`: Visual shape discovery for both eyeglasses and sunglasses.
- `PrescriptionFlow.tsx`: 5-step modal for optical lens configuration (Lens type, Refractive index, Anti-glare/Blue-cut coating, OD/OS sphere/cyl/axis/PD entry or doctor slip upload).

### Commerce & State Management
- `CartProvider.tsx`: React Context managing `items`, `itemCount`, `subtotal`, `deliveryFee`, `discount`, `couponCode`. Automatically persists to `localStorage`.
- `Toaster.tsx`: Lightweight toast notification provider supporting success, error, warning, and info banners.

---

## 4. Localized Commerce Patterns (Bangladesh)
- **Currency**: Bangladeshi Taka (৳ / BDT) formatted with `formatPrice()` (`৳2,644`).
- **Delivery Zones**:
  - Inside Dhaka: ৳60 (1-2 business days)
  - Outside Dhaka: ৳120 (2-4 business days)
  - Free delivery threshold: Orders $\ge$ ৳5,000
- **Fulfillment Stepper**:
  Order Placed $\rightarrow$ Prescription Verified $\rightarrow$ Optical Lab Fitting $\rightarrow$ Quality Control $\rightarrow$ Dispatched $\rightarrow$ Delivered
- **Communication Channels**: Automated WhatsApp order message generator linking to customer support.
