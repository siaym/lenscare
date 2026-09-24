import type { Metadata } from 'next';
import { HeroSection } from '@/components/home/HeroSection';
import { ProductCarouselSection } from '@/components/home/ProductCarouselSection';
import { ShopByShapeSection } from '@/components/home/ShopByShapeSection';
import { FindYourFrameSection } from '@/components/home/FindYourFrameSection';
import { TrustSection } from '@/components/home/TrustSection';
import { BrandsSection } from '@/components/home/BrandsSection';
import { NewsletterSection } from '@/components/home/NewsletterSection';
import {
  BEST_SELLERS,
  EYEGLASSES,
  SUNGLASSES,
  NEW_ARRIVALS,
  SHAPES,
  BRANDS,
} from '@/lib/data/mockData';

export const metadata: Metadata = {
  title: 'LensCare — See Better. Look Better. | Premium Eyewear Bangladesh',
  description:
    "Bangladesh's premium eyewear brand. Authentic prescription eyeglasses, polarized sunglasses, and optical lab precision lenses delivered nationwide.",
};

export default function HomePage() {
  return (
    <>
      {/* 1. Hero: See Better. Look Better. */}
      <HeroSection />

      {/* 2. Best Sellers: Immediate shopping priority (White) */}
      <ProductCarouselSection
        id="best-sellers"
        title="Best Sellers"
        subtitle="Our most-loved silhouettes, chosen by everyday professionals."
        products={BEST_SELLERS}
        viewAllHref="/shop?sort=best-selling"
        viewAllLabel="View Best Sellers"
        bg="#FFFFFF"
      />

      {/* 3. Shop by Shape: Visual Discovery (Warm Ivory #F7F5F0) */}
      <ShopByShapeSection
        title="BROWSE BY FRAME SHAPE"
        subtitle="Find the silhouette that fits you."
        shapes={SHAPES}
        basePath="/shop"
        bg="#F7F5F0"
      />

      {/* 4. Prescription Eyeglasses: Core Optical Category (White) */}
      <ProductCarouselSection
        id="eyeglasses"
        title="Prescription Eyeglasses"
        subtitle="Precision frames ready for single vision, bifocal, and progressive lenses."
        products={EYEGLASSES}
        viewAllHref="/eyeglasses"
        viewAllLabel="Shop All Eyeglasses"
        bg="#FFFFFF"
      />

      {/* 5. Editorial Feature: Find Your Frame Guided Fit */}
      <FindYourFrameSection />

      {/* 6. Sunglasses: Lifestyle & Sun Protection (Subtle Warm #FAFAF8) */}
      <ProductCarouselSection
        id="sunglasses"
        title="Sunglasses"
        subtitle="Polarized optics, UV400 filtering, and refined summer silhouettes."
        products={SUNGLASSES}
        viewAllHref="/sunglasses"
        viewAllLabel="Explore Sunglasses"
        bg="#FAFAF8"
      />

      {/* 7. New Arrivals: Fresh Inventory (White) */}
      <ProductCarouselSection
        id="new-arrivals"
        title="New Arrivals"
        subtitle="Freshly crafted styles just landed in our catalog."
        products={NEW_ARRIVALS}
        viewAllHref="/shop?sort=newest"
        viewAllLabel="See New Arrivals"
        bg="#FFFFFF"
      />

      {/* 8. Brands: Editorial Directory (Warm Ivory #F7F5F0) */}
      <BrandsSection brands={BRANDS.filter((b) => b.featured)} />

      {/* 9. Why LensCare: Optical Craftsmanship & Delivery Trust (White) */}
      <TrustSection />

      {/* 10. Newsletter: Retention (Deep Navy #07172B) */}
      <NewsletterSection />
    </>
  );
}
