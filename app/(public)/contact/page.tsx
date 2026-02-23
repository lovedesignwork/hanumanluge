'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Container, Section } from '@/components/ui';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  MessageCircle,
  Facebook,
  Instagram,
  Loader2,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setSent(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSent(false), 10000);
    } catch (err) {
      console.error('Contact form error:', err);
      setError(err instanceof Error ? err.message : 'Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="min-h-screen bg-[#0f1419]">
      {/* Hero Section */}
      <section className="relative py-24 bg-surface overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/Hero%20Image/Zipline.jpg')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-transparent to-surface" />
        
        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              Get in Touch
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-heading)] text-white mb-6">
              Contact Us
            </h1>
            <p className="text-lg text-white/70">
              Have a question or need assistance? We&apos;re here to help!
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Contact Section */}
      <Section className="bg-[#0f1419] py-20">
        <Container>
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-[family-name:var(--font-heading)] text-white mb-6">
                  Get in Touch
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-surface rounded-xl border border-white/5">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Location</p>
                      <p className="text-white/60 text-sm">
                        [ADDRESS LINE 1]<br />
                        [ADDRESS LINE 2]<br />
                        Thailand
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-surface rounded-xl border border-white/5">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Phone</p>
                      <a href="tel:+66XXXXXXXX" className="text-primary hover:underline">
                        [PHONE NUMBER]
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-surface rounded-xl border border-white/5">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Email</p>
                      <a href="mailto:support@hanumanluge.com" className="text-primary hover:underline">
                        support@hanumanluge.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-surface rounded-xl border border-white/5">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Operating Hours</p>
                      <p className="text-white/60 text-sm">
                        Daily: 10:00 AM - 8:00 PM
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 mt-6">
                  <p className="font-medium text-white mb-4">Follow Us</p>
                  <div className="flex gap-3">
                    <a
                      href="https://facebook.com/hanumanluge"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-surface border border-white/10 hover:bg-primary hover:border-primary rounded-lg flex items-center justify-center transition-all group"
                    >
                      <Facebook className="w-5 h-5 text-white" />
                    </a>
                    <a
                      href="https://instagram.com/hanumanluge"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-surface border border-white/10 hover:bg-primary hover:border-primary rounded-lg flex items-center justify-center transition-all group"
                    >
                      <Instagram className="w-5 h-5 text-white" />
                    </a>
                    <a
                      href="https://wa.me/66XXXXXXXX"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-surface border border-white/10 hover:bg-primary hover:border-primary rounded-lg flex items-center justify-center transition-all group"
                    >
                      <MessageCircle className="w-5 h-5 text-white" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="bg-surface rounded-2xl p-8 border border-white/5">
                <h2 className="text-2xl font-[family-name:var(--font-heading)] text-white mb-6">
                  Send us a Message
                </h2>

                {sent && (
                  <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <div>
                      <p className="text-green-400 font-medium">Thank you! Your message has been sent successfully.</p>
                      <p className="text-green-400/70 text-sm">We&apos;ll get back to you within 24-48 hours.</p>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <p className="text-red-400">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-background-light border border-white/10 rounded-xl focus:outline-none focus:border-primary transition-colors text-white placeholder:text-white/40"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-background-light border border-white/10 rounded-xl focus:outline-none focus:border-primary transition-colors text-white placeholder:text-white/40"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-background-light border border-white/10 rounded-xl focus:outline-none focus:border-primary transition-colors text-white placeholder:text-white/40"
                        placeholder="+66 XX XXX XXXX"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">
                        Subject *
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-background-light border border-white/10 rounded-xl focus:outline-none focus:border-primary transition-colors text-white"
                      >
                        <option value="">Select a topic</option>
                        <option value="booking">Booking Inquiry</option>
                        <option value="modification">Booking Modification</option>
                        <option value="cancellation">Cancellation Request</option>
                        <option value="group">Group Booking</option>
                        <option value="general">General Question</option>
                        <option value="feedback">Feedback</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-background-light border border-white/10 rounded-xl focus:outline-none focus:border-primary transition-colors resize-none text-white placeholder:text-white/40"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={sending}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary hover:bg-primary-dark text-white font-medium rounded-xl transition-colors disabled:opacity-50"
                  >
                    {sending ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Map Section */}
      <Section className="bg-surface p-0 h-96">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.8!2d98.31!3d7.93!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sHanuman%20Luge!5e0!3m2!1sen!2sth!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Hanuman Luge Location"
        />
      </Section>
    </main>
  );
}
