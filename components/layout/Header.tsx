'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Activities', href: '/#activities' },
  { name: 'Pricing', href: '/#pricing' },
  { name: 'About', href: '/about' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Contact', href: '/contact' },
];

const NON_STICKY_ROUTES = ['/booking', '/checkout'];

export function Header() {
  const pathname = usePathname();
  const isNonStickyRoute = NON_STICKY_ROUTES.some(route => pathname?.startsWith(route));
  const sticky = !isNonStickyRoute;
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`${sticky ? 'sticky' : 'relative'} top-0 left-0 right-0 z-50`}
    >
      {/* Top Bar - Dark blue with sporty light blue diagonal lines */}
      <div className="hidden lg:block relative bg-[#0A1628] overflow-hidden">
        {/* Diagonal stripes background - light blue */}
        <div 
          className="absolute inset-0 opacity-[0.15]"
          style={{
            background: 'repeating-linear-gradient(135deg, transparent, transparent 10px, #0ea5e9 10px, #0ea5e9 11px)',
          }}
        />
        <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-10 text-sm">
            <span className="text-lime font-bold uppercase tracking-wider">
              PHUKET&apos;S FIRST AND ONLY LUGE PARK
            </span>
          </div>
        </div>
      </div>

      {/* Main Header - White with sporty diagonal lines */}
      <div className="relative bg-white shadow-md overflow-hidden">
        {/* Subtle diagonal stripes */}
        <div 
          className="absolute inset-0 opacity-[0.08]"
          style={{
            background: 'repeating-linear-gradient(135deg, transparent, transparent 20px, #0ea5e9 20px, #0ea5e9 21px)',
          }}
        />
        
        <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo-luge-new.png"
                alt="Hanuman Luge"
                width={180}
                height={60}
                className="h-12 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-5 py-2.5 font-display uppercase tracking-wide transition-all rounded-lg ${
                    pathname === item.href 
                      ? 'text-white bg-[#fe6004]' 
                      : 'text-[#0A1628] hover:text-[#fe6004] hover:bg-[#fe6004]/10'
                  }`}
                  style={{ fontSize: '15px', fontWeight: 600 }}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <Link href="/booking">
                <button className="bg-[#fe6004] text-white px-6 py-3 rounded-xl font-bold uppercase tracking-wide flex items-center gap-2 hover:bg-[#ff7a2e] transition-all group">
                  Buy Ticket
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-3 lg:hidden">
              <Link href="/booking">
                <button className="bg-[#fe6004] text-white text-sm py-2 px-4 rounded-lg font-bold">
                  Buy Ticket
                </button>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-[#0A1628] p-2"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 shadow-lg"
          >
            <nav className="px-4 py-6 space-y-2">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-between py-3 px-4 rounded-xl transition-colors ${
                      pathname === item.href 
                        ? 'bg-[#0A1628] text-white' 
                        : 'text-[#0A1628] hover:bg-[#0ea5e9]/10'
                    }`}
                  >
                    <span className="text-lg font-display font-semibold uppercase tracking-wide">{item.name}</span>
                    {pathname === item.href && (
                      <div className="w-2 h-2 bg-[#0ea5e9] rounded-full" />
                    )}
                  </Link>
                </motion.div>
              ))}
              
              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-4 mt-4 border-t border-gray-100"
              >
                <Link href="/booking" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="w-full bg-[#0A1628] text-white py-4 rounded-xl font-bold uppercase tracking-wide flex items-center justify-center gap-2">
                    Book Your Adventure
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
