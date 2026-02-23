'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Container, Section } from '@/components/ui';
import { 
  Shield, 
  Heart, 
  Leaf,
  Award,
  MapPin,
  Clock,
  Phone,
  Mail,
  ArrowRight
} from 'lucide-react';

const stats = [
  { number: '2024', label: 'Established' },
  { number: '50K+', label: 'Happy Visitors' },
  { number: '4', label: 'Luge Tracks' },
  { number: '1.2km', label: 'Total Track Length' },
];

const values = [
  {
    icon: Shield,
    title: 'Safety First',
    description: 'Our equipment meets international safety standards with daily inspections and professional staff training.',
  },
  {
    icon: Leaf,
    title: 'Eco-Friendly',
    description: 'We operate in harmony with nature, supporting local conservation and sustainable tourism.',
  },
  {
    icon: Heart,
    title: 'Passion',
    description: 'Our team is passionate about creating unforgettable adventure experiences for every guest.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'Premier luge park recognized for outstanding service and adventure tourism.',
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-background-light overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/Hero%20Image/Zipline.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-background-light via-transparent to-background-light" />
        
        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              Our Story
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-heading)] text-white mb-6">
              About Hanuman Luge
            </h1>
            <p className="text-lg text-white/70">
              Discover the magic of Phuket&apos;s premier luge adventure park, 
              where thrilling experiences meet stunning panoramic views.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Stats Section */}
      <Section className="bg-background py-16">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-surface rounded-2xl border border-white/5"
              >
                <p className="text-4xl md:text-5xl font-bold text-primary">{stat.number}</p>
                <p className="text-white/60 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Story Section */}
      <Section className="bg-background-light py-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-heading)] text-white mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-white/70">
                <p>
                  Hanuman Luge was born from a dream to create an adventure experience 
                  that brings the excitement of luge racing to Phuket. Since 
                  opening, we have welcomed thousands of visitors from around 
                  the world.
                </p>
                <p>
                  Our park is named after Hanuman, the monkey god from Hindu mythology, 
                  symbolizing strength, courage, and the spirit of adventure. Just like 
                  Hanuman, our guests race down thrilling tracks, experiencing the excitement 
                  of speed with stunning views.
                </p>
                <p>
                  Set in a beautiful location in Phuket, our luge tracks feature 
                  multiple exciting courses with varying difficulty levels. Every element is designed to provide maximum excitement 
                  while ensuring complete safety.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-96 rounded-2xl overflow-hidden border border-white/5"
            >
              <Image
                src="/images/Hero%20Image/Zipline.jpg"
                alt="Hanuman Luge"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Values Section */}
      <Section className="bg-background py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              What We Stand For
            </span>
            <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-heading)] text-white mb-4">
              Our Values
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              At Hanuman Luge, everything we do is guided by our core values
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-surface rounded-2xl border border-white/5 hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">{value.title}</h3>
                <p className="text-sm text-white/60">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Contact Section */}
      <Section className="bg-background-light py-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-heading)] text-white mb-6">
                Visit Us
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-surface rounded-xl border border-white/5">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Location</p>
                    <p className="text-white/60">[ADDRESS]</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-surface rounded-xl border border-white/5">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Opening Hours</p>
                    <p className="text-white/60">Daily: 10:00 AM - 8:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-surface rounded-xl border border-white/5">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Phone</p>
                    <p className="text-white/60">[PHONE NUMBER]</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-surface rounded-xl border border-white/5">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Email</p>
                    <p className="text-white/60">support@hanumanluge.com</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-center lg:text-left p-8 bg-surface rounded-2xl border border-white/5"
            >
              <h3 className="text-2xl font-[family-name:var(--font-heading)] text-white mb-4">
                Ready for an Adventure?
              </h3>
              <p className="text-white/60 text-lg mb-6">
                Book your experience today and race down our exciting tracks!
              </p>
              <Link href="/booking">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-dark text-white font-medium rounded-full transition-all shadow-lg hover:shadow-primary/30"
                >
                  Book Now
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
