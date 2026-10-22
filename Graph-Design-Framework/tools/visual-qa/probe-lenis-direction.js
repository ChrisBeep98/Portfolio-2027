// Sonda: ¿qué vale lenis.direction / isScrolling / velocity DURANTE un lerp real?
// Si direction es 0 mientras Lenis se mueve, el recorrido acumulado del imán
// nunca sube y el auto-advance no dispara nunca.
// Uso: node evalpage.mjs 1440 900 probe-lenis-direction.js

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const L = () => window.__lenis;

L().scrollTo(0, { immediate: true });
await sleep(900);

const rows = [];
const t0 = performance.now();
window.dispatchEvent(new WheelEvent("wheel", { deltaY: 400, deltaMode: 0, bubbles: true, cancelable: true }));

while (performance.now() - t0 < 1700) {
  const l = L();
  rows.push(
    `${Math.round(performance.now() - t0)}|y=${Math.round(window.scrollY)}|dir=${l.direction}|scr=${l.isScrolling}|v=${Math.round(l.velocity)}|tgt=${Math.round(l.targetScroll)}`
  );
  await new Promise((r) => requestAnimationFrame(r));
}

const step = Math.max(1, Math.floor(rows.length / 12));
const pts = [];
for (let i = 0; i < rows.length; i += step) pts.push(rows[i]);
return JSON.stringify({ frames: rows.length, pts });