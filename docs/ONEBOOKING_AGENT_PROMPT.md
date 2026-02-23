# Copy & Paste This Prompt to OneBooking Dashboard Agent

---

## PROMPT START - COPY EVERYTHING BELOW THIS LINE

Update the bookings table to support Hanuman Luge's ticket-based booking model. 

**Changes needed:**

1. **Remove columns:** PLAYERS, NON-PLAYERS, ADD-ONS

2. **Add new columns:** 1 RIDE | 2 RIDES | 3 RIDES | DOUBLING | TOTAL

3. **Update API query** to include `addon_name` from `booking_addons`:
```
booking_addons (quantity, addon_name, unit_price, promo_addons (name))
```

4. **Add this helper function** to extract ticket counts:
```typescript
const getTicketCounts = (addons: any[]) => {
  const counts = { ride1: 0, ride2: 0, ride3: 0, doubling: 0 };
  if (!addons || addons.length === 0) return counts;
  
  addons.forEach(addon => {
    const name = (addon.addon_name || addon.promo_addons?.name || '').toLowerCase();
    const qty = addon.quantity || 0;
    
    if (name.includes('1 ride') || name.includes('1-ride')) counts.ride1 += qty;
    else if (name.includes('2 ride') || name.includes('2-ride')) counts.ride2 += qty;
    else if (name.includes('3 ride') || name.includes('3-ride')) counts.ride3 += qty;
    else if (name.includes('doubling')) counts.doubling += qty;
  });
  return counts;
};
```

5. **Display ticket counts** with color-coded badges:
   - 1 Ride: blue badge (`bg-blue-100 text-blue-700`)
   - 2 Rides: green badge (`bg-green-100 text-green-700`)
   - 3 Rides: purple badge (`bg-purple-100 text-purple-700`)
   - Doubling: orange badge (`bg-orange-100 text-orange-700`)
   - Total: dark badge (`bg-slate-800 text-white`) showing `booking.guest_count`

6. **Package column fallback:** Show "Luge Tickets" when `packages` is null

7. **Time slot:** Show "Open" for `time_slot === 'Open'` or `time_slot === 'flexible'`

**Database context:** Hanuman Luge stores ticket types in `booking_addons.addon_name` field with values like "1 Ride Ticket", "2 Rides Ticket", "3 Rides Ticket", "Doubling Ride". The `addon_id` is NULL for these ticket entries.

## PROMPT END

---
