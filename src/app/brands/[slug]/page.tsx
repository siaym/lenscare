import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { BRANDS } from '@/lib/data/mockData';
import { ShopPageClient } from '@/app/shop/ShopPageClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BRANDS.map((brand) => ({
    slug: brand.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const brand = BRANDS.find((b) => b.slug === slug);
  if (!brand) return { title: 'Brand Not Found' };

  return {
    title: `${brand.name} Eyewear`,
    description: `Shop authentic ${brand.name} eyeglasses and sunglasses at LensCare Bangladesh. Premium quality, best prices, guaranteed authenticity.`,
  };
}

export default async function BrandDetailPage({ params }: Props) {
  const { slug } = await params;
  const brand = BRANDS.find((b) => b.slug === slug);

  if (!brand) {
    notFound();
  }

  return (
    <Suspense
      fallback={
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="skeleton" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
        </div>
      }
    >
      <ShopPageClient
        fixedBrandSlug={brand.slug}
        pageTitle={`${brand.name} Eyewear Collection`}
        pageSubtitle={`Original ${brand.country ? `${brand.country}-engineered` : 'designer'} frames with full manufacturer warranty.`}
        breadcrumbLabel={brand.name}
      />
    </Suspense>
  );
}
