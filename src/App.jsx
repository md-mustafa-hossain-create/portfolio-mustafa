import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Home from '@/pages/Home';
import Footer from '@/components/Footer';

// Lazy-load top-level pages
const BlogsFeed = lazy(() => import('@/pages/BlogsFeed'));
const BlogPost = lazy(() => import('@/pages/BlogPost'));
const ProjectCaseStudy = lazy(() => import('@/pages/ProjectCaseStudy'));

/**
 * Standard visual fallback loading indicator for full-page routes.
 */
function SectionFallback({ id, label, minHeight = 'min-h-[400px]' }) {
  return (
    <section
      id={id}
      className={`flex items-center justify-center ${minHeight} px-4 sm:px-6 lg:px-8`}
    >
      <div className="w-full max-w-6xl rounded-2xl border border-zinc-900 bg-zinc-950/50 p-8 text-center">
        <div className="text-xs font-mono uppercase tracking-[0.22em] text-zinc-400 animate-pulse">
          Syncing {label}...
        </div>
      </div>
    </section>
  );
}

/**
 * Ensures scrolls reset to top of page on route shifts.
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Prevent the browser from automatically restoring scroll position on refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

/**
 * Main Application routing wrapper.
 * @returns {React.ReactElement}
 */
export default function App() {
  return (
      <Router>
        <div className="portfolio-shell min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between selection:bg-brand-500/20 selection:text-brand-300 relative">
          {/* Navigation Bar */}
          <Navbar />
          
          {/* Main routing area */}
          <main className="flex-grow">
            <ScrollToTop />
            <Routes>
              <Route
                path="/"
                element={<Home />}
              />
              <Route
                path="/blogs"
                element={
                  <Suspense fallback={<SectionFallback id="blogs-feed" label="blogs feed" />}>
                    <BlogsFeed />
                  </Suspense>
                }
              />
              <Route
                path="/blogs/:id"
                element={
                  <Suspense fallback={<SectionFallback id="blog-post" label="blog article" />}>
                    <BlogPost />
                  </Suspense>
                }
              />
              <Route
                path="/projects/:id"
                element={
                  <Suspense fallback={<SectionFallback id="project-case-study" label="case study" />}>
                    <ProjectCaseStudy />
                  </Suspense>
                }
              />
            </Routes>
          </main>

          {/* Global footer */}
          <Footer />
        </div>
      </Router>
  );
}
