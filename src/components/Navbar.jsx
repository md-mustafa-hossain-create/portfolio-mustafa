import { useState, useEffect } from 'react';
import { Moon, SunMedium, Terminal } from 'lucide-react';
import { NAV_LINKS } from '../constants/data';
import { GLOBAL, NAV_STRINGS } from '../constants/strings';

/**
 * @fileoverview Main Navigation component.
 * Refactored to use extracted constants for DRY compliance.
 */

export default function Navbar({ theme, onToggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Monitor scroll height to adjust style/border shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scrollspy: dynamic navbar section highlighting
  useEffect(() => {
    const sections = NAV_LINKS.map(link => link.href.slice(1));
    
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const isLightTheme = theme === 'light';

  return (
    <nav className={`fixed left-1/2 -translate-x-1/2 z-50 transition-premium ${
      scrolled 
        ? 'top-4 w-[92%] max-w-5xl glass-nav py-2 px-4 sm:px-6 rounded-full shadow-2xl shadow-zinc-950/40 border border-white/5' 
        : 'top-6 w-[95%] max-w-6xl bg-zinc-950/30 backdrop-blur-md py-3 px-4 sm:px-6 rounded-full border border-white/3'
    }`}>
      <div className="flex items-center justify-between h-12 flex-nowrap">
        {/* Logo Brand */}
        <div 
          id="nav-logo"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setIsOpen(false);
          }} 
          className="flex-shrink-0 flex items-center gap-1.5 sm:gap-2 group cursor-pointer"
        >
          <div className="p-1.5 sm:p-2 bg-gradient-to-tr from-brand-400 to-brand-600 rounded-full group-hover:rotate-12 transition-spring shrink-0">
            <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
          </div>
          <span className="font-mono font-bold text-sm sm:text-base tracking-wider text-white group-hover:text-brand-400 transition-colors uppercase whitespace-nowrap">
            {GLOBAL.BRAND_NAME}<span className="text-brand-400 lowercase">{GLOBAL.BRAND_DOMAIN}</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.name}
                id={`nav-link-${link.name.toLowerCase()}`}
                href={link.href}
                className={`font-medium text-xs px-4 py-2 rounded-full transition-premium relative group ${
                  isActive 
                    ? 'text-brand-400 bg-zinc-900/60 font-semibold' 
                    : 'text-zinc-300 hover:text-brand-400 hover:bg-zinc-900/40'
                }`}
              >
                {link.name}
                <span className={`absolute bottom-1.5 left-1/2 -translate-x-1/2 h-0.5 bg-brand-400 rounded-full transition-all duration-300 ${
                  isActive ? 'w-4' : 'w-0 group-hover:w-4'
                }`}></span>
              </a>
            );
          })}
          <a
            id="nav-btn-hire"
            href="#contact"
            className="ml-2 px-4 py-2.5 text-xs font-mono font-bold tracking-wide uppercase text-white bg-zinc-900 border border-zinc-800 hover:border-brand-400/50 hover:bg-zinc-900/80 rounded-full transition-premium active:scale-95 shadow-md"
          >
            {NAV_STRINGS.BTN_HIRE}
          </a>
          <button
            id="nav-btn-theme-toggle"
            type="button"
            onClick={onToggleTheme}
            className="ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/70 text-zinc-300 hover:border-brand-400/30 hover:text-brand-400 hover:bg-zinc-900 transition-premium active:scale-95 cursor-pointer"
            aria-label={isLightTheme ? NAV_STRINGS.THEME_TOGGLE_DARK : NAV_STRINGS.THEME_TOGGLE_LIGHT}
            title={isLightTheme ? NAV_STRINGS.THEME_TOGGLE_DARK : NAV_STRINGS.THEME_TOGGLE_LIGHT}
          >
            {isLightTheme ? <Moon className="w-4 h-4" /> : <SunMedium className="w-4 h-4" />}
          </button>
        </div>

        {/* Mobile Actions */}
        <div className="md:hidden flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            id="nav-btn-mobile-theme-toggle"
            type="button"
            onClick={onToggleTheme}
            className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/70 text-zinc-300 hover:border-brand-400/30 hover:text-brand-400 hover:bg-zinc-900 transition-premium active:scale-95 cursor-pointer shrink-0"
            aria-label={isLightTheme ? NAV_STRINGS.THEME_TOGGLE_DARK : NAV_STRINGS.THEME_TOGGLE_LIGHT}
          >
            {isLightTheme ? <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <SunMedium className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
          </button>
          
          <button
            id="nav-btn-mobile-toggle"
            onClick={() => setIsOpen(!isOpen)}
            className="relative w-9 h-9 sm:w-10 sm:h-10 flex flex-col justify-center items-center rounded-full hover:bg-zinc-900/60 focus:outline-none transition-premium shrink-0"
            aria-label="Toggle Menu"
          >
            <div className="w-4 sm:w-5 flex flex-col gap-1 sm:gap-1.5">
              <span className={`h-0.5 w-4 sm:w-5 bg-zinc-300 rounded transition-spring ${isOpen ? 'rotate-45 translate-y-1.5 sm:translate-y-2' : ''}`}></span>
              <span className={`h-0.5 w-4 sm:w-5 bg-zinc-300 rounded transition-spring ${isOpen ? 'opacity-0 scale-0' : ''}`}></span>
              <span className={`h-0.5 w-4 sm:w-5 bg-zinc-300 rounded transition-spring ${isOpen ? '-rotate-45 -translate-y-1.5 sm:-translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`md:hidden absolute top-full left-0 right-0 mt-3 transition-premium ${
        isOpen ? 'opacity-100 translate-y-0 visible scale-100' : 'opacity-0 -translate-y-4 invisible scale-95 pointer-events-none'
      }`}>
        <div className="px-3 py-5 space-y-1 bg-zinc-950/95 border border-zinc-900 backdrop-blur-2xl rounded-3xl shadow-2xl">
          {NAV_LINKS.map((link, i) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.name}
                id={`nav-mobile-link-${link.name.toLowerCase()}`}
                href={link.href}
                onClick={() => setIsOpen(false)}
                style={{ transitionDelay: isOpen ? `${i * 50}ms` : '0ms' }}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-premium transform ${
                  isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                } ${
                  isActive 
                    ? 'text-brand-400 bg-zinc-900/50 font-semibold border-l-2 border-brand-400 pl-3' 
                    : 'text-zinc-300 hover:text-brand-400 hover:bg-zinc-900/40'
                }`}
              >
                {link.name}
              </a>
            );
          })}
          <div className="pt-3 px-3">
            <a
              id="nav-mobile-btn-hire"
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center py-3 text-xs font-mono font-bold uppercase tracking-wider text-white bg-gradient-to-r from-brand-400 to-brand-600 hover:from-brand-300 hover:to-brand-500 rounded-xl transition-premium shadow-lg shadow-brand-500/10 active:scale-98"
            >
              {NAV_STRINGS.BTN_HIRE}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
