import { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section } from '@/components/ui';
import { formatDate } from '@/lib/utils';
import { generatePageMetadata } from '@/lib/seo/config';
import { supabaseAdmin } from '@/lib/supabase/server';
import { Clock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = generatePageMetadata(
  'Blog - Adventure Tips & Stories',
  'Read the latest news, adventure tips, safety guides, and stories from Hanuman Luge Phuket. Discover luge experiences, travel tips, and scenic track insights.',
  '/blog'
);

export const revalidate = 60;

async function getBlogPosts() {
  const { data: posts, error } = await supabaseAdmin
    .from('blog_posts')
    .select('id, title, slug, excerpt, featured_image, category, published_at, content')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }

  return posts.map(post => ({
    ...post,
    readTime: Math.ceil((post.content?.replace(/<[^>]*>/g, '').split(/\s+/).length || 0) / 200) || 5,
  }));
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-[#1a1a1a] overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/Hero%20Image/Zipline.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] via-transparent to-[#1a1a1a]" />
        
        <Container className="relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-2 bg-[#f3c12c]/10 text-[#f3c12c] rounded-full text-sm font-medium mb-6">
              Our Blog
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-heading)] text-white mb-6">
              Adventure <span className="text-[#f3c12c]">Stories</span>
            </h1>
            <p className="text-lg text-white/70">
              Tips, stories, and news from Phuket&apos;s premier luge adventure
            </p>
          </div>
        </Container>
      </section>

      {/* Blog Posts Section */}
      <Section className="bg-[#0f0f0f] py-20">
        <Container>
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-white/60 text-lg">No blog posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <article className="group h-full bg-[#1a1a1a] rounded-2xl overflow-hidden border border-white/10 hover:border-[#f3c12c]/30 transition-all duration-300">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <div 
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{ 
                          backgroundImage: post.featured_image ? `url(${post.featured_image})` : undefined, 
                          backgroundColor: '#2d2d2d' 
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent" />
                      {post.category && (
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-[#05126f] text-black text-xs font-medium rounded-full">
                            {post.category}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="p-6">
                      <h2 className="text-xl font-[family-name:var(--font-heading)] text-white mb-3 group-hover:text-[#f3c12c] transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-white/60 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/40">{post.published_at ? formatDate(post.published_at) : ''}</span>
                        <span className="flex items-center gap-1 text-white/40">
                          <Clock className="w-4 h-4" />
                          {post.readTime} min read
                        </span>
                      </div>

                      <div className="mt-4 pt-4 border-t border-white/10">
                        <span className="flex items-center gap-2 text-[#f3c12c] text-sm font-medium group-hover:gap-3 transition-all">
                          Read More
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </main>
  );
}
