import { ExternalLink } from 'lucide-react';
import { PROJECTS_STRINGS } from '../../constants/strings';

/**
 * @fileoverview Reusable Project Card component.
 */

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function ProjectCard({ project, index }) {
  const fileName = `${(project.title || project.Title || '').split(' ')[0].toLowerCase().replace(/[^a-z0-9]/g, '')}.json`;

  return (
    <article
      className="double-bezel-outer hover:border-brand-500/20 hover:-translate-y-0.5 group overflow-hidden relative flex flex-col reveal"
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="double-bezel-inner overflow-hidden flex flex-col h-full p-6 bg-zinc-950">
        
        {/* Terminal Header Row */}
        <div className="flex items-center justify-between border-b border-zinc-900 pb-3 mb-5 shrink-0">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-800 group-hover:bg-red-500/80 transition-colors duration-300"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-800 group-hover:bg-yellow-500/80 transition-colors duration-300"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-800 group-hover:bg-green-500/80 transition-colors duration-300"></div>
          </div>
          <span className="text-[9px] font-mono text-zinc-500 tracking-wider">
            project_0{index + 1}.json
          </span>
        </div>

        <div className="flex-grow flex flex-col">
          
          {/* Command Prompt */}
          <div className="flex items-center gap-2 mb-3.5 font-mono text-[10px] text-zinc-500">
            <span className="text-brand-400">&gt;</span>
            <span>cat</span>
            <span className="text-zinc-300">{fileName}</span>
          </div>

          <div className="mb-5">
            <h3 className="text-xl font-bold text-zinc-100 group-hover:text-brand-400 transition-colors leading-snug">
              {project.title || project.Title}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mt-3 font-sans">
              {project.description || project.Description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {(project.tags || project.Tags || []).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 text-[10px] font-mono rounded bg-zinc-900 border border-zinc-800 text-zinc-400 group-hover:border-brand-500/20 group-hover:text-brand-300 transition-all duration-300 cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Project Links */}
          <div className="flex gap-4 border-t border-zinc-900 pt-4 mt-auto">
            <a
              id={`project-repo-${(project.title || project.Title || '').toLowerCase().replace(/\s+/g, '-')}`}
              href={project.github || project.Github || project.GitHub || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex justify-center items-center gap-2 px-3 py-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white rounded-lg text-xs font-mono transition-all duration-200"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>{PROJECTS_STRINGS.BTN_REPO}</span>
            </a>
            <a
              id={`project-demo-${(project.title || project.Title || '').toLowerCase().replace(/\s+/g, '-')}`}
              href={project.demo || project.Demo || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex justify-center items-center gap-2 px-3 py-2 bg-zinc-950 border border-zinc-800 hover:border-brand-500/30 text-brand-400 hover:text-white rounded-lg text-xs font-mono transition-all duration-200 active:scale-[0.98]"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{PROJECTS_STRINGS.BTN_DEMO}</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
