import { Link } from 'react-router-dom';
import { BookOpen, Calendar, Clock, ArrowRight, ExternalLink } from 'lucide-react';
import { useFirebaseData } from '../hooks/useFirebaseData';
import { DEFAULT_BLOGS } from '../constants/data';
import { BLOGS_STRINGS } from '../constants/strings';
import SectionHeader from './ui/SectionHeader';

/**
 * @fileoverview Compact Blogs section preview. Renders only the single latest blog post
 * on the home page and redirects users to a full-screen feed of all logs at /blogs.
 * Handles empty states dynamically if no blogs are present.
 */

export default function Blogs() {
  const { data: blogList, loading } = useFirebaseData('blogs', DEFAULT_BLOGS);

  if (loading) {
    return (
      <section id="blogs" className="py-28 relative overflow-hidden bg-zinc-950/20">
        {/* Background radial highlight */}
        <div className="absolute top-1/3 left-0 w-[450px] h-[450px] rounded-full bg-brand-500/2 blur-[150px] pointer-events-none"></div>

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
                <div className="w-full h-40 bg-zinc-900 rounded-xl mb-4"></div>
                <div className="h-3 w-20 bg-zinc-900 rounded mb-3"></div>
                <div className="h-5 w-40 bg-zinc-900 rounded mb-3"></div>
                <div className="h-4 w-full bg-zinc-900 rounded mb-2"></div>
                <div className="h-4 w-5/6 bg-zinc-900 rounded mb-4"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Display only the single latest article
  const previewBlogs = blogList.slice(0, 1);
  const hasBlogs = blogList.length > 0;

  return (
    <section id="blogs" className="py-28 relative overflow-hidden bg-zinc-950/20">
      {/* Background radial highlight */}
      <div className="absolute top-1/3 left-0 w-[450px] h-[450px] rounded-full bg-brand-500/2 blur-[150px] pointer-events-none"></div>

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
            <div className="max-w-md mx-auto mt-12">
              {previewBlogs.map((blog, idx) => {
                const isExternal = !!blog.externalUrl;
                
                const cardContent = (
                  <div className="rounded-[calc(1.5rem-0.25rem)] bg-zinc-950/45 p-4 flex flex-col h-full">
                    {/* Thumbnail */}
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

                    {/* Metadata */}
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

                    {/* Title & Summary */}
                    <h3 className="text-sm sm:text-base font-bold text-white leading-snug group-hover:text-brand-400 transition-colors line-clamp-2 shrink-0">
                      {blog.title}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-2 line-clamp-3 leading-relaxed font-mono flex-grow font-semibold">
                      {blog.summary}
                    </p>

                    {/* Tags & Action */}
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
                      className="p-1 bg-zinc-900/10 backdrop-blur-md border border-white/5 rounded-3xl hover:border-brand-500/20 hover:scale-[1.01] transition-premium group relative cursor-pointer flex flex-col h-full reveal shadow-md animate-fade-up"
                      style={{ transitionDelay: `${200 + idx * 50}ms` }}
                    >
                      {cardContent}
                    </a>
                  );
                }

                return (
                  <Link
                    key={blog.id}
                    to={`/blogs/${blog.id}`}
                    className="p-1 bg-zinc-900/10 backdrop-blur-md border border-white/5 rounded-3xl hover:border-brand-500/20 hover:scale-[1.01] transition-premium group relative cursor-pointer flex flex-col h-full reveal shadow-md animate-fade-up"
                    style={{ transitionDelay: `${200 + idx * 50}ms` }}
                  >
                    {cardContent}
                  </Link>
                );
              })}
            </div>

            {/* View All CTA Button */}
            <div className="mt-16 text-center reveal" style={{ transitionDelay: '300ms' }}>
              <Link
                to="/blogs"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-mono font-bold tracking-wider uppercase text-white bg-zinc-900 border border-zinc-800 hover:border-brand-400/50 hover:bg-zinc-900/80 rounded-full transition-premium active:scale-95 shadow-lg"
              >
                <span>cd /blogs && npm run dev</span>
                <ArrowRight className="w-3.5 h-3.5 text-brand-400" />
              </Link>
            </div>
          </>
        ) : (
          /* Sleek monospaced empty state */
          <div className="p-1 bg-zinc-900/10 backdrop-blur-md border border-white/5 rounded-3xl max-w-lg mx-auto shadow-md mt-12">
            <div className="rounded-[calc(1.5rem-0.25rem)] bg-zinc-950/45 p-6 sm:p-8 text-center font-mono">
              <div className="p-3 bg-zinc-900/40 rounded-full w-12 h-12 flex items-center justify-center mx-auto text-brand-400 border border-white/5 mb-4 animate-pulse">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-brand-500 font-bold block text-sm mb-1">[SYSTEM] Log database offline.</span>
              <p className="text-xs text-zinc-400 leading-relaxed">
                No publications have been uploaded yet. Technical writings, system logs, and articles are on the way.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
