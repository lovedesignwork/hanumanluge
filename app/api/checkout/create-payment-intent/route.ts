import { NextRequest, NextResponse } from 'next/server';
import { stripe, PRIVATE_TRANSFER_PRICE } from '@/lib/stripe/client';
import { supabaseAdmin } from '@/lib/supabase/server';

// Ticket types for Hanuman Luge (ticket-based activity)
const TICKET_TYPES: Record<string, { name: string; price: number; rides: number }> = {
  '1-ride': { name: '1 Ride Ticket', price: 790, rides: 1 },
  '2-ride': { name: '2 Rides Ticket', price: 890, rides: 2 },
  '3-ride': { name: '3 Rides Ticket', price: 990, rides: 3 },
  'doubling': { name: 'Doubling Ride', price: 390, rides: 0 },
};

interface BookingData {
  tickets: Record<string, number>;
  date: string;
  time: string;
  privateTransfer: boolean;
  hotelName?: string;
  roomNumber?: string;
  promoCodeId?: string | null;
  discountAmount?: number;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    countryCode: string;
    specialRequests?: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: BookingData = await request.json();

    const {
      tickets,
      date,
      time,
      privateTransfer,
      hotelName,
      roomNumber,
      promoCodeId,
      discountAmount = 0,
      customer,
    } = body;

    // Check if service role key is configured
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY === 'your_service_role_key_here') {
      console.error('SUPABASE_SERVICE_ROLE_KEY is not configured');
      return NextResponse.json({ error: 'Server configuration error. Please contact support.' }, { status: 500 });
    }

    // Validate tickets
    if (!tickets || Object.keys(tickets).length === 0) {
      return NextResponse.json({ error: 'No tickets selected' }, { status: 400 });
    }

    // Calculate ticket totals
    let ticketSubtotal = 0;
    let totalTicketCount = 0;
    const ticketLineItems: { name: string; quantity: number; unitPrice: number }[] = [];

    for (const [ticketId, quantity] of Object.entries(tickets)) {
      if (quantity > 0) {
        const ticketType = TICKET_TYPES[ticketId];
        if (!ticketType) {
          return NextResponse.json({ error: `Invalid ticket type: ${ticketId}` }, { status: 400 });
        }
        ticketSubtotal += ticketType.price * quantity;
        totalTicketCount += quantity;
        ticketLineItems.push({
          name: ticketType.name,
          quantity,
          unitPrice: ticketType.price,
        });
      }
    }

    if (totalTicketCount === 0) {
      return NextResponse.json({ error: 'No tickets selected' }, { status: 400 });
    }

    // Transport costs
    let transportCost = 0;
    const transportType = privateTransfer ? 'private' : 'none';

    if (privateTransfer) {
      transportCost = PRIVATE_TRANSFER_PRICE;
    }

    // Calculate total
    const totalAmount = ticketSubtotal + transportCost;
    const finalAmount = Math.max(0, totalAmount - discountAmount);

    // If promo code used, increment usage
    if (promoCodeId && discountAmount > 0) {
      await supabaseAdmin.rpc('increment_promo_usage', { promo_id: promoCodeId });
    }

    // Create booking in pending state
    // For Luge, we use a generic package approach - guest_count = total tickets
    const { data: booking, error: bookingError } = await supabaseAdmin
      .from('bookings')
      .insert({
        package_id: null,
        activity_date: date,
        time_slot: time || 'Open',
        guest_count: totalTicketCount,
        status: 'pending',
        total_amount: finalAmount,
        discount_amount: discountAmount,
        promo_code_id: promoCodeId || null,
        currency: 'THB',
        special_requests: customer.specialRequests || null,
      })
      .select()
      .single();

    if (bookingError || !booking) {
      console.error('Booking creation error:', bookingError);
      return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
    }

    // Insert customer details
    await supabaseAdmin.from('booking_customers').insert({
      booking_id: booking.id,
      first_name: customer.firstName,
      last_name: customer.lastName,
      email: customer.email,
      phone: customer.phone,
      country_code: customer.countryCode,
      special_requests: customer.specialRequests || null,
    });

    // Insert transport details (only if private transfer)
    if (privateTransfer) {
      await supabaseAdmin.from('booking_transport').insert({
        booking_id: booking.id,
        transport_type: transportType,
        hotel_name: hotelName || null,
        room_number: roomNumber || null,
        private_passengers: 0,
        non_players: 0,
        transport_cost: transportCost,
      });
    }

    // Insert ticket items as booking_addons (for OneBooking sync)
    // Note: addon_name column stores ticket type names for Luge bookings
    const addonInserts = ticketLineItems.map(item => ({
      booking_id: booking.id,
      addon_id: null,
      quantity: item.quantity,
      unit_price: item.unitPrice,
      addon_name: item.name,
    }));

    if (addonInserts.length > 0) {
      const { error: addonError } = await supabaseAdmin.from('booking_addons').insert(addonInserts);
      if (addonError) {
        console.warn('Failed to insert booking addons:', addonError.message);
        // If addon_name column doesn't exist, try without it
        if (addonError.message.includes('addon_name')) {
          const fallbackInserts = ticketLineItems.map(item => ({
            booking_id: booking.id,
            addon_id: null,
            quantity: item.quantity,
            unit_price: item.unitPrice,
          }));
          await supabaseAdmin.from('booking_addons').insert(fallbackInserts);
        }
      }
    }

    // Build description for Stripe
    const ticketSummary = ticketLineItems
      .map(item => `${item.quantity}x ${item.name}`)
      .join(', ');
    const description = `Luge Tickets: ${ticketSummary} on ${date}`;

    // Create Payment Intent - card only
    const paymentIntent = await stripe.paymentIntents.create({
      amount: finalAmount * 100,
      currency: 'thb',
      payment_method_types: ['card'],
      description,
      metadata: {
        booking_id: booking.id,
        booking_ref: booking.booking_ref,
        package_name: 'Luge Tickets',
        customer_email: customer.email,
        discount_amount: discountAmount.toString(),
        promo_code_id: promoCodeId || '',
        ticket_summary: ticketSummary,
      },
      receipt_email: customer.email,
      statement_descriptor_suffix: 'HANUMANLUGE',
    });

    // Update booking with payment intent ID
    await supabaseAdmin
      .from('bookings')
      .update({ stripe_payment_intent_id: paymentIntent.id })
      .eq('id', booking.id);

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      bookingId: booking.id,
      bookingRef: booking.booking_ref,
      amount: finalAmount,
    });
  } catch (error) {
    console.error('Payment intent creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}
