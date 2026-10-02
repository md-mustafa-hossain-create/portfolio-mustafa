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
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let updateGsapTicker;

    const stopSmoothScroll = () => {
      if (!lenisRef.current) return;
      gsap.ticker.remove(updateGsapTicker);
      lenisRef.current.destroy();
      lenisRef.current = null;
    };

    const startSmoothScroll = () => {
      if (motionPreference.matches || lenisRef.current) return;

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });
      lenisRef.current = lenis;
      lenis.on('scroll', ScrollTrigger.update);

      updateGsapTicker = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(updateGsapTicker);
      gsap.ticker.lagSmoothing(0);
    };

    const updateMotionPreference = () => {
      if (motionPreference.matches) stopSmoothScroll();
      else startSmoothScroll();
    };

    startSmoothScroll();
    motionPreference.addEventListener('change', updateMotionPreference);

    return () => {
      motionPreference.removeEventListener('change', updateMotionPreference);
      stopSmoothScroll();
    };
  }, []);

  return <>{children}</>;
}
