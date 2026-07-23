import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── SECTION PALETTE (hue per section) ────────────────────────────────────────
const PALETTES = [158, 172, 240, 200, 44, 280, 158];

// ─── CODE SYMBOL DEFINITIONS ──────────────────────────────────────────────────
// Each symbol belongs to a section (0-6). When the user is in that section,
// those symbols brighten to full prominence. Others dim to ghost opacity.
//
// NOTE: Sizes intentionally varied so the canvas looks layered and deep,
// not like a flat, uniform typography grid.
const SYMBOL_DEFS = [
  // ── Universal / Hero (section 0) ──
  { text: '</>',       sec: 0, size: 28, weight: '700' },
  { text: '⚛',         sec: 0, size: 32, weight: '400' },   // React atom
  { text: '{ }',       sec: 0, size: 22, weight: '600' },
  { text: '=>',        sec: 0, size: 20, weight: '700' },
  { text: '[ ]',       sec: 0, size: 18, weight: '500' },
  { text: '<div>',     sec: 0, size: 14, weight: '400' },
  { text: '</div>',    sec: 0, size: 13, weight: '400' },
  { text: 'const',     sec: 0, size: 15, weight: '600' },
  { text: 'return()',  sec: 0, size: 14, weight: '500' },
  { text: '#root',     sec: 0, size: 13, weight: '400' },
  { text: '<!DOCTYPE>',sec: 0, size: 12, weight: '400' },
  { text: '//',        sec: 0, size: 18, weight: '400' },
  { text: '< >',       sec: 0, size: 16, weight: '600' },

  // ── About (section 1) ──
  { text: 'const me =',  sec: 1, size: 14, weight: '500' },
  { text: '{ dev }',     sec: 1, size: 16, weight: '600' },
  { text: 'skills: []',  sec: 1, size: 13, weight: '500' },
  { text: '"India"',     sec: 1, size: 14, weight: '400' },
  { text: 'role:',       sec: 1, size: 15, weight: '500' },
  { text: '<React/>',    sec: 1, size: 16, weight: '600' },
  { text: 'export me',   sec: 1, size: 13, weight: '500' },
  { text: '0x👨‍💻',       sec: 1, size: 18, weight: '400' },

  // ── Skills (section 2) ──
  { text: 'React.js',   sec: 2, size: 17, weight: '600' },
  { text: 'CSS3',       sec: 2, size: 18, weight: '700' },
  { text: 'npm run',    sec: 2, size: 14, weight: '500' },
  { text: '.tsx',       sec: 2, size: 16, weight: '600' },
  { text: 'vite ⚡',    sec: 2, size: 15, weight: '500' },
  { text: 'tailwind',   sec: 2, size: 15, weight: '500' },
  { text: 'git init',   sec: 2, size: 13, weight: '400' },
  { text: 'tsconfig',   sec: 2, size: 12, weight: '400' },
  { text: '<HTML5/>',   sec: 2, size: 14, weight: '500' },
  { text: '@import',    sec: 2, size: 13, weight: '400' },

  // ── Projects (section 3) ──
  { text: 'useState()',   sec: 3, size: 16, weight: '600' },
  { text: 'useEffect()',  sec: 3, size: 15, weight: '600' },
  { text: 'async/await',  sec: 3, size: 14, weight: '500' },
  { text: 'git push',     sec: 3, size: 14, weight: '500' },
  { text: '<Router/>',    sec: 3, size: 15, weight: '600' },
  { text: 'fetch(api)',   sec: 3, size: 14, weight: '500' },
  { text: 'deploy 🚀',   sec: 3, size: 16, weight: '500' },
  { text: 'firebase',     sec: 3, size: 13, weight: '400' },
  { text: 'Props{}',      sec: 3, size: 14, weight: '500' },

  // ── Education (section 4) ──
  { text: 'class BCA',    sec: 4, size: 16, weight: '600' },
  { text: 'extends Dev',  sec: 4, size: 14, weight: '500' },
  { text: 'new Learn()',  sec: 4, size: 14, weight: '500' },
  { text: '++skills',     sec: 4, size: 16, weight: '600' },
  { text: 'graduate()',   sec: 4, size: 14, weight: '500' },
  { text: '9.09 GPA',     sec: 4, size: 15, weight: '600' },
  { text: 'commit -m',    sec: 4, size: 12, weight: '400' },

  // ── Blogs (section 5) ──
  { text: '<Blog/>',    sec: 5, size: 18, weight: '600' },
  { text: 'write()',    sec: 5, size: 16, weight: '500' },
  { text: '{title}',    sec: 5, size: 14, weight: '500' },
  { text: '.md',        sec: 5, size: 20, weight: '700' },
  { text: 'publish()',  sec: 5, size: 15, weight: '500' },
  { text: '# Article', sec: 5, size: 13, weight: '400' },
  { text: '{tags:[]}',  sec: 5, size: 13, weight: '400' },

  // ── Contact (section 6) ──
  { text: 'POST /',      sec: 6, size: 16, weight: '600' },
  { text: '200 OK ✓',   sec: 6, size: 15, weight: '600' },
  { text: 'hire(me)',    sec: 6, size: 18, weight: '700' },
  { text: 'connect()',   sec: 6, size: 15, weight: '500' },
  { text: '<Form/>',     sec: 6, size: 16, weight: '600' },
  { text: 'email.send',  sec: 6, size: 13, weight: '400' },
  { text: '{ open: true}', sec: 6, size: 12, weight: '400' },
];

// ─── COMPONENT ─────────────────────────────────────────────────────────────────
/**
 * @fileoverview Floating frontend code symbols background.
 *
 * Renders a field of drifting, glowing dev/frontend symbols (</>, ⚛, useState, etc.)
 * on an HTML5 canvas. GSAP ScrollTrigger drives:
 *   1. Which section's symbols are prominent (bright vs ghost opacity).
 *   2. The ambient glow orb hue — shifts per section mood palette.
 *   3. An orthogonal PCB circuit grid in the deep background.
 *
 * The overall effect: stepping into a living codebase as you scroll.
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
      placeSymbols();
    };
    window.addEventListener('resize', onResize, { passive: true });

    // ── SCROLL STATE ──────────────────────────────────────
    const state = {
      activeSec:  0,
      hue:        158,
      laserSpd:   1.0,
    };

    // ── SYMBOL INSTANCES ──────────────────────────────────
    // Each definition becomes one or two drifting instances on the canvas,
    // randomly placed across the viewport with drift velocities.
    let symbols = [];

    function placeSymbols() {
      symbols = SYMBOL_DEFS.map((def) => ({
        ...def,
        x:       Math.random() * W,
        y:       Math.random() * H,
        // NOTE: Very slow drift (max 0.35px/frame) so symbols are readable,
        // not racing across the screen like a screensaver.
        vx:      (Math.random() - 0.5) * 0.35,
        vy:      (Math.random() - 0.5) * 0.25,
        // Subtle rotation oscillation — adds life without distraction
        angle:     Math.random() * 0.3 - 0.15,
        rotSpd:    (Math.random() - 0.5) * 0.0008,
        // Current rendered alpha (GSAP tweens this)
        alpha:     0.06,
        // Target alpha driven by which section is active
        targetAlpha: 0.06,
        // Gentle size pulse (0.9 ↔ 1.1)
        scale:     1,
        scaleDir:  Math.random() > 0.5 ? 1 : -1,
        scaleSpd:  0.0004 + Math.random() * 0.0004,
      }));
    }
    placeSymbols();

    // ── GSAP SCROLL TRIGGER ───────────────────────────────
    const SECTION_COUNT = 7;

    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start:   'top top',
      end:     'bottom bottom',
      scrub:   1.2,
      onUpdate(self) {
        const vel    = Math.abs(self.getVelocity());
        const rawIdx = self.progress * (SECTION_COUNT - 1);
        const newSec = Math.min(Math.round(rawIdx), SECTION_COUNT - 1);

        gsap.to(state, {
          activeSec: newSec,
          hue:       PALETTES[newSec] ?? 158,
          laserSpd:  1 + vel * 0.0014,
          duration:  0.5,
          overwrite: 'auto',
        });

        // NOTE: Tween target alphas for all symbols — active section goes bright,
        // everything else dims to a very subtle ghost level.
        symbols.forEach((sym) => {
          sym.targetAlpha = sym.sec === newSec
            ? 0.55 + Math.random() * 0.25   // bright: 0.55–0.80
            : sym.sec === 0
              ? 0.08                          // universal symbols always slightly visible
              : 0.04;                         // others: nearly invisible ghost
        });
      },
    });

    // ── DRAW LOOP ─────────────────────────────────────────
    let rafId;
    let t = 0;
    const GRID_GAP = 72;

    function draw() {
      t += 0.01;
      const h = state.hue;
      const p = Math.min(Math.max(state.activeSec / (SECTION_COUNT - 1), 0), 1);

      ctx.clearRect(0, 0, W, H);

      // ── 1. AMBIENT GLOW ORBS ───────────────────────────
      const o1x = W * 0.25 + Math.sin(t * 0.28) * 100;
      const o1y = H * 0.28 + Math.cos(t * 0.22) * 70;
      const o1r = Math.min(W, H) * 0.42;
      const g1  = ctx.createRadialGradient(o1x, o1y, 0, o1x, o1y, o1r);
      g1.addColorStop(0,    `hsla(${h}, 80%, 50%, 0.09)`);
      g1.addColorStop(0.5,  `hsla(${h + 20}, 70%, 44%, 0.03)`);
      g1.addColorStop(1,    'rgba(0,0,0,0)');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, W, H);

      const o2x = W * 0.78 - Math.cos(t * 0.32) * 110;
      const o2y = H * 0.72 - Math.sin(t * 0.27) * 80;
      const o2r = Math.min(W, H) * 0.36;
      const g2  = ctx.createRadialGradient(o2x, o2y, 0, o2x, o2y, o2r);
      g2.addColorStop(0, `hsla(${h + 35}, 85%, 55%, 0.07)`);
      g2.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, W, H);

      // ── 2. ORTHOGONAL CIRCUIT GRID ─────────────────────
      // NOTE: Strictly H+V lines — no perspective warp — PCB board feel.
      const gridAlpha = 0.025 + p * 0.012;
      ctx.strokeStyle = `hsla(${h}, 60%, 50%, ${gridAlpha})`;
      ctx.lineWidth   = 0.6;

      const xOff = (t * 12 * state.laserSpd) % GRID_GAP;
      const yOff = (t * 8  * state.laserSpd) % GRID_GAP;

      for (let x = xOff; x < W + GRID_GAP; x += GRID_GAP) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = yOff; y < H + GRID_GAP; y += GRID_GAP) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      // ── 3. FLOATING CODE SYMBOLS ───────────────────────
      ctx.textBaseline = 'middle';
      ctx.textAlign    = 'center';

      for (const sym of symbols) {
        // Smooth alpha lerp toward target
        // NOTE: 0.06 lerp coefficient — smooth enough to animate per-frame
        // without snapping on fast section changes.
        sym.alpha += (sym.targetAlpha - sym.alpha) * 0.06;

        if (sym.alpha < 0.012) {
          // Too faint to draw — still update position for continuity
          if (!isRM) {
            sym.x = (sym.x + sym.vx + W) % W;
            sym.y = (sym.y + sym.vy + H) % H;
          }
          continue;
        }

        // Drift
        if (!isRM) {
          sym.x = (sym.x + sym.vx + W) % W;
          sym.y = (sym.y + sym.vy + H) % H;
          sym.angle  += sym.rotSpd;
          // Gentle breathing scale (0.88 ↔ 1.12)
          sym.scale  += sym.scaleDir * sym.scaleSpd;
          if (sym.scale > 1.12 || sym.scale < 0.88) sym.scaleDir *= -1;
        }

        const effectiveSize = sym.size * sym.scale;
        ctx.font = `${sym.weight} ${effectiveSize}px 'Fira Code', monospace`;

        ctx.save();
        ctx.translate(sym.x, sym.y);
        ctx.rotate(sym.angle);

        // Neon text glow — the stronger the alpha, the brighter the glow
        const glowStrength = sym.alpha * 14;
        ctx.shadowBlur  = glowStrength;
        ctx.shadowColor = `hsla(${h}, 90%, 65%, ${sym.alpha * 0.9})`;

        // Primary text fill
        ctx.fillStyle = `hsla(${h}, 85%, 72%, ${sym.alpha})`;
        ctx.fillText(sym.text, 0, 0);

        // Second brighter pass for core luminance on active symbols
        if (sym.alpha > 0.35) {
          ctx.shadowBlur  = glowStrength * 1.8;
          ctx.shadowColor = `hsla(${h}, 100%, 80%, ${sym.alpha * 0.5})`;
          ctx.fillStyle   = `hsla(${h}, 100%, 88%, ${sym.alpha * 0.4})`;
          ctx.fillText(sym.text, 0, 0);
        }

        ctx.shadowBlur = 0;
        ctx.restore();
      }

      rafId = requestAnimationFrame(draw);
    }

    // NOTE: Initialise all universal (sec 0) symbols at low visible alpha
    // so the Hero section looks immediately alive on first load.
    symbols.forEach((sym) => {
      sym.alpha       = sym.sec === 0 ? 0.08 : 0.02;
      sym.targetAlpha = sym.sec === 0 ? 0.55 : 0.04;
    });

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
