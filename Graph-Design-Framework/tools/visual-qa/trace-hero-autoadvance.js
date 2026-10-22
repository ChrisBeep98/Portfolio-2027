// Trace del auto-advance del Hero (para evalpage.mjs).
// Uso: node evalpage.mjs 1440 900 trace-hero-autoadvance.js
// Devuelve un JSON compacto (evalpage recorta a 3000 chars):
//   A = nudge humano (momentum real de Lenis)  ·  B = salto programático a media pista
// Por muestra: t | scrollY | velocity | direction | targetScroll  → expone la
// contienda de autoridades (Lenis lerp vs GSAP ScrollToPlugin) y las inversiones.

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const L = () => window.__lenis;
const setY = (py) => (L() ? L().scrollTo(py, { immediate: true }) : window.scrollTo(0, py));
const wheel = (dy) =>
  window.dispatchEvent(new WheelEvent("wheel", { deltaY: dy, deltaMode: 0, bubbles: true, cancelable: true }));

const r1 = (n) => Math.round(n * 10) / 10;

function sample(ms) {
  const out = [];
  const t0 = performance.now();
  return new Promise((resolve) => {
    const tick = () => {
      const t = performance.now() - t0;
      const len = L();
      out.push([t, window.scrollY, len ? len.velocity : -1, len ? len.direction : 9, len ? len.targetScroll : -1]);
      if (t < ms) requestAnimationFrame(tick);
      else resolve(out);
    };
    requestAnimationFrame(tick);
  });
}

function inversions(t) {
  let dir = 0;
  const inv = [];
  for (let i = 1; i < t.length; i++) {
    const d = t[i][1] - t[i - 1][1];
    if (Math.abs(d) < 0.5) continue;
    const s = d > 0 ? 1 : -1;
    if (dir !== 0 && s !== dir) inv.push(`${Math.round(t[i][0])}:${r1(t[i][1])}(${r1(d)})`);
    dir = s;
  }
  return inv;
}

// Máxima divergencia entre lo que Lenis cree (target/animated) y el scroll real.
function divergence(t) {
  let tgt = 0;
  for (let i = 1; i < t.length; i++) {
    const d = Math.abs(t[i][4] - t[i][1]);
    if (d > tgt) tgt = d;
  }
  return r1(tgt);
}

function pack(t, n) {
  const step = Math.max(1, Math.floor(t.length / n));
  const pts = [];
  for (let i = 0; i < t.length; i += step) pts.push(`${Math.round(t[i][0])}:${r1(t[i][1])}`);
  pts.push(`${Math.round(t[t.length - 1][0])}:${r1(t[t.length - 1][1])}`);
  return pts.join(" ");
}

const result = { lenis: !!L(), vh: window.innerHeight, track: Math.round(document.body.scrollHeight) };

// ── TRIAL A: nudge humano desde el techo (dispara el imán hacia la salida) ──
setY(0);
await sleep(1600);
const a0 = r1(window.scrollY);
const pA = sample(5200);
await sleep(250);
wheel(300);
await sleep(80);
wheel(300);
await sleep(120);
const vA1 = r1(Math.abs(L().velocity));
const A = await pA;
result.A = {
  yStart: a0,
  yEnd: r1(window.scrollY),
  vJustAfterNudge: vA1,
  invN: inversions(A).length,
  inv: inversions(A).slice(0, 4),
  tgtDiv: divergence(A),
  trace: pack(A, 18),
};

// ── TRIAL B: salto programático a 1/3 de pista (disparo fiable del imán) ──
setY(0);
await sleep(1200);
setY(600);
await sleep(1500);
const B = await sample(3800);
result.B = {
  yStart: 600,
  yEnd: r1(window.scrollY),
  invN: inversions(B).length,
  inv: inversions(B).slice(0, 4),
  tgtDiv: divergence(B),
  trace: pack(B, 18),
};

return JSON.stringify(result);