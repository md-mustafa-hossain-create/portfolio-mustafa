import { User } from 'lucide-react';
import profileImg from '../assets/profile.webp';
import { ABOUT_STRINGS, GLOBAL } from '../constants/strings';
import { INFO_CARDS } from '../constants/data';
import SectionHeader from '@/shared/components/ui/SectionHeader';
import GlassCard from '@/shared/components/ui/GlassCard';
import ScrollReveal from '@/shared/components/ui/ScrollReveal';

/**
 * @fileoverview Main About section component.
 * Uses extracted constants and SectionHeader for DRY compliance.
 */

export default function About() {
  return (
    <section id="about" className="py-28 relative overflow-hidden bg-zinc-950/40">
      {/* Background glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-brand-500/3 blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <SectionHeader 
          tag={ABOUT_STRINGS.SECTION_TAG}
          icon={<User />}
          titlePrefix={ABOUT_STRINGS.SECTION_TITLE_PREFIX}
          titleHighlight={ABOUT_STRINGS.SECTION_TITLE_HIGHLIGHT}
        />

        {/* Section Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Grid: Premium Photo Display */}
          <ScrollReveal animation="left" delay={0.1} className="lg:col-span-5 flex justify-center items-center">
            <div className="relative group">
              <div className="absolute -inset-1 rounded-[2.5rem] bg-brand-500 opacity-10 group-hover:opacity-25 blur-lg transition duration-700"></div>
              
              <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-brand-400 rounded-tl-xl pointer-events-none"></div>
              <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-brand-400 rounded-br-xl pointer-events-none"></div>
              
              <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-square p-2 bg-zinc-900/30 border border-white/5 rounded-[2.5rem] shadow-2xl backdrop-blur-md">
                <div className="w-full h-full rounded-[calc(2.5rem-0.5rem)] bg-zinc-950 border border-white/5 overflow-hidden flex items-end justify-center relative">
                  <div className="absolute inset-0 bg-zinc-950 z-0"></div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-brand-500/10 rounded-full blur-2xl z-0"></div>
                  
                  <img 
                    src={profileImg} 
                    alt={GLOBAL.DEV_NAME}
                    width="326"
                    height="326"
                    fetchpriority="high"
                    className="w-full h-full object-cover z-10 transition-premium group-hover:scale-[1.03]"
                  />
 
                  <span className="absolute top-4 right-4 z-20 px-2 py-1 rounded bg-brand-500/10 border border-brand-400/20 text-xs font-sans font-semibold text-brand-400 uppercase tracking-widest shadow-md backdrop-blur-md">
                    Developer
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>
 
          {/* Right Grid: Bio Text & Cards */}
          <ScrollReveal animation="right" delay={0.2} className="lg:col-span-7 text-left space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-zinc-200 tracking-tight leading-snug">
                {ABOUT_STRINGS.BIO_HEADING}
              </h3>
              <div className="w-12 h-0.5 bg-brand-500/50 rounded-full"></div>
            </div>
            
            <div className="space-y-4 text-zinc-400 leading-relaxed text-xs sm:text-sm">
              <p>
                Hello! I'm <strong className="text-brand-300 font-bold">{GLOBAL.DEV_NAME}</strong>, a Bachelor of Computer Applications (BCA) graduate from <span className="text-yellow-500 font-bold">Brainware University</span>, West Bengal, India, where I completed my degree with a CGPA of <strong className="text-brand-400 font-bold">9.09/10</strong>. My journey into coding started during college, and I quickly developed a strong interest in frontend web development.
              </p>
              <p>
                I enjoy turning ideas into clean, responsive, and user-friendly interfaces. My current focus is building modern web projects using <strong className="text-brand-400 font-bold">React JS</strong> and styling them with <strong className="text-brand-300 font-bold">Tailwind CSS</strong>, while continuing to strengthen my frontend development skills.
              </p>
              <p>
                My goal is to turn my academic foundation into real-world impact. I am actively looking for <strong className="text-white font-bold">frontend developer internships and entry-level opportunities</strong> where I can collaborate with teams, solve meaningful user problems, and keep growing as a developer.
              </p>
            </div>

            {/* Info Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {INFO_CARDS.map((card, idx) => (
                <GlassCard
                  key={idx}
                  className="p-4 flex flex-col items-start gap-3 h-full group"
                >
                  <div className="p-2 bg-zinc-900/50 rounded-lg border border-zinc-800 shrink-0 text-brand-400 group-hover:scale-105 transition-premium">
                    {card.icon}
                  </div>
                  <div className="text-left">
                    <h4 className="text-xs font-sans font-bold text-zinc-400 uppercase tracking-wider">
                      {card.title}
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-white mt-1 group-hover:text-brand-400 transition-colors">
                      {card.details}
                    </p>
                    <span className="text-xs text-zinc-400 block mt-0.5 leading-tight">
                      {card.sub}
                    </span>
                  </div>
                </GlassCard>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
