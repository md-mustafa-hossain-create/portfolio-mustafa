import { User, GraduationCap, MapPin, Target, BookOpen, Code2, Award, Sparkles } from 'lucide-react';
import { ABOUT_STRINGS, GLOBAL } from '../constants/strings';
import { INFO_CARDS } from '../constants/data';
import SectionHeader from '@/shared/components/ui/SectionHeader';
import GlassCard from '@/shared/components/ui/GlassCard';
import ScrollReveal from '@/shared/components/ui/ScrollReveal';

/**
 * @fileoverview Redesigned About section component.
 * Removes the duplicate profile photo and replaces it with a balanced,
 * premium split layout featuring biographical story cards, core highlights,
 * and a metric achievements dashboard row.
 */
export default function About() {
  const stats = [
    { label: 'Learning Journey', value: '2+ Years', icon: <BookOpen className="w-4 h-4 text-brand-400" /> },
    { label: 'UIs & Projects', value: '20+ Built', icon: <Code2 className="w-4 h-4 text-brand-400" /> },
    { label: 'Git Contributions', value: '200+ Commits', icon: <Award className="w-4 h-4 text-brand-400" /> },
    { label: 'Lighthouse target', value: '100% Green', icon: <Sparkles className="w-4 h-4 text-brand-400" /> }
  ];

  return (
    <section 
      id="about" 
      data-bg="#070e0a"
      data-surface="rgba(15, 26, 20, 0.7)"
      data-text="#f4f4f5"
      data-accent="#34d399"
      data-border="rgba(52, 211, 153, 0.15)"
      className="portfolio-section min-h-[90vh] flex flex-col justify-center py-28 relative overflow-hidden border-t border-zinc-900/50"
    >
      {/* Background radial ambient lights */}
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-brand-500/2 blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 rounded-full bg-brand-500/1 blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <SectionHeader 
          tag={ABOUT_STRINGS.SECTION_TAG}
          icon={<User />}
          titlePrefix={ABOUT_STRINGS.SECTION_TITLE_PREFIX}
          titleHighlight={ABOUT_STRINGS.SECTION_TITLE_HIGHLIGHT}
        />

        {/* Redesigned Balanced Split Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          
          {/* Left Grid: Bio Text & Storytelling Narrative */}
          <ScrollReveal animation="left" delay={0.1} className="lg:col-span-6 text-left flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 tracking-tight leading-snug">
                {ABOUT_STRINGS.BIO_HEADING}
              </h3>
              <div className="w-12 h-0.5 bg-brand-500/50 rounded-full"></div>
            </div>
            
            <div className="space-y-4 text-zinc-400 leading-relaxed text-xs sm:text-sm font-sans">
              <p>
                Hello! I'm <strong className="text-brand-300 font-bold">{GLOBAL.DEV_NAME}</strong>, a Bachelor of Computer Applications (BCA) graduate from <span className="text-yellow-500 font-bold font-sans">Brainware University</span>, West Bengal, India. I completed my degree with a CGPA of <strong className="text-brand-400 font-bold font-sans">9.09/10</strong>.
              </p>
              <p>
                My passion for web development ignited during my academic years. Since then, I have focused heavily on mastering frontend development, learning how to build clean, responsive, and highly interactive user interfaces.
              </p>
              <p>
                Currently, my primary toolkit centers around <strong className="text-brand-400 font-bold font-sans">React JS</strong> and styling utilities like <strong className="text-brand-300 font-bold font-sans">Tailwind CSS</strong>. I focus on creating pixel-perfect visuals, fast page-loads, and satisfying micro-interactions.
              </p>
              <p>
                I am actively seeking <strong className="text-white font-bold font-sans">Frontend Developer internships and entry-level positions</strong> where I can write solid code, learn from professional teams, and deliver immediate value to users.
              </p>
            </div>

            {/* Premium Quote Card */}
            <div className="p-4 rounded-2xl bg-zinc-950/60 border border-zinc-900 relative overflow-hidden shadow-inner">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-500"></div>
              <p className="text-xs sm:text-sm font-sans italic text-zinc-300 leading-relaxed pl-3 select-none">
                {ABOUT_STRINGS.QUOTE}
              </p>
            </div>
          </ScrollReveal>
 
          {/* Right Grid: Core Highlights */}
          <ScrollReveal animation="right" delay={0.2} className="lg:col-span-6 flex flex-col gap-4 justify-center">
            {INFO_CARDS.map((card, idx) => (
              <GlassCard
                key={idx}
                className="p-5 flex items-center gap-5 group cursor-pointer hover:border-brand-500/20 hover:scale-[1.01] transition-premium h-full text-left"
              >
                <div className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-800 shrink-0 text-brand-400 group-hover:scale-105 group-hover:border-brand-500/20 group-hover:bg-brand-500/5 transition-premium shadow-sm">
                  {card.icon}
                </div>
                <div>
                  <h4 className="text-[10px] font-sans font-bold text-zinc-500 uppercase tracking-widest leading-none">
                    {card.title}
                  </h4>
                  <p className="text-sm font-sans font-extrabold text-white mt-1.5 group-hover:text-brand-400 transition-colors leading-none">
                    {card.details}
                  </p>
                  <span className="text-xs text-zinc-400 block mt-1.5 leading-snug">
                    {card.sub}
                  </span>
                </div>
              </GlassCard>
            ))}
          </ScrollReveal>

        </div>

        {/* Achievement Metrics Dashboard Row */}
        <ScrollReveal animation="up" delay={0.3} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12">
          {stats.map((stat, idx) => (
            <GlassCard
              key={idx}
              className="p-4 flex flex-col items-center justify-center text-center gap-1.5 group cursor-pointer hover:scale-102 hover:border-brand-500/20 transition-premium h-full"
            >
              <div className="p-2 bg-zinc-900/50 rounded-lg border border-zinc-850 shrink-0 text-brand-400 mb-0.5 group-hover:scale-105 transition-premium leading-none">
                {stat.icon}
              </div>
              <span className="text-[10px] font-sans font-bold text-zinc-500 uppercase tracking-widest leading-none">
                {stat.label}
              </span>
              <p className="text-base font-sans font-black text-white mt-1 group-hover:text-brand-400 transition-colors leading-none">
                {stat.value}
              </p>
            </GlassCard>
          ))}
        </ScrollReveal>

      </div>
    </section>
  );
}
