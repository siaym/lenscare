import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/components/cart/CartProvider";
import { ToastProvider } from "@/components/ui/Toaster";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://lenscare.com.bd'),
  title: {
    default: "LensCare — See Better. Look Better.",
    template: "%s | LensCare"
  },
  description: "Bangladesh's premium eyewear destination. Discover prescription eyeglasses, designer sunglasses, and progressive lenses. Fast delivery across Bangladesh.",
  keywords: ["eyeglasses", "sunglasses", "prescription glasses", "eyewear", "Bangladesh", "lenscare", "optical"],
  openGraph: {
    type: "website",
    locale: "en_BD",
    url: "/",
    siteName: "LensCare",
    title: "LensCare — See Better. Look Better.",
    description: "Bangladesh's premium eyewear destination.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "LensCare" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "LensCare — See Better. Look Better.",
    description: "Bangladesh's premium eyewear destination.",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-BD">
      <body>
        <ToastProvider>
          <CartProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
