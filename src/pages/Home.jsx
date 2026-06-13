import MouseSpotlight from '@/components/MouseSpotlight';
import About from '@/components/About';
import { HeroSection } from '@/features/hero';
import { ProjectsSection } from '@/features/projects';
import { BlogsSection } from '@/features/blog';
import { ContactSection } from '@/features/contact';
import Skills from '@/components/Skills';
import Education from '@/components/Education';

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
      
      <Skills />
      
      <ProjectsSection />
      
      <Education />
      
      <BlogsSection />
      
      <ContactSection />
    </div>
  );
}
