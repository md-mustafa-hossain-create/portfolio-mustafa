import { useState } from 'react';
import { ArrowRight, Download, Mail, Terminal } from 'lucide-react';
import { GLOBAL, HERO_STRINGS } from '../constants/strings';
import Bootloader from './hero/Bootloader';
import TypewriterText from './hero/TypewriterText';
import TerminalWindow from './hero/TerminalWindow';

/**
 * @fileoverview Main Hero section component.
 * Refactored to adhere to the Single Responsibility Principle by delegating
 * booting, typing, and terminal mockup logic to sub-components.
 */

export default function Hero() {
  const [isBooted, setIsBooted] = useState(false);

  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center pt-32 pb-24 overflow-hidden bg-terminal-mesh-hero border-b border-zinc-900">
      
      {/* Bootloader Screen Overlay */}
      <Bootloader onComplete={setIsBooted} />

      {/* Ambient Radial Mesh Lights */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 md:w-[450px] md:h-[450px] rounded-full bg-brand-500/5 blur-[100px] md:blur-[140px] animate-pulse-slow z-0 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-80 h-80 md:w-[450px] md:h-[450px] rounded-full bg-brand-600/3 blur-[100px] md:blur-[140px] animate-pulse-slow z-0 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Tagline pill */}
            <div 
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/60 border border-zinc-800/80 text-[10px] uppercase tracking-wider text-brand-400 font-mono mb-6 backdrop-blur-md ${
                isBooted ? 'hero-revealed' : 'opacity-0'
              }`}
              style={{ animationDelay: '100ms' }}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>{HERO_STRINGS.AVAILABLE_BADGE}</span>
            </div>

            {/* Main Greeting */}
            <h1 
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.05] text-white mb-6 ${
                isBooted ? 'hero-revealed' : 'opacity-0'
              }`}
              style={{ animationDelay: '250ms' }}
            >
              {HERO_STRINGS.GREETING} <br />
              <span className="text-brand-400">
                {GLOBAL.DEV_NAME}
              </span>
            </h1>

            {/* Typewriter Role Headline */}
            <div 
              className={`h-10 sm:h-12 flex items-center mb-6 ${
                isBooted ? 'hero-revealed' : 'opacity-0'
              }`}
              style={{ animationDelay: '400ms' }}
            >
              <p className="text-lg sm:text-2xl font-mono text-zinc-300">
                I'm a <TypewriterText isBooted={isBooted} />
              </p>
            </div>

            {/* Subtitle */}
            <p 
              className={`text-base sm:text-lg text-zinc-400 max-w-xl mb-10 leading-relaxed font-sans ${
                isBooted ? 'hero-revealed' : 'opacity-0'
              }`}
              style={{ animationDelay: '550ms' }}
            >
              {HERO_STRINGS.SUBTITLE}
            </p>

            {/* Actions CTA: Button-in-Button architecture */}
            <div 
              className={`flex flex-col sm:flex-row gap-4 w-full sm:w-auto ${
                isBooted ? 'hero-revealed' : 'opacity-0'
              }`}
              style={{ animationDelay: '700ms' }}
            >
              <a
                id="hero-btn-projects"
                href="#projects"
                className="inline-flex items-center justify-between pl-6 pr-2.5 py-2.5 bg-brand-500 hover:bg-brand-400 text-black font-semibold rounded-full transition-premium shadow-lg shadow-brand-500/10 hover:shadow-brand-500/20 hover:scale-[1.02] active:scale-98 group w-full sm:w-auto gap-4"
              >
                <span className="text-sm">{HERO_STRINGS.BTN_PROJECTS}</span>
                <span className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-premium shrink-0">
                  <ArrowRight className="w-4 h-4 text-white" />
                </span>
              </a>
              
              <a
                id="hero-btn-resume"
                href="/resume.pdf"
                download={`${GLOBAL.DEV_NAME.replace(/\s+/g, '_')}_Resume.pdf`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white rounded-full transition-premium hover:bg-zinc-800/40 active:scale-98 text-sm font-semibold"
              >
                <Download className="w-4 h-4 shrink-0" />
                <span>{HERO_STRINGS.BTN_RESUME}</span>
              </a>

              <a
                id="hero-btn-contact"
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-transparent text-zinc-400 hover:text-brand-400 rounded-full transition-premium active:scale-98 font-mono text-xs tracking-wider"
              >
                <Mail className="w-4 h-4 shrink-0" />
                <span>{HERO_STRINGS.BTN_CONTACT}</span>
              </a>
            </div>

            <span 
              className={`text-[10px] text-zinc-600 mt-4 font-mono block ${
                isBooted ? 'hero-revealed' : 'opacity-0'
              }`}
              style={{ animationDelay: '850ms' }}
            >
              {HERO_STRINGS.RESUME_NOTE}
            </span>
          </div>

          {/* Hero Right: Terminal Mockup */}
          <TerminalWindow isBooted={isBooted} />
          
        </div>
      </div>
    </section>
  );
}
