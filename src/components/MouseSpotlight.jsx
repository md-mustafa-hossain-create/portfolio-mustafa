import { useEffect, useRef } from 'react';

export default function MouseSpotlight() {
  const containerRef = useRef(null);
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
      if (containerRef.current) {
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
        containerRef.current.style.setProperty('--glow-x', `${glowRef.current.x}px`);
        containerRef.current.style.setProperty('--glow-y', `${glowRef.current.y}px`);
        containerRef.current.style.setProperty('--dot-x', `${dotRef.current.x}px`);
        containerRef.current.style.setProperty('--dot-y', `${dotRef.current.y}px`);
        containerRef.current.style.setProperty('--glow-opacity', opacityRef.current.toFixed(3));
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
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-30 hidden md:block transition-opacity duration-150"
      style={{ opacity: 'var(--glow-opacity, 0)' }}
    >
      {/* Ambient Radial Spotlight */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(350px circle at var(--glow-x, -999px) var(--glow-y, -999px), color-mix(in srgb, var(--color-brand-400) 7%, transparent), transparent 80%)`
        }}
      />
      {/* Interactive Micro-cursor dot */}
      <div
        className="absolute w-3 h-3 bg-brand-400 rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          left: 'var(--dot-x, -999px)',
          top: 'var(--dot-y, -999px)',
          boxShadow: '0 0 16px 6px color-mix(in srgb, var(--color-brand-400) 60%, transparent)'
        }}
      />
    </div>
  );
}
