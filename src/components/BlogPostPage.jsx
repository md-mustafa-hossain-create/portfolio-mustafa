import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { useFirebaseData } from '../hooks/useFirebaseData';
import { DEFAULT_BLOGS } from '../constants/data';
import { BLOGS_STRINGS } from '../constants/strings';

// Simple parser helper to convert inline markdown styles (**bold**, `code`) into React elements
function parseInlineStyles(text) {
  const regex = /(\*\*.*?\*\*|`.*?`)/g;
  const parts = text.split(regex);

  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="text-white font-bold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={i} className="bg-zinc-900 border border-white/10 px-1.5 py-0.5 rounded text-xs text-brand-300 font-mono">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

// Custom Markdown renderer to natively compile Markdown syntax
function renderMarkdown(md) {
  if (!md) return null;
  const lines = md.split('\n');
  let inCodeBlock = false;
  const codeLines = [];
  const renderedElements = [];

  lines.forEach((line, idx) => {
    // Code blocks detection
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        inCodeBlock = false;
        const codeText = codeLines.join('\n');
        renderedElements.push(
          <pre
            key={`code-${idx}`}
            className="bg-zinc-950 border border-white/5 p-4 rounded-xl font-mono text-[11px] sm:text-xs text-brand-400 my-6 overflow-x-auto whitespace-pre leading-relaxed shadow-inner"
          >
            <code>{codeText}</code>
          </pre>
        );
        codeLines.length = 0;
      } else {
        inCodeBlock = true;
      }
      return;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      return;
    }

    // Markdown Headers
    if (line.startsWith('# ')) {
      renderedElements.push(
        <h1
          key={idx}
          className="text-2xl sm:text-3xl font-bold text-white mt-8 mb-4 tracking-tight border-b border-white/5 pb-2"
        >
          {line.slice(2)}
        </h1>
      );
      return;
    }
    if (line.startsWith('## ')) {
      renderedElements.push(
        <h2 key={idx} className="text-lg sm:text-xl font-bold text-white mt-8 mb-4 tracking-tight">
          {line.slice(3)}
        </h2>
      );
      return;
    }
    if (line.startsWith('### ')) {
      renderedElements.push(
        <h3 key={idx} className="text-base sm:text-lg font-bold text-zinc-100 mt-6 mb-2">
          {line.slice(4)}
        </h3>
      );
      return;
    }

    // Lists
    if (line.trim().startsWith('- ')) {
      renderedElements.push(
        <li
          key={idx}
          className="text-xs sm:text-sm text-zinc-400 ml-4 list-disc mb-1.5 leading-relaxed font-mono"
        >
          {parseInlineStyles(line.trim().slice(2))}
        </li>
      );
      return;
    }

    // Spacing
    if (!line.trim()) {
      renderedElements.push(<div key={idx} className="h-3"></div>);
      return;
    }

    // Paragraph text
    renderedElements.push(
      <p key={idx} className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-4 font-mono">
        {parseInlineStyles(line)}
      </p>
    );
  });

  return renderedElements;
}

export default function BlogPostPage() {
  const { id } = useParams();
  const [scrollProgress, setScrollProgress] = useState(0);
  const { data: blogList, loading } = useFirebaseData('blogs', DEFAULT_BLOGS);

  // Scroll spy reading progress listener with optimizations to avoid layout thrashing
  useEffect(() => {
    if (loading) return; // Wait until content is fully loaded and mounted

    // Calculate total scrollable height once after component mounts
    let totalHeight = document.documentElement.scrollHeight - window.innerHeight;

    const handleResize = () => {
      totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    };

    let lastProgress = 0;
    const handleScroll = () => {
      if (totalHeight > 0) {
        // Calculate progress percentage, rounding to the nearest integer
        // to reduce React state updates and avoid unnecessary re-renders.
        const progress = Math.round((window.scrollY / totalHeight) * 100);
        
        if (progress !== lastProgress) {
          lastProgress = progress;
          setScrollProgress(progress);
        }
      }
    };

    // Recalculate height after a short delay to account for dynamic image renders
    const timer = setTimeout(() => {
      totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    }, 150);

    // Use passive listeners to allow smooth composited scrolling
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [loading, id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 py-32 flex flex-col items-center justify-center font-mono">
        <div className="p-3 bg-zinc-900/40 rounded-full w-12 h-12 flex items-center justify-center mx-auto text-brand-400 border border-white/5 mb-4 animate-spin">
          <Clock className="w-5 h-5" />
        </div>
        <span className="text-brand-500 font-bold text-sm mb-1">[SYSTEM] Reading article from database...</span>
      </div>
    );
  }

  // Retrieve blog post by parameter ID
  const blog = blogList.find((b) => b.id === id);

  // If blog does not exist, display custom 404 fallback
  if (!blog) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 py-32 flex flex-col items-center justify-center font-mono">
        <span className="text-brand-500 font-bold text-base mb-2">[ERROR] exit code 404</span>
        <p className="text-zinc-500 mb-6 text-xs sm:text-sm">Requested log file '{id}' was not found.</p>
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-white/5 hover:border-brand-500/20 text-xs text-zinc-400 hover:text-brand-400 rounded-lg transition-premium cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>cd /blogs</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-32 relative overflow-hidden">
      {/* Top sticky reading progress tracker indicator */}
      <div
        className="fixed top-0 left-0 h-1 bg-brand-500 z-[110] transition-all duration-75 shadow-[0_0_10px_rgba(85,255,85,0.4)]"
        style={{ width: `${scrollProgress}%` }}
      ></div>

      {/* Background soft lighting highlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[550px] rounded-full bg-brand-500/2 blur-[170px] pointer-events-none"></div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Navigation Breadcrumb / Back button */}
        <div className="mb-10 flex items-center justify-start">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-900/60 border border-white/5 hover:border-brand-500/20 text-xs font-mono text-zinc-400 hover:text-brand-400 rounded-lg transition-premium cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>cd /blogs</span>
          </Link>
        </div>

        {/* Article Metadata and Headers */}
        <article className="space-y-8">
          
          <div className="space-y-4 text-left">
            <span className="px-2.5 py-1 text-[10px] font-mono rounded bg-brand-500/10 border border-brand-400/20 text-brand-400 uppercase tracking-widest">
              {blog.category}
            </span>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {blog.title}
            </h1>

            {/* Author info & Metadata row */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-500 border-b border-white/5 pb-6">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-zinc-600" />
                {blog.date}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-zinc-600" />
                {blog.readTime}
              </span>
            </div>
          </div>

          {/* Hero Banner Cover Image */}
          {blog.coverImage && (
            <div className="w-full h-56 sm:h-80 md:h-[400px] rounded-3xl overflow-hidden bg-zinc-900 shadow-2xl relative border border-white/5">
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/20 to-transparent"></div>
            </div>
          )}

          {/* Markdown Content Area */}
          <div className="prose prose-invert max-w-none text-left pt-4">
            {renderMarkdown(blog.content)}
          </div>
          
        </article>

        {/* Reading completion footer */}
        <div className="mt-16 pt-8 border-t border-white/5 flex items-center justify-between font-mono text-xs text-zinc-500">
          <span>// End of file logs</span>
          <Link
            to="/blogs"
            className="text-brand-400 hover:text-brand-300 flex items-center gap-1 transition-colors"
          >
            <span>cd /blogs</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
