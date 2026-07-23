import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Provides a buttery-smooth scrolling experience across the application.
 * Synchronizes Lenis smooth scroll physics with GSAP ScrollTrigger timelines.
 */
export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis with premium physics-based easing
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    // Sync ScrollTrigger updates with Lenis scroll events
    lenis.on('scroll', ScrollTrigger.update);

    // Sync GSAP ticker with Lenis requestAnimationFrame
    const updateGsapTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateGsapTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateGsapTicker);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
