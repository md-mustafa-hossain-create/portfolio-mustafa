import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Search, Calendar, Clock, ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { useFirebaseData } from '../hooks/useFirebaseData';
import { DEFAULT_BLOGS } from '../constants/data';
import { BLOGS_STRINGS } from '../constants/strings';
import SectionHeader from './ui/SectionHeader';

/**
 * @fileoverview Full-page Blogs feed (/blogs) displaying all articles, featuring search,
 * tag/category filtering tabs, and clean breadcrumbs to navigate back to the main site.
 */

export default function BlogsFeedPage() {
  const { data: blogList, loading } = useFirebaseData('blogs', DEFAULT_BLOGS);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Aggregate categories
  const categories = useMemo(() => {
    const cats = new Set(blogList.map((b) => b.category));
    return ['All', ...Array.from(cats)];
  }, [blogList]);

  // Filter blog posts
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
      <div className="min-h-screen bg-zinc-950 text-zinc-100 py-32 relative overflow-hidden">
        {/* Background glow highlights */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-brand-500/2 blur-[160px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-purple-500/2 blur-[160px] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 animate-pulse">
          {/* Navigation Breadcrumb / Back button skeleton */}
          <div className="mb-10">
            <div className="h-7 w-20 bg-zinc-900 border border-white/5 rounded-lg"></div>
          </div>

          {/* Section Header */}
          <SectionHeader
            tag={BLOGS_STRINGS.SECTION_TAG}
            icon={<BookOpen className="animate-spin" style={{ animationDuration: '3s' }} />}
            titlePrefix={BLOGS_STRINGS.SECTION_TITLE_PREFIX}
            titleHighlight={BLOGS_STRINGS.SECTION_TITLE_HIGHLIGHT}
          />

          {/* Terminal Header Info Panel Skeleton */}
          <div className="mb-12 font-mono">
            <div className="h-4 w-40 bg-zinc-900 rounded mb-2"></div>
            <div className="h-16 bg-zinc-900/30 border border-white/5 rounded-2xl"></div>
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
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-32 relative overflow-hidden">
      {/* Background glow highlights */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-brand-500/2 blur-[160px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-purple-500/2 blur-[160px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Navigation Breadcrumb / Back button */}
        <div className="mb-10 flex items-center justify-start">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-900/60 border border-white/5 hover:border-brand-500/20 text-xs font-mono text-zinc-400 hover:text-brand-400 rounded-lg transition-premium cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>cd ..</span>
          </Link>
        </div>

        {/* Section Header */}
        <SectionHeader
          tag={BLOGS_STRINGS.SECTION_TAG}
          icon={<BookOpen />}
          titlePrefix={BLOGS_STRINGS.SECTION_TITLE_PREFIX}
          titleHighlight={BLOGS_STRINGS.SECTION_TITLE_HIGHLIGHT}
        />

        {/* Terminal Header Info Panel */}
        <div className="mb-12 font-mono text-xs sm:text-sm text-zinc-500">
          <div className="flex items-center gap-2 select-none mb-2">
            <span>mustafa@dev:~$</span>
            <span className="text-brand-400">ls -la</span>
            <span className="text-purple-400">publications/</span>
          </div>
          <div className="p-4 bg-zinc-900/10 border border-white/5 rounded-2xl backdrop-blur-sm">
            <span className="text-brand-400 font-bold block mb-1">
              total {blogList.length} files
            </span>
            <p className="text-zinc-400 leading-relaxed">
              Browse through my full list of technical publications. Use the grep search and category filters to locate specific topics.
            </p>
          </div>
        </div>

        {/* Filters and Command Search Input Box */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/5">
          {/* Custom monospaced command-style search prompt */}
          <div className="relative w-full max-w-md">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-400 font-mono text-xs sm:text-sm select-none">
              grep &gt;
            </span>
            <input
              type="text"
              placeholder={BLOGS_STRINGS.SEARCH_PLACEHOLDER}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label={BLOGS_STRINGS.SEARCH_PLACEHOLDER}
              className="w-full bg-zinc-950/65 border border-white/5 focus:border-brand-500/30 focus:outline-none rounded-2xl py-3 pl-16 pr-10 text-xs sm:text-sm text-white font-mono placeholder-zinc-600 transition-premium shadow-inner"
            />
            {searchQuery ? (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 font-mono text-xs cursor-pointer"
              >
                clear
              </button>
            ) : (
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
            )}
          </div>

          {/* Filtering pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono border transition-premium cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-brand-500/10 border-brand-500/30 text-brand-400 font-semibold'
                    : 'bg-zinc-900/30 border-white/5 text-zinc-400 hover:text-brand-400 hover:border-brand-500/20'
                }`}
              >
                {cat === 'All' ? '[All]' : `[${cat}]`}
              </button>
            ))}
          </div>
        </div>

        {/* Grid display layout */}
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {filteredBlogs.map((blog, idx) => {
              const isExternal = !!blog.externalUrl;

              const cardContent = (
                <div className="rounded-[calc(1.5rem-0.25rem)] bg-zinc-950/45 p-4 flex flex-col h-full">
                  {/* Thumbnail / Header Area */}
                  {blog.coverImage && (
                    <div className="relative w-full h-40 rounded-xl overflow-hidden mb-4 shrink-0 bg-zinc-900">
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-premium"
                      />
                      <span className="absolute top-3 left-3 bg-zinc-950/80 border border-white/10 text-[9px] font-mono text-zinc-300 px-2 py-0.5 rounded-full backdrop-blur-md">
                        {blog.category}
                      </span>
                    </div>
                  )}

                  {/* Metadata Row */}
                  <div className="flex items-center gap-3 text-[10px] font-mono text-zinc-500 mb-2 shrink-0">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-zinc-600" />
                      {blog.date}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-zinc-600" />
                      {blog.readTime}
                    </span>
                  </div>

                  {/* Text Title & Summary */}
                  <h3 className="text-sm sm:text-base font-bold text-white leading-snug group-hover:text-brand-400 transition-colors line-clamp-2 shrink-0">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-2 line-clamp-3 leading-relaxed font-mono flex-grow font-semibold">
                    {blog.summary}
                  </p>

                  {/* Bottom Footer Tags & Actions */}
                  <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 shrink-0">
                    <div className="flex flex-wrap gap-1.5">
                      {blog.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-[9px] font-mono text-zinc-600">
                          #{tag.toLowerCase()}
                        </span>
                      ))}
                    </div>
                    <div className="text-[10px] font-mono font-semibold text-brand-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      {isExternal ? (
                        <>
                          {BLOGS_STRINGS.EXTERNAL_LINK}
                          <ExternalLink className="w-3 h-3" />
                        </>
                      ) : (
                        <>
                          {BLOGS_STRINGS.READ_MORE}
                          <ArrowRight className="w-3 h-3" />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );

              if (isExternal) {
                return (
                  <a
                    key={blog.id}
                    href={blog.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 bg-zinc-900/10 backdrop-blur-md border border-white/5 rounded-3xl hover:border-brand-500/20 hover:scale-[1.01] transition-premium group relative cursor-pointer flex flex-col h-full shadow-md"
                  >
                    {cardContent}
                  </a>
                );
              }

              return (
                <Link
                  key={blog.id}
                  to={`/blogs/${blog.id}`}
                  className="p-1 bg-zinc-900/10 backdrop-blur-md border border-white/5 rounded-3xl hover:border-brand-500/20 hover:scale-[1.01] transition-premium group relative cursor-pointer flex flex-col h-full shadow-md"
                >
                  {cardContent}
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-24 font-mono text-zinc-500">
            <span className="text-brand-500 font-bold block text-sm sm:text-base mb-1">
              [SYSTEM] Search complete.
            </span>
            <p className="text-xs sm:text-sm">{BLOGS_STRINGS.NO_RESULTS}</p>
          </div>
        )}
      </div>
    </div>
  );
}
