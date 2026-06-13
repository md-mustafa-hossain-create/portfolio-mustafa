import { ArrowRight, Download, Mail } from 'lucide-react';
import { GLOBAL, HERO_STRINGS } from '@/constants/strings';
import TypewriterText from './TypewriterText';
import TerminalWindow from './TerminalWindow';
import ScrollReveal from '@/shared/components/ui/ScrollReveal';

/**
 * @fileoverview Main Hero section component.
 * Refactored to adhere to the Single Responsibility Principle by delegating
 * booting, typing, and terminal mockup logic to sub-components.
 */

export default function HeroSection() {
  const isBooted = true;

  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center pt-32 pb-24 overflow-hidden border-b border-zinc-900 bg-zinc-950">
      {/* Ambient Radial Mesh Lights */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 md:w-[450px] md:h-[450px] rounded-full bg-brand-500/5 blur-[100px] md:blur-[140px] animate-pulse-slow z-0 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-80 h-80 md:w-[450px] md:h-[450px] rounded-full bg-brand-600/3 blur-[100px] md:blur-[140px] animate-pulse-slow z-0 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Tagline pill */}
            <ScrollReveal 
              animation="up"
              delay={0.1}
              className="inline-flex items-center px-4 py-1.5 rounded-full bg-zinc-900/60 border border-zinc-800/80 text-xs uppercase tracking-wider text-brand-400 font-semibold mb-6 backdrop-blur-md"
            >
              <span>{HERO_STRINGS.AVAILABLE_BADGE}</span>
            </ScrollReveal>

            {/* Main Greeting */}
            <ScrollReveal 
              animation="up"
              delay={0.25}
              as="h1"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.05] text-white mb-6"
            >
              {HERO_STRINGS.GREETING} <br />
              <span className="text-brand-400">
                {GLOBAL.DEV_NAME}
              </span>
            </ScrollReveal>

            {/* Typewriter Role Headline */}
            <ScrollReveal 
              animation="up"
              delay={0.4}
              className="h-10 sm:h-12 flex items-center mb-6"
            >
              <p className="text-lg sm:text-2xl font-sans font-medium text-zinc-300">
                I'm a <TypewriterText isBooted={isBooted} />
              </p>
            </ScrollReveal>

            {/* Subtitle */}
            <ScrollReveal 
              animation="up"
              delay={0.55}
              as="p"
              className="text-base sm:text-lg text-zinc-400 max-w-xl mb-10 leading-relaxed font-sans"
            >
              {HERO_STRINGS.SUBTITLE}
            </ScrollReveal>

            {/* Actions CTA: Sleek and responsive button architecture */}
            <ScrollReveal 
              animation="up"
              delay={0.7}
              className="w-full flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <a
                id="hero-btn-projects"
                href="#projects"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-400 hover:to-brand-500 text-black font-semibold rounded-full transition-spring shadow-lg shadow-brand-500/10 hover:shadow-brand-500/20 hover:scale-[1.01] active:scale-[0.98] group w-full sm:w-auto text-sm"
              >
                <span>{HERO_STRINGS.BTN_PROJECTS}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 shrink-0" />
              </a>
              
              <div className="grid grid-cols-2 sm:flex gap-3 sm:gap-4 w-full sm:w-auto">
                <a
                  id="hero-btn-resume"
                  href="/resume.pdf"
                  download={`${GLOBAL.DEV_NAME.replace(/\s+/g, '_')}_Resume.pdf`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-zinc-900/50 backdrop-blur-md border border-zinc-800/80 hover:border-zinc-700 text-zinc-300 hover:text-white rounded-full transition-spring hover:bg-zinc-800/60 hover:scale-[1.01] active:scale-[0.98] text-xs sm:text-sm font-semibold w-full sm:w-auto group"
                >
                  <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-y-[1px] transition-transform duration-300 shrink-0" />
                  <span>{HERO_STRINGS.BTN_RESUME}</span>
                </a>

                <a
                  id="hero-btn-contact"
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-transparent border border-zinc-800/50 sm:border-transparent text-zinc-400 hover:text-brand-400 hover:scale-[1.01] active:scale-[0.98] rounded-full transition-spring font-semibold text-xs sm:text-sm w-full sm:w-auto group"
                >
                  <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:-translate-y-[1px] group-hover:translate-x-[1px] transition-transform duration-300 shrink-0" />
                  <span>{HERO_STRINGS.BTN_CONTACT}</span>
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal 
              animation="up"
              delay={0.85}
              as="span"
              className="text-xs text-zinc-400 mt-4 font-sans block"
            >
              {HERO_STRINGS.RESUME_NOTE}
            </ScrollReveal>
          </div>

          {/* Hero Right: Terminal Mockup */}
          <ScrollReveal animation="right" delay={0.3} className="lg:col-span-5">
            <TerminalWindow />
          </ScrollReveal>
          
        </div>
      </div>
    </section>
  );
}
