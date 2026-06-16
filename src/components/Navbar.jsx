import { useState, useEffect } from 'react';
import { Lightbulb } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { NAV_LINKS } from '../constants/data';
import { GLOBAL, NAV_STRINGS } from '../constants/strings';

/**
 * @fileoverview Main Navigation component.
 * Refactored to use navigation hooks for cross-page redirection and scrollspy highlight.
 */

export default function Navbar({ theme, onToggleTheme }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const isOnHomePage = location.pathname === '/';

  const handleNavLinkClick = (e, href, searchParams = '') => {
    if (!isOnHomePage) {
      e.preventDefault();
      navigate(`/${searchParams}${href}`);
    } else if (searchParams) {
      // Update URL with search params for the Contact Form to read without triggering a reload
      window.history.pushState({}, '', `/${searchParams}${href}`);
      window.dispatchEvent(new Event('popstate'));
    }
    setIsOpen(false);
  };

  // Monitor scroll height to adjust style/border shadow
  useEffect(() => {
    let lastScrolled = false;
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== lastScrolled) {
        lastScrolled = isScrolled;
        setScrolled(isScrolled);
      }
    };
    // Use passive listener to avoid blocking browser main thread rendering
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scrollspy: dynamic navbar section highlighting
  // NOTE: Because sections are wrapped in LazySection, the fallback DOM nodes are unmounted
  // and replaced with the actual component DOM nodes upon intersection. We use a MutationObserver
  // to dynamically re-bind the IntersectionObserver whenever section DOM elements mount/unmount.
  useEffect(() => {
    const sections = NAV_LINKS.map(link => link.href.slice(1));
    
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0
    };

    let observer;

    const bindObserver = () => {
      if (observer) {
        observer.disconnect();
      }
      
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      }, observerOptions);

      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.observe(element);
        }
      });
    };

    // Initial binding of the observer to existing elements
    bindObserver();

    // Monitor DOM changes to re-bind when placeholders are replaced by actual components
    const mutationObserver = new MutationObserver((mutations) => {
      let shouldRebind = false;
      for (const mutation of mutations) {
        const hasSectionNode = (nodes) => 
          Array.from(nodes).some(node => 
            node.nodeType === 1 && 
            (sections.includes(node.id) || (node.querySelector && node.querySelector('section[id]')) || node.tagName === 'SECTION')
          );

        if (hasSectionNode(mutation.addedNodes) || hasSectionNode(mutation.removedNodes)) {
          shouldRebind = true;
          break;
        }
      }

      if (shouldRebind) {
        bindObserver();
      }
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

  const isLightTheme = theme === 'light';

  return (
    <nav className={`navbar-custom px-4 sm:px-6 ${
      scrolled 
        ? 'navbar-scrolled py-2' 
        : 'navbar-unscrolled py-3'
    }`}>
      <div className="flex items-center justify-between h-12 flex-nowrap">
        {/* Logo Brand */}
        <div 
          id="nav-logo"
          onClick={() => {
            if (!isOnHomePage) {
              navigate('/');
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            setIsOpen(false);
          }} 
          className="flex-shrink-0 flex items-center gap-1.5 sm:gap-2.5 group cursor-pointer"
        >
          {/* Professional Developer Hexagonal Monogram Logo */}
          <div className="w-7 h-7 sm:w-8 sm:h-8 group-hover:scale-105 group-hover:rotate-6 transition-spring shrink-0">
            <svg viewBox="0 0 512 512" className="w-full h-full">
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
        <div className="hidden lg:flex items-center space-x-1">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.name}
                id={`nav-link-${link.name.toLowerCase()}`}
                href={link.href}
                onClick={(e) => handleNavLinkClick(e, link.href)}
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
          <button
            id="nav-btn-theme-toggle"
            type="button"
            onClick={onToggleTheme}
            className="ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/70 text-zinc-300 hover:border-brand-400/30 hover:text-brand-400 hover:bg-zinc-900 transition-premium active:scale-95 cursor-pointer"
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
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/70 text-zinc-300 hover:border-brand-400/30 hover:text-brand-400 hover:bg-zinc-900 transition-premium active:scale-95 cursor-pointer shrink-0"
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
            onClick={() => setIsOpen(!isOpen)}
            className="relative w-12 h-12 flex flex-col justify-center items-center rounded-full hover:bg-zinc-900/60 focus:outline-none transition-premium shrink-0"
            aria-label="Toggle Menu"
          >
            <div className="w-5 flex flex-col gap-1.5">
              <span className={`h-0.5 w-5 bg-zinc-300 rounded transition-spring ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`h-0.5 w-5 bg-zinc-300 rounded transition-spring ${isOpen ? 'opacity-0 scale-0' : ''}`}></span>
              <span className={`h-0.5 w-5 bg-zinc-300 rounded transition-spring ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`lg:hidden absolute top-full left-0 right-0 mt-3 transition-premium ${
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
                onClick={(e) => handleNavLinkClick(e, link.href)}
                style={{ transitionDelay: isOpen ? `${i * 50}ms` : '0ms' }}
                className={`block px-4 py-3.5 rounded-xl text-sm font-medium transition-premium transform ${
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
        </div>
      </div>
    </nav>
  );
}
