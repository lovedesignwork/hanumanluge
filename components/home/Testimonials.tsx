'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star, Quote, ExternalLink } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    location: 'Sydney, Australia',
    rating: 5,
    text: 'Absolutely incredible experience! The luge tracks were thrilling and the staff made us feel so safe. A must-do in Phuket!',
    avatar: 'S',
    image: '/images/1000/Hanuman Luge 21.jpg',
  },
  {
    id: 2,
    name: 'Michael Chen',
    location: 'Singapore',
    rating: 5,
    text: 'Brought my whole family including my kids. Everyone had an amazing time! Best adventure activity we did in Thailand.',
    avatar: 'M',
    image: '/images/1000/Hanuman Luge 22.jpg',
  },
  {
    id: 3,
    name: 'Emma Wilson',
    location: 'London, UK',
    rating: 5,
    text: 'The scenic views are perfect. Worth every penny! The staff speaks great English and made us feel welcome.',
    avatar: 'E',
    image: '/images/1000/Hanuman Luge 23.jpg',
  },
];

export function Testimonials() {
  return (
    <section className="relative py-20 lg:py-32 bg-navy overflow-hidden">
      {/* Clean Dark Gradient Base */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-[#0c1a2e] to-navy" />
      
      {/* Subtle Radial Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-lime/5 rounded-full blur-[150px]" />
      </div>
      
      {/* Diagonal Racing Lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.04]">
        <div className="absolute -top-1/2 -left-1/4 w-[150%] h-[200%]"
          style={{
            background: 'repeating-linear-gradient(135deg, transparent, transparent 100px, #CDFF00 100px, #CDFF00 101px)',
          }}
        />
      </div>
      
      {/* Gradient Border Lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lime/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lime/20 to-transparent" />
      
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-lime/8 to-transparent" 
        style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} 
      />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-cyan/6 to-transparent"
        style={{ clipPath: 'polygon(100% 100%, 0 100%, 100% 0)' }}
      />
      
      {/* Animated Speed Lines */}
      <div className="speed-line-animated line-1" style={{ top: '15%' }} />
      <div className="speed-line-animated line-3" style={{ top: '85%' }} />
      
      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="badge mb-4 mx-auto">
              <Star className="w-4 h-4" />
              From Vision to Reality
            </span>
            
            <h2 className="text-display text-white mb-4">
              WHAT OUR <span className="text-lime">CLIENTS</span> SAYS
            </h2>
            
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Real feedback from our amazing guests. See why we&apos;re rated #1 
              adventure activity in Phuket.
            </p>
          </motion.div>
        </div>

        {/* Featured Image + Stats */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 relative rounded-3xl overflow-hidden h-[400px]"
          >
            <Image
              src="/images/1000/Hanuman Luge 35.jpg"
              alt="Happy guests at Hanuman Luge"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0a1832] via-[#0a1832]/60 to-transparent" />
            
            {/* Stats Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex items-center gap-8">
                <div>
                  <div className="text-5xl font-black font-display text-lime">4.9</div>
                  <div className="text-sm text-white/70 uppercase tracking-wider">Rating</div>
                </div>
                <div className="h-12 w-px bg-white/20" />
                <div>
                  <div className="text-5xl font-black font-display text-white">50K+</div>
                  <div className="text-sm text-white/70 uppercase tracking-wider">Happy Guests</div>
                </div>
                <div className="h-12 w-px bg-white/20" />
                <div>
                  <div className="text-5xl font-black font-display text-white">100%</div>
                  <div className="text-sm text-white/70 uppercase tracking-wider">Recommend</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* TripAdvisor Card - Sporty Dark with Colorful Gradient */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative rounded-3xl p-8 flex flex-col justify-between overflow-hidden"
          >
            {/* Dark Base */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0d1f35] to-[#0a1628]" />
            
            {/* Colorful Gradient Accents */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-lime/30 via-cyan/20 to-transparent rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-500/25 via-pink-500/15 to-transparent rounded-full blur-2xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-orange-500/20 to-cyan/20 rounded-full blur-3xl" />
            
            {/* Diagonal Racing Stripe */}
            <div className="absolute inset-0 opacity-[0.06]"
              style={{
                background: 'repeating-linear-gradient(135deg, transparent, transparent 20px, #CDFF00 20px, #CDFF00 21px)',
              }}
            />
            
            {/* Animated Speed Line */}
            <div className="absolute top-8 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-lime/40 to-transparent" />
            <div className="absolute bottom-20 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan/30 to-transparent" />
            
            {/* Content */}
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-lime to-cyan rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-lime/20">
                <Star className="w-8 h-8 text-navy" fill="currentColor" />
              </div>
              <h3 className="text-2xl font-bold font-display text-white mb-2">
                #1 Adventure Activity
              </h3>
              <p className="text-white/70">
                Rated the best adventure activity in Phuket on TripAdvisor
              </p>
            </div>
            <a
              href="https://www.tripadvisor.com"
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 btn-lime group mt-6"
            >
              Read All Reviews
              <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-navy rounded-2xl overflow-hidden border border-white/10 group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={testimonial.image}
                  alt={`${testimonial.name}'s experience`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy to-transparent" />
              </div>
              
              {/* Content */}
              <div className="p-6">
                {/* Quote Icon */}
                <Quote className="w-8 h-8 mb-4 text-lime/30" />
                
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-4 h-4 text-lime fill-lime"
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-white/70 mb-6 leading-relaxed text-sm">
                  &quot;{testimonial.text}&quot;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-lime flex items-center justify-center font-bold text-navy">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-white/50">
                      {testimonial.location}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
