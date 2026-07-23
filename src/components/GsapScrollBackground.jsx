import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── SECTION HUE PALETTE ──────────────────────────────────────────────────────
const PALETTES = [158, 172, 240, 200, 44, 280, 158];

// ─── SYMBOL SHAPE BUILDERS ────────────────────────────────────────────────────
// Each builder returns { nodes: [{lx, ly}], edges: [[i, j]] }
// lx/ly are local coordinates (pixels) centered at symbol origin.
// Symbols are purposely simple — 4-12 nodes max — so they read as iconic
// glyphs, not as noise.

/**
 * </> — The JSX closing tag. Three strokes: < / >
 * Left bracket, forward slash, right bracket.
 */
function buildJSX(s) {
  const nodes = [
    // < : top-right → apex-left → bottom-right
    { lx: -s * 1.8, ly: -s * 0.9 },
    { lx: -s * 2.6, ly:  0       },
    { lx: -s * 1.8, ly:  s * 0.9 },
    // / : bottom-left → top-right
    { lx: -s * 0.5, ly:  s * 0.9 },
    { lx:  s * 0.5, ly: -s * 0.9 },
    // > : top-left → apex-right → bottom-left
    { lx:  s * 1.8, ly: -s * 0.9 },
    { lx:  s * 2.6, ly:  0       },
    { lx:  s * 1.8, ly:  s * 0.9 },
  ];
  const edges = [[0, 1], [1, 2], [3, 4], [5, 6], [6, 7]];
  return { nodes, edges };
}

/**
 * ⚛ React Atom — nucleus node + three tilted elliptical orbital rings.
 * Each ring has 7 nodes; the three rings are rotated 0°, 60°, 120°.
 */
function buildReactAtom(s) {
  const nodes = [{ lx: 0, ly: 0 }]; // nucleus
  const edges = [];
  const PER_RING = 7;
  const A = s * 2.2; // semi-major axis
  const B = s * 0.8; // semi-minor axis

  [0, Math.PI / 3, (2 * Math.PI) / 3].forEach((rot) => {
    const start = nodes.length;
    for (let i = 0; i < PER_RING; i++) {
      const angle = (i / PER_RING) * Math.PI * 2;
      const ex = Math.cos(angle) * A;
      const ey = Math.sin(angle) * B;
      nodes.push({
        lx: ex * Math.cos(rot) - ey * Math.sin(rot),
        ly: ex * Math.sin(rot) + ey * Math.cos(rot),
      });
    }
    // NOTE: Connect ring nodes in a closed loop
    for (let i = 0; i < PER_RING; i++) {
      edges.push([start + i, start + (i + 1) % PER_RING]);
    }
  });

  return { nodes, edges };
}

/**
 * { } — Curly braces. Two mirrored S-curves facing each other.
 * Represents JS objects, blocks, and JSX expressions.
 */
function buildCurly(s) {
  const nodes = [
    // { left brace (7 points)
    { lx: -s * 0.6, ly: -s * 1.4 },
    { lx: -s * 1.2, ly: -s * 1.1 },
    { lx: -s * 1.2, ly: -s * 0.3 },
    { lx: -s * 1.8, ly:  0       }, // middle spike
    { lx: -s * 1.2, ly:  s * 0.3 },
    { lx: -s * 1.2, ly:  s * 1.1 },
    { lx: -s * 0.6, ly:  s * 1.4 },
    // } right brace (7 points, mirrored)
    { lx:  s * 0.6, ly: -s * 1.4 },
    { lx:  s * 1.2, ly: -s * 1.1 },
    { lx:  s * 1.2, ly: -s * 0.3 },
    { lx:  s * 1.8, ly:  0       }, // middle spike
    { lx:  s * 1.2, ly:  s * 0.3 },
    { lx:  s * 1.2, ly:  s * 1.1 },
    { lx:  s * 0.6, ly:  s * 1.4 },
  ];
  const edges = [
    [0,1],[1,2],[2,3],[3,4],[4,5],[5,6],
    [7,8],[8,9],[9,10],[10,11],[11,12],[12,13],
  ];
  return { nodes, edges };
}

/**
 * => — Arrow function. The most iconic ES6 symbol.
 * Two horizontal bars (=) plus a right-facing chevron (>).
 */
function buildArrow(s) {
  const nodes = [
    // = top bar
    { lx: -s * 1.6, ly: -s * 0.5 },
    { lx: -s * 0.4, ly: -s * 0.5 },
    // = bottom bar
    { lx: -s * 1.6, ly:  s * 0.5 },
    { lx: -s * 0.4, ly:  s * 0.5 },
    // > chevron: top → tip → bottom
    { lx:  s * 0.1, ly: -s * 1.0 },
    { lx:  s * 1.6, ly:  0       },
    { lx:  s * 0.1, ly:  s * 1.0 },
  ];
  const edges = [[0, 1], [2, 3], [4, 5], [5, 6]];
  return { nodes, edges };
}

/**
 * < > — HTML/JSX open and close angle brackets.
 * Two separate chevrons facing away from each other.
 */
function buildAngle(s) {
  const nodes = [
    // < left
    { lx: -s * 2.2, ly: -s * 1.0 },
    { lx: -s * 3.2, ly:  0       },
    { lx: -s * 2.2, ly:  s * 1.0 },
    // > right
    { lx:  s * 2.2, ly: -s * 1.0 },
    { lx:  s * 3.2, ly:  0       },
    { lx:  s * 2.2, ly:  s * 1.0 },
  ];
  const edges = [[0, 1], [1, 2], [3, 4], [4, 5]];
  return { nodes, edges };
}

/**
 * [ ] — Square brackets. Array literals, destructuring, selectors.
 * Two L-shapes mirrored horizontally.
 */
function buildSquare(s) {
  const nodes = [
    // [
    { lx: -s * 1.0, ly: -s * 1.2 },
    { lx: -s * 1.8, ly: -s * 1.2 },
    { lx: -s * 1.8, ly:  s * 1.2 },
    { lx: -s * 1.0, ly:  s * 1.2 },
    // ]
    { lx:  s * 1.0, ly: -s * 1.2 },
    { lx:  s * 1.8, ly: -s * 1.2 },
    { lx:  s * 1.8, ly:  s * 1.2 },
    { lx:  s * 1.0, ly:  s * 1.2 },
  ];
  const edges = [[0,1],[1,2],[2,3],[4,5],[5,6],[6,7]];
  return { nodes, edges };
}

/**
 * // — Double forward slash. Code comment marker.
 * Two parallel diagonal lines.
 */
function buildComment(s) {
  const nodes = [
    { lx: -s * 1.2, ly:  s * 1.2 },
    { lx: -s * 0.4, ly: -s * 1.2 },
    { lx:  s * 0.4, ly:  s * 1.2 },
    { lx:  s * 1.2, ly: -s * 1.2 },
  ];
  const edges = [[0, 1], [2, 3]];
  return { nodes, edges };
}

/**
 * ( ) — Function call parentheses.
 * Two arc curves facing each other, built from arc point samples.
 */
function buildParens(s) {
  const nodes = [];
  const edges = [];
  const PTS = 6;

  // Left ( — arc opening to the right
  let start = 0;
  for (let i = 0; i < PTS; i++) {
    const t = i / (PTS - 1);
    const angle = Math.PI * 0.55 + t * Math.PI * 0.9;
    nodes.push({
      lx: -s * 0.5 + Math.cos(angle) * s * 1.2,
      ly: (t - 0.5) * s * 2.4,
    });
  }
  for (let i = 0; i < PTS - 1; i++) edges.push([start + i, start + i + 1]);

  // Right ) — mirrored
  start = PTS;
  for (let i = 0; i < PTS; i++) {
    const t = i / (PTS - 1);
    const angle = Math.PI * 0.55 + t * Math.PI * 0.9;
    nodes.push({
      lx: s * 0.5 - Math.cos(angle) * s * 1.2,
      ly: (t - 0.5) * s * 2.4,
    });
  }
  for (let i = 0; i < PTS - 1; i++) edges.push([start + i, start + i + 1]);

  return { nodes, edges };
}

/**
 * # — CSS hash / ID selector / markdown heading marker.
 * Two horizontal bars crossed by two vertical bars.
 */
function buildHash(s) {
  const nodes = [
    // Vertical bar left
    { lx: -s * 0.8, ly: -s * 1.4 },
    { lx: -s * 0.8, ly:  s * 1.4 },
    // Vertical bar right
    { lx:  s * 0.8, ly: -s * 1.4 },
    { lx:  s * 0.8, ly:  s * 1.4 },
    // Horizontal bar top
    { lx: -s * 1.4, ly: -s * 0.5 },
    { lx:  s * 1.4, ly: -s * 0.5 },
    // Horizontal bar bottom
    { lx: -s * 1.4, ly:  s * 0.5 },
    { lx:  s * 1.4, ly:  s * 0.5 },
  ];
  const edges = [[0,1],[2,3],[4,5],[6,7]];
  return { nodes, edges };
}

// ─── SYMBOL CATALOGUE ─────────────────────────────────────────────────────────
// Defines which symbol types to scatter on the canvas and how many instances.
// Scale values intentionally varied so large + small versions coexist for depth.
const SYMBOL_CATALOGUE = [
  { build: buildJSX,       count: 4, scales: [18, 14, 22, 12] },
  { build: buildReactAtom, count: 3, scales: [10, 8, 12]       },
  { build: buildCurly,     count: 3, scales: [10, 14, 8]       },
  { build: buildArrow,     count: 3, scales: [14, 10, 16]      },
  { build: buildAngle,     count: 3, scales: [8, 12, 10]       },
  { build: buildSquare,    count: 3, scales: [10, 14, 8]       },
  { build: buildComment,   count: 2, scales: [14, 10]          },
  { build: buildParens,    count: 3, scales: [10, 14, 8]       },
  { build: buildHash,      count: 2, scales: [10, 8]           },
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────
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
    };
    window.addEventListener('resize', onResize, { passive: true });

    // ── SCROLL STATE ──────────────────────────────────────
    const state = { hue: 158, speedMult: 1.0 };

    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end:   'bottom bottom',
      scrub: 1.0,
      onUpdate(self) {
        const vel = Math.abs(self.getVelocity());
        const sec = Math.min(Math.round(self.progress * 6), 6);
        gsap.to(state, {
          hue:       PALETTES[sec] ?? 158,
          // NOTE: Scroll velocity temporarily boosts symbol drift speed —
          // fast scrolling visually scatters symbols, slow scrolling = gentle float.
          speedMult: 1 + vel * 0.0022,
          duration:  0.4,
          overwrite: 'auto',
        });
      },
    });

    // ── BUILD SYMBOL INSTANCES ────────────────────────────
    // Each instance is a rigid-body symbol: a set of world-space nodes
    // that move together as one unit.
    const instances = [];

    SYMBOL_CATALOGUE.forEach(({ build, count, scales }) => {
      for (let i = 0; i < count; i++) {
        const scale = scales[i] ?? scales[0];
        const shape = build(scale);

        instances.push({
          // Anchor position on canvas (center of symbol)
          cx:  Math.random() * W,
          cy:  Math.random() * H,
          // Drift velocity — kept intentionally slow for legibility
          vx:  (Math.random() - 0.5) * 0.45,
          vy:  (Math.random() - 0.5) * 0.32,
          // Slow rotation for organic feel
          rot:    Math.random() * Math.PI * 2,
          rotSpd: (Math.random() - 0.5) * 0.004,
          // Opacity fades in from 0
          alpha: 0,
          // Cached world-space node positions (recomputed each frame)
          worldNodes: shape.nodes.map(() => ({ x: 0, y: 0 })),
          shape,
        });
      }
    });

    // Fade all instances in staggered
    instances.forEach((inst, i) => {
      gsap.to(inst, {
        alpha: 0.55 + Math.random() * 0.3,
        duration: 1.2 + Math.random() * 1.0,
        delay: i * 0.08,
        ease: 'power2.out',
      });
    });

    // ── DRAW LOOP ─────────────────────────────────────────
    let rafId;
    let t = 0;
    const CROSS_THRESH = 90; // px — max distance for cross-symbol neural edges

    function draw() {
      t += 0.01;
      const h = state.hue;
      const sp = state.speedMult;

      ctx.clearRect(0, 0, W, H);

      // ── 1. AMBIENT GLOW ORBS ────────────────────────────
      const o1x = W * 0.3 + Math.sin(t * 0.25) * 120;
      const o1y = H * 0.3 + Math.cos(t * 0.20) * 80;
      const o1r = Math.min(W, H) * 0.45;
      const g1  = ctx.createRadialGradient(o1x, o1y, 0, o1x, o1y, o1r);
      g1.addColorStop(0,   `hsla(${h}, 80%, 50%, 0.08)`);
      g1.addColorStop(0.5, `hsla(${h + 25}, 70%, 44%, 0.03)`);
      g1.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, W, H);

      const o2x = W * 0.72 - Math.cos(t * 0.30) * 100;
      const o2y = H * 0.70 - Math.sin(t * 0.24) * 70;
      const o2r = Math.min(W, H) * 0.38;
      const g2  = ctx.createRadialGradient(o2x, o2y, 0, o2x, o2y, o2r);
      g2.addColorStop(0, `hsla(${h + 40}, 85%, 55%, 0.06)`);
      g2.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, W, H);

      // ── 2. UPDATE SYMBOL INSTANCES ──────────────────────
      for (const inst of instances) {
        if (!isRM) {
          inst.cx  += inst.vx * sp;
          inst.cy  += inst.vy * sp;
          inst.rot += inst.rotSpd;

          // NOTE: Wrap around canvas edges so symbols re-enter from the opposite side,
          // giving the impression of an infinite floating field.
          const pad = 120;
          if (inst.cx < -pad) inst.cx = W + pad;
          if (inst.cx > W + pad) inst.cx = -pad;
          if (inst.cy < -pad) inst.cy = H + pad;
          if (inst.cy > H + pad) inst.cy = -pad;
        }

        // Compute world-space node positions (apply rotation + translation)
        const cos = Math.cos(inst.rot);
        const sin = Math.sin(inst.rot);
        inst.shape.nodes.forEach((n, ni) => {
          inst.worldNodes[ni].x = inst.cx + n.lx * cos - n.ly * sin;
          inst.worldNodes[ni].y = inst.cy + n.lx * sin + n.ly * cos;
        });
      }

      // ── 3. CROSS-SYMBOL NEURAL NETWORK EDGES ────────────
      // Draw faint edges between nodes of DIFFERENT symbols that wander close.
      // This creates the "neural web" connecting symbols as they drift near each other.
      // NOTE: Only iterate when instances are within a coarse bounding-box range
      // to keep the O(n²) cost manageable.
      for (let a = 0; a < instances.length; a++) {
        for (let b = a + 1; b < instances.length; b++) {
          const ia = instances[a];
          const ib = instances[b];
          // Coarse check: skip if anchors are too far apart
          const dCX = ia.cx - ib.cx;
          const dCY = ia.cy - ib.cy;
          if (Math.sqrt(dCX * dCX + dCY * dCY) > CROSS_THRESH * 3) continue;

          for (const na of ia.worldNodes) {
            for (const nb of ib.worldNodes) {
              const dx   = na.x - nb.x;
              const dy   = na.y - nb.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < CROSS_THRESH) {
                const str = 1 - dist / CROSS_THRESH;
                ctx.beginPath();
                ctx.moveTo(na.x, na.y);
                ctx.lineTo(nb.x, nb.y);
                ctx.strokeStyle = `hsla(${h}, 70%, 60%, ${str * str * 0.18})`;
                ctx.lineWidth   = str * 0.9;
                ctx.stroke();
              }
            }
          }
        }
      }

      // ── 4. INTRA-SYMBOL EDGES (the symbol skeleton) ─────
      for (const inst of instances) {
        const { worldNodes, shape, alpha } = inst;

        ctx.lineWidth = 1.4;
        for (const [i, j] of shape.edges) {
          const na = worldNodes[i];
          const nb = worldNodes[j];
          if (!na || !nb) continue;

          // Brighter stroke for the symbol's own skeleton edges
          ctx.beginPath();
          ctx.moveTo(na.x, na.y);
          ctx.lineTo(nb.x, nb.y);
          ctx.strokeStyle = `hsla(${h}, 85%, 65%, ${alpha * 0.75})`;

          // NOTE: Glow pass — draw a wider semi-transparent version first
          // to simulate neon tube lighting along the symbol strokes.
          ctx.lineWidth   = 3.5;
          ctx.shadowBlur  = 10;
          ctx.shadowColor = `hsla(${h}, 90%, 60%, ${alpha * 0.4})`;
          ctx.stroke();

          // Sharp core line on top
          ctx.lineWidth  = 1.2;
          ctx.shadowBlur = 0;
          ctx.strokeStyle = `hsla(${h}, 95%, 80%, ${alpha * 0.9})`;
          ctx.stroke();
        }

        // ── 5. SYMBOL NODES (junction dots) ───────────────
        for (const n of worldNodes) {
          // Outer glow
          const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 6);
          glow.addColorStop(0,   `hsla(${h}, 90%, 70%, ${alpha * 0.55})`);
          glow.addColorStop(0.5, `hsla(${h}, 80%, 60%, ${alpha * 0.18})`);
          glow.addColorStop(1,   'rgba(0,0,0,0)');
          ctx.beginPath();
          ctx.arc(n.x, n.y, 6, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();

          // Solid bright core dot
          ctx.beginPath();
          ctx.arc(n.x, n.y, 1.8, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${h}, 100%, 85%, ${alpha})`;
          ctx.fill();
        }
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
