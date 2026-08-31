import { ArrowRight, Download, MapPin, GraduationCap } from 'lucide-react';
import { GLOBAL, HERO_STRINGS } from '@/constants/strings';
import Button from '@/shared/components/ui/Button';
import ScrollReveal from '@/shared/components/ui/ScrollReveal';
import profileImg from '../../../assets/profile.webp';


/**
 * @fileoverview Redesigned premium Hero section.
 * Presents a focused introduction and a small set of real profile signals.
 */
export default function HeroSection() {
  return (
    <section 
      id="home" 
      data-bg="#09090b"
      data-surface="rgba(18, 18, 22, 0.7)"
      data-text="#ffffff"
      data-accent="#2CFF05"
      data-border="rgba(16, 185, 129, 0.15)"
      className="portfolio-section hero-section relative min-h-[100dvh] flex items-center pt-32 pb-24 overflow-hidden border-b border-zinc-900/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Small context label */}
            <ScrollReveal 
              animation="up"
              delay={0.1}
              className="inline-flex items-center gap-2 border-l-2 border-brand-400 pl-3 text-xs uppercase tracking-[0.16em] text-brand-400 font-semibold mb-6"
            >
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
              <span>{HERO_STRINGS.AVAILABLE_BADGE}</span>
            </ScrollReveal>

            {/* Main Greeting */}
            <ScrollReveal 
              animation="up"
              delay={0.2}
              as="h1"
              className="font-display uppercase text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] text-white mb-6"
            >
              {HERO_STRINGS.GREETING} <br />
              <span className="text-zinc-100">
                {GLOBAL.DEV_NAME}
              </span>
            </ScrollReveal>

            {/* Direct positioning statement */}
            <ScrollReveal 
              animation="up"
              delay={0.3}
              className="h-10 sm:h-12 flex items-center mb-6"
            >
              <div className="text-lg sm:text-2xl font-sans font-medium text-zinc-300 flex items-center gap-2">
                <span className="text-brand-400">Frontend Developer</span>
                <span className="text-zinc-600">/</span>
                <span>React & UI</span>
              </div>
            </ScrollReveal>

            {/* Subtitle */}
            <ScrollReveal 
              animation="up"
              delay={0.4}
              as="p"
              className="text-base sm:text-lg text-zinc-400 max-w-xl mb-10 leading-relaxed font-sans"
            >
              {HERO_STRINGS.SUBTITLE}
            </ScrollReveal>

            {/* Primary actions */}
            <ScrollReveal 
              animation="up"
              delay={0.5}
              className="w-full flex flex-col sm:flex-row gap-4 mb-12"
            >
              <a href="#projects" className="w-full sm:w-auto">
                <Button variant="primary" className="w-full sm:w-auto gap-2 text-sm">
                  <span>See selected work</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
              
              <a href="#contact" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto text-sm">
                  <span>Start a conversation</span>
                </Button>
              </a>

              <a 
                href="/resume.pdf" 
                download={`${GLOBAL.DEV_NAME.replace(/\s+/g, '_')}_Resume.pdf`}
                className="w-full sm:w-auto"
              >
                <Button variant="outline" className="w-full sm:w-auto gap-2 text-sm">
                  <Download className="w-4 h-4" />
                  <span>Resume</span>
                </Button>
              </a>
            </ScrollReveal>



          </div>

          {/* Hero Right: profile and concise facts */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-stretch justify-center py-10 lg:py-0">
            <ScrollReveal animation="right" delay={0.25} className="max-w-md w-full mx-auto lg:ml-auto">
              <div className="border border-zinc-800 bg-zinc-900/55 p-3 shadow-xl shadow-black/20">
                <img src={profileImg} alt={GLOBAL.DEV_NAME} width="640" height="640" className="w-full aspect-[4/3] object-cover object-top grayscale-[15%]" />
                <div className="grid grid-cols-2 gap-px bg-zinc-800 mt-3">
                  <div className="bg-zinc-950 p-4"><MapPin className="w-4 h-4 text-brand-400 mb-3" /><p className="text-[11px] uppercase tracking-widest text-zinc-500">Based in</p><p className="text-sm text-zinc-200 mt-1">Murshidabad, India</p></div>
                  <div className="bg-zinc-950 p-4"><GraduationCap className="w-4 h-4 text-brand-400 mb-3" /><p className="text-[11px] uppercase tracking-widest text-zinc-500">Background</p><p className="text-sm text-zinc-200 mt-1">BCA, 9.09 / 10</p></div>
                </div>
              </div>
            </ScrollReveal>
          </div>
          
        </div>
      </div>
    </section>
  );
}
