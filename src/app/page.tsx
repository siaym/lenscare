import type { Metadata } from 'next';
import { HeroSection } from '@/components/home/HeroSection';
import { ProductCarouselSection } from '@/components/home/ProductCarouselSection';
import { ShopByShapeSection } from '@/components/home/ShopByShapeSection';
import { TrustSection } from '@/components/home/TrustSection';
import { BrandsSection } from '@/components/home/BrandsSection';
import { NewsletterSection } from '@/components/home/NewsletterSection';
import {
  BEST_SELLERS,
  EYEGLASSES,
  SUNGLASSES,
  NEW_ARRIVALS,
  PREORDERS,
  SHAPES,
  BRANDS,
} from '@/lib/data/mockData';

export const metadata: Metadata = {
  title: 'LensCare — See Better. Look Better.',
  description:
    "Bangladesh's premium eyewear destination. Shop prescription eyeglasses, designer sunglasses, progressive lenses and more. Fast delivery. Authentic brands.",
};

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Best Sellers */}
      <ProductCarouselSection
        id="best-sellers"
        title="Best Sellers"
        subtitle="Our most-loved frames, chosen by thousands of happy customers."
        products={BEST_SELLERS}
        viewAllHref="/shop?sort=best-selling"
        viewAllLabel="View All Best Sellers"
        bg="var(--color-bg)"
      />

      {/* 3. Eyeglasses by Shape */}
      <ShopByShapeSection
        title="Shop Eyeglasses by Shape"
        subtitle="Find your perfect frame silhouette."
        shapes={SHAPES.filter((s) => s.type === 'BOTH' || s.type === 'EYEGLASSES')}
        basePath="/eyeglasses"
        bg="var(--color-surface-2)"
      />

      {/* 4. Prescription Eyeglasses */}
      <ProductCarouselSection
        id="eyeglasses"
        title="Prescription Eyeglasses"
        subtitle="Premium frames ready for your prescription lenses."
        products={EYEGLASSES}
        viewAllHref="/eyeglasses"
        viewAllLabel="Browse All Eyeglasses"
        bg="var(--color-bg)"
      />

      {/* 5. Sunglasses by Shape */}
      <ShopByShapeSection
        title="Shop Sunglasses by Shape"
        subtitle="Choose your style. Protect your eyes."
        shapes={SHAPES.filter((s) => s.type === 'BOTH' || s.type === 'SUNGLASSES')}
        basePath="/sunglasses"
        bg="var(--color-surface-2)"
      />

      {/* 6. Sunglasses */}
      <ProductCarouselSection
        id="sunglasses"
        title="Sunglasses"
        subtitle="Polarized, UV400, and endlessly stylish."
        products={SUNGLASSES}
        viewAllHref="/sunglasses"
        viewAllLabel="Browse All Sunglasses"
        bg="var(--color-bg)"
      />

      {/* 7. New Arrivals */}
      <ProductCarouselSection
        id="new-arrivals"
        title="New Arrivals"
        subtitle="Fresh styles just landed."
        products={NEW_ARRIVALS}
        viewAllHref="/shop?sort=newest"
        viewAllLabel="See All New Arrivals"
        bg="var(--color-surface-2)"
      />

      {/* 8. Pre-Order */}
      {PREORDERS.length > 0 && (
        <ProductCarouselSection
          id="pre-order"
          title="Pre-Order"
          subtitle="Reserve exclusive styles before they arrive."
          products={PREORDERS}
          viewAllHref="/pre-order"
          viewAllLabel="View All Pre-Orders"
          bg="var(--color-primary)"
          dark
        />
      )}

      {/* 9. Brands */}
      <BrandsSection brands={BRANDS.filter((b) => b.featured)} />

      {/* 10. Why Choose Us */}
      <TrustSection />

      {/* 11. Newsletter */}
      <NewsletterSection />
    </>
  );
}
