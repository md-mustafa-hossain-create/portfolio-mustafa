import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom React hook to bind modern GSAP ScrollTrigger 3D perspective transforms,
 * dynamic scale reveals, and laser drawing animations across portfolio sections.
 */
export function useGsapScrollTrigger() {
  useEffect(() => {
    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // 1. HERO SECTION: 3D Depth Shrink & Tilt on scroll out
      gsap.to('#home', {
        scrollTrigger: {
          trigger: '#home',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
        scale: 0.94,
        opacity: 0.3,
        rotateX: 8,
        transformPerspective: 1000,
        ease: 'power1.inOut',
      });

      // 2. ABOUT SECTION: 3D Scale-in into crisp focus
      gsap.fromTo(
        '#about',
        {
          scale: 0.92,
          opacity: 0.6,
          y: 40,
        },
        {
          scrollTrigger: {
            trigger: '#about',
            start: 'top 85%',
            end: 'top 35%',
            scrub: 0.6,
          },
          scale: 1,
          opacity: 1,
          y: 0,
          ease: 'power2.out',
        }
      );

      // 3. SKILLS SECTION: Staggered 3D Card flip & sweep
      gsap.fromTo(
        '#skills',
        {
          scale: 0.94,
          opacity: 0.7,
        },
        {
          scrollTrigger: {
            trigger: '#skills',
            start: 'top 80%',
            end: 'top 40%',
            scrub: 0.6,
          },
          scale: 1,
          opacity: 1,
          ease: 'power2.out',
        }
      );

      // 4. PROJECTS SECTION: Parallax depth stack highlight
      gsap.fromTo(
        '#projects',
        {
          scale: 0.93,
          opacity: 0.7,
        },
        {
          scrollTrigger: {
            trigger: '#projects',
            start: 'top 80%',
            end: 'top 35%',
            scrub: 0.6,
          },
          scale: 1,
          opacity: 1,
          ease: 'power2.out',
        }
      );

      // 5. EDUCATION SECTION: Slide and illuminate timeline
      gsap.fromTo(
        '#education',
        {
          scale: 0.94,
          opacity: 0.7,
        },
        {
          scrollTrigger: {
            trigger: '#education',
            start: 'top 80%',
            end: 'top 35%',
            scrub: 0.6,
          },
          scale: 1,
          opacity: 1,
          ease: 'power2.out',
        }
      );

      // 6. CONTACT SECTION: Converging beacon highlight
      gsap.fromTo(
        '#contact',
        {
          scale: 0.94,
          opacity: 0.7,
        },
        {
          scrollTrigger: {
            trigger: '#contact',
            start: 'top 85%',
            end: 'top 40%',
            scrub: 0.6,
          },
          scale: 1,
          opacity: 1,
          ease: 'power2.out',
        }
      );
    });

    return () => ctx.revert();
  }, []);
}
