import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Applies a section's mood palette to the document root CSS variables.
 * Uses GSAP to smoothly transition --bg, --surface, --text, --accent, and --border
 * across the full document — including body background and any .glass elements.
 *
 * @param {HTMLElement} section - The section element with data-bg, data-surface etc.
 */
function applyTheme(section) {
  const bg = section.dataset.bg;
  const surface = section.dataset.surface;
  const text = section.dataset.text;
  const accent = section.dataset.accent;
  const border = section.dataset.border;

  if (!bg) return;

  // NOTE: Apply background + text directly to body so the transition is visible
  gsap.to(document.body, {
    backgroundColor: bg,
    color: text,
    duration: 0.8,
    ease: 'power2.out',
    overwrite: 'auto',
  });

  // NOTE: Set CSS variables on the root so all components can read --bg, --accent etc.
  const root = document.documentElement;
  root.style.setProperty('--bg', bg);
  root.style.setProperty('--text', text);
  if (surface) root.style.setProperty('--surface', surface);
  if (accent) root.style.setProperty('--accent', accent);
  if (border) root.style.setProperty('--border', border);
}

/**
 * Custom React hook that sets up GSAP ScrollTrigger timelines across every portfolio section.
 * Implements:
 *   1. Per-section CSS variable theme transitions (agency-style editorial color moods).
 *   2. Staggered fade-up reveal animations for headings, paragraphs, and cards.
 *   3. 3D depth scroll-out for the Hero section.
 */
export function useGsapScrollTrigger() {
  useEffect(() => {
    // Respect OS-level reduced-motion accessibility setting
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // --- SECTION THEME TRANSITIONS ---
      // Attach an enter/enterBack trigger to every .portfolio-section
      document.querySelectorAll('.portfolio-section').forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          // NOTE: 50% center threshold matches team4.agency pattern for clean, decisive swaps
          start: 'top 52%',
          end: 'bottom 52%',
          onEnter: () => applyTheme(section),
          onEnterBack: () => applyTheme(section),
        });
      });

      // --- HERO: 3D depth pinch + fade on scroll exit ---
      gsap.to('#home', {
        scrollTrigger: {
          trigger: '#home',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
        scale: 0.94,
        opacity: 0.25,
        rotateX: 6,
        transformPerspective: 1200,
        ease: 'power1.inOut',
      });

      // --- STAGGERED REVEAL: section heading labels ---
      // NOTE: Uses power3.out at 0.8s — matches team4.agency's editorial motion timing
      document.querySelectorAll('.portfolio-section').forEach((section) => {
        const headings = section.querySelectorAll('h1, h2, h3');
        const body = section.querySelectorAll('p');
        const cards = section.querySelectorAll('[class*="rounded-"][class*="border"]');

        if (headings.length > 0) {
          gsap.fromTo(
            headings,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              stagger: 0.12,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 75%',
                toggleActions: 'play none none none',
              },
            }
          );
        }

        if (body.length > 0) {
          gsap.fromTo(
            body,
            { y: 25, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 72%',
                toggleActions: 'play none none none',
              },
            }
          );
        }

        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            { y: 35, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.08,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 70%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);
}
