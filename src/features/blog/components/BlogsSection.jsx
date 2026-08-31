import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight } from 'lucide-react';
import { useFirebaseData } from '@/hooks/useFirebaseData';
import { DEFAULT_BLOGS } from '@/constants/data';
import { BLOGS_STRINGS } from '@/constants/strings';
import SectionHeader from '@/shared/components/ui/SectionHeader';
import SectionErrorBoundary from '@/shared/components/ui/SectionErrorBoundary';
import { normalizeBlogs } from '../utils/blogAdapters';
import BlogCard from './BlogCard';
import ScrollReveal from '@/shared/components/ui/ScrollReveal';

/**
 * @fileoverview Compact Blogs section preview. Renders only the single latest blog post
 * on the home page and redirects users to a full-screen feed of all logs at /blogs.
 * Handles empty states dynamically if no blogs are present.
 */

function BlogsSectionContent() {
  const { data: rawBlogList, loading } = useFirebaseData('blogs', DEFAULT_BLOGS);

  // Normalize all blog records to standard client objects
  const blogList = React.useMemo(() => normalizeBlogs(rawBlogList), [rawBlogList]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="animate-pulse">
          <SectionHeader
            tag={BLOGS_STRINGS.SECTION_TAG}
            icon={<BookOpen className="animate-spin" style={{ animationDuration: '3s' }} />}
            titlePrefix={BLOGS_STRINGS.SECTION_TITLE_PREFIX}
            titleHighlight={BLOGS_STRINGS.SECTION_TITLE_HIGHLIGHT}
          />
        </div>

        <div className="max-w-md mx-auto mt-12 animate-pulse">
          <div className="p-1 bg-zinc-900/10 border border-white/5 rounded-3xl min-h-[340px]">
            <div className="rounded-[calc(1.5rem-0.25rem)] bg-zinc-950/45 p-6 flex flex-col h-full">
              <div className="w-full h-40 bg-zinc-900 rounded-xl mb-4 text-zinc-800"></div>
              <div className="h-3 w-20 bg-zinc-900 rounded mb-3"></div>
              <div className="h-5 w-40 bg-zinc-900 rounded mb-3"></div>
              <div className="h-4 w-full bg-zinc-900 rounded mb-2"></div>
              <div className="h-4 w-5/6 bg-zinc-900 rounded mb-4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Display only the single latest article
  const previewBlogs = blogList.slice(0, 1);
  const hasBlogs = blogList.length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <SectionHeader
        tag={BLOGS_STRINGS.SECTION_TAG}
        icon={<BookOpen />}
        titlePrefix={BLOGS_STRINGS.SECTION_TITLE_PREFIX}
        titleHighlight={BLOGS_STRINGS.SECTION_TITLE_HIGHLIGHT}
      />

      {hasBlogs ? (
        <>
          {/* Single Blog Card Preview */}
          <div className="max-w-md mx-auto mt-12 animate-fade-up">
            {previewBlogs.map((blog, idx) => (
              <BlogCard key={blog.id || idx} blog={blog} index={idx} />
            ))}
          </div>

          {/* View All CTA Button */}
          <ScrollReveal animation="up" delay={0.3} className="mt-16 text-center">
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 border border-zinc-800 hover:border-brand-500/40 hover:bg-brand-500/5 text-zinc-300 hover:text-white rounded-full transition-premium active:scale-95 shadow-lg text-sm font-semibold font-sans"
            >
              <span>Explore All Blogs</span>
              <ArrowRight className="w-4 h-4 text-brand-400" />
            </Link>
          </ScrollReveal>
        </>
      ) : (
        /* Sleek modern empty state */
        <div className="p-1 bg-zinc-900/10 backdrop-blur-md border border-white/5 rounded-3xl max-w-lg mx-auto shadow-md mt-12">
          <div className="rounded-[calc(1.5rem-0.25rem)] bg-zinc-950/45 p-8 text-center font-sans">
            <div className="p-3 bg-zinc-900/40 rounded-full w-12 h-12 flex items-center justify-center mx-auto text-brand-400 border border-white/5 mb-4 animate-pulse">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-zinc-100 font-bold block text-base mb-2">Stay Tuned for Articles</span>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-sm mx-auto">
              No publications have been uploaded yet. Technical writings, guides, and developer stories will be shared soon.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BlogsSection() {
  return (
    <section 
      id="blogs" 
      data-bg="#000000"
      data-surface="rgba(45, 45, 45, 0.48)"
      data-text="#f5f5f5"
      data-accent="#2CFF05"
      data-border="rgba(255, 255, 255, 0.10)"
      className="portfolio-section min-h-[90vh] flex flex-col justify-center py-28 relative overflow-hidden"
    >
      {/* Background radial highlight */}
      <div className="absolute top-1/3 left-0 w-[450px] h-[450px] rounded-full bg-brand-500/2 blur-[150px] pointer-events-none"></div>
      
      <SectionErrorBoundary sectionName="Blogs Section">
        <BlogsSectionContent />
      </SectionErrorBoundary>
    </section>
  );
}
