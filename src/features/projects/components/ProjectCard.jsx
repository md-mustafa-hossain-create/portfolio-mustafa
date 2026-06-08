import PropTypes from 'prop-types';
import { ExternalLink, Folder } from 'lucide-react';
import GlassCard from '@/shared/components/ui/GlassCard';
import ScrollReveal from '@/shared/components/ui/ScrollReveal';

/**
 * @fileoverview Reusable Project Card component.
 */

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

/**
 * @typedef {Object} ProjectCardProps
 * @property {Object} project - Normalized project model.
 * @property {number} index - Position index for rendering delays.
 */

/**
 * ProjectCard component.
 * @param {ProjectCardProps} props
 * @returns {React.ReactElement}
 */
export default function ProjectCard({ project, index }) {
  const normalizedTitle = (project.title || '').toLowerCase().replace(/\s+/g, '-');
  
  return (
    <ScrollReveal animation="zoom" delay={index * 0.15} className="h-full relative">
      <GlassCard className="flex flex-col p-6 h-full z-10 group">
        {/* Decorative top gradient light */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-500/10 to-transparent group-hover:via-brand-500/30 transition-all duration-500"></div>
        
        <div className="flex-grow flex flex-col justify-between h-full">
          <div>
            {/* Card Icon Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-zinc-950/60 border border-zinc-850 flex items-center justify-center text-zinc-400 group-hover:text-brand-400 group-hover:border-brand-500/20 transition-colors duration-300">
                <Folder className="w-5 h-5" />
              </div>
              
              <span className="text-[10px] text-zinc-500 font-semibold tracking-wider uppercase font-sans">
                {project.category || `Project #${String(index + 1).padStart(2, '0')}`}
              </span>
            </div>

            <div className="mb-5">
              <h3 className="text-lg font-bold text-zinc-100 group-hover:text-brand-400 transition-colors duration-300 leading-snug">
                {project.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mt-2.5 font-sans">
                {project.description}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 text-[10px] font-sans font-medium rounded-full bg-zinc-950 border border-zinc-850 text-zinc-400 group-hover:border-brand-500/10 group-hover:text-brand-300 transition-all duration-300 cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Project Links Layout: Secondary actions */}
          <div className="flex flex-col gap-2.5 border-t border-zinc-850/60 pt-4 mt-auto">
            <div className="flex gap-2">
              <a
                id={`project-repo-${normalizedTitle}`}
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex justify-center items-center gap-2 px-3 py-2 bg-zinc-950 hover:bg-zinc-900 border border-zinc-850 hover:border-zinc-800 text-zinc-300 hover:text-white rounded-xl text-xs font-semibold font-sans transition-all duration-200"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>Repo</span>
              </a>
              <a
                id={`project-demo-${normalizedTitle}`}
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex justify-center items-center gap-2 px-3 py-2 bg-zinc-950 hover:bg-brand-500/5 border border-brand-500/20 hover:border-brand-500/40 text-brand-400 hover:text-brand-300 rounded-xl text-xs font-semibold font-sans transition-all duration-200 active:scale-[0.98]"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Demo</span>
              </a>
            </div>
          </div>
        </div>
      </GlassCard>
    </ScrollReveal>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    github: PropTypes.string.isRequired,
    demo: PropTypes.string.isRequired,
    category: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
