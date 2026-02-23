'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Shield, Award, Users, Clock, Sparkles, ArrowRight, Play } from 'lucide-react';
import Link from 'next/link';
import { StarsBackground } from '@/components/ui/stars-background';

const features = [
  {
    icon: Shield,
    title: 'Safety First',
    description: 'State-of-the-art equipment and trained professionals ensure a secure experience.',
  },
  {
    icon: Award,
    title: 'Award Winning',
    description: '#1 rated adventure activity in Phuket with 4.9★ on TripAdvisor.',
  },
  {
    icon: Users,
    title: 'Family Friendly',
    description: 'Activities for all ages from 3 to 99. Everyone can join the fun!',
  },
  {
    icon: Clock,
    title: 'Quick & Easy',
    description: 'No experience needed. 5-minute training and you\'re ready to race!',
  },
];

const trustedBy = [
  'Tourism Authority of Thailand',
  'TripAdvisor',
  'Viator',
  'GetYourGuide',
  'Klook',
];

export function WhyUs() {
  return (
    <section className="relative py-20 lg:py-32 bg-navy overflow-hidden">
      {/* Stars Background Effect */}
      <StarsBackground 
        quantity={150}
        speed={0.3}
        starColor="#CDFF00"
        minSize={1}
        maxSize={3}
      />
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/50 via-transparent to-navy/50 pointer-events-none" />
      
      {/* Animated Speed Lines - Keep sporty feel */}
      <div className="speed-line-animated line-1" style={{ top: '20%' }} />
      <div className="speed-line-animated line-3" style={{ top: '80%' }} />
      
      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Side - Image with overlay */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Main Image */}
            <div className="relative rounded-3xl overflow-hidden">
              <div className="aspect-[4/5] relative">
                <Image
                  src="/images/1000/Hanuman Luge 25.jpg"
                  alt="Hanuman Luge Experience"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
              </div>
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-20 h-20 rounded-full bg-lime flex items-center justify-center group hover:scale-110 transition-transform shadow-lg shadow-lime/30">
                  <Play className="w-8 h-8 text-navy ml-1" fill="currentColor" />
                </button>
              </div>
              
              {/* Stats Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-gradient-to-r from-lime to-orange-400 rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-4xl font-black font-display text-navy">10+</div>
                    <div className="text-sm text-navy/70 uppercase tracking-wider font-medium">Years Experience</div>
                  </div>
                  <div className="h-12 w-px bg-navy/20" />
                  <div>
                    <div className="text-4xl font-black font-display text-navy">50K+</div>
                    <div className="text-sm text-navy/70 uppercase tracking-wider font-medium">Happy Guests</div>
                  </div>
                  <div className="h-12 w-px bg-navy/20" />
                  <div>
                    <div className="text-4xl font-black font-display text-navy">4.9</div>
                    <div className="text-sm text-navy/70 uppercase tracking-wider font-medium">Rating</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -right-8 -bottom-8 w-48 h-48 rounded-2xl overflow-hidden border-4 border-navy-light shadow-2xl hidden lg:block"
            >
              <Image
                src="/images/1000/Hanuman Luge 30.jpg"
                alt="Family fun at Hanuman Luge"
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Right Side - Text & Feature Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="badge mb-6">
              <Sparkles className="w-4 h-4" />
              Who We Are
            </span>
            
            <h2 className="text-display text-white mb-6">
              CREATIVITY<br />
              MEETS <span className="text-lime">STRATEGY.</span>
            </h2>
            
            <p className="text-white/60 text-lg mb-8 leading-relaxed">
              With a team of passionate adventure seekers and safety experts, 
              we specialize in delivering unique experiences that elevate your 
              vacation and captivate your senses.
            </p>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-5 rounded-2xl ${
                    index === 1 ? 'bg-lime text-navy' : 'bg-navy border-2 border-[#fe6004]'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                    index === 1 ? 'bg-navy/10' : 'bg-lime/10'
                  }`}>
                    <feature.icon className={`w-5 h-5 ${index === 1 ? 'text-navy' : 'text-lime'}`} />
                  </div>
                  <h3 className={`text-base font-bold font-display mb-1 ${index === 1 ? 'text-navy' : 'text-white'}`}>
                    {feature.title}
                  </h3>
                  <p className={`text-xs ${index === 1 ? 'text-navy/70' : 'text-white/60'}`}>
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <Link href="/about">
              <button className="btn-lime group">
                About Us
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Trust Logos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 pt-12 border-t border-white/10"
        >
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
            {trustedBy.map((brand) => (
              <div key={brand} className="text-white/30 text-sm font-semibold uppercase tracking-wider hover:text-lime transition-colors cursor-pointer">
                {brand}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
