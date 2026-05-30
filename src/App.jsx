import { lazy, Suspense, useEffect } from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import MouseSpotlight from '@/components/MouseSpotlight';
import LazySection from '@/components/ui/LazySection';
import { applyTheme, getPreferredTheme, THEME_STORAGE_KEY } from '@/theme';

const Skills = lazy(() => import('@/components/Skills'));
const Projects = lazy(() => import('@/components/Projects'));
const Education = lazy(() => import('@/components/Education'));
const Contact = lazy(() => import('@/components/Contact'));
const Footer = lazy(() => import('@/components/Footer'));

function SectionFallback({ id, label, minHeight = 'min-h-[280px]' }) {
  return (
    <section
      id={id}
      className={`flex items-center justify-center ${minHeight} px-4 sm:px-6 lg:px-8`}
    >
      <div className="w-full max-w-6xl rounded-2xl border border-zinc-900 bg-zinc-950/50 p-6">
        <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-zinc-600">
          Loading {label}
        </div>
      </div>
    </section>
  );
}

// Layout containing all standard sections for single-page scrolling
function PortfolioHome() {
  return (
    <div className="relative">
      <MouseSpotlight />
      {/* Sections structured with matching anchors */}
      <Hero />
      <About />
      <LazySection placeholder={<SectionFallback id="skills" label="skills" />}>
        <Suspense fallback={<SectionFallback id="skills" label="skills" />}>
          <Skills />
        </Suspense>
      </LazySection>
      <LazySection placeholder={<SectionFallback id="projects" label="projects" />}>
        <Suspense fallback={<SectionFallback id="projects" label="projects" />}>
          <Projects />
        </Suspense>
      </LazySection>
      <LazySection placeholder={<SectionFallback id="education" label="education" />}>
        <Suspense fallback={<SectionFallback id="education" label="education" />}>
          <Education />
        </Suspense>
      </LazySection>
      <LazySection placeholder={<SectionFallback id="contact" label="contact" minHeight="min-h-[360px]" />}>
        <Suspense fallback={<SectionFallback id="contact" label="contact" minHeight="min-h-[360px]" />}>
          <Contact />
        </Suspense>
      </LazySection>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState(() => getPreferredTheme());

  useEffect(() => {
    applyTheme(theme);
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -8% 0px', // Trigger slightly before the element fully enters the view
      threshold: 0.05,
    };

    const intersectionObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const observeNewElements = (rootElement) => {
      const reveals = rootElement.querySelectorAll('.reveal');
      reveals.forEach((el) => {
        if (!el.classList.contains('revealed')) {
          intersectionObserver.observe(el);
        }
      });
    };

    // Initial check
    observeNewElements(document.body);

    // MutationObserver to capture elements loaded dynamically (like projects or skills from Firestore)
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) { // ELEMENT_NODE
            if (node.classList.contains('reveal')) {
              intersectionObserver.observe(node);
            }
            observeNewElements(node);
          }
        });
      });
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      intersectionObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between selection:bg-brand-500/20 selection:text-brand-300 crt-screen crt-flicker">
        <Navbar
          theme={theme}
          onToggleTheme={() => setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))}
        />
        
        {/* Main routing area */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<PortfolioHome />} />
          </Routes>
        </main>

        <LazySection placeholder={null}>
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        </LazySection>
      </div>
    </Router>
  );
}

export default App;
