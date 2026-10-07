import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { NAV_LINKS } from '../constants/data';
import { GLOBAL } from '../constants/strings';

/**
 * @fileoverview Redesigned accessible and interactive navigation bar.
 * Keeps navigation persistent and lightweight, with a focused mobile drawer.
 */
export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const drawerRef = useRef(null);
  const menuButtonRef = useRef(null);
  const wasOpenRef = useRef(false);

  const isOnHomePage = location.pathname === '/';
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

  useEffect(() => {
    if (isOpen) {
      wasOpenRef.current = true;
    } else if (wasOpenRef.current) {
      wasOpenRef.current = false;
      menuButtonRef.current?.focus();
    }
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

  return (
    <header className="w-full flex justify-center">
      <nav 
        role="navigation" 
        aria-label="Main Navigation"
        className={`navbar-custom px-4 sm:px-6 ${
          scrolled ? 'navbar-scrolled py-2' : 'navbar-unscrolled py-3'
        } ${
          'translate-y-0 opacity-100'
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
            {/* Professional M lettermark: geometric dual-stem M with neon accent underbar and signature dot. */}
            <div className="w-7 h-7 sm:w-8 sm:h-8 transition-transform duration-200 group-hover:scale-105 shrink-0">
              <svg viewBox="0 0 32 32" className="w-full h-full" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="navbar-green-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2CFF05" />
                    <stop offset="100%" stopColor="#00CC00" />
                  </linearGradient>
                </defs>
                {/* Dark rounded-square background */}
                <rect x="0" y="0" width="32" height="32" rx="6" fill="#0a0a0a" />
                {/* Subtle inner border */}
                <rect x="1" y="1" width="30" height="30" rx="5" fill="none" stroke="#1f1f1f" strokeWidth="0.5" />
                {/* Left stem of M */}
                <rect x="5.5" y="8.5" width="3.5" height="15" rx="0.75" fill="#F5F5F5" />
                {/* Right stem of M */}
                <rect x="23" y="8.5" width="3.5" height="15" rx="0.75" fill="#F5F5F5" />
                {/* Left diagonal of M */}
                <polygon points="9,8.5 12.5,8.5 16,15 14.5,15" fill="#F5F5F5" />
                {/* Right diagonal of M */}
                <polygon points="23,8.5 19.5,8.5 16,15 17.5,15" fill="#F5F5F5" />
                {/* Brand-green accent underbar */}
                <rect x="5.5" y="25" width="21" height="1.25" rx="0.625" fill="url(#navbar-green-grad)" />
                {/* Neon dot — signature personal touch */}
                <circle cx="24" cy="9" r="1.5" fill="#2CFF05" />
              </svg>
            </div>
            <span className="font-sans font-bold text-sm sm:text-base tracking-wider text-white transition-colors uppercase whitespace-nowrap">
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
                  className={`font-sans font-semibold text-xs px-4 py-2.5 rounded-md transition-colors duration-200 relative z-10 focus:outline-none focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ${
                    isActive ? 'text-brand-400' : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span layoutId="active-navigation-indicator" transition={{ type: 'spring', stiffness: 380, damping: 30 }} className="absolute left-4 right-4 -bottom-1 h-px bg-brand-400" />
                  )}
                </a>
              );
            })}
            
          </div>

          {/* Mobile Actions */}
          <div className="lg:hidden flex items-center gap-2 shrink-0">
            <button
              id="nav-btn-mobile-toggle"
              ref={menuButtonRef}
              aria-expanded={isOpen}
              aria-controls="mobile-drawer"
              aria-haspopup="true"
              onClick={() => setIsOpen((open) => !open)}
              className="relative w-11 h-11 flex flex-col justify-center items-center rounded-md hover:bg-zinc-900/60 focus:outline-none focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 transition-colors duration-200 shrink-0"
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
        className={`fixed inset-0 bg-zinc-950/80 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible'
        }`}
        aria-hidden="true"
      />

      {/* Slide-out drawer menu */}
      <div
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpen}
        inert={!isOpen}
        aria-label="Mobile Navigation Menu"
        ref={drawerRef}
        className={`fixed top-0 right-0 h-[100dvh] w-72 bg-zinc-950 border-l border-zinc-900 p-6 z-50 flex flex-col gap-6 shadow-2xl justify-between transition-all duration-300 transform ${
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
              className="p-2 rounded-md hover:bg-zinc-900 border border-transparent hover:border-zinc-800 text-zinc-400 hover:text-white transition-colors duration-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 cursor-pointer"
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
                  className={`px-4 py-3.5 rounded-md text-sm font-semibold tracking-wide transition-colors duration-200 block transform focus:outline-none focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ${
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

      </div>
    </header>
  );
}
