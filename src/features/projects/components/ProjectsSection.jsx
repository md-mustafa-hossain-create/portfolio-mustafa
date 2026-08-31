import React from 'react';
import { Code2, Folder } from 'lucide-react';
import { useFirebaseData } from '@/hooks/useFirebaseData';
import { PROJECTS_STRINGS } from '@/constants/strings';
import { DEFAULT_PROJECTS } from '@/constants/data';
import SectionHeader from '@/shared/components/ui/SectionHeader';
import SectionErrorBoundary from '@/shared/components/ui/SectionErrorBoundary';
import { normalizeProjects } from '../utils/projectAdapters';
import ProjectCard from './ProjectCard';

/**
 * @fileoverview Main Projects section component.
 */

function ProjectsSectionContent() {
  const { data: rawProjectList, loading } = useFirebaseData('projects', DEFAULT_PROJECTS);

  // Normalize all project records to standard objects
  const projectList = React.useMemo(() => normalizeProjects(rawProjectList), [rawProjectList]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="animate-pulse">
          <SectionHeader 
            tag={PROJECTS_STRINGS.SECTION_TAG}
            icon={<Code2 className="animate-spin" style={{ animationDuration: '3s' }} />}
            titlePrefix={PROJECTS_STRINGS.SECTION_TITLE_PREFIX}
            titleHighlight={PROJECTS_STRINGS.SECTION_TITLE_HIGHLIGHT}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex flex-col justify-between min-h-[340px] rounded-3xl bg-zinc-900/40 border border-zinc-800/80 p-6 animate-pulse">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-950/60 border border-zinc-850 flex items-center justify-center"></div>
                  <div className="h-3 w-16 bg-zinc-900 rounded"></div>
                </div>
                <div className="flex flex-col">
                  <div className="h-5 w-40 bg-zinc-900 rounded mb-3"></div>
                  <div className="h-4 w-full bg-zinc-900 rounded mb-2"></div>
                  <div className="h-4 w-5/6 bg-zinc-900 rounded mb-5"></div>
                  <div className="flex gap-2 mb-6">
                    <div className="h-5 w-14 bg-zinc-900 rounded-full"></div>
                    <div className="h-5 w-16 bg-zinc-900 rounded-full"></div>
                    <div className="h-5 w-12 bg-zinc-900 rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 border-t border-zinc-850/60 pt-4 mt-auto">
                <div className="h-9 flex-1 bg-zinc-900 rounded-xl"></div>
                <div className="h-9 flex-1 bg-zinc-900 rounded-xl"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <SectionHeader 
        tag={PROJECTS_STRINGS.SECTION_TAG}
        icon={<Code2 />}
        titlePrefix={PROJECTS_STRINGS.SECTION_TITLE_PREFIX}
        titleHighlight={PROJECTS_STRINGS.SECTION_TITLE_HIGHLIGHT}
      />
      
      {projectList && projectList.length > 0 ? (
        /* Projects Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectList.map((project, idx) => (
            <ProjectCard key={project.id || idx} project={project} index={idx} />
          ))}
        </div>
      ) : (
        /* Sleek modern empty state */
        <div className="p-1 bg-zinc-900/10 backdrop-blur-md border border-white/5 rounded-[2rem] max-w-lg mx-auto shadow-md mt-12">
          <div className="rounded-[calc(2rem-0.25rem)] bg-zinc-950/45 p-8 text-center font-sans">
            <div className="p-3 bg-zinc-900/40 rounded-full w-12 h-12 flex items-center justify-center mx-auto text-brand-400 border border-white/5 mb-4 animate-pulse">
              <Folder className="w-5 h-5" />
            </div>
            <span className="text-zinc-100 font-bold block text-base mb-2">Projects coming soon</span>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-sm mx-auto">
              No public repositories are available at this time. I am actively developing new applications and preparing projects for release.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section 
      id="projects" 
      data-bg="#000000"
      data-surface="rgba(45, 45, 45, 0.48)"
      data-text="#f5f5f5"
      data-accent="#2CFF05"
      data-border="rgba(255, 255, 255, 0.10)"
      className="portfolio-section min-h-[90vh] flex flex-col justify-center py-20 relative overflow-hidden"
    >
      <SectionErrorBoundary sectionName="Projects Section">
        <ProjectsSectionContent />
      </SectionErrorBoundary>
    </section>
  );
}
