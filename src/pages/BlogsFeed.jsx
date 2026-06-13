import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Search, ArrowLeft } from 'lucide-react';
import { useFirebaseData } from '@/hooks/useFirebaseData';
import { DEFAULT_BLOGS } from '@/constants/data';
import { BLOGS_STRINGS } from '@/constants/strings';
import SectionHeader from '@/shared/components/ui/SectionHeader';
import BlogCard from '@/features/blog/components/BlogCard';
import { normalizeBlogs } from '@/features/blog/utils/blogAdapters';

/**
 * @fileoverview Full-page Blogs feed (/blogs) displaying all articles, featuring search,
 * tag/category filtering tabs, and clean breadcrumbs to navigate back to the main site.
 * Handles empty states dynamically if no blogs are present.
 */

export default function BlogsFeed() {
  const { data: rawBlogList, loading } = useFirebaseData('blogs', DEFAULT_BLOGS);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Normalize blog posts
  const blogList = useMemo(() => normalizeBlogs(rawBlogList), [rawBlogList]);

  // Aggregate categories dynamically
  const categories = useMemo(() => {
    const cats = new Set(blogList.map((b) => b.category));
    return ['All', ...Array.from(cats)];
  }, [blogList]);

  // Filter blog posts based on search input and active category
  const filteredBlogs = useMemo(() => {
    return blogList.filter((blog) => {
      const matchesCategory = activeCategory === 'All' || blog.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        blog.title.toLowerCase().includes(query) ||
        blog.summary.toLowerCase().includes(query) ||
        blog.tags.some((tag) => tag.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [blogList, activeCategory, searchQuery]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 py-32 relative overflow-hidden font-sans">
        {/* Background glow highlights */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-brand-500/2 blur-[160px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-purple-500/2 blur-[160px] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 animate-pulse">
          {/* Navigation Breadcrumb / Back button skeleton */}
          <div className="mb-10">
            <div className="h-8 w-24 bg-zinc-900 border border-zinc-800/80 rounded-xl"></div>
          </div>

          {/* Section Header */}
          <SectionHeader
            tag={BLOGS_STRINGS.SECTION_TAG}
            icon={<BookOpen className="animate-spin" style={{ animationDuration: '3s' }} />}
            titlePrefix={BLOGS_STRINGS.SECTION_TITLE_PREFIX}
            titleHighlight={BLOGS_STRINGS.SECTION_TITLE_HIGHLIGHT}
          />

          {/* Header Info Panel Skeleton */}
          <div className="mb-12">
            <div className="h-6 w-48 bg-zinc-900 rounded mb-3"></div>
            <div className="h-4 w-96 bg-zinc-900 rounded"></div>
          </div>

          {/* Grid display layout skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {[1, 2, 3].map((item) => (
              <div key={item} className="p-1 bg-zinc-900/10 border border-white/5 rounded-3xl min-h-[340px]">
                <div className="rounded-[calc(1.5rem-0.25rem)] bg-zinc-950/45 p-6 flex flex-col h-full">
                  <div className="w-full h-40 bg-zinc-900 rounded-xl mb-4"></div>
                  <div className="h-3 w-20 bg-zinc-900 rounded mb-3"></div>
                  <div className="h-5 w-40 bg-zinc-900 rounded mb-3"></div>
                  <div className="h-4 w-full bg-zinc-900 rounded mb-2"></div>
                  <div className="h-4 w-5/6 bg-zinc-900 rounded mb-4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-32 relative overflow-hidden font-sans">
      {/* Background glow highlights */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-brand-500/2 blur-[160px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-purple-500/2 blur-[160px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Navigation Breadcrumb / Back button */}
        <div className="mb-10 flex items-center justify-start">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-zinc-900/60 border border-zinc-850 hover:border-brand-500/20 text-xs font-semibold text-zinc-400 hover:text-brand-400 rounded-xl transition-premium cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Section Header */}
        <SectionHeader
          tag={BLOGS_STRINGS.SECTION_TAG}
          icon={<BookOpen />}
          titlePrefix={BLOGS_STRINGS.SECTION_TITLE_PREFIX}
          titleHighlight={BLOGS_STRINGS.SECTION_TITLE_HIGHLIGHT}
        />

        {/* Modern Introduction Title Panel */}
        <div className="mb-12 text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Publications & Thoughts</h2>
          <p className="text-zinc-400 text-sm max-w-2xl leading-relaxed">
            Explore articles, guides, and tutorials written about modern front-end development, visual interfaces, and web engineering.
          </p>
        </div>

        {/* Filters and Search Input Box */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-zinc-850/60">
          
          {/* Custom modern search widget */}
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder={BLOGS_STRINGS.SEARCH_PLACEHOLDER}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label={BLOGS_STRINGS.SEARCH_PLACEHOLDER}
              className="w-full bg-zinc-900/30 border border-zinc-850 focus:border-brand-500 focus:outline-none rounded-full py-3 pl-11 pr-12 text-xs sm:text-sm text-white placeholder-zinc-500 transition-all duration-300"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200 text-xs font-semibold cursor-pointer border-none bg-transparent"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filtering pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-300 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-brand-500/10 border-brand-500/30 text-brand-400'
                    : 'bg-zinc-900/30 border-zinc-850 text-zinc-400 hover:text-brand-400 hover:border-brand-500/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid display layout */}
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {filteredBlogs.map((blog, idx) => (
              <BlogCard key={blog.id || idx} blog={blog} index={idx} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 text-zinc-400">
            <span className="text-zinc-300 font-bold block text-base mb-2">
              No results found
            </span>
            <p className="text-xs sm:text-sm text-zinc-400">{BLOGS_STRINGS.NO_RESULTS}</p>
          </div>
        )}
      </div>
    </div>
  );
}
