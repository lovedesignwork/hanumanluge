'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ChevronDown, Search, MessageCircle, ArrowRight } from 'lucide-react';
import { FAQSchema } from '@/lib/seo/structured-data';

const faqCategories = [
  {
    id: 'general',
    category: 'General',
    questions: [
      {
        question: 'What is luge?',
        answer: 'Luge is a gravity-powered ride where you sit in a wheeled cart and race down a specially designed track. You control your speed using simple handlebars - pull back to brake, release to go faster. It\'s fun for all ages and skill levels!',
      },
      {
        question: 'What are the opening hours?',
        answer: 'We are open daily from 10:00 AM to 8:00 PM. Last admission is at 7:00 PM. We recommend arriving at least 15 minutes before your scheduled time.',
      },
      {
        question: 'Where are you located?',
        answer: 'We are located in Phuket, Thailand. We offer complimentary hotel pickup from major tourist areas including Patong, Kata, Karon, and Phuket Town.',
      },
    ],
  },
  {
    id: 'booking',
    category: 'Booking & Reservations',
    questions: [
      {
        question: 'How do I book a luge experience?',
        answer: 'You can book directly through our website by selecting your preferred package, date, and time. Simply click the "Reserve Now" button, fill in your details, and complete the payment. You will receive a confirmation email immediately after booking.',
      },
      {
        question: 'Can I modify or cancel my booking?',
        answer: 'Bookings can be modified or cancelled up to 24 hours before your scheduled activity. Please contact our customer service team for assistance. Cancellations made within 24 hours of the activity are non-refundable.',
      },
      {
        question: 'Do I need to print my booking confirmation?',
        answer: 'No, you can show your booking confirmation on your mobile device. Just present your booking reference number or the QR code from your confirmation email.',
      },
      {
        question: 'Is hotel pickup included?',
        answer: 'Yes! Most packages include complimentary hotel pickup and drop-off within the main Phuket tourist areas (Patong, Kata, Karon, Phuket Town). Private transfer options are also available for other locations.',
      },
    ],
  },
  {
    id: 'safety',
    category: 'Safety & Requirements',
    questions: [
      {
        question: 'What are the height and age requirements?',
        answer: 'Riders must be at least 110cm tall to ride alone. Children under 110cm can ride with an adult in a tandem cart. Minimum age is 6 years old with adult supervision.',
      },
      {
        question: 'Is the luge safe for beginners?',
        answer: 'Absolutely! The luge is designed for all skill levels. Our staff provides a safety briefing and instructions before your ride. The luge has simple controls - pull back to brake, release to go.',
      },
      {
        question: 'What safety equipment is provided?',
        answer: 'We provide helmets for all riders. The luge carts are designed with safety features including easy-to-use braking systems. All equipment meets international safety standards.',
      },
      {
        question: 'Can pregnant women participate?',
        answer: 'Unfortunately, pregnant women cannot participate in luge activities for safety reasons. However, they can enjoy our viewing areas and restaurant.',
      },
    ],
  },
  {
    id: 'experience',
    category: 'The Experience',
    questions: [
      {
        question: 'How long does the activity take?',
        answer: 'Duration depends on your chosen package. Each luge ride takes approximately 5-10 minutes. Packages include multiple rides. Please arrive 15 minutes before your scheduled time.',
      },
      {
        question: 'What should I wear?',
        answer: 'Wear comfortable clothing that allows freedom of movement. Closed-toe shoes are required (sneakers or sports shoes recommended). Avoid loose jewelry, scarves, or anything that could get caught.',
      },
      {
        question: 'Can I bring my camera or phone?',
        answer: 'For safety reasons, we recommend securing phones and cameras in your pocket or leaving them in the lockers provided. We also offer professional photo packages.',
      },
      {
        question: 'Is there food available at the park?',
        answer: 'Yes! We have a restaurant serving Thai and international cuisine. Some packages include a complimentary meal. There are also refreshment areas throughout the park.',
      },
    ],
  },
  {
    id: 'pricing',
    category: 'Packages & Pricing',
    questions: [
      {
        question: 'What is included in each package?',
        answer: 'Each package includes safety equipment, professional guidance, insurance, and transfer (where specified). Packages vary in the number of rides and whether meals are included. Check each package description for details.',
      },
      {
        question: 'Are there discounts for groups?',
        answer: 'Yes, we offer special rates for groups of 10 or more. Please contact us directly for group pricing and availability.',
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards (Visa, Mastercard, American Express) through our secure Stripe payment gateway. Payment is in Thai Baht.',
      },
      {
        question: 'Do you offer refunds for bad weather?',
        answer: 'Yes, if we cancel due to severe weather conditions, you will receive a full refund or can reschedule to another date. Light rain does not typically affect operations.',
      },
    ],
  },
  {
    id: 'birthday',
    category: 'Birthday Parties',
    questions: [
      {
        question: 'Can I bring my own cake and snacks?',
        answer: 'Yes! You can bring your own cake, snacks, and decorations for your party. We provide tables, chairs, and a designated party area.',
      },
      {
        question: 'How do birthday parties work?',
        answer: 'Birthday parties have a maximum duration of 2.5 hours and start at the agreed time. You need a minimum of 10 paying guests. We have slots at 10:00, 11:30, 14:00, and 15:30.',
      },
      {
        question: 'What birthday packages are available?',
        answer: 'We offer Basic (up to 10 guests), Premium (up to 15 guests), and Ultimate (up to 25 guests) packages. Each includes rides, party area, and various extras. Contact us for details.',
      },
    ],
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 text-left group"
      >
        <span className="font-medium text-white pr-4 group-hover:text-primary transition-colors">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-primary transition-transform flex-shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-white/60">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredCategories = faqCategories
    .map((cat) => ({
      ...cat,
      questions: cat.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter(
      (cat) =>
        cat.questions.length > 0 &&
        (activeCategory === 'all' || cat.id === activeCategory)
    );

  const allFAQs = useMemo(() => 
    faqCategories.flatMap(cat => cat.questions),
    []
  );

  return (
    <main className="min-h-screen bg-[#0f1419]">
      <FAQSchema faqs={allFAQs} />
      
      {/* Hero Section */}
      <section className="relative py-24 bg-surface overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/Hero%20Image/Zipline.jpg')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-transparent to-surface" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              Help Center
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-heading)] text-white mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-white/70 mb-8">
              Find answers to common questions about your Hanuman Luge adventure
            </p>

            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for answers..."
                className="w-full pl-12 pr-4 py-4 bg-background-light border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeCategory === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-surface text-white/60 hover:text-white border border-white/10'
              }`}
            >
              All Topics
            </button>
            {faqCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-primary text-white'
                    : 'bg-surface text-white/60 hover:text-white border border-white/10'
                }`}
              >
                {cat.category}
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="max-w-3xl mx-auto space-y-6">
            {filteredCategories.map((category) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-surface rounded-2xl p-6 border border-white/5"
              >
                <h2 className="text-lg font-semibold text-primary mb-4">
                  {category.category}
                </h2>
                <div>
                  {category.questions.map((item) => (
                    <FAQItem
                      key={item.question}
                      question={item.question}
                      answer={item.answer}
                    />
                  ))}
                </div>
              </motion.div>
            ))}

            {filteredCategories.length === 0 && (
              <div className="text-center py-12">
                <p className="text-white/60">No questions found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl mx-auto text-center"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-[family-name:var(--font-heading)] text-white mb-4">
              Still have questions?
            </h2>
            <p className="text-white/60 mb-6">
              Can&apos;t find the answer you&apos;re looking for? Our friendly team is here to help.
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-light text-white font-semibold rounded-xl transition-all shadow-lg shadow-primary/25"
              >
                Contact Us
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
