import { GraduationCap } from 'lucide-react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import SectionHeader from '@/shared/components/ui/SectionHeader';
import EducationCard from './ui/EducationCard';
import { EDUCATION_STRINGS } from '../constants/strings';
import { EDUCATION_DATA } from '../constants/data';

function EducationTimeline({ children }) {
  const timelineRef = useRef(null);
  const isInView = useInView(timelineRef, { once: true, margin: '-12% 0px -12% 0px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <div ref={timelineRef} className="relative space-y-4 sm:space-y-5">
      <motion.div
        aria-hidden="true"
        initial={prefersReducedMotion ? false : { opacity: 0, scaleY: 0 }}
        animate={prefersReducedMotion || isInView ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: 'top' }}
        className="absolute left-[1.18rem] top-7 bottom-7 w-px bg-gradient-to-b from-brand-400/70 via-zinc-700 to-transparent"
      />
      {children}
    </div>
  );
}

/**
 * @fileoverview Main Education section component.
 * Refactored to use extracted constants, reusable SectionHeader,
 * and EducationCard sub-component to ensure SRP compliance.
 */
export default function Education() {
  return (
    <section 
      id="education" 
      data-bg="#000000"
      data-surface="rgba(45, 45, 45, 0.48)"
      data-text="#f5f5f5"
      data-accent="#2CFF05"
      data-border="rgba(255, 255, 255, 0.10)"
      className="portfolio-section flex flex-col justify-center py-20 sm:py-24 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="absolute -top-32 right-[8%] h-80 w-80 rounded-full bg-brand-400/[0.035] blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Heading */}
        <SectionHeader 
          tag={EDUCATION_STRINGS.SECTION_TAG}
          icon={<GraduationCap />}
          titlePrefix={EDUCATION_STRINGS.SECTION_TITLE_PREFIX}
          titleHighlight={EDUCATION_STRINGS.SECTION_TITLE_HIGHLIGHT}
        />

        {/* Timeline */}
        <div className="max-w-5xl mx-auto mt-12 sm:mt-16">
          <EducationTimeline>
            {EDUCATION_DATA.map((entry, idx) => (
              <EducationCard 
                key={idx} 
                entry={entry} 
                index={idx} 
              />
            ))}
          </EducationTimeline>
        </div>

      </div>
    </section>
  );
}
