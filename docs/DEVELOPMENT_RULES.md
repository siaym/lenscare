# LensCare Development Rules & Standards

## 1. Local Development Commands
```bash
# Start Next.js development server
npm run dev

# Run TypeScript compilation check (Strict, 0 errors allowed)
npx tsc --noEmit

# Run ESLint validation
npm run lint

# Generate Prisma Client
npx prisma generate

# Create Production Build
npm run build
```

---

## 2. Anti-Generic / Anti-AI Design Checklist (Rule 31)
Before shipping any component or page, ensure:
1. **No generic SaaS/AI aesthetics**: No glowing neon borders, no purple/blue gradients, no oversized pill badges, no giant empty whitespace.
2. **Intentional density**: Dense product presentation with realistic optical dimensions (e.g. Lens 52mm, Bridge 18mm, Temple 142mm).
3. **Commerce first**: Immediate visibility of prices, discounts, availability, color swatches, and clear purchase CTAs.
4. **Mobile deliberate**: Mobile must render 2-column product grids, compact header, and a slide-out filter drawer.
5. **No fake marketing data**: Authentic optical copy and actual product specifications.

---

## 3. Bangladesh Localization Checklist
- Currency symbol: `৳` (BDT).
- Shipping zones: Inside Dhaka ৳60, Outside Dhaka ৳120.
- All 8 divisions supported (Dhaka, Chittagong, Rajshahi, Sylhet, Khulna, Barisal, Rangpur, Mymensingh).
- Payment methods: Cash on Delivery (COD) nationwide, bKash / Nagad / Rocket, SSLCommerz.
- WhatsApp optical specialist chat support linked on all product and tracking pages.
