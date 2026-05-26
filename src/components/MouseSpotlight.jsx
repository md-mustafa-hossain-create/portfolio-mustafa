import { useEffect, useRef } from 'react';

/**
 * @fileoverview Custom cursor spotlight component.
 * Splits the cursor rendering into two layers:
 * 1. An ambient backlight (placed at z-[2]) which glows behind the main text contents (z-10).
 * 2. A foreground dot (placed at z-50) which acts as a normal cursor tracker.
 */
export default function MouseSpotlight() {
  const ambientRef = useRef(null);
  const dotRefContainer = useRef(null);
  const mouseRef = useRef({ x: -999, y: -999 });
  const glowRef = useRef({ x: -999, y: -999 });
  const dotRef = useRef({ x: -999, y: -999 });
  const isVisibleRef = useRef(false);
  const opacityRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Show cursor light and update coordinates
      isVisibleRef.current = true;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    let animationFrameId;

    const updatePosition = () => {
      // Handle first entry
      if (glowRef.current.x === -999 && isVisibleRef.current) {
        glowRef.current.x = mouseRef.current.x;
        glowRef.current.y = mouseRef.current.y;
        dotRef.current.x = mouseRef.current.x;
        dotRef.current.y = mouseRef.current.y;
      } else {
        // Lerp for smooth delay (ambient glow moves slightly slower, dot moves a bit faster)
        glowRef.current.x += (mouseRef.current.x - glowRef.current.x) * 0.08;
        glowRef.current.y += (mouseRef.current.y - glowRef.current.y) * 0.08;

        dotRef.current.x += (mouseRef.current.x - dotRef.current.x) * 0.15;
        dotRef.current.y += (mouseRef.current.y - dotRef.current.y) * 0.15;
      }

      // Smooth opacity fade in/out
      const targetOpacity = isVisibleRef.current ? 1 : 0;
      opacityRef.current += (targetOpacity - opacityRef.current) * 0.1;

      // Write directly to DOM styles to bypass React reconciliation lag
      const formattedOpacity = opacityRef.current.toFixed(3);

      if (ambientRef.current) {
        ambientRef.current.style.setProperty('--glow-x', `${glowRef.current.x}px`);
        ambientRef.current.style.setProperty('--glow-y', `${glowRef.current.y}px`);
        ambientRef.current.style.setProperty('--glow-opacity', formattedOpacity);
      }

      if (dotRefContainer.current) {
        dotRefContainer.current.style.setProperty('--dot-x', `${dotRef.current.x}px`);
        dotRefContainer.current.style.setProperty('--dot-y', `${dotRef.current.y}px`);
        dotRefContainer.current.style.setProperty('--glow-opacity', formattedOpacity);
      }

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    animationFrameId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* 
        Ambient Background Spotlight:
        Placed at z-[2] so it renders behind page content (typically z-10) but above the base background.
        This prevents the glow from overlaying/tinting the text to maintain readability.
      */}
      <div
        ref={ambientRef}
        className="spotlight-ambient-container pointer-events-none fixed inset-0 z-[2] hidden md:block transition-opacity duration-150"
        style={{ opacity: 'var(--glow-opacity, 0)' }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(250px circle at var(--glow-x, -999px) var(--glow-y, -999px), color-mix(in srgb, var(--color-brand-400) 5%, transparent), transparent 80%)`
          }}
        />
      </div>

      {/* 
        Interactive Foreground Cursor Dot:
        Placed at z-50 to ensure it is always rendered on top of all page elements and navigation.
      */}
      <div
        ref={dotRefContainer}
        className="pointer-events-none fixed inset-0 z-50 hidden md:block transition-opacity duration-150"
        style={{ opacity: 'var(--glow-opacity, 0)' }}
      >
        <div
          className="absolute w-3 h-3 rounded-full -translate-x-1/2 -translate-y-1/2 spotlight-dot-el"
          style={{
            left: 'var(--dot-x, -999px)',
            top: 'var(--dot-y, -999px)'
          }}
        />
      </div>
    </>
  );
}
