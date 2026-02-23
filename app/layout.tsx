import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { TrackingScriptsHead, TrackingScriptsBody } from '@/components/TrackingScripts';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Hanuman Luge | Thrilling Luge Experience in Phuket',
    template: '%s | Hanuman Luge',
  },
  description: 'Hanuman Luge - Experience the thrill of downhill luge racing in Phuket, Thailand. Fun for the whole family!',
  keywords: ['hanuman luge', 'luge phuket', 'phuket activities', 'family fun phuket', 'thailand adventure'],
  authors: [{ name: 'Hanuman Luge' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Hanuman Luge',
    title: 'Hanuman Luge | Thrilling Luge Experience in Phuket',
    description: 'Experience the thrill of downhill luge racing in Phuket, Thailand',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#667eea',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <TrackingScriptsBody />
        {children}
        <TrackingScriptsHead />
      </body>
    </html>
  );
}
