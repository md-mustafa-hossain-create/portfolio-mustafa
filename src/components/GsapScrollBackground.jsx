import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * @fileoverview Modern, complex animated scrolling background using GSAP & ScrollTrigger.
 * Features an evolving 3D perspective cyberspace grid, morphing neon glassmorphic light orbs,
 * particle laser rays, and smooth scroll-driven color phase shifts matching the portfolio's theme.
 */
export default function GsapScrollBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // GSAP ScrollTrigger Proxy State Object
    const scrollState = {
      progress: 0,
      gridTilt: 0,
      gridScale: 1,
      huePrimary: 160,    // Emerald
      hueSecondary: 250,  // Electric Violet
      laserSpeed: 1,
      constellationDensity: 1,
    };

    // GSAP ScrollTrigger Scrub Timeline
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.8,
      onUpdate: (self) => {
        scrollState.progress = self.progress;
        
        // Dynamic GSAP scroll phase transitions
        gsap.to(scrollState, {
          gridTilt: self.progress * 45, // 0 to 45 degree perspective tilt
          gridScale: 1 + self.progress * 0.4,
          huePrimary: 160 + self.progress * 90, // 160 (emerald) to 250 (violet)
          hueSecondary: 250 - self.progress * 90,
          laserSpeed: 1 + self.getVelocity() * 0.002,
          overwrite: 'auto',
          duration: 0.4,
        });
      },
    });

    // Particle Laser Rays Array
    const laserCount = width < 768 ? 15 : 35;
    const lasers = Array.from({ length: laserCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      length: Math.random() * 80 + 40,
      speed: Math.random() * 2 + 1,
      alpha: Math.random() * 0.4 + 0.1,
      width: Math.random() * 1.5 + 0.5,
    }));

    // Constellation Particle Mesh
    const particleCount = width < 768 ? 25 : 55;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.2,
    }));

    let animationFrameId;
    let time = 0;

    const render = () => {
      time += 0.015;
      const p = scrollState.progress;

      ctx.clearRect(0, 0, width, height);

      // --- 1. MORPHING NEON LIGHT ORBS (GSAP Driven) ---
      const orb1X = width * 0.3 + Math.sin(time * 0.4) * 120 + p * (width * 0.2);
      const orb1Y = height * 0.3 + Math.cos(time * 0.3) * 80 + p * (height * 0.3);
      const orb1Radius = Math.min(width, height) * (0.35 + p * 0.15);

      const grad1 = ctx.createRadialGradient(orb1X, orb1Y, 0, orb1X, orb1Y, orb1Radius);
      grad1.addColorStop(0, `hsla(${scrollState.huePrimary}, 80%, 50%, 0.08)`);
      grad1.addColorStop(0.5, `hsla(${scrollState.huePrimary + 30}, 75%, 45%, 0.03)`);
      grad1.addColorStop(1, 'rgba(9, 9, 11, 0)');

      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const orb2X = width * 0.7 - Math.cos(time * 0.5) * 140 - p * (width * 0.2);
      const orb2Y = height * 0.7 - Math.sin(time * 0.4) * 90 - p * (height * 0.2);
      const orb2Radius = Math.min(width, height) * 0.4;

      const grad2 = ctx.createRadialGradient(orb2X, orb2Y, 0, orb2X, orb2Y, orb2Radius);
      grad2.addColorStop(0, `hsla(${scrollState.hueSecondary}, 85%, 55%, 0.06)`);
      grad2.addColorStop(1, 'rgba(9, 9, 11, 0)');

      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // --- 2. WARPING 3D CYBERSPACE TECH GRID ---
      ctx.save();
      ctx.translate(width / 2, height / 2);
      ctx.scale(scrollState.gridScale, scrollState.gridScale);
      
      const gridSpacing = 70;
      const gridOpacity = 0.04 + p * 0.02;
      ctx.strokeStyle = `hsla(${scrollState.huePrimary}, 70%, 50%, ${gridOpacity})`;
      ctx.lineWidth = 1;

      const offset = (time * 20 * scrollState.laserSpeed) % gridSpacing;

      // Perspective Grid Lines
      const lineCount = 18;
      for (let i = -lineCount; i <= lineCount; i++) {
        const x = i * gridSpacing;
        ctx.beginPath();
        ctx.moveTo(x, -height);
        ctx.lineTo(x * (1 + p * 0.3), height);
        ctx.stroke();
      }

      // Dynamic Horizontal Grid Rays
      for (let y = -height / 2 + offset; y < height / 2; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(-width, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();

      // --- 3. HIGH-VELOCITY LASER BEAMS & CODE RAYS ---
      if (!prefersReducedMotion) {
        for (let i = 0; i < lasers.length; i++) {
          const l = lasers[i];
          l.x += l.speed * scrollState.laserSpeed * 1.5;

          if (l.x > width + l.length) {
            l.x = -l.length;
            l.y = Math.random() * height;
          }

          const laserGrad = ctx.createLinearGradient(l.x - l.length, l.y, l.x, l.y);
          laserGrad.addColorStop(0, 'rgba(16, 185, 129, 0)');
          laserGrad.addColorStop(0.5, `hsla(${scrollState.huePrimary}, 90%, 60%, ${l.alpha * 0.5})`);
          laserGrad.addColorStop(1, `hsla(${scrollState.huePrimary + 20}, 100%, 70%, ${l.alpha})`);

          ctx.beginPath();
          ctx.moveTo(l.x - l.length, l.y);
          ctx.lineTo(l.x, l.y);
          ctx.strokeStyle = laserGrad;
          ctx.lineWidth = l.width;
          ctx.stroke();
        }
      }

      // --- 4. CONSTELLATION NODE VECTOR MESH ---
      for (let i = 0; i < particles.length; i++) {
        const pt = particles[i];

        if (!prefersReducedMotion) {
          pt.x += pt.vx;
          pt.y += pt.vy - p * 0.3;

          if (pt.x < 0) pt.x = width;
          if (pt.x > width) pt.x = 0;
          if (pt.y < 0) pt.y = height;
          if (pt.y > height) pt.y = 0;
        }

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${scrollState.huePrimary}, 80%, 60%, ${pt.alpha * 0.6})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const pt2 = particles[j];
          const dx = pt.x - pt2.x;
          const dy = pt.y - pt2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            const lineAlpha = (1 - dist / 140) * 0.12;
            ctx.beginPath();
            ctx.moveTo(pt.x, pt.y);
            ctx.lineTo(pt2.x, pt2.y);
            ctx.strokeStyle = `hsla(${scrollState.huePrimary}, 70%, 50%, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      trigger.kill();
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
