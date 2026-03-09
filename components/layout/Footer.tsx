'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';

const quickLinks = [
  { name: 'Activities', href: '/#activities' },
  { name: 'Pricing', href: '/#pricing' },
  { name: 'About Us', href: '/about' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Contact', href: '/contact' },
];

const legalLinks = [
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms & Conditions', href: '/terms' },
  { name: 'Refund Policy', href: '/refund' },
];

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/hanumanluge' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/hanumanluge' },
  { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/hanumanluge' },
];

const marqueeTexts = [
  "PHUKET'S FIRST AND ONLY LUGE PARK",
  "RIDE TOGETHER",
  "2 AWESOME TRACKS",
  "THRILL EXPERIENCES",
  "FUN & JOY ACTIVITY",
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Marquee Banner */}
      <div className="bg-lime py-4 overflow-hidden">
        <div className="marquee-content whitespace-nowrap">
          {[...Array(3)].map((_, i) => (
            <span key={i} className="inline-flex items-center">
              {marqueeTexts.map((text, j) => (
                <span key={j} className="inline-flex items-center mx-6 text-navy font-black text-xl lg:text-2xl uppercase tracking-wider">
                  {text}
                  <span className="mx-6 text-navy/40">★</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-16 lg:py-24">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/1000/Hanuman Luge 10.jpg"
            alt="Adventure background"
            fill
            className="object-cover"
          />
          {/* Sporty Dark Blue Overlay */}
          <div className="absolute inset-0 bg-[#0A1628]/85" />
          {/* Diagonal Racing Lines */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 20px,
              rgba(255,255,255,0.1) 20px,
              rgba(255,255,255,0.1) 22px
            )`
          }} />
        </div>
        <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <span className="badge mb-4">
                <Sparkles className="w-4 h-4" />
                Stay Inspired
              </span>
              <h3 className="text-3xl lg:text-5xl font-display font-black text-white">
                READY FOR<br />
                <span className="text-lime">ADVENTURE?</span>
              </h3>
            </div>
            <Link href="/booking">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-lime text-lg py-5 px-10 group"
              >
                Book Now
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </motion.button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-navy py-16">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <Link href="/" className="inline-block mb-6">
                <Image
                  src="/images/logo-luge-new.png"
                  alt="Hanuman Luge"
                  width={160}
                  height={60}
                  className="h-12 w-auto brightness-0 invert"
                />
              </Link>
              <p className="text-white/50 mb-6 text-sm leading-relaxed">
                Experience the thrill of racing down Phuket&apos;s most exciting luge tracks. 
                Fun for the whole family!
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-lime hover:border-lime hover:text-navy transition-all group"
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5 text-white/60 group-hover:text-navy transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/50 hover:text-lime transition-colors text-sm inline-flex items-center gap-2 group"
                    >
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6">
                Contact Us
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-lime flex-shrink-0 mt-0.5" />
                  <span className="text-white/50 text-sm">
                    105 Moo 4, Chaofa Road<br />
                    T.Wichit, Muang, Phuket 83000
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-lime flex-shrink-0" />
                  <a href="tel:+66935628585" className="text-white/50 hover:text-lime transition-colors text-sm">
                    +66 (0) 93 562 8585
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-lime flex-shrink-0" />
                  <a href="mailto:support@hanumanluge.com" className="text-white/50 hover:text-lime transition-colors text-sm">
                    support@hanumanluge.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Hours & Legal */}
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6">
                Opening Hours
              </h4>
              <div className="p-4 rounded-2xl bg-lime mb-6">
                <div className="text-navy font-bold text-sm mb-2">2026 Schedule</div>
                <div className="text-sm">
                  <div className="flex justify-between text-navy/70">
                    <span>Daily</span>
                    <span className="font-semibold text-navy">10:00 - 20:00</span>
                  </div>
                </div>
              </div>
              
              {/* Legal Links */}
              <ul className="space-y-2">
                {legalLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/40 hover:text-white/60 transition-colors text-xs"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-navy border-t border-white/5">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} SKY LUGE ADVENTURE Co., Ltd. All rights reserved.
            </p>
            <p className="text-white/40 text-sm text-center md:text-right">
              Payments by{' '}
              <a 
                href="https://onebooking.co" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-lime hover:underline"
              >
                ONEBOOKING
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
