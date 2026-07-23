import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── FORMATION GENERATORS ─────────────────────────────────────────────────────
// Each function returns an array of {x, y} target positions for N particles,
// relative to the viewport center. These are the "shapes" the neural network
// morphs between as the user scrolls.

/**
 * Formation 0 — HERO: Random scattered cloud (organic, floating feel)
 */
function formCloud(n, w, h) {
  return Array.from({ length: n }, () => ({
    tx: (Math.random() - 0.5) * w * 0.95,
    ty: (Math.random() - 0.5) * h * 0.9,
  }));
}

/**
 * Formation 1 — ABOUT: Brain-like dual-hemisphere cluster
 */
function formBrain(n, w, h) {
  return Array.from({ length: n }, (_, i) => {
    const side = i % 2 === 0 ? -1 : 1;
    const angle = Math.random() * Math.PI;
    const r = Math.random() * Math.min(w, h) * 0.28;
    return {
      tx: side * (Math.min(w, h) * 0.17 + Math.cos(angle) * r),
      ty: Math.sin(angle) * r * 0.75,
    };
  });
}

/**
 * Formation 2 — SKILLS: Tight grid matrix
 */
function formGrid(n, w, h) {
  const cols = Math.ceil(Math.sqrt(n * (w / h)));
  const rows = Math.ceil(n / cols);
  const gapX = Math.min(w * 0.8, 900) / cols;
  const gapY = Math.min(h * 0.7, 550) / rows;
  return Array.from({ length: n }, (_, i) => ({
    tx: (i % cols) * gapX - (cols - 1) * gapX * 0.5,
    ty: Math.floor(i / cols) * gapY - (rows - 1) * gapY * 0.5,
  }));
}

/**
 * Formation 3 — PROJECTS: Concentric orbital rings
 */
function formOrbit(n, w, h) {
  const rings = [0.12, 0.24, 0.36].map((r) => Math.min(w, h) * r);
  const perRing = [Math.ceil(n * 0.15), Math.ceil(n * 0.35), Math.ceil(n * 0.5)];
  const pts = [];
  rings.forEach((r, ri) => {
    const count = perRing[ri];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + ri * 0.5;
      pts.push({ tx: Math.cos(angle) * r, ty: Math.sin(angle) * r * 0.6 });
    }
  });
  // Fill any remainder with center cluster
  while (pts.length < n) {
    pts.push({ tx: (Math.random() - 0.5) * 40, ty: (Math.random() - 0.5) * 40 });
  }
  return pts.slice(0, n);
}

/**
 * Formation 4 — EDUCATION: Double helix / DNA spiral
 */
function formHelix(n, w, h) {
  return Array.from({ length: n }, (_, i) => {
    const t = (i / n) * Math.PI * 5;
    const strand = i % 2 === 0 ? 1 : -1;
    const amplitude = Math.min(w, h) * 0.22;
    return {
      tx: strand * Math.cos(t) * amplitude * 0.6,
      ty: (i / n - 0.5) * h * 0.7,
    };
  });
}

/**
 * Formation 5 — CONTACT: Tight vortex / convergence spiral
 */
function formVortex(n, w, h) {
  return Array.from({ length: n }, (_, i) => {
    const t = (i / n) * Math.PI * 7;
    const r = (1 - i / n) * Math.min(w, h) * 0.35;
    return {
      tx: Math.cos(t) * r,
      ty: Math.sin(t) * r * 0.55,
    };
  });
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────

/**
 * @fileoverview Scroll-driven neural network background.
 *
 * The node constellation morphs between 6 distinct geometric formations
 * (cloud → brain → grid → orbits → helix → vortex) in sync with the active
 * portfolio section. Each formation matches the section's mood and theme:
 *
 *  Prog  Section    Formation     Primary Hue
 *  0.00  Hero       Cloud         Emerald 160°
 *  0.17  About      Brain         Mint    172°
 *  0.33  Skills     Grid          Indigo  240°
 *  0.50  Projects   Orbital       Cyan    200°
 *  0.67  Education  Helix         Amber    45°
 *  0.83  Blogs      Vortex        Violet  280°
 *  1.00  Contact    Convergence   Emerald 160°
 */
export default function GsapScrollBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width  = (canvas.width  = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleResize = () => {
      width  = canvas.width  = window.innerWidth;
      height = canvas.height = window.innerHeight;
      // Recalculate formations on resize
      rebuildFormations();
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // ── STATE driven by GSAP ScrollTrigger scrub ──
    const state = {
      progress:     0,
      primaryHue:   160,
      secondaryHue: 250,
      laserSpeed:   1.0,
      formIdx:      0,   // active formation index (0-5)
      morphLerp:    0,   // 0 = previous formation, 1 = current formation
    };

    // ── PARTICLES ─────────────────────────────────
    const N = width < 768 ? 38 : 70;

    // Each particle has a current rendered position AND two formation target slots
    const particles = Array.from({ length: N }, () => ({
      x:       Math.random() * width,
      y:       Math.random() * height,
      // base drift velocity (very subtle ambient movement)
      vx:      (Math.random() - 0.5) * 0.3,
      vy:      (Math.random() - 0.5) * 0.3,
      radius:  Math.random() * 2.4 + 0.8,
      alpha:   Math.random() * 0.45 + 0.18,
      // formation targets (updated on morph transitions)
      fxFrom:  0,
      fyFrom:  0,
      fxTo:    0,
      fyTo:    0,
    }));

    // Laser beam streaks
    const laserCount = width < 768 ? 16 : 35;
    const lasers = Array.from({ length: laserCount }, () => ({
      x:         Math.random() * width,
      y:         Math.random() * height,
      length:    Math.random() * 110 + 45,
      speed:     Math.random() * 2.4 + 0.7,
      alpha:     Math.random() * 0.32 + 0.08,
      lineWidth: Math.random() * 1.5 + 0.3,
    }));

    // ── FORMATION BOOKKEEPING ─────────────────────
    // 6 section formations, one per section milestone
    const FORMATIONS = [formCloud, formBrain, formGrid, formOrbit, formHelix, formVortex];

    // Store the computed formation target positions (absolute from viewport center)
    let formationSets = [];

    function rebuildFormations() {
      formationSets = FORMATIONS.map((fn) => fn(N, width, height));
    }

    rebuildFormations();

    // Initialise particle formation slots to cloud (formation 0)
    let lastFormIdx = 0;
    applyFormation(0, 0);

    function applyFormation(fromIdx, toIdx) {
      const from = formationSets[Math.min(fromIdx, FORMATIONS.length - 1)];
      const to   = formationSets[Math.min(toIdx,   FORMATIONS.length - 1)];
      particles.forEach((pt, i) => {
        pt.fxFrom = from[i].tx + width  / 2;
        pt.fyFrom = from[i].ty + height / 2;
        pt.fxTo   = to[i].tx   + width  / 2;
        pt.fyTo   = to[i].ty   + height / 2;
      });
    }

    // ── SCROLL TRIGGER ────────────────────────────
    // Section milestones: each 1/6 of scroll corresponds to one section
    const SECTION_COUNT = 6;

    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start:   'top top',
      end:     'bottom bottom',
      scrub:   1.4,
      onUpdate(self) {
        const vel = Math.abs(self.getVelocity());

        // Map scroll progress to formation index (0-5)
        const rawIdx = self.progress * (SECTION_COUNT - 1);
        const newIdx = Math.floor(rawIdx);
        const frac   = rawIdx - newIdx; // 0..1 within current section

        // When formation index changes, swap From ↔ To targets
        if (newIdx !== lastFormIdx) {
          const prevIdx = lastFormIdx;
          lastFormIdx = newIdx;
          applyFormation(prevIdx, newIdx);
        }

        gsap.to(state, {
          progress:     self.progress,
          primaryHue:   160 + self.progress * 120,
          secondaryHue: 250 - self.progress * 90,
          laserSpeed:   1 + vel * 0.0018,
          morphLerp:    frac,
          duration:     0.5,
          overwrite:    'auto',
        });
      },
    });

    // ── DRAW LOOP ─────────────────────────────────
    let rafId;
    let time = 0;

    function draw() {
      time += 0.013;
      const p   = state.progress;
      const ml  = Math.min(Math.max(state.morphLerp, 0), 1); // clamp 0..1
      const h1  = state.primaryHue;
      const h2  = state.secondaryHue;

      ctx.clearRect(0, 0, width, height);

      // ── 1. AMBIENT ORBS ─────────────────────────
      const o1x = width  * 0.28 + Math.sin(time * 0.34) * 120 + p * width  * 0.2;
      const o1y = height * 0.28 + Math.cos(time * 0.27) * 80  + p * height * 0.22;
      const o1r = Math.min(width, height) * (0.38 + p * 0.12);
      const g1  = ctx.createRadialGradient(o1x, o1y, 0, o1x, o1y, o1r);
      g1.addColorStop(0,    `hsla(${h1}, 80%, 52%, 0.10)`);
      g1.addColorStop(0.45, `hsla(${h1 + 25}, 70%, 45%, 0.04)`);
      g1.addColorStop(1,    'rgba(0,0,0,0)');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, width, height);

      const o2x = width  * 0.72 - Math.cos(time * 0.41) * 140 - p * width  * 0.17;
      const o2y = height * 0.72 - Math.sin(time * 0.35) * 95  - p * height * 0.17;
      const o2r = Math.min(width, height) * 0.4;
      const g2  = ctx.createRadialGradient(o2x, o2y, 0, o2x, o2y, o2r);
      g2.addColorStop(0, `hsla(${h2}, 85%, 58%, 0.08)`);
      g2.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, width, height);

      // ── 2. CYBERSPACE GRID ───────────────────────
      ctx.save();
      ctx.translate(width / 2, height / 2);

      const spacing  = 65;
      const gridAlpha = 0.038 + p * 0.022;
      ctx.strokeStyle = `hsla(${h1}, 72%, 52%, ${gridAlpha})`;
      ctx.lineWidth   = 0.8;
      const yOff      = (time * 17 * state.laserSpeed) % spacing;

      for (let i = -20; i <= 20; i++) {
        const x = i * spacing;
        ctx.beginPath();
        ctx.moveTo(x, -height);
        ctx.lineTo(x * (1 + p * 0.25), height);
        ctx.stroke();
      }
      for (let y = -height / 2 + yOff; y < height / 2; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(-width, y);
        ctx.lineTo(width,  y);
        ctx.stroke();
      }
      ctx.restore();

      // ── 3. LASER BEAMS ───────────────────────────
      if (!isReducedMotion) {
        for (const l of lasers) {
          l.x += l.speed * state.laserSpeed * 1.5;
          if (l.x > width + l.length) {
            l.x = -l.length;
            l.y = Math.random() * height;
          }
          const lg = ctx.createLinearGradient(l.x - l.length, l.y, l.x, l.y);
          lg.addColorStop(0,   'rgba(0,0,0,0)');
          lg.addColorStop(0.5, `hsla(${h1}, 90%, 62%, ${l.alpha * 0.4})`);
          lg.addColorStop(1,   `hsla(${h1 + 15}, 100%, 72%, ${l.alpha})`);
          ctx.beginPath();
          ctx.moveTo(l.x - l.length, l.y);
          ctx.lineTo(l.x, l.y);
          ctx.strokeStyle = lg;
          ctx.lineWidth   = l.lineWidth;
          ctx.stroke();
        }
      }

      // ── 4. NEURAL NETWORK NODES ─────────────────
      // Use eased cubic interpolation for formation morphing
      // NOTE: smoothstep easing makes the morph feel organic, not mechanical
      const ease = ml * ml * (3 - 2 * ml);

      for (let i = 0; i < particles.length; i++) {
        const pt = particles[i];

        // Formation target position (lerped between from → to)
        const targetX = pt.fxFrom + (pt.fxTo - pt.fxFrom) * ease;
        const targetY = pt.fyFrom + (pt.fyTo - pt.fyFrom) * ease;

        // NOTE: Each particle drifts gently toward its formation target.
        // The attraction force (0.035) is soft enough for fluid, organic motion.
        if (!isReducedMotion) {
          pt.vx += (targetX - pt.x) * 0.035;
          pt.vy += (targetY - pt.y) * 0.035;

          // Dampen velocity for smooth deceleration (not rubber-band snapping)
          pt.vx *= 0.88;
          pt.vy *= 0.88;

          pt.x += pt.vx;
          pt.y += pt.vy;
        } else {
          // Reduced motion: jump directly to target
          pt.x = targetX;
          pt.y = targetY;
        }

        // Draw node glow
        const glow = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, pt.radius * 3.5);
        glow.addColorStop(0,   `hsla(${h1}, 85%, 68%, ${pt.alpha * 0.6})`);
        glow.addColorStop(0.5, `hsla(${h1}, 75%, 58%, ${pt.alpha * 0.25})`);
        glow.addColorStop(1,   'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.radius * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Draw solid node center
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${h1}, 85%, 70%, ${pt.alpha})`;
        ctx.fill();
      }

      // ── 5. NEURAL NETWORK EDGES (strings) ────────
      // NOTE: Connection threshold adapts per formation:
      //  - tight formations (grid, helix) use a shorter threshold for clean look
      //  - spread formations (cloud, orbit) use a longer threshold for rich web
      const connectionThresh = 140 + Math.sin(p * Math.PI) * 60;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x;
          const dy   = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionThresh) {
            const strength = 1 - dist / connectionThresh;
            // Strings glow brighter as nodes get closer together
            const lineAlpha = strength * strength * 0.22;

            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `hsla(${h1}, 75%, 60%, ${lineAlpha})`;
            ctx.lineWidth   = strength * 1.2;
            ctx.stroke();
          }
        }
      }

      rafId = requestAnimationFrame(draw);
    }

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
