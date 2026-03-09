'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Car, Navigation, ArrowRight } from 'lucide-react';

// Animated Gradient Border Card Component
function GradientBorderCard({ 
  children, 
  className = '', 
  as: Component = 'div',
  href,
  ...props 
}: { 
  children: React.ReactNode; 
  className?: string;
  as?: 'div' | 'a';
  href?: string;
  [key: string]: unknown;
}) {
  const Wrapper = Component as React.ElementType;
  
  return (
    <div className="relative group rounded-2xl p-[2px] overflow-hidden">
      {/* Animated gradient border */}
      <div 
        className="absolute inset-0 rounded-2xl"
        style={{
          background: 'linear-gradient(90deg, #CDFF00, #00E5FF, #FF3366, #8B5CF6, #F97316, #CDFF00)',
          backgroundSize: '300% 100%',
          animation: 'gradient-border-flow 4s linear infinite',
        }}
      />
      {/* Inner content with dark background */}
      <Wrapper 
        href={href}
        className={`relative rounded-2xl bg-navy-light ${className}`}
        {...props}
      >
        {children}
      </Wrapper>
    </div>
  );
}

const contactInfo = [
  {
    icon: MapPin,
    label: 'Address',
    value: '105 Moo 4, Chaofa Road',
    subValue: 'T.Wichit, Muang, Phuket 83000',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+66 (0) 93 562 8585',
    href: 'tel:+66935628585',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'support@hanumanluge.com',
    href: 'mailto:support@hanumanluge.com',
  },
  {
    icon: Clock,
    label: 'Hours',
    value: 'Daily 10:00 AM - 8:00 PM',
    subValue: 'Last admission at 7:00 PM',
  },
];

const distances = [
  { from: 'Patong Beach', time: '25 min' },
  { from: 'Phuket Town', time: '20 min' },
  { from: 'Kata Beach', time: '35 min' },
  { from: 'Airport', time: '45 min' },
];

export function Location() {
  return (
    <section className="relative py-20 lg:py-32 bg-navy overflow-hidden">
      {/* Clean Dark Base */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-[#0d1f35] to-navy" />
      
      {/* Diagonal Racing Stripes - Sporty Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large diagonal stripes */}
        <div className="absolute -top-1/2 -left-1/4 w-[150%] h-[200%] opacity-[0.03]"
          style={{
            background: 'repeating-linear-gradient(45deg, transparent, transparent 80px, #CDFF00 80px, #CDFF00 82px)',
          }}
        />
        {/* Accent diagonal line */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-[20%] -left-10 w-[120%] h-[2px] bg-gradient-to-r from-transparent via-lime/20 to-transparent transform -rotate-6" />
          <div className="absolute top-[80%] -left-10 w-[120%] h-[2px] bg-gradient-to-r from-transparent via-lime/15 to-transparent transform rotate-3" />
        </div>
      </div>
      
      {/* Corner Accent Shapes */}
      <div className="absolute top-0 right-0 w-80 h-80">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-lime/8 to-transparent" 
          style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} 
        />
      </div>
      <div className="absolute bottom-0 left-0 w-80 h-80">
        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-lime/6 to-transparent"
          style={{ clipPath: 'polygon(0 100%, 0 0, 100% 100%)' }}
        />
      </div>
      
      {/* Animated Speed Lines */}
      <div className="speed-line-animated line-2" style={{ top: '25%' }} />
      <div className="speed-line-animated line-4" style={{ top: '75%' }} />
      
      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="badge mb-6 mx-auto">
            <MapPin className="w-4 h-4" />
            Find Us
          </span>
          
          <h2 className="text-display text-white mb-4">
            VISIT <span className="text-lime">HANUMAN LUGE</span>
          </h2>
          
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Located in the heart of Phuket, just minutes from popular tourist areas
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden border border-white/10"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.8!2d98.31!3d7.93!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sHanuman%20Luge!5e0!3m2!1sen!2sth!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale-[70%] contrast-125"
            />
            
            {/* Map Overlay Card */}
            <div className="absolute bottom-6 left-6 right-6 md:right-auto md:max-w-xs p-4 rounded-2xl bg-lime">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-navy flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-lime" />
                </div>
                <div>
                  <h4 className="text-navy font-bold">Hanuman Luge</h4>
                  <p className="text-navy/60 text-sm">Phuket, Thailand</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-4"
          >
            {/* Contact Cards with Animated Gradient Borders */}
            {contactInfo.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {item.href ? (
                  <GradientBorderCard as="a" href={item.href} className="flex items-start gap-4 p-4 group">
                    <div className="w-12 h-12 rounded-xl bg-lime/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-lime" />
                    </div>
                    <div>
                      <div className="text-white/50 text-xs uppercase tracking-wider mb-1">{item.label}</div>
                      <div className="text-white font-medium group-hover:text-lime transition-colors">{item.value}</div>
                    </div>
                  </GradientBorderCard>
                ) : (
                  <GradientBorderCard className="flex items-start gap-4 p-4">
                    <div className="w-12 h-12 rounded-xl bg-lime/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-lime" />
                    </div>
                    <div>
                      <div className="text-white/50 text-xs uppercase tracking-wider mb-1">{item.label}</div>
                      <div className="text-white font-medium">{item.value}</div>
                      {item.subValue && <div className="text-white/50 text-sm">{item.subValue}</div>}
                    </div>
                  </GradientBorderCard>
                )}
              </motion.div>
            ))}

            {/* Distance Info with Animated Gradient Border */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <GradientBorderCard className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Car className="w-5 h-5 text-lime" />
                  <span className="text-white font-medium">Distance From</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {distances.map((d) => (
                    <div key={d.from} className="text-sm">
                      <span className="text-white/50">{d.from}</span>
                      <span className="text-lime font-semibold ml-2">{d.time}</span>
                    </div>
                  ))}
                </div>
              </GradientBorderCard>
            </motion.div>

            {/* Get Directions Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <a
                href="https://maps.app.goo.gl/hanumanluge"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-lime w-full justify-center"
              >
                <Navigation className="w-5 h-5" />
                Get Directions
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
