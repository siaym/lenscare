import type { Metadata } from 'next';
import { HeroSection } from '@/components/home/HeroSection';
import { NewCollectionSection } from '@/components/home/NewCollectionSection';
import { ShopByShapeSection } from '@/components/home/ShopByShapeSection';
import { BestSellersRail } from '@/components/home/BestSellersRail';
import { OpticalServiceSection } from '@/components/home/OpticalServiceSection';
import { FindYourFrameSection } from '@/components/home/FindYourFrameSection';
import { SunglassesCampaignSection } from '@/components/home/SunglassesCampaignSection';
import { BrandsSection } from '@/components/home/BrandsSection';
import {
  BEST_SELLERS,
  NEW_ARRIVALS,
  SUNGLASSES,
  SHAPES,
  BRANDS,
} from '@/lib/data/mockData';

export const metadata: Metadata = {
  title: 'LensCare — See the Difference. | Premium Eyewear Bangladesh',
  description:
    "Architectural optical eyeglasses, Japanese titanium frames, and polarized sunglasses custom fitted in Dhaka. Complimentary nationwide delivery across Bangladesh.",
};

export default function HomePage() {
  return (
    <>
      {/* 01. Hero: Editorial Fashion Campaign */}
      <HeroSection />

      {/* 02. New Collection: Large Visual Product Presentation */}
      <NewCollectionSection products={NEW_ARRIVALS} />

      {/* 03. Shop by Shape: Visual Frame Silhouettes (Vector Signature) */}
      <ShopByShapeSection
        shapes={SHAPES}
        basePath="/shop"
        bg="#FAF9F5"
      />

      {/* 04. Best Sellers: Compact 4-Item Product Rail */}
      <BestSellersRail products={BEST_SELLERS} />

      {/* 05. Prescription: Clinical Precision & Dhaka Optical Lab */}
      <OpticalServiceSection />

      {/* 06. Brand Story / Fit Guide: Editorial Model Split Layout */}
      <FindYourFrameSection />

      {/* 07. Sunglasses: Photography-Led Campaign Banner + Curated Rail */}
      <SunglassesCampaignSection products={SUNGLASSES} />

      {/* 08. Brands: Minimal Wordmark Wall */}
      <BrandsSection brands={BRANDS.filter((b) => b.featured)} />
    </>
  );
}
