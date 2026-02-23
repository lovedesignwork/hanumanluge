'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  CheckCircle, Calendar, Clock, Users, MapPin, Mail, Phone, Car, 
  ChevronRight, Ticket, Zap, Shield, ArrowRight
} from 'lucide-react';

interface BookingAddon {
  id: string;
  quantity: number;
  unit_price: number;
  addon_name?: string | null;
  promo_addons?: {
    id: string;
    name: string;
  } | null;
}

interface BookingData {
  id: string;
  booking_ref: string;
  activity_date: string;
  time_slot: string;
  guest_count: number;
  total_amount: number;
  currency: string;
  packages: {
    name: string;
    slug: string;
  } | null;
  booking_customers: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  } | {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  }[];
  booking_addons: BookingAddon[];
  booking_transport: {
    transport_type: string;
    hotel_name: string | null;
    room_number: string | null;
    non_players: number;
    private_passengers: number;
  } | {
    transport_type: string;
    hotel_name: string | null;
    room_number: string | null;
    non_players: number;
    private_passengers: number;
  }[] | null;
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const bookingRef = searchParams.get('booking_ref');
  const paymentIntent = searchParams.get('payment_intent');
  
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      if (!bookingRef || !paymentIntent) {
        setError('Invalid booking link');
        setLoading(false);
        return;
      }
      
      try {
        const response = await fetch(`/api/bookings/${bookingRef}?payment_intent=${paymentIntent}`);
        if (response.ok) {
          const data = await response.json();
          setBooking(data);
        } else if (response.status === 401) {
          setError('This booking confirmation link is not valid or has expired.');
        } else {
          setError('Booking not found');
        }
      } catch (err) {
        console.error('Error fetching booking:', err);
        setError('Failed to load booking details');
      }
      setLoading(false);
    };

    fetchBookingDetails();
  }, [bookingRef, paymentIntent]);

  const formatCurrency = (amount: number) => {
    if (isNaN(amount) || amount === null || amount === undefined) return '฿0';
    return `฿${amount.toLocaleString()}`;
  };

  const getCustomer = () => {
    if (!booking?.booking_customers) return null;
    return Array.isArray(booking.booking_customers) 
      ? booking.booking_customers[0] 
      : booking.booking_customers;
  };

  const getTransport = () => {
    if (!booking?.booking_transport) return null;
    return Array.isArray(booking.booking_transport) 
      ? booking.booking_transport[0] 
      : booking.booking_transport;
  };

  const customer = getCustomer();
  const transport = getTransport();
  const hasTransfer = transport && transport.transport_type === 'private';

  if (error) {
    return (
      <main className="min-h-screen bg-navy relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 50px, #fe6004 50px, #fe6004 52px)`
        }} />
        
        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center"
          >
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-red-500" />
            </div>
            <h1 className="text-2xl font-black text-navy uppercase mb-3">Access Denied</h1>
            <p className="text-slate-600 mb-8">{error}</p>
            <Link href="/">
              <button className="w-full py-4 bg-[#fe6004] hover:bg-[#ff7a2e] text-white font-black rounded-2xl transition-all uppercase tracking-wider">
                Back to Home
              </button>
            </Link>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-navy relative overflow-hidden">
      {/* Hero Banner */}
      <section className="relative h-[35vh] min-h-[280px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/1000/Hanuman Luge 12.jpg"
            alt="Success"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/40 to-navy" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/70 via-transparent to-navy/70" />
        </div>

        {/* Racing stripes */}
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 50px, #fe6004 50px, #fe6004 52px)`
        }} />

        {/* Speed lines */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-[1px] bg-gradient-to-r from-transparent via-[#fe6004]/40 to-transparent"
              style={{ top: `${20 + i * 20}%`, left: '-100%', width: '200%' }}
              animate={{ x: ['0%', '50%'] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: 'linear', delay: i * 0.3 }}
            />
          ))}
        </div>

        {/* Success Icon */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', duration: 0.8 }}
            className="w-24 h-24 bg-[#fe6004] rounded-full flex items-center justify-center shadow-2xl mb-4"
          >
            <CheckCircle className="w-14 h-14 text-white" />
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="relative z-10 max-w-lg mx-auto px-4 -mt-8 pb-12">
        {/* Success Header Card - ORANGE BACKGROUND */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#fe6004] rounded-3xl p-6 text-center mb-6 shadow-2xl border-4 border-[#fe6004]/30"
        >
          <h1 className="text-3xl font-black text-black uppercase tracking-tight mb-2">
            BOOKING CONFIRMED!
          </h1>
          {customer && (
            <p className="text-black/70 text-lg">
              Thank you, <span className="font-black text-black">{customer.first_name}</span>!
            </p>
          )}
          
          {/* Booking Reference Badge */}
          <div className="mt-5 bg-black rounded-2xl px-6 py-4 inline-block">
            <span className="text-[#fe6004]/80 text-xs font-bold uppercase tracking-widest block mb-1">Booking Reference</span>
            <span className="text-3xl font-black text-white tracking-wider">{bookingRef}</span>
          </div>
          
          {customer?.email && (
            <p className="text-black/60 text-sm mt-4">
              Confirmation sent to <span className="font-bold text-black">{customer.email}</span>
            </p>
          )}
        </motion.div>

        {!loading && booking && (
          <>
            {/* Booking Details Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl shadow-xl overflow-hidden mb-6"
            >
              {/* Details Grid */}
              <div className="p-6">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="w-14 h-14 bg-[#fe6004]/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <Calendar className="w-7 h-7 text-[#fe6004]" />
                    </div>
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Date</p>
                    <p className="text-lg font-black text-navy">
                      {new Date(booking.activity_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-14 h-14 bg-[#fe6004]/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <Clock className="w-7 h-7 text-[#fe6004]" />
                    </div>
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Time</p>
                    <p className="text-lg font-black text-navy">
                      {booking.time_slot === 'flexible' || booking.time_slot === 'Open' ? 'Open' : booking.time_slot}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-14 h-14 bg-[#fe6004]/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <Ticket className="w-7 h-7 text-[#fe6004]" />
                    </div>
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Tickets</p>
                    <p className="text-lg font-black text-navy">{booking.guest_count}</p>
                  </div>
                </div>

                {/* Ticket Items */}
                {booking.booking_addons && booking.booking_addons.length > 0 && (
                  <div className="border-t-2 border-slate-100 pt-5">
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-3">Your Tickets</p>
                    <div className="space-y-2">
                      {booking.booking_addons.map((addon, index) => (
                        <div key={index} className="flex items-center justify-between py-2 px-4 bg-slate-50 rounded-xl">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-[#fe6004] rounded-lg flex items-center justify-center">
                              <span className="text-white font-black text-sm">×{addon.quantity}</span>
                            </div>
                            <span className="font-bold text-navy">
                              {addon.addon_name || addon.promo_addons?.name || 'Ticket'}
                            </span>
                          </div>
                          <span className="font-black text-[#fe6004]">
                            {formatCurrency((addon.unit_price || 0) * (addon.quantity || 1))}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Transport */}
                {hasTransfer && (
                  <div className="border-t-2 border-slate-100 pt-5 mt-5">
                    <div className="flex items-center justify-between py-2 px-4 bg-[#fe6004]/10 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Car className="w-5 h-5 text-[#fe6004]" />
                        <span className="font-bold text-navy">Private Transfer</span>
                      </div>
                      {transport?.hotel_name && (
                        <span className="text-sm text-slate-600">
                          {transport.hotel_name}{transport.room_number ? ` #${transport.room_number}` : ''}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Total */}
                <div className="border-t-2 border-slate-100 pt-5 mt-5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 font-bold uppercase tracking-wider">Total Paid</span>
                    <span className="text-3xl font-black text-navy">{formatCurrency(booking.total_amount)}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Important Info Card - ORANGE STYLE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#fe6004] rounded-3xl p-5 mb-6"
            >
              <h3 className="text-black font-black text-lg mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Important Information
              </h3>
              <ul className="text-black/80 space-y-2">
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-5 h-5 mt-0.5 flex-shrink-0 text-black" />
                  <span>Arrive at least 30 minutes before your scheduled time</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-5 h-5 mt-0.5 flex-shrink-0 text-black" />
                  <span>Bring your booking confirmation</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-5 h-5 mt-0.5 flex-shrink-0 text-black" />
                  <span>Wear comfortable clothes and closed-toe shoes</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-5 h-5 mt-0.5 flex-shrink-0 text-black" />
                  <span>Height requirement: 110cm minimum to ride alone</span>
                </li>
              </ul>
            </motion.div>

            {/* Location Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-3xl shadow-xl p-5 mb-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-navy rounded-2xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-8 h-8 text-[#fe6004]" />
                </div>
                <div>
                  <h3 className="font-black text-navy text-lg">Hanuman Luge</h3>
                  <p className="text-slate-500">Phuket, Thailand</p>
                </div>
              </div>
            </motion.div>
          </>
        )}

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Link href="/">
            <button className="w-full py-5 bg-white hover:bg-slate-50 text-navy font-black rounded-2xl transition-all text-lg shadow-xl uppercase tracking-wider flex items-center justify-center gap-2 group">
              Back to Home
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </motion.div>

        {/* Help Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-white/50 text-sm mb-3">Need help with your booking?</p>
          <div className="flex justify-center gap-6">
            <a href="mailto:support@hanumanluge.com" className="flex items-center gap-2 text-[#fe6004] hover:text-[#ff7a2e] font-bold transition-colors">
              <Mail className="w-5 h-5" /> Email Us
            </a>
            <a href="tel:+66XXXXXXXX" className="flex items-center gap-2 text-[#fe6004] hover:text-[#ff7a2e] font-bold transition-colors">
              <Phone className="w-5 h-5" /> Call Us
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-navy flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#fe6004] border-t-transparent rounded-full animate-spin" />
      </main>
    }>
      <SuccessContent />
    </Suspense>
  );
}
