'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Clock, 
  Users, 
  ArrowRight, 
  Check, 
  Bus, 
  Utensils,
  Shield,
  Star,
  MapPin,
  Phone,
  Calendar
} from 'lucide-react';
import { Container, Section } from '@/components/ui';
import { getPackageBySlug, packages } from '@/lib/data/packages';
import { formatPrice } from '@/lib/utils';
import { notFound } from 'next/navigation';

const statLabels: Record<string, string> = {
  platforms: 'Platforms',
  ziplines: 'Ziplines',
  skyBridge: 'Sky Bridges',
  abseilPoints: 'Abseil Points',
  canopyWalk: 'Canopy Walk',
  parks: 'Parks',
};

export default function PackagePage() {
  const params = useParams();
  const slug = params.slug as string;
  const pkg = getPackageBySlug(slug);

  if (!pkg) {
    notFound();
  }

  const otherPackages = packages.filter(p => p.id !== pkg.id && p.category !== 'transfer').slice(0, 3);

  return (
    <main className="min-h-screen bg-[#0f0f0f]">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={pkg.image}
            alt={pkg.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent" />
        </div>

        <Container className="relative z-10 py-32">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-white/60 text-sm mb-6"
            >
              <Link href="/" className="hover:text-[#f3c12c] transition-colors">Home</Link>
              <span>/</span>
              <Link href="/packages/fh1" className="hover:text-[#f3c12c] transition-colors">Packages</Link>
              <span>/</span>
              <span className="text-[#f3c12c]">{pkg.name}</span>
            </motion.div>

            {/* Package Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-heading)] text-white mb-6"
            >
              {pkg.name}
            </motion.h1>

            {/* Quick Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#05126f] text-black rounded-full text-sm font-medium">
                <Clock className="w-4 h-4" />
                {pkg.duration}
              </span>
              {pkg.includesTransfer && (
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm">
                  <Bus className="w-4 h-4" />
                  Free Transfer
                </span>
              )}
              {pkg.includesMeal && (
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-sm">
                  <Utensils className="w-4 h-4" />
                  Meal Included
                </span>
              )}
            </motion.div>

            {/* Price & CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
            >
              <div>
                <span className="text-white/60 text-sm">Starting from</span>
                <div className="text-4xl font-bold text-[#f3c12c]">
                  {formatPrice(pkg.price)}
                  <span className="text-lg text-white/60 font-normal"> / person</span>
                </div>
              </div>
              <Link href={`/booking?package=${pkg.id}`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-8 py-4 bg-[#05126f] hover:bg-[#030d52] text-black font-[family-name:var(--font-heading)] text-lg rounded-full transition-all shadow-lg hover:shadow-[#05126f]/30"
                >
                  Book Now
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Package Details */}
      <Section className="py-20">
        <Container>
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-[family-name:var(--font-heading)] text-white mb-4">
                  About This Package
                </h2>
                <p className="text-white/70 text-lg leading-relaxed">
                  {pkg.description}
                </p>
              </motion.div>

              {/* Stats */}
              {pkg.stats && Object.keys(pkg.stats).length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-2xl font-[family-name:var(--font-heading)] text-white mb-6">
                    Package Highlights
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {Object.entries(pkg.stats).map(([key, value]) => (
                      <div 
                        key={key} 
                        className="p-6 bg-[#1a1a1a] rounded-2xl border border-white/10 text-center"
                      >
                        <div className="text-3xl font-bold text-[#f3c12c] mb-2">{value}</div>
                        <div className="text-sm text-white/60 uppercase tracking-wider">
                          {statLabels[key] || key}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-[family-name:var(--font-heading)] text-white mb-6">
                  What&apos;s Included
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {pkg.included.map((item, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-3 p-4 bg-[#1a1a1a] rounded-xl border border-white/10"
                    >
                      <div className="w-8 h-8 bg-[#f3c12c]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-[#f3c12c]" />
                      </div>
                      <span className="text-white/80">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Requirements */}
              {pkg.requirements && pkg.requirements.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-2xl font-[family-name:var(--font-heading)] text-white mb-6">
                    Requirements
                  </h2>
                  <div className="p-6 bg-[#1a1a1a] rounded-2xl border border-white/10">
                    <ul className="space-y-3">
                      {pkg.requirements.map((req, index) => (
                        <li key={index} className="flex items-center gap-3 text-white/70">
                          <Shield className="w-5 h-5 text-[#f3c12c] flex-shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Booking Card */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="p-6 bg-[#05126f] rounded-2xl"
                >
                  <h3 className="text-xl font-[family-name:var(--font-heading)] text-black mb-4">
                    Book This Package
                  </h3>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-black/60">Price per person</span>
                      <span className="text-2xl font-bold text-black">{formatPrice(pkg.price)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-black/60">Duration</span>
                      <span className="text-black font-medium">{pkg.duration}</span>
                    </div>
                    {pkg.includesTransfer && (
                      <div className="flex items-center gap-2 text-black/80">
                        <Check className="w-4 h-4" />
                        <span>Free hotel transfer included</span>
                      </div>
                    )}
                  </div>
                  <Link href={`/booking?package=${pkg.id}`} className="block">
                    <button className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-black hover:bg-[#1a1a1a] text-[#f3c12c] font-[family-name:var(--font-heading)] text-lg rounded-xl transition-all">
                      <Calendar className="w-5 h-5" />
                      Select Date & Book
                    </button>
                  </Link>
                </motion.div>

                {/* Contact Card */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="p-6 bg-[#1a1a1a] rounded-2xl border border-white/10"
                >
                  <h3 className="text-lg font-[family-name:var(--font-heading)] text-white mb-4">
                    Need Help?
                  </h3>
                  <div className="space-y-3">
                    <a 
                      href="tel:+66XXXXXXXX" 
                      className="flex items-center gap-3 text-white/70 hover:text-[#f3c12c] transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                      [PHONE NUMBER]
                    </a>
                    <div className="flex items-start gap-3 text-white/70">
                      <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span>[ADDRESS]</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Other Packages */}
      <Section className="py-20 bg-[#1a1a1a]">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-[family-name:var(--font-heading)] text-white mb-4">
              Explore Other <span className="text-[#f3c12c]">Packages</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Discover more adventure packages at Hanuman Luge
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {otherPackages.map((otherPkg, index) => (
              <motion.div
                key={otherPkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/packages/${otherPkg.slug}`}>
                  <div className="group bg-[#0f0f0f] rounded-2xl overflow-hidden border border-white/10 hover:border-[#f3c12c]/30 transition-all">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={otherPkg.image}
                        alt={otherPkg.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-[family-name:var(--font-heading)] text-white group-hover:text-[#f3c12c] transition-colors">
                          {otherPkg.name}
                        </h3>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[#f3c12c] font-bold text-lg">{formatPrice(otherPkg.price)}</span>
                        <span className="text-white/60 text-sm">{otherPkg.duration}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link href="/booking">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#05126f] hover:bg-[#030d52] text-black font-[family-name:var(--font-heading)] rounded-full transition-all"
              >
                View All Packages
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </Container>
      </Section>
    </main>
  );
}
