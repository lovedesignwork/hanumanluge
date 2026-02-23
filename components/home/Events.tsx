'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Cake, Building2, GraduationCap, ArrowRight, Check, Sparkles } from 'lucide-react';

const eventTypes = [
  {
    icon: Cake,
    title: 'Birthday Parties',
    tagline: 'Unforgettable celebrations',
    description: 'Make their special day extraordinary with an adventure-packed birthday party. Packages include rides, party areas, decorations, and more.',
    features: ['Dedicated party host', 'Custom decorations', 'Catering options', 'Photo packages'],
    image: '/images/Package%20image/WORLDC.JPG',
    color: '#ec4899',
    price: 'From ฿4,990',
  },
  {
    icon: Building2,
    title: 'Corporate Events',
    tagline: 'Team building with a twist',
    description: 'Elevate your corporate events with unique team-building activities. Perfect for company outings, celebrations, and bonding experiences.',
    features: ['Customized programs', 'Meeting facilities', 'Catering services', 'Dedicated coordinator'],
    image: '/images/Package%20image/32PF.JPG',
    color: '#a855f7',
    price: 'Custom packages',
  },
  {
    icon: GraduationCap,
    title: 'School Groups',
    tagline: 'Educational fun',
    description: 'Perfect for school field trips and graduation celebrations. Special rates for educational institutions with group supervision included.',
    features: ['Educational content', 'Group discounts', 'Safety briefing', 'Teacher passes'],
    image: '/images/Package%20image/SkywalkPakc.jpg',
    color: '#06b6d4',
    price: 'Special rates',
  },
];

export function Events() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dark" />
      <div className="absolute inset-0 bg-mesh opacity-30" />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
          >
            <Sparkles className="w-4 h-4 text-pink-400" />
            <span className="text-sm font-medium text-white/80">Special Events</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            Celebrate <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Together</span>
          </h2>
          
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            From birthday parties to corporate events, we create unforgettable experiences for groups of all sizes
          </p>
        </motion.div>

        {/* Events Grid */}
        <div className="space-y-8">
          {eventTypes.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`grid lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}
            >
              {/* Image */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`relative h-[300px] lg:h-[400px] rounded-3xl overflow-hidden group ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}
              >
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />
                
                {/* Colored overlay on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity"
                  style={{ background: event.color }}
                />

                {/* Floating badge */}
                <div 
                  className="absolute top-4 left-4 px-4 py-2 rounded-xl glass flex items-center gap-2"
                  style={{ color: event.color }}
                >
                  <event.icon className="w-5 h-5" />
                  <span className="font-semibold">{event.price}</span>
                </div>
              </motion.div>

              {/* Content */}
              <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <div 
                  className="inline-flex items-center gap-2 mb-4"
                  style={{ color: event.color }}
                >
                  <event.icon className="w-6 h-6" />
                  <span className="text-sm font-semibold uppercase tracking-wider">{event.tagline}</span>
                </div>

                <h3 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4">
                  {event.title}
                </h3>

                <p className="text-white/60 text-lg mb-6 leading-relaxed">
                  {event.description}
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {event.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 text-white/70">
                      <div 
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: `${event.color}20` }}
                      >
                        <Check className="w-4 h-4" style={{ color: event.color }} />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex gap-4">
                  <Link href="/contact">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 rounded-xl font-semibold text-white flex items-center gap-2"
                      style={{ background: event.color }}
                    >
                      Get Quote
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </Link>
                  <Link href="/#pricing">
                    <button className="px-6 py-3 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/5 transition-colors">
                      View Pricing
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
