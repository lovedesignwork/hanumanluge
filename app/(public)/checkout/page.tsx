'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Calendar, Clock, Users, MapPin, Car, 
  CreditCard, Lock, ShieldCheck, CheckCircle, AlertCircle,
  User, Mail, Phone, ChevronDown, Pencil, Loader2, Tag, X,
  Ticket, Zap, ArrowRight, Shield, Check
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import StripeCardProvider from '@/components/checkout/StripeCardProvider';
import EmbeddedCardForm from '@/components/checkout/EmbeddedCardForm';

const ticketTypes = [
  { id: '1-ride', name: '1 Ride Ticket', price: 790 },
  { id: '2-ride', name: '2 Rides Ticket', price: 890 },
  { id: '3-ride', name: '3 Rides Ticket', price: 990 },
];

const doublingTicket = { id: 'doubling', name: 'Doubling Ride', price: 390 };

const PRIVATE_TRANSFER_PRICE = 2500;

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Parse booking data from URL params
  const ticketsParam = searchParams.get('tickets') || '';
  const date = searchParams.get('date') || '';
  const time = searchParams.get('time') || '';
  const privateTransfer = searchParams.get('privateTransfer') === 'true';
  const hotelName = searchParams.get('hotelName') || '';
  const roomNumber = searchParams.get('roomNumber') || '';

  // Parse tickets from URL (format: "id:qty,id:qty")
  const ticketQuantities = useMemo(() => {
    const result: Record<string, number> = {};
    if (ticketsParam) {
      ticketsParam.split(',').forEach(item => {
        const [id, qty] = item.split(':');
        if (id && qty) {
          result[id] = parseInt(qty);
        }
      });
    }
    return result;
  }, [ticketsParam]);

  // Customer details form
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+66');
  const [specialRequests, setSpecialRequests] = useState('');
  
  // Payment state
  const [isCreatingBooking, setIsCreatingBooking] = useState(false);
  
  // Promo code state
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [promoValidating, setPromoValidating] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{
    id: string;
    code: string;
    description: string | null;
    discount_type: 'percentage' | 'fixed';
    discount_value: number;
    stripe_coupon_id: string | null;
  } | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);

  // Price calculations
  const prices = useMemo(() => {
    let subtotal = 0;
    const lineItems: { name: string; qty: number; price: number }[] = [];

    Object.entries(ticketQuantities).forEach(([ticketId, qty]) => {
      if (qty > 0) {
        const ticket = ticketId === 'doubling' 
          ? doublingTicket 
          : ticketTypes.find(t => t.id === ticketId);
        if (ticket) {
          subtotal += ticket.price * qty;
          lineItems.push({ name: ticket.name, qty, price: ticket.price * qty });
        }
      }
    });

    const transfer = privateTransfer ? PRIVATE_TRANSFER_PRICE : 0;
    
    return {
      subtotal,
      transfer,
      discount: discountAmount,
      total: Math.max(0, subtotal + transfer - discountAmount),
      lineItems,
    };
  }, [ticketQuantities, privateTransfer, discountAmount]);

  const totalTickets = Object.entries(ticketQuantities)
    .filter(([id]) => id !== 'doubling')
    .reduce((sum, [, qty]) => sum + qty, 0);

  // Format date for display
  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-').map(Number);
    const dateObj = new Date(year, month - 1, day);
    return dateObj.toLocaleDateString('en-US', { 
      weekday: 'short',
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Format time for display
  const formatTime = (timeString: string) => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${String(minutes).padStart(2, '0')} ${period}`;
  };

  // Form validation
  const isCustomerFormValid = useMemo(() => {
    const emailValid = Boolean(email && email.includes('@'));
    const phoneValid = phone.length >= 8;
    const nameValid = Boolean(firstName.trim() && lastName.trim());
    return emailValid && phoneValid && nameValid;
  }, [email, phone, firstName, lastName]);

  // Validate promo code
  const validatePromoCode = async () => {
    if (!promoCodeInput.trim()) return;
    
    setPromoValidating(true);
    setPromoError('');
    
    try {
      const response = await fetch('/api/checkout/validate-promo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: promoCodeInput.trim(),
          orderTotal: prices.subtotal + prices.transfer,
        }),
      });
      
      const data = await response.json();
      
      if (data.valid) {
        setAppliedPromo(data.promoCode);
        setDiscountAmount(data.discountAmount);
        setPromoCodeInput('');
      } else {
        setPromoError(data.error || 'Invalid promo code');
      }
    } catch {
      setPromoError('Failed to validate promo code');
    } finally {
      setPromoValidating(false);
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    setDiscountAmount(0);
    setPromoError('');
  };

  // Create booking and payment intent
  const handleCreateBookingAndPay = async (): Promise<{ clientSecret: string; bookingRef: string } | null> => {
    if (!isCustomerFormValid) return null;
    
    setIsCreatingBooking(true);
    
    try {
      const response = await fetch('/api/checkout/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tickets: ticketQuantities,
          date,
          time,
          privateTransfer,
          hotelName,
          roomNumber,
          promoCodeId: appliedPromo?.id || null,
          discountAmount: discountAmount,
          customer: {
            firstName,
            lastName,
            email,
            phone,
            countryCode,
            specialRequests,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Server error (${response.status})`);
      }

      if (data.clientSecret) {
        return {
          clientSecret: data.clientSecret,
          bookingRef: data.bookingRef,
        };
      } else {
        throw new Error(data.error || 'Failed to create payment');
      }
    } catch (error) {
      console.error('Booking creation error:', error);
      throw error;
    } finally {
      setIsCreatingBooking(false);
    }
  };

  // Redirect if no tickets
  const hasTickets = Object.values(ticketQuantities).some(qty => qty > 0);
  
  if (!hasTickets) {
    return (
      <main className="min-h-screen bg-navy flex items-center justify-center px-4">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-[#fe6004] mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-4">No Booking Found</h1>
          <p className="text-white/60 mb-8">Please select your tickets first.</p>
          <Link href="/booking">
            <button className="px-8 py-3 bg-[#fe6004] hover:bg-[#ff7a2e] text-white font-bold rounded-xl transition-colors">
              Go to Booking
            </button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-navy">
      {/* ── HERO BANNER ── */}
      <section className="relative h-[30vh] min-h-[260px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/1000/Hanuman Luge 15.jpg"
            alt="Checkout"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/50 to-navy" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-transparent to-navy/80" />
        </div>

        {/* Racing stripes */}
        <div className="absolute inset-0 opacity-[0.08]" style={{
          backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 50px, #fe6004 50px, #fe6004 52px)`
        }} />

        {/* Speed lines */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-[1px] bg-gradient-to-r from-transparent via-[#fe6004]/30 to-transparent"
              style={{ top: `${30 + i * 20}%`, left: '-100%', width: '200%' }}
              animate={{ x: ['0%', '50%'] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: 'linear', delay: i * 0.5 }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-4"
          >
            <div className="h-[2px] w-8 bg-[#fe6004]" />
            <span className="text-[#fe6004] text-sm font-bold uppercase tracking-[0.3em]">
              Secure Checkout
            </span>
            <div className="h-[2px] w-8 bg-[#fe6004]" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 100 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-white leading-none mb-4"
          >
            COMPLETE YOUR <span className="text-[#fe6004] italic">BOOKING</span>
          </motion.h1>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-navy to-transparent" />
      </section>

      {/* ── BACK LINK ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
        <Link href="/booking" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" />
          Back to Booking
        </Link>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 pb-32">
        <div className="grid lg:grid-cols-5 gap-8">
          
          {/* Left Column - Forms (3/5) */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Booking Summary Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-lime rounded-2xl overflow-hidden"
            >
              <div className="px-6 py-4 flex items-center justify-between">
                <h2 className="text-lg font-black text-black flex items-center gap-2 uppercase">
                  <Ticket className="w-5 h-5" />
                  Your Booking
                </h2>
                <Link 
                  href="/booking"
                  className="flex items-center gap-1.5 text-sm text-black/60 hover:text-black transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                  Edit
                </Link>
              </div>
              <div className="bg-white p-6">
                {/* Tickets */}
                <div className="space-y-3 mb-4">
                  {prices.lineItems.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-lime/20 flex items-center justify-center">
                          <Ticket className="w-5 h-5 text-[#fe6004]" />
                        </div>
                        <div>
                          <span className="font-semibold text-slate-800">{item.name}</span>
                          <span className="text-slate-500 text-sm ml-2">× {item.qty}</span>
                        </div>
                      </div>
                      <span className="font-bold text-slate-800">฿{item.price.toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                {/* Date & Time */}
                <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Calendar className="w-4 h-4 text-[#fe6004]" />
                    <span className="text-sm font-medium">{formatDisplayDate(date)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock className="w-4 h-4 text-[#fe6004]" />
                    <span className="text-sm font-medium">{formatTime(time)}</span>
                  </div>
                </div>

                {/* Transfer */}
                {privateTransfer && (
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#fe6004]/10 flex items-center justify-center">
                        <Car className="w-5 h-5 text-[#fe6004]" />
                      </div>
                      <div>
                        <span className="font-semibold text-slate-800">Private Transfer</span>
                        {hotelName && (
                          <p className="text-sm text-slate-500">{hotelName}{roomNumber ? `, Room ${roomNumber}` : ''}</p>
                        )}
                      </div>
                      <span className="ml-auto font-bold text-slate-800">฿{PRIVATE_TRANSFER_PRICE.toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Player Details Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-lime rounded-2xl overflow-hidden"
            >
              <div className="px-6 py-4">
                <h2 className="text-lg font-black text-black flex items-center gap-2 uppercase">
                  <User className="w-5 h-5" />
                  Contact Details
                </h2>
              </div>
              <div className="bg-white p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">First Name *</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="John"
                      className="w-full h-12 px-4 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-[#fe6004] transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name *</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Doe"
                      className="w-full h-12 px-4 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-[#fe6004] transition-colors"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address *</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full h-12 pl-12 pr-4 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-[#fe6004] transition-colors"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number *</label>
                  <div className="flex gap-3">
                    <div className="relative w-28">
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="w-full h-12 px-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-[#fe6004] appearance-none cursor-pointer transition-colors"
                      >
                        <option value="+66">+66</option>
                        <option value="+1">+1</option>
                        <option value="+44">+44</option>
                        <option value="+61">+61</option>
                        <option value="+81">+81</option>
                        <option value="+82">+82</option>
                        <option value="+86">+86</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                    <div className="relative flex-grow">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        placeholder="812345678"
                        className="w-full h-12 pl-12 pr-4 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-[#fe6004] transition-colors"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Special Requests (Optional)</label>
                  <textarea
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="Any special requirements or requests..."
                    rows={3}
                    className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-[#fe6004] resize-none transition-colors"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Payment (2/5) */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl overflow-hidden shadow-xl sticky top-24"
            >
              {/* Header */}
              <div className="px-6 py-4 bg-lime">
                <h2 className="text-lg font-black text-black uppercase flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment
                </h2>
              </div>
              
              <div className="p-6">
                {/* Order Summary */}
                <div className="space-y-3 text-sm mb-6">
                  {prices.lineItems.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-slate-500">{item.name} × {item.qty}</span>
                      <span className="font-semibold text-slate-800">฿{item.price.toLocaleString()}</span>
                    </div>
                  ))}
                  
                  {prices.transfer > 0 && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Private Transfer</span>
                      <span className="font-semibold text-slate-800">฿{prices.transfer.toLocaleString()}</span>
                    </div>
                  )}
                  
                  {/* Promo Code Section */}
                  <div className="border-t border-slate-200 pt-4 mt-4">
                    {appliedPromo ? (
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-200">
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4 text-green-600" />
                          <div>
                            <span className="font-semibold text-green-700">{appliedPromo.code}</span>
                            <p className="text-xs text-green-600">
                              {appliedPromo.discount_type === 'percentage' 
                                ? `${appliedPromo.discount_value}% off` 
                                : `฿${appliedPromo.discount_value.toLocaleString()} off`}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={removePromoCode}
                          className="p-1 text-green-600 hover:bg-green-100 rounded transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={promoCodeInput}
                            onChange={(e) => setPromoCodeInput(e.target.value.toUpperCase())}
                            placeholder="Promo code"
                            className="flex-1 px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm text-slate-800 uppercase placeholder:normal-case placeholder:text-slate-400 focus:outline-none focus:border-[#fe6004] transition-colors"
                            onKeyDown={(e) => e.key === 'Enter' && validatePromoCode()}
                          />
                          <button
                            onClick={validatePromoCode}
                            disabled={promoValidating || !promoCodeInput.trim()}
                            className="px-4 py-3 bg-slate-100 text-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            {promoValidating ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Apply'}
                          </button>
                        </div>
                        {promoError && (
                          <p className="text-red-500 text-xs mt-2">{promoError}</p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Discount */}
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span className="font-semibold">-฿{discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  
                  {/* Total */}
                  <div className="border-t border-slate-200 pt-4 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 uppercase tracking-wider text-xs">Total</span>
                      <span className="text-3xl font-black text-[#fe6004]">
                        ฿{prices.total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Payment Form */}
                <div className="pt-6 border-t border-slate-200">
                  <h3 className="text-slate-800 mb-4 flex items-center gap-2 font-semibold">
                    <Lock className="w-4 h-4 text-[#fe6004]" />
                    Card Details
                  </h3>
                  
                  <StripeCardProvider>
                    <EmbeddedCardForm
                      amount={prices.total}
                      isCustomerFormValid={isCustomerFormValid}
                      onSubmit={handleCreateBookingAndPay}
                      isCreatingBooking={isCreatingBooking}
                    />
                  </StripeCardProvider>
                  
                  <div className="flex items-center gap-2 p-3 bg-green-50 rounded-xl border border-green-200 mt-4">
                    <ShieldCheck className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-xs text-green-700">256-bit SSL encrypted payment</span>
                  </div>
                </div>
                
                {/* Trust badges */}
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <div className="flex items-center justify-center gap-6 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Shield className="w-4 h-4" />
                      Secure
                    </span>
                    <span className="flex items-center gap-1">
                      <Lock className="w-4 h-4" />
                      SSL
                    </span>
                    <span className="flex items-center gap-1">
                      <Check className="w-4 h-4" />
                      Verified
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-navy flex items-center justify-center">
        <div className="w-10 h-10 border-3 border-white/20 border-t-[#fe6004] rounded-full animate-spin" />
      </main>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
