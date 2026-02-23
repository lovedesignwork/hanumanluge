'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

const heroSlides = [
  {
    image: '/images/Slider/HL (35)_resize.jpg',
    title: 'FEEL THE',
    highlight: 'RUSH',
    subtitle: 'Race down thrilling tracks with breathtaking jungle views',
  },
  {
    image: '/images/Slider/HL (5)_resize.jpg',
    title: 'PURE',
    highlight: 'ADVENTURE',
    subtitle: 'An unforgettable experience for the whole family',
  },
  {
    image: '/images/Slider/HL (61)_resize.jpg',
    title: 'ESCAPE',
    highlight: 'REALITY',
    subtitle: 'Discover the ultimate adrenaline experience in Phuket',
  },
  {
    image: '/images/Slider/IMG_4410-Enhanced-NR_resize (1).jpg',
    title: 'EMBRACE',
    highlight: 'THRILLS',
    subtitle: 'Speed through nature on our world-class luge tracks',
  },
  {
    image: '/images/Slider/IMG_4416-Enhanced-NR_resize.jpg',
    title: 'CREATE',
    highlight: 'MEMORIES',
    subtitle: 'Fun for everyone from 3 to 99 years old',
  },
];

const stats = [
  { number: '500', suffix: '+', label: 'Happy Guests' },
  { number: '4', suffix: '', label: 'Tracks' },
  { number: '4.9', suffix: '★', label: 'Rating' },
];

const marqueeItems = [
  'LUGE RACING',
  '★',
  'FAMILY FUN',
  '★',
  'SCENIC VIEWS',
  '★',
  'ADVENTURE',
  '★',
  'PHUKET #1',
  '★',
  'THRILLING',
  '★',
];

export function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const scrollToActivities = () => {
    document.getElementById('activities')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-[calc(100vh-122px)] min-h-[600px] overflow-hidden bg-navy">
      {/* Full Screen Image Slides */}
      <AnimatePresence mode="wait">
        {heroSlides.map((slide, index) => (
          index === currentSlide && (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
                quality={90}
              />
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
            </motion.div>
          )
        ))}
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-[1600px] mx-auto w-full">
          <div className="max-w-2xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <span className="badge">
                <span className="w-2 h-2 bg-lime rounded-full animate-pulse" />
                Phuket&apos;s Premier Luge Experience
              </span>
            </motion.div>

            {/* Main Headline - Animated per slide */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="font-display font-black tracking-tight mb-6">
                  <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white leading-[0.9]">
                    {heroSlides[currentSlide].title}
                  </span>
                  <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-lime leading-[0.9]">
                    {heroSlides[currentSlide].highlight}
                  </span>
                </h1>
                
                <p className="text-lg lg:text-xl text-white/80 max-w-lg mb-8 leading-relaxed">
                  {heroSlides[currentSlide].subtitle}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center gap-4 mb-12"
            >
              <Link href="/booking">
                <button className="btn-lime group text-lg py-4 px-8">
                  Book Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <button className="btn-outline-lime group text-lg py-4 px-8">
                <Play className="w-5 h-5" fill="currentColor" />
                Watch Video
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex gap-6 lg:gap-10"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="text-left">
                  <div className="flex items-baseline">
                    <span className="text-3xl lg:text-4xl font-black font-display text-lime">{stat.number}</span>
                    <span className="text-lime text-lg font-bold">{stat.suffix}</span>
                  </div>
                  <div className="text-xs uppercase tracking-wider text-white/60">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Slide Navigation Arrows */}
      <div className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20">
        <button
          onClick={() => {
            prevSlide();
            setIsAutoPlaying(false);
          }}
          className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-lime hover:text-navy hover:border-lime transition-all group"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>
      </div>
      
      <div className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20">
        <button
          onClick={() => {
            nextSlide();
            setIsAutoPlaying(false);
          }}
          className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-lime hover:text-navy hover:border-lime transition-all group"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentSlide(index);
              setIsAutoPlaying(false);
            }}
            className={`relative h-2 rounded-full overflow-hidden transition-all duration-500 ${
              currentSlide === index ? 'w-10 bg-lime' : 'w-4 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          >
            {currentSlide === index && (
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 5, ease: 'linear' }}
                className="absolute inset-0 bg-lime"
              />
            )}
          </button>
        ))}
      </div>

      {/* Marquee Banner */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#fe6004] py-3 overflow-hidden z-10">
        <div className="marquee-content whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <span 
              key={index} 
              className="inline-block mx-6 text-navy font-black text-lg uppercase tracking-wider"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
