import { Sparkles } from 'lucide-react';
import { useFirebaseData } from '../hooks/useFirebaseData';
import { SKILLS_STRINGS } from '../constants/strings';
import { DEFAULT_SKILLS } from '../constants/data';
import SectionHeader from '@/shared/components/ui/SectionHeader';
import SkillCard from './ui/SkillCard';

/**
 * @fileoverview Main Skills section component.
 * Refactored to use the custom useFirebaseData hook, extracted constants,
 * and the SkillCard sub-component to ensure code readability and DRY compliance.
 */

export default function Skills() {
  const { data: skillList, loading } = useFirebaseData('skills', DEFAULT_SKILLS);

  if (loading) {
    return (
      <section id="skills" className="py-28 relative overflow-hidden bg-zinc-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="animate-pulse">
            <SectionHeader 
              tag={SKILLS_STRINGS.SECTION_TAG}
              icon={<Sparkles />}
              titlePrefix={SKILLS_STRINGS.SECTION_TITLE_PREFIX}
              titleHighlight={SKILLS_STRINGS.SECTION_TITLE_HIGHLIGHT}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="p-1.5 bg-zinc-900/10 backdrop-blur-sm border border-white/5 rounded-[2rem] animate-pulse">
                <div className="rounded-[calc(2rem-0.375rem)] bg-zinc-950/40 backdrop-blur-md border border-white/5 p-6 flex items-center gap-4 h-full">
                  <div className="w-14 h-14 bg-zinc-900/50 rounded-xl border border-zinc-800 shrink-0"></div>
                  <div className="flex-1 space-y-2.5">
                    <div className="h-5 w-24 bg-zinc-900/50 rounded-md"></div>
                    <div className="h-3 w-32 bg-zinc-900/50 rounded-md"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="skills" 
      data-bg="#000000"
      data-surface="rgba(45, 45, 45, 0.48)"
      data-text="#f5f5f5"
      data-accent="#2CFF05"
      data-border="rgba(255, 255, 255, 0.10)"
      className="portfolio-section min-h-[90vh] flex flex-col justify-center py-28 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <SectionHeader 
          tag={SKILLS_STRINGS.SECTION_TAG}
          icon={<Sparkles />}
          titlePrefix={SKILLS_STRINGS.SECTION_TITLE_PREFIX}
          titleHighlight={SKILLS_STRINGS.SECTION_TITLE_HIGHLIGHT}
        />
        


        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillList.map((skill, idx) => (
            <SkillCard key={skill.id || idx} skill={skill} index={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}
