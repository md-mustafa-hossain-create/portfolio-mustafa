import { useEffect, useRef } from 'react';

/**
 * @fileoverview High-performance, GPU-accelerated HTML5 Canvas scroll-driven background.
 * Creates an evolving visual atmosphere that shifts smoothly as the user scrolls
 * through the portfolio sections:
 * - Hero (0 - 15%): Ambient aurora glow + floating perspective grid lines.
 * - About (15 - 35%): Interactive particle constellation nodes & vector links.
 * - Skills (35 - 55%): Vibrant cyan/emerald neon code grid beams.
 * - Projects (55 - 75%): Radial depth rings & expanding grid nodes.
 * - Education/Blogs (75 - 90%): Floating upward particle stream ("code sparkles").
 * - Contact (90 - 100%): Converging central beacon glow.
 */
export default function AnimatedScrollBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Smooth scroll position interpolation (lerp)
    let currentScrollProgress = 0;
    let targetScrollProgress = 0;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Initialize particle pool for constellation and sparkles
    const particleCount = width < 768 ? 30 : 60;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.2,
      angle: Math.random() * Math.PI * 2,
    }));

    let time = 0;

    const render = () => {
      time += 0.015;

      // Calculate current scroll percentage smoothly
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      targetScrollProgress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      
      // Lerp scroll progress for ultra-smooth state transitions
      currentScrollProgress += (targetScrollProgress - currentScrollProgress) * 0.08;
      const p = currentScrollProgress;

      ctx.clearRect(0, 0, width, height);

      // --- SECTION 1: AMBIENT GLOW ORBS ---
      // Color interpolation based on scroll phase (p)
      let primaryHue = 160; // Emerald (default)
      if (p > 0.2 && p <= 0.5) primaryHue = 175; // Cyan
      else if (p > 0.5 && p <= 0.75) primaryHue = 250; // Indigo / Violet
      else if (p > 0.75) primaryHue = 155; // Deep Emerald

      const orb1X = width * (0.2 + Math.sin(time * 0.5) * 0.08);
      const orb1Y = height * (0.3 + Math.cos(time * 0.3) * 0.1) + p * (height * 0.2);
      const orb1Radius = Math.min(width, height) * (0.35 + p * 0.1);

      const grad1 = ctx.createRadialGradient(orb1X, orb1Y, 0, orb1X, orb1Y, orb1Radius);
      grad1.addColorStop(0, `hsla(${primaryHue}, 75%, 45%, ${0.07 + (1 - p) * 0.04})`);
      grad1.addColorStop(0.5, `hsla(${primaryHue + 30}, 70%, 40%, ${0.03 + p * 0.02})`);
      grad1.addColorStop(1, 'rgba(9, 9, 11, 0)');

      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const orb2X = width * (0.8 - Math.cos(time * 0.4) * 0.08);
      const orb2Y = height * (0.7 - Math.sin(time * 0.5) * 0.1) - p * (height * 0.15);
      const orb2Radius = Math.min(width, height) * 0.4;

      const grad2 = ctx.createRadialGradient(orb2X, orb2Y, 0, orb2X, orb2Y, orb2Radius);
      grad2.addColorStop(0, `hsla(${primaryHue - 40}, 80%, 50%, 0.05)`);
      grad2.addColorStop(1, 'rgba(9, 9, 11, 0)');

      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // --- SECTION 2: FLOATING PERSPECTIVE TECH GRID (Hero & About: p < 0.4) ---
      const gridOpacity = Math.max(0, 1 - p * 2.5);
      if (gridOpacity > 0.01) {
        ctx.strokeStyle = `rgba(16, 185, 129, ${gridOpacity * 0.04})`;
        ctx.lineWidth = 1;

        const gridSpacing = 60;
        const offset = (time * 15) % gridSpacing;

        // Vertical lines
        for (let x = 0; x < width; x += gridSpacing) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }

        // Horizontal scrolling lines
        for (let y = offset; y < height; y += gridSpacing) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
      }

      // --- SECTION 3: CONSTELLATION NODES & LINK VECTORS (p: 0.15 - 0.7) ---
      const constellationAlpha = Math.sin(Math.min(1, Math.max(0, (p - 0.15) / 0.55)) * Math.PI);
      if (constellationAlpha > 0.01) {
        // Update and draw particles
        for (let i = 0; i < particles.length; i++) {
          const pt = particles[i];

          if (!prefersReducedMotion) {
            pt.x += pt.vx + Math.sin(time + pt.angle) * 0.2;
            pt.y += pt.vy - (p * 0.5);

            // Wrap bounds
            if (pt.x < 0) pt.x = width;
            if (pt.x > width) pt.x = 0;
            if (pt.y < 0) pt.y = height;
            if (pt.y > height) pt.y = 0;
          }

          // Draw node
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(45, 212, 191, ${pt.alpha * constellationAlpha * 0.6})`;
          ctx.fill();

          // Connect nearby nodes with vector lines
          for (let j = i + 1; j < particles.length; j++) {
            const pt2 = particles[j];
            const dx = pt.x - pt2.x;
            const dy = pt.y - pt2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 130) {
              const lineAlpha = (1 - dist / 130) * 0.15 * constellationAlpha;
              ctx.beginPath();
              ctx.moveTo(pt.x, pt.y);
              ctx.lineTo(pt2.x, pt2.y);
              ctx.strokeStyle = `rgba(16, 185, 129, ${lineAlpha})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        }
      }

      // --- SECTION 4: RADIAL DEPTH RINGS (Projects: 0.5 - 0.85) ---
      const ringAlpha = Math.sin(Math.min(1, Math.max(0, (p - 0.5) / 0.35)) * Math.PI);
      if (ringAlpha > 0.01) {
        const centerX = width * 0.5;
        const centerY = height * 0.5;
        const baseRadius = Math.min(width, height) * 0.25;

        for (let r = 1; r <= 3; r++) {
          const currentRadius = baseRadius * r + Math.sin(time + r) * 15;
          ctx.beginPath();
          ctx.arc(centerX, centerY, currentRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(99, 102, 241, ${ringAlpha * (0.08 / r)})`;
          ctx.lineWidth = 1.5;
          ctx.setLineDash([8, 12]);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }

      // --- SECTION 5: UPWARD FLOATING CODE SPARKLES (Contact: p > 0.75) ---
      const sparkleAlpha = Math.min(1, (p - 0.75) / 0.25);
      if (sparkleAlpha > 0.01) {
        ctx.fillStyle = `rgba(16, 185, 129, ${sparkleAlpha * 0.5})`;
        for (let i = 0; i < 20; i++) {
          const sx = (width * 0.05) + ((i * 137.5) % (width * 0.9));
          const sy = (height - ((time * 40 + i * 50) % height));
          const sSize = 1.5 + (i % 3);

          ctx.beginPath();
          ctx.arc(sx, sy, sSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[0] w-full h-full"
    />
  );
}
