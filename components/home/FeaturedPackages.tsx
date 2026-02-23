'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock, Users, Utensils } from 'lucide-react';
import { packages } from '@/lib/data/packages';
import { formatPrice } from '@/lib/utils';

const mainPackages = packages.filter(pkg => 
  ['luge-standard', 'luge-premium', 'luge-family', 'luge-skyline', 'all-day-pass'].includes(pkg.id)
);

export function FeaturedPackages() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate packages for seamless loop
  const duplicatedPackages = [...mainPackages, ...mainPackages];

  return (
    <section id="packages" className="relative py-24 bg-[#05126f]" ref={containerRef}>
      {/* CSS Animation Keyframes */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .scroll-animation {
          animation: scroll 48s linear infinite;
        }
        .scroll-animation.paused {
          animation-play-state: paused;
        }
      `}</style>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        {/* Section Header - Centered */}
        <div className="text-center">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 bg-black text-[#f3c12c] font-medium tracking-widest uppercase text-sm rounded-full"
          >
            Adventure Awaits
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-heading)] text-black mt-4"
          >
            Our Packages
          </motion.h2>
        </div>
      </div>

      {/* Full Width Auto-Scrolling Container */}
      <div 
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div 
          className={`flex gap-6 scroll-animation ${isPaused ? 'paused' : ''}`}
          style={{ width: 'fit-content' }}
        >
          {duplicatedPackages.map((pkg, index) => (
            <div
              key={`${pkg.id}-${index}`}
              className="flex-shrink-0 w-[400px]"
            >
              <div className="group h-full bg-black rounded-3xl overflow-hidden border border-white/10 hover:shadow-2xl hover:shadow-black/30 transition-all duration-500">
                {/* Image Container - 1:1 Aspect Ratio */}
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={pkg.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  
                  {/* Price Tag */}
                  <div className="absolute top-4 right-4 px-4 py-2 bg-[#05126f] rounded-full">
                    <span className="text-black font-bold text-lg">{formatPrice(pkg.price)}</span>
                  </div>
                  
                  {/* Duration Tag */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-[#05126f] rounded-full text-black text-sm font-medium">
                    <Clock className="w-4 h-4" />
                    {pkg.duration}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-[family-name:var(--font-heading)] text-[#f3c12c] mb-3">
                    {pkg.name}
                  </h3>
                  
                  <p className="text-white/60 text-sm mb-5 line-clamp-2">
                    {pkg.shortDescription}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {pkg.includesTransfer && (
                      <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f3c12c]/10 rounded-full text-[#f3c12c] text-xs">
                        <Users className="w-3.5 h-3.5" />
                        Free Transfer
                      </span>
                    )}
                    {pkg.includesMeal && (
                      <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f3c12c]/10 rounded-full text-[#f3c12c] text-xs">
                        <Utensils className="w-3.5 h-3.5" />
                        Meal Included
                      </span>
                    )}
                  </div>

                  {/* CTA */}
                  <Link href={`/booking?package=${pkg.id}`}>
                    <button
                      className="w-full flex items-center justify-between px-6 py-4 bg-[#05126f] hover:bg-[#030d52] text-black rounded-xl transition-all group/btn"
                    >
                      <span className="font-[family-name:var(--font-heading)]">Book This Package</span>
                      <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View All Link */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mt-12 px-4"
      >
        <Link href="/booking">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-black text-[#f3c12c] font-[family-name:var(--font-heading)] text-lg rounded-full hover:bg-[#1a1a1a] transition-colors shadow-lg"
          >
            View All Packages
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </Link>
      </motion.div>
    </section>
  );
}
