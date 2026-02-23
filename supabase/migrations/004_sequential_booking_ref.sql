-- Migration: Update booking reference to sequential format HL-000001
-- This creates a more professional and trackable booking reference system

-- Create a sequence for booking numbers (starting from 1)
CREATE SEQUENCE IF NOT EXISTS booking_number_seq START WITH 1 INCREMENT BY 1;

-- Check if there are existing bookings and set sequence to continue from there
DO $$
DECLARE
  max_num INTEGER;
  extracted_num INTEGER;
  rec RECORD;
BEGIN
  -- Try to extract the highest number from existing HL- prefixed refs
  max_num := 0;
  FOR rec IN SELECT booking_ref FROM bookings WHERE booking_ref LIKE 'HL-%' LOOP
    BEGIN
      extracted_num := CAST(SUBSTRING(rec.booking_ref FROM 4) AS INTEGER);
      IF extracted_num > max_num THEN
        max_num := extracted_num;
      END IF;
    EXCEPTION WHEN OTHERS THEN
      -- Skip refs that don't match the numeric pattern
      CONTINUE;
    END;
  END LOOP;
  
  -- If we found existing sequential refs, set sequence to continue from there
  IF max_num > 0 THEN
    PERFORM setval('booking_number_seq', max_num, true);
  END IF;
END $$;

-- Update the booking reference generation function
CREATE OR REPLACE FUNCTION generate_booking_ref()
RETURNS TRIGGER AS $$
DECLARE
  next_num INTEGER;
  new_ref TEXT;
BEGIN
  -- Get next number from sequence
  next_num := nextval('booking_number_seq');
  
  -- Format as HL-XXXXXX (6 digits with leading zeros)
  new_ref := 'HL-' || LPAD(next_num::TEXT, 6, '0');
  
  NEW.booking_ref := new_ref;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add comment explaining the format
COMMENT ON SEQUENCE booking_number_seq IS 'Sequential counter for Hanuman Luge booking references (HL-000001, HL-000002, etc.)';
