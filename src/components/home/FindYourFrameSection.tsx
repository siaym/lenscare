'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function FindYourFrameSection() {
  return (
    <section className="bg-white py-20 lg:py-28 border-b border-[#EBE8E0]">
      <div className="container mx-auto px-5 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column — Large Fashion Model Editorial Photo */}
          <div className="lg:col-span-6 relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] w-full max-w-[500px] mx-auto overflow-hidden bg-[#ECE8E1]">
              <Image
                src="/images/editorial/fit_guide_model.jpg"
                alt="LensCare Optical Fit Guide - Facial symmetry and optical frame proportions"
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover object-center filter grayscale-[10%] hover:scale-[1.02] transition-transform duration-700"
              />
              <div className="absolute bottom-4 left-4 z-10">
                <span className="text-[10px] uppercase tracking-[0.2em] text-white bg-black/50 backdrop-blur-xs px-3 py-1.5 font-light">
                  Fit Guide · Millimeter Precision
                </span>
              </div>
            </div>
          </div>

          {/* Right Column — Editorial Guide Narrative */}
          <div className="lg:col-span-6 max-w-xl order-1 lg:order-2">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-5 h-[1px] bg-[#C5A880]" />
              <span className="text-[11px] uppercase tracking-[0.22em] font-medium text-[#7C8797]">
                Optical Fit Advisory
              </span>
            </div>

            <h2 className="font-serif text-3xl md:text-5xl font-light text-[#0A192F] tracking-tight mb-3">
              Find Your <span className="italic font-normal">Frame.</span>
            </h2>

            <p className="font-serif italic text-xl text-[#7C8797] mb-6 font-normal">
              The geometry of personal proportion.
            </p>

            <p className="text-base text-[#4A5568] leading-relaxed mb-8 font-normal">
              Finding the right eyewear is an architectural decision. Our optical fit methodology analyzes facial bone structure, bridge prominence, and temple length to guarantee seamless wear.
            </p>

            {/* 3 Step Breakdown */}
            <div className="space-y-6 mb-10 border-t border-b border-[#EBE8E0] py-6">
              <div className="flex items-baseline gap-4">
                <span className="font-serif text-lg text-[#C5A880] font-light">01</span>
                <div>
                  <h3 className="text-xs uppercase tracking-[0.16em] font-semibold text-[#0A192F] mb-1">
                    Silhouette & Facial Contour
                  </h3>
                  <p className="text-xs text-[#667085] leading-relaxed">
                    Balance angular jawlines with soft curves, or add definition to round silhouettes with sharp geometric rims.
                  </p>
                </div>
              </div>

              <div className="flex items-baseline gap-4">
                <span className="font-serif text-lg text-[#C5A880] font-light">02</span>
                <div>
                  <h3 className="text-xs uppercase tracking-[0.16em] font-semibold text-[#0A192F] mb-1">
                    Bridge & Temple Calibration
                  </h3>
                  <p className="text-xs text-[#667085] leading-relaxed">
                    Prevent frame slippage with tailored 16mm–21mm nasal bridges and ergonomic silicone or acetate pads.
                  </p>
                </div>
              </div>

              <div className="flex items-baseline gap-4">
                <span className="font-serif text-lg text-[#C5A880] font-light">03</span>
                <div>
                  <h3 className="text-xs uppercase tracking-[0.16em] font-semibold text-[#0A192F] mb-1">
                    Lens Width to Eye Centering
                  </h3>
                  <p className="text-xs text-[#667085] leading-relaxed">
                    Ensure your pupils sit precisely in the center third of each lens for zero optical aberration.
                  </p>
                </div>
              </div>
            </div>

            {/* Link CTA */}
            <Link
              href="/shop"
              className="group inline-flex items-center gap-3 px-8 py-3.5 bg-[#0A192F] text-white text-xs uppercase tracking-[0.18em] font-medium hover:bg-[#162E52] transition-colors"
            >
              <span>Take the Fit Guide</span>
              <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
