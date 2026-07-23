import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Download, 
  Mail, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Star,
  Code,
  Sparkles
} from 'lucide-react';
import { GLOBAL, HERO_STRINGS } from '@/constants/strings';
import AnimatedJobTitle from './AnimatedJobTitle';
import FloatingCard from './FloatingCard';
import Button from '@/shared/components/ui/Button';
import ScrollReveal from '@/shared/components/ui/ScrollReveal';
import profileImg from '../../../assets/profile.webp';

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

/**
 * @fileoverview Redesigned premium Hero section.
 * Features animated job titles, professional photo with floating UI elements,
 * mouse-tracking gradient lighting, and design system CTAs.
 */
export default function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section 
      id="home" 
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative min-h-[100dvh] flex items-center pt-32 pb-24 overflow-hidden border-b border-zinc-900 bg-zinc-950 transition-colors duration-500"
      style={isHovered ? {
        backgroundImage: `radial-gradient(circle 600px at ${mousePos.x}px ${mousePos.y}px, rgba(16, 185, 129, 0.04), rgba(99, 102, 241, 0.02) 50%, transparent 100%)`
      } : {}}
    >
      {/* Background drifting blobs */}
      <motion.div
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut'
        }}
        className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-primary/5 blur-[120px] pointer-events-none z-0"
      />
      
      <motion.div
        animate={{
          x: [0, -30, 50, 0],
          y: [0, 40, -30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
          delay: 2
        }}
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[140px] pointer-events-none z-0"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Tagline Availability Pill */}
            <ScrollReveal 
              animation="up"
              delay={0.1}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/60 border border-zinc-800/80 text-xs uppercase tracking-wider text-brand-400 font-semibold mb-6 backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span>{HERO_STRINGS.AVAILABLE_BADGE}</span>
            </ScrollReveal>

            {/* Main Greeting */}
            <ScrollReveal 
              animation="up"
              delay={0.2}
              as="h1"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-[1.05] text-white mb-6 font-sans"
            >
              {HERO_STRINGS.GREETING} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-primary to-accent">
                {GLOBAL.DEV_NAME}
              </span>
            </ScrollReveal>

            {/* Dynamic Job Title Cycler */}
            <ScrollReveal 
              animation="up"
              delay={0.3}
              className="h-10 sm:h-12 flex items-center mb-6"
            >
              <div className="text-lg sm:text-2xl font-sans font-medium text-zinc-300 flex items-center gap-2">
                <span>I'm a</span>
                <AnimatedJobTitle />
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

            {/* CTAs using reusable Button primitives */}
            <ScrollReveal 
              animation="up"
              delay={0.5}
              className="w-full flex flex-col sm:flex-row gap-4 mb-12"
            >
              <a href="#contact" className="w-full sm:w-auto">
                <Button variant="primary" className="w-full sm:w-auto gap-2 text-sm">
                  <span>Hire Me</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
              
              <a href="#projects" className="w-full sm:w-auto">
                <Button variant="secondary" className="w-full sm:w-auto text-sm">
                  <span>View Projects</span>
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

            {/* Tech Stack strip */}
            <ScrollReveal 
              animation="up"
              delay={0.6}
              className="flex flex-wrap items-center gap-2.5 text-xs text-zinc-400 font-sans"
            >
              <span className="font-bold uppercase tracking-wider text-zinc-500 mr-2 flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5" />
                Stack:
              </span>
              {['React', 'JavaScript', 'Tailwind v4', 'Node.js', 'Firebase', 'Git'].map((tech) => (
                <span 
                  key={tech} 
                  className="px-3 py-1.5 rounded-lg bg-zinc-900/60 border border-zinc-850 hover:border-brand-500/20 text-zinc-300 hover:text-brand-400 cursor-pointer hover:scale-105 active:scale-98 transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </ScrollReveal>

          </div>

          {/* Hero Right: Professional Photo and Floating badging UI */}
          <div className="lg:col-span-5 flex justify-center items-center relative py-12 lg:py-0 w-full min-h-[420px] lg:min-h-auto">
            <ScrollReveal animation="zoom" delay={0.3} className="relative w-[280px] sm:w-[320px] aspect-square flex items-center justify-center">
              
              {/* Rotating outer rings */}
              <div className="absolute inset-0 rounded-full border border-dashed border-brand-500/20 animate-[spin_60s_linear_infinite] pointer-events-none"></div>
              <div className="absolute -inset-4 rounded-full border border-primary/10 animate-[spin_40s_linear_infinite_reverse] pointer-events-none"></div>
              <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-brand-500/10 to-secondary/15 blur-2xl z-0 pointer-events-none"></div>

              {/* Central Avatar Frame */}
              <div className="relative w-full h-full p-2.5 rounded-full bg-zinc-900/30 border border-white/5 shadow-2xl backdrop-blur-md overflow-hidden group">
                <div className="w-full h-full rounded-full bg-zinc-950 border border-white/8 overflow-hidden flex items-end justify-center relative">
                  <div className="absolute inset-0 bg-zinc-950 z-0"></div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-primary/10 rounded-full blur-2xl z-0"></div>
                  
                  <img 
                    src={profileImg} 
                    alt={GLOBAL.DEV_NAME}
                    width="320"
                    height="320"
                    className="w-full h-full object-cover z-10 transition-premium group-hover:scale-[1.03]"
                  />
                </div>
              </div>

              {/* Floating UI Elements */}
              <FloatingCard
                icon={<MapPin className="w-4 h-4" />}
                title="Location"
                value="Murshidabad, IN"
                className="-top-8 -left-10"
                delay={0}
              />

              <FloatingCard
                icon={<Briefcase className="w-4 h-4" />}
                title="Availability"
                value="Internships Open"
                className="top-16 -right-16"
                delay={1.5}
              />

              <FloatingCard
                icon={<GraduationCap className="w-4 h-4" />}
                title="Academics"
                value="BCA (9.09 GPA)"
                className="bottom-20 -left-16"
                delay={0.8}
              />

              <FloatingCard
                icon={<GithubIcon className="w-4 h-4" />}
                title="GitHub Stats"
                value="200+ Contribs"
                className="-bottom-8 right-0"
                delay={2.3}
              />

            </ScrollReveal>
          </div>
          
        </div>
      </div>
    </section>
  );
}
