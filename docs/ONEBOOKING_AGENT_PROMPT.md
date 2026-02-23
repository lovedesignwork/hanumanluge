# Copy & Paste This Prompt to OneBooking Dashboard Agent

---

## PROMPT START - COPY EVERYTHING BELOW THIS LINE

Update the HL Bookings page (Hanuman Luge) to support the ticket-based booking model. 

**Changes needed:**

### 1. Table Columns - Replace old columns with ticket columns

**Remove columns:** PLAYERS, NON-PLAYERS, ADD-ONS

**Add new columns:** 1 RIDE | 2 RIDES | 3 RIDES | DOUBLING | TOTAL

### 2. Update API/data fetching to include `addon_name`:
```
booking_addons (quantity, addon_name, unit_price, promo_addons (name))
```

### 3. Add helper function to extract ticket counts:
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

### 4. Display ticket counts with color-coded badges:
- 1 Ride: blue badge (`bg-blue-100 text-blue-700`)
- 2 Rides: green badge (`bg-green-100 text-green-700`)
- 3 Rides: purple badge (`bg-purple-100 text-purple-700`)
- Doubling: orange badge (`bg-orange-100 text-orange-700`)
- Total: dark badge (`bg-slate-800 text-white`) showing `guest_count`

### 5. Transport & Hotel columns - FIX DISPLAY

The transport data IS being synced but not displaying. Check these fields from the sync payload:

```typescript
// Transport data comes in the sync payload as:
{
  transport: {
    type: 'private' | 'none',      // Show "Private" badge if 'private', otherwise "-"
    hotel_name: string | null,     // Display hotel name
    room_number: string | null,    // Display as "Room XXX" 
    cost: number                   // Transport cost (optional display)
  }
}
```

**Transport column display:**
```tsx
{booking.transport?.type === 'private' ? (
  <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">
    <Car className="w-3 h-3" />
    Private
  </span>
) : (
  <span className="text-slate-400">-</span>
)}
```

**Hotel/Room column display:**
```tsx
{booking.transport?.hotel_name ? (
  <div>
    <p className="text-sm text-slate-800">{booking.transport.hotel_name}</p>
    {booking.transport.room_number && (
      <p className="text-xs text-slate-500">Room {booking.transport.room_number}</p>
    )}
  </div>
) : (
  <span className="text-slate-400">-</span>
)}
```

### 6. Other display fixes:
- **Package column:** Show "Luge Tickets" when `package_name` is null or empty
- **Time slot:** Show "Open" for `time_slot === 'Open'` or `time_slot === 'flexible'`

### Data Context:
- Hanuman Luge bookings have `package_name: "Luge Tickets"` 
- Ticket types stored in `addons[]` array with `name` field like "1 Ride Ticket", "2 Rides Ticket", "3 Rides Ticket", "Doubling Ride"
- Transport data is in `transport` object with `type`, `hotel_name`, `room_number`, `cost`

## PROMPT END

---
