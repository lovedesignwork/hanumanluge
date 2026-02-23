'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Camera, Instagram } from 'lucide-react';

const galleryImages = [
  { src: '/images/1000/Hanuman Luge 1.jpg', alt: 'Luge racing action', category: 'action' },
  { src: '/images/1000/Hanuman Luge 2.jpg', alt: 'Scenic track view', category: 'scenic' },
  { src: '/images/1000/Hanuman Luge 3.jpg', alt: 'Family fun', category: 'family' },
  { src: '/images/1000/Hanuman Luge 4.jpg', alt: 'Racing excitement', category: 'action' },
  { src: '/images/1000/Hanuman Luge 5.jpg', alt: 'Track overview', category: 'scenic' },
  { src: '/images/1000/Hanuman Luge 6.jpg', alt: 'Group adventure', category: 'family' },
  { src: '/images/1000/Hanuman Luge 7.jpg', alt: 'Speed thrills', category: 'action' },
  { src: '/images/1000/Hanuman Luge 8.jpg', alt: 'Beautiful scenery', category: 'scenic' },
  { src: '/images/1000/Hanuman Luge 9.jpg', alt: 'Kids having fun', category: 'family' },
  { src: '/images/1000/Hanuman Luge 10.jpg', alt: 'Racing down', category: 'action' },
  { src: '/images/1000/Hanuman Luge 11.jpg', alt: 'Jungle views', category: 'scenic' },
  { src: '/images/1000/Hanuman Luge 12.jpg', alt: 'Family memories', category: 'family' },
  { src: '/images/1000/Hanuman Luge 13.jpg', alt: 'Adrenaline rush', category: 'action' },
  { src: '/images/1000/Hanuman Luge 14.jpg', alt: 'Track curves', category: 'scenic' },
  { src: '/images/1000/Hanuman Luge 15.jpg', alt: 'Happy guests', category: 'family' },
  { src: '/images/1000/Hanuman Luge 16.jpg', alt: 'Racing action', category: 'action' },
  { src: '/images/1000/Hanuman Luge 17.jpg', alt: 'Panoramic view', category: 'scenic' },
  { src: '/images/1000/Hanuman Luge 18.jpg', alt: 'Group photo', category: 'family' },
  { src: '/images/1000/Hanuman Luge 19.jpg', alt: 'Speed demon', category: 'action' },
  { src: '/images/1000/Hanuman Luge 20.jpg', alt: 'Nature beauty', category: 'scenic' },
];

const categories = [
  { id: 'all', label: 'All Photos' },
  { id: 'action', label: 'Action Shots' },
  { id: 'scenic', label: 'Scenic Views' },
  { id: 'family', label: 'Family Fun' },
];

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredImages = activeCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % filteredImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  return (
    <section id="gallery" className="relative py-20 lg:py-32 bg-navy overflow-hidden">
      {/* Clean Gradient Lines Only */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Horizontal Gradient Lines */}
        <div className="absolute top-[10%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
        <div className="absolute top-[25%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
        <div className="absolute top-[40%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/35 to-transparent" />
        <div className="absolute top-[55%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent" />
        <div className="absolute top-[70%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/35 to-transparent" />
        <div className="absolute top-[85%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
        
        {/* Vertical Gradient Lines */}
        <div className="absolute top-0 bottom-0 left-[10%] w-px bg-gradient-to-b from-transparent via-orange-500/30 to-transparent" />
        <div className="absolute top-0 bottom-0 left-[30%] w-px bg-gradient-to-b from-transparent via-green-500/25 to-transparent" />
        <div className="absolute top-0 bottom-0 left-[50%] w-px bg-gradient-to-b from-transparent via-blue-500/30 to-transparent" />
        <div className="absolute top-0 bottom-0 left-[70%] w-px bg-gradient-to-b from-transparent via-purple-500/25 to-transparent" />
        <div className="absolute top-0 bottom-0 left-[90%] w-px bg-gradient-to-b from-transparent via-orange-500/30 to-transparent" />
      </div>
      
      {/* Subtle Corner Glows */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500/8 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-500/8 to-transparent rounded-full blur-3xl" />
      
      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="badge mb-4 mx-auto">
              <Camera className="w-4 h-4" />
              Gallery
            </span>
            <h2 className="text-display text-white mb-4">
              CAPTURE THE<br />
              <span className="text-lime">MOMENTS</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Real photos from real adventures. See what awaits you at Hanuman Luge!
            </p>
          </motion.div>
        </div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold text-sm transition-all ${
                activeCategory === category.id
                  ? 'bg-lime text-navy'
                  : 'bg-navy border border-white/10 text-white/70 hover:border-lime hover:text-lime'
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Masonry Grid - 30% smaller images */}
        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.src}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                className={`relative group cursor-pointer overflow-hidden rounded-xl ${
                  index % 7 === 0 ? 'row-span-2' : ''
                } ${index % 5 === 0 ? 'md:col-span-2' : ''}`}
                onClick={() => openLightbox(index)}
              >
                <div className={`relative w-full ${
                  index % 7 === 0 ? 'h-[280px] lg:h-[350px]' : 'h-[140px] lg:h-[175px]'
                }`}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/60 transition-all duration-300 flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <div className="w-14 h-14 rounded-full bg-lime flex items-center justify-center">
                        <svg className="w-6 h-6 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a
            href="https://instagram.com/hanumanluge"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-pink-500/30 transition-all group"
          >
            <Instagram className="w-5 h-5" />
            Follow us on Instagram
            <span className="text-white/70">@hanumanluge</span>
          </a>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-navy/98 backdrop-blur-xl flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-lime hover:text-navy transition-all"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 lg:left-8 z-10 w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-lime hover:text-navy transition-all"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 lg:right-8 z-10 w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-lime hover:text-navy transition-all"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Image */}
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative w-[90vw] h-[80vh] max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filteredImages[selectedImage].src}
                alt={filteredImages[selectedImage].alt}
                fill
                className="object-contain"
                quality={95}
              />
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 font-mono">
              {selectedImage + 1} / {filteredImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
