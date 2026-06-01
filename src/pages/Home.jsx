import { lazy, Suspense } from 'react';
import MouseSpotlight from '@/components/MouseSpotlight';
import About from '@/components/About';
import LazySection from '@/shared/components/ui/LazySection';
import { HeroSection } from '@/features/hero';
import { ProjectsSection } from '@/features/projects';
import { BlogsSection } from '@/features/blog';
import { ContactSection } from '@/features/contact';

// Lazy load non-critical home page sections
const Skills = lazy(() => import('@/components/Skills'));
const Education = lazy(() => import('@/components/Education'));

/**
 * Standard loading fallback spacer for lazy-loaded sections.
 * @param {Object} props
 * @param {string} props.id - Target HTML anchor.
 * @param {string} props.label - Human-readable name.
 * @param {string} [props.minHeight] - Custom utility height class.
 */
function SectionFallback({ id, label, minHeight = 'min-h-[280px]' }) {
  return (
    <section
      id={id}
      className={`flex items-center justify-center ${minHeight} px-4 sm:px-6 lg:px-8`}
    >
      <div className="w-full max-w-6xl rounded-2xl border border-zinc-900 bg-zinc-950/50 p-6">
        <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-zinc-400">
          Loading {label}...
        </div>
      </div>
    </section>
  );
}

/**
 * Home page assembling all layout segments for single-page scrolling experience.
 * @returns {React.ReactElement}
 */
export default function Home() {
  return (
    <div className="relative">
      <MouseSpotlight />
      
      {/* Sections structured with matching anchors */}
      <HeroSection />
      
      <About />
      
      <LazySection placeholder={<SectionFallback id="skills" label="skills" />}>
        <Suspense fallback={<SectionFallback id="skills" label="skills" />}>
          <Skills />
        </Suspense>
      </LazySection>
      
      <LazySection placeholder={<SectionFallback id="projects" label="projects" />}>
        <Suspense fallback={<SectionFallback id="projects" label="projects" />}>
          <ProjectsSection />
        </Suspense>
      </LazySection>
      
      <LazySection placeholder={<SectionFallback id="education" label="education" />}>
        <Suspense fallback={<SectionFallback id="education" label="education" />}>
          <Education />
        </Suspense>
      </LazySection>
      
      <LazySection placeholder={<SectionFallback id="blogs" label="blogs" />}>
        <Suspense fallback={<SectionFallback id="blogs" label="blogs" />}>
          <BlogsSection />
        </Suspense>
      </LazySection>
      
      <LazySection placeholder={<SectionFallback id="contact" label="contact" minHeight="min-h-[360px]" />}>
        <Suspense fallback={<SectionFallback id="contact" label="contact" minHeight="min-h-[360px]" />}>
          <ContactSection />
        </Suspense>
      </LazySection>
    </div>
  );
}
