import { Package } from '@/types';

export const packages: Package[] = [
  // Main Luge Packages
  {
    id: 'luge-standard',
    slug: 'luge-standard',
    name: 'Luge Standard',
    description: 'Our entry-level luge experience with 2 rides down the scenic track. Perfect for first-time riders!',
    shortDescription: 'Standard luge adventure package',
    price: 590,
    duration: '30 minutes',
    category: 'combined',
    image: '/images/Package%20image/WorldA.JPG',
    gallery: [],
    features: ['2 Luge Rides', 'Scenic Track', 'Safety Briefing', 'Helmet Included'],
    included: ['Safety equipment', 'Professional guide', 'Insurance', 'Helmet'],
    requirements: ['Height: 110cm+ to ride alone', 'Age: 6+ years', 'Good health condition'],
    featured: true,
    popular: true,
    stats: {
      rides: 2,
      trackLength: '600m',
    },
    includesMeal: false,
    includesTransfer: false,
  },
  {
    id: 'luge-premium',
    slug: 'luge-premium',
    name: 'Luge Premium',
    description: 'Our premium luge experience with 4 rides and access to both tracks. More thrills, more fun!',
    shortDescription: 'Premium luge adventure',
    price: 990,
    duration: '1 hour',
    category: 'combined',
    image: '/images/Package%20image/WoldB.jpg',
    gallery: [],
    features: ['4 Luge Rides', 'Both Tracks', 'Priority Queue', 'Photo Package'],
    included: ['Safety equipment', 'Professional guide', 'Insurance', 'Helmet', 'Photo package'],
    requirements: ['Height: 110cm+ to ride alone', 'Age: 6+ years', 'Good health condition'],
    featured: true,
    popular: false,
    stats: {
      rides: 4,
      trackLength: '1.2km',
    },
    includesMeal: false,
    includesTransfer: false,
  },
  {
    id: 'luge-family',
    slug: 'luge-family',
    name: 'Luge Family',
    description: 'Perfect for families! Includes rides for 2 adults and 2 children with special family pricing.',
    shortDescription: 'Family luge package',
    price: 2490,
    duration: '1.5 hours',
    category: 'combined',
    image: '/images/Package%20image/WORLDC.JPG',
    gallery: [],
    features: ['8 Luge Rides Total', 'Family Pricing', 'Kids Priority', 'Group Photo'],
    included: ['Safety equipment', 'Professional guide', 'Insurance', 'Helmets for all', 'Group photo'],
    requirements: ['Height: 85cm+ with adult', 'Children must be accompanied'],
    featured: true,
    popular: false,
    stats: {
      rides: 8,
      people: 4,
    },
    includesMeal: false,
    includesTransfer: false,
  },
  {
    id: 'luge-skyline',
    slug: 'luge-skyline',
    name: 'Luge Skyline',
    description: 'The ultimate luge experience! 6 rides plus scenic skyride with panoramic views.',
    shortDescription: 'Luge plus skyride combo',
    price: 1490,
    duration: '2 hours',
    category: 'combined',
    image: '/images/Package%20image/SkywalkPakc.jpg',
    gallery: [],
    features: ['6 Luge Rides', 'Scenic Skyride', 'Panoramic Views', 'Premium Experience'],
    included: ['Safety equipment', 'Professional guide', 'Insurance', 'Helmet', 'Skyride access'],
    requirements: ['Height: 110cm+ to ride alone', 'Age: 6+ years', 'Good health condition'],
    featured: true,
    popular: false,
    stats: {
      rides: 6,
      skyride: 2,
    },
    includesMeal: false,
    includesTransfer: false,
  },
  {
    id: 'all-day-pass',
    slug: 'all-day-pass',
    name: 'All-Day Pass',
    description: 'Unlimited luge rides all day! The best value for luge enthusiasts who want maximum fun.',
    shortDescription: 'Unlimited luge all day',
    price: 1990,
    duration: 'Full Day',
    category: 'combined',
    image: '/images/Package%20image/32PF.JPG',
    gallery: [],
    features: ['Unlimited Rides', 'All Tracks', 'No Queue', 'Meal Voucher'],
    included: ['Safety equipment', 'Professional guide', 'Insurance', 'Helmet', 'Meal voucher'],
    requirements: ['Height: 110cm+ to ride alone', 'Age: 6+ years', 'Good health condition'],
    featured: true,
    popular: false,
    stats: {
      rides: 'Unlimited',
      tracks: 4,
    },
    includesMeal: true,
    includesTransfer: false,
  },
];

export function getPackageById(id: string): Package | undefined {
  return packages.find(pkg => pkg.id === id);
}

export function getPackageBySlug(slug: string): Package | undefined {
  return packages.find(pkg => pkg.slug === slug);
}

export function getPackagesByCategory(category: Package['category']): Package[] {
  return packages.filter(pkg => pkg.category === category);
}

export function getFeaturedPackages(): Package[] {
  return packages.filter(pkg => pkg.featured);
}
