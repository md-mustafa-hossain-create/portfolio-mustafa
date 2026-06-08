import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, ExternalLink } from 'lucide-react';
import { BLOGS_STRINGS } from '@/constants/strings';
import ScrollReveal from '@/shared/components/ui/ScrollReveal';

/**
 * @fileoverview Blog Card component to display single article previews.
 */

/**
 * @typedef {Object} BlogCardProps
 * @property {Object} rawBlog - Raw database record to normalize and display.
 * @property {number} index - Index in layout lists for stagger delay calculations.
 */

/**
 * BlogCard component.
 * @param {BlogCardProps} props
 * @returns {React.ReactElement}
 */
export default function BlogCard({ blog, index }) {
  const isExternal = !!blog.externalUrl;
  
  const cardContent = (
    <div className="rounded-[calc(1.5rem-0.25rem)] bg-zinc-950/45 p-4 flex flex-col h-full font-sans">
      {/* Thumbnail */}
      {blog.coverImage && (
        <div className="relative w-full h-40 rounded-xl overflow-hidden mb-4 shrink-0 bg-zinc-900">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-premium"
          />
          <span className="absolute top-3 left-3 bg-zinc-950/80 border border-white/10 text-[9px] font-semibold text-zinc-300 px-2 py-0.5 rounded-full backdrop-blur-md">
            {blog.category}
          </span>
        </div>
      )}

      {/* Metadata */}
      <div className="flex items-center gap-3 text-[10px] font-medium text-zinc-500 mb-2.5 shrink-0">
        <span className="flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5 text-zinc-600" />
          {blog.date}
        </span>
        <span>·</span>
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-zinc-600" />
          {blog.readTime}
        </span>
      </div>

      {/* Title & Summary */}
      <h3 className="text-sm sm:text-base font-bold text-white leading-snug group-hover:text-brand-400 transition-colors line-clamp-2 shrink-0">
        {blog.title}
      </h3>
      <p className="text-xs text-zinc-400 mt-2 line-clamp-3 leading-relaxed flex-grow font-normal">
        {blog.summary}
      </p>

      {/* Tags & Action */}
      <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 shrink-0">
        <div className="flex flex-wrap gap-1.5">
          {blog.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-[9px] text-zinc-500 font-medium">
              #{tag.toLowerCase()}
            </span>
          ))}
        </div>
        <div className="text-[10px] font-semibold text-brand-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
          {isExternal ? (
            <>
              {BLOGS_STRINGS.EXTERNAL_LINK}
              <ExternalLink className="w-3.5 h-3.5" />
            </>
          ) : (
            <>
              {BLOGS_STRINGS.READ_MORE}
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </div>
      </div>
    </div>
  );

  const containerClasses = "p-1 bg-zinc-900/10 backdrop-blur-md border border-white/5 rounded-3xl hover:border-brand-500/20 hover:scale-[1.01] transition-premium group relative cursor-pointer flex flex-col h-full shadow-md";

  if (isExternal) {
    return (
      <ScrollReveal animation="zoom" delay={0.2 + index * 0.05} className="h-full">
        <a
          href={blog.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={containerClasses}
        >
          {cardContent}
        </a>
      </ScrollReveal>
    );
  }

  return (
    <ScrollReveal animation="zoom" delay={0.2 + index * 0.05} className="h-full">
      <Link
        to={`/blogs/${blog.id}`}
        className={containerClasses}
      >
        {cardContent}
      </Link>
    </ScrollReveal>
  );
}

BlogCard.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    coverImage: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    readTime: PropTypes.string.isRequired,
    externalUrl: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
