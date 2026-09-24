'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Eye, Sparkles } from 'lucide-react';

export function OpticalServiceSection() {
  return (
    <section className="bg-[#FAF9F5] py-20 lg:py-28 border-b border-[#EBE8E0]">
      <div className="container mx-auto px-5 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column — Optical Lab Editorial Imagery */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden bg-[#ECE8E1] border border-[#E0DCD3]">
              <Image
                src="/images/editorial/optical_lab_craft.jpg"
                alt="LensCare Dhaka Optical Lab - Precision lens edging and calibration"
                fill
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover object-center filter grayscale-[15%] hover:scale-[1.02] transition-transform duration-700"
              />
              <div className="absolute bottom-4 left-4 z-10">
                <span className="text-[10px] uppercase tracking-[0.2em] text-white bg-black/60 backdrop-blur-xs px-3 py-1.5 font-light">
                  LensCare Optical Lab · Dhaka
                </span>
              </div>
            </div>
          </div>

          {/* Right Column — Clinical Precision & Service Guarantee */}
          <div className="lg:col-span-6 max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-5 h-[1px] bg-[#C5A880]" />
              <span className="text-[11px] uppercase tracking-[0.22em] font-medium text-[#7C8797]">
                Clinical Precision
              </span>
            </div>

            <h2 className="font-serif text-3xl md:text-5xl font-light text-[#0A192F] tracking-tight mb-6">
              Custom Lenses. <br />
              <span className="italic font-normal">Fitted in Dhaka.</span>
            </h2>

            <p className="text-base text-[#4A5568] leading-relaxed mb-8 font-normal">
              Every pair of prescription glasses is surfaced and edged in our certified optical lab. We calibrate optical centers to your exact pupillary distance (PD) with zero margin for distortion.
            </p>

            {/* 3 Precision Pillars */}
            <div className="space-y-5 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-white border border-[#E5E2DB] flex items-center justify-center shrink-0 text-[#0A192F] mt-0.5">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#0A192F] mb-1">
                    Free-Form Digital Surfacing
                  </h3>
                  <p className="text-xs text-[#667085] leading-relaxed">
                    Razor-sharp edge-to-edge optical clarity tailored for Single Vision, Bifocal, and Progressive corridors.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-white border border-[#E5E2DB] flex items-center justify-center shrink-0 text-[#0A192F] mt-0.5">
                  <Eye size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#0A192F] mb-1">
                    Blue Light & Oleophobic Defense
                  </h3>
                  <p className="text-xs text-[#667085] leading-relaxed">
                    Multi-layer anti-reflective coating that blocks harmful 420nm digital screen glare and repels smudges.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-white border border-[#E5E2DB] flex items-center justify-center shrink-0 text-[#0A192F] mt-0.5">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#0A192F] mb-1">
                    High-Index Featherweight (1.61 to 1.74)
                  </h3>
                  <p className="text-xs text-[#667085] leading-relaxed">
                    Ultra-thin aesthetics for high power prescriptions, eliminating heavy edge thickness and eye magnification.
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <Link
                href="/eyeglasses"
                className="group inline-flex items-center gap-3 px-8 py-3.5 bg-[#0A192F] text-white text-xs uppercase tracking-[0.18em] font-medium hover:bg-[#162E52] transition-colors"
              >
                <span>Shop Prescription Frames</span>
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/account/prescriptions"
                className="text-xs uppercase tracking-[0.16em] font-medium text-[#0A192F] hover:text-[#C5A880] transition-colors underline underline-offset-8"
              >
                Upload Doctor&apos;s Slip →
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
