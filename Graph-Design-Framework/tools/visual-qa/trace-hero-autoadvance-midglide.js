// Tercer trace: contra-nudge de 5px A MITAD del viaje del imán.
// Es el caso donde se cruzan `autoKill: true` (mata el tween al detectar input)
// con el re-disparo del imán (no hay banda) → ¿reversa desproporcionada?
// Uso: node evalpage.mjs 1440 900 trace-hero-autoadvance-midglide.js

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
      out.push([t, window.scrollY, L() ? Math.abs(L().velocity) : -1]);
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
const endY = 2 * vh;
const res = { vh, endY, lenis: !!L() };

setY(0);
await sleep(1400);
const p = sample(5200);
await sleep(250);
wheel(400); // nudge → el imán arranca hacia la salida
await sleep(1500); // viaje en vuelo
const midY = r1(window.scrollY);
const midV = r1(L() ? Math.abs(L().velocity) : -1);
wheel(-5); // corrección de 5px del usuario, a mitad del viaje
const E = await p;

res.E = {
  midY,
  midV,
  to: r1(window.scrollY),
  invN: inversions(E).length,
  inv: inversions(E).slice(0, 5),
  trace: pack(E, 16),
};
return JSON.stringify(res);