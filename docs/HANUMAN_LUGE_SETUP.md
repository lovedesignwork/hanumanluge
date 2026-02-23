# Hanuman Luge - Project Setup Guide

## Company Information

- **Company Name**: [TO BE PROVIDED BY USER]
- **Payment Processing**: Chamnanthang Co., Ltd. (alias ONEBOOKING)
- **Booking Prefix**: HL- (e.g., HL-000001)

## Branding

### Colors
- **Primary (Green)**: `#16A34A`
- **Primary Dark**: `#15803D`
- **Primary Light**: `#22C55E`
- **Accent (Yellow)**: `#EAB308`
- **Background**: `#0F0F0F` (dark theme)

### Fonts
- **Heading**: Russo One (bold, sporty) - https://fonts.google.com/specimen/Russo+One
- **Body**: Inter (clean, readable)

### Logo
- Place logo at: `/public/images/logo.png`
- Place logo (white version) at: `/public/images/logo-white.png`

## Files Already Configured

- `tailwind.config.ts` - Colors set (Green #16A34A, Yellow accent #EAB308)
- `app/layout.tsx` - Fonts configured (Russo One + Inter)
- `.env.example` - Updated for Hanuman Luge
- `package.json` - Name set to "hanuman-luge"

## Required Updates

### 1. Global Search & Replace
- "Flying Hanuman" → "Hanuman Luge"
- "FLYING HANUMAN" → "HANUMAN LUGE"
- "flying-hanuman" → "hanuman-luge"
- "flyinghanuman" → "hanumanluge"
- "FH-" → "HL-" (booking prefix)
- "SKY TREK ADVENTURES Co., Ltd." → "[NEW COMPANY NAME]"
- "#F59E0B" → "#16A34A" (primary yellow to green)
- "#f2e421" → "#16A34A" (FH yellow to green)
- "font-trade-winds" → "font-heading"

### 2. Legal Pages
Update company name in:
- `/app/(public)/privacy/page.tsx`
- `/app/(public)/terms/page.tsx`
- `/app/(public)/refund/page.tsx`
- `/app/(public)/cookies/page.tsx`
- `/app/(public)/safety/page.tsx`

### 3. Contact Information
- Email: support@hanumanluge.com
- Phone: [TO BE PROVIDED]
- Address: [TO BE PROVIDED]

## Security Note

The checkout success page (`/checkout/success/page.tsx`) has payment_intent verification. DO NOT remove this security feature.

## Quick Start

1. `npm install`
2. Copy `.env.example` to `.env.local`
3. Configure environment variables
4. `npm run dev`
