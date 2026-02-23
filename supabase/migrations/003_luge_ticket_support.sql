-- Migration: Add addon_name column for Luge ticket-based bookings
-- This allows storing ticket type names directly in booking_addons
-- instead of requiring a reference to promo_addons table

-- Add addon_name column to booking_addons table
ALTER TABLE booking_addons ADD COLUMN IF NOT EXISTS addon_name TEXT;

-- Make addon_id nullable (for Luge bookings, we store ticket names directly)
ALTER TABLE booking_addons ALTER COLUMN addon_id DROP NOT NULL;

-- Add special_requests column to bookings table if not exists
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS special_requests TEXT;

-- Update booking reference prefix for Hanuman Luge (HL instead of SR)
CREATE OR REPLACE FUNCTION generate_booking_ref()
RETURNS TRIGGER AS $$
DECLARE
  new_ref TEXT;
  ref_exists BOOLEAN;
BEGIN
  LOOP
    -- Generate reference: HL (Hanuman Luge) + date (YYMMDD) + random 4 chars
    new_ref := 'HL' || TO_CHAR(NOW(), 'YYMMDD') || UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 4));
    
    -- Check if this ref already exists
    SELECT EXISTS(SELECT 1 FROM bookings WHERE booking_ref = new_ref) INTO ref_exists;
    
    -- If not exists, use it
    IF NOT ref_exists THEN
      NEW.booking_ref := new_ref;
      EXIT;
    END IF;
  END LOOP;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Comment explaining the Luge booking model
COMMENT ON COLUMN booking_addons.addon_name IS 'For Luge bookings: stores ticket type name (e.g., "1 Ride Ticket", "2 Rides Ticket"). For activity bookings: NULL (uses addon_id reference instead).';
