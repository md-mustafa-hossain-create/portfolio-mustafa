import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { NAV_LINKS } from '../constants/data';
import { GLOBAL, NAV_STRINGS } from '../constants/strings';

/**
 * @fileoverview Redesigned accessible and interactive navigation bar.
 * Features smart auto-hide on scroll, Framer Motion active capsule highlight,
 * slide-out mobile drawer, and complete keyboard trap focus & ARIA compliance.
 */
export default function Navbar({ theme, onToggleTheme }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('up');
  const [activeSection, setActiveSection] = useState('home');
  const drawerRef = useRef(null);

  const isOnHomePage = location.pathname === '/';
  const isLightTheme = theme === 'light';

  const handleNavLinkClick = (e, href, searchParams = '') => {
    if (!isOnHomePage) {
      e.preventDefault();
      navigate(`/${searchParams}${href}`);
    } else if (searchParams) {
      window.history.pushState({}, '', `/${searchParams}${href}`);
      window.dispatchEvent(new Event('popstate'));
    }
    setIsOpen(false);
  };

  // Monitor scroll height to adjust style/border shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Monitor scroll direction (Smart Auto-Hide)
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScrollDirection = () => {
      const scrollY = window.scrollY;
      // Scroll down threshold of 10px to prevent jitter
      if (scrollY > lastScrollY + 10 && scrollY > 100) {
        setScrollDirection('down');
      } else if (scrollY < lastScrollY - 10 || scrollY <= 30) {
        setScrollDirection('up');
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener('scroll', handleScrollDirection, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollDirection);
  }, []);

  // Close drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Focus trap inside the mobile drawer (WCAG Accessibility compliance)
  useEffect(() => {
    if (!isOpen) return;
    const focusableElements = drawerRef.current?.querySelectorAll(
      'a[href], button, input, textarea'
    );
    if (!focusableElements || focusableElements.length === 0) return;
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabTrap = (e) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleTabTrap);
    // Auto-focus the close button in the drawer when opened
    setTimeout(() => firstElement?.focus(), 50);
    return () => window.removeEventListener('keydown', handleTabTrap);
  }, [isOpen]);

  // Scrollspy: dynamic navbar section highlighting
  useEffect(() => {
    const sections = NAV_LINKS.map(link => link.href.slice(1));
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0
    };

    let observer;
    const bindObserver = () => {
      if (observer) observer.disconnect();
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      }, observerOptions);

      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.observe(element);
      });
    };

    bindObserver();

    const mutationObserver = new MutationObserver(() => {
      bindObserver();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      if (observer) observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  const isHidden = scrollDirection === 'down' && scrolled && !isOpen;

  return (
    <header className="w-full flex justify-center">
      <nav 
        role="navigation" 
        aria-label="Main Navigation"
        className={`navbar-custom px-4 sm:px-6 ${
          scrolled ? 'navbar-scrolled py-2' : 'navbar-unscrolled py-3'
        } ${
          isHidden ? '-translate-y-32 opacity-0' : 'translate-y-0 opacity-100'
        }`}
      >
        <div className="flex items-center justify-between h-12 flex-nowrap">
          {/* Logo Brand */}
          <div 
            id="nav-logo"
            role="button"
            tabIndex={0}
            aria-label="Mustafa Dev Home"
            onClick={() => {
              if (!isOnHomePage) {
                navigate('/');
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
              setIsOpen(false);
            }} 
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (!isOnHomePage) navigate('/');
                else window.scrollTo({ top: 0, behavior: 'smooth' });
                setIsOpen(false);
              }
            }}
            className="flex-shrink-0 flex items-center gap-1.5 sm:gap-2.5 group cursor-pointer focus:outline-none focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 rounded-xl"
          >
            {/* Hexagonal Monogram Logo */}
            <div className="w-7 h-7 sm:w-8 sm:h-8 group-hover:scale-105 group-hover:rotate-6 transition-spring shrink-0">
              <svg viewBox="0 0 512 512" className="w-full h-full" aria-hidden="true">
                <defs>
                  <linearGradient id="nav-brand-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                  <linearGradient id="nav-glow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#34d399" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                  <filter id="nav-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="8" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                <polygon points="256,32 450,144 450,368 256,480 62,368 62,144" fill="#09090b" stroke="url(#nav-brand-grad)" strokeWidth="20" strokeLinejoin="round" />
                <path d="M 210,180 L 130,256 L 210,332" stroke="url(#nav-glow-grad)" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d="M 302,180 L 382,256 L 302,332" stroke="url(#nav-glow-grad)" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <line x1="280" y1="160" x2="232" y2="352" stroke="#ffffff" strokeWidth="32" strokeLinecap="round" filter="url(#nav-glow)" />
              </svg>
            </div>
            <span className="font-sans font-bold text-sm sm:text-base tracking-wider text-white group-hover:text-brand-400 transition-colors uppercase whitespace-nowrap">
              {GLOBAL.BRAND_NAME}<span className="text-brand-400 lowercase">{GLOBAL.BRAND_DOMAIN}</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 relative">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.name}
                  id={`nav-link-${link.name.toLowerCase()}`}
                  href={link.href}
                  onClick={(e) => handleNavLinkClick(e, link.href)}
                  className={`font-sans font-semibold text-xs px-4 py-2.5 rounded-full transition-premium relative z-10 focus:outline-none focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ${
                    isActive ? 'text-brand-400' : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-zinc-900/80 border border-zinc-800 rounded-full -z-10 shadow-inner"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}
                </a>
              );
            })}
            
            <button
              id="nav-btn-theme-toggle"
              type="button"
              onClick={onToggleTheme}
              className="ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/70 text-zinc-300 hover:border-brand-400/30 hover:text-brand-400 hover:bg-zinc-900 focus:outline-none focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 transition-premium active:scale-95 cursor-pointer z-10"
              aria-label={isLightTheme ? NAV_STRINGS.THEME_TOGGLE_DARK : NAV_STRINGS.THEME_TOGGLE_LIGHT}
              title={isLightTheme ? NAV_STRINGS.THEME_TOGGLE_DARK : NAV_STRINGS.THEME_TOGGLE_LIGHT}
            >
              {isLightTheme ? (
                <Lightbulb className="w-4 h-4 text-zinc-400 transition-all duration-300" />
              ) : (
                <Lightbulb 
                  className="w-4 h-4 text-brand-400 fill-brand-400 animate-pulse transition-all duration-300"
                  style={{
                    filter: 'drop-shadow(0 0 6px rgba(85, 255, 85, 0.65))'
                  }}
                />
              )}
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="lg:hidden flex items-center gap-2 shrink-0">
            <button
              id="nav-btn-mobile-theme-toggle"
              type="button"
              onClick={onToggleTheme}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-850 bg-zinc-900/50 text-zinc-300 hover:border-brand-400/30 hover:text-brand-400 hover:bg-zinc-900 focus:outline-none focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 transition-premium active:scale-95 cursor-pointer shrink-0"
              aria-label={isLightTheme ? NAV_STRINGS.THEME_TOGGLE_DARK : NAV_STRINGS.THEME_TOGGLE_LIGHT}
            >
              {isLightTheme ? (
                <Lightbulb className="w-4 h-4 text-zinc-400 transition-all duration-300" />
              ) : (
                <Lightbulb 
                  className="w-4 h-4 text-brand-400 fill-brand-400 animate-pulse transition-all duration-300"
                  style={{
                    filter: 'drop-shadow(0 0 6px rgba(85, 255, 85, 0.65))'
                  }}
                />
              )}
            </button>
            
            <button
              id="nav-btn-mobile-toggle"
              aria-expanded={isOpen}
              aria-controls="mobile-drawer"
              aria-haspopup="true"
              onClick={() => setIsOpen(true)}
              className="relative w-11 h-11 flex flex-col justify-center items-center rounded-full hover:bg-zinc-900/60 focus:outline-none focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 transition-premium shrink-0"
              aria-label="Toggle Menu"
            >
              <div className="w-5 flex flex-col gap-1.5 pointer-events-none">
                <span className="h-0.5 w-5 bg-zinc-300 rounded"></span>
                <span className="h-0.5 w-5 bg-zinc-300 rounded"></span>
                <span className="h-0.5 w-5 bg-zinc-300 rounded"></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Accessible Mobile Slide-Out Drawer Overlay */}
      {/* Dark glass backdrop overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-zinc-950/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible'
        }`}
        aria-hidden="true"
      />

      {/* Slide-out drawer menu */}
      <div
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
        ref={drawerRef}
        className={`fixed top-0 right-0 h-[100dvh] w-72 bg-zinc-950/95 border-l border-zinc-900 backdrop-blur-2xl p-6 z-50 flex flex-col gap-6 shadow-2xl justify-between transition-all duration-300 transform ${
          isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
        }`}
      >
        {/* Drawer Top Header */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <span className="font-sans font-bold text-xs uppercase tracking-widest text-zinc-500">
              Menu Navigation
            </span>
            
            {/* Close button inside Drawer */}
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full hover:bg-zinc-900 border border-transparent hover:border-zinc-800 text-zinc-400 hover:text-white transition-premium focus:outline-none focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Staggered Drawer Links */}
          <div className="flex flex-col gap-1.5 text-left">
            {NAV_LINKS.map((link, idx) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  id={`nav-mobile-link-${link.name.toLowerCase()}`}
                  onClick={(e) => handleNavLinkClick(e, link.href)}
                  style={{ transitionDelay: isOpen ? `${idx * 40}ms` : '0ms' }}
                  className={`px-4 py-3.5 rounded-2xl text-sm font-semibold tracking-wide transition-premium block transform focus:outline-none focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ${
                    isOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                  } ${
                    isActive 
                      ? 'text-brand-400 bg-brand-500/10 border-l-2 border-brand-400 pl-3.5' 
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-900/40'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>
        </div>

        {/* Drawer Footer info */}
        <div className="text-left border-t border-zinc-900 pt-6">
          <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest block mb-2 leading-none">
            Logged In As
          </span>
          <span className="text-xs font-semibold text-zinc-400 block leading-none">
            Recruiter / Guest
          </span>
        </div>
      </div>
    </header>
  );
}
