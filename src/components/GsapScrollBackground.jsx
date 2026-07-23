import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * @fileoverview GSAP + ScrollTrigger driven canvas background.
 * Renders a 3D cyberspace perspective grid, morphing ambient light orbs,
 * and particle laser rays that all evolve in hue and intensity based on
 * the active section's theme (reading --accent and --bg from CSS variables).
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

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // NOTE: Interpolated state object driven by GSAP ScrollTrigger scrub
    const state = {
      progress: 0,
      gridTilt: 0,
      gridScale: 1,
      primaryHue: 160,   // Start: Emerald (160°)
      secondaryHue: 250, // Start: Violet (250°)
      laserSpeed: 1.0,
    };

    // Scrub-linked ScrollTrigger — drives the grid warp and hue shift
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.2,
      onUpdate: (self) => {
        const vel = Math.abs(self.getVelocity());
        gsap.to(state, {
          progress: self.progress,
          gridTilt: self.progress * 50,
          gridScale: 1 + self.progress * 0.45,
          // NOTE: Hue sweeps 160° (emerald) → 240° (violet) → 220° (cyan) as scroll progresses
          primaryHue: 160 + self.progress * 80,
          secondaryHue: 250 - self.progress * 60,
          laserSpeed: 1 + vel * 0.0015,
          duration: 0.5,
          overwrite: 'auto',
        });
      },
    });

    // Particle laser beams
    const laserCount = width < 768 ? 18 : 40;
    const lasers = Array.from({ length: laserCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      length: Math.random() * 100 + 40,
      speed: Math.random() * 2.5 + 0.8,
      alpha: Math.random() * 0.35 + 0.08,
      lineWidth: Math.random() * 1.5 + 0.3,
    }));

    // Constellation particle mesh
    const particleCount = width < 768 ? 30 : 60;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2.2 + 0.8,
      alpha: Math.random() * 0.4 + 0.15,
    }));

    let rafId;
    let time = 0;

    const draw = () => {
      time += 0.012;
      const p = state.progress;
      const h1 = state.primaryHue;
      const h2 = state.secondaryHue;

      ctx.clearRect(0, 0, width, height);

      // --- AMBIENT LIGHT ORB 1 (primary hue, top-left drifting) ---
      const o1x = width * 0.28 + Math.sin(time * 0.35) * 130 + p * (width * 0.22);
      const o1y = height * 0.28 + Math.cos(time * 0.28) * 90 + p * (height * 0.25);
      const o1r = Math.min(width, height) * (0.38 + p * 0.12);
      const g1 = ctx.createRadialGradient(o1x, o1y, 0, o1x, o1y, o1r);
      g1.addColorStop(0, `hsla(${h1}, 80%, 52%, 0.10)`);
      g1.addColorStop(0.45, `hsla(${h1 + 25}, 70%, 45%, 0.04)`);
      g1.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, width, height);

      // --- AMBIENT LIGHT ORB 2 (secondary hue, bottom-right counter-drifting) ---
      const o2x = width * 0.72 - Math.cos(time * 0.42) * 150 - p * (width * 0.18);
      const o2y = height * 0.72 - Math.sin(time * 0.36) * 100 - p * (height * 0.18);
      const o2r = Math.min(width, height) * 0.42;
      const g2 = ctx.createRadialGradient(o2x, o2y, 0, o2x, o2y, o2r);
      g2.addColorStop(0, `hsla(${h2}, 85%, 58%, 0.08)`);
      g2.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, width, height);

      // --- WARPING 3D CYBERSPACE GRID ---
      ctx.save();
      ctx.translate(width / 2, height / 2);
      ctx.scale(state.gridScale, state.gridScale);

      const spacing = 65;
      const gridAlpha = 0.045 + p * 0.025;
      ctx.strokeStyle = `hsla(${h1}, 72%, 52%, ${gridAlpha})`;
      ctx.lineWidth = 0.8;

      // Scrolling offset to animate grid movement
      const yOffset = (time * 18 * state.laserSpeed) % spacing;

      // Vertical perspective lines — slightly converge toward bottom as grid tilts
      const vCount = 20;
      for (let i = -vCount; i <= vCount; i++) {
        const x = i * spacing;
        ctx.beginPath();
        ctx.moveTo(x, -height);
        ctx.lineTo(x * (1 + p * 0.28), height);
        ctx.stroke();
      }

      // Horizontal scan lines with y-scroll animation
      for (let y = -height / 2 + yOffset; y < height / 2; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(-width, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();

      // --- HIGH-VELOCITY LASER BEAMS ---
      if (!isReducedMotion) {
        for (const l of lasers) {
          l.x += l.speed * state.laserSpeed * 1.6;
          if (l.x > width + l.length) {
            l.x = -l.length;
            l.y = Math.random() * height;
          }
          const lg = ctx.createLinearGradient(l.x - l.length, l.y, l.x, l.y);
          lg.addColorStop(0, 'rgba(0,0,0,0)');
          lg.addColorStop(0.5, `hsla(${h1}, 90%, 62%, ${l.alpha * 0.4})`);
          lg.addColorStop(1, `hsla(${h1 + 15}, 100%, 72%, ${l.alpha})`);
          ctx.beginPath();
          ctx.moveTo(l.x - l.length, l.y);
          ctx.lineTo(l.x, l.y);
          ctx.strokeStyle = lg;
          ctx.lineWidth = l.lineWidth;
          ctx.stroke();
        }
      }

      // --- CONSTELLATION NODE MESH ---
      for (let i = 0; i < particles.length; i++) {
        const pt = particles[i];
        if (!isReducedMotion) {
          pt.x += pt.vx;
          // NOTE: Nodes gently rise faster as scroll progress increases (floats upward)
          pt.y += pt.vy - p * 0.25;
          if (pt.x < 0) pt.x = width;
          if (pt.x > width) pt.x = 0;
          if (pt.y < 0) pt.y = height;
          if (pt.y > height) pt.y = 0;
        }

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${h1}, 80%, 62%, ${pt.alpha * 0.55})`;
        ctx.fill();

        // Draw constellation edges between nearby nodes
        for (let j = i + 1; j < particles.length; j++) {
          const pt2 = particles[j];
          const dx = pt.x - pt2.x;
          const dy = pt.y - pt2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 145) {
            ctx.beginPath();
            ctx.moveTo(pt.x, pt.y);
            ctx.lineTo(pt2.x, pt2.y);
            ctx.strokeStyle = `hsla(${h1}, 70%, 52%, ${(1 - dist / 145) * 0.11})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rafId);
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
