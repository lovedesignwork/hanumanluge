import { Metadata } from 'next';

export const siteConfig = {
  name: 'Hanuman Luge',
  description: 'Experience the ultimate luge adventure in Phuket, Thailand. Race down exciting tracks with stunning panoramic views. Book your adventure today!',
  url: 'https://hanumanluge.com',
  ogImage: '/images/og-image.jpg',
  locale: 'en_US',
  creator: 'Hanuman Luge',
  keywords: [
    'hanuman luge',
    'luge phuket',
    'phuket adventure',
    'thailand luge',
    'phuket attractions',
    'things to do in phuket',
    'skyline luge phuket',
    'family activities phuket',
    'phuket outdoor activities',
    'hanuman luge phuket',
    'luge ride thailand',
    'phuket fun activities',
    'adventure park phuket',
  ],
  social: {
    facebook: 'https://www.facebook.com/hanumanluge',
    instagram: 'https://www.instagram.com/hanumanluge',
    tripadvisor: '',
  },
  contact: {
    email: 'support@hanumanluge.com',
    phone: '[PHONE NUMBER]',
    address: '[ADDRESS]',
  },
  geo: {
    latitude: 7.9285,
    longitude: 98.3185,
  },
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - #1 Luge Adventure in Phuket`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.creator }],
  creator: siteConfig.creator,
  publisher: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} - #1 Luge Adventure in Phuket`,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} - #1 Luge Adventure in Phuket`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@hanumanluge',
  },
  alternates: {
    canonical: siteConfig.url,
  },
  verification: {
    google: 'your-google-verification-code',
  },
  category: 'travel',
};

export function generatePageMetadata(
  title: string,
  description: string,
  path: string = '',
  image?: string
): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image || siteConfig.ogImage;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [ogImage],
    },
  };
}
