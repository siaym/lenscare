import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MOCK_PRODUCTS } from '@/lib/data/mockData';
import { ProductDetailClient } from './ProductDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = MOCK_PRODUCTS.find((p) => p.slug === slug);
  if (!product) return { title: 'Product Not Found' };

  return {
    title: `${product.name} — ${product.brand?.name || 'LensCare'}`,
    description: product.description || `Buy ${product.name} at LensCare. Premium eyewear with fast delivery across Bangladesh.`,
    openGraph: {
      title: product.name,
      description: product.description || '',
      images: product.images[0] ? [{ url: product.images[0].url, alt: product.name }] : [],
    },
  };
}

export async function generateStaticParams() {
  return MOCK_PRODUCTS.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = MOCK_PRODUCTS.find((p) => p.slug === slug);
  if (!product) notFound();

  const relatedProducts = MOCK_PRODUCTS
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
