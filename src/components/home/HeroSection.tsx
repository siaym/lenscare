'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative bg-[#FAF9F5] text-[#0A192F] overflow-hidden border-b border-[#EBE8E0]">
      <div className="container mx-auto px-5 lg:px-12 py-16 md:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column — Editorial Campaign Narrative */}
          <div className="lg:col-span-7 max-w-2xl">
            {/* Editorial Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-6 h-[1px] bg-[#C5A880]" />
              <span className="text-[11px] uppercase tracking-[0.24em] font-medium text-[#7C8797]">
                LensCare · Autumn / Winter 2026
              </span>
            </motion.div>

            {/* Display Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-5xl md:text-7xl lg:text-[5.4rem] font-light leading-[1.02] tracking-tight text-[#0A192F] mb-6"
            >
              See the <br />
              <span className="italic font-normal text-[#0A192F]">Difference.</span>
            </motion.h1>

            {/* Body Copy */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg text-[#4A5568] leading-relaxed font-normal max-w-lg mb-10"
            >
              Architectural eyewear designed around facial ergonomics. Hand-finished Japanese titanium and Italian bio-acetate frames, custom fitted with prescription optics in our Dhaka optical lab.
            </motion.p>

            {/* Editorial Actions */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8"
            >
              <Link
                href="/shop"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-[#0A192F] text-white text-xs uppercase tracking-[0.18em] font-medium hover:bg-[#162E52] transition-all"
              >
                <span>Explore Collection</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/eyeglasses"
                className="text-xs uppercase tracking-[0.18em] font-medium text-[#0A192F] hover:text-[#C5A880] transition-colors underline underline-offset-8 decoration-1 decoration-[#C5A880]/60"
              >
                Prescription Eyeglasses →
              </Link>
            </motion.div>
          </div>

          {/* Right Column — Large Editorial Fashion Photography */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] w-full max-w-[460px] mx-auto overflow-hidden bg-[#ECE8E1]">
              <Image
                src="/images/editorial/hero_editorial_model.jpg"
                alt="LensCare 2026 Collection - Model wearing handcrafted titanium optical frame"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 460px"
                className="object-cover object-center filter grayscale-[10%] hover:scale-[1.02] transition-transform duration-700 ease-out"
              />

              {/* Minimal caption in corner */}
              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/90 bg-black/40 backdrop-blur-sm px-3 py-1.5 font-light">
                  Campaign Model · FD-9036
                </span>
                <span className="text-[10px] uppercase tracking-[0.16em] text-white/80 bg-black/40 backdrop-blur-sm px-2.5 py-1.5 font-light">
                  Dhaka Lab
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
