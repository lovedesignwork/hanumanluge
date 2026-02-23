'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Ticket } from 'lucide-react';

interface TicketPackage {
  id: number;
  rides: number;
  name: string;
  price: number;
  image: string;
  slug: string;
  popular?: boolean;
}

const ticketPackages: TicketPackage[] = [
  {
    id: 1,
    rides: 1,
    name: '1 Ride',
    price: 350,
    image: '/images/1000/Hanuman Luge 1.jpg',
    slug: 'single-ride',
  },
  {
    id: 2,
    rides: 2,
    name: '2 Rides',
    price: 590,
    image: '/images/1000/Hanuman Luge 5.jpg',
    slug: 'double-ride',
    popular: true,
  },
  {
    id: 3,
    rides: 3,
    name: '3 Rides',
    price: 790,
    image: '/images/1000/Hanuman Luge 12.jpg',
    slug: 'triple-ride',
  },
];

const doublingPackage = {
  id: 4,
  rides: 6,
  name: 'Doubling - Tandem For Kids',
  description: 'Buy 3, Get 3 FREE! Best value for thrill seekers',
  price: 990,
  originalPrice: 1580,
  image: '/images/1000/Hanuman Luge 18.jpg',
  slug: 'double-fun',
};

export function Pricing() {
  return (
    <section id="pricing" className="relative py-20 lg:py-32 bg-navy overflow-hidden">
      {/* Clean Dark Background with Subtle Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy-light/30 to-navy" />
      
      {/* Animated Speed Lines - Sporty */}
      <div className="speed-line-animated line-1" style={{ top: '12%' }} />
      <div className="speed-line-animated line-2" style={{ top: '35%' }} />
      <div className="speed-line-animated line-3" style={{ top: '65%' }} />
      <div className="speed-line-animated line-4" style={{ top: '88%' }} />
      
      {/* Subtle Corner Accent */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-lime/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-lime/5 to-transparent rounded-full blur-3xl" />
      
      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="badge mb-6 mx-auto">
            <Ticket className="w-4 h-4" />
            Get Your Tickets
          </span>
          
          <h2 className="text-display text-white mb-4">
            CHOOSE YOUR <span className="text-lime">RIDES</span>
          </h2>
          
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Simple pricing, maximum fun. Pick your rides and hit the track!
          </p>
        </motion.div>

        {/* Ticket Grid - 3 columns */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {ticketPackages.map((ticket, index) => (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Popular Badge */}
              {ticket.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                  <span className="px-4 py-1.5 rounded-full bg-[#fe6004] text-white text-xs font-bold uppercase tracking-wider whitespace-nowrap shadow-lg">
                    Best Seller
                  </span>
                </div>
              )}
              
              {/* Ticket Card */}
              <div className="relative overflow-hidden rounded-3xl">
                {/* Ticket Container - Lime Background */}
                <div className="relative bg-lime">
                  
                  {/* Top Section - Image with Large Ride Number at Bottom Edge */}
                  <div className="relative h-60 overflow-hidden">
                    <Image
                      src={ticket.image}
                      alt={ticket.name}
                      fill
                      className="object-cover"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-lime via-lime/60 to-transparent" />
                    
                    {/* Large Ride Number at Bottom Edge */}
                    <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center">
                      <span className="text-8xl font-black font-google-sans text-lime tracking-tighter leading-none translate-y-4 italic">
                        {ticket.rides} {ticket.rides === 1 ? 'RIDE' : 'RIDES'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Perforated Line */}
                  <div className="relative h-6 flex items-center">
                    <div className="absolute left-0 w-5 h-10 bg-navy rounded-r-full -translate-x-1/2" />
                    <div className="flex-1 border-t-[3px] border-dashed border-[#0A1628] mx-8" />
                    <div className="absolute right-0 w-5 h-10 bg-navy rounded-l-full translate-x-1/2" />
                  </div>
                  
                  {/* Bottom Section */}
                  <div className="px-5 pb-5 pt-1">
                    {/* Location Info */}
                    <div className="flex justify-between items-center mb-2 text-[10px] text-[#C8511E] uppercase tracking-widest font-semibold">
                      <span>Hanuman Luge</span>
                      <span>Phuket · Thailand</span>
                    </div>
                    
                    {/* Price */}
                    <div className="text-center mb-4">
                      <span className="text-4xl font-black font-display text-navy">
                        ฿{ticket.price.toLocaleString()}
                      </span>
                      <p className="text-navy text-xs mt-0.5 font-medium">per person</p>
                    </div>
                    
                    {/* CTA Button */}
                    <Link href={`/booking?package=${ticket.slug}`}>
                      <button className="w-full py-3 rounded-xl bg-navy text-lime font-bold transition-all hover:bg-navy/90 flex items-center justify-center gap-2 group uppercase tracking-wide text-sm">
                        Get Ticket
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Doubling Package - Full Width Ticket */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="relative"
        >
          {/* Large Ticket */}
          <div className="bg-[#fe6004] rounded-2xl overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Left - Image Section */}
              <div className="relative lg:w-2/5 h-48 lg:h-auto min-h-[200px]">
                <Image
                  src={doublingPackage.image}
                  alt={doublingPackage.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#fe6004] lg:block hidden" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#fe6004] via-transparent to-transparent lg:hidden" />
                
                {/* Ride Count */}
                <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-navy text-[#fe6004] font-black text-lg shadow-lg">
                  {doublingPackage.rides}x RIDES
                </div>
              </div>
              
              {/* Perforated Edge - Vertical on desktop, Horizontal on mobile */}
              <div className="hidden lg:flex flex-col items-center justify-center w-8 relative">
                <div className="absolute top-0 w-8 h-8 bg-navy rounded-full -translate-y-1/2" />
                <div className="flex-1 border-l-2 border-dashed border-navy my-4" />
                <div className="absolute bottom-0 w-8 h-8 bg-navy rounded-full translate-y-1/2" />
              </div>
              
              <div className="lg:hidden relative h-6 flex items-center">
                <div className="absolute left-0 w-6 h-6 bg-navy rounded-full -translate-x-1/2" />
                <div className="flex-1 border-t-2 border-dashed border-navy mx-6" />
                <div className="absolute right-0 w-6 h-6 bg-navy rounded-full translate-x-1/2" />
              </div>
              
              {/* Right - Content Section */}
              <div className="flex-1 p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="text-center lg:text-left">
                  <h3 className="text-3xl lg:text-4xl font-black font-display text-navy mb-2">
                    {doublingPackage.name.toUpperCase()}
                  </h3>
                  <p className="text-navy text-lg mb-4">
                    {doublingPackage.description}
                  </p>
                  
                  {/* Features Row */}
                  <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                    <span className="px-3 py-1 rounded-full bg-navy/10 text-navy text-sm font-semibold">
                      ✓ 6 Luge Rides
                    </span>
                    <span className="px-3 py-1 rounded-full bg-navy/10 text-navy text-sm font-semibold">
                      ✓ Both Tracks
                    </span>
                    <span className="px-3 py-1 rounded-full bg-navy/10 text-navy text-sm font-semibold">
                      ✓ Photo Package
                    </span>
                    <span className="px-3 py-1 rounded-full bg-navy/10 text-navy text-sm font-semibold">
                      ✓ Priority Queue
                    </span>
                  </div>
                </div>
                
                {/* Price & CTA */}
                <div className="text-center lg:text-right flex-shrink-0">
                  <div className="mb-2">
                    <span className="text-navy line-through text-lg">
                      ฿{doublingPackage.originalPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-5xl lg:text-6xl font-black font-display text-navy mb-1">
                    ฿{doublingPackage.price.toLocaleString()}
                  </div>
                  <p className="text-navy text-sm mb-4">Save ฿{(doublingPackage.originalPrice - doublingPackage.price).toLocaleString()}!</p>
                  
                  <Link href={`/booking?package=${doublingPackage.slug}`}>
                    <button className="px-8 py-4 rounded-xl bg-white text-navy font-bold text-lg transition-all hover:bg-gray-100 flex items-center justify-center gap-2 group mx-auto lg:mx-0">
                      Get Ticket
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-white/50">
            Looking for group or birthday packages?{' '}
            <Link href="/contact" className="text-lime hover:underline">
              Contact us
            </Link>
            {' '}for special arrangements.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
