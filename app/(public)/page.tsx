import { Metadata } from 'next';
import { 
  HeroSlideshow, 
  Activities,
  WhyUs,
  Gallery,
  Pricing,
  Testimonials,
  Location,
} from '@/components/home';
import { generatePageMetadata, siteConfig } from '@/lib/seo/config';

export const metadata: Metadata = {
  ...generatePageMetadata(
    `${siteConfig.name} - #1 Luge Adventure in Phuket`,
    'Experience the ultimate luge adventure at Hanuman Luge Phuket. Race down exciting tracks with stunning views. Book your adventure today!',
    '/',
  ),
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-navy">
      <HeroSlideshow />
      <Activities />
      <Pricing />
      <WhyUs />
      <Gallery />
      <Testimonials />
      <Location />
    </main>
  );
}
