import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Section accent hues — shift the particle tint as user scrolls
const SECTION_HUES = [158, 172, 240, 200, 44, 280, 158];

/**
 * @fileoverview Professional minimal particle constellation background.
 *
 * Renders a field of tiny, slowly drifting particles with thin edge connections.
 * This is the industry-standard approach for developer portfolio backgrounds:
 * visible enough to add depth, subtle enough to never compete with content.
 *
 * Features:
 *  - ~90 micro-particles (2px dots with soft glow)
 *  - Gradient connection lines that fade at both ends — elegant, not crude
 *  - 3 large ambient glow orbs that slowly shift position
 *  - Very faint orthogonal dot grid in the deep background
 *  - GSAP ScrollTrigger drives hue transitions between sections
 *  - Scroll velocity subtly increases particle speed (organic feel)
 */
export default function GsapScrollBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = (canvas.width  = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const isRM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const onResize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
      init();
    };
    window.addEventListener('resize', onResize, { passive: true });

    // ── GSAP-driven state ──────────────────────────────────
    const state = {
      hue:      158,
      velBoost: 0,  // 0 = idle, spikes on fast scroll then decays
    };

    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start:   'top top',
      end:     'bottom bottom',
      scrub:   1.0,
      onUpdate(self) {
        const vel = Math.abs(self.getVelocity());
        const sec = Math.min(Math.round(self.progress * 6), 6);
        gsap.to(state, {
          hue:      SECTION_HUES[sec],
          // NOTE: velBoost fades quickly — just a momentary speed nudge on fast scroll
          velBoost: Math.min(vel * 0.0008, 1.2),
          duration: 0.6,
          overwrite: 'auto',
        });
      },
    });

    // ── PARTICLES ──────────────────────────────────────────
    // Count scales with screen area so density is consistent on all viewports
    const COUNT = Math.min(Math.floor((W * H) / 14000), 110);
    let particles = [];

    function init() {
      particles = Array.from({ length: COUNT }, () => ({
        x:  Math.random() * W,
        y:  Math.random() * H,
        // NOTE: Very slow base speed — professional backgrounds barely move.
        // Typical range: 0.08–0.28 px/frame before boost.
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.20,
        // Size variation: most particles are tiny, a few slightly larger
        r:  Math.random() < 0.15 ? 2.2 : Math.random() * 1.0 + 0.8,
        // Opacity variation adds visual depth layering
        a:  Math.random() * 0.35 + 0.12,
      }));
    }
    init();

    // ── DRAW LOOP ──────────────────────────────────────────
    let rafId;
    let t = 0;
    // Connection distance — longer threshold = more elegant web of lines
    const CONNECT_DIST = Math.min(W, H) * 0.20;

    function draw() {
      t += 0.008;
      const h  = state.hue;
      const sp = 1 + state.velBoost;

      ctx.clearRect(0, 0, W, H);

      // ── 1. BACKGROUND GRADIENT ─────────────────────────
      // A very subtle radial at center to lift the midpoint slightly
      const bg = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) * 0.75);
      bg.addColorStop(0, `hsla(${h}, 30%, 6%, 1)`);
      bg.addColorStop(1, `hsla(${h}, 20%, 3%, 1)`);
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // ── 2. AMBIENT GLOW ORBS ───────────────────────────
      // Three large, soft, very low-opacity orbs that slowly drift.
      // They add colour depth without drawing attention.
      const orbs = [
        { x: W * 0.20 + Math.sin(t * 0.22) * 90,  y: H * 0.25 + Math.cos(t * 0.18) * 60,  r: Math.min(W,H) * 0.50, a: 0.07, dh: 0   },
        { x: W * 0.80 - Math.cos(t * 0.28) * 110, y: H * 0.70 - Math.sin(t * 0.22) * 70,  r: Math.min(W,H) * 0.44, a: 0.06, dh: 30  },
        { x: W * 0.50 + Math.sin(t * 0.15) * 60,  y: H * 0.50 + Math.cos(t * 0.12) * 40,  r: Math.min(W,H) * 0.38, a: 0.04, dh: -20 },
      ];

      for (const o of orbs) {
        const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        g.addColorStop(0,   `hsla(${h + o.dh}, 75%, 50%, ${o.a})`);
        g.addColorStop(0.5, `hsla(${h + o.dh}, 65%, 42%, ${o.a * 0.4})`);
        g.addColorStop(1,   'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      }

      // ── 3. DOT GRID (deep background texture) ─────────
      // A faint grid of tiny dots — like graph paper in the dark.
      // NOTE: Opacity is intentionally very low (0.018) — barely visible.
      const gapX = 55;
      const gapY = 55;
      ctx.fillStyle = `hsla(${h}, 60%, 60%, 0.018)`;
      for (let gx = gapX / 2; gx < W; gx += gapX) {
        for (let gy = gapY / 2; gy < H; gy += gapY) {
          ctx.beginPath();
          ctx.arc(gx, gy, 0.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ── 4. UPDATE PARTICLE POSITIONS ──────────────────
      for (const p of particles) {
        if (!isRM) {
          p.x += p.vx * sp;
          p.y += p.vy * sp;
          // Wrap at edges
          if (p.x < 0)  p.x = W;
          if (p.x > W)  p.x = 0;
          if (p.y < 0)  p.y = H;
          if (p.y > H)  p.y = 0;
        }
      }

      // ── 5. CONNECTION LINES ────────────────────────────
      // NOTE: Gradient lines fade to transparent at each endpoint — this gives
      // the professional "edge-dissolved" look rather than harsh fixed-colour lines.
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x;
          const dy   = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist > CONNECT_DIST) continue;

          // Strength falls off quadratically → thick/bright near, faint far
          const strength = (1 - dist / CONNECT_DIST) ** 2;
          const lineA    = strength * 0.18;

          const lg = ctx.createLinearGradient(
            particles[i].x, particles[i].y,
            particles[j].x, particles[j].y,
          );
          lg.addColorStop(0,   `hsla(${h}, 70%, 62%, 0)`);
          lg.addColorStop(0.3, `hsla(${h}, 75%, 65%, ${lineA})`);
          lg.addColorStop(0.7, `hsla(${h}, 75%, 65%, ${lineA})`);
          lg.addColorStop(1,   `hsla(${h}, 70%, 62%, 0)`);

          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = lg;
          ctx.lineWidth   = strength * 0.9;
          ctx.stroke();
        }
      }

      // ── 6. PARTICLES (nodes) ───────────────────────────
      for (const p of particles) {
        // Outer soft glow
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4.5);
        glow.addColorStop(0,   `hsla(${h}, 80%, 68%, ${p.a * 0.5})`);
        glow.addColorStop(0.4, `hsla(${h}, 70%, 58%, ${p.a * 0.15})`);
        glow.addColorStop(1,   'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4.5, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Sharp solid core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${h}, 85%, 78%, ${p.a})`;
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    }

    rafId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', onResize);
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
