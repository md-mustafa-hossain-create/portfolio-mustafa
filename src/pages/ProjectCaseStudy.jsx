import { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Cpu, CheckCircle2, FileCode, Sparkles } from 'lucide-react';
import { useFirebaseData } from '@/hooks/useFirebaseData';
import { DEFAULT_PROJECTS } from '@/constants/data';
import GlassCard from '@/shared/components/ui/GlassCard';
import { normalizeProjects } from '@/features/projects/utils/projectAdapters';
import ScrollReveal from '@/shared/components/ui/ScrollReveal';

/**
 * @fileoverview Full-page Project Case Study view (/projects/:id) displaying details.
 * Implements sticky layout pinning on the left and scrollable contents on the right,
 * with a top scroll progress tracker indicator.
 */

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function ProjectCaseStudy() {
  const { id } = useParams();
  const [scrollProgress, setScrollProgress] = useState(0);
  const { data: rawProjectList, loading } = useFirebaseData('projects', DEFAULT_PROJECTS);

  // Normalize project list
  const projectList = useMemo(() => normalizeProjects(rawProjectList), [rawProjectList]);

  // Find target project
  const project = useMemo(() => {
    return projectList.find((p) => p.id === id);
  }, [projectList, id]);

  // Scroll spy reading progress listener
  useEffect(() => {
    if (loading || !project) return;

    let totalHeight = document.documentElement.scrollHeight - window.innerHeight;

    const handleResize = () => {
      totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    };

    let lastProgress = 0;
    const handleScroll = () => {
      if (totalHeight > 0) {
        const progress = Math.round((window.scrollY / totalHeight) * 100);
        if (progress !== lastProgress) {
          lastProgress = progress;
          setScrollProgress(progress);
        }
      }
    };

    const timer = setTimeout(() => {
      totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    }, 150);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [loading, project]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 py-32 flex flex-col items-center justify-center font-sans">
        <div className="p-3 bg-zinc-900/40 rounded-full w-12 h-12 flex items-center justify-center mx-auto text-brand-400 border border-white/5 mb-4 animate-spin">
          <Cpu className="w-5 h-5" />
        </div>
        <span className="text-zinc-400 font-semibold text-sm">Loading Case Study...</span>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 py-32 flex flex-col items-center justify-center font-sans px-4">
        <span className="text-brand-500 font-bold text-3xl mb-3">404</span>
        <h2 className="text-lg font-bold text-zinc-200 mb-1">Case Study Not Found</h2>
        <p className="text-zinc-400 mb-8 text-xs sm:text-sm text-center max-w-xs leading-relaxed">
          The case study you are trying to view does not exist or has been removed.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900 border border-zinc-800 hover:border-brand-500/20 text-xs font-semibold text-zinc-400 hover:text-brand-400 rounded-xl transition-premium cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-32 relative overflow-hidden font-sans">
      {/* Top sticky scroll progress tracker */}
      <div
        className="fixed top-0 left-0 h-1 bg-brand-500 z-[110] transition-all duration-75 shadow-[0_0_10px_rgba(85,255,85,0.4)]"
        style={{ width: `${scrollProgress}%` }}
      ></div>

      {/* Ambient background soft lightings */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 md:w-[450px] md:h-[450px] rounded-full bg-brand-500/5 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-80 h-80 md:w-[450px] md:h-[450px] rounded-full bg-secondary/3 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid Wrapper: Left Sticky, Right Scroll */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT SIDEBAR: Sticky/pinned details */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit flex flex-col items-start text-left space-y-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-zinc-900/60 border border-zinc-850 hover:border-brand-500/20 text-xs font-semibold text-zinc-400 hover:text-brand-400 rounded-xl transition-premium cursor-pointer mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Portfolio</span>
            </Link>

            <div className="space-y-4">
              <span className="px-3.5 py-1.5 text-xs font-sans font-bold uppercase tracking-wider rounded-full bg-brand-500/10 border border-brand-400/25 text-brand-400">
                {project.category}
              </span>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tighter leading-tight">
                {project.title}
              </h1>

              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-sans max-w-md">
                {project.description}
              </p>
            </div>

            {/* Metrics Checklist */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="w-full max-w-md grid grid-cols-3 gap-3 pt-2">
                {project.metrics.map((metric, idx) => (
                  <div key={idx} className="bg-zinc-900/40 border border-zinc-850 rounded-2xl p-3 text-center">
                    <span className="text-lg font-bold text-brand-400 block tracking-tight">
                      {metric.value}
                    </span>
                    <span className="text-xs font-sans text-zinc-400 uppercase tracking-wide leading-tight block mt-1">
                      {metric.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-4 w-full max-w-md pt-4">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex justify-center items-center gap-2 px-4 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white rounded-2xl text-xs font-semibold font-sans transition-all duration-200"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Source Repository</span>
              </a>
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex justify-center items-center gap-2 px-4 py-3 bg-brand-500 hover:bg-brand-400 text-black font-bold rounded-2xl text-xs font-sans transition-all duration-200 hover:scale-[1.01] active:scale-[0.98]"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demonstration</span>
              </a>
            </div>
          </div>

          {/* RIGHT VIEWPORT: Scrollable content cards */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Mockup Canvas Screen representing App layout */}
            <div className="relative w-full aspect-video rounded-[2.5rem] p-1.5 bg-zinc-900/30 border border-white/5 shadow-2xl overflow-hidden group">
              <div className="w-full h-full rounded-[calc(2.5rem-0.375rem)] bg-zinc-950/80 border border-zinc-900 flex flex-col justify-between overflow-hidden relative">
                {/* Visual grid lines backdrop */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(44,255,5,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(44,255,5,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
                
                {/* Header browser-like pill */}
                <div className="px-5 py-3 border-b border-zinc-900/60 bg-zinc-900/20 flex items-center justify-between shrink-0">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/30"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/30"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/30"></span>
                  </div>
                  <div className="rounded-md bg-zinc-950 border border-zinc-900 px-10 py-0.5 text-xs text-zinc-400 font-mono tracking-wide lowercase truncate max-w-[200px]">
                    {project.title.toLowerCase()}.web.app
                  </div>
                  <Sparkles className="w-3.5 h-3.5 text-brand-500/40" />
                </div>

                {/* Central dynamic presentation area */}
                <div className="flex-grow flex flex-col items-center justify-center p-6 text-center z-10">
                  <div className="p-4 bg-brand-500/5 border border-brand-500/10 rounded-3xl mb-4 text-brand-400 group-hover:scale-105 transition-transform duration-500">
                    <Cpu className="w-10 h-10" />
                  </div>
                  <h4 className="text-base font-bold text-white mb-1.5">{project.title} Interface Node</h4>
                  <p className="text-[11px] text-zinc-400 max-w-xs font-sans leading-relaxed">
                    Interactive system compiled successfully. Explore standard modules and metrics inside this report.
                  </p>
                </div>

                {/* Footer status block */}
                <div className="px-5 py-2.5 border-t border-zinc-900 bg-zinc-900/10 flex items-center justify-between shrink-0 font-mono text-xs text-zinc-400">
                  <span>REF: {project.id.toUpperCase()}_STAGE_V1</span>
                  <span className="text-brand-500 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-ping"></span>
                    ACTIVE
                  </span>
                </div>
              </div>
            </div>

            {/* The Challenge Card */}
            <ScrollReveal animation="up" delay={0.1}>
              <GlassCard className="p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-zinc-900 border border-zinc-800 text-zinc-400 rounded-xl">
                    <Cpu className="w-5 h-5 text-brand-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">The Challenge</h3>
                </div>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                  {project.challenge || "Every engineering effort faces unique challenges during implementation. This section details performance thresholds, data complexity, and standard layout limitations that had to be addressed."}
                </p>
              </GlassCard>
            </ScrollReveal>

            {/* The Solution Card */}
            <ScrollReveal animation="up" delay={0.2}>
              <GlassCard className="p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-zinc-900 border border-zinc-800 text-zinc-400 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-brand-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">The Solution</h3>
                </div>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                  {project.solution || "To resolve the project criteria, advanced architectural strategies and design patterns were applied. These optimizations ensured high rendering efficiency and robust state flow."}
                </p>
              </GlassCard>
            </ScrollReveal>

            {/* Code Spotlight Editor Mockup */}
            {project.codeSpotlight && (
              <ScrollReveal animation="up" delay={0.3}>
                <GlassCard className="p-0 overflow-hidden border border-zinc-850">
                  {/* Editor Header */}
                  <div className="bg-zinc-900/60 px-5 py-3 border-b border-zinc-850 flex items-center justify-between font-mono text-xs">
                    <div className="flex items-center gap-2 text-zinc-400">
                      <FileCode className="w-4 h-4 text-brand-400" />
                      <span>{project.title}Engine.js</span>
                    </div>
                    <span className="text-xs text-zinc-400 uppercase tracking-widest font-sans font-bold">JavaScript</span>
                  </div>
                  {/* Code editor body */}
                  <div className="p-5 overflow-auto max-h-[300px] bg-zinc-950/70">
                    <pre className="font-mono text-left text-[11px] sm:text-xs text-brand-300 leading-relaxed whitespace-pre">
                      <code>{project.codeSpotlight}</code>
                    </pre>
                  </div>
                </GlassCard>
              </ScrollReveal>
            )}

            {/* Tech Stack List */}
            <ScrollReveal animation="up" delay={0.4}>
              <GlassCard className="p-8 space-y-5">
                <h3 className="text-lg font-bold text-white">Technologies Utilized</h3>
                <div className="flex flex-wrap gap-2.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3.5 py-1.5 rounded-xl bg-zinc-900 border border-zinc-850 text-xs font-semibold text-zinc-300 font-sans"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </ScrollReveal>

            {/* Footer breadcrumb */}
            <div className="pt-8 border-t border-zinc-850/60 flex items-center justify-between text-xs text-zinc-400 font-medium font-sans">
              <span>Mustafa's Engineering Case Study</span>
              <Link to="/" className="text-brand-400 hover:text-brand-300 transition-colors">
                Back to Home
              </Link>
            </div>

          </div>

        </div>
        
      </div>
    </div>
  );
}
