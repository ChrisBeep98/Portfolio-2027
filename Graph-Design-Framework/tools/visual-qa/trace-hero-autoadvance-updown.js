// Segundo trace: los dos casos que el usuario reporta.
//   D = micro-nudge de 20px HACIA ABAJO desde el techo del Hero  (¿te lleva al Acto 2 solo?)
//   C = micro-nudge de 40px HACIA ARRIBA desde el fondo del Hero (¿te devuelve al Acto 1 solo?)
// Uso: node evalpage.mjs 1440 900 trace-hero-autoadvance-updown.js

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
      out.push([t, window.scrollY]);
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

function pack(t, n) {
  const step = Math.max(1, Math.floor(t.length / n));
  const pts = [];
  for (let i = 0; i < t.length; i += step) pts.push(`${Math.round(t[i][0])}:${r1(t[i][1])}`);
  pts.push(`${Math.round(t[t.length - 1][0])}:${r1(t[t.length - 1][1])}`);
  return pts.join(" ");
}

const vh = window.innerHeight;
const endY = 2 * vh; // Hero = track 300vh al techo de la página → salida = 2 viewports
const res = { vh, endY, lenis: !!L() };

// ── D: 20px hacia abajo desde el techo (0 → ?) ──
setY(0);
await sleep(1300);
const d0 = r1(window.scrollY);
const pD = sample(4200);
await sleep(250);
wheel(20);
const D = await pD;
res.D = { from: d0, to: r1(window.scrollY), invN: inversions(D).length, inv: inversions(D).slice(0, 3), trace: pack(D, 14) };

// ── C: 40px hacia arriba desde el fondo del track (endY → ?) ──
setY(0);
await sleep(900);
setY(endY);
await sleep(1600);
const c0 = r1(window.scrollY);
const pC = sample(4200);
await sleep(250);
wheel(-40);
const C = await pC;
res.C = { from: c0, to: r1(window.scrollY), invN: inversions(C).length, inv: inversions(C).slice(0, 3), trace: pack(C, 14) };

return JSON.stringify(res);