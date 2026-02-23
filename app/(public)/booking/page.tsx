'use client';

import { useState, useMemo, useEffect, Suspense, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Minus, Plus, MapPin, Info, Car, Calendar, Clock, ChevronRight, 
  Zap, Shield, Check, Ticket, Timer, ArrowRight
} from 'lucide-react';
import { CalendarPicker } from '@/components/ui';
import Image from 'next/image';

const ticketTypes = [
  {
    id: '1-ride',
    name: '1 Ride',
    price: 790,
    description: 'Single track experience',
    image: '/images/1000/Hanuman Luge 1.jpg',
    rides: 1,
  },
  {
    id: '2-ride',
    name: '2 Rides',
    price: 890,
    description: 'Try both tracks',
    image: '/images/1000/Hanuman Luge 5.jpg',
    rides: 2,
    popular: true,
  },
  {
    id: '3-ride',
    name: '3 Rides',
    price: 990,
    description: 'Ultimate luge experience',
    image: '/images/1000/Hanuman Luge 12.jpg',
    rides: 3,
  },
];

const doublingTicket = {
  id: 'doubling',
  name: 'Doubling Ride',
  price: 390,
  badge: 'Child Only',
  description: '/ person - Unlimited ride tandem with main ticket holder',
  note: 'For children aged 4-9 (must ride with a main ticket holder - not solo ride)',
};

const hourOptions = [
  { value: '08', label: '8 AM' },
  { value: '09', label: '9 AM' },
  { value: '10', label: '10 AM' },
  { value: '11', label: '11 AM' },
  { value: '12', label: '12 PM' },
  { value: '13', label: '1 PM' },
  { value: '14', label: '2 PM' },
  { value: '15', label: '3 PM' },
  { value: '16', label: '4 PM' },
  { value: '17', label: '5 PM' },
  { value: '18', label: '6 PM' },
  { value: '19', label: '7 PM' },
];

const minuteOptions = [
  { value: '00', label: '00' },
  { value: '15', label: '15' },
  { value: '30', label: '30' },
  { value: '45', label: '45' },
];

const PRIVATE_TRANSFER_PRICE = 2500;
const MAX_PRIVATE_PASSENGERS = 10;

function BookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [ticketQuantities, setTicketQuantities] = useState<Record<string, number>>({
    '1-ride': 1,
    '2-ride': 0,
    '3-ride': 0,
    'doubling': 0,
  });

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedHour, setSelectedHour] = useState('');
  const [selectedMinute, setSelectedMinute] = useState('');
  const [privateTransfer, setPrivateTransfer] = useState(false);
  const [hotelName, setHotelName] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [activeStep, setActiveStep] = useState(1);
  const [hourDropdownOpen, setHourDropdownOpen] = useState(false);
  const [minuteDropdownOpen, setMinuteDropdownOpen] = useState(false);
  
  const hourDropdownRef = useRef<HTMLDivElement>(null);
  const minuteDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (hourDropdownRef.current && !hourDropdownRef.current.contains(event.target as Node)) {
        setHourDropdownOpen(false);
      }
      if (minuteDropdownRef.current && !minuteDropdownRef.current.contains(event.target as Node)) {
        setMinuteDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const updateTicketQty = (ticketId: string, delta: number) => {
    setTicketQuantities(prev => {
      const current = prev[ticketId] || 0;
      const newQty = Math.max(0, current + delta);
      return { ...prev, [ticketId]: newQty };
    });
  };

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
      total: subtotal + transfer,
      lineItems,
    };
  }, [ticketQuantities, privateTransfer]);

  const hasTickets = Object.values(ticketQuantities).some(qty => qty > 0);
  const hasTime = !!selectedHour && !!selectedMinute;
  const selectedTime = hasTime ? `${selectedHour}:${selectedMinute}` : '';
  const isFormValid = hasTickets && selectedDate && hasTime;

  const handleProceedToCheckout = () => {
    if (!isFormValid) return;
    
    const ticketsStr = Object.entries(ticketQuantities)
      .filter(([, qty]) => qty > 0)
      .map(([id, qty]) => `${id}:${qty}`)
      .join(',');
    
    const params = new URLSearchParams({
      tickets: ticketsStr,
      date: selectedDate,
      time: selectedTime,
      privateTransfer: privateTransfer.toString(),
    });

    if (privateTransfer && hotelName) {
      params.set('hotelName', hotelName);
    }
    if (privateTransfer && roomNumber) {
      params.set('roomNumber', roomNumber);
    }
    
    router.push(`/checkout?${params.toString()}`);
  };

  const totalTickets = Object.entries(ticketQuantities)
    .filter(([id]) => id !== 'doubling')
    .reduce((sum, [, qty]) => sum + qty, 0);

  const formatTimeLabel = () => {
    if (!hasTime) return '';
    const hour = hourOptions.find(h => h.value === selectedHour);
    return `${hour?.label}:${selectedMinute}`;
  };

  const steps = [
    { num: 1, label: 'Tickets', done: hasTickets },
    { num: 2, label: 'Date & Time', done: !!selectedDate && hasTime },
    { num: 3, label: 'Options', done: true },
  ];

  return (
    <main className="min-h-screen bg-navy">
      {/* ── HERO BANNER ── */}
      <section className="relative h-[40vh] min-h-[340px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/1000/Hanuman Luge 10.jpg"
            alt="Luge Adventure"
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
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-[1px] bg-gradient-to-r from-transparent via-[#fe6004]/30 to-transparent"
              style={{ top: `${25 + i * 18}%`, left: '-100%', width: '200%' }}
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
            transition={{ delay: 0.1 }}
            className="flex items-center gap-2 mb-4"
          >
            <div className="h-[2px] w-8 bg-[#fe6004]" />
            <span className="text-[#fe6004] text-sm font-bold uppercase tracking-[0.3em]">
              Hanuman Luge Phuket
            </span>
            <div className="h-[2px] w-8 bg-[#fe6004]" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-display font-black text-white leading-none mb-4"
          >
            GET YOUR <span className="text-[#fe6004] italic">TICKETS</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white/60 text-lg max-w-md"
          >
            Choose your adventure and race down Phuket&apos;s most thrilling tracks
          </motion.p>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-navy to-transparent" />
      </section>

      {/* ── PROGRESS STEPS ── */}
      <div className="relative z-20 -mt-8">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            {steps.map((step, i) => (
              <div key={step.num} className="flex items-center gap-2 sm:gap-4">
                <button
                  onClick={() => {
                    const el = document.getElementById(`step-${step.num}`);
                    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    setActiveStep(step.num);
                  }}
                  className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 rounded-2xl transition-all ${
                    activeStep === step.num
                      ? 'bg-[#fe6004] text-white shadow-lg shadow-[#fe6004]/30'
                      : step.done
                        ? 'bg-navy-light text-white border border-[#fe6004]/30'
                        : 'bg-navy-light text-white/50 border border-white/10'
                  }`}
                >
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-black ${
                    activeStep === step.num
                      ? 'bg-white/20'
                      : step.done ? 'bg-[#fe6004]/20 text-[#fe6004]' : 'bg-white/10'
                  }`}>
                    {step.done && activeStep !== step.num ? <Check className="w-4 h-4" /> : step.num}
                  </span>
                  <span className="text-sm font-bold uppercase tracking-wide hidden sm:block">{step.label}</span>
                </button>
                {i < steps.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-white/20 hidden sm:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-32">

        {/* STEP 1: TICKET SELECTION */}
        <motion.section
          id="step-1"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <Ticket className="w-6 h-6 text-[#fe6004]" />
            <h2 className="text-2xl font-display font-black text-white uppercase tracking-wide">
              Choose Your Ride
            </h2>
          </div>

          {/* Ticket Cards Grid - Homepage Style */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {ticketTypes.map((ticket) => {
              const qty = ticketQuantities[ticket.id] || 0;
              const isSelected = qty > 0;
              
              return (
                <motion.div
                  key={ticket.id}
                  whileHover={{ y: -4 }}
                  className="relative"
                >
                  {/* Popular Badge */}
                  {ticket.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                      <span className="px-4 py-1.5 rounded-full bg-[#fe6004] text-white text-xs font-bold uppercase tracking-wider whitespace-nowrap shadow-lg">
                        Best Seller
                      </span>
                    </div>
                  )}
                  
                  {/* Ticket Card */}
                  <div className="relative overflow-hidden rounded-3xl transition-all">
                    {/* Ticket Container - Lime Background */}
                    <div className="relative bg-lime">
                      
                      {/* Top Section - Image with Large Ride Number at Bottom Edge */}
                      <div className="relative h-52 sm:h-60 overflow-hidden">
                        <Image
                          src={ticket.image}
                          alt={ticket.name}
                          fill
                          className="object-cover"
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-lime via-lime/60 to-transparent" />
                        
                        {/* Large Ride Number at Bottom Edge */}
                        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center">
                          <span className="text-[70px] font-black font-display text-lime tracking-tighter leading-none translate-y-4 italic">
                            {ticket.rides} {ticket.rides === 1 ? 'RIDE' : 'RIDES'}
                          </span>
                        </div>
                      </div>
                      
                      {/* Perforated Line */}
                      <div className="relative h-6 flex items-center">
                        <div className="absolute left-0 w-5 h-10 bg-navy rounded-r-full -translate-x-1/2" />
                        <div className="flex-1 border-t-[3px] border-dashed border-[#0A1628] mx-8" />
                        <div className="absolute right-0 w-5 h-10 bg-navy rounded-l-full translate-x-1/2" />
                      </div>
                      
                      {/* Bottom Section */}
                      <div className="px-5 pb-5 pt-1">
                        {/* Location Info */}
                        <div className="flex justify-between items-center mb-2 text-[10px] text-[#C8511E] uppercase tracking-widest font-semibold">
                          <span>Hanuman Luge</span>
                          <span>Phuket · Thailand</span>
                        </div>
                        
                        {/* Price */}
                        <div className="text-center mb-4">
                          <span className="text-3xl sm:text-4xl font-black font-display text-navy">
                            ฿{ticket.price.toLocaleString()}
                          </span>
                          <p className="text-navy text-xs mt-0.5 font-medium">per person</p>
                        </div>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between bg-navy/10 rounded-xl p-2">
                          <button
                            onClick={() => updateTicketQty(ticket.id, -1)}
                            disabled={qty <= 0}
                            className="w-10 h-10 rounded-lg bg-navy text-lime flex items-center justify-center hover:bg-navy/80 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                          >
                            <Minus className="w-5 h-5" />
                          </button>
                          <span className="text-3xl font-black text-navy w-14 text-center">{qty}</span>
                          <button
                            onClick={() => updateTicketQty(ticket.id, 1)}
                            className="w-10 h-10 rounded-lg bg-navy text-lime flex items-center justify-center hover:bg-navy/80 transition-all"
                          >
                            <Plus className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Doubling Ride Card - Homepage Style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={`relative transition-all ${
              ticketQuantities['doubling'] > 0
                ? 'ring-4 ring-[#fe6004] shadow-xl shadow-[#fe6004]/30 rounded-2xl'
                : ''
            }`}
          >
            {/* Large Ticket */}
            <div className="bg-[#fe6004] rounded-2xl overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                {/* Left - Image Section */}
                <div className="relative lg:w-2/5 h-48 lg:h-auto min-h-[200px]">
                  <Image
                    src="/images/1000/Hanuman Luge 18.jpg"
                    alt="Doubling Ride"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#fe6004] lg:block hidden" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#fe6004] via-transparent to-transparent lg:hidden" />
                  
                  {/* Child Only Badge */}
                  <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-navy text-[#fe6004] font-black text-sm shadow-lg uppercase">
                    {doublingTicket.badge}
                  </div>
                </div>
                
                {/* Perforated Edge - Vertical on desktop, Horizontal on mobile */}
                <div className="hidden lg:flex flex-col items-center justify-center w-8 relative">
                  <div className="absolute top-0 w-8 h-8 bg-navy rounded-full -translate-y-1/2" />
                  <div className="flex-1 border-l-2 border-dashed border-navy my-4" />
                  <div className="absolute bottom-0 w-8 h-8 bg-navy rounded-full translate-y-1/2" />
                </div>
                
                <div className="lg:hidden relative h-6 flex items-center">
                  <div className="absolute left-0 w-6 h-6 bg-navy rounded-full -translate-x-1/2" />
                  <div className="flex-1 border-t-2 border-dashed border-navy mx-6" />
                  <div className="absolute right-0 w-6 h-6 bg-navy rounded-full translate-x-1/2" />
                </div>
                
                {/* Right - Content Section */}
                <div className="flex-1 p-6 lg:p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
                  <div className="text-center lg:text-left flex-1">
                    <h3 className="text-2xl lg:text-3xl font-black font-display text-navy mb-2 uppercase">
                      {doublingTicket.name}
                    </h3>
                    <p className="text-navy/80 text-sm mb-3">
                      {doublingTicket.description}
                    </p>
                    
                    {/* Note */}
                    <div className="inline-flex items-start gap-2 p-3 bg-navy/10 rounded-lg">
                      <Info className="w-4 h-4 text-navy flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-navy/80">{doublingTicket.note}</p>
                    </div>
                  </div>
                  
                  {/* Price & Quantity */}
                  <div className="text-center lg:text-right flex-shrink-0">
                    <div className="text-4xl lg:text-5xl font-black font-display text-navy mb-1">
                      ฿{doublingTicket.price}
                    </div>
                    <p className="text-navy/70 text-sm mb-4">per person</p>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center justify-center lg:justify-end gap-3">
                      <button
                        onClick={() => updateTicketQty('doubling', -1)}
                        disabled={ticketQuantities['doubling'] <= 0}
                        className="w-12 h-12 rounded-xl bg-navy text-[#fe6004] flex items-center justify-center hover:bg-navy/80 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                      <span className="w-12 text-center text-3xl font-black text-navy">{ticketQuantities['doubling']}</span>
                      <button
                        onClick={() => updateTicketQty('doubling', 1)}
                        className="w-12 h-12 rounded-xl bg-navy text-[#fe6004] flex items-center justify-center hover:bg-navy/80 transition-all"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* STEP 2: DATE & TIME */}
        <motion.section
          id="step-2"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <Calendar className="w-6 h-6 text-[#fe6004]" />
            <h2 className="text-2xl font-display font-black text-white uppercase tracking-wide">
              Pick Your Slot
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Date Card */}
            <div className="bg-lime rounded-2xl p-6">
              <label className="flex items-center gap-2 text-xs uppercase tracking-wider text-black mb-4 font-semibold">
                <Calendar className="w-4 h-4 text-black" />
                Select Date
              </label>
              <CalendarPicker
                value={selectedDate}
                onChange={setSelectedDate}
                minDate={new Date().toISOString().split('T')[0]}
              />
              {selectedDate && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-3 px-3 py-2 bg-white rounded-lg text-sm"
                >
                  <span className="text-black font-semibold">
                    {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                </motion.div>
              )}
            </div>

            {/* Time Card */}
            <div className="bg-lime rounded-2xl p-6">
              <label className="flex items-center gap-2 text-xs uppercase tracking-wider text-black mb-4 font-semibold">
                <Clock className="w-4 h-4 text-black" />
                Select Time
              </label>
              <div className="grid grid-cols-2 gap-4">
                {/* Hour Dropdown */}
                <div>
                  <label className="block text-xs text-black mb-2 uppercase tracking-wider">Hour</label>
                  <div className="relative" ref={hourDropdownRef}>
                    <button
                      type="button"
                      onClick={() => {
                        setHourDropdownOpen(!hourDropdownOpen);
                        setMinuteDropdownOpen(false);
                      }}
                      className={`w-full h-14 px-4 pr-10 bg-white border-2 rounded-xl text-left font-bold text-lg cursor-pointer transition-all flex items-center justify-between ${
                        hourDropdownOpen 
                          ? 'border-[#fe6004] ring-2 ring-[#fe6004]/20' 
                          : 'border-transparent hover:border-black/20'
                      }`}
                    >
                      <span className={selectedHour ? 'text-black' : 'text-black/40'}>
                        {selectedHour ? hourOptions.find(h => h.value === selectedHour)?.label : 'HH'}
                      </span>
                      <ChevronRight className={`w-5 h-5 text-black/40 transition-transform ${hourDropdownOpen ? '-rotate-90' : 'rotate-90'}`} />
                    </button>
                    
                    <AnimatePresence>
                      {hourDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute z-50 top-full left-0 right-0 mt-2 bg-white border border-black/10 rounded-xl shadow-2xl shadow-black/20 overflow-hidden"
                        >
                          <div className="max-h-64 overflow-y-auto py-2 custom-scrollbar">
                            {hourOptions.map((hour) => (
                              <button
                                key={hour.value}
                                type="button"
                                onClick={() => {
                                  setSelectedHour(hour.value);
                                  setHourDropdownOpen(false);
                                }}
                                className={`w-full px-4 py-3 text-left font-semibold transition-colors flex items-center justify-between ${
                                  selectedHour === hour.value
                                    ? 'bg-[#fe6004] text-white'
                                    : 'text-black/70 hover:bg-black/5 hover:text-black'
                                }`}
                              >
                                <span>{hour.label}</span>
                                {selectedHour === hour.value && (
                                  <Check className="w-4 h-4" />
                                )}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Minute Dropdown */}
                <div>
                  <label className="block text-xs text-black mb-2 uppercase tracking-wider">Minute</label>
                  <div className="relative" ref={minuteDropdownRef}>
                    <button
                      type="button"
                      onClick={() => {
                        setMinuteDropdownOpen(!minuteDropdownOpen);
                        setHourDropdownOpen(false);
                      }}
                      className={`w-full h-14 px-4 pr-10 bg-white border-2 rounded-xl text-left font-bold text-lg cursor-pointer transition-all flex items-center justify-between ${
                        minuteDropdownOpen 
                          ? 'border-[#fe6004] ring-2 ring-[#fe6004]/20' 
                          : 'border-transparent hover:border-black/20'
                      }`}
                    >
                      <span className={selectedMinute ? 'text-black' : 'text-black/40'}>
                        {selectedMinute ? `:${selectedMinute}` : 'MM'}
                      </span>
                      <ChevronRight className={`w-5 h-5 text-black/40 transition-transform ${minuteDropdownOpen ? '-rotate-90' : 'rotate-90'}`} />
                    </button>
                    
                    <AnimatePresence>
                      {minuteDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute z-50 top-full left-0 right-0 mt-2 bg-white border border-black/10 rounded-xl shadow-2xl shadow-black/20 overflow-hidden"
                        >
                          <div className="py-2">
                            {minuteOptions.map((min) => (
                              <button
                                key={min.value}
                                type="button"
                                onClick={() => {
                                  setSelectedMinute(min.value);
                                  setMinuteDropdownOpen(false);
                                }}
                                className={`w-full px-4 py-3 text-left font-semibold transition-colors flex items-center justify-between ${
                                  selectedMinute === min.value
                                    ? 'bg-[#fe6004] text-white'
                                    : 'text-black/70 hover:bg-black/5 hover:text-black'
                                }`}
                              >
                                <span>:{min.label}</span>
                                {selectedMinute === min.value && (
                                  <Check className="w-4 h-4" />
                                )}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Selected Time Display */}
              {hasTime && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 px-4 py-3 bg-white rounded-xl flex items-center gap-3"
                >
                  <Timer className="w-5 h-5 text-[#fe6004]" />
                  <span className="text-black font-bold text-lg">{formatTimeLabel()}</span>
                </motion.div>
              )}
            </div>
          </div>
        </motion.section>

        {/* STEP 3: OPTIONS */}
        <motion.section
          id="step-3"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <MapPin className="w-6 h-6 text-[#fe6004]" />
            <h2 className="text-2xl font-display font-black text-white uppercase tracking-wide">
              Extras & Location
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Private Transfer */}
            <div
              className={`relative rounded-2xl p-6 transition-all overflow-hidden ${
                privateTransfer 
                  ? 'bg-[#fe6004]/10 border-2 border-[#fe6004] shadow-lg shadow-[#fe6004]/10' 
                  : 'bg-navy-light border-2 border-[#fe6004] hover:border-[#fe6004]'
              }`}
            >
              {privateTransfer && (
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#fe6004]/10 rounded-bl-[60px]" />
              )}
              <div 
                className="flex items-start gap-4 cursor-pointer"
                onClick={() => setPrivateTransfer(!privateTransfer)}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors ${
                  privateTransfer ? 'bg-[#fe6004]' : 'bg-white/5 border border-white/10'
                }`}>
                  <Car className={`w-7 h-7 ${privateTransfer ? 'text-white' : 'text-white/50'}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-white text-lg">Private Transfer</h3>
                    <div className={`w-12 h-7 rounded-full transition-colors flex-shrink-0 ${privateTransfer ? 'bg-[#fe6004]' : 'bg-white/15'}`}>
                      <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform mt-1 ${privateTransfer ? 'translate-x-6' : 'translate-x-1'}`} />
                    </div>
                  </div>
                  <p className="text-white/50 text-sm">Round-trip hotel pickup · Max {MAX_PRIVATE_PASSENGERS} pax</p>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-[#fe6004] font-black text-xl">+฿{PRIVATE_TRANSFER_PRICE.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Hotel Details - shown when transfer is enabled */}
              <AnimatePresence>
                {privateTransfer && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-5 pt-5 border-t border-[#fe6004]/20 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Hotel Name / Pickup Location */}
                      <div>
                        <label className="block text-xs text-white/40 mb-2 uppercase tracking-wider font-semibold">
                          Hotel / Pickup Location
                        </label>
                        <input
                          type="text"
                          value={hotelName}
                          onChange={(e) => setHotelName(e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          placeholder="Enter hotel name"
                          className="w-full h-12 px-4 bg-navy border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-[#fe6004] focus:outline-none transition-colors"
                        />
                      </div>

                      {/* Room Number */}
                      <div>
                        <label className="block text-xs text-white/40 mb-2 uppercase tracking-wider font-semibold">
                          Room Number
                        </label>
                        <input
                          type="text"
                          value={roomNumber}
                          onChange={(e) => setRoomNumber(e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          placeholder="e.g. 101"
                          className="w-full h-12 px-4 bg-navy border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-[#fe6004] focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Location */}
            <div className="bg-navy-light rounded-2xl p-6 border-2 border-[#fe6004]">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#fe6004]/10 border border-[#fe6004]/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-7 h-7 text-[#fe6004]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white text-lg mb-1">Meeting Point</h3>
                  <p className="text-white/50 text-sm mb-3">
                    Hanuman Luge, 105 Moo 4, Chaofa Road, Wichit, Muang, Phuket 83130
                  </p>
                  <a 
                    href="https://maps.app.goo.gl/hkNWgQQi1ksvYY37A" 
                    target="_blank"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white/80 text-sm font-medium rounded-lg transition-colors border border-white/10"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    View on Maps
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
              <div className="mt-4 p-3 bg-blue-500/10 rounded-xl border border-blue-500/15">
                <p className="text-xs text-blue-300/80 flex items-center gap-2">
                  <Info className="w-3.5 h-3.5 flex-shrink-0" />
                  No transfer included. Please come directly to the park.
                </p>
              </div>
            </div>
          </div>
        </motion.section>
      </div>

      {/* ── STICKY BOTTOM BAR ── */}
      <AnimatePresence>
        {hasTickets && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-50"
          >
            {/* Glass backdrop */}
            <div className="absolute inset-0 bg-[#0A1628]" />
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#f3c12c] via-[#fe6004] to-[#f3c12c]" />

            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Order Summary */}
                <div className="flex items-center gap-6 w-full sm:w-auto">
                  {/* Ticket Count */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#fe6004]/10 border border-[#fe6004]/20 flex items-center justify-center">
                      <Ticket className="w-6 h-6 text-[#fe6004]" />
                    </div>
                    <div>
                      <span className="text-white/50 text-xs uppercase tracking-wider block">Tickets</span>
                      <span className="text-white font-bold">{totalTickets} {totalTickets === 1 ? 'ticket' : 'tickets'}</span>
                      {ticketQuantities['doubling'] > 0 && (
                        <span className="text-white/40 text-xs"> + {ticketQuantities['doubling']} doubling</span>
                      )}
                    </div>
                  </div>

                  {/* Date/Time */}
                  <div className="hidden sm:block">
                    {selectedDate && hasTime ? (
                      <div>
                        <span className="text-white/50 text-xs uppercase tracking-wider block">When</span>
                        <span className="text-white font-bold text-sm">
                          {new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · {formatTimeLabel()}
                        </span>
                      </div>
                    ) : (
                      <div>
                        <span className="text-white/50 text-xs uppercase tracking-wider block">When</span>
                        <span className="text-white/30 text-sm">Select date & time</span>
                      </div>
                    )}
                  </div>

                  {/* Transfer */}
                  {privateTransfer && (
                    <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-[#fe6004]/10 rounded-lg border border-[#fe6004]/20">
                      <Car className="w-4 h-4 text-[#fe6004]" />
                      <span className="text-white text-xs font-medium">Transfer included</span>
                    </div>
                  )}
                </div>

                {/* Price + CTA */}
                <div className="flex items-center gap-5 w-full sm:w-auto">
                  <div className="text-right">
                    <span className="text-white/40 text-xs uppercase tracking-wider block">Total</span>
                    <span className="text-3xl font-black text-[#fe6004]">฿{prices.total.toLocaleString()}</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleProceedToCheckout}
                    disabled={!isFormValid}
                    className="relative h-14 px-8 rounded-xl font-bold text-white text-base flex items-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-[#fe6004] hover:bg-[#ff7a2e] group overflow-hidden flex-shrink-0"
                    style={{
                      boxShadow: isFormValid ? '0 8px 30px rgba(254, 96, 4, 0.4)' : 'none'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    <span className="relative uppercase tracking-wide">Checkout</span>
                    <ArrowRight className="w-5 h-5 relative" />
                  </button>
                </div>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center justify-center sm:justify-start gap-4 mt-2 text-white/30 text-[10px] uppercase tracking-wider">
                <span className="flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  Secure Payment
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  Instant Confirmation
                </span>
                <span className="flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  Free Cancellation
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-navy flex items-center justify-center">
        <div className="w-10 h-10 border-3 border-white/20 border-t-[#fe6004] rounded-full animate-spin" />
      </main>
    }>
      <BookingContent />
    </Suspense>
  );
}
