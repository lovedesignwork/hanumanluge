'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Zap, Flag, Timer, Mountain } from 'lucide-react';

interface Track {
  id: string;
  name: string;
  distance: string;
  tagline: string;
  description: string;
  image: string;
  features: string[];
  difficulty: string;
  color: 'lime' | 'cyan';
}

const tracks: Track[] = [
  {
    id: '1',
    name: 'JUNGLE TRACK',
    distance: '650M',
    tagline: 'Beginner Friendly',
    description: 'Perfect for first-timers! Wind through lush tropical jungle with gentle curves and scenic views. A great introduction to the thrill of luge racing.',
    image: '/images/1000/Hanuman Luge 5.jpg',
    features: ['Gentle Curves', 'Scenic Views', 'Family Friendly', 'Photo Points'],
    difficulty: 'Easy',
    color: 'lime',
  },
  {
    id: '2',
    name: 'DRAGON TRACK',
    distance: '1.2KM',
    tagline: 'Thrill Seekers',
    description: 'Our longest and most exciting track! Experience sharp turns, thrilling drops, and adrenaline-pumping speed as you race through the mountain terrain.',
    image: '/images/1000/Hanuman Luge 1.jpg',
    features: ['Sharp Turns', 'Thrilling Drops', 'High Speed', 'Advanced Riders'],
    difficulty: 'Advanced',
    color: 'cyan',
  },
];

export function Activities() {
  return (
    <section id="activities" className="relative py-20 lg:py-32 bg-navy overflow-hidden">
      {/* Sporty Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1832] via-[#0d2045] to-[#0a1832]" />
      
      {/* Racing Stripes Background */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          background: 'repeating-linear-gradient(135deg, transparent, transparent 50px, #CDFF00 50px, #CDFF00 51px)',
        }}
      />
      
      {/* Animated Speed Lines */}
      <div className="speed-line-animated line-1" />
      <div className="speed-line-animated line-2" />
      <div className="speed-line-animated line-3" />
      
      {/* Glow Effects */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-lime/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan/5 rounded-full blur-[150px]" />
      
      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime/10 text-lime text-sm font-semibold uppercase tracking-wider mb-6">
            <Flag className="w-4 h-4" />
            Choose Your Track
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-white mb-4">
            2 EPIC <span className="text-lime">TRACKS</span> TO CONQUER
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            From beginner-friendly jungle trails to adrenaline-pumping mountain descents. Pick your challenge!
          </p>
        </motion.div>

        {/* 50/50 Track Cards - Clean Design */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {tracks.map((track, index) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group"
            >
              {/* Card Container */}
              <div className="relative h-[550px] rounded-3xl overflow-hidden bg-navy-light">
                
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={track.image}
                    alt={track.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/70 to-[#0a1628]/20" />
                </div>
                
                {/* Distance Badge */}
                <div className="absolute top-6 left-6 z-10">
                  <div className="bg-[#fe6004] rounded-xl px-5 py-3">
                    <span className="text-white font-black text-3xl font-display">{track.distance}</span>
                  </div>
                </div>
                
                {/* Difficulty Badge */}
                <div className="absolute top-6 right-6 z-10">
                  <span className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider ${
                    track.difficulty === 'Easy' 
                      ? 'bg-[#fe6004] text-white' 
                      : 'bg-orange-500 text-white'
                  }`}>
                    {track.difficulty}
                  </span>
                </div>
                
                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-8 z-10">
                  {/* Tagline */}
                  <span className="text-lime text-sm font-semibold uppercase tracking-wider mb-2 block">
                    {track.tagline}
                  </span>
                  
                  {/* Track Name */}
                  <h3 className="text-3xl lg:text-4xl font-display font-black text-white mb-3">
                    {track.name}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-white/70 mb-5 text-base leading-relaxed line-clamp-2">
                    {track.description}
                  </p>
                  
                  {/* Features - Horizontal Pills */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {track.features.map((feature, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1.5 rounded-full bg-white/10 text-white/90 text-xs font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  {/* CTA Button */}
                  <Link href="/booking" className="block">
                    <button className="w-full py-4 rounded-xl bg-[#fe6004] text-white font-bold text-lg transition-all hover:bg-[#ff7a2e] flex items-center justify-center gap-3 group/btn">
                      <Zap className="w-5 h-5" />
                      RACE THIS TRACK
                      <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Bottom Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { icon: Flag, label: '2 Tracks', value: 'Available' },
            { icon: Mountain, label: 'Total Distance', value: '1.85 KM' },
            { icon: Timer, label: 'Avg. Ride Time', value: '3-5 Min' },
            { icon: Zap, label: 'Max Speed', value: '40 KM/H' },
          ].map((stat, index) => (
            <div key={index} className="bg-navy-light rounded-2xl p-6 text-center border border-lime/20 hover:border-lime/50 transition-colors">
              <stat.icon className="w-8 h-8 text-lime mx-auto mb-3" />
              <div className="text-2xl font-bold text-white font-display">{stat.value}</div>
              <div className="text-white/50 text-sm uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
