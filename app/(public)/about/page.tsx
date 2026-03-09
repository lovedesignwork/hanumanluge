'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { 
  Shield, 
  Heart, 
  Leaf,
  Award,
  MapPin,
  Clock,
  Phone,
  Mail,
  ArrowRight,
  Zap,
  Users,
  Mountain,
  Timer,
  ChevronRight
} from 'lucide-react';

const stats = [
  { number: '2024', label: 'ESTABLISHED', icon: Zap },
  { number: '50K+', label: 'HAPPY RIDERS', icon: Users },
  { number: '4', label: 'EPIC TRACKS', icon: Mountain },
  { number: '1.2km', label: 'TOTAL LENGTH', icon: Timer },
];

const values = [
  {
    icon: Shield,
    title: 'SAFETY FIRST',
    description: 'International safety standards with daily inspections and professional staff training.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Leaf,
    title: 'ECO-FRIENDLY',
    description: 'Operating in harmony with nature, supporting local conservation efforts.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Heart,
    title: 'PASSION DRIVEN',
    description: 'Creating unforgettable adventure experiences for every single guest.',
    color: 'from-red-500 to-pink-500',
  },
  {
    icon: Award,
    title: 'EXCELLENCE',
    description: 'Premier luge park recognized for outstanding service and adventure tourism.',
    color: 'from-yellow-500 to-orange-500',
  },
];

const timeline = [
  { year: '2023', title: 'The Dream Begins', description: 'Vision to bring luge racing to Phuket takes shape' },
  { year: '2024', title: 'Grand Opening', description: 'Hanuman Luge opens its doors to the world' },
  { year: '2024', title: '10K Milestone', description: 'Celebrating 10,000 happy riders' },
  { year: '2025', title: 'Track Expansion', description: 'New advanced tracks added for thrill seekers' },
];

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <main className="min-h-screen bg-navy overflow-hidden">
      {/* Hero Section - Full Screen Immersive */}
      <section ref={heroRef} className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image
            src="/images/1000/Hanuman Luge 15.jpg"
            alt="Hanuman Luge Adventure"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/50 to-navy" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-transparent to-navy/80" />
        </motion.div>

        {/* Racing Stripes */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 60px, #fe6004 60px, #fe6004 62px)`
        }} />

        {/* Animated Speed Lines */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-[2px] bg-gradient-to-r from-transparent via-[#fe6004]/30 to-transparent"
              style={{ top: `${15 + i * 18}%`, left: '-100%', width: '200%' }}
              animate={{ x: ['0%', '50%'] }}
              transition={{ duration: 5 + i * 0.5, repeat: Infinity, ease: 'linear', delay: i * 0.4 }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <motion.div 
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-6 py-2 bg-[#fe6004] text-black font-black text-sm uppercase tracking-widest rounded-full mb-8">
              Phuket&apos;s First & Only Luge Park
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tight mb-6"
          >
            OUR <span className="text-[#fe6004]">STORY</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-12"
          >
            Where the spirit of adventure meets the thrill of speed.
            Experience Phuket like never before.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link href="/booking">
              <button className="group px-10 py-5 bg-[#fe6004] hover:bg-[#ff7a2e] text-black font-black text-lg uppercase tracking-wider rounded-full transition-all shadow-2xl shadow-[#fe6004]/30 hover:shadow-[#fe6004]/50 flex items-center gap-3 mx-auto">
                START YOUR ADVENTURE
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-8 h-14 border-2 border-white/30 rounded-full flex items-start justify-center p-2"
          >
            <motion.div className="w-2 h-2 bg-[#fe6004] rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section - Bold Numbers */}
      <section className="relative py-20 bg-navy">
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `repeating-linear-gradient(90deg, #fe6004 0px, #fe6004 1px, transparent 1px, transparent 100px)`
        }} />
        
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-[#fe6004]/50 transition-all duration-500 overflow-hidden">
                  {/* Background Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#fe6004]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <stat.icon className="w-8 h-8 text-[#fe6004] mb-4" />
                    <p className="text-5xl md:text-6xl font-black text-white mb-2">{stat.number}</p>
                    <p className="text-sm font-bold text-white/50 uppercase tracking-widest">{stat.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section - Split Layout */}
      <section className="relative py-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#fe6004] hidden lg:block" />
        <div className="absolute inset-0 lg:hidden bg-gradient-to-b from-navy via-navy/95 to-navy" />

        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              <span className="inline-block px-4 py-2 bg-[#fe6004]/20 text-[#fe6004] font-bold text-sm uppercase tracking-widest rounded-full mb-6">
                The Legend
              </span>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight mb-8">
                BORN FROM A <span className="text-[#fe6004]">DREAM</span>
              </h2>
              
              <div className="space-y-6 text-lg text-white/70">
                <p>
                  <span className="text-white font-bold">Hanuman Luge</span> was born from a vision to create 
                  something extraordinary — an adventure experience that brings the pure excitement of luge 
                  racing to the tropical paradise of Phuket.
                </p>
                <p>
                  Named after <span className="text-[#fe6004] font-bold">Hanuman</span>, the legendary monkey god 
                  from Hindu mythology who symbolizes strength, courage, and the fearless spirit of adventure. 
                  Just like Hanuman leaped across mountains, our guests race down thrilling tracks with the 
                  wind in their hair and stunning views all around.
                </p>
                <p>
                  Set amidst Phuket&apos;s breathtaking landscape, our tracks are designed to deliver 
                  <span className="text-white font-bold"> maximum thrills</span> while maintaining the 
                  highest safety standards. Every turn, every descent, every moment is crafted for 
                  unforgettable memories.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/activities">
                  <button className="px-8 py-4 bg-[#fe6004] hover:bg-[#ff7a2e] text-black font-black uppercase tracking-wider rounded-full transition-all flex items-center gap-2">
                    Explore Tracks
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </Link>
                <Link href="/pricing">
                  <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold uppercase tracking-wider rounded-full transition-all border border-white/20">
                    View Pricing
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* Image Grid */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative z-10 lg:pl-16"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative h-48 rounded-2xl overflow-hidden">
                    <Image
                      src="/images/1000/Hanuman Luge 3.jpg"
                      alt="Luge Track"
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="relative h-64 rounded-2xl overflow-hidden">
                    <Image
                      src="/images/1000/Hanuman Luge 10.jpg"
                      alt="Riders"
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="relative h-64 rounded-2xl overflow-hidden">
                    <Image
                      src="/images/1000/Hanuman Luge 20.jpg"
                      alt="Adventure"
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="relative h-48 rounded-2xl overflow-hidden">
                    <Image
                      src="/images/1000/Hanuman Luge 25.jpg"
                      alt="Views"
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', delay: 0.5 }}
                className="absolute -bottom-6 -left-6 lg:left-6 bg-black rounded-2xl p-6 shadow-2xl"
              >
                <p className="text-[#fe6004] font-black text-4xl">50K+</p>
                <p className="text-white/60 text-sm font-bold uppercase tracking-wider">Happy Riders</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section - Cards Grid */}
      <section className="relative py-32 bg-gradient-to-b from-navy via-[#0a0a1a] to-navy">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #fe6004 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />

        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="inline-block px-6 py-2 bg-[#fe6004] text-black font-black text-sm uppercase tracking-widest rounded-full mb-6">
              What Drives Us
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight">
              OUR <span className="text-[#fe6004]">VALUES</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="group relative"
              >
                <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-[#fe6004]/50 transition-all duration-500 h-full overflow-hidden">
                  {/* Gradient Overlay on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  <div className="relative z-10">
                    <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-black text-white uppercase tracking-wide mb-3">{value.title}</h3>
                    <p className="text-white/60">{value.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="inline-block px-6 py-2 bg-[#fe6004]/20 text-[#fe6004] font-bold text-sm uppercase tracking-widest rounded-full mb-6">
              Our Journey
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
              THE <span className="text-[#fe6004]">TIMELINE</span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#fe6004] via-[#fe6004]/50 to-transparent" />

            {timeline.map((item, index) => (
              <motion.div
                key={item.year + item.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'} pl-20 md:pl-0`}>
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[#fe6004]/30 transition-all">
                    <span className="text-[#fe6004] font-black text-2xl">{item.year}</span>
                    <h3 className="text-xl font-bold text-white mt-2">{item.title}</h3>
                    <p className="text-white/60 mt-2">{item.description}</p>
                  </div>
                </div>

                {/* Dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-[#fe6004] rounded-full transform -translate-x-1/2 border-4 border-navy" />

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact/Visit Section */}
      <section className="relative py-32 bg-[#fe6004]">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 30px, #000 30px, #000 32px)`
        }} />

        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black uppercase tracking-tight mb-8">
                VISIT US
              </h2>
              
              <div className="space-y-4">
                {[
                  { icon: MapPin, label: 'Location', value: '105 Moo 4, Chaofa Road, T.Wichit, Muang, Phuket 83000' },
                  { icon: Clock, label: 'Hours', value: 'Daily: 10:00 AM - 8:00 PM' },
                  { icon: Phone, label: 'Phone', value: '+66 (0) 93 562 8585' },
                  { icon: Mail, label: 'Email', value: 'support@hanumanluge.com' },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 bg-black/10 backdrop-blur-sm rounded-2xl p-5"
                  >
                    <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-[#fe6004]" />
                    </div>
                    <div>
                      <p className="text-black/60 text-sm font-bold uppercase tracking-wider">{item.label}</p>
                      <p className="text-black font-bold text-lg">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-black rounded-3xl p-10 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', delay: 0.3 }}
                  className="w-24 h-24 bg-[#fe6004] rounded-full flex items-center justify-center mx-auto mb-8"
                >
                  <Zap className="w-12 h-12 text-black" />
                </motion.div>
                
                <h3 className="text-3xl md:text-4xl font-black text-white uppercase mb-4">
                  READY FOR THE RIDE?
                </h3>
                <p className="text-white/60 text-lg mb-8">
                  Book your adventure today and experience the thrill of Phuket&apos;s only luge park!
                </p>
                
                <Link href="/booking">
                  <button className="w-full py-5 bg-[#fe6004] hover:bg-[#ff7a2e] text-black font-black text-lg uppercase tracking-wider rounded-2xl transition-all flex items-center justify-center gap-3 group">
                    BOOK NOW
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </button>
                </Link>

                <p className="text-white/40 text-sm mt-6">
                  No booking fees • Instant confirmation
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bottom Image Banner */}
      <section className="relative h-[50vh] min-h-[400px]">
        <Image
          src="/images/1000/Hanuman Luge 30.jpg"
          alt="Hanuman Luge Experience"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-4">
              SEE YOU ON THE <span className="text-[#fe6004]">TRACK</span>
            </h2>
            <p className="text-white/60 text-xl">The adventure awaits.</p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
