import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── SECTION PALETTES ──────────────────────────────────────────────────────────
// Each palette drives the node/edge/glow colors per section
const PALETTES = [
  { h: 158, name: 'emerald' },   // Hero     — Emerald
  { h: 172, name: 'mint' },      // About    — Mint
  { h: 240, name: 'indigo' },    // Skills   — Indigo
  { h: 200, name: 'cyan' },      // Projects — Cyan
  { h: 44,  name: 'amber' },     // Education— Amber
  { h: 280, name: 'violet' },    // Blogs    — Violet
  { h: 158, name: 'emerald' },   // Contact  — Emerald
];

// ─── FORMATION GENERATORS ──────────────────────────────────────────────────────
// All formations are purposefully tech/dev themed.
// Positions are returned as { tx, ty } relative to viewport center.

/**
 * MESH NETWORK — Hero
 * Internet-style distributed mesh topology with min-distance separation.
 * Feels like a network infrastructure diagram.
 */
function formMesh(n, w, h) {
  const pts = [];
  const minDist = Math.min(w, h) * 0.09;
  let attempts = 0;
  while (pts.length < n && attempts < n * 30) {
    attempts++;
    const tx = (Math.random() - 0.5) * w * 0.88;
    const ty = (Math.random() - 0.5) * h * 0.80;
    const ok = pts.every(p => Math.hypot(p.tx - tx, p.ty - ty) > minDist);
    if (ok) pts.push({ tx, ty });
  }
  while (pts.length < n) {
    pts.push({ tx: (Math.random() - 0.5) * w * 0.5, ty: (Math.random() - 0.5) * h * 0.5 });
  }
  return pts;
}

/**
 * BINARY TREE — About
 * DOM/AST binary tree growing downward like a component tree.
 */
function formTree(n, w, h) {
  const pts = [];
  const maxDepth = Math.ceil(Math.log2(n + 1));
  let idx = 0;
  for (let d = 0; d <= maxDepth && idx < n; d++) {
    const count = Math.min(Math.pow(2, d), n - idx);
    const xSpread = w * 0.75 / Math.pow(1.6, d);
    const y = -h * 0.38 + d * (h * 0.75 / maxDepth);
    for (let i = 0; i < count; i++) {
      const xOff = count === 1 ? 0 : (i / (count - 1) - 0.5) * 2 * xSpread;
      pts.push({ tx: xOff, ty: y });
      idx++;
    }
  }
  return pts;
}

/**
 * CIRCUIT GRID — Skills
 * PCB circuit board: nodes sit precisely at grid junctions.
 * Connections follow orthogonal (H/V) traces like copper tracks.
 */
function formCircuit(n, w, h) {
  const cols = Math.ceil(Math.sqrt(n * (w / h)));
  const rows = Math.ceil(n / cols);
  const gx = Math.min(w * 0.78, 880) / (cols - 1 || 1);
  const gy = Math.min(h * 0.68, 520) / (rows - 1 || 1);
  return Array.from({ length: n }, (_, i) => ({
    tx: (i % cols) * gx - (cols - 1) * gx / 2,
    ty: Math.floor(i / cols) * gy - (rows - 1) * gy / 2,
  }));
}

/**
 * GIT GRAPH — Projects
 * Horizontal git commit graph with branching lanes.
 */
function formGitGraph(n, w, h) {
  const lanes  = [0, -1, 1, -2, 2];   // branch lane offsets
  const laneGap = Math.min(h * 0.16, 80);
  const colGap  = Math.min(w * 0.80, 900) / (n - 1 || 1);
  return Array.from({ length: n }, (_, i) => ({
    // NOTE: Each commit sits on a lane; some drift to adjacent lanes to show branching
    tx: i * colGap - (n - 1) * colGap / 2,
    ty: lanes[i % lanes.length] * laneGap,
  }));
}

/**
 * PIPELINE — Education
 * Linear processing pipeline with node clusters at each stage.
 */
function formPipeline(n, w, h) {
  const stages = 5;
  const perStage = Math.ceil(n / stages);
  const stageGap = Math.min(w * 0.75, 800) / (stages - 1);
  return Array.from({ length: n }, (_, i) => {
    const s  = Math.floor(i / perStage);
    const si = i % perStage;
    // Nodes in each stage cluster vertically
    const clusterCount = Math.min(perStage, n - s * perStage);
    const yOff = (si - (clusterCount - 1) / 2) * Math.min(h * 0.10, 55);
    return {
      tx: s * stageGap - (stages - 1) * stageGap / 2,
      ty: yOff,
    };
  });
}

/**
 * HEX GRID — Blogs
 * Honeycomb hexagonal grid — looks like a tech dashboard / data map.
 */
function formHexGrid(n, w, h) {
  const r = Math.min(w, h) * 0.09;
  const pts = [];
  const rings = Math.ceil(Math.sqrt(n / 3));
  const dirs  = [
    [1, 0], [0.5, 0.866], [-0.5, 0.866],
    [-1, 0], [-0.5, -0.866], [0.5, -0.866],
  ];
  pts.push({ tx: 0, ty: 0 });
  for (let ring = 1; ring <= rings && pts.length < n; ring++) {
    let cx = ring * r * 2 * dirs[4][0];
    let cy = ring * r * 2 * dirs[4][1];
    for (let side = 0; side < 6 && pts.length < n; side++) {
      for (let step = 0; step < ring && pts.length < n; step++) {
        pts.push({ tx: cx, ty: cy });
        cx += dirs[side][0] * r * 2;
        cy += dirs[side][1] * r * 1.75;
      }
    }
  }
  return pts.slice(0, n);
}

/**
 * RADIAL BURST — Contact
 * Signal transmission: nodes burst outward in concentric rings.
 * Looks like a WiFi/API broadcast diagram.
 */
function formRadial(n, w, h) {
  const rings = [0.08, 0.18, 0.30].map(f => Math.min(w, h) * f);
  const perRing = [1, Math.ceil(n * 0.28), Math.ceil(n * 0.72)];
  const pts = [];
  rings.forEach((r, ri) => {
    const cnt = perRing[ri];
    for (let i = 0; i < cnt && pts.length < n; i++) {
      const angle = (i / cnt) * Math.PI * 2 + ri * 0.3;
      pts.push({ tx: Math.cos(angle) * r, ty: Math.sin(angle) * r * 0.65 });
    }
  });
  while (pts.length < n) {
    pts.push({ tx: (Math.random() - 0.5) * 30, ty: (Math.random() - 0.5) * 30 });
  }
  return pts.slice(0, n);
}

const FORMATIONS = [formMesh, formTree, formCircuit, formGitGraph, formPipeline, formHexGrid, formRadial];
const SECTION_COUNT = FORMATIONS.length;

// ─── COMPONENT ─────────────────────────────────────────────────────────────────
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
      rebuildAll();
    };
    window.addEventListener('resize', onResize, { passive: true });

    // ── SCROLL STATE ──
    const state = {
      progress:  0,
      formIdx:   0,
      morphLerp: 0,
      hue:       158,
      laserSpd:  1.0,
    };

    // ── PARTICLES ──
    const N = W < 768 ? 40 : 72;
    const particles = Array.from({ length: N }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: 0, vy: 0,
      radius: Math.random() * 2 + 0.9,
      alpha:  Math.random() * 0.5 + 0.2,
      // Formation target slots
      fxFrom: 0, fyFrom: 0,
      fxTo: 0,   fyTo: 0,
      // Pulse state — triggered when a data packet arrives
      pulse: 0,
    }));

    // ── DATA PACKETS ──
    // Small bright dots that travel along active edges between particles
    const PACKET_COUNT = W < 768 ? 6 : 14;
    const packets = Array.from({ length: PACKET_COUNT }, () => ({
      active: false,
      fromIdx: 0, toIdx: 0,
      t: 0,          // 0..1 along the edge
      speed: 0.008,
    }));

    // Track which pairs are connected (rebuilt per-frame based on distance)
    let edges = [];

    function spawnPacket(p) {
      if (edges.length < 2) return;
      const edge = edges[Math.floor(Math.random() * edges.length)];
      p.fromIdx = edge[0];
      p.toIdx   = edge[1];
      p.t       = 0;
      p.speed   = 0.006 + Math.random() * 0.008;
      p.active  = true;
    }

    // ── CIRCUIT GRID LINES ──
    // Orthogonal H/V grid that acts like PCB traces (not diagonal)
    const GRID_GAP = 70;

    // ── FORMATIONS ──
    let formationSets = [];
    function rebuildAll() {
      formationSets = FORMATIONS.map(fn => fn(N, W, H));
    }
    rebuildAll();

    let lastFIdx = 0;
    function applyFormation(fromIdx, toIdx) {
      const from = formationSets[Math.min(fromIdx, FORMATIONS.length - 1)];
      const to   = formationSets[Math.min(toIdx,   FORMATIONS.length - 1)];
      particles.forEach((pt, i) => {
        pt.fxFrom = from[i].tx + W / 2;
        pt.fyFrom = from[i].ty + H / 2;
        pt.fxTo   = to[i].tx   + W / 2;
        pt.fyTo   = to[i].ty   + H / 2;
      });
    }
    // Init formation targets to mesh (index 0)
    applyFormation(0, 0);

    // ── SCROLL TRIGGER ──
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end:   'bottom bottom',
      scrub: 1.5,
      onUpdate(self) {
        const vel    = Math.abs(self.getVelocity());
        const rawIdx = self.progress * (SECTION_COUNT - 1);
        const newIdx = Math.min(Math.floor(rawIdx), SECTION_COUNT - 1);
        const frac   = rawIdx - newIdx;

        if (newIdx !== lastFIdx) {
          applyFormation(lastFIdx, newIdx);
          lastFIdx = newIdx;
        }

        gsap.to(state, {
          progress:  self.progress,
          morphLerp: frac,
          hue:       PALETTES[newIdx]?.h ?? 158,
          laserSpd:  1 + vel * 0.0016,
          duration:  0.55,
          overwrite: 'auto',
        });
      },
    });

    // ── DRAW LOOP ──
    let rafId;
    let t = 0;

    function draw() {
      t += 0.011;
      const p   = state.progress;
      const ml  = Math.max(0, Math.min(1, state.morphLerp));
      // NOTE: Smoothstep easing — makes formation morph feel weighted, not linear
      const ease = ml * ml * (3 - 2 * ml);
      const h    = state.hue;

      ctx.clearRect(0, 0, W, H);

      // ─ AMBIENT GLOW ORBS ─────────────────────────────────
      const o1x = W * 0.25 + Math.sin(t * 0.3) * 110 + p * W * 0.18;
      const o1y = H * 0.25 + Math.cos(t * 0.25) * 75;
      const o1r = Math.min(W, H) * (0.36 + p * 0.1);
      const g1  = ctx.createRadialGradient(o1x, o1y, 0, o1x, o1y, o1r);
      g1.addColorStop(0,    `hsla(${h}, 80%, 50%, 0.09)`);
      g1.addColorStop(0.5,  `hsla(${h + 20}, 70%, 44%, 0.03)`);
      g1.addColorStop(1,    'rgba(0,0,0,0)');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, W, H);

      const o2x = W * 0.75 - Math.cos(t * 0.38) * 130 - p * W * 0.15;
      const o2y = H * 0.75 - Math.sin(t * 0.32) * 85;
      const o2r = Math.min(W, H) * 0.38;
      const g2  = ctx.createRadialGradient(o2x, o2y, 0, o2x, o2y, o2r);
      g2.addColorStop(0, `hsla(${h + 40}, 85%, 56%, 0.06)`);
      g2.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, W, H);

      // ─ CIRCUIT BOARD GRID ────────────────────────────────
      // NOTE: This is an orthogonal H+V grid, not a diagonal one.
      // This gives a proper PCB / tech dashboard feel.
      const gridAlpha = 0.03 + p * 0.018;
      ctx.strokeStyle = `hsla(${h}, 65%, 50%, ${gridAlpha})`;
      ctx.lineWidth   = 0.7;

      const xOff = (t * 14 * state.laserSpd) % GRID_GAP;
      const yOff = (t * 9  * state.laserSpd) % GRID_GAP;

      // Vertical lines (scroll right)
      for (let x = -xOff; x < W + GRID_GAP; x += GRID_GAP) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      // Horizontal lines (scroll down)
      for (let y = -yOff; y < H + GRID_GAP; y += GRID_GAP) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      // ─ MOVE PARTICLES TOWARD FORMATION TARGETS ───────────
      for (let i = 0; i < particles.length; i++) {
        const pt = particles[i];
        const targetX = pt.fxFrom + (pt.fxTo - pt.fxFrom) * ease;
        const targetY = pt.fyFrom + (pt.fyTo - pt.fyFrom) * ease;

        if (!isRM) {
          // NOTE: Attraction spring (0.032) + damping (0.87) = organic weighted glide
          pt.vx += (targetX - pt.x) * 0.032;
          pt.vy += (targetY - pt.y) * 0.032;
          pt.vx *= 0.87;
          pt.vy *= 0.87;
          pt.x  += pt.vx;
          pt.y  += pt.vy;
          pt.pulse = Math.max(0, pt.pulse - 0.04);
        } else {
          pt.x = targetX;
          pt.y = targetY;
        }
      }

      // ─ BUILD EDGE LIST ────────────────────────────────────
      // Dynamic connection threshold: tighter on grid/git formations, wider on mesh
      // NOTE: Threshold adapts per section so connections always look intentional
      const baseThresh   = Math.min(W, H) * 0.22;
      const sectionBoost = lastFIdx === 0 ? 1.2 : lastFIdx === 2 ? 0.75 : lastFIdx === 3 ? 0.8 : 1.0;
      const thresh       = baseThresh * sectionBoost;

      edges = [];
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x;
          const dy   = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < thresh) edges.push([i, j, dist, thresh]);
        }
      }

      // ─ DRAW NETWORK EDGES (strings) ───────────────────────
      for (const [i, j, dist, thr] of edges) {
        const strength  = 1 - dist / thr;
        const lineAlpha = strength * strength * 0.20;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `hsla(${h}, 72%, 58%, ${lineAlpha})`;
        ctx.lineWidth   = strength * 1.1;
        ctx.stroke();
      }

      // ─ DATA PACKETS along edges ───────────────────────────
      // NOTE: Small bright dots travel along network edges to simulate
      // live data flow — core visual metaphor for an IT dev portfolio.
      if (!isRM) {
        for (const pkt of packets) {
          if (!pkt.active) {
            // Randomly activate idle packets
            if (Math.random() < 0.012) spawnPacket(pkt);
            continue;
          }
          pkt.t += pkt.speed;
          if (pkt.t >= 1) {
            pkt.active = false;
            // Pulse the destination node
            const dest = particles[pkt.toIdx];
            if (dest) dest.pulse = 1;
            continue;
          }
          const a  = particles[pkt.fromIdx];
          const b  = particles[pkt.toIdx];
          if (!a || !b) { pkt.active = false; continue; }
          const px = a.x + (b.x - a.x) * pkt.t;
          const py = a.y + (b.y - a.y) * pkt.t;

          // Draw packet: bright core + soft halo
          const pGlow = ctx.createRadialGradient(px, py, 0, px, py, 8);
          pGlow.addColorStop(0,   `hsla(${h}, 100%, 82%, 0.95)`);
          pGlow.addColorStop(0.4, `hsla(${h}, 90%, 68%, 0.40)`);
          pGlow.addColorStop(1,   'rgba(0,0,0,0)');
          ctx.beginPath();
          ctx.arc(px, py, 8, 0, Math.PI * 2);
          ctx.fillStyle = pGlow;
          ctx.fill();

          // Solid bright dot core
          ctx.beginPath();
          ctx.arc(px, py, 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${h}, 100%, 90%, 1)`;
          ctx.fill();
        }
      }

      // ─ DRAW NODES ─────────────────────────────────────────
      for (const pt of particles) {
        const pulseBump = pt.pulse * 3.5;

        // Outer glow (brighter during pulse)
        const glowR = pt.radius * 3.5 + pulseBump;
        const nGlow = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, glowR);
        nGlow.addColorStop(0,    `hsla(${h}, 85%, 65%, ${pt.alpha * 0.55 + pt.pulse * 0.45})`);
        nGlow.addColorStop(0.5,  `hsla(${h}, 75%, 55%, ${pt.alpha * 0.18})`);
        nGlow.addColorStop(1,    'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, glowR, 0, Math.PI * 2);
        ctx.fillStyle = nGlow;
        ctx.fill();

        // Solid node core (square on circuit section, circle otherwise)
        const coreR = pt.radius + pulseBump * 0.3;
        if (lastFIdx === 2) {
          // NOTE: Circuit section uses square nodes to match PCB junction style
          const s = coreR * 2.2;
          ctx.fillStyle = `hsla(${h}, 85%, 70%, ${pt.alpha})`;
          ctx.fillRect(pt.x - s / 2, pt.y - s / 2, s, s);
        } else {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, coreR, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${h}, 85%, 70%, ${pt.alpha})`;
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
