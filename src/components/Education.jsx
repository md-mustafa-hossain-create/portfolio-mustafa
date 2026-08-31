import { GraduationCap } from 'lucide-react';
import SectionHeader from '@/shared/components/ui/SectionHeader';
import EducationCard from './ui/EducationCard';
import { EDUCATION_STRINGS } from '../constants/strings';
import { EDUCATION_DATA } from '../constants/data';

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
      className="portfolio-section min-h-[90vh] flex flex-col justify-center py-20 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Heading */}
        <SectionHeader 
          tag={EDUCATION_STRINGS.SECTION_TAG}
          icon={<GraduationCap />}
          titlePrefix={EDUCATION_STRINGS.SECTION_TITLE_PREFIX}
          titleHighlight={EDUCATION_STRINGS.SECTION_TITLE_HIGHLIGHT}
        />

        {/* Timeline */}
        <div className="max-w-2xl mx-auto">
          <div className="space-y-6">
            {EDUCATION_DATA.map((entry, idx) => (
              <EducationCard 
                key={idx} 
                entry={entry} 
                index={idx} 
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
