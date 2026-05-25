import { Code2 } from 'lucide-react';
import { useFirebaseData } from '../hooks/useFirebaseData';
import { PROJECTS_STRINGS } from '../constants/strings';
import { DEFAULT_PROJECTS } from '../constants/data';
import SectionHeader from './ui/SectionHeader';
import ProjectCard from './ui/ProjectCard';

/**
 * @fileoverview Main Projects section component.
 * Refactored to use the custom useFirebaseData hook, extracted constants,
 * and the ProjectCard sub-component to ensure code readability and DRY compliance.
 */

export default function Projects() {
  const { data: projectList, loading } = useFirebaseData('projects', DEFAULT_PROJECTS);

  if (loading) {
    return (
      <section id="projects" className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] uppercase tracking-wider font-mono text-brand-400 mb-3 animate-pulse">
              <Code2 className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '3s' }} />
              <span>{PROJECTS_STRINGS.SECTION_TAG}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tighter">
              {PROJECTS_STRINGS.SECTION_TITLE_PREFIX} <span className="text-brand-400">{PROJECTS_STRINGS.SECTION_TITLE_HIGHLIGHT}</span>
            </h2>
            <div className="w-16 h-1 bg-brand-500 mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="double-bezel-outer p-2 flex flex-col justify-between min-h-[340px] animate-pulse">
                <div className="double-bezel-inner p-6 flex flex-col h-full bg-zinc-950/90">
                  <div className="flex items-center justify-between border-b border-zinc-900/60 pb-3 mb-5 shrink-0">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-800"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-800"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-800"></div>
                    </div>
                    <div className="h-3 w-16 bg-zinc-900 rounded"></div>
                  </div>
                  <div className="flex-grow flex flex-col">
                    <div className="h-3 w-24 bg-zinc-900 rounded mb-4"></div>
                    <div className="h-5 w-40 bg-zinc-900 rounded mb-3"></div>
                    <div className="h-4 w-full bg-zinc-900 rounded mb-2"></div>
                    <div className="h-4 w-5/6 bg-zinc-900 rounded mb-5"></div>
                    <div className="flex gap-2 mb-6">
                      <div className="h-5 w-14 bg-zinc-900 rounded"></div>
                      <div className="h-5 w-16 bg-zinc-900 rounded"></div>
                      <div className="h-5 w-12 bg-zinc-900 rounded"></div>
                    </div>
                    <div className="flex gap-4 border-t border-zinc-900/60 pt-4 mt-auto">
                      <div className="h-8 flex-1 bg-zinc-900 rounded-lg"></div>
                      <div className="h-8 flex-1 bg-zinc-900 rounded-lg"></div>
                    </div>
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
    <section id="projects" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <SectionHeader 
          tag={PROJECTS_STRINGS.SECTION_TAG}
          icon={<Code2 />}
          titlePrefix={PROJECTS_STRINGS.SECTION_TITLE_PREFIX}
          titleHighlight={PROJECTS_STRINGS.SECTION_TITLE_HIGHLIGHT}
        />
        
        <div className="text-center mb-10">
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto leading-relaxed font-mono">
            {PROJECTS_STRINGS.TERMINAL_STATUS}
            <br />
            {PROJECTS_STRINGS.TERMINAL_DESC}
          </p>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectList.map((project, idx) => (
            <ProjectCard key={project.id || idx} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
